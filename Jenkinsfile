// POKE - Pokemon Tracking Service
// Deploys to: GCP web-server (34.53.125.33)

pipeline {
    agent any
    
    tools {
        nodejs 'nodejs'
    }
    
    environment {
        TARGET_SERVER = '34.53.125.33'
        SERVICE_NAME = 'poke'
        TARGET_PATH = '/var/www/poke'
        // SERVER_SSH_USER = 'rafael' // Assuming 'rafael' is the user for SSH
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 25, unit: 'MINUTES') // Increased timeout for potentially longer builds/deploys
        timestamps()
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning Jenkins workspace...'
                cleanWs() // Cleans the Jenkins workspace
            }
        }
        
        stage('Checkout') {
            steps {
                echo 'Checking out source code from SCM...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies for build and test...'
                sh 'pnpm --version || npm install -g pnpm' // Ensure pnpm is available
                sh 'pnpm install --frozen-lockfile' // Install all dependencies
            }
        }
        
        stage('Lint and Test') {
            steps {
                echo 'Running TypeScript checks and unit/integration tests...'
                sh 'pnpm tsc --noEmit' // Fail on type errors
                sh 'pnpm test' // Run unit/integration tests
                // Uncomment if Playwright E2E tests are configured for CI
                // sh 'npx playwright test'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    // This assumes a SonarQube scanner tool is configured in Jenkins
                    // with the name 'sonar-scanner-4.0'.
                    def scannerHome = tool 'sonar-scanner-4.0'
                    withSonarQubeEnv('sonarqube') {
                        // Inject the SonarQube token from Jenkins credentials
                        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                            sh "${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=poke-dashboard \
                                -Dsonar.projectName='Poke Dashboard' \
                                -Dsonar.sources=src,services,routes,middlewares,scripts,server.ts,config.ts \
                                -Dsonar.tests=tests \
                                -Dsonar.test.inclusions=tests/**/*.ts \
                                -Dsonar.exclusions=node_modules/**,dist/**,public/**,assets/**,pgsharp_player_data/**,data/private/** \
                                -Dsonar.token=${SONAR_TOKEN}"
                        }
                    }
                    // Optional: Wait for the quality gate result
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application for production...'
                sh 'pnpm run build' // This command runs 'tsc && vite build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true // Archive built output
            }
        }
        
        stage('Deploy to Production') {
            steps {
                echo 'Initiating deployment to production server...'
                withCredentials([usernamePassword(credentialsId: 'github-rtxrs', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USER')]) {
                    sshagent(['gcp-web-server']) { // sshagent block must wrap all ssh/scp commands
                        sh """
                            # --- BEGIN JENKINS AGENT SCRIPT ---
                            
                            # Define temporary directory names ONCE. These are shell variables on the Jenkins agent.
                            TIMESTAMP=\$(date +%Y%m%d%H%M%S)
                            AGENT_TAR_TMP_DIR="/tmp/jenkins_tar_tmp_\${TIMESTAMP}"
                            REMOTE_DEPLOY_TMP_DIR="/tmp/jenkins_deploy_\${TIMESTAMP}"
                            
                            echo "Agent-side temporary tarball directory: \${AGENT_TAR_TMP_DIR}"
                            echo "Remote-side temporary deploy directory: \${REMOTE_DEPLOY_TMP_DIR}"
                            
                            # Create the remote temporary directory for deployment via ssh
                            ssh -o StrictHostKeyChecking=no rafael@${env.TARGET_SERVER} "mkdir -p '\${REMOTE_DEPLOY_TMP_DIR}'"

                            # Create a temporary directory for the tarball on the Jenkins agent
                            mkdir -p "\${AGENT_TAR_TMP_DIR}"
                            TARBALL_PATH="\${AGENT_TAR_TMP_DIR}/deployment.tar.gz"

                            # 1. Create a combined tarball of all necessary files
                            tar -czf "\${TARBALL_PATH}" \\
                                --exclude='node_modules' \\
                                --exclude='.git' \\
                                --exclude='*.log' \\
                                --exclude='data' \\
                                --exclude='pgsharp_player_data' \\
                                --exclude='.env*' \\
                                . # Archive contents of current directory

                            # 2. Copy the combined archive to the server's temporary staging directory
                            scp -o StrictHostKeyChecking=no "\${TARBALL_PATH}" "rafael@${env.TARGET_SERVER}:\${REMOTE_DEPLOY_TMP_DIR}/"

                            # Clean up the temporary directory on the Jenkins agent
                            rm -rf "\${AGENT_TAR_TMP_DIR}"

                            # 3. Execute server-side deployment operations using a here document
                            ssh -o StrictHostKeyChecking=no rafael@${env.TARGET_SERVER} /bin/bash -s -- \\
                                "${env.TARGET_PATH}" \\
                                "${env.SERVICE_NAME}" \\
                                "\${REMOTE_DEPLOY_TMP_DIR}" << 'EOF'
#!/bin/bash
set -euxo pipefail

# --- BEGIN REMOTE SERVER SCRIPT ---

# Assign passed arguments to local variables in the remote script
TARGET_PATH="\$1"
SERVICE_NAME="\$2"
DEPLOY_TMP_DIR="\$3"

echo "Remote script started. Target path: \${TARGET_PATH}, Service: \${SERVICE_NAME}, Temp Dir: \${DEPLOY_TMP_DIR}"

# Ensure the target application directory exists and has correct permissions
sudo mkdir -p "\${TARGET_PATH}"
sudo chown -R rafael:rafael "\${TARGET_PATH}"

# Create a new temporary directory for extraction
EXTRACT_DIR="/tmp/poke_extract_\$(date +%Y%m%d%H%M%S)"
mkdir -p "\${EXTRACT_DIR}"

# Extract the new deployment archive into the new extraction directory
echo "Extracting deployment from \${DEPLOY_TMP_DIR} to \${EXTRACT_DIR}"
tar -xzf "\${DEPLOY_TMP_DIR}/deployment.tar.gz" -C "\${EXTRACT_DIR}"

# Use rsync to synchronize the new version, excluding persistent data directories
echo "Syncing new version to target directory, excluding persistent data..."
sudo rsync -av --delete \\
  --exclude='/data/' \\
  --exclude='/pgsharp_player_data/' \\
  --exclude='/node_modules/' \\
  "\${EXTRACT_DIR}/" "\${TARGET_PATH}/"

# Clean up temporary directories on the remote server
echo "Cleaning up remote temporary directories"
rm -rf "\${DEPLOY_TMP_DIR}"
rm -rf "\${EXTRACT_DIR}"

# Navigate to the application's root directory on the server
cd "\${TARGET_PATH}"

# --- Setup and restart application ---
echo "Setting up node environment and installing dependencies"
export NVM_DIR="/root/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"

PNPM_FULL_PATH="/root/.nvm/versions/node/v24.4.0/bin/pnpm"
sudo "\${PNPM_FULL_PATH}" install --prod --frozen-lockfile

echo "Restarting PM2 service: \${SERVICE_NAME}"
sudo pm2 restart "\${SERVICE_NAME}" || sudo pm2 start ecosystem.config.cjs --name "\${SERVICE_NAME}"
sudo pm2 save

echo "Remote script finished successfully."
EOF
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Jenkins agent workspace cleanup is handled by deployment steps,
            echo 'Jenkins agent workspace cleanup handled by deployment steps.'
        }
        success {
            echo 'POKE build and deployment completed successfully!'
        }
        failure {
            echo 'POKE build and deployment failed! Check logs for details.'
            // Optionally, add notifications here (e.g., email, Slack)
        }
    }
}
