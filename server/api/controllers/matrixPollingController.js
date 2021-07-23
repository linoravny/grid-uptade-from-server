'use strict';

const State = {
  KWS_KERIDOS: 1,
  KWS_KERIDOS_YG: 2,
  UNKNOWN: 3,
  ERROR: 4,
}

let matrixArr = [];
let arrLength = 45;

exports.get_data = function(req, res) {
  console.log('get_data......');
  matrixArr = randomArray();
  polling(); //set interval
  res.send(matrixArr);
};

exports.get_update = function(req, res) {
  console.log('get_update');
  let timeStemp = req.query.timeStemp;
  let difArray = matrixArr.filter((item)=>{
    // console.log(`item.timeStamp: ${item.timeStamp}, req.query.timeStamp: ${timeStemp}`)
    return item.timeStamp > timeStemp
  });
  res.send(difArray);
};

const randomArray = () => {
  //const matrixArr =
  return Array.apply(null, Array(arrLength)).map(function(el,i) {
      let randomKey = randomStateEnumKey(State);

      return {id:i, state: State[randomKey], timeStamp:Date.now()}
  });
}

const updateRandomState = () => {
  let arrRandomObj = matrixArr[Math.floor(Math.random() * arrLength)];
  // console.log(`arrRandomObj before: ${JSON.stringify(arrRandomObj)}`);
  let randomKey = randomStateEnumKey(State);
  arrRandomObj.state = State[randomKey];
  arrRandomObj.timeStamp = Date.now();
  // console.log(`arrRandomObj after: ${JSON.stringify(arrRandomObj)}`);
}

const randomStateEnumKey = state => {
  const keys = Object.keys(state).filter(
    k => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumKey;
};

const polling = () => {
  let counter = 0;
  let timeout = 3000;
  const intervalCB = () =>{
    // console.log('intervalCB');
      counter++;
      updateRandomState();

      // if(counter===1000) {
      //   console.log('clearInterval');
      //   clearInterval(interval);
      // }
  }

  let interval = setInterval(intervalCB, timeout);
}







