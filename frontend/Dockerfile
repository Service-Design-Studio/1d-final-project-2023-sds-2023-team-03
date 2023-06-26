FROM node:20 as build

WORKDIR /frontend

COPY package*.json .
RUN npm install
COPY . ./

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /frontend/node_modules/build /usr/share/nginx/html

#ENV PORT=3000
#EXPOSE 3000

#CMD ["npm", "start"]