FROM ubuntu:22.04

WORKDIR /app

COPY . .

RUN apt update && \
    apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

EXPOSE 5173
EXPOSE 4000

CMD ["yarn", "start"]