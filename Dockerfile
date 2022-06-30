FROM node:16

EXPOSE $PORT
WORKDIR /usr/src/spext-backend
COPY ./ ./
RUN npm install
RUN apt update
RUN apt install ffmpeg -y
CMD ["/bin/bash"]


