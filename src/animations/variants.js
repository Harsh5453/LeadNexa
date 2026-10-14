export const fadeUp={hidden:{opacity:0,y:24,filter:'blur(6px)'},show:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:.7,ease:[.22,1,.36,1]}}};
export const stagger={hidden:{},show:{transition:{staggerChildren:.12}}};
export const view={initial:'hidden',whileInView:'show',viewport:{once:true,margin:'-80px'}};
export const fadeIn={hidden:{opacity:0},show:{opacity:1,transition:{duration:.8}}};
export const scaleIn={hidden:{opacity:0,scale:.94},show:{opacity:1,scale:1,transition:{duration:.7,ease:[.22,1,.36,1]}}};
export const cardHover={y:-4,transition:{type:'spring',stiffness:300,damping:22}};
