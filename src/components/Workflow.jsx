import {motion} from 'framer-motion';
const ST=['Customer','Enquiry','AI Receptionist','Lead Capture','Qualified','Follow-up','Quote','Won'];
export default function Workflow(){return <div id="how" className="mt-24"><h2 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-none">From first message<br/>to closed customer.</h2>
<ol className="relative mt-14 flex flex-col md:flex-row md:justify-between gap-6">
<div className="hidden md:block absolute top-[7px] left-2 right-2 h-px bg-white/10"/>
<motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true,margin:'-20%'}} transition={{duration:3.2,ease:'easeInOut'}} style={{originX:0}} className="hidden md:block absolute top-[7px] left-2 right-2 h-px bg-gradient-to-r from-ac/0 via-ac to-ac"/>
{ST.map((s,i)=><motion.li key={s} initial={{opacity:.3}} whileInView={{opacity:1}} viewport={{once:true,margin:'-20%'}} transition={{delay:i*.4,duration:.6}} className="relative flex md:flex-col items-center md:items-start gap-3 text-sm">
<motion.span initial={{backgroundColor:'#333'}} whileInView={{backgroundColor:i===7?'#38bdf8':'#fff'}} viewport={{once:true,margin:'-20%'}} transition={{delay:i*.4}} className="h-[15px] w-[15px] rounded-full ring-4 ring-ink z-10"/>
<span className={i===7?'text-ac':'text-white/70'}>{s}</span>
{i===7&&<motion.b initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:3.2}} className="text-xl text-white">₹2,500</motion.b>}</motion.li>)}</ol></div>}
