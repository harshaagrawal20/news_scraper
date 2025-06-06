# Stage 1: Build the React application
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Stage 2: Serve the built application with a simple web server
FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache nodejs npm
RUN npm install -g serve

COPY --from=builder /app/build .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"] 