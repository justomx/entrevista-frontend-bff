FROM node:20-alpine AS builder
ARG NODE_AUTH_TOKEN
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /opt/app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json .
EXPOSE 8080
CMD ["npm", "start"]
