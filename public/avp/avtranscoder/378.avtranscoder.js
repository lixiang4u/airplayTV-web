(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[378],{47344:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>m});var i=s(134),n=s(50932),r=s(4624),a=s(9705),o=s(85947),u=s(14686),c=s(37837),d=s(71517),h=s(72739),f=s(50011),l=s(51785),g="src/avformat/formats/IAssFormat.ts";class m extends o.A{constructor(){super(),(0,i.A)(this,"type",17),(0,i.A)(this,"queue",void 0),(0,i.A)(this,"index",void 0)}init(t){this.queue=[]}async readHeader(t){const e=await t.ioReader.readLine();if("[Script Info]"!==e.trim())return r.z3("the file format is not ass",g,68),a.LR;const s=t.createStream();s.codecpar.codecId=94230,s.codecpar.codecType=3,s.timeBase.den=1e3,s.timeBase.num=1;let i,n=e+"\n",o=!1,d=0,m=0;for(;;){const e=await t.ioReader.readLine();if(!/^;/.test(e)){if("[Events]"===e.trim()&&(o=!0),/^Format:/.test(e)&&o){n+=e,i=l.Bp(e.trim());for(let t=0;t<i.length;t++)"Start"===i[t]?d=t:"End"===i[t]&&(m=t);break}n+=e+"\n"}}const p=f.encode(n);s.codecpar.extradata=(0,c.sY)(p.length),s.codecpar.extradataSize=p.length,(0,u.lW)(s.codecpar.extradata,p.length,p),this.index=0;let B=BigInt(0);try{for(;;){const e=t.ioReader.getPos(),n=(await t.ioReader.readLine()).trim();if(/^;/.test(n)||/^Comment:/.test(n))continue;const{start:r,end:a}=l.Ew(i,n,d,m);s.nbFrames++,s.duration=a;const o={context:n,startTs:r,endTs:a,pos:e};r>=B?(this.queue.push(o),B=r):h._(this.queue,o,(t=>t.startTs<o.startTs?1:-1))}}catch(t){return 0}}async readAVPacket(t,e){if(!this.queue.length)return a.LR;if(this.index>=this.queue.length)return-1048576;const s=t.streams.find((t=>3===t.codecpar.codecType)),i=this.queue[this.index++];n.M[15](e+32,s.index),n.M[15](e+76,s.timeBase.den),n.M[15](e+72,s.timeBase.num),n.M[17](e+16,i.startTs),n.M[17](e+8,i.startTs),n.M[17](e+48,i.endTs-i.startTs);const r=f.encode(i.context),o=(0,c.sY)(r.length);return(0,u.lW)(o,r.length,r),(0,d.NX)(e,o,r.length),0}async seek(t,e,s,i){if(2&i)return BigInt(a.E$);if(s<=BigInt(0))return this.index=0,BigInt(0);const n=h.El(this.queue,(t=>t.startTs>s?-1:1));if(n>=0){for(r.Yz(`seek in cues, found index: ${n}, pts: ${this.queue[n].startTs}, pos: ${this.queue[n].pos}`,g,217),this.index=Math.max(n-1,0);this.index>0&&this.queue[this.index-1].startTs===this.queue[this.index].startTs;)this.index--;return BigInt(0)}return BigInt(a.LR)}getAnalyzeStreamsCount(){return 1}}},85947:(t,e,s)=>{"use strict";s.d(e,{A:()=>n});var i=s(134);class n{constructor(){(0,i.A)(this,"type",-1),(0,i.A)(this,"onStreamAdd",void 0)}destroy(t){}}},5028:(t,e,s)=>{"use strict";s.d(e,{Q:()=>i});const i=["ReadOrder","Layer","Start","End","Style","Name","MarginL","MarginR","MarginV","Effect","Text"]},51785:(t,e,s)=>{"use strict";s.d(e,{Bp:()=>o,Ew:()=>u}),s(7210);var i=s(4624),n=s(5028),r=s(54825),a="src/avformat/formats/ass/iass.ts";function o(t){return function(t,e){const s=e.match(/Format\s*:\s*(.*)/i)[1].split(/\s*,\s*/),n=[];for(let e=0;e<s.length;e++){const r=t.find((t=>t.toLowerCase()===s[e].toLowerCase()));r||i.R8(`not support ass field(${s[e]})`,a,40),n.push(r||s[e])}return n}(n.Q,t)}function u(t,e,s,i){const[,,n]=e.match(/^(\w+?)\s*:\s*(.*)/i),a=function(t,e){let s=e.split(",");if(s.length>t.length){const e=s.slice(t.length-1).join(",");s=s.slice(0,t.length-1),s.push(e)}return s}(t,n);return{start:(0,r.j)(a[s]),end:(0,r.j)(a[i])}}},54825:(t,e,s)=>{"use strict";function i(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),s=BigInt(0);return 3===e.length&&(s+=BigInt(+e.shift().trim())*BigInt(36e5)),s+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split("."),s+=BigInt(+e.shift().trim())*BigInt(1e3),s+=BigInt(+e.shift().trim()),s}function n(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),s=BigInt(0);return 3===e.length&&(s+=BigInt(+e.shift().trim())*BigInt(36e5)),s+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split(","),s+=BigInt(+e.shift().trim())*BigInt(1e3),s+=BigInt(+e.shift().trim()),s}s.d(e,{j:()=>i,t:()=>n})},11837:(t,e,s)=>{s(21489),t.exports=s(46438).Number.isNaN},21489:(t,e,s)=>{var i=s(88535);i(i.S,"Number",{isNaN:function(t){return t!=t}})},7210:(t,e,s)=>{t.exports=s(11837)},null:()=>{},null:()=>{},null:()=>{"use strict";["b","i","u","s","fsp","k","K","kf","ko","kt","fe","q","p","pbo","a","an","fscx","fscy","fax","fay","frx","fry","frz","fr","be","blur","bord","xbord","ybord","shad","xshad","yshad"].map((t=>({name:t,regex:new RegExp(`^${t}-?\\d`)})))},null:()=>{},null:()=>{}}]);