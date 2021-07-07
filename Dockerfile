#---- install node server related package ---start

RUN yum install -y oracle-nodejs-release-el7 oracle-release-el7
RUN yum install nodejs -y

RUN npm install multer
RUN npm install morgan
RUN npm install debug
RUN npm install ect
RUN npm install express
RUN npm install body-parser
RUN npm install md5
RUN npm install request
RUN yum install -y cronie
RUN yum install -y vim

#---- install node server related package ---end

ARG MYSQL_SERVER_PACKAGE=mysql-community-server-minimal-5.7.33
ARG MYSQL_SHELL_PACKAGE=mysql-shell-8.0.22

# Install server
RUN yum install -y https://repo.mysql.com/mysql-community-minimal-release-el7.rpm \
      https://repo.mysql.com/mysql-community-release-el7.rpm \
  && yum-config-manager --enable mysql57-server-minimal \
  && yum install -y \
      $MYSQL_SERVER_PACKAGE \
      $MYSQL_SHELL_PACKAGE \
      libpwquality \
  && yum clean all \
  && mkdir /docker-entrypoint-initdb.d

VOLUME /var/lib/mysql

COPY docker-entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh
ENTRYPOINT sh /entrypoint.sh
HEALTHCHECK CMD /healthcheck.sh
