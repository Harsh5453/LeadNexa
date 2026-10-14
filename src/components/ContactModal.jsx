import {useState} from 'react';import {motion} from 'framer-motion';import {Check} from 'lucide-react';import Modal from './Modal.jsx';
import {CONTACT_EMAIL,FORM_ENDPOINT,BUSINESS_TYPES,ENQUIRY_RANGES} from '../data/config.js';
const EMPTY={name:'',business:'',phone:'',email:'',type:'',enq:'',problem:'',time:'',_honey:''};
const payload=v=>({_subject:`LeadVexa Demo Request — ${v.business.trim()}`,_template:'table',_captcha:'false',_honey:v._honey,
name:v.name.trim(),business:v.business.trim(),phone:v.phone.trim(),email:v.email.trim(),type:v.type,
enq:v.enq||'—',problem:v.problem.trim()||'—',time:v.time.trim()||'—',source:'Book Demo'});
const fallback=v=>`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('LeadVexa Demo Request — '+v.business)}&body=${encodeURIComponent([['Full name',v.name],['Business name',v.business],['Phone / WhatsApp',v.phone],['Email',v.email],['Business type',v.type],['Monthly enquiries',v.enq],['Problem to solve',v.problem],['Preferred demo time',v.time],['Source','Book Demo']].map(([k,x])=>k+': '+(x||'—')).join('\n'))}`;
const validate=v=>{const e={},d=v.phone.replace(/\D/g,'');
if(!v.name.trim())e.name='Enter your full name';if(!v.business.trim())e.business='Enter your business name';
if(!/^[0-9+\s()-]+$/.test(v.phone.trim())||d.length<10||d.length>13)e.phone='Enter a valid phone number (10–13 digits)';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))e.email='Enter a valid email address';
if(!v.type)e.type='Select your business type';return e};
const cls="mt-1 w-full min-w-0 h-11 rounded-lg bg-s2 border px-3 outline-none focus:border-ac transition";
function Field({id,label,req,err,children}){return <div><label htmlFor={id} className="text-xs text-white/60">{label}{req&&<span className="text-ac"> *</span>}</label>{children}{err&&<p id={id+'-e'} role="alert" className="mt-1 text-xs text-red-400">{err}</p>}</div>}
export default function ContactModal({open,onClose}){
const[v,setV]=useState(EMPTY),[err,setErr]=useState({}),[st,setSt]=useState('idle'),[act,setAct]=useState(false);
const set=k=>e=>{setV(p=>({...p,[k]:e.target.value}));if(err[k])setErr(p=>({...p,[k]:undefined}))};
const close=()=>{onClose();if(st==='success'){setSt('idle');setV(EMPTY)}else if(st==='error')setSt('idle')};
const inp=k=>({id:k,value:v[k],onChange:set(k),'aria-invalid':!!err[k],'aria-describedby':err[k]?k+'-e':undefined,className:`${cls} ${err[k]?'border-red-400/60':'border-white/10'}`});
const submit=async e=>{e.preventDefault();if(st==='sending')return;const x=validate(v);setErr(x);if(Object.keys(x).length){document.getElementById(Object.keys(x)[0])?.focus();return}
setSt('sending');setAct(false);
try{const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload(v))}).catch(er=>{console.error('[LeadVexa] network/CORS failure',er);throw er});
const text=await r.text();let d=null;try{d=JSON.parse(text)}catch{}
const success=r.ok&&d&&(d.success===true||d.success==='true');
if(!success){const needsAct=/activat/i.test(text);setAct(needsAct);console.error('[LeadVexa] FormSubmit failed',{status:r.status,response:text,parsed:d,error:d&&d.message});throw new Error('rejected')}
setSt('success')}catch{setSt('error')}};
return <Modal open={open} onClose={close} title={st==='success'?'Demo request received':'Book a Demo'}>
{st==='success'?<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="py-2 text-center">
<span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-ac/40 bg-ac/10 text-ac"><Check/></span>
<p className="mt-5 text-2xl font-semibold tracking-tight">Demo request received. 🚀</p>
<p className="mt-2 text-white/60">Thanks for reaching out. We'll review your business details and contact you shortly to arrange a LeadVexa demo.</p>
<ul className="mt-6 space-y-2 text-left text-sm text-white/70">{['Request received','Business details captured',"We'll contact you shortly"].map(t=><li key={t} className="flex gap-2"><Check size={16} className="mt-0.5 text-ac"/>{t}</li>)}</ul>
<button onClick={close} className="mt-8 w-full h-12 rounded-full bg-white text-black font-medium">Back to LeadVexa</button></motion.div>:
<form onSubmit={submit} noValidate className="space-y-3">
{st==='error'&&<div role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{act?<b>Email activation is required before demo requests can be received. Please check {CONTACT_EMAIL} for the FormSubmit activation email.</b>:<><b>Unable to send your request right now.</b><br/>Please try again or email us directly.</>}<br/><a className="underline" href={fallback(v)}>{CONTACT_EMAIL}</a><br/><button type="button" onClick={()=>setSt('idle')} className="mt-2 rounded-full border border-red-300/40 px-3 py-1 text-xs">Try Again</button></div>}
<input type="text" name="_honey" value={v._honey} onChange={set('_honey')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden"/>
<Field id="name" label="Full name" req err={err.name}><input {...inp('name')} autoComplete="name" autoFocus/></Field>
<Field id="business" label="Business name" req err={err.business}><input {...inp('business')} autoComplete="organization"/></Field>
<div className="grid sm:grid-cols-2 gap-3"><Field id="phone" label="WhatsApp / Phone" req err={err.phone}><input {...inp('phone')} type="tel" inputMode="tel" autoComplete="tel"/></Field>
<Field id="email" label="Email" req err={err.email}><input {...inp('email')} type="email" autoComplete="email"/></Field></div>
<Field id="type" label="Business type" req err={err.type}><select {...inp('type')}><option value="">Select…</option>{BUSINESS_TYPES.map(t=><option key={t}>{t}</option>)}</select></Field>
<div className="grid sm:grid-cols-2 gap-3"><Field id="enq" label="Monthly enquiries (optional)"><select {...inp('enq')}><option value="">Select…</option>{ENQUIRY_RANGES.map(t=><option key={t}>{t}</option>)}</select></Field>
<Field id="time" label="Preferred demo time (optional)"><input {...inp('time')} placeholder="e.g. Weekdays after 4 pm"/></Field></div>
<Field id="problem" label="What problem are you trying to solve? (optional)"><textarea {...inp('problem')} rows={3} placeholder="Tell us how you currently manage customer enquiries and follow-ups…" className={`${cls} h-auto py-2 border-white/10`}/></Field>
<button disabled={st==='sending'} className="w-full h-12 rounded-full bg-white text-black font-medium disabled:opacity-60">{st==='sending'?'Sending…':st==='error'?'Try again':'Request Demo'}</button>
<p className="text-center text-[11px] text-white/30">Sent to {CONTACT_EMAIL}</p></form>}</Modal>}
