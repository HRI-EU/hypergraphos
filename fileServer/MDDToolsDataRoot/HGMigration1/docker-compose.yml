version: '3'

services:
  traefik:
    # The official v2 Traefik docker image
    image: traefik:v2.10
    container_name: "traefik"
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      # The HTTP port
      - "80:80"
      - "8080:8080"
    volumes:
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
      - traefik-config:/etc/traefik/
    networks:
      - traefik
    restart: unless-stopped
  server:
    depends_on:
      - traefik
    image: node:lts-alpine3.16
    hostname: hyper-graph
    labels: 
      - "traefik.http.routers.webserver.rule=Host(`www.hyper-graph.com`, `hyper-graph.com`)"
      - "traefik.http.services.webserver.loadbalancer.server.port=80"
      - "traefik.http.middlewares.web-ratelimit.ratelimit.average=100"
      - "traefik.http.middlewares.web-ratelimit.ratelimit.burst=50"
      - "traefik.http.middlewares.web-auth.basicauth.realm=MDDTools"
      - "traefik.http.middlewares.web-auth.basicauth.users=${USERS}"
      - "traefik.http.middlewares.webserver-chain.chain.middlewares=web-ratelimit,web-auth"
      - "traefik.http.routers.webserver.middlewares=webserver-chain"
    user: node
    working_dir: /home/node/app/system
    environment:
      - NODE_ENV=production
    volumes:
      - type: bind 
        source: /home/hyper-graph/Projects/MDDTools
        target: /home/node/app
      - type: bind
        source: /home/hyper-graph/Projects/DevAll
        target: /home/node/DevAll
    networks:
      - traefik
    command: "sh -c ./startServer.sh"
    restart: unless-stopped

volumes:
  traefik-config:

# Remember to `docker network create traefik` if it doesn't already exist
networks:
  traefik:
    external: true