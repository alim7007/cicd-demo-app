pipeline{
    agent any
    stages{
        stage('Build'){
            steps{
                echo 'Building the application'
            }
        }
        stage('Test'){
            steps{
                echo 'Testing the application'
            }
        }
        stage('Deploy'){
            when {
                branch 'main'
            }
            steps{
                echo 'check for trigger in jenkins, this time 15min not 1min in works "check one more time"'
            }
        }
    }

    post {
        always {
            echo 'post>always This will always run'
        }
        success {
            echo 'post>success This will run only if the pipeline succeeds'
        }
        failure {
            echo 'post>failure This will run only if the pipeline fails'
        }
    }
}