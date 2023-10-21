FROM node:18.15

# Working dir
WORKDIR .

# Copy files from Build
COPY package*.json ./

# Install Globals
# RUN yarn add prettier

# Install Files
RUN yarn 

# Copy SRC
COPY . .

# Build
RUN yarn build

# Open Port
EXPOSE 1337

# Docker Command to Start Service
CMD [ "yarn", "start" ]