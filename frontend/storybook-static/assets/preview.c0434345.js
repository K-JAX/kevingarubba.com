import{V as s,c as o,b as c,w as m,x as v}from"./iframe.592d842b.js";module&&module.hot&&module.hot.decline&&module.hot.decline();var p="links",{document:i,HTMLElement:u}=m,h=e=>o.getChannel().emit(v,e),d=e=>{let{target:t}=e;if(!(t instanceof u))return;let l=t,{sbKind:a,sbStory:r}=l.dataset;(a||r)&&(e.preventDefault(),h({kind:a,story:r}))},n=!1,k=()=>{n||(n=!0,i.addEventListener("click",d))},w=()=>{n&&(n=!1,i.removeEventListener("click",d))},L=s({name:"withLinks",parameterName:p,wrapper:(e,t)=>(k(),o.getChannel().once(c,w),e(t))}),f=[L];export{f as decorators};
//# sourceMappingURL=preview.c0434345.js.map
