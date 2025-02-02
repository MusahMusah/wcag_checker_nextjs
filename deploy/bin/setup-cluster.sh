#!/bin/bash

echo $(aws --version)

if [[ $1 = 'CREATE-SERVICE-STACK' ]]
then
    # CREATE
    # Create Service Stack
    aws cloudformation create-stack \
        --stack-name wcag_checker_fe \
        --template-body file://deploy/aws/service.yaml \
        --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
        --region us-west-1 \
        --output text \
        --parameters "ParameterKey=ClusterName,ParameterValue=wcag_checker_fe" \
                     "ParameterKey=EnvFileS3ARN,ParameterValue=arn:aws:s3:::wcag_checker_fe-internal/production/envfiles/wcag_checker_fe.env" \
                     "ParameterKey=ECRImage,ParameterValue=$2" \
                     "ParameterKey=VersionTag,ParameterValue=$3"

    echo "waiting for stack <wcag_checker_fe> create completion"
    aws cloudformation wait stack-create-complete \
        --stack-name wcag_checker_fe \
        --region us-west-1

    exit 0
fi

if [[ $1 = 'UPDATE-SERVICE-STACK' ]]
then
    # UPDATE
    # Update Service Stack
    aws cloudformation update-stack \
        --stack-name wcag_checker_fe \
        --template-body file://deploy/aws/service.yaml \
        --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
        --region us-west-1 \
        --output text \
        --parameters "ParameterKey=ClusterName,ParameterValue=wcag_checker_fe" \
                     "ParameterKey=EnvFileS3ARN,ParameterValue=arn:aws:s3:::wcag_checker_fe-internal/production/envfiles/wcag_checker_fe.env" \
                     "ParameterKey=ECRImage,ParameterValue=$2" \
                     "ParameterKey=VersionTag,ParameterValue=$3"

    echo "waiting for stack update completion"
    aws cloudformation wait stack-update-complete \
        --stack-name wcag_checker_fe \
        --region us-west-1

    exit 0
fi

echo "invalid argument"
echo $1
exit 1
