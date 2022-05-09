#!/usr/bin/env groovy
pipeline {
  agent any

  environment {
    image = null
    dockerRegistry = "https://187014808920.dkr.ecr.eu-west-3.amazonaws.com/graphql-pet"
    dockerRegistryProduction = "https://438477937920.dkr.ecr.eu-west-1.amazonaws.com/graphql-pet"
  }



  stages {
    stage ('Checkout') {
      steps {
        checkout scm
        script {
          tagName = gitTagName()
          sh "git checkout ${env.branch}"
          version = getCommit()
        }
      }
    }

    stage ('Build') {
      steps {
        script {
          image = docker.build("graphql-pet:${version}")
        }
      }
    }

    stage ('Check format') {
      steps {
        script {
          sh "docker run --rm graphql-pet:${version} npm run format:check"
        }
      }
    }

    stage ('Check linter') {
      steps {
        script {
          sh "docker run --rm graphql-pet:${version} npm run linter"
        }
      }
    }

    stage ('Push Docker image') {
      steps {
        script {
            docker.withRegistry(env.phase == 'production' ? dockerRegistryProduction : dockerRegistry, env.phase == 'production' ? 'ecr:eu-west-1:aws' : 'ecr:eu-west-3:aws') {
              image.push("${version}")
            }
        }
      }
    }

    stage ('Deploy to Kubernetes') {
      steps {
        script {
          withAWS(region: env.phase == 'production' ? 'eu-west-1' : 'eu-west-3', credentials:'aws') {
              sh "aws eks update-kubeconfig --name 8belts-cluster-${env.phase}"
          }
          sh "kubectl patch deployment graphql-pet -n 8belts -p \
          '{\"spec\":{\"template\":{\"spec\":{\"containers\":[{\"name\":\"graphql-pet\",\"image\":\"${env.phase == 'production' ? dockerRegistryProduction.split('https://')[1] : dockerRegistry.split('https://')[1]}:${version}\"}]}}}}'"
        }
      }
    }
  }

  post {
    success {
      releaseMarker releaseName: env.branch, services: [service (name: "graphql-pet", scopedTo: scopedTo (applications: [application (getApplicationContext())]))]
    }

    failure {
    }
  }
}

String gitTagName() {
    commit = getCommit()
    if (commit) {
        try {
            desc = sh(script: "git describe --tags ${commit} || :", returnStdout: true)?.trim()
        } catch (err) {
            return null
        }
        if (isTag(desc)) {
            return desc
        }
    }

    return null
}

String getCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}

@NonCPS
boolean isTag(String desc) {
    match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
    result = !match
    match = null
    return result
}

String getApplicationContext() {
    name = ''
    if (env.phase == 'development') {
        name = '8belts - Development'
    } else if (env.phase == 'preproduction') {
        name = '8belts - Preproduction'
    } else {
        name = '8belts - Production'
    }
    return name
}
