FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm install
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]