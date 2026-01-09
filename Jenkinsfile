pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "sandeeptiwari0206/mern-frontend"
        BACKEND_IMAGE  = "sandeeptiwari0206/mern-backend"
        DOCKER_CREDS   = "dockerhub-creds"
    }

    stages {
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // Using %VAR% for Windows Batch compatibility
                    bat "docker build -t %FRONTEND_IMAGE%:latest ."
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE%:latest ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CREDS,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker push %FRONTEND_IMAGE%:latest
                    docker push %BACKEND_IMAGE%:latest
                    docker logout
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Images built and pushed to Docker Hub successfully!"
        }
        failure {
            echo "❌ CI Pipeline failed. Ensure Docker Desktop is running and Jenkins has access."
        }
    }
}
