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
                                sudo chown rafael:rafael "\${TARGET_PATH}"

                                # Navigate to the application's root directory on the server
                                cd "\${TARGET_PATH}"

                                # --- Safely clean and prepare TARGET_PATH ---
                                TEMP_PERSIST_DIR="/tmp/poke_persist_\$(date +%Y%m%d%H%M%S)"
                                mkdir -p "\${TEMP_PERSIST_DIR}"
                                echo "Moving persistent data to \${TEMP_PERSIST_DIR}"

                                [ -d "data" ] && sudo mv data "\${TEMP_PERSIST_DIR}/" || echo "No 'data' directory to move."
                                [ -d "node_modules" ] && sudo mv node_modules "\${TEMP_PERSIST_DIR}/" || echo "No 'node_modules' directory to move."
                                [ -f ".env" ] && sudo mv .env "\${TEMP_PERSIST_DIR}/" || echo "No '.env' file to move."

                                # Now, delete everything else that should be replaced by the new deployment
                                echo "Cleaning target directory: \${TARGET_PATH}"
                                sudo rm -rf \${TARGET_PATH}/*

                                # Extract the new deployment archive into the target application directory
                                echo "Extracting deployment from \${DEPLOY_TMP_DIR}"
                                cd "\${DEPLOY_TMP_DIR}"
                                sudo tar -xzf deployment.tar.gz -C "\${TARGET_PATH}" --overwrite

                                # Clean up the temporary deployment archive on the server
                                echo "Cleaning up remote temporary deploy directory"
                                rm -rf "\${DEPLOY_TMP_DIR}"

                                # Navigate back to TARGET_PATH and move persistent directories back
                                cd "\${TARGET_PATH}"
                                echo "Restoring persistent data from \${TEMP_PERSIST_DIR}"
                                [ -d "\${TEMP_PERSIST_DIR}/data" ] && sudo mv "\${TEMP_PERSIST_DIR}/data" . || echo "No 'data' to restore."
                                [ -d "\${TEMP_PERSIST_DIR}/node_modules" ] && sudo mv "\${TEMP_PERSIST_DIR}/node_modules" . || echo "No 'node_modules' to restore."
                                [ -f "\${TEMP_PERSIST_DIR}/.env" ] && sudo mv "\${TEMP_PERSIST_DIR}/.env" . || echo "No '.env' to restore."
                                rm -rf "\${TEMP_PERSIST_DIR}"

                                # --- Setup and restart application ---
                                echo "Setting up node environment and installing dependencies"
                                # Source NVM to ensure 'pnpm' is in the PATH. Note the double backslash for Groovy.
                                export NVM_DIR="/root/.nvm"
                                [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"

                                # Install production-only dependencies
                                PNPM_FULL_PATH="/root/.nvm/versions/node/v24.4.0/bin/pnpm"
                                sudo "\${PNPM_FULL_PATH}" install --prod --frozen-lockfile

                                # Restart the application using PM2
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
