FROM ubuntu:16.04

COPY .dist/bank-of-america /boa/bin/bank-of-america
EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/bank-of-america"]
