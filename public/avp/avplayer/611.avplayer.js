"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[611],{85947:(t,e,i)=>{i.d(e,{A:()=>n});var s=i(134);class n{constructor(){(0,s.A)(this,"type",-1),(0,s.A)(this,"onStreamAdd",void 0)}destroy(t){}}},85611:(t,e,i)=>{i.r(e),i.d(e,{default:()=>p});var s=i(134),n=i(50932),r=i(4624),a=i(9705),o=i(85947),h=i(14686),u=i(37837),d=i(71517),c=i(72739),f=i(50011),l=i(54825),g="src\\avformat\\formats\\IWebVttFormat.ts";class p extends o.A{constructor(){super(),(0,s.A)(this,"type",16),(0,s.A)(this,"queue",void 0),(0,s.A)(this,"index",void 0)}init(t){this.queue=[]}async readChunk(t){let e="";const i=t.ioReader.getPos();for(;;){const i=await t.ioReader.readLine();if(""===i)break;e+=i+"\n"}return{chunk:e.trim(),pos:i}}async readHeader(t){const e=await t.ioReader.peekBuffer(3);if(239===e[0]&&187===e[1]&&191===e[2]&&await t.ioReader.skip(3),"WEBVTT"!==await t.ioReader.peekString(6))return r.z3("the file format is not vtt",g,89),a.LR;const i=t.createStream();i.codecpar.codecId=94226,i.codecpar.codecType=3,i.timeBase.den=1e3,i.timeBase.num=1;const s=await t.ioReader.readLine();s.indexOf("-")>0&&(i.metadata.title=s.split("-").pop().trim()),this.index=0;const n=[];let o=BigInt(0);try{for(;;){const{chunk:e,pos:s}=await this.readChunk(t);if(""===e||/^NOTE/.test(e))continue;/^STYLE/.test(e)&&n.push({style:e.replace(/STYLE[\s|\n]?/,""),pos:s});const r=e.split("\n");let a,h;-1===r[0].indexOf("--\x3e")&&(a=r.shift().trim());let u=r.shift().split("--\x3e");const d=(0,l.j)(u.shift());u=u.shift().trim().split(" ");const f=(0,l.j)(u.shift());if(f<=d)continue;u=u.filter((t=>""!==t)),u.length&&(h=u.join(" "));const g=r.join("\n").trim();if(!g)continue;i.nbFrames++,i.duration=f;const p={identifier:a,options:h,context:g,startTs:d,endTs:f,pos:s};d>=o?(this.queue.push(p),o=d):c._(this.queue,p,(t=>t.startTs<p.startTs?1:-1))}}catch(t){return i.metadata.styles=n,0}}async readAVPacket(t,e){if(!this.queue.length)return a.LR;if(this.index>=this.queue.length)return-1048576;const i=t.streams.find((t=>3===t.codecpar.codecType)),s=this.queue[this.index++];if(n.M[15](e+32,i.index),n.M[15](e+76,i.timeBase.den),n.M[15](e+72,i.timeBase.num),n.M[17](e+16,s.startTs),n.M[17](e+8,s.startTs),n.M[17](e+48,s.endTs-s.startTs),s.identifier){const t=f.encode(s.identifier),i=(0,u.sY)(t.length);(0,h.lW)(i,t.length,t),(0,d.Ow)(e,16,i,t.length)}if(s.options){const t=f.encode(s.options),i=(0,u.sY)(t.length);(0,h.lW)(i,t.length,t),(0,d.Ow)(e,17,i,t.length)}const r=f.encode(s.context),o=(0,u.sY)(r.length);return(0,h.lW)(o,r.length,r),(0,d.NX)(e,o,r.length),0}async seek(t,e,i,s){if(2&s)return BigInt(a.E$);if(i<=BigInt(0))return this.index=0,BigInt(0);const n=c.El(this.queue,(t=>t.startTs>i?-1:1));if(n>=0){for(r.Yz(`seek in cues, found index: ${n}, pts: ${this.queue[n].startTs}, pos: ${this.queue[n].pos}`,g,256),this.index=Math.max(n-1,0);this.index>0&&(this.queue[this.index-1].startTs===this.queue[this.index].startTs||this.queue[this.index-1].endTs>i);)this.index--;return BigInt(0)}return BigInt(a.LR)}getAnalyzeStreamsCount(){return 1}}},54825:(t,e,i)=>{function s(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),i=BigInt(0);return 3===e.length&&(i+=BigInt(+e.shift().trim())*BigInt(36e5)),i+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split("."),i+=BigInt(+e.shift().trim())*BigInt(1e3),i+=BigInt(+e.shift().trim()),i}function n(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),i=BigInt(0);return 3===e.length&&(i+=BigInt(+e.shift().trim())*BigInt(36e5)),i+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split(","),i+=BigInt(+e.shift().trim())*BigInt(1e3),i+=BigInt(+e.shift().trim()),i}i.d(e,{j:()=>s,t:()=>n})}}]);