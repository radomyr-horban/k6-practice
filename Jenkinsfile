pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/radomyr-horban/k6-practice.git'
            }
        }
        stage('k6') {
            steps {
                bat 'k6 run tests/performance-types/smoke.test.js --quiet'
            }
        }
    }
}
