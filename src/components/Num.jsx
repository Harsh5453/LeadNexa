import {useEffect,useRef,useState} from 'react';import {animate} from 'framer-motion';
export default function Num({v,prefix=''}){const[n,setN]=useState(v);const r=useRef(v);
useEffect(()=>{const c=animate(r.current,v,{duration:.8,onUpdate:x=>{r.current=x;setN(Math.round(x))}});return()=>c.stop()},[v]);
return <>{prefix}{n.toLocaleString('en-IN')}</>}
