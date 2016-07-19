FROM node:8.9.4

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm i

COPY [".", "/usr/src/"]

CMD ["node", "script.js"]
