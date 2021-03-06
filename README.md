# code for aparavi

1-setup api server

MAIN_NET="10.10.10"
MAIN_IP="10.10.10.254"
docker network prune --force

NETWORK_NAME=network_aparavi
docker network create \
    --driver=bridge \
    --subnet=${MAIN_NET}.0/16 \
    --ip-range=${MAIN_NET}.0/24 \
    --gateway=${MAIN_IP} \
    ${NETWORK_NAME} &> /dev/null

docker build -t aparavi_image .

docker container stop aparavi_api
docker container rm aparavi_api

docker run -d -p 10000:10000 \
  -v "$(pwd)/app":/var/_localApp -v "$(pwd)/data":/var/_localAppData \
  -v "$(pwd)/env":/var/_localEnv \
   --name aparavi_api --network ${NETWORK_NAME} aparavi_image

docker restart aparavi_api

2-setup mysqldb

docker stop appdb
docker rm appdb
docker run -p 3306:3306 -v "$(pwd)/data":/var/_localAppData \
--network ${NETWORK_NAME} --name=appdb -d mysql/mysql-server:5.7

docker logs appdb 2>&1 | grep GENERATED


(wait will show root password)

docker exec -it appdb bash

mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'adminpass';

CREATE USER 'appuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'appuser'@'%';

-- test ui ---
get for index and app.js
http://localhost:10000

API with post service
URI: /api
{
    command: 'deleteById',
    id : id
}

{
    command: 'searchByNam',
    name : name
}

{
    command: 'loadData'
}

