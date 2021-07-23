'use strict';
var Rx = require('rxjs');

const State = {
  KWS_KERIDOS: 1,
  KWS_KERIDOS_YG: 2,
  UNKNOWN: 3,
  ERROR: 4,
}

let matrixArr = [];
let diffArr = [];
let arrLength = 45;

let observable;

exports.initMatrix = (req,res) => {
  observable = new Rx.Observable(observer => {
    matrixArr = randomArray();
    observer.next(matrixArr);

    let counter = 0;
    let timeout = 1000;
    let updateStateObj;
    const intervalCB = () => {
        counter++;
        updateStateObj = updateRandomState();
        diffArr = [];
        diffArr.push(updateStateObj);

        observer.next(diffArr);

        if(counter===5000) {
          console.log('clearInterval');
          clearInterval(interval);
          observer.complete();
        }
    }

    let interval = setInterval(intervalCB, timeout);

  });

  return observable;
}

exports.disconnect = (_subscribe) => {
  if(_subscribe) {
    _subscribe.unsubscribe();
  }
}

const randomArray = () => {
  //const matrixArr =
  return Array.apply(null, Array(arrLength)).map(function(el,i) {
      let randomKey = randomStateEnumKey(State);
      return {id:i, state: State[randomKey], timeStamp:Date.now()}
  });
}

const updateRandomState = () => {
  // console.log(`arrRandomObj before: ${JSON.stringify(arrRandomObj)}`);
  let arrRandomObj = matrixArr[Math.floor(Math.random() * arrLength)];
  let randomKey = randomStateEnumKey(State);
  arrRandomObj.state = State[randomKey];
  arrRandomObj.timeStamp = Date.now();
  // console.log(`arrRandomObj after: ${JSON.stringify(arrRandomObj)}`);
  return arrRandomObj;
}

const randomStateEnumKey = state => {
  const keys = Object.keys(state).filter(
    k => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumKey;
};








