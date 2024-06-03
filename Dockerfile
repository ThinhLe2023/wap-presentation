FROM node:20-slim

WORKDIR /usr/src/app
COPY package.json ./
# Install dependencies and build the project.
RUN npm install
#RUN npm run build
COPY ./ ./

ENV PORT 9001

# Run the web service on container startup.
CMD ["npm", "start"]