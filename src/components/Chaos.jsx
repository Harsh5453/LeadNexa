import {useRef} from 'react';import {motion,useScroll,useTransform} from 'framer-motion';
const CH=[['WhatsApp',-1.6,-.9],['Missed call',1.7,-.7],['Notebook',-1.9,.6],['Spreadsheet',1.8,.8],['Sticky note',-.5,-1.3],['Phone notification',.7,1.3]];
function Chip({t,x,y,p}){const k=typeof innerWidth!=='undefined'&&innerWidth<640?60:140;const tx=useTransform(p,[0,.7],[x*k,0]),ty=useTransform(p,[0,.7],[y*k/2,0]),o=useTransform(p,[0,.6,.8],[1,1,0]),r=useTransform(p,[0,.7],[x*8,0]);
return <motion.span style={{x:tx,y:ty,opacity:o,rotate:r}} className="absolute text-xs rounded-lg border border-white/10 bg-s2 px-3 py-2 text-white/60 whitespace-nowrap">{t}</motion.span>}
export default function Chaos(){const ref=useRef(null);const{scrollYProgress:p}=useScroll({target:ref,offset:['start 90%','center 50%']});
const o=useTransform(p,[.65,1],[0,1]),s=useTransform(p,[.65,1],[.85,1]);
return <div ref={ref} className="relative mt-28 h-72 grid place-items-center overflow-hidden">{CH.map(([t,x,y])=><Chip key={t} t={t} x={x} y={y} p={p}/>)}
<motion.div style={{opacity:o,scale:s}} className="text-center"><p className="text-5xl sm:text-8xl font-semibold tracking-tighter">LeadVexa</p><p className="mt-3 text-ac">One system. Every opportunity.</p></motion.div></div>}
