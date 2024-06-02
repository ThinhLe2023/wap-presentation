FROM node:20-slim

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./

ENV PORT 4200

CMD ["npm", "start"]