FROM node:lts-alpine3.22

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

# RUN npm run build



EXPOSE 5173

# not layer
CMD [ "npm", "run", "dev" ]
