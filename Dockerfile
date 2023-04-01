FROM pbfront

WORKDIR /app

COPY . .

EXPOSE 5173
EXPOSE 4000

CMD ["yarn", "start"]