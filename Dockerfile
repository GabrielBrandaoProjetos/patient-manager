FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "start"]

# run 
# docker run -p 3000:3000 reactimage