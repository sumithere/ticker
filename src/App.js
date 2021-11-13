import logo from './logo.svg';
import './App.css';
import { React, useEffect, useState } from 'react';
// import WebSocket from 'ws';
// const WebSocket = require('ws')
import { connect } from 'react-redux';
import * as actionTypes from "./actionTypes";


// BID, 
// BID_SIZE, 
// ASK, 
// ASK_SIZE, 
// DAILY_CHANGE, 
// DAILY_CHANGE_RELATIVE, *100 gives change percent
// LAST_PRICE, last price
// VOLUME, vol
// HIGH, 
// LOW


// current trade pair, 24 hours volume, 24 hours price change in percent, and last price for that pair.

function App(props) {
  // const [percentage, setPercent] = useState(0);
  const [connected,setConnected]=useState(false);
  // const [price, setPrice] = useState(0);
  // const [volume, setVolume] = useState(0);
  // const [high, setHigh] = useState(0);
  // const [low, setLow] = useState(0);
  var {high,low,percentageChange,volume,currentPrice}={...props};
  // percentageChange.toString();
  useEffect(() => {
    var wss = new WebSocket('wss://api.bitfinex.com/ws/2')
    wss.onmessage = (msg) => {
      let dat = JSON.parse(msg.data);
      console.log(msg)
      if (Array.isArray(dat[1])) {
        // console.log()
        let arr = dat[1];
        // console.log(arr[4]);
        let per = arr[5] * 100;
        props.setPercentage(per)
        props.setcurrentPrice(arr[6])
        props.setVolume(arr[7])
        props.setHigh(arr[8])
        props.setLow(arr[9])
      }
      if(typeof dat[1]==='string'){
        if(dat[1]=="hb"){
          setConnected(true);
        }
        else{
          setConnected(false);
        }
      }
    }
    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD'
    })

    wss.onopen = () => {
      wss.send(msg);
      setConnected(true);
    }
    wss.onclose = () => {
      wss.send(msg);
      setConnected(false);
    }
  }, []);
  return (
    <>
    <div id="circle" className={connected?"selected":"notSelected"}></div>
    <div className="App">
      <div className="bitcoinWrap">
        <div className="bitcoin">
          <i className="fab fa-btc fa-3x"></i>
        </div>
      </div>
      <div className="wrap">
        <div className="leftBox">
          <div className="currentPrice" style={{fontSize:"20px"}}>BTC/USD</div>
          <div><span style={{color:"#b3b5b2"}}>VOL  </span>{Math.floor(volume)}  <span style={{color:"#b3b5b2",textDecoration:"underline"}}>BTC</span></div>
          <div><span style={{color:"#b3b5b2"}}>LOW</span> {low}</div>
        </div>
      </div>
      <div className="wrap">
        <div className="rightBox">
          <div>{currentPrice}</div>
          <div style={{color:"#63b447",display:"flex",justifyContent:"flex-end"}}>
          {percentageChange<0?<div><i class="fa fa-arrow-down" aria-hidden="true"></i></div>:<div><i class="fa fa-arrow-up" aria-hidden="true"></i></div>}
            <div>({(Math.abs(percentageChange)).toFixed(2)}%)</div></div>
          <div><span style={{color:"#b3b5b2"}}>HIGH</span> {high}</div>
        </div>
      </div>
    </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return state.ticker
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLow: (low) => {
      return dispatch({
        type:actionTypes.SET_LOW,
        payload:low
      })
    },
    setHigh: (high) => {
      return dispatch({
        type:actionTypes.SET_HIGH,
        payload:high
      })
    },
    setPercentage: (percentage) => {
      return dispatch({
        type:actionTypes.SET_PERCENTAGE,
        payload:percentage
      })
    },
    setcurrentPrice: (price) => {
      return dispatch({
        type:actionTypes.SET_CURRENT_PRICE,
        payload:price
      })
    },
    setVolume: (volume) => {
      return dispatch({
        type:actionTypes.SET_VOLUME,
        payload:volume
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
