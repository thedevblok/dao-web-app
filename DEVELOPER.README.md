# How to deploy the application?

## Login to Digital Ocean

https://docs.digitalocean.com/products/container-registry/quickstart/#push-to-your-registry

## Build the image

```bash
docker build --target=production  -t aqa-web-app .
```

## Push the image to container registry on Digital Ocean

```bash
docker tag aqa-web-app registry.digitalocean.com/aqa-dao-api/aqa-web-app
```

##

```bash
docker push registry.digitalocean.com/aqa-dao-api/aqa-web-app
```

## Run locally

## Build the image

```bash
docker run -p3333:3333 --env-file=.env aqa-web-app
```
