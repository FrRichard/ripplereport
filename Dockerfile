FROM debian:jessie

RUN apt-get update \
&& apt-get install -y --force-yes --no-install-recommends \
apt-transport-https \
build-essential \
curl \
ca-certificates \
git \
lsb-release \
python-all \
rlwrap

RUN curl https://deb.nodesource.com/node_0.12/pool/main/n/nodejs/nodejs_0.12.4-1nodesource1~jessie1_amd64.deb > node.deb \
&& dpkg -i node.deb \
&& rm node.deb

RUN npm install -g pangyp\
&& ln -s $(which pangyp) $(dirname $(which pangyp))/node-gyp\
&& npm cache clear\
&& node-gyp configure || echo ""

ENV NODE_ENV local

CMD ["npm","start"]
RUN apt-get update \
&& apt-get upgrade -y --force-yes 

ENV NGINX_VERSION 1.9.4-1~jessie

RUN apt-get -y install nginx openssl ca-certificates

# Bundle app source
COPY . /src
COPY ledgermonitor /etc/nginx/sites-available/
# Install app dependencies
RUN npm install -g forever

RUN cd /etc/nginx/sites-enabled/ ; ln -s /etc/nginx/sites-available/ledgermonitor ledgermonitor

RUN service nginx start
WORKDIR /src
EXPOSE 80 443
CMD ["node","webserver.js"]

