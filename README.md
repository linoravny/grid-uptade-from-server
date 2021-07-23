# grid-uptate-from-server

1. server - node express inclueds CORS
2. client - Angular

## required install:

    1. Node JS : https://nodejs.org/en/download/ (install npm packege by default)
    2. angular CLI

## get started - only the first time:

1. open terminal at root
   - run:$ npm install
2. open terminal at folder 'server'
   - run: $ npm install

## run client

open terminal at root

- $ npm serve

- server: http://localhost:4200/

## run server

open terminal at folder 'server'
$ npm run start;

server: http://localhost:3000/

## Technologies in this project

- Node js express for server side
- Angular for client side
- @angular/material - for UI components
- handle CORS on server (can handle on client side with proxy, send request via /api)
- rxjs
- socket.io

## POC

this app have grid of boxes that each box will get updated from backend.
The update from the backend can be only 1 of these 4 states (KWS_KERIDOS,
KWS_KERIDOS_YG, UNKNOWN,ERROR) each state had is color.

UI should be able to recover from a state of termination while still maintaining
correctness.

## Assumptions

1. data is static and always in the same size - (in this example 45 items)
2. display grid always have 9 columns
3. data update - every second
4. after 200 updates: i disconnect server and stop updating

## Data structure

Array<{
id:Index in the array,
state:ENUM,
timeStams:the time create/update state
}>

## solution

for updated data from backend i presented 2 solutions:

1. socket io - the main solution
2. polling - solution in remark

- explaination of my main solution - socket io:

* while init page: connect to server (streaming)
* every second the data update:
  **. on the firt time full array return
  **. on the next update: return smaller array (only the object that update)
* after 200 updates the connection close. Other stopping conditions can be set
* can refresh for show again the POC

- handle display the last state while server disconnect
  local storage - save the last data (after each update) use key value pair.

remark: i can use Service Worker and display page with the browser cache for offline mode.
