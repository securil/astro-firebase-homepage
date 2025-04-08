import{j as N}from"./jsx-runtime.D_zvdyIk.js";import{r as pr}from"./index.BVOCwoKb.js";function $t({title:i,value:e,icon:n="chart-line",change:r,changeLabel:o="전년 대비",color:l="default",size:h="md",showAnimation:v=!0}){const w={default:"bg-white hover:bg-gray-50",blue:"bg-blue-50 hover:bg-blue-100",green:"bg-green-50 hover:bg-green-100",red:"bg-red-50 hover:bg-red-100",yellow:"bg-yellow-50 hover:bg-yellow-100",purple:"bg-purple-50 hover:bg-purple-100",teal:"bg-teal-50 hover:bg-teal-100"},E={default:"bg-gray-100",blue:"bg-blue-100 text-blue-600",green:"bg-green-100 text-green-600",red:"bg-red-100 text-red-600",yellow:"bg-yellow-100 text-yellow-600",purple:"bg-purple-100 text-purple-600",teal:"bg-teal-100 text-teal-600"},b={sm:"p-4",md:"p-6",lg:"p-8"},A={sm:"text-xl",md:"text-2xl",lg:"text-3xl"},C=`/astro-firebase-homepage/images/svg/${n}.svg`,U=v?"transform transition-all duration-300 hover:scale-105 hover:shadow-md":"";return N.jsx("div",{className:`stat-card ${b[h]} rounded-lg shadow-sm ${w[l]} ${U} border border-gray-100`,children:N.jsxs("div",{className:"flex justify-between items-start",children:[N.jsxs("div",{children:[N.jsx("h3",{className:"text-sm font-medium text-gray-500",children:i}),N.jsx("p",{className:`${A[h]} font-bold mt-1 tracking-tight`,children:e}),r!==void 0&&N.jsxs("div",{className:"mt-2 flex items-center",children:[N.jsxs("span",{className:`text-sm font-medium ${r>=0?"text-green-600":"text-red-600"} flex items-center`,children:[r>=0?N.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:N.jsx("path",{fillRule:"evenodd",d:"M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})}):N.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-1",viewBox:"0 0 20 20",fill:"currentColor",children:N.jsx("path",{fillRule:"evenodd",d:"M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),Math.abs(r),"%"]}),N.jsx("span",{className:"text-xs text-gray-500 ml-1",children:o})]})]}),n&&N.jsx("div",{className:`w-12 h-12 rounded-full ${E[l]} flex items-center justify-center`,children:N.jsx("img",{src:C,alt:i,className:"w-6 h-6"})})]})})}const xo=()=>{};var gr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs=function(i){const e=[];let n=0;for(let r=0;r<i.length;r++){let o=i.charCodeAt(r);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&r+1<i.length&&(i.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(i.charCodeAt(++r)&1023),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128)}return e},Uo=function(i){const e=[];let n=0,r=0;for(;n<i.length;){const o=i[n++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const l=i[n++];e[r++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=i[n++],h=i[n++],v=i[n++],w=((o&7)<<18|(l&63)<<12|(h&63)<<6|v&63)-65536;e[r++]=String.fromCharCode(55296+(w>>10)),e[r++]=String.fromCharCode(56320+(w&1023))}else{const l=i[n++],h=i[n++];e[r++]=String.fromCharCode((o&15)<<12|(l&63)<<6|h&63)}}return e.join("")},ss={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<i.length;o+=3){const l=i[o],h=o+1<i.length,v=h?i[o+1]:0,w=o+2<i.length,E=w?i[o+2]:0,b=l>>2,A=(l&3)<<4|v>>4;let C=(v&15)<<2|E>>6,U=E&63;w||(U=64,h||(C=64)),r.push(n[b],n[A],n[C],n[U])}return r.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(rs(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Uo(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<i.length;){const l=n[i.charAt(o++)],v=o<i.length?n[i.charAt(o)]:0;++o;const E=o<i.length?n[i.charAt(o)]:64;++o;const A=o<i.length?n[i.charAt(o)]:64;if(++o,l==null||v==null||E==null||A==null)throw new jo;const C=l<<2|v>>4;if(r.push(C),E!==64){const U=v<<4&240|E>>2;if(r.push(U),A!==64){const k=E<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class jo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fo=function(i){const e=rs(i);return ss.encodeByteArray(e,!0)},Yt=function(i){return Fo(i).replace(/\./g,"")},os=function(i){try{return ss.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=()=>Bo().__FIREBASE_DEFAULTS__,Vo=()=>{if(typeof process>"u"||typeof gr>"u")return;const i=gr.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},$o=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&os(i[1]);return e&&JSON.parse(e)},Zn=()=>{try{return xo()||Ho()||Vo()||$o()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},as=i=>{var e,n;return(n=(e=Zn())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[i]},zo=i=>{const e=as(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},ls=()=>{var i;return(i=Zn())===null||i===void 0?void 0:i.config},cs=i=>{var e;return(e=Zn())===null||e===void 0?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",o=i.iat||0,l=i.sub||i.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}}},i);return[Yt(JSON.stringify(n)),Yt(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ko(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function qo(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Jo(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Xo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yo(){const i=q();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Qo(){try{return typeof indexedDB=="object"}catch{return!1}}function Zo(){return new Promise((i,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),i(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var l;e(((l=o.error)===null||l===void 0?void 0:l.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="FirebaseError";class me extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=ea,Object.setPrototypeOf(this,me.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,It.prototype.create)}}class It{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},o=`${this.service}/${e}`,l=this.errors[e],h=l?ta(l,r):"Error",v=`${this.serviceName}: ${h} (${o}).`;return new me(o,v,r)}}function ta(i,e){return i.replace(na,(n,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const na=/\{\$([^}]+)}/g;function ia(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Me(i,e){if(i===e)return!0;const n=Object.keys(i),r=Object.keys(e);for(const o of n){if(!r.includes(o))return!1;const l=i[o],h=e[o];if(mr(l)&&mr(h)){if(!Me(l,h))return!1}else if(l!==h)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function mr(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(i){const e=[];for(const[n,r]of Object.entries(i))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ra(i,e){const n=new sa(i,e);return n.subscribe.bind(n)}class sa{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let o;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");oa(e,["next","error","complete"])?o=e:o={next:e,error:n,complete:r},o.next===void 0&&(o.next=Mn),o.error===void 0&&(o.error=Mn),o.complete===void 0&&(o.complete=Mn);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function oa(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function Mn(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(i){return i&&i._delegate?i._delegate:i}class xe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Wo;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e?.identifier),o=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(l){if(o)return null;throw l}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ca(e))try{this.getOrInitializeService({instanceIdentifier:De})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const l=this.getOrInitializeService({instanceIdentifier:o});r.resolve(l)}catch{}}}}clearInstance(e=De){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=De){return this.instances.has(e)}getOptions(e=De){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[l,h]of this.instancesDeferred.entries()){const v=this.normalizeInstanceIdentifier(l);r===v&&h.resolve(o)}return o}onInit(e,n){var r;const o=this.normalizeInstanceIdentifier(n),l=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;l.add(e),this.onInitCallbacks.set(o,l);const h=this.instances.get(o);return h&&e(h,o),()=>{l.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const o of r)try{o(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:la(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=De){return this.component?this.component.multipleInstances?e:De:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function la(i){return i===De?void 0:i}function ca(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new aa(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(D||(D={}));const ua={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},da=D.INFO,fa={[D.DEBUG]:"log",[D.VERBOSE]:"log",[D.INFO]:"info",[D.WARN]:"warn",[D.ERROR]:"error"},pa=(i,e,...n)=>{if(e<i.logLevel)return;const r=new Date().toISOString(),o=fa[e];if(o)console[o](`[${r}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ei{constructor(e){this.name=e,this._logLevel=da,this._logHandler=pa,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ua[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}}const ga=(i,e)=>e.some(n=>i instanceof n);let vr,yr;function ma(){return vr||(vr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function va(){return yr||(yr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hs=new WeakMap,zn=new WeakMap,us=new WeakMap,xn=new WeakMap,ti=new WeakMap;function ya(i){const e=new Promise((n,r)=>{const o=()=>{i.removeEventListener("success",l),i.removeEventListener("error",h)},l=()=>{n(Se(i.result)),o()},h=()=>{r(i.error),o()};i.addEventListener("success",l),i.addEventListener("error",h)});return e.then(n=>{n instanceof IDBCursor&&hs.set(n,i)}).catch(()=>{}),ti.set(e,i),e}function _a(i){if(zn.has(i))return;const e=new Promise((n,r)=>{const o=()=>{i.removeEventListener("complete",l),i.removeEventListener("error",h),i.removeEventListener("abort",h)},l=()=>{n(),o()},h=()=>{r(i.error||new DOMException("AbortError","AbortError")),o()};i.addEventListener("complete",l),i.addEventListener("error",h),i.addEventListener("abort",h)});zn.set(i,e)}let Wn={get(i,e,n){if(i instanceof IDBTransaction){if(e==="done")return zn.get(i);if(e==="objectStoreNames")return i.objectStoreNames||us.get(i);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Se(i[e])},set(i,e,n){return i[e]=n,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function wa(i){Wn=i(Wn)}function Ia(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=i.call(Un(this),e,...n);return us.set(r,e.sort?e.sort():[e]),Se(r)}:va().includes(i)?function(...e){return i.apply(Un(this),e),Se(hs.get(this))}:function(...e){return Se(i.apply(Un(this),e))}}function Ea(i){return typeof i=="function"?Ia(i):(i instanceof IDBTransaction&&_a(i),ga(i,ma())?new Proxy(i,Wn):i)}function Se(i){if(i instanceof IDBRequest)return ya(i);if(xn.has(i))return xn.get(i);const e=Ea(i);return e!==i&&(xn.set(i,e),ti.set(e,i)),e}const Un=i=>ti.get(i);function Ta(i,e,{blocked:n,upgrade:r,blocking:o,terminated:l}={}){const h=indexedDB.open(i,e),v=Se(h);return r&&h.addEventListener("upgradeneeded",w=>{r(Se(h.result),w.oldVersion,w.newVersion,Se(h.transaction),w)}),n&&h.addEventListener("blocked",w=>n(w.oldVersion,w.newVersion,w)),v.then(w=>{l&&w.addEventListener("close",()=>l()),o&&w.addEventListener("versionchange",E=>o(E.oldVersion,E.newVersion,E))}).catch(()=>{}),v}const ba=["get","getKey","getAll","getAllKeys","count"],Aa=["put","add","delete","clear"],jn=new Map;function _r(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(jn.get(e))return jn.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,o=Aa.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||ba.includes(n)))return;const l=async function(h,...v){const w=this.transaction(h,o?"readwrite":"readonly");let E=w.store;return r&&(E=E.index(v.shift())),(await Promise.all([E[n](...v),o&&w.done]))[0]};return jn.set(e,l),l}wa(i=>({...i,get:(e,n,r)=>_r(e,n)||i.get(e,n,r),has:(e,n)=>!!_r(e,n)||i.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ca(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Ca(i){const e=i.getComponent();return e?.type==="VERSION"}const Gn="@firebase/app",wr="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe=new ei("@firebase/app"),ka="@firebase/app-compat",Ra="@firebase/analytics-compat",Pa="@firebase/analytics",Oa="@firebase/app-check-compat",Na="@firebase/app-check",Da="@firebase/auth",La="@firebase/auth-compat",Ma="@firebase/database",xa="@firebase/data-connect",Ua="@firebase/database-compat",ja="@firebase/functions",Fa="@firebase/functions-compat",Ba="@firebase/installations",Ha="@firebase/installations-compat",Va="@firebase/messaging",$a="@firebase/messaging-compat",za="@firebase/performance",Wa="@firebase/performance-compat",Ga="@firebase/remote-config",Ka="@firebase/remote-config-compat",qa="@firebase/storage",Ja="@firebase/storage-compat",Xa="@firebase/firestore",Ya="@firebase/vertexai",Qa="@firebase/firestore-compat",Za="firebase",el="11.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="[DEFAULT]",tl={[Gn]:"fire-core",[ka]:"fire-core-compat",[Pa]:"fire-analytics",[Ra]:"fire-analytics-compat",[Na]:"fire-app-check",[Oa]:"fire-app-check-compat",[Da]:"fire-auth",[La]:"fire-auth-compat",[Ma]:"fire-rtdb",[xa]:"fire-data-connect",[Ua]:"fire-rtdb-compat",[ja]:"fire-fn",[Fa]:"fire-fn-compat",[Ba]:"fire-iid",[Ha]:"fire-iid-compat",[Va]:"fire-fcm",[$a]:"fire-fcm-compat",[za]:"fire-perf",[Wa]:"fire-perf-compat",[Ga]:"fire-rc",[Ka]:"fire-rc-compat",[qa]:"fire-gcs",[Ja]:"fire-gcs-compat",[Xa]:"fire-fst",[Qa]:"fire-fst-compat",[Ya]:"fire-vertex","fire-js":"fire-js",[Za]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=new Map,nl=new Map,qn=new Map;function Ir(i,e){try{i.container.addComponent(e)}catch(n){fe.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function Ke(i){const e=i.name;if(qn.has(e))return fe.debug(`There were multiple attempts to register component ${e}.`),!1;qn.set(e,i);for(const n of Qt.values())Ir(n,i);for(const n of nl.values())Ir(n,i);return!0}function ni(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function re(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ce=new It("app","Firebase",il);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new xe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ce.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye=el;function ds(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Kn,automaticDataCollectionEnabled:!1},e),o=r.name;if(typeof o!="string"||!o)throw Ce.create("bad-app-name",{appName:String(o)});if(n||(n=ls()),!n)throw Ce.create("no-options");const l=Qt.get(o);if(l){if(Me(n,l.options)&&Me(r,l.config))return l;throw Ce.create("duplicate-app",{appName:o})}const h=new ha(o);for(const w of qn.values())h.addComponent(w);const v=new rl(n,r,h);return Qt.set(o,v),v}function fs(i=Kn){const e=Qt.get(i);if(!e&&i===Kn&&ls())return ds();if(!e)throw Ce.create("no-app",{appName:i});return e}function ke(i,e,n){var r;let o=(r=tl[i])!==null&&r!==void 0?r:i;n&&(o+=`-${n}`);const l=o.match(/\s|\//),h=e.match(/\s|\//);if(l||h){const v=[`Unable to register library "${o}" with version "${e}":`];l&&v.push(`library name "${o}" contains illegal characters (whitespace or "/")`),l&&h&&v.push("and"),h&&v.push(`version name "${e}" contains illegal characters (whitespace or "/")`),fe.warn(v.join(" "));return}Ke(new xe(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl="firebase-heartbeat-database",ol=1,_t="firebase-heartbeat-store";let Fn=null;function ps(){return Fn||(Fn=Ta(sl,ol,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(_t)}catch(n){console.warn(n)}}}}).catch(i=>{throw Ce.create("idb-open",{originalErrorMessage:i.message})})),Fn}async function al(i){try{const n=(await ps()).transaction(_t),r=await n.objectStore(_t).get(gs(i));return await n.done,r}catch(e){if(e instanceof me)fe.warn(e.message);else{const n=Ce.create("idb-get",{originalErrorMessage:e?.message});fe.warn(n.message)}}}async function Er(i,e){try{const r=(await ps()).transaction(_t,"readwrite");await r.objectStore(_t).put(e,gs(i)),await r.done}catch(n){if(n instanceof me)fe.warn(n.message);else{const r=Ce.create("idb-set",{originalErrorMessage:n?.message});fe.warn(r.message)}}}function gs(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll=1024,cl=30;class hl{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new dl(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=Tr();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(h=>h.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>cl){const h=fl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){fe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Tr(),{heartbeatsToSend:r,unsentEntries:o}=ul(this._heartbeatsCache.heartbeats),l=Yt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(n){return fe.warn(n),""}}}function Tr(){return new Date().toISOString().substring(0,10)}function ul(i,e=ll){const n=[];let r=i.slice();for(const o of i){const l=n.find(h=>h.agent===o.agent);if(l){if(l.dates.push(o.date),br(n)>e){l.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),br(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class dl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Qo()?Zo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await al(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Er(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Er(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function br(i){return Yt(JSON.stringify({version:2,heartbeats:i})).length}function fl(i){if(i.length===0)return-1;let e=0,n=i[0].date;for(let r=1;r<i.length;r++)i[r].date<n&&(n=i[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(i){Ke(new xe("platform-logger",e=>new Sa(e),"PRIVATE")),Ke(new xe("heartbeat",e=>new hl(e),"PRIVATE")),ke(Gn,wr,i),ke(Gn,wr,"esm2017"),ke("fire-js","")}pl("");var Ar=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ms;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(m,u){function f(){}f.prototype=u.prototype,m.D=u.prototype,m.prototype=new f,m.prototype.constructor=m,m.C=function(p,g,_){for(var d=Array(arguments.length-2),le=2;le<arguments.length;le++)d[le-2]=arguments[le];return u.prototype[g].apply(p,d)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(m,u,f){f||(f=0);var p=Array(16);if(typeof u=="string")for(var g=0;16>g;++g)p[g]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(g=0;16>g;++g)p[g]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=m.g[0],f=m.g[1],g=m.g[2];var _=m.g[3],d=u+(_^f&(g^_))+p[0]+3614090360&4294967295;u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[1]+3905402710&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[2]+606105819&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[3]+3250441966&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[4]+4118548399&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[5]+1200080426&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[6]+2821735955&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[7]+4249261313&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[8]+1770035416&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[9]+2336552879&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[10]+4294925233&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[11]+2304563134&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[12]+1804603682&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[13]+4254626195&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[14]+2792965006&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[15]+1236535329&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(g^_&(f^g))+p[1]+4129170786&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[6]+3225465664&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[11]+643717713&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[0]+3921069994&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[5]+3593408605&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[10]+38016083&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[15]+3634488961&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[4]+3889429448&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[9]+568446438&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[14]+3275163606&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[3]+4107603335&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[8]+1163531501&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[13]+2850285829&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[2]+4243563512&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[7]+1735328473&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[12]+2368359562&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(f^g^_)+p[5]+4294588738&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[8]+2272392833&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[11]+1839030562&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[14]+4259657740&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[1]+2763975236&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[4]+1272893353&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[7]+4139469664&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[10]+3200236656&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[13]+681279174&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[0]+3936430074&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[3]+3572445317&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[6]+76029189&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[9]+3654602809&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[12]+3873151461&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[15]+530742520&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[2]+3299628645&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(g^(f|~_))+p[0]+4096336452&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[7]+1126891415&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[14]+2878612391&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[5]+4237533241&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[12]+1700485571&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[3]+2399980690&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[10]+4293915773&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[1]+2240044497&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[8]+1873313359&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[15]+4264355552&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[6]+2734768916&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[13]+1309151649&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[4]+4149444226&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[11]+3174756917&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[2]+718787259&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[9]+3951481745&4294967295,m.g[0]=m.g[0]+u&4294967295,m.g[1]=m.g[1]+(g+(d<<21&4294967295|d>>>11))&4294967295,m.g[2]=m.g[2]+g&4294967295,m.g[3]=m.g[3]+_&4294967295}r.prototype.u=function(m,u){u===void 0&&(u=m.length);for(var f=u-this.blockSize,p=this.B,g=this.h,_=0;_<u;){if(g==0)for(;_<=f;)o(this,m,_),_+=this.blockSize;if(typeof m=="string"){for(;_<u;)if(p[g++]=m.charCodeAt(_++),g==this.blockSize){o(this,p),g=0;break}}else for(;_<u;)if(p[g++]=m[_++],g==this.blockSize){o(this,p),g=0;break}}this.h=g,this.o+=u},r.prototype.v=function(){var m=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);m[0]=128;for(var u=1;u<m.length-8;++u)m[u]=0;var f=8*this.o;for(u=m.length-8;u<m.length;++u)m[u]=f&255,f/=256;for(this.u(m),m=Array(16),u=f=0;4>u;++u)for(var p=0;32>p;p+=8)m[f++]=this.g[u]>>>p&255;return m};function l(m,u){var f=v;return Object.prototype.hasOwnProperty.call(f,m)?f[m]:f[m]=u(m)}function h(m,u){this.h=u;for(var f=[],p=!0,g=m.length-1;0<=g;g--){var _=m[g]|0;p&&_==u||(f[g]=_,p=!1)}this.g=f}var v={};function w(m){return-128<=m&&128>m?l(m,function(u){return new h([u|0],0>u?-1:0)}):new h([m|0],0>m?-1:0)}function E(m){if(isNaN(m)||!isFinite(m))return A;if(0>m)return P(E(-m));for(var u=[],f=1,p=0;m>=f;p++)u[p]=m/f|0,f*=4294967296;return new h(u,0)}function b(m,u){if(m.length==0)throw Error("number format error: empty string");if(u=u||10,2>u||36<u)throw Error("radix out of range: "+u);if(m.charAt(0)=="-")return P(b(m.substring(1),u));if(0<=m.indexOf("-"))throw Error('number format error: interior "-" character');for(var f=E(Math.pow(u,8)),p=A,g=0;g<m.length;g+=8){var _=Math.min(8,m.length-g),d=parseInt(m.substring(g,g+_),u);8>_?(_=E(Math.pow(u,_)),p=p.j(_).add(E(d))):(p=p.j(f),p=p.add(E(d)))}return p}var A=w(0),C=w(1),U=w(16777216);i=h.prototype,i.m=function(){if(M(this))return-P(this).m();for(var m=0,u=1,f=0;f<this.g.length;f++){var p=this.i(f);m+=(0<=p?p:4294967296+p)*u,u*=4294967296}return m},i.toString=function(m){if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(k(this))return"0";if(M(this))return"-"+P(this).toString(m);for(var u=E(Math.pow(m,6)),f=this,p="";;){var g=ee(f,u).g;f=ae(f,g.j(u));var _=((0<f.g.length?f.g[0]:f.h)>>>0).toString(m);if(f=g,k(f))return _+p;for(;6>_.length;)_="0"+_;p=_+p}},i.i=function(m){return 0>m?0:m<this.g.length?this.g[m]:this.h};function k(m){if(m.h!=0)return!1;for(var u=0;u<m.g.length;u++)if(m.g[u]!=0)return!1;return!0}function M(m){return m.h==-1}i.l=function(m){return m=ae(this,m),M(m)?-1:k(m)?0:1};function P(m){for(var u=m.g.length,f=[],p=0;p<u;p++)f[p]=~m.g[p];return new h(f,~m.h).add(C)}i.abs=function(){return M(this)?P(this):this},i.add=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0,g=0;g<=u;g++){var _=p+(this.i(g)&65535)+(m.i(g)&65535),d=(_>>>16)+(this.i(g)>>>16)+(m.i(g)>>>16);p=d>>>16,_&=65535,d&=65535,f[g]=d<<16|_}return new h(f,f[f.length-1]&-2147483648?-1:0)};function ae(m,u){return m.add(P(u))}i.j=function(m){if(k(this)||k(m))return A;if(M(this))return M(m)?P(this).j(P(m)):P(P(this).j(m));if(M(m))return P(this.j(P(m)));if(0>this.l(U)&&0>m.l(U))return E(this.m()*m.m());for(var u=this.g.length+m.g.length,f=[],p=0;p<2*u;p++)f[p]=0;for(p=0;p<this.g.length;p++)for(var g=0;g<m.g.length;g++){var _=this.i(p)>>>16,d=this.i(p)&65535,le=m.i(g)>>>16,Ze=m.i(g)&65535;f[2*p+2*g]+=d*Ze,Q(f,2*p+2*g),f[2*p+2*g+1]+=_*Ze,Q(f,2*p+2*g+1),f[2*p+2*g+1]+=d*le,Q(f,2*p+2*g+1),f[2*p+2*g+2]+=_*le,Q(f,2*p+2*g+2)}for(p=0;p<u;p++)f[p]=f[2*p+1]<<16|f[2*p];for(p=u;p<2*u;p++)f[p]=0;return new h(f,0)};function Q(m,u){for(;(m[u]&65535)!=m[u];)m[u+1]+=m[u]>>>16,m[u]&=65535,u++}function B(m,u){this.g=m,this.h=u}function ee(m,u){if(k(u))throw Error("division by zero");if(k(m))return new B(A,A);if(M(m))return u=ee(P(m),u),new B(P(u.g),P(u.h));if(M(u))return u=ee(m,P(u)),new B(P(u.g),u.h);if(30<m.g.length){if(M(m)||M(u))throw Error("slowDivide_ only works with positive integers.");for(var f=C,p=u;0>=p.l(m);)f=Re(f),p=Re(p);var g=J(f,1),_=J(p,1);for(p=J(p,2),f=J(f,2);!k(p);){var d=_.add(p);0>=d.l(m)&&(g=g.add(f),_=d),p=J(p,1),f=J(f,1)}return u=ae(m,g.j(u)),new B(g,u)}for(g=A;0<=m.l(u);){for(f=Math.max(1,Math.floor(m.m()/u.m())),p=Math.ceil(Math.log(f)/Math.LN2),p=48>=p?1:Math.pow(2,p-48),_=E(f),d=_.j(u);M(d)||0<d.l(m);)f-=p,_=E(f),d=_.j(u);k(_)&&(_=C),g=g.add(_),m=ae(m,d)}return new B(g,m)}i.A=function(m){return ee(this,m).h},i.and=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)&m.i(p);return new h(f,this.h&m.h)},i.or=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)|m.i(p);return new h(f,this.h|m.h)},i.xor=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)^m.i(p);return new h(f,this.h^m.h)};function Re(m){for(var u=m.g.length+1,f=[],p=0;p<u;p++)f[p]=m.i(p)<<1|m.i(p-1)>>>31;return new h(f,m.h)}function J(m,u){var f=u>>5;u%=32;for(var p=m.g.length-f,g=[],_=0;_<p;_++)g[_]=0<u?m.i(_+f)>>>u|m.i(_+f+1)<<32-u:m.i(_+f);return new h(g,m.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=E,h.fromString=b,ms=h}).apply(typeof Ar<"u"?Ar:typeof self<"u"?self:typeof window<"u"?window:{});var zt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var i,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(t,s,a){return t==Array.prototype||t==Object.prototype||(t[s]=a.value),t};function n(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof zt=="object"&&zt];for(var s=0;s<t.length;++s){var a=t[s];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var r=n(this);function o(t,s){if(s)e:{var a=r;t=t.split(".");for(var c=0;c<t.length-1;c++){var y=t[c];if(!(y in a))break e;a=a[y]}t=t[t.length-1],c=a[t],s=s(c),s!=c&&s!=null&&e(a,t,{configurable:!0,writable:!0,value:s})}}function l(t,s){t instanceof String&&(t+="");var a=0,c=!1,y={next:function(){if(!c&&a<t.length){var I=a++;return{value:s(I,t[I]),done:!1}}return c=!0,{done:!0,value:void 0}}};return y[Symbol.iterator]=function(){return y},y}o("Array.prototype.values",function(t){return t||function(){return l(this,function(s,a){return a})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},v=this||self;function w(t){var s=typeof t;return s=s!="object"?s:t?Array.isArray(t)?"array":s:"null",s=="array"||s=="object"&&typeof t.length=="number"}function E(t){var s=typeof t;return s=="object"&&t!=null||s=="function"}function b(t,s,a){return t.call.apply(t.bind,arguments)}function A(t,s,a){if(!t)throw Error();if(2<arguments.length){var c=Array.prototype.slice.call(arguments,2);return function(){var y=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(y,c),t.apply(s,y)}}return function(){return t.apply(s,arguments)}}function C(t,s,a){return C=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?b:A,C.apply(null,arguments)}function U(t,s){var a=Array.prototype.slice.call(arguments,1);return function(){var c=a.slice();return c.push.apply(c,arguments),t.apply(this,c)}}function k(t,s){function a(){}a.prototype=s.prototype,t.aa=s.prototype,t.prototype=new a,t.prototype.constructor=t,t.Qb=function(c,y,I){for(var T=Array(arguments.length-2),L=2;L<arguments.length;L++)T[L-2]=arguments[L];return s.prototype[y].apply(c,T)}}function M(t){const s=t.length;if(0<s){const a=Array(s);for(let c=0;c<s;c++)a[c]=t[c];return a}return[]}function P(t,s){for(let a=1;a<arguments.length;a++){const c=arguments[a];if(w(c)){const y=t.length||0,I=c.length||0;t.length=y+I;for(let T=0;T<I;T++)t[y+T]=c[T]}else t.push(c)}}class ae{constructor(s,a){this.i=s,this.j=a,this.h=0,this.g=null}get(){let s;return 0<this.h?(this.h--,s=this.g,this.g=s.next,s.next=null):s=this.i(),s}}function Q(t){return/^[\s\xa0]*$/.test(t)}function B(){var t=v.navigator;return t&&(t=t.userAgent)?t:""}function ee(t){return ee[" "](t),t}ee[" "]=function(){};var Re=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function J(t,s,a){for(const c in t)s.call(a,t[c],c,t)}function m(t,s){for(const a in t)s.call(void 0,t[a],a,t)}function u(t){const s={};for(const a in t)s[a]=t[a];return s}const f="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function p(t,s){let a,c;for(let y=1;y<arguments.length;y++){c=arguments[y];for(a in c)t[a]=c[a];for(let I=0;I<f.length;I++)a=f[I],Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a])}}function g(t){var s=1;t=t.split(":");const a=[];for(;0<s&&t.length;)a.push(t.shift()),s--;return t.length&&a.push(t.join(":")),a}function _(t){v.setTimeout(()=>{throw t},0)}function d(){var t=cn;let s=null;return t.g&&(s=t.g,t.g=t.g.next,t.g||(t.h=null),s.next=null),s}class le{constructor(){this.h=this.g=null}add(s,a){const c=Ze.get();c.set(s,a),this.h?this.h.next=c:this.g=c,this.h=c}}var Ze=new ae(()=>new Qs,t=>t.reset());class Qs{constructor(){this.next=this.g=this.h=null}set(s,a){this.h=s,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let et,tt=!1,cn=new le,mi=()=>{const t=v.Promise.resolve(void 0);et=()=>{t.then(Zs)}};var Zs=()=>{for(var t;t=d();){try{t.h.call(t.g)}catch(a){_(a)}var s=Ze;s.j(t),100>s.h&&(s.h++,t.next=s.g,s.g=t)}tt=!1};function ve(){this.s=this.s,this.C=this.C}ve.prototype.s=!1,ve.prototype.ma=function(){this.s||(this.s=!0,this.N())},ve.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function H(t,s){this.type=t,this.g=this.target=s,this.defaultPrevented=!1}H.prototype.h=function(){this.defaultPrevented=!0};var eo=function(){if(!v.addEventListener||!Object.defineProperty)return!1;var t=!1,s=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const a=()=>{};v.addEventListener("test",a,s),v.removeEventListener("test",a,s)}catch{}return t}();function nt(t,s){if(H.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var a=this.type=t.type,c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=s,s=t.relatedTarget){if(Re){e:{try{ee(s.nodeName);var y=!0;break e}catch{}y=!1}y||(s=null)}}else a=="mouseover"?s=t.fromElement:a=="mouseout"&&(s=t.toElement);this.relatedTarget=s,c?(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:to[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&nt.aa.h.call(this)}}k(nt,H);var to={2:"touch",3:"pen",4:"mouse"};nt.prototype.h=function(){nt.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Ct="closure_listenable_"+(1e6*Math.random()|0),no=0;function io(t,s,a,c,y){this.listener=t,this.proxy=null,this.src=s,this.type=a,this.capture=!!c,this.ha=y,this.key=++no,this.da=this.fa=!1}function kt(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Rt(t){this.src=t,this.g={},this.h=0}Rt.prototype.add=function(t,s,a,c,y){var I=t.toString();t=this.g[I],t||(t=this.g[I]=[],this.h++);var T=un(t,s,c,y);return-1<T?(s=t[T],a||(s.fa=!1)):(s=new io(s,this.src,I,!!c,y),s.fa=a,t.push(s)),s};function hn(t,s){var a=s.type;if(a in t.g){var c=t.g[a],y=Array.prototype.indexOf.call(c,s,void 0),I;(I=0<=y)&&Array.prototype.splice.call(c,y,1),I&&(kt(s),t.g[a].length==0&&(delete t.g[a],t.h--))}}function un(t,s,a,c){for(var y=0;y<t.length;++y){var I=t[y];if(!I.da&&I.listener==s&&I.capture==!!a&&I.ha==c)return y}return-1}var dn="closure_lm_"+(1e6*Math.random()|0),fn={};function vi(t,s,a,c,y){if(Array.isArray(s)){for(var I=0;I<s.length;I++)vi(t,s[I],a,c,y);return null}return a=wi(a),t&&t[Ct]?t.K(s,a,E(c)?!!c.capture:!1,y):ro(t,s,a,!1,c,y)}function ro(t,s,a,c,y,I){if(!s)throw Error("Invalid event type");var T=E(y)?!!y.capture:!!y,L=gn(t);if(L||(t[dn]=L=new Rt(t)),a=L.add(s,a,c,T,I),a.proxy)return a;if(c=so(),a.proxy=c,c.src=t,c.listener=a,t.addEventListener)eo||(y=T),y===void 0&&(y=!1),t.addEventListener(s.toString(),c,y);else if(t.attachEvent)t.attachEvent(_i(s.toString()),c);else if(t.addListener&&t.removeListener)t.addListener(c);else throw Error("addEventListener and attachEvent are unavailable.");return a}function so(){function t(a){return s.call(t.src,t.listener,a)}const s=oo;return t}function yi(t,s,a,c,y){if(Array.isArray(s))for(var I=0;I<s.length;I++)yi(t,s[I],a,c,y);else c=E(c)?!!c.capture:!!c,a=wi(a),t&&t[Ct]?(t=t.i,s=String(s).toString(),s in t.g&&(I=t.g[s],a=un(I,a,c,y),-1<a&&(kt(I[a]),Array.prototype.splice.call(I,a,1),I.length==0&&(delete t.g[s],t.h--)))):t&&(t=gn(t))&&(s=t.g[s.toString()],t=-1,s&&(t=un(s,a,c,y)),(a=-1<t?s[t]:null)&&pn(a))}function pn(t){if(typeof t!="number"&&t&&!t.da){var s=t.src;if(s&&s[Ct])hn(s.i,t);else{var a=t.type,c=t.proxy;s.removeEventListener?s.removeEventListener(a,c,t.capture):s.detachEvent?s.detachEvent(_i(a),c):s.addListener&&s.removeListener&&s.removeListener(c),(a=gn(s))?(hn(a,t),a.h==0&&(a.src=null,s[dn]=null)):kt(t)}}}function _i(t){return t in fn?fn[t]:fn[t]="on"+t}function oo(t,s){if(t.da)t=!0;else{s=new nt(s,this);var a=t.listener,c=t.ha||t.src;t.fa&&pn(t),t=a.call(c,s)}return t}function gn(t){return t=t[dn],t instanceof Rt?t:null}var mn="__closure_events_fn_"+(1e9*Math.random()>>>0);function wi(t){return typeof t=="function"?t:(t[mn]||(t[mn]=function(s){return t.handleEvent(s)}),t[mn])}function V(){ve.call(this),this.i=new Rt(this),this.M=this,this.F=null}k(V,ve),V.prototype[Ct]=!0,V.prototype.removeEventListener=function(t,s,a,c){yi(this,t,s,a,c)};function W(t,s){var a,c=t.F;if(c)for(a=[];c;c=c.F)a.push(c);if(t=t.M,c=s.type||s,typeof s=="string")s=new H(s,t);else if(s instanceof H)s.target=s.target||t;else{var y=s;s=new H(c,t),p(s,y)}if(y=!0,a)for(var I=a.length-1;0<=I;I--){var T=s.g=a[I];y=Pt(T,c,!0,s)&&y}if(T=s.g=t,y=Pt(T,c,!0,s)&&y,y=Pt(T,c,!1,s)&&y,a)for(I=0;I<a.length;I++)T=s.g=a[I],y=Pt(T,c,!1,s)&&y}V.prototype.N=function(){if(V.aa.N.call(this),this.i){var t=this.i,s;for(s in t.g){for(var a=t.g[s],c=0;c<a.length;c++)kt(a[c]);delete t.g[s],t.h--}}this.F=null},V.prototype.K=function(t,s,a,c){return this.i.add(String(t),s,!1,a,c)},V.prototype.L=function(t,s,a,c){return this.i.add(String(t),s,!0,a,c)};function Pt(t,s,a,c){if(s=t.i.g[String(s)],!s)return!0;s=s.concat();for(var y=!0,I=0;I<s.length;++I){var T=s[I];if(T&&!T.da&&T.capture==a){var L=T.listener,F=T.ha||T.src;T.fa&&hn(t.i,T),y=L.call(F,c)!==!1&&y}}return y&&!c.defaultPrevented}function Ii(t,s,a){if(typeof t=="function")a&&(t=C(t,a));else if(t&&typeof t.handleEvent=="function")t=C(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(s)?-1:v.setTimeout(t,s||0)}function Ei(t){t.g=Ii(()=>{t.g=null,t.i&&(t.i=!1,Ei(t))},t.l);const s=t.h;t.h=null,t.m.apply(null,s)}class ao extends ve{constructor(s,a){super(),this.m=s,this.l=a,this.h=null,this.i=!1,this.g=null}j(s){this.h=arguments,this.g?this.i=!0:Ei(this)}N(){super.N(),this.g&&(v.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function it(t){ve.call(this),this.h=t,this.g={}}k(it,ve);var Ti=[];function bi(t){J(t.g,function(s,a){this.g.hasOwnProperty(a)&&pn(s)},t),t.g={}}it.prototype.N=function(){it.aa.N.call(this),bi(this)},it.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var vn=v.JSON.stringify,lo=v.JSON.parse,co=class{stringify(t){return v.JSON.stringify(t,void 0)}parse(t){return v.JSON.parse(t,void 0)}};function yn(){}yn.prototype.h=null;function Ai(t){return t.h||(t.h=t.i())}function ho(){}var rt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _n(){H.call(this,"d")}k(_n,H);function wn(){H.call(this,"c")}k(wn,H);var je={},Si=null;function In(){return Si=Si||new V}je.La="serverreachability";function Ci(t){H.call(this,je.La,t)}k(Ci,H);function st(t){const s=In();W(s,new Ci(s))}je.STAT_EVENT="statevent";function ki(t,s){H.call(this,je.STAT_EVENT,t),this.stat=s}k(ki,H);function G(t){const s=In();W(s,new ki(s,t))}je.Ma="timingevent";function Ri(t,s){H.call(this,je.Ma,t),this.size=s}k(Ri,H);function ot(t,s){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return v.setTimeout(function(){t()},s)}function at(){this.g=!0}at.prototype.xa=function(){this.g=!1};function uo(t,s,a,c,y,I){t.info(function(){if(t.g)if(I)for(var T="",L=I.split("&"),F=0;F<L.length;F++){var O=L[F].split("=");if(1<O.length){var $=O[0];O=O[1];var z=$.split("_");T=2<=z.length&&z[1]=="type"?T+($+"="+O+"&"):T+($+"=redacted&")}}else T=null;else T=I;return"XMLHTTP REQ ("+c+") [attempt "+y+"]: "+s+`
`+a+`
`+T})}function fo(t,s,a,c,y,I,T){t.info(function(){return"XMLHTTP RESP ("+c+") [ attempt "+y+"]: "+s+`
`+a+`
`+I+" "+T})}function Fe(t,s,a,c){t.info(function(){return"XMLHTTP TEXT ("+s+"): "+go(t,a)+(c?" "+c:"")})}function po(t,s){t.info(function(){return"TIMEOUT: "+s})}at.prototype.info=function(){};function go(t,s){if(!t.g)return s;if(!s)return null;try{var a=JSON.parse(s);if(a){for(t=0;t<a.length;t++)if(Array.isArray(a[t])){var c=a[t];if(!(2>c.length)){var y=c[1];if(Array.isArray(y)&&!(1>y.length)){var I=y[0];if(I!="noop"&&I!="stop"&&I!="close")for(var T=1;T<y.length;T++)y[T]=""}}}}return vn(a)}catch{return s}}var En={NO_ERROR:0,TIMEOUT:8},mo={},Tn;function Ot(){}k(Ot,yn),Ot.prototype.g=function(){return new XMLHttpRequest},Ot.prototype.i=function(){return{}},Tn=new Ot;function ye(t,s,a,c){this.j=t,this.i=s,this.l=a,this.R=c||1,this.U=new it(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pi}function Pi(){this.i=null,this.g="",this.h=!1}var Oi={},bn={};function An(t,s,a){t.L=1,t.v=Mt(ce(s)),t.m=a,t.P=!0,Ni(t,null)}function Ni(t,s){t.F=Date.now(),Nt(t),t.A=ce(t.v);var a=t.A,c=t.R;Array.isArray(c)||(c=[String(c)]),Gi(a.i,"t",c),t.C=0,a=t.j.J,t.h=new Pi,t.g=hr(t.j,a?s:null,!t.m),0<t.O&&(t.M=new ao(C(t.Y,t,t.g),t.O)),s=t.U,a=t.g,c=t.ca;var y="readystatechange";Array.isArray(y)||(y&&(Ti[0]=y.toString()),y=Ti);for(var I=0;I<y.length;I++){var T=vi(a,y[I],c||s.handleEvent,!1,s.h||s);if(!T)break;s.g[T.key]=T}s=t.H?u(t.H):{},t.m?(t.u||(t.u="POST"),s["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,s)):(t.u="GET",t.g.ea(t.A,t.u,null,s)),st(),uo(t.i,t.u,t.A,t.l,t.R,t.m)}ye.prototype.ca=function(t){t=t.target;const s=this.M;s&&he(t)==3?s.j():this.Y(t)},ye.prototype.Y=function(t){try{if(t==this.g)e:{const z=he(this.g);var s=this.g.Ba();const Ve=this.g.Z();if(!(3>z)&&(z!=3||this.g&&(this.h.h||this.g.oa()||Zi(this.g)))){this.J||z!=4||s==7||(s==8||0>=Ve?st(3):st(2)),Sn(this);var a=this.g.Z();this.X=a;t:if(Di(this)){var c=Zi(this.g);t="";var y=c.length,I=he(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Pe(this),lt(this);var T="";break t}this.h.i=new v.TextDecoder}for(s=0;s<y;s++)this.h.h=!0,t+=this.h.i.decode(c[s],{stream:!(I&&s==y-1)});c.length=0,this.h.g+=t,this.C=0,T=this.h.g}else T=this.g.oa();if(this.o=a==200,fo(this.i,this.u,this.A,this.l,this.R,z,a),this.o){if(this.T&&!this.K){t:{if(this.g){var L,F=this.g;if((L=F.g?F.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(L)){var O=L;break t}}O=null}if(a=O)Fe(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Cn(this,a);else{this.o=!1,this.s=3,G(12),Pe(this),lt(this);break e}}if(this.P){a=!0;let te;for(;!this.J&&this.C<T.length;)if(te=vo(this,T),te==bn){z==4&&(this.s=4,G(14),a=!1),Fe(this.i,this.l,null,"[Incomplete Response]");break}else if(te==Oi){this.s=4,G(15),Fe(this.i,this.l,T,"[Invalid Chunk]"),a=!1;break}else Fe(this.i,this.l,te,null),Cn(this,te);if(Di(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||T.length!=0||this.h.h||(this.s=1,G(16),a=!1),this.o=this.o&&a,!a)Fe(this.i,this.l,T,"[Invalid Chunked Response]"),Pe(this),lt(this);else if(0<T.length&&!this.W){this.W=!0;var $=this.j;$.g==this&&$.ba&&!$.M&&($.j.info("Great, no buffering proxy detected. Bytes received: "+T.length),Dn($),$.M=!0,G(11))}}else Fe(this.i,this.l,T,null),Cn(this,T);z==4&&Pe(this),this.o&&!this.J&&(z==4?or(this.j,this):(this.o=!1,Nt(this)))}else Lo(this.g),a==400&&0<T.indexOf("Unknown SID")?(this.s=3,G(12)):(this.s=0,G(13)),Pe(this),lt(this)}}}catch{}finally{}};function Di(t){return t.g?t.u=="GET"&&t.L!=2&&t.j.Ca:!1}function vo(t,s){var a=t.C,c=s.indexOf(`
`,a);return c==-1?bn:(a=Number(s.substring(a,c)),isNaN(a)?Oi:(c+=1,c+a>s.length?bn:(s=s.slice(c,c+a),t.C=c+a,s)))}ye.prototype.cancel=function(){this.J=!0,Pe(this)};function Nt(t){t.S=Date.now()+t.I,Li(t,t.I)}function Li(t,s){if(t.B!=null)throw Error("WatchDog timer not null");t.B=ot(C(t.ba,t),s)}function Sn(t){t.B&&(v.clearTimeout(t.B),t.B=null)}ye.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(po(this.i,this.A),this.L!=2&&(st(),G(17)),Pe(this),this.s=2,lt(this)):Li(this,this.S-t)};function lt(t){t.j.G==0||t.J||or(t.j,t)}function Pe(t){Sn(t);var s=t.M;s&&typeof s.ma=="function"&&s.ma(),t.M=null,bi(t.U),t.g&&(s=t.g,t.g=null,s.abort(),s.ma())}function Cn(t,s){try{var a=t.j;if(a.G!=0&&(a.g==t||kn(a.h,t))){if(!t.K&&kn(a.h,t)&&a.G==3){try{var c=a.Da.g.parse(s)}catch{c=null}if(Array.isArray(c)&&c.length==3){var y=c;if(y[0]==0){e:if(!a.u){if(a.g)if(a.g.F+3e3<t.F)Ht(a),Ft(a);else break e;Nn(a),G(18)}}else a.za=y[1],0<a.za-a.T&&37500>y[2]&&a.F&&a.v==0&&!a.C&&(a.C=ot(C(a.Za,a),6e3));if(1>=Ui(a.h)&&a.ca){try{a.ca()}catch{}a.ca=void 0}}else Ne(a,11)}else if((t.K||a.g==t)&&Ht(a),!Q(s))for(y=a.Da.g.parse(s),s=0;s<y.length;s++){let O=y[s];if(a.T=O[0],O=O[1],a.G==2)if(O[0]=="c"){a.K=O[1],a.ia=O[2];const $=O[3];$!=null&&(a.la=$,a.j.info("VER="+a.la));const z=O[4];z!=null&&(a.Aa=z,a.j.info("SVER="+a.Aa));const Ve=O[5];Ve!=null&&typeof Ve=="number"&&0<Ve&&(c=1.5*Ve,a.L=c,a.j.info("backChannelRequestTimeoutMs_="+c)),c=a;const te=t.g;if(te){const Vt=te.g?te.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vt){var I=c.h;I.g||Vt.indexOf("spdy")==-1&&Vt.indexOf("quic")==-1&&Vt.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(Rn(I,I.h),I.h=null))}if(c.D){const Ln=te.g?te.g.getResponseHeader("X-HTTP-Session-Id"):null;Ln&&(c.ya=Ln,x(c.I,c.D,Ln))}}a.G=3,a.l&&a.l.ua(),a.ba&&(a.R=Date.now()-t.F,a.j.info("Handshake RTT: "+a.R+"ms")),c=a;var T=t;if(c.qa=cr(c,c.J?c.ia:null,c.W),T.K){ji(c.h,T);var L=T,F=c.L;F&&(L.I=F),L.B&&(Sn(L),Nt(L)),c.g=T}else rr(c);0<a.i.length&&Bt(a)}else O[0]!="stop"&&O[0]!="close"||Ne(a,7);else a.G==3&&(O[0]=="stop"||O[0]=="close"?O[0]=="stop"?Ne(a,7):On(a):O[0]!="noop"&&a.l&&a.l.ta(O),a.v=0)}}st(4)}catch{}}var yo=class{constructor(t,s){this.g=t,this.map=s}};function Mi(t){this.l=t||10,v.PerformanceNavigationTiming?(t=v.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(v.chrome&&v.chrome.loadTimes&&v.chrome.loadTimes()&&v.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xi(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Ui(t){return t.h?1:t.g?t.g.size:0}function kn(t,s){return t.h?t.h==s:t.g?t.g.has(s):!1}function Rn(t,s){t.g?t.g.add(s):t.h=s}function ji(t,s){t.h&&t.h==s?t.h=null:t.g&&t.g.has(s)&&t.g.delete(s)}Mi.prototype.cancel=function(){if(this.i=Fi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Fi(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let s=t.i;for(const a of t.g.values())s=s.concat(a.D);return s}return M(t.i)}function _o(t){if(t.V&&typeof t.V=="function")return t.V();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(w(t)){for(var s=[],a=t.length,c=0;c<a;c++)s.push(t[c]);return s}s=[],a=0;for(c in t)s[a++]=t[c];return s}function wo(t){if(t.na&&typeof t.na=="function")return t.na();if(!t.V||typeof t.V!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(w(t)||typeof t=="string"){var s=[];t=t.length;for(var a=0;a<t;a++)s.push(a);return s}s=[],a=0;for(const c in t)s[a++]=c;return s}}}function Bi(t,s){if(t.forEach&&typeof t.forEach=="function")t.forEach(s,void 0);else if(w(t)||typeof t=="string")Array.prototype.forEach.call(t,s,void 0);else for(var a=wo(t),c=_o(t),y=c.length,I=0;I<y;I++)s.call(void 0,c[I],a&&a[I],t)}var Hi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Io(t,s){if(t){t=t.split("&");for(var a=0;a<t.length;a++){var c=t[a].indexOf("="),y=null;if(0<=c){var I=t[a].substring(0,c);y=t[a].substring(c+1)}else I=t[a];s(I,y?decodeURIComponent(y.replace(/\+/g," ")):"")}}}function Oe(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof Oe){this.h=t.h,Dt(this,t.j),this.o=t.o,this.g=t.g,Lt(this,t.s),this.l=t.l;var s=t.i,a=new ut;a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),Vi(this,a),this.m=t.m}else t&&(s=String(t).match(Hi))?(this.h=!1,Dt(this,s[1]||"",!0),this.o=ct(s[2]||""),this.g=ct(s[3]||"",!0),Lt(this,s[4]),this.l=ct(s[5]||"",!0),Vi(this,s[6]||"",!0),this.m=ct(s[7]||"")):(this.h=!1,this.i=new ut(null,this.h))}Oe.prototype.toString=function(){var t=[],s=this.j;s&&t.push(ht(s,$i,!0),":");var a=this.g;return(a||s=="file")&&(t.push("//"),(s=this.o)&&t.push(ht(s,$i,!0),"@"),t.push(encodeURIComponent(String(a)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.s,a!=null&&t.push(":",String(a))),(a=this.l)&&(this.g&&a.charAt(0)!="/"&&t.push("/"),t.push(ht(a,a.charAt(0)=="/"?bo:To,!0))),(a=this.i.toString())&&t.push("?",a),(a=this.m)&&t.push("#",ht(a,So)),t.join("")};function ce(t){return new Oe(t)}function Dt(t,s,a){t.j=a?ct(s,!0):s,t.j&&(t.j=t.j.replace(/:$/,""))}function Lt(t,s){if(s){if(s=Number(s),isNaN(s)||0>s)throw Error("Bad port number "+s);t.s=s}else t.s=null}function Vi(t,s,a){s instanceof ut?(t.i=s,Co(t.i,t.h)):(a||(s=ht(s,Ao)),t.i=new ut(s,t.h))}function x(t,s,a){t.i.set(s,a)}function Mt(t){return x(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ct(t,s){return t?s?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function ht(t,s,a){return typeof t=="string"?(t=encodeURI(t).replace(s,Eo),a&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Eo(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var $i=/[#\/\?@]/g,To=/[#\?:]/g,bo=/[#\?]/g,Ao=/[#\?@]/g,So=/#/g;function ut(t,s){this.h=this.g=null,this.i=t||null,this.j=!!s}function _e(t){t.g||(t.g=new Map,t.h=0,t.i&&Io(t.i,function(s,a){t.add(decodeURIComponent(s.replace(/\+/g," ")),a)}))}i=ut.prototype,i.add=function(t,s){_e(this),this.i=null,t=Be(this,t);var a=this.g.get(t);return a||this.g.set(t,a=[]),a.push(s),this.h+=1,this};function zi(t,s){_e(t),s=Be(t,s),t.g.has(s)&&(t.i=null,t.h-=t.g.get(s).length,t.g.delete(s))}function Wi(t,s){return _e(t),s=Be(t,s),t.g.has(s)}i.forEach=function(t,s){_e(this),this.g.forEach(function(a,c){a.forEach(function(y){t.call(s,y,c,this)},this)},this)},i.na=function(){_e(this);const t=Array.from(this.g.values()),s=Array.from(this.g.keys()),a=[];for(let c=0;c<s.length;c++){const y=t[c];for(let I=0;I<y.length;I++)a.push(s[c])}return a},i.V=function(t){_e(this);let s=[];if(typeof t=="string")Wi(this,t)&&(s=s.concat(this.g.get(Be(this,t))));else{t=Array.from(this.g.values());for(let a=0;a<t.length;a++)s=s.concat(t[a])}return s},i.set=function(t,s){return _e(this),this.i=null,t=Be(this,t),Wi(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[s]),this.h+=1,this},i.get=function(t,s){return t?(t=this.V(t),0<t.length?String(t[0]):s):s};function Gi(t,s,a){zi(t,s),0<a.length&&(t.i=null,t.g.set(Be(t,s),M(a)),t.h+=a.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],s=Array.from(this.g.keys());for(var a=0;a<s.length;a++){var c=s[a];const I=encodeURIComponent(String(c)),T=this.V(c);for(c=0;c<T.length;c++){var y=I;T[c]!==""&&(y+="="+encodeURIComponent(String(T[c]))),t.push(y)}}return this.i=t.join("&")};function Be(t,s){return s=String(s),t.j&&(s=s.toLowerCase()),s}function Co(t,s){s&&!t.j&&(_e(t),t.i=null,t.g.forEach(function(a,c){var y=c.toLowerCase();c!=y&&(zi(this,c),Gi(this,y,a))},t)),t.j=s}function ko(t,s){const a=new at;if(v.Image){const c=new Image;c.onload=U(we,a,"TestLoadImage: loaded",!0,s,c),c.onerror=U(we,a,"TestLoadImage: error",!1,s,c),c.onabort=U(we,a,"TestLoadImage: abort",!1,s,c),c.ontimeout=U(we,a,"TestLoadImage: timeout",!1,s,c),v.setTimeout(function(){c.ontimeout&&c.ontimeout()},1e4),c.src=t}else s(!1)}function Ro(t,s){const a=new at,c=new AbortController,y=setTimeout(()=>{c.abort(),we(a,"TestPingServer: timeout",!1,s)},1e4);fetch(t,{signal:c.signal}).then(I=>{clearTimeout(y),I.ok?we(a,"TestPingServer: ok",!0,s):we(a,"TestPingServer: server error",!1,s)}).catch(()=>{clearTimeout(y),we(a,"TestPingServer: error",!1,s)})}function we(t,s,a,c,y){try{y&&(y.onload=null,y.onerror=null,y.onabort=null,y.ontimeout=null),c(a)}catch{}}function Po(){this.g=new co}function Oo(t,s,a){const c=a||"";try{Bi(t,function(y,I){let T=y;E(y)&&(T=vn(y)),s.push(c+I+"="+encodeURIComponent(T))})}catch(y){throw s.push(c+"type="+encodeURIComponent("_badmap")),y}}function xt(t){this.l=t.Ub||null,this.j=t.eb||!1}k(xt,yn),xt.prototype.g=function(){return new Ut(this.l,this.j)},xt.prototype.i=function(t){return function(){return t}}({});function Ut(t,s){V.call(this),this.D=t,this.o=s,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Ut,V),i=Ut.prototype,i.open=function(t,s){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=s,this.readyState=1,ft(this)},i.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const s={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(s.body=t),(this.D||v).fetch(new Request(this.A,s)).then(this.Sa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,dt(this)),this.readyState=0},i.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,ft(this)),this.g&&(this.readyState=3,ft(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof v.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ki(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ki(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}i.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var s=t.value?t.value:new Uint8Array(0);(s=this.v.decode(s,{stream:!t.done}))&&(this.response=this.responseText+=s)}t.done?dt(this):ft(this),this.readyState==3&&Ki(this)}},i.Ra=function(t){this.g&&(this.response=this.responseText=t,dt(this))},i.Qa=function(t){this.g&&(this.response=t,dt(this))},i.ga=function(){this.g&&dt(this)};function dt(t){t.readyState=4,t.l=null,t.j=null,t.v=null,ft(t)}i.setRequestHeader=function(t,s){this.u.append(t,s)},i.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],s=this.h.entries();for(var a=s.next();!a.done;)a=a.value,t.push(a[0]+": "+a[1]),a=s.next();return t.join(`\r
`)};function ft(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Ut.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function qi(t){let s="";return J(t,function(a,c){s+=c,s+=":",s+=a,s+=`\r
`}),s}function Pn(t,s,a){e:{for(c in a){var c=!1;break e}c=!0}c||(a=qi(a),typeof t=="string"?a!=null&&encodeURIComponent(String(a)):x(t,s,a))}function j(t){V.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(j,V);var No=/^https?$/i,Do=["POST","PUT"];i=j.prototype,i.Ha=function(t){this.J=t},i.ea=function(t,s,a,c){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);s=s?s.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Tn.g(),this.v=this.o?Ai(this.o):Ai(Tn),this.g.onreadystatechange=C(this.Ea,this);try{this.B=!0,this.g.open(s,String(t),!0),this.B=!1}catch(I){Ji(this,I);return}if(t=a||"",a=new Map(this.headers),c)if(Object.getPrototypeOf(c)===Object.prototype)for(var y in c)a.set(y,c[y]);else if(typeof c.keys=="function"&&typeof c.get=="function")for(const I of c.keys())a.set(I,c.get(I));else throw Error("Unknown input type for opt_headers: "+String(c));c=Array.from(a.keys()).find(I=>I.toLowerCase()=="content-type"),y=v.FormData&&t instanceof v.FormData,!(0<=Array.prototype.indexOf.call(Do,s,void 0))||c||y||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,T]of a)this.g.setRequestHeader(I,T);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Qi(this),this.u=!0,this.g.send(t),this.u=!1}catch(I){Ji(this,I)}};function Ji(t,s){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=s,t.m=5,Xi(t),jt(t)}function Xi(t){t.A||(t.A=!0,W(t,"complete"),W(t,"error"))}i.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,W(this,"complete"),W(this,"abort"),jt(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jt(this,!0)),j.aa.N.call(this)},i.Ea=function(){this.s||(this.B||this.u||this.j?Yi(this):this.bb())},i.bb=function(){Yi(this)};function Yi(t){if(t.h&&typeof h<"u"&&(!t.v[1]||he(t)!=4||t.Z()!=2)){if(t.u&&he(t)==4)Ii(t.Ea,0,t);else if(W(t,"readystatechange"),he(t)==4){t.h=!1;try{const T=t.Z();e:switch(T){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var s=!0;break e;default:s=!1}var a;if(!(a=s)){var c;if(c=T===0){var y=String(t.D).match(Hi)[1]||null;!y&&v.self&&v.self.location&&(y=v.self.location.protocol.slice(0,-1)),c=!No.test(y?y.toLowerCase():"")}a=c}if(a)W(t,"complete"),W(t,"success");else{t.m=6;try{var I=2<he(t)?t.g.statusText:""}catch{I=""}t.l=I+" ["+t.Z()+"]",Xi(t)}}finally{jt(t)}}}}function jt(t,s){if(t.g){Qi(t);const a=t.g,c=t.v[0]?()=>{}:null;t.g=null,t.v=null,s||W(t,"ready");try{a.onreadystatechange=c}catch{}}}function Qi(t){t.I&&(v.clearTimeout(t.I),t.I=null)}i.isActive=function(){return!!this.g};function he(t){return t.g?t.g.readyState:0}i.Z=function(){try{return 2<he(this)?this.g.status:-1}catch{return-1}},i.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.Oa=function(t){if(this.g){var s=this.g.responseText;return t&&s.indexOf(t)==0&&(s=s.substring(t.length)),lo(s)}};function Zi(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function Lo(t){const s={};t=(t.g&&2<=he(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let c=0;c<t.length;c++){if(Q(t[c]))continue;var a=g(t[c]);const y=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const I=s[y]||[];s[y]=I,I.push(a)}m(s,function(c){return c.join(", ")})}i.Ba=function(){return this.m},i.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function pt(t,s,a){return a&&a.internalChannelParams&&a.internalChannelParams[t]||s}function er(t){this.Aa=0,this.i=[],this.j=new at,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=pt("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=pt("baseRetryDelayMs",5e3,t),this.cb=pt("retryDelaySeedMs",1e4,t),this.Wa=pt("forwardChannelMaxRetries",2,t),this.wa=pt("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Mi(t&&t.concurrentRequestLimit),this.Da=new Po,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}i=er.prototype,i.la=8,i.G=1,i.connect=function(t,s,a,c){G(0),this.W=t,this.H=s||{},a&&c!==void 0&&(this.H.OSID=a,this.H.OAID=c),this.F=this.X,this.I=cr(this,null,this.W),Bt(this)};function On(t){if(tr(t),t.G==3){var s=t.U++,a=ce(t.I);if(x(a,"SID",t.K),x(a,"RID",s),x(a,"TYPE","terminate"),gt(t,a),s=new ye(t,t.j,s),s.L=2,s.v=Mt(ce(a)),a=!1,v.navigator&&v.navigator.sendBeacon)try{a=v.navigator.sendBeacon(s.v.toString(),"")}catch{}!a&&v.Image&&(new Image().src=s.v,a=!0),a||(s.g=hr(s.j,null),s.g.ea(s.v)),s.F=Date.now(),Nt(s)}lr(t)}function Ft(t){t.g&&(Dn(t),t.g.cancel(),t.g=null)}function tr(t){Ft(t),t.u&&(v.clearTimeout(t.u),t.u=null),Ht(t),t.h.cancel(),t.s&&(typeof t.s=="number"&&v.clearTimeout(t.s),t.s=null)}function Bt(t){if(!xi(t.h)&&!t.s){t.s=!0;var s=t.Ga;et||mi(),tt||(et(),tt=!0),cn.add(s,t),t.B=0}}function Mo(t,s){return Ui(t.h)>=t.h.j-(t.s?1:0)?!1:t.s?(t.i=s.D.concat(t.i),!0):t.G==1||t.G==2||t.B>=(t.Va?0:t.Wa)?!1:(t.s=ot(C(t.Ga,t,s),ar(t,t.B)),t.B++,!0)}i.Ga=function(t){if(this.s)if(this.s=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const y=new ye(this,this.j,t);let I=this.o;if(this.S&&(I?(I=u(I),p(I,this.S)):I=this.S),this.m!==null||this.O||(y.H=I,I=null),this.P)e:{for(var s=0,a=0;a<this.i.length;a++){t:{var c=this.i[a];if("__data__"in c.map&&(c=c.map.__data__,typeof c=="string")){c=c.length;break t}c=void 0}if(c===void 0)break;if(s+=c,4096<s){s=a;break e}if(s===4096||a===this.i.length-1){s=a+1;break e}}s=1e3}else s=1e3;s=ir(this,y,s),a=ce(this.I),x(a,"RID",t),x(a,"CVER",22),this.D&&x(a,"X-HTTP-Session-Id",this.D),gt(this,a),I&&(this.O?s="headers="+encodeURIComponent(String(qi(I)))+"&"+s:this.m&&Pn(a,this.m,I)),Rn(this.h,y),this.Ua&&x(a,"TYPE","init"),this.P?(x(a,"$req",s),x(a,"SID","null"),y.T=!0,An(y,a,null)):An(y,a,s),this.G=2}}else this.G==3&&(t?nr(this,t):this.i.length==0||xi(this.h)||nr(this))};function nr(t,s){var a;s?a=s.l:a=t.U++;const c=ce(t.I);x(c,"SID",t.K),x(c,"RID",a),x(c,"AID",t.T),gt(t,c),t.m&&t.o&&Pn(c,t.m,t.o),a=new ye(t,t.j,a,t.B+1),t.m===null&&(a.H=t.o),s&&(t.i=s.D.concat(t.i)),s=ir(t,a,1e3),a.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Rn(t.h,a),An(a,c,s)}function gt(t,s){t.H&&J(t.H,function(a,c){x(s,c,a)}),t.l&&Bi({},function(a,c){x(s,c,a)})}function ir(t,s,a){a=Math.min(t.i.length,a);var c=t.l?C(t.l.Na,t.l,t):null;e:{var y=t.i;let I=-1;for(;;){const T=["count="+a];I==-1?0<a?(I=y[0].g,T.push("ofs="+I)):I=0:T.push("ofs="+I);let L=!0;for(let F=0;F<a;F++){let O=y[F].g;const $=y[F].map;if(O-=I,0>O)I=Math.max(0,y[F].g-100),L=!1;else try{Oo($,T,"req"+O+"_")}catch{c&&c($)}}if(L){c=T.join("&");break e}}}return t=t.i.splice(0,a),s.D=t,c}function rr(t){if(!t.g&&!t.u){t.Y=1;var s=t.Fa;et||mi(),tt||(et(),tt=!0),cn.add(s,t),t.v=0}}function Nn(t){return t.g||t.u||3<=t.v?!1:(t.Y++,t.u=ot(C(t.Fa,t),ar(t,t.v)),t.v++,!0)}i.Fa=function(){if(this.u=null,sr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=ot(C(this.ab,this),t)}},i.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,G(10),Ft(this),sr(this))};function Dn(t){t.A!=null&&(v.clearTimeout(t.A),t.A=null)}function sr(t){t.g=new ye(t,t.j,"rpc",t.Y),t.m===null&&(t.g.H=t.o),t.g.O=0;var s=ce(t.qa);x(s,"RID","rpc"),x(s,"SID",t.K),x(s,"AID",t.T),x(s,"CI",t.F?"0":"1"),!t.F&&t.ja&&x(s,"TO",t.ja),x(s,"TYPE","xmlhttp"),gt(t,s),t.m&&t.o&&Pn(s,t.m,t.o),t.L&&(t.g.I=t.L);var a=t.g;t=t.ia,a.L=1,a.v=Mt(ce(s)),a.m=null,a.P=!0,Ni(a,t)}i.Za=function(){this.C!=null&&(this.C=null,Ft(this),Nn(this),G(19))};function Ht(t){t.C!=null&&(v.clearTimeout(t.C),t.C=null)}function or(t,s){var a=null;if(t.g==s){Ht(t),Dn(t),t.g=null;var c=2}else if(kn(t.h,s))a=s.D,ji(t.h,s),c=1;else return;if(t.G!=0){if(s.o)if(c==1){a=s.m?s.m.length:0,s=Date.now()-s.F;var y=t.B;c=In(),W(c,new Ri(c,a)),Bt(t)}else rr(t);else if(y=s.s,y==3||y==0&&0<s.X||!(c==1&&Mo(t,s)||c==2&&Nn(t)))switch(a&&0<a.length&&(s=t.h,s.i=s.i.concat(a)),y){case 1:Ne(t,5);break;case 4:Ne(t,10);break;case 3:Ne(t,6);break;default:Ne(t,2)}}}function ar(t,s){let a=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(a*=2),a*s}function Ne(t,s){if(t.j.info("Error code "+s),s==2){var a=C(t.fb,t),c=t.Xa;const y=!c;c=new Oe(c||"//www.google.com/images/cleardot.gif"),v.location&&v.location.protocol=="http"||Dt(c,"https"),Mt(c),y?ko(c.toString(),a):Ro(c.toString(),a)}else G(2);t.G=0,t.l&&t.l.sa(s),lr(t),tr(t)}i.fb=function(t){t?(this.j.info("Successfully pinged google.com"),G(2)):(this.j.info("Failed to ping google.com"),G(1))};function lr(t){if(t.G=0,t.ka=[],t.l){const s=Fi(t.h);(s.length!=0||t.i.length!=0)&&(P(t.ka,s),P(t.ka,t.i),t.h.i.length=0,M(t.i),t.i.length=0),t.l.ra()}}function cr(t,s,a){var c=a instanceof Oe?ce(a):new Oe(a);if(c.g!="")s&&(c.g=s+"."+c.g),Lt(c,c.s);else{var y=v.location;c=y.protocol,s=s?s+"."+y.hostname:y.hostname,y=+y.port;var I=new Oe(null);c&&Dt(I,c),s&&(I.g=s),y&&Lt(I,y),a&&(I.l=a),c=I}return a=t.D,s=t.ya,a&&s&&x(c,a,s),x(c,"VER",t.la),gt(t,c),c}function hr(t,s,a){if(s&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return s=t.Ca&&!t.pa?new j(new xt({eb:a})):new j(t.pa),s.Ha(t.J),s}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function ur(){}i=ur.prototype,i.ua=function(){},i.ta=function(){},i.sa=function(){},i.ra=function(){},i.isActive=function(){return!0},i.Na=function(){};function Z(t,s){V.call(this),this.g=new er(s),this.l=t,this.h=s&&s.messageUrlParams||null,t=s&&s.messageHeaders||null,s&&s.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=s&&s.initMessageHeaders||null,s&&s.messageContentType&&(t?t["X-WebChannel-Content-Type"]=s.messageContentType:t={"X-WebChannel-Content-Type":s.messageContentType}),s&&s.va&&(t?t["X-WebChannel-Client-Profile"]=s.va:t={"X-WebChannel-Client-Profile":s.va}),this.g.S=t,(t=s&&s.Sb)&&!Q(t)&&(this.g.m=t),this.v=s&&s.supportsCrossDomainXhr||!1,this.u=s&&s.sendRawJson||!1,(s=s&&s.httpSessionIdParam)&&!Q(s)&&(this.g.D=s,t=this.h,t!==null&&s in t&&(t=this.h,s in t&&delete t[s])),this.j=new He(this)}k(Z,V),Z.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Z.prototype.close=function(){On(this.g)},Z.prototype.o=function(t){var s=this.g;if(typeof t=="string"){var a={};a.__data__=t,t=a}else this.u&&(a={},a.__data__=vn(t),t=a);s.i.push(new yo(s.Ya++,t)),s.G==3&&Bt(s)},Z.prototype.N=function(){this.g.l=null,delete this.j,On(this.g),delete this.g,Z.aa.N.call(this)};function dr(t){_n.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var s=t.__sm__;if(s){e:{for(const a in s){t=a;break e}t=void 0}(this.i=t)&&(t=this.i,s=s!==null&&t in s?s[t]:void 0),this.data=s}else this.data=t}k(dr,_n);function fr(){wn.call(this),this.status=1}k(fr,wn);function He(t){this.g=t}k(He,ur),He.prototype.ua=function(){W(this.g,"a")},He.prototype.ta=function(t){W(this.g,new dr(t))},He.prototype.sa=function(t){W(this.g,new fr)},He.prototype.ra=function(){W(this.g,"b")},Z.prototype.send=Z.prototype.o,Z.prototype.open=Z.prototype.m,Z.prototype.close=Z.prototype.close,En.NO_ERROR=0,En.TIMEOUT=8,En.HTTP_ERROR=6,mo.COMPLETE="complete",ho.EventType=rt,rt.OPEN="a",rt.CLOSE="b",rt.ERROR="c",rt.MESSAGE="d",V.prototype.listen=V.prototype.K,j.prototype.listenOnce=j.prototype.L,j.prototype.getLastError=j.prototype.Ka,j.prototype.getLastErrorCode=j.prototype.Ba,j.prototype.getStatus=j.prototype.Z,j.prototype.getResponseJson=j.prototype.Oa,j.prototype.getResponseText=j.prototype.oa,j.prototype.send=j.prototype.ea,j.prototype.setWithCredentials=j.prototype.Ha}).apply(typeof zt<"u"?zt:typeof self<"u"?self:typeof window<"u"?window:{});const Sr="@firebase/firestore",Cr="4.7.10";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}K.UNAUTHENTICATED=new K(null),K.GOOGLE_CREDENTIALS=new K("google-credentials-uid"),K.FIRST_PARTY=new K("first-party-uid"),K.MOCK_USER=new K("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tt="11.5.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new ei("@firebase/firestore");function ne(i,...e){if(qe.logLevel<=D.DEBUG){const n=e.map(ii);qe.debug(`Firestore (${Tt}): ${i}`,...n)}}function vs(i,...e){if(qe.logLevel<=D.ERROR){const n=e.map(ii);qe.error(`Firestore (${Tt}): ${i}`,...n)}}function gl(i,...e){if(qe.logLevel<=D.WARN){const n=e.map(ii);qe.warn(`Firestore (${Tt}): ${i}`,...n)}}function ii(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(i="Unexpected state"){const e=`FIRESTORE (${Tt}) INTERNAL ASSERTION FAILED: `+i;throw vs(e),new Error(e)}function mt(i,e){i||ri()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class Y extends me{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ml{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(K.UNAUTHENTICATED))}shutdown(){}}class vl{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class yl{constructor(e){this.t=e,this.currentUser=K.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){mt(this.o===void 0);let r=this.i;const o=w=>this.i!==r?(r=this.i,n(w)):Promise.resolve();let l=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),l.resolve(),l=new vt,e.enqueueRetryable(()=>o(this.currentUser))};const h=()=>{const w=l;e.enqueueRetryable(async()=>{await w.promise,await o(this.currentUser)})},v=w=>{ne("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(w=>v(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?v(w):(ne("FirebaseAuthCredentialsProvider","Auth not yet detected"),l.resolve(),l=new vt)}},0),h()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(ne("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(mt(typeof r.accessToken=="string"),new ys(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return mt(e===null||typeof e=="string"),new K(e)}}class _l{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=K.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class wl{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new _l(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(K.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class kr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Il{constructor(e,n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,re(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,n){mt(this.o===void 0);const r=l=>{l.error!=null&&ne("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${l.error.message}`);const h=l.token!==this.R;return this.R=l.token,ne("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?n(l.token):Promise.resolve()};this.o=l=>{e.enqueueRetryable(()=>r(l))};const o=l=>{ne("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=l,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(l=>o(l)),setTimeout(()=>{if(!this.appCheck){const l=this.A.getImmediate({optional:!0});l?o(l):ne("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new kr(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(mt(typeof n.token=="string"),this.R=n.token,new kr(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function El(i){return i.name==="IndexedDbTransactionError"}const Jn="(default)";class Zt{constructor(e,n){this.projectId=e,this.database=n||Jn}static empty(){return new Zt("","")}get isDefaultDatabase(){return this.database===Jn}isEqual(e){return e instanceof Zt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rr,R;(R=Rr||(Rr={}))[R.OK=0]="OK",R[R.CANCELLED=1]="CANCELLED",R[R.UNKNOWN=2]="UNKNOWN",R[R.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",R[R.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",R[R.NOT_FOUND=5]="NOT_FOUND",R[R.ALREADY_EXISTS=6]="ALREADY_EXISTS",R[R.PERMISSION_DENIED=7]="PERMISSION_DENIED",R[R.UNAUTHENTICATED=16]="UNAUTHENTICATED",R[R.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",R[R.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",R[R.ABORTED=10]="ABORTED",R[R.OUT_OF_RANGE=11]="OUT_OF_RANGE",R[R.UNIMPLEMENTED=12]="UNIMPLEMENTED",R[R.INTERNAL=13]="INTERNAL",R[R.UNAVAILABLE=14]="UNAVAILABLE",R[R.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ms([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=1048576;function Bn(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(e,n,r=1e3,o=1.5,l=6e4){this.Ti=e,this.timerId=n,this.Go=r,this.zo=o,this.jo=l,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const n=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),o=Math.max(0,n-r);o>0&&ne("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.Ho} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,o,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n,r,o,l){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=o,this.removalCallback=l,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,o,l){const h=Date.now()+r,v=new si(e,n,h,o,l);return v.start(r),v}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Y(X.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Pr,Or;(Or=Pr||(Pr={}))._a="default",Or.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr=new Map;function Cl(i,e,n,r){if(e===!0&&r===!0)throw new Y(X.INVALID_ARGUMENT,`${i} and ${n} cannot be used together.`)}function kl(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":ri()}function Rl(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new Y(X.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=kl(i);throw new Y(X.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="firestore.googleapis.com",Dr=!0;class Lr{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Y(X.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=_s,this.ssl=Dr}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:Dr;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Tl;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<bl)throw new Y(X.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Cl("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Sl((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(l){if(l.timeoutSeconds!==void 0){if(isNaN(l.timeoutSeconds))throw new Y(X.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (must not be NaN)`);if(l.timeoutSeconds<5)throw new Y(X.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (minimum allowed value is 5)`);if(l.timeoutSeconds>30)throw new Y(X.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,o){return r.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ws{constructor(e,n,r,o){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lr({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Y(X.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Y(X.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lr(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ml;switch(r.type){case"firstParty":return new wl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Y(X.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Nr.get(n);r&&(ne("ComponentProvider","Removing Datastore"),Nr.delete(n),r.terminate())}(this),Promise.resolve()}}function Pl(i,e,n,r={}){var o;const l=(i=Rl(i,ws))._getSettings(),h=Object.assign(Object.assign({},l),{emulatorOptions:i._getEmulatorOptions()}),v=`${e}:${n}`;l.host!==_s&&l.host!==v&&gl("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const w=Object.assign(Object.assign({},l),{host:v,ssl:!1,emulatorOptions:r});if(!Me(w,h)&&(i._setSettings(w),r.mockUserToken)){let E,b;if(typeof r.mockUserToken=="string")E=r.mockUserToken,b=K.MOCK_USER;else{E=Go(r.mockUserToken,(o=i._app)===null||o===void 0?void 0:o.options.projectId);const A=r.mockUserToken.sub||r.mockUserToken.user_id;if(!A)throw new Y(X.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");b=new K(A)}i._authCredentials=new vl(new ys(E,b))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="AsyncQueue";class xr{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Al(this,"async_queue_retry"),this.Su=()=>{const r=Bn();r&&ne(Mr,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const n=Bn();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const n=Bn();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const n=new vt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!El(e))throw e;ne(Mr,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const n=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const o=function(h){let v=h.message||"";return h.stack&&(v=h.stack.includes(h.message)?h.stack:h.message+`
`+h.stack),v}(r);throw vs("INTERNAL UNHANDLED ERROR: ",o),r}).then(r=>(this.pu=!1,r))));return this.bu=n,n}enqueueAfterDelay(e,n,r){this.Du(),this.wu.indexOf(e)>-1&&(n=0);const o=si.createAndSchedule(this,e,n,r,l=>this.Fu(l));return this.fu.push(o),o}Du(){this.gu&&ri()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const n of this.fu)if(n.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.fu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const n=this.fu.indexOf(e);this.fu.splice(n,1)}}class Ol extends ws{constructor(e,n,r,o){super(e,n,r,o),this.type="firestore",this._queue=new xr,this._persistenceKey=o?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new xr(e),this._firestoreClient=void 0,await e}}}function Nl(i,e){const n=typeof i=="object"?i:fs(),r=typeof i=="string"?i:Jn,o=ni(n,"firestore").getImmediate({identifier:r});if(!o._initialized){const l=zo("firestore");l&&Pl(o,...l)}return o}(function(e,n=!0){(function(o){Tt=o})(Ye),Ke(new xe("firestore",(r,{instanceIdentifier:o,options:l})=>{const h=r.getProvider("app").getImmediate(),v=new Ol(new yl(r.getProvider("auth-internal")),new Il(h,r.getProvider("app-check-internal")),function(E,b){if(!Object.prototype.hasOwnProperty.apply(E.options,["projectId"]))throw new Y(X.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Zt(E.options.projectId,b)}(h,o),h);return l=Object.assign({useFetchStreams:n},l),v._setSettings(l),v},"PUBLIC").setMultipleInstances(!0)),ke(Sr,Cr,e),ke(Sr,Cr,"esm2017")})();var Dl="firebase",Ll="11.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(Dl,Ll,"app");function oi(i,e){var n={};for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&e.indexOf(r)<0&&(n[r]=i[r]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(i);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(i,r[o])&&(n[r[o]]=i[r[o]]);return n}function Is(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ml=Is,Es=new It("auth","Firebase",Is());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=new ei("@firebase/auth");function xl(i,...e){en.logLevel<=D.WARN&&en.warn(`Auth (${Ye}): ${i}`,...e)}function Kt(i,...e){en.logLevel<=D.ERROR&&en.error(`Auth (${Ye}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(i,...e){throw ai(i,...e)}function se(i,...e){return ai(i,...e)}function Ts(i,e,n){const r=Object.assign(Object.assign({},Ml()),{[e]:n});return new It("auth","Firebase",r).create(e,{appName:i.name})}function Le(i){return Ts(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ai(i,...e){if(typeof i!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=i.name),i._errorFactory.create(n,...r)}return Es.create(i,...e)}function S(i,e,...n){if(!i)throw ai(e,...n)}function ue(i){const e="INTERNAL ASSERTION FAILED: "+i;throw Kt(e),new Error(e)}function ge(i,e){i||ue(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xn(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function Ul(){return Ur()==="http:"||Ur()==="https:"}function Ur(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ul()||Jo()||"connection"in navigator)?navigator.onLine:!0}function Fl(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,n){this.shortDelay=e,this.longDelay=n,ge(n>e,"Short delay should be less than long delay!"),this.isMobile=Ko()||Xo()}get(){return jl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(i,e){ge(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vl=new bt(3e4,6e4);function ci(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function Qe(i,e,n,r,o={}){return As(i,o,async()=>{let l={},h={};r&&(e==="GET"?h=r:l={body:JSON.stringify(r)});const v=Et(Object.assign({key:i.config.apiKey},h)).slice(1),w=await i._getAdditionalHeaders();w["Content-Type"]="application/json",i.languageCode&&(w["X-Firebase-Locale"]=i.languageCode);const E=Object.assign({method:e,headers:w},l);return qo()||(E.referrerPolicy="no-referrer"),bs.fetch()(await Ss(i,i.config.apiHost,n,v),E)})}async function As(i,e,n){i._canInitEmulator=!1;const r=Object.assign(Object.assign({},Bl),e);try{const o=new zl(i),l=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const h=await l.json();if("needConfirmation"in h)throw Wt(i,"account-exists-with-different-credential",h);if(l.ok&&!("errorMessage"in h))return h;{const v=l.ok?h.errorMessage:h.error.message,[w,E]=v.split(" : ");if(w==="FEDERATED_USER_ID_ALREADY_LINKED")throw Wt(i,"credential-already-in-use",h);if(w==="EMAIL_EXISTS")throw Wt(i,"email-already-in-use",h);if(w==="USER_DISABLED")throw Wt(i,"user-disabled",h);const b=r[w]||w.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw Ts(i,b,E);pe(i,b)}}catch(o){if(o instanceof me)throw o;pe(i,"network-request-failed",{message:String(o)})}}async function $l(i,e,n,r,o={}){const l=await Qe(i,e,n,r,o);return"mfaPendingCredential"in l&&pe(i,"multi-factor-auth-required",{_serverResponse:l}),l}async function Ss(i,e,n,r){const o=`${e}${n}?${r}`,l=i,h=l.config.emulator?li(i.config,o):`${i.config.apiScheme}://${o}`;return Hl.includes(n)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(h).toString():h}class zl{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(se(this.auth,"network-request-failed")),Vl.get())})}}function Wt(i,e,n){const r={appName:i.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const o=se(i,e,r);return o.customData._tokenResponse=n,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wl(i,e){return Qe(i,"POST","/v1/accounts:delete",e)}async function tn(i,e){return Qe(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Gl(i,e=!1){const n=Xe(i),r=await n.getIdToken(e),o=hi(r);S(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,h=l?.sign_in_provider;return{claims:o,token:r,authTime:yt(Hn(o.auth_time)),issuedAtTime:yt(Hn(o.iat)),expirationTime:yt(Hn(o.exp)),signInProvider:h||null,signInSecondFactor:l?.sign_in_second_factor||null}}function Hn(i){return Number(i)*1e3}function hi(i){const[e,n,r]=i.split(".");if(e===void 0||n===void 0||r===void 0)return Kt("JWT malformed, contained fewer than 3 sections"),null;try{const o=os(n);return o?JSON.parse(o):(Kt("Failed to decode base64 JWT payload"),null)}catch(o){return Kt("Caught error parsing JWT payload as JSON",o?.toString()),null}}function jr(i){const e=hi(i);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wt(i,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof me&&Kl(r)&&i.auth.currentUser===i&&await i.auth.signOut(),r}}function Kl({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const o=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=yt(this.lastLoginAt),this.creationTime=yt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(i){var e;const n=i.auth,r=await i.getIdToken(),o=await wt(i,tn(n,{idToken:r}));S(o?.users.length,n,"internal-error");const l=o.users[0];i._notifyReloadListener(l);const h=!((e=l.providerUserInfo)===null||e===void 0)&&e.length?Cs(l.providerUserInfo):[],v=Xl(i.providerData,h),w=i.isAnonymous,E=!(i.email&&l.passwordHash)&&!v?.length,b=w?E:!1,A={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:v,metadata:new Yn(l.createdAt,l.lastLoginAt),isAnonymous:b};Object.assign(i,A)}async function Jl(i){const e=Xe(i);await nn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xl(i,e){return[...i.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function Cs(i){return i.map(e=>{var{providerId:n}=e,r=oi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yl(i,e){const n=await As(i,{},async()=>{const r=Et({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=i.config,h=await Ss(i,o,"/v1/token",`key=${l}`),v=await i._getAdditionalHeaders();return v["Content-Type"]="application/x-www-form-urlencoded",bs.fetch()(h,{method:"POST",headers:v,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ql(i,e){return Qe(i,"POST","/v2/accounts:revokeToken",ci(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):jr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=jr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:o,expiresIn:l}=await Yl(e,n);this.updateTokensAndExpiration(r,o,Number(l))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:o,expirationTime:l}=n,h=new ze;return r&&(S(typeof r=="string","internal-error",{appName:e}),h.refreshToken=r),o&&(S(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),l&&(S(typeof l=="number","internal-error",{appName:e}),h.expirationTime=l),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ze,this.toJSON())}_performRefresh(){return ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(i,e){S(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class ie{constructor(e){var{uid:n,auth:r,stsTokenManager:o}=e,l=oi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ql(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=l.displayName||null,this.email=l.email||null,this.emailVerified=l.emailVerified||!1,this.phoneNumber=l.phoneNumber||null,this.photoURL=l.photoURL||null,this.isAnonymous=l.isAnonymous||!1,this.tenantId=l.tenantId||null,this.providerData=l.providerData?[...l.providerData]:[],this.metadata=new Yn(l.createdAt||void 0,l.lastLoginAt||void 0)}async getIdToken(e){const n=await wt(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Gl(this,e)}reload(){return Jl(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ie(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await nn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(re(this.auth.app))return Promise.reject(Le(this.auth));const e=await this.getIdToken();return await wt(this,Wl(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,o,l,h,v,w,E,b;const A=(r=n.displayName)!==null&&r!==void 0?r:void 0,C=(o=n.email)!==null&&o!==void 0?o:void 0,U=(l=n.phoneNumber)!==null&&l!==void 0?l:void 0,k=(h=n.photoURL)!==null&&h!==void 0?h:void 0,M=(v=n.tenantId)!==null&&v!==void 0?v:void 0,P=(w=n._redirectEventId)!==null&&w!==void 0?w:void 0,ae=(E=n.createdAt)!==null&&E!==void 0?E:void 0,Q=(b=n.lastLoginAt)!==null&&b!==void 0?b:void 0,{uid:B,emailVerified:ee,isAnonymous:Re,providerData:J,stsTokenManager:m}=n;S(B&&m,e,"internal-error");const u=ze.fromJSON(this.name,m);S(typeof B=="string",e,"internal-error"),Ie(A,e.name),Ie(C,e.name),S(typeof ee=="boolean",e,"internal-error"),S(typeof Re=="boolean",e,"internal-error"),Ie(U,e.name),Ie(k,e.name),Ie(M,e.name),Ie(P,e.name),Ie(ae,e.name),Ie(Q,e.name);const f=new ie({uid:B,auth:e,email:C,emailVerified:ee,displayName:A,isAnonymous:Re,photoURL:k,phoneNumber:U,tenantId:M,stsTokenManager:u,createdAt:ae,lastLoginAt:Q});return J&&Array.isArray(J)&&(f.providerData=J.map(p=>Object.assign({},p))),P&&(f._redirectEventId=P),f}static async _fromIdTokenResponse(e,n,r=!1){const o=new ze;o.updateFromServerResponse(n);const l=new ie({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await nn(l),l}static async _fromGetAccountInfoResponse(e,n,r){const o=n.users[0];S(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?Cs(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!l?.length,v=new ze;v.updateFromIdToken(r);const w=new ie({uid:o.localId,auth:e,stsTokenManager:v,isAnonymous:h}),E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new Yn(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!l?.length};return Object.assign(w,E),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=new Map;function de(i){ge(i instanceof Function,"Expected a class definition");let e=Fr.get(i);return e?(ge(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Fr.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}ks.type="NONE";const Br=ks;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(i,e,n){return`firebase:${i}:${e}:${n}`}class We{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:o,name:l}=this.auth;this.fullUserKey=qt(this.userKey,o.apiKey,l),this.fullPersistenceKey=qt("persistence",o.apiKey,l),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await tn(this.auth,{idToken:e}).catch(()=>{});return n?ie._fromGetAccountInfoResponse(this.auth,n,e):null}return ie._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new We(de(Br),e,r);const o=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let l=o[0]||de(Br);const h=qt(r,e.config.apiKey,e.name);let v=null;for(const E of n)try{const b=await E._get(h);if(b){let A;if(typeof b=="string"){const C=await tn(e,{idToken:b}).catch(()=>{});if(!C)break;A=await ie._fromGetAccountInfoResponse(e,C,b)}else A=ie._fromJSON(e,b);E!==l&&(v=A),l=E;break}}catch{}const w=o.filter(E=>E._shouldAllowMigration);return!l._shouldAllowMigration||!w.length?new We(l,e,r):(l=w[0],v&&await l._set(h,v.toJSON()),await Promise.all(n.map(async E=>{if(E!==l)try{await E._remove(h)}catch{}})),new We(l,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ns(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Rs(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ls(e))return"Blackberry";if(Ms(e))return"Webos";if(Ps(e))return"Safari";if((e.includes("chrome/")||Os(e))&&!e.includes("edge/"))return"Chrome";if(Ds(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=i.match(n);if(r?.length===2)return r[1]}return"Other"}function Rs(i=q()){return/firefox\//i.test(i)}function Ps(i=q()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Os(i=q()){return/crios\//i.test(i)}function Ns(i=q()){return/iemobile/i.test(i)}function Ds(i=q()){return/android/i.test(i)}function Ls(i=q()){return/blackberry/i.test(i)}function Ms(i=q()){return/webos/i.test(i)}function ui(i=q()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function Zl(i=q()){var e;return ui(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ec(){return Yo()&&document.documentMode===10}function xs(i=q()){return ui(i)||Ds(i)||Ms(i)||Ls(i)||/windows phone/i.test(i)||Ns(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Us(i,e=[]){let n;switch(i){case"Browser":n=Hr(q());break;case"Worker":n=`${Hr(q())}-${i}`;break;default:n=i}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ye}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=l=>new Promise((h,v)=>{try{const w=e(l);h(w)}catch(w){v(w)}});r.onAbort=n,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const o of n)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nc(i,e={}){return Qe(i,"GET","/v2/passwordPolicy",ci(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=6;class rc{constructor(e){var n,r,o,l;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=h.minPasswordLength)!==null&&n!==void 0?n:ic,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(o=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&o!==void 0?o:"",this.forceUpgradeOnSignin=(l=e.forceUpgradeOnSignin)!==null&&l!==void 0?l:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,o,l,h,v;const w={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,w),this.validatePasswordCharacterOptions(e,w),w.isValid&&(w.isValid=(n=w.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),w.isValid&&(w.isValid=(r=w.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),w.isValid&&(w.isValid=(o=w.containsLowercaseLetter)!==null&&o!==void 0?o:!0),w.isValid&&(w.isValid=(l=w.containsUppercaseLetter)!==null&&l!==void 0?l:!0),w.isValid&&(w.isValid=(h=w.containsNumericCharacter)!==null&&h!==void 0?h:!0),w.isValid&&(w.isValid=(v=w.containsNonAlphanumericCharacter)!==null&&v!==void 0?v:!0),w}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),o&&(n.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let o=0;o<e.length;o++)r=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,n,r,o){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vr(this),this.idTokenSubscription=new Vr(this),this.beforeStateQueue=new tc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Es,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=de(n)),this._initializationPromise=this.queue(async()=>{var r,o,l;if(!this._deleted&&(this.persistenceManager=await We.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((o=this._popupRedirectResolver)===null||o===void 0)&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((l=this.currentUser)===null||l===void 0?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await tn(this,{idToken:e}),r=await ie._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(re(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(v=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(v,v))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let o=r,l=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,v=o?._redirectEventId,w=await this.tryRedirectSignIn(e);(!h||h===v)&&w?.user&&(o=w.user,l=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(l)try{await this.beforeStateQueue.runMiddleware(o)}catch(h){o=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await nn(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fl()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(re(this.app))return Promise.reject(Le(this));const n=e?Xe(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return re(this.app)?Promise.reject(Le(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return re(this.app)?Promise.reject(Le(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(de(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await nc(this),n=new rc(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new It("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ql(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&de(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await We.create(this,[de(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,o){if(this._deleted)return()=>{};const l=typeof n=="function"?n:n.next.bind(n);let h=!1;const v=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(v,this,"internal-error"),v.then(()=>{h||l(this.currentUser)}),typeof n=="function"){const w=e.addObserver(n,r,o);return()=>{h=!0,w()}}else{const w=e.addObserver(n);return()=>{h=!0,w()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Us(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const o=await this._getAppCheckToken();return o&&(n["X-Firebase-AppCheck"]=o),n}async _getAppCheckToken(){var e;if(re(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n?.error&&xl(`Error while retrieving App Check token: ${n.error}`),n?.token}}function di(i){return Xe(i)}class Vr{constructor(e){this.auth=e,this.observer=null,this.addObserver=ra(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function oc(i){fi=i}function ac(i){return fi.loadJS(i)}function lc(){return fi.gapiScript}function cc(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(i,e){const n=ni(i,"auth");if(n.isInitialized()){const o=n.getImmediate(),l=n.getOptions();if(Me(l,e??{}))return o;pe(o,"already-initialized")}return n.initialize({options:e})}function uc(i,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(de);e?.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(r,e?.popupRedirectResolver)}function dc(i,e,n){const r=di(i);S(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const o=!1,l=js(e),{host:h,port:v}=fc(e),w=v===null?"":`:${v}`,E={url:`${l}//${h}${w}/`},b=Object.freeze({host:h,port:v,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator){S(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),S(Me(E,r.config.emulator)&&Me(b,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=E,r.emulatorConfig=b,r.settings.appVerificationDisabledForTesting=!0,pc()}function js(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function fc(i){const e=js(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(r);if(o){const l=o[1];return{host:l,port:$r(r.substr(l.length+1))}}else{const[l,h]=r.split(":");return{host:l,port:$r(h)}}}function $r(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function pc(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ue("not implemented")}_getIdTokenResponse(e){return ue("not implemented")}_linkToIdToken(e,n){return ue("not implemented")}_getReauthenticationResolver(e){return ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ge(i,e){return $l(i,"POST","/v1/accounts:signInWithIdp",ci(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc="http://localhost";class Ue extends Fs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ue(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):pe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o}=n,l=oi(n,["providerId","signInMethod"]);if(!r||!o)return null;const h=new Ue(r,o);return h.idToken=l.idToken||void 0,h.accessToken=l.accessToken||void 0,h.secret=l.secret,h.nonce=l.nonce,h.pendingToken=l.pendingToken||null,h}_getIdTokenResponse(e){const n=this.buildRequest();return Ge(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ge(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ge(e,n)}buildRequest(){const e={requestUri:gc,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Et(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Bs{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends At{constructor(){super("facebook.com")}static credential(e){return Ue._fromParams({providerId:Ee.PROVIDER_ID,signInMethod:Ee.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ee.credentialFromTaggedObject(e)}static credentialFromError(e){return Ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ee.credential(e.oauthAccessToken)}catch{return null}}}Ee.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ee.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te extends At{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ue._fromParams({providerId:Te.PROVIDER_ID,signInMethod:Te.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Te.credentialFromTaggedObject(e)}static credentialFromError(e){return Te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Te.credential(n,r)}catch{return null}}}Te.GOOGLE_SIGN_IN_METHOD="google.com";Te.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends At{constructor(){super("github.com")}static credential(e){return Ue._fromParams({providerId:be.PROVIDER_ID,signInMethod:be.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return be.credentialFromTaggedObject(e)}static credentialFromError(e){return be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return be.credential(e.oauthAccessToken)}catch{return null}}}be.GITHUB_SIGN_IN_METHOD="github.com";be.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends At{constructor(){super("twitter.com")}static credential(e,n){return Ue._fromParams({providerId:Ae.PROVIDER_ID,signInMethod:Ae.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ae.credentialFromTaggedObject(e)}static credentialFromError(e){return Ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Ae.credential(n,r)}catch{return null}}}Ae.TWITTER_SIGN_IN_METHOD="twitter.com";Ae.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,o=!1){const l=await ie._fromIdTokenResponse(e,r,o),h=zr(r);return new Je({user:l,providerId:h,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const o=zr(r);return new Je({user:e,providerId:o,_tokenResponse:r,operationType:n})}}function zr(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends me{constructor(e,n,r,o){var l;super(n.code,n.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,rn.prototype),this.customData={appName:e.name,tenantId:(l=e.tenantId)!==null&&l!==void 0?l:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,o){return new rn(e,n,r,o)}}function Hs(i,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?rn._fromErrorAndOperation(i,l,e,r):l})}async function mc(i,e,n=!1){const r=await wt(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return Je._forOperation(i,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vc(i,e,n=!1){const{auth:r}=i;if(re(r.app))return Promise.reject(Le(r));const o="reauthenticate";try{const l=await wt(i,Hs(r,o,e,i),n);S(l.idToken,r,"internal-error");const h=hi(l.idToken);S(h,r,"internal-error");const{sub:v}=h;return S(i.uid===v,r,"user-mismatch"),Je._forOperation(i,o,l)}catch(l){throw l?.code==="auth/user-not-found"&&pe(r,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yc(i,e,n=!1){if(re(i.app))return Promise.reject(Le(i));const r="signIn",o=await Hs(i,r,e),l=await Je._fromIdTokenResponse(i,r,o);return n||await i._updateCurrentUser(l.user),l}function _c(i,e,n,r){return Xe(i).onIdTokenChanged(e,n,r)}function wc(i,e,n){return Xe(i).beforeAuthStateChanged(e,n)}const sn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(sn,"1"),this.storage.removeItem(sn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic=1e3,Ec=10;class $s extends Vs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xs(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),o=this.localCache[n];r!==o&&e(n,o,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((h,v,w)=>{this.notifyListeners(h,w)});return}const r=e.key;n?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(r);!n&&this.localCache[r]===h||this.notifyListeners(r,h)},l=this.storage.getItem(r);ec()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Ec):o()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Ic)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}$s.type="LOCAL";const Tc=$s;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs extends Vs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}zs.type="SESSION";const Ws=zs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(o=>o.isListeningto(e));if(n)return n;const r=new an(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:o,data:l}=n.data,h=this.handlersMap[o];if(!h?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const v=Array.from(h).map(async E=>E(n.origin,l)),w=await bc(v);n.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:w})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}an.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(i="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,h;return new Promise((v,w)=>{const E=pi("",20);o.port1.start();const b=setTimeout(()=>{w(new Error("unsupported_event"))},r);h={messageChannel:o,onMessage(A){const C=A;if(C.data.eventId===E)switch(C.data.status){case"ack":clearTimeout(b),l=setTimeout(()=>{w(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),v(C.data.response);break;default:clearTimeout(b),clearTimeout(l),w(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(){return window}function Sc(i){oe().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(){return typeof oe().WorkerGlobalScope<"u"&&typeof oe().importScripts=="function"}async function Cc(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function kc(){var i;return((i=navigator?.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function Rc(){return Gs()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks="firebaseLocalStorageDb",Pc=1,on="firebaseLocalStorage",qs="fbase_key";class St{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ln(i,e){return i.transaction([on],e?"readwrite":"readonly").objectStore(on)}function Oc(){const i=indexedDB.deleteDatabase(Ks);return new St(i).toPromise()}function Qn(){const i=indexedDB.open(Ks,Pc);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const r=i.result;try{r.createObjectStore(on,{keyPath:qs})}catch(o){n(o)}}),i.addEventListener("success",async()=>{const r=i.result;r.objectStoreNames.contains(on)?e(r):(r.close(),await Oc(),e(await Qn()))})})}async function Wr(i,e,n){const r=ln(i,!0).put({[qs]:e,value:n});return new St(r).toPromise()}async function Nc(i,e){const n=ln(i,!1).get(e),r=await new St(n).toPromise();return r===void 0?null:r.value}function Gr(i,e){const n=ln(i,!0).delete(e);return new St(n).toPromise()}const Dc=800,Lc=3;class Js{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Lc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=an._getInstance(Rc()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Cc(),!this.activeServiceWorker)return;this.sender=new Ac(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||kc()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qn();return await Wr(e,sn,"1"),await Gr(e,sn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Wr(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Nc(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Gr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=ln(o,!1).getAll();return new St(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Dc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Js.type="LOCAL";const Mc=Js;new bt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(i,e){return e?de(e):(S(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi extends Fs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ge(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ge(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ge(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Uc(i){return yc(i.auth,new gi(i),i.bypassAuthState)}function jc(i){const{auth:e,user:n}=i;return S(n,e,"internal-error"),vc(n,new gi(i),i.bypassAuthState)}async function Fc(i){const{auth:e,user:n}=i;return S(n,e,"internal-error"),mc(n,new gi(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,n,r,o,l=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:o,tenantId:l,error:h,type:v}=e;if(h){this.reject(h);return}const w={auth:this.auth,requestUri:n,sessionId:r,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(v)(w))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Uc;case"linkViaPopup":case"linkViaRedirect":return Fc;case"reauthViaPopup":case"reauthViaRedirect":return jc;default:pe(this.auth,"internal-error")}}resolve(e){ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=new bt(2e3,1e4);class $e extends Xs{constructor(e,n,r,o,l){super(e,n,o,l),this.provider=r,this.authWindow=null,this.pollId=null,$e.currentPopupAction&&$e.currentPopupAction.cancel(),$e.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){ge(this.filter.length===1,"Popup operations only handle one event");const e=pi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(se(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(se(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$e.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(se(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Bc.get())};e()}}$e.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="pendingRedirect",Jt=new Map;class Vc extends Xs{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Jt.get(this.auth._key());if(!e){try{const r=await $c(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Jt.set(this.auth._key(),e)}return this.bypassAuthState||Jt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $c(i,e){const n=Gc(e),r=Wc(i);if(!await r._isAvailable())return!1;const o=await r._get(n)==="true";return await r._remove(n),o}function zc(i,e){Jt.set(i._key(),e)}function Wc(i){return de(i._redirectPersistence)}function Gc(i){return qt(Hc,i.config.apiKey,i.name)}async function Kc(i,e,n=!1){if(re(i.app))return Promise.reject(Le(i));const r=di(i),o=xc(r,e),h=await new Vc(r,o,n).execute();return h&&!n&&(delete h.user._redirectEventId,await r._persistUserIfCurrent(h.user),await r._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=10*60*1e3;class Jc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Xc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ys(e)){const o=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(se(this.auth,o))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=qc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Kr(e))}saveEventToCache(e){this.cachedEventUids.add(Kr(e)),this.lastProcessedEventTime=Date.now()}}function Kr(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function Ys({type:i,error:e}){return i==="unknown"&&e?.code==="auth/no-auth-event"}function Xc(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ys(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yc(i,e={}){return Qe(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Zc=/^https?/;async function eh(i){if(i.config.emulator)return;const{authorizedDomains:e}=await Yc(i);for(const n of e)try{if(th(n))return}catch{}pe(i,"unauthorized-domain")}function th(i){const e=Xn(),{protocol:n,hostname:r}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&r===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&h.hostname===r}if(!Zc.test(n))return!1;if(Qc.test(i))return r===i;const o=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=new bt(3e4,6e4);function qr(){const i=oe().___jsl;if(i?.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function ih(i){return new Promise((e,n)=>{var r,o,l;function h(){qr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qr(),n(se(i,"network-request-failed"))},timeout:nh.get()})}if(!((o=(r=oe().gapi)===null||r===void 0?void 0:r.iframes)===null||o===void 0)&&o.Iframe)e(gapi.iframes.getContext());else if(!((l=oe().gapi)===null||l===void 0)&&l.load)h();else{const v=cc("iframefcb");return oe()[v]=()=>{gapi.load?h():n(se(i,"network-request-failed"))},ac(`${lc()}?onload=${v}`).catch(w=>n(w))}}).catch(e=>{throw Xt=null,e})}let Xt=null;function rh(i){return Xt=Xt||ih(i),Xt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh=new bt(5e3,15e3),oh="__/auth/iframe",ah="emulator/auth/iframe",lh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ch=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function hh(i){const e=i.config;S(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?li(e,ah):`https://${i.config.authDomain}/${oh}`,r={apiKey:e.apiKey,appName:i.name,v:Ye},o=ch.get(i.config.apiHost);o&&(r.eid=o);const l=i._getFrameworks();return l.length&&(r.fw=l.join(",")),`${n}?${Et(r).slice(1)}`}async function uh(i){const e=await rh(i),n=oe().gapi;return S(n,i,"internal-error"),e.open({where:document.body,url:hh(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:lh,dontclear:!0},r=>new Promise(async(o,l)=>{await r.restyle({setHideOnLeave:!1});const h=se(i,"network-request-failed"),v=oe().setTimeout(()=>{l(h)},sh.get());function w(){oe().clearTimeout(v),o(r)}r.ping(w).then(w,()=>{l(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},fh=500,ph=600,gh="_blank",mh="http://localhost";class Jr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function vh(i,e,n,r=fh,o=ph){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-r)/2,0).toString();let v="";const w=Object.assign(Object.assign({},dh),{width:r.toString(),height:o.toString(),top:l,left:h}),E=q().toLowerCase();n&&(v=Os(E)?gh:n),Rs(E)&&(e=e||mh,w.scrollbars="yes");const b=Object.entries(w).reduce((C,[U,k])=>`${C}${U}=${k},`,"");if(Zl(E)&&v!=="_self")return yh(e||"",v),new Jr(null);const A=window.open(e||"",v,b);S(A,i,"popup-blocked");try{A.focus()}catch{}return new Jr(A)}function yh(i,e){const n=document.createElement("a");n.href=i,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="__/auth/handler",wh="emulator/auth/handler",Ih=encodeURIComponent("fac");async function Xr(i,e,n,r,o,l){S(i.config.authDomain,i,"auth-domain-config-required"),S(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:r,v:Ye,eventId:o};if(e instanceof Bs){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",ia(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[b,A]of Object.entries({}))h[b]=A}if(e instanceof At){const b=e.getScopes().filter(A=>A!=="");b.length>0&&(h.scopes=b.join(","))}i.tenantId&&(h.tid=i.tenantId);const v=h;for(const b of Object.keys(v))v[b]===void 0&&delete v[b];const w=await i._getAppCheckToken(),E=w?`#${Ih}=${encodeURIComponent(w)}`:"";return`${Eh(i)}?${Et(v).slice(1)}${E}`}function Eh({config:i}){return i.emulator?li(i,wh):`https://${i.authDomain}/${_h}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn="webStorageSupport";class Th{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ws,this._completeRedirectFn=Kc,this._overrideRedirectResult=zc}async _openPopup(e,n,r,o){var l;ge((l=this.eventManagers[e._key()])===null||l===void 0?void 0:l.manager,"_initialize() not called before _openPopup()");const h=await Xr(e,n,r,Xn(),o);return vh(e,h,pi())}async _openRedirect(e,n,r,o){await this._originValidation(e);const l=await Xr(e,n,r,Xn(),o);return Sc(l),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:o,promise:l}=this.eventManagers[n];return o?Promise.resolve(o):(ge(l,"If manager is not set, promise should be"),l)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await uh(e),r=new Jc(e);return n.register("authEvent",o=>(S(o?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Vn,{type:Vn},o=>{var l;const h=(l=o?.[0])===null||l===void 0?void 0:l[Vn];h!==void 0&&n(!!h),pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=eh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return xs()||Ps()||ui()}}const bh=Th;var Yr="@firebase/auth",Qr="1.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ch(i){Ke(new xe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:h,authDomain:v}=r.options;S(h&&!h.includes(":"),"invalid-api-key",{appName:r.name});const w={apiKey:h,authDomain:v,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Us(i)},E=new sc(r,o,l,w);return uc(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ke(new xe("auth-internal",e=>{const n=di(e.getProvider("auth").getImmediate());return(r=>new Ah(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ke(Yr,Qr,Sh(i)),ke(Yr,Qr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=5*60,Rh=cs("authIdTokenMaxAge")||kh;let Zr=null;const Ph=i=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Rh)return;const o=n?.token;Zr!==o&&(Zr=o,await fetch(i,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function Oh(i=fs()){const e=ni(i,"auth");if(e.isInitialized())return e.getImmediate();const n=hc(i,{popupRedirectResolver:bh,persistence:[Mc,Tc,Ws]}),r=cs("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(r,location.origin);if(location.origin===l.origin){const h=Ph(l.toString());wc(n,h,()=>h(n.currentUser)),_c(n,v=>h(v))}}const o=as("auth");return o&&dc(n,`http://${o}`),n}function Nh(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}oc({loadJS(i){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",i),r.onload=e,r.onerror=o=>{const l=se("internal-error");l.customData=o,n(l)},r.type="text/javascript",r.charset="UTF-8",Nh().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ch("Browser");const Dh={apiKey:"AIzaSyDkcPHQ3a89WwsizzkYC7WF2_B6iAPb9f0",authDomain:"chunggu-golf.firebaseapp.com",projectId:"chunggu-golf",storageBucket:"chunggu-golf.firebasestorage.app",messagingSenderId:"548891376636",appId:"1:548891376636:web:7bc1d1b3034a46baab9079",measurementId:"G-83K93WKFPE"};let $n,es,ts;try{$n=ds(Dh),es=Nl($n),ts=Oh($n),console.log("Firebase 초기화 성공!")}catch(i){console.error("Firebase 초기화 오류:",i),es={},ts={}}function Gt(i,e="id"){return!i||!Array.isArray(i)?[]:i.map(n=>({...n,[e]:String(n[e])}))}function ns(i,e=["member_id","meeting_id"]){return!i||!Array.isArray(i)?[]:i.map(n=>{const r={...n};return e.forEach(o=>{r[o]!==void 0&&(r[o]=String(r[o]))}),r})}function Lh(i){return i?{members:Gt(i.members||[]),meetings:Gt(i.meetings||[]),scores:ns(Gt(i.scores||[])),specialAwards:ns(Gt(i.specialAwards||[]))}:{}}function Mh(i){const e=Lh(i),n=e?.members??[],r=e?.scores??[],o=e?.meetings??[],l=e?.specialAwards??[],h=n.length,v=o.length,w=r.length,E=r.length>0?(r.reduce((M,P)=>M+P.gross_score,0)/r.length).toFixed(1):"-";let b=null,A=null;r.length>0&&(b=Math.min(...r.map(P=>P.gross_score)),A=r.find(P=>P.gross_score===b)?.member_id);let C=null;A&&(C=n.find(P=>P.id===A)?.name);const U=l.filter(M=>M.category==="hole_in_one").length;return{totalMembers:h,totalMeetings:v,totalRounds:w,avgScore:E,bestScore:b,bestScoreMemberId:A,bestScoreMemberName:C,holeInOnes:U,prevYearComparison:{avgScoreChange:-1.8,participationChange:12.5,meetingsChange:15}}}function is({data:i,showChangeStats:e=!0,cardSize:n="md",layout:r="grid",animated:o=!0,className:l=""}){const h=Mh(i),{totalMembers:v,totalMeetings:w,avgScore:E,bestScore:b,bestScoreMemberName:A,prevYearComparison:C={}}=h,k=`stats-summary ${{grid:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",flex:"flex flex-wrap gap-4"}[r]} ${l}`;return N.jsxs("div",{className:k,children:[N.jsx($t,{title:"참가 회원",value:`${v??0}명`,icon:"users",color:"blue",size:n,showAnimation:o,change:e&&C.totalMembersChange,changeLabel:"전년 대비"}),N.jsx($t,{title:"평균 스코어",value:`${E??"-"}${typeof E=="string"?"":"타"}`,icon:"chart-line",color:"green",size:n,showAnimation:o,change:e&&C.avgScoreChange,changeLabel:"전년 대비"}),N.jsx($t,{title:"베스트 스코어",value:`${b??"-"}${typeof b=="number"?"타":""}`,icon:"trophy",color:"yellow",size:n,showAnimation:o}),N.jsx($t,{title:"모임 횟수",value:`${w??0}회`,icon:"calendar",color:"purple",size:n,showAnimation:o,change:e&&C.meetingsChange,changeLabel:"전년 대비"}),A&&N.jsx("div",{className:"col-span-full mt-2",children:N.jsxs("p",{className:"text-sm text-gray-600 italic",children:["베스트 스코어: ",N.jsx("span",{className:"font-medium",children:A}),"님의 ",b,"타"]})})]})}function jh({statsByYear:i}){const[e,n]=pr.useState("전체"),[r,o]=pr.useState(""),l=Object.keys(i).sort(),h=E=>{let b={scores:[],members:[],meetings:[],specialAwards:[]};return Object.values(E).forEach(A=>{b.scores.push(...A.scores),b.members.push(...A.members),b.meetings.push(...A.meetings),A.specialAwards&&b.specialAwards.push(...A.specialAwards)}),b},v=(E,b)=>{if(!b.trim())return E;const A=b.trim().toLowerCase();return{...E,scores:E.scores.filter(C=>C.member_name?.toLowerCase().includes(A))}};let w=null;if(e==="전체"){const E=h(i),b=v(E,r);w=b.scores.length>0&&N.jsxs("section",{className:"mb-12",children:[N.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"전체 통계"}),N.jsx(is,{data:b})]})}else{const E=i[e],b=v(E,r);w=b.scores.length>0&&N.jsxs("section",{className:"mb-12",children:[N.jsxs("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:[e,"년 통계"]}),N.jsx(is,{data:b})]})}return N.jsxs("div",{children:[N.jsx("div",{className:"flex flex-wrap gap-2 mb-10",children:["전체",...l].map(E=>N.jsx("button",{className:`px-4 py-2 rounded-md text-sm font-medium transition ${e===E?"btn-primary":"border border-primary text-primary hover:bg-primary hover:text-white"}`,onClick:()=>n(E),children:E},E))}),w||N.jsx("p",{className:"text-sm text-gray-500 italic",children:"일치하는 통계 정보가 없습니다."})]})}export{jh as default};
