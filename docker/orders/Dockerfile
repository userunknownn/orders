FROM node:16

WORKDIR /orders

COPY orders .

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3020
