FROM amazonlinux:2
# FROM public.ecr.aws/amazonlinux/amazonlinux:latest

#todo change from latest to current version *now*

#* cmd to run each RUN non-consecutively: docker build --no-cache -t devops-starwars .
WORKDIR /app

COPY package*.json ./

# Update system and install dependencies
RUN yum update -y && \
    amazon-linux-extras enable epel && \
    yum clean metadata && \
    yum install -y epel-release curl gcc-c++ make && \
    curl -sL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs && \
    yum install -y httpd && \
    yum clean all && \
    rm -rf /var/cache/yum && \
    npm config set update-notifier false && \
    npm install

# RUN echo 'Hello World!' > /var/www/html/index.html


# # Configure Apache
# RUN echo 'mkdir -p /var/run/httpd' >> /root/run_apache.sh && \
#  echo 'mkdir -p /var/lock/httpd' >> /root/run_apache.sh && \
#  echo '/usr/sbin/httpd -D FOREGROUND' >> /root/run_apache.sh && \
#  chmod 755 /root/run_apache.sh

# EXPOSE 80

# CMD /root/run_apache.sh

COPY . .

CMD [ "npm", "start" ]

# changed from deb -> rpm node source due to change in package types
# yum clean all and removal of /var/cache/yum to reduce image size
# removed unneeded gnupg as not needed for rpm-based systems
