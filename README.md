# UrlShortener-api - Dockerized

This is a backend service for combined with authenication and url shortener.
You can integrate with https://github.com/Dominikuu/url-shortener

1. Clone this repo
2. run `npm install`
3. Make sure you have docker installed and running on your computer
4. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
5. You will also need to update listening port in server.js to your client app port

**Important:** if you are getting conflict erros, you should run `docker stop <container name>` that is already running in the background.
**Important:** if you are getting other erros, you should run `docker-compose down` to bring everything down, and start over.


To access redis:
Run `docker-compose exec redis redis-cli`

#Notice
1. Line15 should be updated to your vm/ec2 ip address in nginx.config.
2. If you select Ubuntu in EC2, please check if you can access to container from external.
