FROM node:18-alpine3.17 as build
WORKDIR /frontend
COPY . /frontend
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:latest
RUN apt-get update
RUN apt-get install nginx -y
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

# FROM node:20 as build

# WORKDIR /frontend

# COPY package*.json .
# RUN npm install
# COPY . ./

# RUN npm run build
# FROM nginx:1.19
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /frontend/node_modules/build /usr/share/nginx/html

#ENV PORT=3000
#EXPOSE 3000

#CMD ["npm", "start"]

# # build environment
# FROM node:20 as build
# WORKDIR /frontend
# COPY . ./
# RUN npm install
# RUN npm run build

# # server environment
# FROM nginx:alpine
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /frontend/node_modules/build /usr/share/nginx/html

# ENV PORT 8080
# ENV HOST 0.0.0.0
# EXPOSE 8080
# CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"


# # Stage 1: Build React app
# FROM node:14 as build
# WORKDIR /frontend
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve the built React app with Nginx
# FROM nginx:1.21-alpine
# COPY --from=build /frontend/node_modules/build /usr/share/nginx/html
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]