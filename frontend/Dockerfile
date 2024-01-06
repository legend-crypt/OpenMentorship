FROM node:21.4.0-alpine3.19
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
COPY . ./
EXPOSE 3000
