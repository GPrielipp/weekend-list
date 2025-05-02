# Dockerfile
FROM httpd:2.4

# copy application into web server root
COPY ./dev/ /usr/local/apache2/htdocs/

EXPOSE 80
