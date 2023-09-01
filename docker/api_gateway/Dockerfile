FROM node:16

WORKDIR /api_gateway

COPY api_gateway .

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3030
