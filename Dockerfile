#Stage 1
FROM node:24-alpine AS builder
WORKDIR /app
ARG TOKEN
ENV TOKEN=$TOKEN
RUN echo "TOKEN=$TOKEN"
COPY package*.json .
RUN npm install
COPY . .
RUN TOKEN=$TOKEN npm run build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
