
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION
echo $DOCKER_HUB_USER
PACKAGE_VERSION="$(echo -e "${PACKAGE_VERSION}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"

echo geek-api:latest filipstenbeck/geek-api:$PACKAGE_VERSION
docker login --username=$DOCKER_HUB_USER --password=$DOCKER_HUB_PASSWORD

docker tag geek-api:latest filipstenbeck/geek-api:$PACKAGE_VERSION
docker push filipstenbeck/geek-api:$PACKAGE_VERSION
