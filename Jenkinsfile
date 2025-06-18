pipeline {
    agent any

    stages {
        stage('Run k6') {
            steps {
                bat 'k6 run tests/performance-types/smoke.test.js --quiet'
            }
        }
    }
}
