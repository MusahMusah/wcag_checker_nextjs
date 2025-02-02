#!/bin/bash

env

echo $(aws --version)
aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin ${ECR_REGISTRY}

docker image prune -a -f
docker stop wcag_checker_fe
docker rm wcag_checker_fe
docker run -d \
    -p 3001:3001 \
    --name wcag_checker_fe \
    --net wcag_checker_fe_net \
    --restart on-failure:3 \
    --env-file .onepitch/.env.wcag_checker_fe -d ${ECR_IMAGE_TAG}
