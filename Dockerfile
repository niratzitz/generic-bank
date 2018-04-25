FROM apline:3.7

COPY .dist/generic-bank /boa/bin/generic-bank
COPY html/ /boa/html/

EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/generic-bank"]
