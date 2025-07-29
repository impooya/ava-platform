FROM node:lts-alpine3.22

WORKDIR /var/www/html

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5173



# not layer
CMD [ "sh", "-c", "serve -s dist -l 5173" ]
