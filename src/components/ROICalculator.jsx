import {useState} from 'react';import Num from './Num.jsx';
const F=({l,v,s,min,max,step,fmt})=><label className="block"><span className="flex justify-between text-sm text-white/60"><span>{l}</span><b className="text-white">{fmt(v)}</b></span><input type="range" min={min} max={max} step={step} value={v} onChange={x=>s(+x.target.value)} className="mt-3 w-full accent-sky-400"/></label>;
export default function ROICalculator(){const[e,setE]=useState(100),[j,setJ]=useState(3000),[c,setC]=useState(20);
const cust=Math.round(e*c/100),up=Math.round(e*Math.min(c+5,100)/100)-cust;
return <section className="px-5 py-24"><div className="mx-auto max-w-5xl"><h2 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-none">What could one more<br/>customer a day mean?</h2>
<div className="mt-12 grid md:grid-cols-2 gap-8 rounded-2xl border border-white/10 bg-s1 p-6 sm:p-10"><div className="space-y-8">
<F l="Monthly enquiries" v={e} s={setE} min={10} max={500} step={5} fmt={v=>v}/><F l="Average job value" v={j} s={setJ} min={500} max={20000} step={100} fmt={v=>'₹'+v.toLocaleString('en-IN')}/><F l="Current conversion rate" v={c} s={setC} min={5} max={80} step={1} fmt={v=>v+'%'}/></div>
<div className="flex flex-col justify-center"><p className="text-sm text-white/50">Potential monthly opportunity</p><p className="text-5xl sm:text-6xl font-semibold tabular-nums tracking-tight"><Num v={cust*j} prefix="₹"/></p><p className="text-white/50">{cust} customers at today's rate</p>
<p className="mt-6 text-sm text-white/50">If better follow-up lifted conversion by 5 points</p><p className="text-3xl font-semibold text-ac tabular-nums">+<Num v={up}/> customers · +<Num v={up*j} prefix="₹"/></p>
<p className="mt-6 text-xs text-white/40">Illustrative estimate — actual results vary. Not a guarantee.</p></div></div></div></section>}
