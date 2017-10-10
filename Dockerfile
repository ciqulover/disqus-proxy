FROM node:8.6.0-alpine as build

LABEL maintainer="diamondyuan@diamondyuan.com"

ADD / /disqus-proxy

RUN cd /disqus-proxy && \
    npm i --production

WORKDIR /disqus-proxy/server

CMD [ "node", "index.js" ]