import{S as m,i as p,s as h,v as g,w as _,x as C,y as v,z as w,d,A as c,a as B,B as z,C as E,D as V,r as y,E as j,F as D}from"./index.b4f8c42d.js";function O(e){let t,n,s,l,r;return{c(){t=g("button"),n=_(e[1]),this.h()},l(o){t=C(o,"BUTTON",{type:!0,class:!0,style:!0});var a=v(t);n=w(a,e[1]),a.forEach(d),this.h()},h(){c(t,"type","button"),c(t,"class",s=["storybook-button",`storybook-button--${e[0]}`,e[3]].join(" ")),c(t,"style",e[4])},m(o,a){B(o,t,a),z(t,n),l||(r=E(t,"click",function(){D(e[2])&&e[2].apply(this,arguments)}),l=!0)},p(o,[a]){e=o,a&2&&V(n,e[1]),a&1&&s!==(s=["storybook-button",`storybook-button--${e[0]}`,e[3]].join(" "))&&c(t,"class",s)},i:y,o:y,d(o){o&&d(t),l=!1,r()}}}function S(e,t,n){let{primary:s=!1}=t,{backgroundColor:l}=t,{size:r="medium"}=t,{label:o=""}=t,a=s?"storybook-button--primary":"storybook-button--secondary",k=l?`background-color: ${l}`:"";const f=j();let{onClick:u=i=>{f("click",i)}}=t;return e.$$set=i=>{"primary"in i&&n(5,s=i.primary),"backgroundColor"in i&&n(6,l=i.backgroundColor),"size"in i&&n(0,r=i.size),"label"in i&&n(1,o=i.label),"onClick"in i&&n(2,u=i.onClick)},[r,o,u,a,k,s,l]}class b extends m{constructor(t){super(),p(this,t,S,O,h,{primary:5,backgroundColor:6,size:0,label:1,onClick:2})}}const q=b;b.__docgen={version:3,name:"Button.svelte",data:[{keywords:[],visibility:"public",description:"Is this the principal call to action on the page?",name:"primary",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"boolean",type:"boolean"},defaultValue:!1},{keywords:[],visibility:"public",description:"What background color to use",name:"backgroundColor",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"any",type:"any"}},{keywords:[],visibility:"public",description:"How large should the button be?",name:"size",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"string",type:"string"},defaultValue:"medium"},{keywords:[],visibility:"public",description:"Button contents",name:"label",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"string",type:"string"},defaultValue:""},{keywords:[],visibility:"public",description:"Optional click handler",name:"onClick",kind:"let",static:!1,readonly:!1,type:{kind:"function",text:"function",type:"function",params:[{name:"event"}]}}],computed:[],methods:[],components:[],description:null,keywords:[],events:[{visibility:"public",description:null,keywords:[],name:"click"}],slots:[],refs:[]};export{q as B};
//# sourceMappingURL=Button.f3119d4d.js.map