FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
# Use npm install to avoid failing when lockfile is missing or npm ci unsupported
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
