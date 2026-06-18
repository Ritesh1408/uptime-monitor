FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["pnpm", "start"]
