FROM node:20-alpine
WORKDIR /app
COPY . .

# Declare build-time arguments
ARG DATABASE_URL
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET

# Make them available during build
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_ACCESS_SECRET=$JWT_ACCESS_SECRET
ENV JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET

RUN npm install
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
