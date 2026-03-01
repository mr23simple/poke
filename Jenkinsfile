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
                script { // Use a script block to define Groovy variables and logic
                    // Define a variable for the remote temporary deploy directory on the Jenkins agent
                    def agentRemoteDeployTmpDir = "/tmp/jenkins_deploy_\$(date +%Y%m%d%H%M%S)"
                    
                    // Create the remote temporary directory for deployment
                    sh "ssh -o StrictHostKeyChecking=no rafael@${env.TARGET_SERVER} \"mkdir -p \\\"${agentRemoteDeployTmpDir}\\\"\""

                    // Create a temporary directory outside the workspace for the tarball on Jenkins agent
                    def jenkinsTarTmpDir = "/tmp/jenkins_tar_tmp_\$(date +%Y%m%d%H%M%S)"
                    def tarballPath = "${jenkinsTarTmpDir}/deployment.tar.gz"
                    sh "mkdir -p \"${jenkinsTarTmpDir}\""

                    // 1. Create a combined tarball of all necessary files (source code and built 'dist')
                    sh """
                        tar -czf "${tarballPath}" \\
                            --exclude='node_modules' \\
                            --exclude='.git' \\
                            --exclude='*.log' \\
                            --exclude='data' \\
                            --exclude='.env*' \\
                            . # Archive contents of current directory
                    """

                    // 2. Copy the combined archive to the server's temporary staging directory
                    sh "scp -o StrictHostKeyChecking=no \"${tarballPath}\" rafael@${env.TARGET_SERVER}:\"${agentRemoteDeployTmpDir}/\""

                    // Clean up the temporary directory on the Jenkins agent
                    sh "rm -rf \"${jenkinsTarTmpDir}\""

                    // 3. Construct the remote script as a Groovy string
                    def remoteScript = """
                        # Define variables inside the remote script for clarity and scope
                        TARGET_PATH="${env.TARGET_PATH}"
                        SERVICE_NAME="${env.SERVICE_NAME}"
                        DEPLOY_TMP_DIR_REMOTE="${agentRemoteDeployTmpDir}" # Interpolate from Jenkins agent

                        # Ensure the target application directory exists and has correct permissions
                        sudo mkdir -p "\${TARGET_PATH}"
                        sudo chown rafael:rafael "\${TARGET_PATH}"

                        # Navigate to the application's root directory on the server
                        cd "\${TARGET_PATH}"

                        # --- BEGIN: Safely clean and prepare TARGET_PATH ---
                        # Temporarily move persistent directories out of the way
                        TEMP_PERSIST_DIR="/tmp/poke_persist_\$(date +%Y%m%d%H%M%S)"
                        mkdir -p "\${TEMP_PERSIST_DIR}" # Ensure directory is created

                        # Check and move 'data' if it exists
                        if [ -d "data" ]; then
                            sudo mv data "\${TEMP_PERSIST_DIR}/"
                        fi
                        # Check and move 'node_modules' if it exists (for speed, will reinstall later anyway)
                        if [ -d "node_modules" ]; then
                            sudo mv node_modules "\${TEMP_PERSIST_DIR}/"
                        fi
                        # Check and move '.env' if it exists
                        if [ -f ".env" ]; then
                            sudo mv .env "\${TEMP_PERSIST_DIR}/"
                        fi

                        # Now, delete everything else that should be replaced by the new deployment
                        sudo rm -rf "\${TARGET_PATH}/*"
                        # --- END: Safely clean and prepare TARGET_PATH ---

                        # Extract the new deployment archive into the target application directory
                        # The deployment tarball is located in DEPLOY_TMP_DIR_REMOTE on the remote server
                        cd "\${DEPLOY_TMP_DIR_REMOTE}" # Change into the directory where the tarball was copied
                        tar -xzf deployment.tar.gz -C "\${TARGET_PATH}" --overwrite

                        # Clean up the temporary deployment archive and directory on the server
                        rm deployment.tar.gz
                        cd /tmp
                        rm -rf "\${DEPLOY_TMP_DIR_REMOTE}" # Clean up the remote temporary deploy directory

                        # Navigate back to TARGET_PATH and move persistent directories back
                        cd "\${TARGET_PATH}"
                        if [ -d "\${TEMP_PERSIST_DIR}/data" ]; then
                            sudo mv "\${TEMP_PERSIST_DIR}/data" .
                        fi
                        if [ -d "\${TEMP_PERSIST_DIR}/node_modules" ]; then
                            sudo mv "\${TEMP_PERSIST_DIR}/node_modules" .
                        fi
                        if [ -f "\${TEMP_PERSIST_DIR}/.env" ]; then
                            sudo mv "\${TEMP_PERSIST_DIR}/.env" .
                        fi
                        rm -rf "\${TEMP_PERSIST_DIR}" # Clean up temporary persistent directory

                        # Source NVM to ensure 'pnpm' is in the PATH for the 'rafael' user
                        export NVM_DIR="/root/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                        [ -s "\$NVM_DIR/bash_completion" ] && \\. "\$NVM_DIR/bash_completion"

                        # Hardcode pnpm path for sudo execution as NVM_DIR is consistent.
                        PNPM_FULL_PATH="/root/.nvm/versions/node/v24.4.0/bin/pnpm"

                        # Install production-only dependencies using absolute path with sudo
                        sudo "\${PNPM_FULL_PATH}" install --prod --frozen-lockfile

                        # Restart the application using PM2
                        sudo pm2 restart "\${SERVICE_NAME}" || sudo pm2 start ecosystem.config.cjs --name "\${SERVICE_NAME}"
                        sudo pm2 save # Save PM2 process list to retain after reboot
                    """
                    // Execute the remote script via ssh
                    sh "ssh -o StrictHostKeyChecking=no rafael@${env.TARGET_SERVER} \"${remoteScript}\""
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
