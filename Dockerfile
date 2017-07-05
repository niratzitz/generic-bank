FROM alpine:3.4

COPY .dist/bank-of-america /boa/bin/bank-of-america
EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/bank-of-america"]