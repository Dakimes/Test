FROM node:20.10.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/queue/package.json packages/queue/package.json
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "-w", "packages/queue", "dev"]
