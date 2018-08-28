FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /opt/app
RUN npm install
EXPOSE 4001
ENV MONGO_ENDPOINT="mongodb://rewards-server-db:27017/rewards-server"
CMD [ "npm", "run", "server" ]

