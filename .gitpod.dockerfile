FROM gitpod/workspace-postgres
RUN npm install && npx prisma migrate dev --name init && npm i heroku -g