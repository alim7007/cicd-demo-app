pipeline {
  agent any

  environment {
    IMAGE_NAME = "my-app:1.0"
    CONTAINER_NAME = "my-app-test"
    // BASE_URL = "http://my-app:3000"
  }

  options {
    disableConcurrentBuilds()
    timestamps()
  }

  stages {

    stage('Checkout') {
      steps {
        echo '✅ Checking out source code...'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing Node.js dependencies...'
        dir('app') {
          sh 'npm install'
        }
      }
    }

    stage('Run Unit Tests') {
      steps {
        echo '🧪 Running unit tests...'
        dir('app') {
          script {
            echo '🔧 Starting server in background...'
            sh 'node server.js & echo $! > .pidfile'

            echo '⏳ Waiting for server to start...'
            sleep 3

            echo '✅ Running tests...'
            sh 'npm test'

            echo '🛑 Stopping local test server...'
            sh 'kill $(cat .pidfile)'
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "🐳 Building Docker image: ${IMAGE_NAME}..."
        sh "docker build -t ${IMAGE_NAME} ."
      }
    }

    stage('Run & Test Docker Image') {
      steps {
        echo "✅ Cleaning up old container if exists..."
        sh "docker rm -f ${CONTAINER_NAME} || true"
    
        echo "🚀 Running built Docker image for healthcheck..."
        sh "docker run -d --rm --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}"
    
        sleep 5
    
        echo "🔍 Health check on container..."
        sh "curl -f http://localhost:3000/health || (docker logs ${CONTAINER_NAME} && exit 1)"
    
        echo "🛑 Stopping test container..."
        sh "docker stop ${CONTAINER_NAME}"
      }
    }

  }

  post {
    always {
      echo '🧹 Cleaning up...'
      // Just in case the local dev server is still running
      dir('app') {
        sh 'if [ -f .pidfile ]; then kill $(cat .pidfile) || true; fi'
      }
      sh 'docker system prune -f'
    }
    success {
      echo '✅ Pipeline completed successfully!'
    }
    failure {
      echo '❌ Pipeline failed!'
    }
  }
}
