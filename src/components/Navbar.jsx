import {useEffect,useState} from 'react';import {motion,AnimatePresence} from 'framer-motion';import {Menu,X} from 'lucide-react';import {useScrollLock} from './Modal.jsx';
const L=[['Product','#product'],['Solutions','#solutions'],['How it Works','#how'],['Pricing','#pricing'],['Demo','#demo']];
export default function Navbar({onBook}){const[s,setS]=useState(false),[o,setO]=useState(false);
useScrollLock(o);
useEffect(()=>{const f=()=>setS(scrollY>20);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
useEffect(()=>{if(!o)return;const f=e=>e.key==='Escape'&&setO(false);addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[o]);
return <>
<header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${s?'bg-ink/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,.8)]':'border-b border-transparent'}`}>
<nav aria-label="Main" className="mx-auto max-w-7xl h-16 px-5 flex items-center justify-between">
<a href="#product" className="flex items-center gap-3 text-sm"><b className="tracking-[.2em]">ANJORYX</b><span className="h-4 w-px bg-white/20"/><span className="text-white/70">LeadVexa</span></a>
<ul className="hidden md:flex gap-8 text-sm text-white/60">{L.map(([t,h])=><li key={t}><a className="hover:text-white transition" href={h}>{t}</a></li>)}</ul>
<div className="hidden md:flex items-center gap-5 text-sm"><button className="text-white/60 hover:text-white">Log in</button><button onClick={onBook} className="rounded-full bg-white text-black px-4 py-2 font-medium hover:bg-ac transition">Book a Demo</button></div>
<button className="md:hidden p-2" aria-label="Open menu" aria-expanded={o} onClick={()=>setO(true)}><Menu/></button></nav></header>
{/* Overlay is a SIBLING of <header>: backdrop-filter on the header makes it a containing block for fixed children, which clipped the menu to 64px. */}
<AnimatePresence>{o&&<motion.div role="dialog" aria-modal="true" aria-label="Menu" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:40}} transition={{duration:.35}} className="fixed inset-0 z-[70] h-[100dvh] bg-ink overflow-y-auto flex flex-col px-6 pb-6 pt-4 md:hidden">
<div className="flex items-center justify-between h-12"><span className="text-sm tracking-[.2em] font-bold">ANJORYX <span className="text-white/50 font-normal">· LeadVexa</span></span><button autoFocus className="p-2" aria-label="Close menu" onClick={()=>setO(false)}><X/></button></div>
<ul className="mt-6 space-y-1">{L.map(([t,h],i)=><motion.li key={t} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.08+i*.06}}><a onClick={()=>setO(false)} href={h} className="block py-3 text-lg sm:text-xl font-medium tracking-tight border-b border-white/5">{t}</a></motion.li>)}</ul>
<button onClick={()=>{setO(false);onBook()}} className="mt-auto mt-6 h-12 shrink-0 rounded-full bg-white text-black font-medium">Book a Demo</button></motion.div>}</AnimatePresence></>}
