# COMMAND: docker build -t djc-backend .
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 1337
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]