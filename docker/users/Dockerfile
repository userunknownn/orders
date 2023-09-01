FROM node:16

WORKDIR /users

COPY users .

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3010
