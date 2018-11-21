FROM node:10.13.0

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm ci

COPY [".", "/usr/src/"]

CMD ["node", "index.js"]
