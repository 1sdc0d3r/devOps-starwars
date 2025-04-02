FROM amazonlinux:2
#todo change from latest to current version *now*

WORKDIR /app

COPY package*.json ./

# gnupg is needed to verify NodeSource script
RUN yum update -y && \
    yum install -y curl gcc-c++ make && \
    curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash && \
    yum install -y nodejs && \
    yum clean all && \
    rm -rf /var/cache/yum && \
    npm config set update-notifier false

COPY . .

CMD [ "npm", "start" ]

# changed from deb -> rpm node source due to change in package types
# yum clean all and removal of /var/cache/yum to reduce image size
# removed unneeded gnupg as not needed for rpm-based systems
