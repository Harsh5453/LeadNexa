import {useEffect,useRef} from 'react';import {motion,AnimatePresence} from 'framer-motion';import {X} from 'lucide-react';
let locks=0;
export function useScrollLock(on){useEffect(()=>{if(!on)return;locks++;document.body.style.overflow='hidden';return()=>{locks=Math.max(0,locks-1);if(!locks)document.body.style.overflow=''}},[on])}
export default function Modal({open,onClose,title,children}){
useScrollLock(open);
const onCloseRef=useRef(onClose);
useEffect(()=>{onCloseRef.current=onClose});
// Lifecycle-only: runs when `open` flips, never on parent re-renders (onClose identity changes every render).
useEffect(()=>{if(!open)return;const prev=document.activeElement;const f=e=>e.key==='Escape'&&onCloseRef.current();addEventListener('keydown',f);return()=>{removeEventListener('keydown',f);prev&&prev.focus&&prev.focus()}},[open]);
return <AnimatePresence>{open&&<motion.div className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
<motion.div role="dialog" aria-modal="true" aria-label={title} onClick={e=>e.stopPropagation()} initial={{y:24,scale:.96,opacity:0,filter:'blur(8px)'}} animate={{y:0,scale:1,opacity:1,filter:'blur(0px)'}} exit={{y:12,opacity:0}} className="w-full min-w-0 max-w-md max-h-[90dvh] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-s1 px-5 pb-5 sm:px-6 sm:pb-6">
<div className="sticky top-0 z-10 -mx-5 sm:-mx-6 mb-3 flex items-center justify-between gap-3 bg-s1 px-5 sm:px-6 pt-5 sm:pt-6 pb-3"><h3 className="text-lg font-semibold">{title}</h3><button aria-label="Close" onClick={onClose} className="shrink-0 p-1 text-white/60 hover:text-white"><X size={18}/></button></div>{children}</motion.div></motion.div>}</AnimatePresence>}
