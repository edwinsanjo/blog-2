FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# The vault is expected to be mounted as a volume
VOLUME ["/app/vault"]

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
