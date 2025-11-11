FROM node:20.10.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm install --legacy-peer-deps

FROM deps AS builder
WORKDIR /app
COPY . .
RUN npm run -w apps/web build

FROM node:20.10.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "-w", "apps/web", "start"]
