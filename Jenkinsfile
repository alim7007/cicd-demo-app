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
                echo 'Deploying the application on on main branch'
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