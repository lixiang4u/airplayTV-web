"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[634],{85947:(e,t,r)=>{r.d(t,{A:()=>i});var a=r(134);class i{constructor(){(0,a.A)(this,"type",-1),(0,a.A)(this,"onStreamAdd",void 0)}destroy(e){}}},16634:(e,t,r)=>{r.r(t),r.d(t,{IVFHeader:()=>A,default:()=>f});var a=r(134),i=r(63939),d=r(50932),o=r(4624),s=r(9705),h=r(85947),n=r(14686),c=r(37837),m=r(71517),u=r(77231),R="src\\avformat\\formats\\IIvfFormat.ts";const w={VP80:139,VP90:167};class A{constructor(){(0,a.A)(this,"version",void 0),(0,a.A)(this,"length",void 0),(0,a.A)(this,"codec",void 0),(0,a.A)(this,"width",void 0),(0,a.A)(this,"height",void 0),(0,a.A)(this,"denominator",void 0),(0,a.A)(this,"numerator",void 0),(0,a.A)(this,"framesCount",void 0),this.version=0,this.length=32,this.codec="VP80",this.width=0,this.height=0,this.framesCount=0,this.denominator=1,this.numerator=0}}class f extends h.A{constructor(){super(),(0,a.A)(this,"type",5),(0,a.A)(this,"header",void 0),this.header=new A}init(e){e.ioReader&&e.ioReader.setEndian(!1)}async readHeader(e){try{if("DKIF"!==await e.ioReader.readString(4))return o.z3("the file format is not ivf",R,104),s.LR;this.header.version=await e.ioReader.readUint16(),await e.ioReader.skip(2),this.header.codec=await e.ioReader.readString(4),this.header.width=await e.ioReader.readUint16(),this.header.height=await e.ioReader.readUint16(),this.header.denominator=await e.ioReader.readUint32(),this.header.numerator=await e.ioReader.readUint32(),this.header.framesCount=await e.ioReader.readUint32(),await e.ioReader.skip(4);const t=e.createStream();return t.codecpar.codecType=0,t.codecpar.codecId=w[this.header.codec],t.timeBase.den=this.header.denominator,t.timeBase.num=this.header.numerator,t.codecpar.width=this.header.width,t.codecpar.height=this.header.height,t.nbFrames=BigInt(Math.floor(this.header.framesCount)),this.onStreamAdd&&this.onStreamAdd(t),0}catch(t){return o.z3(t.message,R,136),e.ioReader.error}}async readAVPacket(e,t){try{const r=e.getStreamByMediaType(0);if(!r)return s.LR;{const a=e.ioReader.getPos(),o=await e.ioReader.readUint32(),s=await e.ioReader.readUint64(),h=(0,c.sY)(o);(0,m.NX)(t,h,o),await e.ioReader.readBuffer(o,(0,n.JW)(h,o)),d.M[17](t+56,a),d.M[17](t+8,s),d.M[17](t+16,s),d.M[15](t+76,this.header.denominator),d.M[15](t+72,this.header.numerator),d.M[15](t+32,r.index),r.startTime===u.Dh&&(r.startTime=i.f[17](t+8)||i.f[17](t+16))}return 0}catch(t){return-1048576!==e.ioReader.error?(o.z3(`read packet error, ${t}`,R,173),s.LR):e.ioReader.error}}async seek(e,t,r,a){return BigInt(s.E$)}getAnalyzeStreamsCount(){return 1}}}}]);