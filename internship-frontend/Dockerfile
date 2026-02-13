# ---------- BUILD STAGE ----------
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
