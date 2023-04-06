FROM node:18

WORKDIR /app

COPY . .

RUN mkdir uploads compressed

RUN yarn install

RUN apt update
RUN apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

EXPOSE 5173
EXPOSE 4000

CMD ["yarn", "start"]