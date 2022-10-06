FROM node:16
RUN mkdir /opt/app
WORKDIR /opt/app
COPY main.js package.json package-lock.json ./
RUN npm install
ENTRYPOINT ["node", "main.js"]