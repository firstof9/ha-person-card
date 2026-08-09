var Et=Object.defineProperty;var Ct=Object.getOwnPropertyDescriptor;var v=(o,t,e,i)=>{for(var s=i>1?void 0:i?Ct(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Et(t,e,s),s};var B=globalThis,V=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),nt=new WeakMap,R=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&nt.set(e,t))}return t}toString(){return this.cssText}},at=o=>new R(typeof o=="string"?o:o+"",void 0,Z),L=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new R(e,o,Z)},ct=(o,t)=>{if(V)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=B.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},Y=V?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return at(e)})(o):o;var{is:St,defineProperty:kt,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Pt,getOwnPropertySymbols:Rt,getPrototypeOf:Lt}=Object,b=globalThis,lt=b.trustedTypes,Tt=lt?lt.emptyScript:"",Ut=b.reactiveElementPolyfillSupport,T=(o,t)=>o,U={toAttribute(o,t){switch(t){case Boolean:o=o?Tt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},q=(o,t)=>!St(o,t),ht={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&kt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Ot(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let a=s?.call(this);r?.call(this,n),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,i=[...Pt(e),...Rt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Y(s))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:U).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:U;this._$Em=s;let a=n.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let n=this.constructor;if(s===!1&&(r=this[t]),i??(i=n.getPropertyOptions(t)),!((i.hasChanged??q)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[T("elementProperties")]=new Map,y[T("finalized")]=new Map,Ut?.({ReactiveElement:y}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");var M=globalThis,dt=o=>o,F=M.trustedTypes,pt=F?F.createPolicy("lit-html",{createHTML:o=>o}):void 0,_t="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+$,Nt=`<${vt}>`,A=document,H=()=>A.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",rt=Array.isArray,Mt=o=>rt(o)||typeof o?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,ft=/>/g,x=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,mt=/"/g,bt=/^(?:script|style|textarea|title)$/i,ot=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=ot(1),Zt=ot(2),Yt=ot(3),E=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),yt=new WeakMap,w=A.createTreeWalker(A,129);function $t(o,t){if(!rt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var Ht=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",n=N;for(let a=0;a<e;a++){let c=o[a],d,l,h=-1,p=0;for(;p<c.length&&(n.lastIndex=p,l=n.exec(c),l!==null);)p=n.lastIndex,n===N?l[1]==="!--"?n=ut:l[1]!==void 0?n=ft:l[2]!==void 0?(bt.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=x):l[3]!==void 0&&(n=x):n===x?l[0]===">"?(n=s??N,h=-1):l[1]===void 0?h=-2:(h=n.lastIndex-l[2].length,d=l[1],n=l[3]===void 0?x:l[3]==='"'?mt:gt):n===mt||n===gt?n=x:n===ut||n===ft?n=N:(n=x,s=void 0);let g=n===x&&o[a+1].startsWith("/>")?" ":"";r+=n===N?c+Nt:h>=0?(i.push(d),c.slice(0,h)+_t+c.slice(h)+$+g):c+$+(h===-2?a:g)}return[$t(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},I=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,a=t.length-1,c=this.parts,[d,l]=Ht(t,e);if(this.el=o.createElement(d,i),w.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=w.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(_t)){let p=l[n++],g=s.getAttribute(h).split($),_=/([.?@])?(.*)/.exec(p);c.push({type:1,index:r,name:_[2],strings:g,ctor:_[1]==="."?tt:_[1]==="?"?et:_[1]==="@"?it:S}),s.removeAttribute(h)}else h.startsWith($)&&(c.push({type:6,index:r}),s.removeAttribute(h));if(bt.test(s.tagName)){let h=s.textContent.split($),p=h.length-1;if(p>0){s.textContent=F?F.emptyScript:"";for(let g=0;g<p;g++)s.append(h[g],H()),w.nextNode(),c.push({type:2,index:++r});s.append(h[p],H())}}}else if(s.nodeType===8)if(s.data===vt)c.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)c.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function C(o,t,e=o,i){if(t===E)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=z(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=C(o,s._$AS(o,t.values),s,i)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);w.currentNode=s;let r=w.nextNode(),n=0,a=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new D(r,r.nextSibling,this,t):c.type===1?d=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(d=new st(r,this,t)),this._$AV.push(d),c=i[++a]}n!==c?.index&&(r=w.nextNode(),n++)}return w.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},D=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),z(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=I.createElement($t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new X(s,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=yt.get(t.strings);return e===void 0&&yt.set(t.strings,e=new I(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new o(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=dt(t).nextSibling;dt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=f}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=C(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{let a=t,c,d;for(t=r[0],c=0;c<r.length-1;c++)d=C(this,a[i+c],e,c),d===E&&(d=this._$AH[c]),n||(n=!z(d)||d!==this._$AH[c]),d===f?t=f:t!==f&&(t+=(d??"")+r[c+1]),this._$AH[c]=d}n&&!s&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},et=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},it=class extends S{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??f)===E)return;let i=this._$AH,s=t===f&&i!==f||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==f&&(i===f||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},st=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var zt=M.litHtmlPolyfillSupport;zt?.(I,D),(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.3.3");var xt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new D(t.insertBefore(H(),r),r,void 0,e??{})}return s._$AI(o),s};var j=globalThis,m=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};m._$litElement$=!0,m.finalized=!0,j.litElementHydrateSupport?.({LitElement:m});var It=j.litElementPolyfillSupport;It?.({LitElement:m});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");var W=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)};var Dt={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:q},jt=(o=Dt,t,e)=>{let{kind:i,metadata:s}=e,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){let{name:n}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,c,o,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,o,a),a}}}if(i==="setter"){let{name:n}=e;return function(a){let c=this[n];t.call(this,a),this.requestUpdate(n,c,o,!0,a)}}throw Error("Unsupported decorator location: "+i)};function k(o){return(t,e)=>typeof e=="object"?jt(o,t,e):((i,s,r)=>{let n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}function G(o){return k({...o,state:!0,attribute:!1})}var wt=L`
  :host {
    display: block;
    --hpc-border-radius: 16px;
    --hpc-spacing: 16px;
  }

  ha-card {
    container-type: inline-size;
    position: relative;
    overflow: hidden;
    border-radius: var(--hpc-border-radius);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: var(--ha-card-box-shadow, 0px 4px 20px rgba(0, 0, 0, 0.08));
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    height: 100%;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  /* Header / Image section */
  .hero-section {
    position: relative;
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.4s ease-in-out;
    display: flex;
    align-items: flex-end;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.65) 100%
    );
  }

  .person-info {
    position: relative;
    z-index: 2;
    padding: var(--hpc-spacing);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }

  .person-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .person-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin: 0;
    line-height: 1.2;
  }

  .person-state-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    width: fit-content;
  }

  .state-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #8e8e93;
  }

  .state-dot.home {
    background-color: #34c759;
    box-shadow: 0 0 8px #34c759;
  }

  .state-dot.not_home {
    background-color: #ff9500;
    box-shadow: 0 0 8px #ff9500;
  }

  .state-dot.custom-zone {
    background-color: #007aff;
    box-shadow: 0 0 8px #007aff;
  }

  /* Entities Section */
  .entities-grid {
    padding: var(--hpc-spacing);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
  }

  .entity-tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
    transition: transform 0.2s ease, background-color 0.2s ease;
    cursor: pointer;
  }

  .entity-tile:hover {
    transform: translateY(-2px);
    background: var(--divider-color, rgba(0, 0, 0, 0.06));
  }

  .entity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
    color: #ffffff;
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .entity-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .entity-name {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .entity-state {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .warning-text {
    padding: 16px;
    color: var(--error-color, #db4437);
    font-weight: 500;
  }

  /* Picture Frame Overlay Layout */
  .frame-container {
    position: relative;
    width: 100%;
    padding-top: 117.77%; /* 530 / 450 aspect ratio */
    overflow: hidden;
    background-color: var(--ha-card-background, var(--card-background-color, #2d333c));
  }

  .hero-section.grayscale {
    filter: grayscale(100%);
  }

  .avatar-background {
    position: absolute;
    top: 44.3%;
    left: 50%;
    width: 71.1%;
    height: 60.38%;
    transform: translate(-50%, -50%);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    z-index: 1;
    transition: background-image 0.4s ease-in-out, filter 0.4s ease-in-out;
  }

  .avatar-background.grayscale {
    filter: grayscale(100%) opacity(0.85);
  }

  .frame-overlay-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 2;
    pointer-events: none;
  }

  /* Overlay Slots */
  .slot {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    user-select: none;
  }

  .slot.top-left {
    top: 9.8%;
    left: 12%;
    width: 18%;
    height: 15.8%;
  }

  .slot.top-right {
    top: 9.8%;
    left: 88%;
    width: 18%;
    height: 15.8%;
  }

  .slot.bottom-left {
    top: 72.6%;
    left: 12%;
    width: 18%;
    height: 15.8%;
    text-align: center;
  }

  .slot.bottom-right {
    top: 72.6%;
    left: 88%;
    width: 18%;
    height: 15.8%;
    text-align: center;
  }

  .slot.bottom-center {
    top: 91.5%;
    left: 50%;
    width: 90%;
    height: 13%;
    flex-direction: column;
    gap: 2px;
  }

  .slot ha-icon {
    --mdc-icon-size: clamp(22px, 9cqw, 44px);
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
  }

  .slot-label {
    font-size: clamp(0.75rem, 4.2cqw, 1.3rem);
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }

  .frame-person-name {
    font-size: clamp(0.85rem, 4.5cqw, 1.3rem);
    font-weight: 700;
    color: #ffffff;
    line-height: 1.1;
  }

  .frame-person-state {
    font-size: clamp(1rem, 5.5cqw, 1.6rem);
    font-weight: 700;
    color: #ffffff;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }
`;function J(o,t,e){if(!o||!t)return"";let i=o.states[t];if(!i)return"";let s=i.entity_id.replace("person.","").toLowerCase(),r=(i.attributes.source||"").replace("device_tracker.","").toLowerCase(),n=(i.attributes.device_trackers||[]).map(d=>d.replace("device_tracker.","").toLowerCase()),a=Array.from(new Set([s,r,...n].filter(Boolean))),c=Object.keys(o.states);if(e===0)return c.find(l=>{let h=o.states[l];return(l.includes("battery")||h?.attributes?.device_class==="battery")&&a.some(g=>l.toLowerCase().includes(g))})||"";if(e===1){let d=c.find(h=>{let p=h.toLowerCase();return(p.includes("wi_fi_signal_strength")||p.includes("wifi_signal_strength")||p.includes("wifi_signal")||p.includes("signal_strength"))&&a.some(_=>p.includes(_))});return d||c.find(h=>{let p=h.toLowerCase();return(p.includes("wifi")||p.includes("wi_fi")||p.includes("ssid"))&&a.some(_=>p.includes(_))})||""}return e===2?c.find(l=>(l.includes("drive")||l.includes("waze")||l.includes("travel")||l.includes("duration")||l.includes("eta"))&&a.some(p=>l.toLowerCase().includes(p)))||"":e===3&&c.find(l=>(l.includes("dist")||l.includes("distance"))&&a.some(p=>l.toLowerCase().includes(p)))||""}var Bt=["Top-Left Entity (Icon - e.g. Battery)","Top-Right Entity (Icon - e.g. Wi-Fi)","Bottom-Left Entity (Label - e.g. Drive Time)","Bottom-Right Entity (Label - e.g. Distance)"],O=class extends m{setConfig(t){this._config=t}static get styles(){return L`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 8px 0;
      }

      ha-entity-picker {
        width: 100%;
        display: block;
      }

      .ha-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
      }

      .toggle-label {
        font-size: 0.95rem;
        color: var(--primary-text-color, #212121);
      }

      .ha-textfield-container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .ha-textfield-box {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        border: 1px solid var(--mdc-text-field-idle-line-color, var(--divider-color, rgba(0, 0, 0, 0.38)));
        border-radius: 4px;
        background: var(--mdc-text-field-fill-color, transparent);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        box-sizing: border-box;
      }

      .ha-textfield-box:focus-within {
        border-color: var(--primary-color, #03a9f4);
        border-width: 2px;
      }

      .ha-textfield-label {
        position: absolute;
        top: -9px;
        left: 10px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--primary-color, var(--secondary-text-color, #727272));
        background: var(--card-background-color, var(--ha-card-background, #fff));
        padding: 0 4px;
        line-height: 1;
        pointer-events: none;
      }

      .ha-textfield-input {
        width: 100%;
        height: 48px;
        padding: 12px;
        border: none;
        background: transparent;
        color: var(--primary-text-color, #212121);
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        box-sizing: border-box;
      }

      .ha-textfield-input::placeholder {
        color: var(--secondary-text-color, rgba(0, 0, 0, 0.38));
        opacity: 0.6;
      }

      .ha-textfield-helper {
        font-size: 0.75rem;
        color: var(--secondary-text-color, #727272);
        padding: 4px 12px 0 12px;
      }

      .entities-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .section-header {
        font-weight: 600;
        font-size: 0.95rem;
        color: var(--primary-text-color, #212121);
      }
    `}render(){if(!this.hass||!this._config)return u``;let t=Object.keys(this.hass.states).filter(r=>r.startsWith("person.")),i=(this._config.entity?this.hass.states[this._config.entity]:void 0)?.attributes?.entity_picture||"",s=this._config.image||this._config.avatar_image||"";return u`
      <div class="card-config">
        <!-- Person Entity Picker -->
        <ha-entity-picker
          label="Person Entity"
          .hass=${this.hass}
          .value=${this._config.entity||""}
          .includeDomains=${["person"]}
          .includeEntities=${t}
          allow-custom-entity
          @value-changed=${r=>this._updateConfigValue("entity",r.detail.value)}
        ></ha-entity-picker>

        <!-- Section Header for Images -->
        <div class="section-header">Images & Framing</div>

        <!-- Avatar Image URL -->
        ${this._renderTextField("Avatar Image URL (Optional)","image",s,i||"e.g. /local/chris_avatar.png",!s&&i?"Defaults to Home Assistant person profile picture":"")}

        <!-- Home Image URL -->
        ${this._renderTextField("Home Image URL (Optional)","home_image",this._config.home_image||"",s||i||"e.g. /local/chris_home.png","Overrides avatar image when person state is home")}

        <!-- Away / Not Home Image URL -->
        ${this._renderTextField("Away / Not Home Image URL (Optional)","not_home_image",this._config.not_home_image||"",s||i||"e.g. /local/chris_away.png","Overrides avatar image when person state is away / not_home")}

        <!-- Overlay Frame Image URL -->
        ${this._renderTextField("Overlay Frame Image URL (Optional)","overlay_image",this._config.overlay_image||"","e.g. /local/card_frame.png","Leave blank to use built-in card frame")}

        <!-- Grayscale Toggle -->
        <div class="ha-toggle-row">
          <span class="toggle-label">Grayscale avatar when away / not home</span>
          <ha-switch
            .checked=${this._config.grayscale_not_home!==!1}
            @change=${r=>this._updateConfigValue("grayscale_not_home",r.target.checked)}
          ></ha-switch>
        </div>

        <!-- Card Slot Entities -->
        <div class="entities-section">
          <div class="section-header">Card Slot Entities</div>
          ${Bt.map((r,n)=>{let a=this._getEntityValue(n),c=J(this.hass,this._config?.entity,n),d=a||c||"",l=!a&&c?`Auto-detected from ${this._config?.entity||"person"}`:"";return u`
              <ha-entity-picker
                .label=${r}
                .hass=${this.hass}
                .value=${d}
                .placeholder=${c}
                .helper=${l}
                .index=${n}
                allow-custom-entity
                @value-changed=${this._entitySlotChanged}
              ></ha-entity-picker>
            `})}
        </div>
      </div>
    `}_renderTextField(t,e,i,s="",r=""){return u`
      <div class="ha-textfield-container">
        <div class="ha-textfield-box">
          <label class="ha-textfield-label">${t}</label>
          <input
            type="text"
            class="ha-textfield-input"
            .value=${i||""}
            placeholder=${s}
            @input=${n=>this._updateConfigValue(e,n.target.value)}
          />
        </div>
        ${r?u`<span class="ha-textfield-helper">${r}</span>`:u``}
      </div>
    `}_getEntityValue(t){if(!this._config?.entities||!Array.isArray(this._config.entities))return"";let e=this._config.entities[t];return e?typeof e=="string"?e:e.entity||"":""}_updateConfigValue(t,e){if(!this._config||this._config[t]===e)return;let i={...this._config,[t]:e};this._emitConfigChanged(i)}_entitySlotChanged(t){if(!this._config)return;let i=t.target.index,s=t.detail.value,r=Array.isArray(this._config.entities)?[...this._config.entities]:[];for(;r.length<4;)r.push("");i!==void 0&&i>=0&&i<4&&(r[i]=s||"");let n=r.length-1;for(;n>=0&&!r[n];)n--;let a=r.slice(0,n+1),c={...this._config,entities:a};this._emitConfigChanged(c)}_emitConfigChanged(t){let e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};v([k({attribute:!1})],O.prototype,"hass",2),v([G()],O.prototype,"_config",2),O=v([W("ha-person-card-editor")],O);var Vt='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 530"><defs><mask id="cutout"><rect width="450" height="530" fill="white"/><circle cx="225" cy="235" r="160" fill="black"/><circle cx="54" cy="52" r="42" fill="black"/><circle cx="396" cy="52" r="42" fill="black"/><circle cx="54" cy="385" r="42" fill="black"/><circle cx="396" cy="385" r="42" fill="black"/></mask></defs><rect width="450" height="450" fill="%233a414d" mask="url(%23cutout)"/><rect y="450" width="450" height="80" fill="%232d333c"/><circle cx="225" cy="235" r="160" fill="none" stroke="%23252a32" stroke-width="4"/><circle cx="54" cy="52" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="396" cy="52" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="54" cy="385" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="396" cy="385" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><line x1="0" y1="450" x2="450" y2="450" stroke="%23252a32" stroke-width="2"/></svg>',P=class extends m{static get commandHelp(){return"HA Person Card"}static getConfigElement(){return document.createElement("ha-person-card-editor")}static getStubConfig(t,e){return{type:"custom:ha-person-card",entity:e.find(s=>s.startsWith("person."))||"",name:"",home_image:"",not_home_image:"",overlay_image:"",entities:[]}}setConfig(t){if(!t.entity)throw new Error("Please define a person entity (e.g. entity: person.chris)");this._config={...t}}getCardSize(){return 4}getGridOptions(){return{rows:4,columns:6,min_rows:3,min_columns:3}}static get styles(){return wt}render(){if(!this.hass||!this._config||!this._config.entity)return u``;let t=this.hass.states[this._config.entity];if(!t)return u`
        <ha-card>
          <div class="warning-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;let e=t.state||"unknown",i=e.toLowerCase()==="home",s=this._config.name||t.attributes.friendly_name||this._config.entity,r=this._resolveImage(t,e,i);return this._config.layout==="card"?this._renderStandardCard(t,s,e,i,r):this._renderFrameCard(t,s,e,i,r)}_renderFrameCard(t,e,i,s,r){let n=this._config?.overlay_image||Vt,a=this._getEffectiveEntities(t),c=!s&&this._config?.grayscale_not_home!==!1;return u`
      <ha-card>
        <div class="frame-container">
          <!-- Layer 1: Avatar Image Behind Frame -->
          <div
            class="avatar-background ${c?"grayscale":""}"
            style="background-image: url('${r}');"
          ></div>

          <!-- Layer 2: Overlay Frame Image -->
          <img class="frame-overlay-img" src="${n}" alt="Frame Overlay" />

          <!-- Layer 3: Interactive Slots -->
          <!-- Slot 0: Top-Left (State Icon) -->
          <div
            class="slot top-left"
            @click=${()=>a[0]&&this._handleMoreInfo(a[0])}
          >
            ${this._renderSlotContent(a[0],"icon")}
          </div>

          <!-- Slot 1: Top-Right (State Icon) -->
          <div
            class="slot top-right"
            @click=${()=>a[1]&&this._handleMoreInfo(a[1])}
          >
            ${this._renderSlotContent(a[1],"icon")}
          </div>

          <!-- Slot 2: Bottom-Left (State Label) -->
          <div
            class="slot bottom-left"
            @click=${()=>a[2]&&this._handleMoreInfo(a[2])}
          >
            ${this._renderSlotContent(a[2],"label")}
          </div>

          <!-- Slot 3: Bottom-Right (State Label) -->
          <div
            class="slot bottom-right"
            @click=${()=>a[3]&&this._handleMoreInfo(a[3])}
          >
            ${this._renderSlotContent(a[3],"label")}
          </div>

          <!-- Bottom Center: Zone Location -->
          <div
            class="slot bottom-center"
            @click=${()=>this._handleMoreInfo(t.entity_id)}
          >
            <span class="frame-person-state">${i.replace("_"," ")}</span>
          </div>
        </div>
      </ha-card>
    `}_getEffectiveEntities(t){let e=(this._config?.entities||[]).map(s=>typeof s=="string"?s:s?.entity||""),i=[];for(let s=0;s<4;s++)if(e[s])i.push(e[s]);else{let r=J(this.hass,t.entity_id,s);i.push(r)}return i}_renderSlotContent(t,e){if(!t||!this.hass)return u``;let i=this.hass.states[t];if(!i)return u`<ha-icon icon="mdi:alert-circle-outline"></ha-icon>`;if(e==="icon"){let s=this._getDefaultIcon(i,t),r=this._getIconStyle(i,t);return u`<ha-icon .icon=${s} style=${r}></ha-icon>`}else{let s=i.attributes.unit_of_measurement||"";return u`<span class="slot-label">${i.state}${s?" "+s:""}</span>`}}_renderStandardCard(t,e,i,s,r){let n=this._getEffectiveEntities(t).filter(Boolean),a=!s&&this._config?.grayscale_not_home!==!1;return u`
      <ha-card>
        <div class="card-container">
          <div
            class="hero-section ${a?"grayscale":""}"
            style="background-image: url('${r}');"
          >
            <div class="hero-overlay"></div>
            <div class="person-info">
              <div class="person-details">
                <h2 class="person-name">${e}</h2>
                <div class="person-state-badge">
                  <span
                    class="state-dot ${s?"home":i==="not_home"?"not_home":"custom-zone"}"
                  ></span>
                  <span>${i.replace("_"," ")}</span>
                </div>
              </div>
            </div>
          </div>

          ${n.length>0?u`
                <div class="entities-grid">
                  ${n.map(c=>this._renderEntityTile(c))}
                </div>
              `:u``}
        </div>
      </ha-card>
    `}_resolveImage(t,e,i){if(i&&this._config?.home_image)return this._config.home_image;if(!i&&this._config?.not_home_image)return this._config.not_home_image;if(this._config?.state_image){if(this._config.state_image[e])return this._config.state_image[e];if(!i&&this._config.state_image.not_home)return this._config.state_image.not_home}return this._config?.image?this._config.image:this._config?.avatar_image?this._config.avatar_image:t.attributes.entity_picture?t.attributes.entity_picture:`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="100%" height="100%" fill="%232c3e50"/><text x="50%" y="50%" fill="%23ecf0f1" font-size="20" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(e)}</text></svg>`}_renderEntityTile(t){if(!this.hass)return u``;let e=typeof t=="string"?t:t.entity,i=typeof t=="object"?t:{entity:e},s=this.hass.states[e];if(!s)return u`
        <div class="entity-tile">
          <ha-icon class="entity-icon" icon="mdi:alert-circle-outline"></ha-icon>
          <div class="entity-details">
            <span class="entity-name">${e}</span>
            <span class="entity-state">Unavailable</span>
          </div>
        </div>
      `;let r=i.name||s.attributes.friendly_name||e.split(".")[1],n=i.icon||this._getDefaultIcon(s,e),a=this._getIconStyle(s,e),c=s.attributes.unit_of_measurement||"",d=`${s.state}${c?" "+c:""}`;return u`
      <div
        class="entity-tile"
        @click=${()=>this._handleMoreInfo(e)}
      >
        <ha-icon class="entity-icon" .icon=${n} style=${a}></ha-icon>
        <div class="entity-details">
          <span class="entity-name">${r}</span>
          <span class="entity-state">${d}</span>
        </div>
      </div>
    `}_getDefaultIcon(t,e){if(t.attributes.icon)return t.attributes.icon;let i=e.toLowerCase();if(i.includes("battery")||t.attributes.device_class==="battery"){let s=Number(t.state);return t.state==="charging"||!!t.attributes?.battery_charging||!!t.attributes?.is_charging?isNaN(s)?"mdi:battery-charging":s>=90?"mdi:battery-charging-100":s>=70?"mdi:battery-charging-70":s>=50?"mdi:battery-charging-50":s>=30?"mdi:battery-charging-30":"mdi:battery-charging-10":isNaN(s)||s>=90?"mdi:battery":s>=70?"mdi:battery-70":s>=50?"mdi:battery-50":s>=30?"mdi:battery-30":"mdi:battery-10"}return i.includes("wifi")||i.includes("wi_fi")?"mdi:wifi":i.includes("drive")||i.includes("waze")||i.includes("travel")?"mdi:car":i.includes("dist")||i.includes("distance")?"mdi:map-marker-distance":"mdi:eye"}_getIconStyle(t,e){if(e.toLowerCase().includes("battery")||t.attributes?.device_class==="battery"){let r=Number(t.state);if(t.state==="charging"||!!t.attributes?.battery_charging||!!t.attributes?.is_charging)return"color: var(--state-sensor-battery-charging-color, var(--state-sensor-battery-high-color, var(--success-color, #4caf50)));";if(!isNaN(r))return r<30?"color: var(--state-sensor-battery-low-color, var(--state-battery-low-color, var(--error-color, #f44336)));":r<70?"color: var(--state-sensor-battery-medium-color, var(--state-battery-medium-color, var(--warning-color, #ff9800)));":"color: var(--state-sensor-battery-high-color, var(--state-battery-high-color, var(--success-color, #4caf50)));"}return""}_handleMoreInfo(t){let e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}};v([k({attribute:!1})],P.prototype,"hass",2),v([G()],P.prototype,"_config",2),P=v([W("ha-person-card")],P);window.customCards=window.customCards||[];window.customCards.push({type:"ha-person-card",name:"HA Person Card",description:"A modern person card with home/not_home state images and associated entities",preview:!0});var At="VERSION",qt=At==="VERSION"?"DEV":At;console.info(`%c  HA-PERSON-CARD  
%c  Version ${qt}  `,"color: #010e81ff; font-weight: bold; background: #2d333c; padding:3px 0px;","color: white; font-weight: bold; background: dimgrey; padding:3px 0px;");export{P as HaPersonCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
