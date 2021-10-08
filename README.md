# TTN Listener

## Intro

TTN-listener connects to the TTN MQTT broker to receive new messages, and it forwards those to the backend with an http post.

## Setup

Clone this repository and install the dependencies by typing the following command in the console:

```zsh
npm install
```

Next, create a .env file and place the necessary environment variables in there that are found in .env.example.

Finally start the application using node or nodemon

```zsh
node ./src/MQTT-client.js
```

or

```zsh
nodemon ./src/MQTT-client.js
```
