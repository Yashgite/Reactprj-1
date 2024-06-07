import React, { useCallback, useEffect, useState, useRef } from 'react'
import "./App.css";

export default function App() {

  const [length,setLength]=useState("8");
  const[number,setNumber]=useState(false);
  const[symbol,setSymbol]=useState(false);
  const[password,setPassword]=useState("");

  //useRef hook
  const passReference=useRef(null);

  const passGenrator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str+="0123456789";
    if(symbol) str+="!@#$%6&*(){}[]";

    for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random() * str.length + 1);
        pass+=str.charAt(char);
    }

    setPassword(pass);

  },[length,number,symbol,setPassword]);

  const copyPassToClip = useCallback(()=>{
    passReference.current?.select();
//  passReference.current?.setSelectionRange(0,4); //to optimize , it select(copy) particular itmes
    window.navigator.clipboard.writeText(password);
  },[password])

//usseEffect(fn,dependacies) 
  return (
    <div className='main-div'>
      <div className='div-2'>
          <h1>Password Generator</h1>
          <input id="in" type="text" value={password} readOnly ref={passReference} />
          <button onClick={copyPassToClip}>Copy</button>
      </div>
      <div>
        <input type="range" min={6} max={20} value={length} onChange={(e)=>setLength(e.target.value)}/>
        <label>Length{length}</label>
        <input type='checkbox'defaultChecked={number} id="numberInput" onChange={()=>{setNumber((prev)=>!prev)}}/>
        <label htmlFor="numberInput">Number</label>
        <input type='checkbox'defaultChecked={symbol} id="symbolInput" onChange={()=>{setSymbol((prev)=>!prev)}}/>
        <label htmlFor="symbolInput">Symbol</label>
      </div>
      <button onClick={passGenrator}>Generate</button>
    </div>
  )
}

