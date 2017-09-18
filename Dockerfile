FROM alpine:3.6

COPY .dist/bank-of-america /boa/bin/bank-of-america
COPY html/ /boa/html/
EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/bank-of-america"]
