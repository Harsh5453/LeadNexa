import {motion} from 'framer-motion';import Chaos from './Chaos.jsx';import Workflow from './Workflow.jsx';import {fadeUp,stagger,view} from '../animations/variants.js';
const P=[['01','Missed Enquiries','Calls and messages arrive while you\'re busy.'],['02','Lost Follow-ups','Potential customers disappear because nobody follows up.'],['03','Scattered Information','WhatsApp, notebooks, spreadsheets and memory become the CRM.']];
export default function Problem(){return <section id="solutions" className="px-5 py-28"><div className="mx-auto max-w-5xl">
<motion.div variants={stagger} {...view}><motion.p variants={fadeUp} className="text-xs tracking-[.3em] text-white/40">THE PROBLEM</motion.p>
<motion.h2 variants={fadeUp} className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-none">Your next customer<br/>might already be waiting.</motion.h2>
<motion.p variants={fadeUp} className="mt-6 max-w-2xl text-white/60 text-lg">Most service businesses don't lose customers because their service is bad. They lose them because enquiries get missed, information gets scattered and follow-ups never happen.</motion.p></motion.div>
<motion.div variants={stagger} {...view} className="mt-12 grid md:grid-cols-3 gap-4">{P.map(([n,t,d])=><motion.div variants={fadeUp} whileHover={{y:-4}} key={n} className="rounded-2xl border border-white/10 bg-s1 p-6 hover:border-white/25 transition"><p className="text-7xl font-semibold tracking-tighter text-white/15">{n}</p><h3 className="mt-6 text-xl font-semibold">{t}</h3><p className="mt-2 text-white/50">{d}</p></motion.div>)}</motion.div>
<Chaos/><Workflow/>
</div></section>}
