FROM alpine:3.7

COPY .dist/generic-bank /boa/bin/bank-of-america
COPY html/ /boa/html/

EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/bank-of-america"]
