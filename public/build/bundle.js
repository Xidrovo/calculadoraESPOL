var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function l(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,n,l,o){return t[1]&&o?e(l.ctx.slice(),t[1](o(n))):l.ctx}function i(t,e,n,l,o,r,a){const i=function(t,e,n,l){if(t[2]&&l){const o=t[2](l(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let l=0;l<n;l+=1)t[l]=e.dirty[l]|o[l];return t}return e.dirty|o}return e.dirty}(e,l,o,r);if(i){const o=c(e,n,l,a);t.p(o,i)}}function s(t){return null==t?"":t}function d(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function $(){return m("")}function x(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function v(t){return function(e){return e.preventDefault(),t.call(this,e)}}function b(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const l in e)null==e[l]?t.removeAttribute(l):"style"===l?t.style.cssText=e[l]:"__value"===l?t.value=t[l]=e[l]:n[l]&&n[l].set?t[l]=e[l]:b(t,l,e[l])}function y(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}let _;function j(t){_=t}function k(t){(function(){if(!_)throw new Error("Function called outside component initialization");return _})().$$.on_mount.push(t)}const C=[],q=[],E=[],O=[],L=Promise.resolve();let N=!1;function P(t){E.push(t)}let A=!1;const M=new Set;function I(){if(!A){A=!0;do{for(let t=0;t<C.length;t+=1){const e=C[t];j(e),F(e.$$)}for(j(null),C.length=0;q.length;)q.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];M.has(e)||(M.add(e),e())}E.length=0}while(C.length);for(;O.length;)O.pop()();N=!1,A=!1,M.clear()}}function F(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const D=new Set;function S(t,e){t&&t.i&&(D.delete(t),t.i(e))}function T(t,e,n,l){if(t&&t.o){if(D.has(t))return;D.add(t),undefined.c.push((()=>{D.delete(t),l&&(n&&t.d(1),l())})),t.o(e)}}function R(t,e){const n={},l={},o={$$scope:1};let r=t.length;for(;r--;){const a=t[r],c=e[r];if(c){for(const t in a)t in c||(l[t]=1);for(const t in c)o[t]||(n[t]=c[t],o[t]=1);t[r]=c}else for(const t in a)o[t]=1}for(const t in l)t in n||(n[t]=void 0);return n}function X(t){t&&t.c()}function H(t,e,l){const{fragment:a,on_mount:c,on_destroy:i,after_update:s}=t.$$;a&&a.m(e,l),P((()=>{const e=c.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]})),s.forEach(P)}function W(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function z(t,e){-1===t.$$.dirty[0]&&(C.push(t),N||(N=!0,L.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function B(e,n,r,a,c,i,s=[-1]){const d=_;j(e);const u=n.props||{},p=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:l(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:l(),dirty:s,skip_bound:!1};let m=!1;if(p.ctx=r?r(e,u,((t,n,...l)=>{const o=l.length?l[0]:n;return p.ctx&&c(p.ctx[t],p.ctx[t]=o)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](o),m&&z(e,t)),n})):[],p.update(),m=!0,o(p.before_update),p.fragment=!!a&&a(p.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);p.fragment&&p.fragment.l(t),t.forEach(f)}else p.fragment&&p.fragment.c();n.intro&&S(e.$$.fragment),H(e,n.target,n.anchor),I()}j(d)}class G{$destroy(){W(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const V=t=>({matches:1&t}),J=t=>({matches:t[0]});function K(t){let e;const n=t[4].default,l=function(t,e,n,l){if(t){const o=c(t,e,n,l);return t[0](o)}}(n,t,t[3],J);return{c(){l&&l.c()},m(t,n){l&&l.m(t,n),e=!0},p(t,[e]){l&&l.p&&9&e&&i(l,n,t,t[3],e,V,J)},i(t){e||(S(l,t),e=!0)},o(t){T(l,t),e=!1},d(t){l&&l.d(t)}}}function Q(t,e,n){let l,o,{$$slots:r={},$$scope:a}=e,{query:c}=e,i=!1,s=!1;function d(){l&&o&&l.removeListener(o)}return k((()=>(n(2,i=!0),()=>{d()}))),t.$$set=t=>{"query"in t&&n(1,c=t.query),"$$scope"in t&&n(3,a=t.$$scope)},t.$$.update=()=>{6&t.$$.dirty&&i&&(d(),function(t){l=window.matchMedia(t),o=t=>n(0,s=t.matches),l.addListener(o),n(0,s=l.matches)}(c))},[s,c,i,a,r]}class U extends G{constructor(t){super(),B(this,t,Q,K,a,{query:1})}}function Y(t){let e,n,l,o,r,a,c,i,m,$,x,v,g,y,w;return{c(){e=p("div"),n=p("div"),l=p("p"),l.textContent="Esta herramienta te ayuda a calcular el promedio de las\n                    calificaciones de tus materias.",o=h(),r=p("p"),r.textContent="Las calificaciones se ingresan sobre 100 y se calcula su\n                    promedio de acuerdo al porcentaje práctico/teórico de la\n                    materia.",a=h(),c=p("strong"),c.textContent="Nuevo",i=h(),m=p("p"),m.innerHTML='Esta aplicación puede ser instalada en teléfono mobiles\n                    gracias al .\n                    <a href="https://developer.mozilla.org/es/docs/Web/Progressive_web_apps" target="_blank" class="svelte-260bdv">Progresive Web App (PWA)</a>. Si\n                    <strong>NO</strong>\n                    aceptaste la instalación puedes borrar caché e intentar de\n                    nuevo, revisa\n                    <a href="https://github.com/Xidrovo/calculadoraESPOL" target="_blank" class="svelte-260bdv"><strong>aquí</strong></a>\n                    cómo hacerlo. ¡Gracias!',$=h(),x=p("p"),x.textContent="Creado por Xavier Idrovo Vallejo",g=h(),y=p("div"),y.innerHTML='<div class="link-title svelte-260bdv">Contacto</div> \n                <div class="flex flex-col social-media svelte-260bdv"><a href="https://github.com/Xidrovo" target="_blank" class="svelte-260bdv">Github</a> \n                    <a href="https://www.linkedin.com/in/xavier-idrovo-vallejo-34a4b2119/" target="_blank" class="svelte-260bdv">LinkedIn</a> \n                    <div class="svelte-260bdv">Email: Xidrovo@hotmail.com</div></div>',b(n,"class",v=s((t[0]?"w-half":"w-full")+" desc-text")+" svelte-260bdv"),b(y,"class","flex flex-col social svelte-260bdv"),b(e,"class",w=s(`footer flex ${t[0]?"flex-row":"flex-col"} justify-between `)+" svelte-260bdv")},m(t,s){u(t,e,s),d(e,n),d(n,l),d(n,o),d(n,r),d(n,a),d(n,c),d(n,i),d(n,m),d(n,$),d(n,x),d(e,g),d(e,y)},p(t,l){1&l&&v!==(v=s((t[0]?"w-half":"w-full")+" desc-text")+" svelte-260bdv")&&b(n,"class",v),1&l&&w!==(w=s(`footer flex ${t[0]?"flex-row":"flex-col"} justify-between `)+" svelte-260bdv")&&b(e,"class",w)},d(t){t&&f(e)}}}function Z(t){let e,n,l;return n=new U({props:{query:"(min-width: 1281px)",$$slots:{default:[Y,({matches:t})=>({0:t}),({matches:t})=>t?1:0]},$$scope:{ctx:t}}}),{c(){e=p("main"),X(n.$$.fragment)},m(t,o){u(t,e,o),H(n,e,null),l=!0},p(t,[e]){const l={};3&e&&(l.$$scope={dirty:e,ctx:t}),n.$set(l)},i(t){l||(S(n.$$.fragment,t),l=!0)},o(t){T(n.$$.fragment,t),l=!1},d(t){t&&f(e),W(n)}}}class tt extends G{constructor(t){super(),B(this,t,null,Z,a,{})}}function et(t){let n,l,r,a,c,i,s,m,$,y,_,j,k,C,q,E,O,L,N,P,A,M,I,F,D,S,T,X,H,W,z=[t[8],{name:"first"},{placeholder:"ej: 80"}],B={};for(let t=0;t<z.length;t+=1)B=e(B,z[t]);let G=[{name:"second"},{placeholder:"ej: 75"},t[8]],V={};for(let t=0;t<G.length;t+=1)V=e(V,G[t]);let J=[{name:"practique"},{placeholder:"ej: 90"},t[8]],K={};for(let t=0;t<J.length;t+=1)K=e(K,J[t]);let Q=[{name:"third"},{placeholder:"ej: 90"},t[8]],U={};for(let t=0;t<Q.length;t+=1)U=e(U,Q[t]);return{c(){n=p("div"),l=p("div"),r=p("div"),a=p("label"),c=p("p"),c.textContent="Primer Parcial sobre 100",i=h(),s=p("input"),m=h(),$=p("div"),y=p("label"),_=p("p"),_.textContent="Parcial sobre 100",j=h(),k=p("input"),q=h(),E=p("div"),O=p("div"),L=p("label"),N=p("p"),N.textContent="Nota prácitca",P=h(),A=p("input"),M=h(),I=p("div"),F=p("label"),D=p("p"),D.textContent="Mejoramiento",S=h(),T=p("input"),b(c,"class","text-label"),g(s,B),b(a,"class","flex flex-col"),b(a,"for","first"),b(r,"class","mr-4"),b(_,"class","text-label"),b(_,"primer",""),g(k,V),b(y,"class","flex flex-col"),b(y,"for","second"),b(l,"class",C="flex "+(t[24]?"flex-row":"flex-col")),b(N,"class","text-label"),g(A,K),b(L,"class","flex flex-col"),b(L,"for","practique"),b(O,"class","mr-4"),b(D,"class","text-label"),g(T,U),b(F,"class","flex flex-col"),b(F,"for","third"),b(E,"class",X="flex "+(t[24]?"flex-row":"flex-col mb-2")),b(n,"class","flex flex-col")},m(e,o){u(e,n,o),d(n,l),d(l,r),d(r,a),d(a,c),d(a,i),d(a,s),w(s,t[2]),d(l,m),d(l,$),d($,y),d(y,_),d(y,j),d(y,k),w(k,t[3]),d(n,q),d(n,E),d(E,O),d(O,L),d(L,N),d(L,P),d(L,A),w(A,t[1]),d(E,M),d(E,I),d(I,F),d(F,D),d(F,S),d(F,T),w(T,t[4]),H||(W=[x(s,"input",v(t[11])),x(s,"input",t[14]),x(k,"input",v(t[11])),x(k,"input",t[15]),x(A,"input",v(t[11])),x(A,"input",t[16]),x(T,"input",v(t[11])),x(T,"input",t[17])],H=!0)},p(t,e){g(s,B=R(z,[t[8],{name:"first"},{placeholder:"ej: 80"}])),4&e&&s.value!==t[2]&&w(s,t[2]),g(k,V=R(G,[{name:"second"},{placeholder:"ej: 75"},t[8]])),8&e&&k.value!==t[3]&&w(k,t[3]),16777216&e&&C!==(C="flex "+(t[24]?"flex-row":"flex-col"))&&b(l,"class",C),g(A,K=R(J,[{name:"practique"},{placeholder:"ej: 90"},t[8]])),2&e&&A.value!==t[1]&&w(A,t[1]),g(T,U=R(Q,[{name:"third"},{placeholder:"ej: 90"},t[8]])),16&e&&T.value!==t[4]&&w(T,t[4]),16777216&e&&X!==(X="flex "+(t[24]?"flex-row":"flex-col mb-2"))&&b(E,"class",X)},d(t){t&&f(n),H=!1,o(W)}}}function nt(t){let e,n,l,o,r,a,c,i,s,$,x,v=""+(t[5]>=60?"¡ Felicidades has Aprobado :D !":"¡ Oh no has Reprobado :( !"),g=t[5]<60&&lt(t);return{c(){e=p("div"),n=p("div"),l=p("div"),o=m(v),r=h(),a=p("div"),c=m(t[5]),i=m("\n\t\t\t\t\t\t\t\tde 100"),$=h(),g&&g.c(),b(a,"class","bold margin-score"),b(n,"class",s="veredict-text failed w-half "+(t[5]>=60?"aproved-text":"failed-text ")),b(e,"class",x=`w-right flex flex-col justify-around h-full ${!t[6]&&"hidden"}`)},m(t,s){u(t,e,s),d(e,n),d(n,l),d(l,o),d(n,r),d(n,a),d(a,c),d(a,i),d(e,$),g&&g.m(e,null)},p(t,l){32&l&&v!==(v=""+(t[5]>=60?"¡ Felicidades has Aprobado :D !":"¡ Oh no has Reprobado :( !"))&&y(o,v),32&l&&y(c,t[5]),32&l&&s!==(s="veredict-text failed w-half "+(t[5]>=60?"aproved-text":"failed-text "))&&b(n,"class",s),t[5]<60?g?g.p(t,l):(g=lt(t),g.c(),g.m(e,null)):g&&(g.d(1),g=null),64&l&&x!==(x=`w-right flex flex-col justify-around h-full ${!t[6]&&"hidden"}`)&&b(e,"class",x)},d(t){t&&f(e),g&&g.d()}}}function lt(t){let e,n,l,o,r,a,c;return{c(){e=p("div"),n=p("div"),n.textContent="Nota mínima para aprobar",l=h(),o=p("div"),r=m(t[7]),a=m("\n\t\t\t\t\t\t\t\t\tde 100"),b(o,"class","bold margin-score"),b(e,"class",c="veredict-text failed w-half "+(t[5]>=60?"aproved-text":"failed-text "))},m(t,c){u(t,e,c),d(e,n),d(e,l),d(e,o),d(o,r),d(o,a)},p(t,n){128&n&&y(r,t[7]),32&n&&c!==(c="veredict-text failed w-half "+(t[5]>=60?"aproved-text":"failed-text "))&&b(e,"class",c)},d(t){t&&f(e)}}}function ot(t){let e,n=t[24]&&nt(t);return{c(){n&&n.c(),e=$()},m(t,l){n&&n.m(t,l),u(t,e,l)},p(t,l){t[24]?n?n.p(t,l):(n=nt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&f(e)}}}function rt(e){let n,l,o,r;return{c(){n=p("div"),l=p("button"),l.textContent="¡Calcular!",b(l,"id","calc-btn"),b(l,"class","button"),b(n,"class","w-full align-center flex flex-row justify-center")},m(t,a){u(t,n,a),d(n,l),o||(r=x(l,"click",e[10]),o=!0)},p:t,d(t){t&&f(n),o=!1,r()}}}function at(t){let e,n,l,o,r,a,c,i,s,$,x,v=""+(t[5]>=60?"¡ Felicidades has Aprobado :D !":"¡ Oh no has Reprobado :( !"),g=t[5]<60&&ct(t);return{c(){e=p("div"),n=p("div"),l=p("div"),o=m(v),r=h(),a=p("div"),c=m(t[5]),i=m("\n\t\t\t\t\t\t\tde 100"),$=h(),g&&g.c(),b(a,"class","bold margin-score"),b(n,"class",s="veredict-text failed "+(t[5]>=60?"aproved-text":"failed-text ")),b(e,"class",x=`block w-right flex flex-col ${!t[6]&&"none"}`)},m(t,s){u(t,e,s),d(e,n),d(n,l),d(l,o),d(n,r),d(n,a),d(a,c),d(a,i),d(e,$),g&&g.m(e,null)},p(t,l){32&l&&v!==(v=""+(t[5]>=60?"¡ Felicidades has Aprobado :D !":"¡ Oh no has Reprobado :( !"))&&y(o,v),32&l&&y(c,t[5]),32&l&&s!==(s="veredict-text failed "+(t[5]>=60?"aproved-text":"failed-text "))&&b(n,"class",s),t[5]<60?g?g.p(t,l):(g=ct(t),g.c(),g.m(e,null)):g&&(g.d(1),g=null),64&l&&x!==(x=`block w-right flex flex-col ${!t[6]&&"none"}`)&&b(e,"class",x)},d(t){t&&f(e),g&&g.d()}}}function ct(t){let e,n,l,o,r,a,c;return{c(){e=p("div"),n=p("div"),n.textContent="Nota mínima para aprobar",l=h(),o=p("div"),r=m(t[7]),a=m("\n\t\t\t\t\t\t\t\tde 100"),b(o,"class","bold margin-score"),b(e,"class",c="veredict-text failed "+(t[5]>=60?"aproved-text":"failed-text "))},m(t,c){u(t,e,c),d(e,n),d(e,l),d(e,o),d(o,r),d(o,a)},p(t,n){128&n&&y(r,t[7]),32&n&&c!==(c="veredict-text failed "+(t[5]>=60?"aproved-text":"failed-text "))&&b(e,"class",c)},d(t){t&&f(e)}}}function it(t){let e,n=!t[24]&&at(t);return{c(){n&&n.c(),e=$()},m(t,l){n&&n.m(t,l),u(t,e,l)},p(t,l){t[24]?n&&(n.d(1),n=null):n?n.p(t,l):(n=at(t),n.c(),n.m(e.parentNode,e))},d(t){n&&n.d(t),t&&f(e)}}}function st(t){let n,l,r,a,c,i,s,m,$,y,_,j,k,C,q,E,O,L,N,P,A,M,I,F,D=[{placeholder:"ej: 80"},{name:"theoric"},{class:"max-m-input"},t[8]],z={};for(let t=0;t<D.length;t+=1)z=e(z,D[t]);return k=new U({props:{query:"(min-width: 1281px)",$$slots:{default:[et,({matches:t})=>({24:t}),({matches:t})=>t?16777216:0]},$$scope:{ctx:t}}}),q=new U({props:{query:"(min-width: 1281px)",$$slots:{default:[ot,({matches:t})=>({24:t}),({matches:t})=>t?16777216:0]},$$scope:{ctx:t}}}),O=new U({props:{query:"(min-width: 1281px)",$$slots:{default:[rt,({matches:t})=>({24:t}),({matches:t})=>t?16777216:0]},$$scope:{ctx:t}}}),N=new U({props:{query:"(min-width: 1281px)",$$slots:{default:[it,({matches:t})=>({24:t}),({matches:t})=>t?16777216:0]},$$scope:{ctx:t}}}),A=new tt({}),{c(){n=p("main"),l=p("div"),l.innerHTML='<div class="m-nav text-white semibold title">Calculadora de promedios ESPOL</div>',r=h(),a=p("div"),c=p("div"),i=p("div"),s=p("div"),m=p("label"),$=p("p"),$.textContent="Porcentaje teórico",y=h(),_=p("input"),j=h(),X(k.$$.fragment),C=h(),X(q.$$.fragment),E=h(),X(O.$$.fragment),L=h(),X(N.$$.fragment),P=h(),X(A.$$.fragment),b(l,"class","w-full nav-style"),b($,"class","text-label"),g(_,z),b(m,"class","flex flex-col"),b(m,"for","theoric"),b(s,"class","flex flex-col mb-2 mt-2"),b(i,"class","w-left my-auto flex-col flex"),b(c,"class","input-container flex-row h-input my-auto"),b(a,"class","container")},m(e,o){u(e,n,o),d(n,l),d(n,r),d(n,a),d(a,c),d(c,i),d(i,s),d(s,m),d(m,$),d(m,y),d(m,_),w(_,t[0]),d(i,j),H(k,i,null),d(c,C),H(q,c,null),d(a,E),H(O,a,null),d(a,L),H(N,a,null),d(n,P),H(A,n,null),M=!0,I||(F=[x(window,"keydown",t[9]),x(_,"input",v(t[11])),x(_,"input",t[13])],I=!0)},p(t,[e]){g(_,z=R(D,[{placeholder:"ej: 80"},{name:"theoric"},{class:"max-m-input"},t[8]])),1&e&&_.value!==t[0]&&w(_,t[0]);const n={};50331678&e&&(n.$$scope={dirty:e,ctx:t}),k.$set(n);const l={};50331872&e&&(l.$$scope={dirty:e,ctx:t}),q.$set(l);const o={};33554432&e&&(o.$$scope={dirty:e,ctx:t}),O.$set(o);const r={};50331872&e&&(r.$$scope={dirty:e,ctx:t}),N.$set(r)},i(t){M||(S(k.$$.fragment,t),S(q.$$.fragment,t),S(O.$$.fragment,t),S(N.$$.fragment,t),S(A.$$.fragment,t),M=!0)},o(t){T(k.$$.fragment,t),T(q.$$.fragment,t),T(O.$$.fragment,t),T(N.$$.fragment,t),T(A.$$.fragment,t),M=!1},d(t){t&&f(n),W(k),W(q),W(O),W(N),W(A),I=!1,o(F)}}}function dt(t,e,n){let l=0,o=0,r=0,a=0,c=0,i=0,s=0,d=!1,u=0;const f=t=>{if(t<60){const t=Math.max(r,a),e=2*(60-$)/(l/100)-t;isFinite(e)&&n(7,u=p(Math.abs(e)))}},p=t=>Math.round(100*(t+Number.EPSILON))/100,m=t=>t>100?100:t<0?0:parseInt(t,10);let h,$;return t.$$.update=()=>{if(28&t.$$.dirty){const t=parseInt(r,10)||0,e=parseInt(a,10)||0,l=parseInt(c,10)||0,o=Math.min(t,e,l);n(12,i=(t+e+l-o)/2)}4097&t.$$.dirty&&(h=i*(l/100)),3&t.$$.dirty&&($=o*((100-l)/100))},[l,o,r,a,c,s,d,u,{maxlength:3,min:"0",max:"100",type:"number"},t=>{if(13===t.keyCode){document.getElementById("calc-btn").click()}},()=>{d||n(6,d=!0);const t=h+$;n(5,s=p(t)),f(t)},t=>{const{target:e}=t,{value:i,name:s}=e;((t,e)=>{switch(t){case"theoric":return void n(0,l=m(e));case"first":return void n(2,r=m(e));case"second":return void n(3,a=m(e));case"third":return void n(4,c=m(e));case"practique":return void n(1,o=m(e));default:;}})(s,parseInt(i,10))},i,function(){l=this.value,n(0,l)},function(){r=this.value,n(2,r)},function(){a=this.value,n(3,a)},function(){o=this.value,n(1,o)},function(){c=this.value,n(4,c)}]}const ut=new class extends G{constructor(t){super(),B(this,t,dt,st,a,{})}}({target:document.body});return ut.use(express.static("public/build")),ut.get("*",((t,e)=>{e.sendFile(path.resolve(__dirname,"public/build","index.html"))})),ut}();
//# sourceMappingURL=bundle.js.map
