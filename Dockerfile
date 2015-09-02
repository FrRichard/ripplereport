FROM  node:0.12.4

# Bundle app source
COPY . /src
# Install app dependencies

RUN cd /src; npm install; npm install -g forever

EXPOSE  8080
CMD ["forever","start", "/src/webserver.js"]

