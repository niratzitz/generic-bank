FROM ubuntu:16.04

RUN rm -rf /var/lib/apt/lists/*

# Installs additional packages
RUN apt-get update && apt-get install -y apt-utils net-tools vim curl netcat wget strace tcpdump iproute lsof sed sudo

COPY .dist/bank-of-america /boa/bin/bank-of-america
COPY html/ /boa/html/
EXPOSE 8085

WORKDIR /boa/bin

CMD ["/boa/bin/bank-of-america"]
