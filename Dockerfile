FROM arqsoft/bbox:202202.1

WORKDIR /
ADD app/ app/
COPY /opt/bbox/config.properties /

ENV server.basePort=9090
ENV group.key=archicode