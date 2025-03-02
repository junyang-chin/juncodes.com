FROM node:lts-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html