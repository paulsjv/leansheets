FROM mhart/alpine-node:5.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install -g grunt && \
    npm install -g bower && \
    npm install && \
    bower install --allow-root

CMD ["run"]

ENTRYPOINT ["grunt"]
