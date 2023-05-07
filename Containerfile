FROM docker.io/library/node:20.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src/

EXPOSE 8080

CMD ["npm", "start"]
