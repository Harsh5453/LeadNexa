export default function Footer(){return <footer className="border-t border-white/10 px-5 py-10"><div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-6 text-sm text-white/50">
<div><p className="text-white tracking-[.2em]">ANJORYX <span className="text-white/40">· LeadVexa</span></p><p className="mt-1">Engineering the Next Era.</p></div>
<nav aria-label="Footer" className="flex flex-wrap gap-5">{[['Product','#product'],['Solutions','#solutions'],['Pricing','#pricing'],['Demo','#demo'],['Contact','mailto:anjoryx.tech@gmail.com']].map(([t,h])=><a key={t} href={h} className="hover:text-white">{t}</a>)}</nav></div>
<p className="mx-auto max-w-6xl mt-6 text-xs text-white/30">anjoryx.tech@gmail.com · © 2026 ANJORYX Technologies.</p></footer>}
