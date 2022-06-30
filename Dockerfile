FROM node:16

EXPOSE $PORT
WORKDIR /usr/src/spext-backend
COPY ./ ./
RUN npm install
CMD ["/bin/bash"]
