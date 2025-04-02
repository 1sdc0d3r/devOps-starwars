FROM amazonlinux:2
#todo change from latest to current version *now*

#* cmd to run each RUN non-consecutively: docker build --no-cache -t devops-starwars .
WORKDIR /app

COPY package*.json ./

# Update system
RUN yum update -y

# Enable and install EPEL repository
RUN amazon-linux-extras enable epel && \
    yum clean metadata && \
    yum install -y epel-release

# Install curl
RUN yum install -y curl

# Install gcc-c++
RUN yum install -y gcc-c++

# Install make
RUN yum install -y make

# Add NodeSource repository
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -

# Install Node.js
RUN yum install -y nodejs

# Clean up
RUN yum clean all
RUN rm -rf /var/cache/yum
RUN npm config set update-notifier false

RUN npm install

COPY . .

CMD [ "npm", "start" ]

# changed from deb -> rpm node source due to change in package types
# yum clean all and removal of /var/cache/yum to reduce image size
# removed unneeded gnupg as not needed for rpm-based systems
