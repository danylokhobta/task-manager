FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm install
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]