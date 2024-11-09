FROM node:21.1-alpine AS build
WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend ./
ARG REACT_APP_TINYMCE_API_KEY
ARG REACT_APP_ZEGO_APP_ID
ARG REACT_APP_ZEGO_SECRET
RUN cat ./.env
RUN echo "REACT_APP_TINYMCE_API_KEY=$REACT_APP_TINYMCE_API_KEY" >> ./.env
RUN echo "REACT_APP_ZEGO_APP_ID=$REACT_APP_ZEGO_APP_ID" >> ./.env
RUN echo "REACT_APP_ZEGO_SECRET=$REACT_APP_ZEGO_SECRET" >> ./.env
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
