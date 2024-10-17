(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[473],{85947:(t,e,i)=>{"use strict";i.d(e,{A:()=>a});var n=i(78716),r=i(81570),s=i(134),a=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"type",-1),(0,s.A)(this,"onStreamAdd",void 0)}return(0,r.A)(t,[{key:"destroy",value:function(t){}}]),t}()},69979:(t,e,i)=>{"use strict";i.r(e),i.d(e,{default:()=>N});var n=i(88435),r=i.n(n),s=i(25182),a=i(78716),h=i(81570),o=i(77193),u=i(25767),f=i(43070),c=i(31060),l=i(134),d=i(36443),g=i.n(d),p=i(63939),v=i(50932),m=i(69584),k=i(4624),b=i(94929),y=i(797),A=i(9705),w=i(92647),x=i(85947),S=i(14686),I=i(37837),B=i(71517),P=i(82348),U=i(35336),L=i(77231),R=i(52071),z=i(44328),E=i(79630),C=i(43607);function M(t,e,i){return e=(0,u.A)(e),(0,o.A)(t,F()?r()(e,i||[],(0,u.A)(t).constructor):e.apply(t,i))}function F(){try{var t=!Boolean.prototype.valueOf.call(r()(Boolean,[],(function(){})))}catch(t){}return(F=function(){return!!t})()}var T="src/avformat/formats/IOggsFormat.ts",N=function(t){function e(){var t;return(0,a.A)(this,e),t=M(this,e),(0,l.A)((0,f.A)(t),"type",3),(0,l.A)((0,f.A)(t),"headerPagesPayload",void 0),(0,l.A)((0,f.A)(t),"page",void 0),(0,l.A)((0,f.A)(t),"curSegIndex",void 0),(0,l.A)((0,f.A)(t),"curSegStart",void 0),(0,l.A)((0,f.A)(t),"segCount",void 0),(0,l.A)((0,f.A)(t),"segIndex",void 0),(0,l.A)((0,f.A)(t),"currentPts",void 0),(0,l.A)((0,f.A)(t),"firstPos",void 0),(0,l.A)((0,f.A)(t),"firstGranulePosition",void 0),t.page=new m.B,t.headerPagesPayload=[],t}var i,n,r,o,u,d;return(0,c.A)(e,t),(0,h.A)(e,[{key:"init",value:function(t){t.ioReader&&t.ioReader.setEndian(!1),t.ioReader&&t.ioReader.setEndian(!1),this.curSegIndex=-1,this.curSegStart=0,this.currentPts=BigInt(0),this.segCount=0,this.segIndex=0,this.firstGranulePosition=BigInt(0)}},{key:"estimateTotalBlock",value:(d=(0,s.A)(g().mark((function t(e){var i,n,r,s;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=BigInt(0),n=e.ioReader.getPos(),r=this.currentPts,t.next=5,e.ioReader.fileSize();case 5:return s=t.sent,t.next=8,e.ioReader.seek(C.T9(s-BigInt(195072),BigInt(0)));case 8:return t.next=10,this.syncPage(e);case 10:return t.prev=11,this.page.reset(),t.next=15,this.page.read(e.ioReader);case 15:i=this.page.granulePosition,t.next=21;break;case 18:return t.prev=18,t.t0=t.catch(11),t.abrupt("break",23);case 21:t.next=10;break;case 23:return t.next=25,e.ioReader.seek(n);case 25:return this.currentPts=r,t.abrupt("return",i);case 27:case"end":return t.stop()}}),t,this,[[11,18]])}))),function(t){return d.apply(this,arguments)})},{key:"getNextSegment",value:(u=(0,s.A)(g().mark((function t(e){var i,n,r,s;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.curSegIndex<0)){t.next=10;break}return this.page.granulePosition>BigInt(0)&&(this.currentPts=this.page.granulePosition),this.page.reset(),t.next=5,this.page.read(e.ioReader);case 5:for(this.curSegIndex=0,this.curSegStart=0,this.segIndex=-1,this.segCount=0,i=0;i<this.page.segmentTable.length;i++)255!==this.page.segmentTable[i]&&this.segCount++;case 10:n=0;case 11:if(r=this.page.segmentTable[this.curSegIndex++],n+=r,255===r){t.next=16;break}return t.abrupt("break",18);case 16:t.next=11;break;case 18:return s=this.curSegStart,this.curSegStart+=n,this.segIndex++,this.curSegIndex===this.page.segmentTable.length&&(this.curSegIndex=-1),t.abrupt("return",this.page.payload.subarray(s,s+n));case 23:case"end":return t.stop()}}),t,this)}))),function(t){return u.apply(this,arguments)})},{key:"readHeader",value:(o=(0,s.A)(g().mark((function t(e){var i,n,r,s,a,h,o,u,f,c,l,d,p;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.ioReader.peekString(4);case 3:if("OggS"===(i=t.sent)){t.next=7;break}return k.z3("the file format is not oggs",T,167),t.abrupt("return",A.LR);case 7:return t.next=9,this.getNextSegment(e);case 9:if(n=t.sent,(r=new P.A(n.length,!1)).appendBuffer(n),"OpusHead"!==(i=r.peekString(8))){t.next=38;break}return(s=new b.q).read(r),a=new b.o,t.next=19,this.getNextSegment(e);case 19:return n=t.sent,(r=new P.A(n.length,!1)).appendBuffer(n),a.read(r),this.headerPagesPayload=[s,a],(h=e.createStream()).codecpar.codecType=1,h.codecpar.codecId=86076,h.codecpar.sampleRate=s.sampleRate,h.codecpar.chLayout.nbChannels=s.channels,h.timeBase.den=h.codecpar.sampleRate,h.timeBase.num=1,h.privData={serialNumber:this.page.serialNumber},this.onStreamAdd&&this.onStreamAdd(h),t.next=35,this.estimateTotalBlock(e);case 35:h.duration=t.sent,t.next=74;break;case 38:if("vorbis"!==i.slice(1,7)){t.next=74;break}return o=[n],(u=new y.m).read(r),f=new y.G,t.next=45,this.getNextSegment(e);case 45:return n=t.sent,(r=new P.A(n.length,!1)).appendBuffer(n),f.read(r),o.push(n),this.headerPagesPayload=[u,f],(c=e.createStream()).codecpar.codecType=1,c.codecpar.codecId=86021,c.codecpar.sampleRate=u.sampleRate,c.codecpar.chLayout.nbChannels=u.channels,c.timeBase.den=c.codecpar.sampleRate,c.timeBase.num=1,c.privData={serialNumber:this.page.serialNumber},t.t0=o,t.next=62,this.getNextSegment(e);case 62:return t.t1=t.sent,t.t0.push.call(t.t0,t.t1),l=o.reduce((function(t,e){return t+2+e.length}),0),d=(0,I.sY)(l),p=new U.A(l,!0,new E.A(d,l)),o.forEach((function(t){p.writeUint16(t.length),p.writeBuffer(t)})),c.codecpar.extradata=d,c.codecpar.extradataSize=l,this.onStreamAdd&&this.onStreamAdd(c),t.next=73,this.estimateTotalBlock(e);case 73:c.duration=t.sent;case 74:return this.firstPos=e.ioReader.getPos(),t.abrupt("return",0);case 78:return t.prev=78,t.t2=t.catch(0),k.z3(t.t2.message,T,277),t.abrupt("return",e.ioReader.error);case 82:case"end":return t.stop()}}),t,this,[[0,78]])}))),function(t){return o.apply(this,arguments)})},{key:"readAVPacket",value:(r=(0,s.A)(g().mark((function t(e,i){var n,r,s,a,h,o,u,f=this;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.headerPagesPayload.length){t.next=2;break}return t.abrupt("return",A.E$);case 2:return v.M[17](i+56,e.ioReader.getPos()),t.prev=3,t.next=6,this.getNextSegment(e);case 6:n=t.sent,r=this.currentPts+(this.page.granulePosition-this.currentPts)/BigInt(Math.floor(this.segCount))*BigInt(Math.floor(this.segIndex)),v.M[17](i+16,r),v.M[17](i+8,r),this.firstGranulePosition||(this.firstGranulePosition=this.page.granulePosition),(s=e.streams.find((function(t){return t.privData.serialNumber===f.page.serialNumber})))&&(v.M[15](i+32,s.index),v.M[15](i+76,s.timeBase.den),v.M[15](i+72,s.timeBase.num),1===s.codecpar.codecType&&v.M[15](i+36,1|p.f[15](i+36))),a=[n];case 13:if(!(this.curSegIndex<0)){t.next=34;break}return t.prev=14,t.next=17,e.ioReader.peekBuffer(6);case 17:if(!(1&t.sent[5])){t.next=26;break}return t.t0=a,t.next=22,this.getNextSegment(e);case 22:t.t1=t.sent,t.t0.push.call(t.t0,t.t1),t.next=27;break;case 26:return t.abrupt("break",34);case 27:t.next=32;break;case 29:return t.prev=29,t.t2=t.catch(14),t.abrupt("break",34);case 32:t.next=13;break;case 34:return h=(0,w.A)(Uint8Array,a),o=h.length,u=(0,I.sY)(o),(0,S.lW)(u,o,h),(0,B.NX)(i,u,o),t.abrupt("return",0);case 42:return t.prev=42,t.t3=t.catch(3),-1048576!==e.ioReader.error&&k.z3(t.t3.message,T,343),t.abrupt("return",e.ioReader.error);case 46:case"end":return t.stop()}}),t,this,[[3,42],[14,29]])}))),function(t,e){return r.apply(this,arguments)})},{key:"syncPage",value:(n=(0,s.A)(g().mark((function t(e){var i,n,r,s;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:i=L.Dh,n=3,r=BigInt(0);case 3:return t.prev=4,t.next=7,e.ioReader.peekString(4);case 7:if("OggS"!==t.sent){t.next=33;break}return i=e.ioReader.getPos(),this.page.reset(),t.next=13,this.page.read(e.ioReader);case 13:r=this.page.granulePosition,s=0;case 15:if(s!==n){t.next=18;break}return t.abrupt("break",31);case 18:return t.next=20,e.ioReader.peekString(4);case 20:if("OggS"!==t.sent){t.next=28;break}return s++,this.page.reset(),t.next=26,this.page.read(e.ioReader);case 26:t.next=29;break;case 28:return t.abrupt("break",31);case 29:t.next=15;break;case 31:if(s!==n){t.next=33;break}return t.abrupt("break",42);case 33:return t.next=35,e.ioReader.skip(1);case 35:t.next=40;break;case 37:return t.prev=37,t.t0=t.catch(4),t.abrupt("break",42);case 40:t.next=3;break;case 42:if(i===L.Dh){t.next=59;break}return t.next=45,e.ioReader.seek(i);case 45:return t.next=48,e.ioReader.peekBuffer(6);case 48:if(1&t.sent[5]){t.next=51;break}return t.abrupt("break",57);case 51:return this.page.reset(),t.next=54,this.page.read(e.ioReader);case 54:r=this.page.granulePosition,t.next=45;break;case 57:this.currentPts=r-this.firstGranulePosition,this.curSegIndex=-1;case 59:case"end":return t.stop()}}),t,this,[[4,37]])}))),function(t){return n.apply(this,arguments)})},{key:"seek",value:(i=(0,s.A)(g().mark((function t(e,i,n,r){var s,a;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=e.ioReader.getPos(),!(2&r)){t.next=16;break}return t.next=4,e.ioReader.fileSize();case 4:if(!((a=t.sent)<=BigInt(0))){t.next=7;break}return t.abrupt("return",BigInt(A.E$));case 7:return n<BigInt(0)?n=BigInt(0):n>a&&(n=a),t.next=10,e.ioReader.seek(n);case 10:if(4&r){t.next=13;break}return t.next=13,this.syncPage(e);case 13:return t.abrupt("return",s);case 16:if(!((0,z.k)(n,i.timeBase,L.i0)<BigInt(1e4))){t.next=23;break}return k.Yz("seek pts is earlier then 10s, seek to first packet pos(".concat(this.firstPos,") directly"),T,435),t.next=21,e.ioReader.seek(this.firstPos);case 21:return this.currentPts=BigInt(0),t.abrupt("return",s);case 23:return t.abrupt("return",(0,R.A)(e,i,n,this.firstPos,this.readAVPacket.bind(this),this.syncPage.bind(this)));case 24:case"end":return t.stop()}}),t,this)}))),function(t,e,n,r){return i.apply(this,arguments)})},{key:"getAnalyzeStreamsCount",value:function(){return 1}}]),e}(x.A)},69584:(t,e,i)=>{"use strict";i.d(e,{B:()=>f});var n=i(25182),r=i(78716),s=i(81570),a=i(134),h=i(36443),o=i.n(h),u=i(77231),f=function(){function t(){(0,r.A)(this,t),(0,a.A)(this,"capturePattern",void 0),(0,a.A)(this,"streamStructureVersion",void 0),(0,a.A)(this,"headerTypeFlag",void 0),(0,a.A)(this,"granulePosition",void 0),(0,a.A)(this,"serialNumber",void 0),(0,a.A)(this,"pageSequenceNumber",void 0),(0,a.A)(this,"crcCheckSum",void 0),(0,a.A)(this,"numberPageSegments",void 0),(0,a.A)(this,"segmentTable",void 0),(0,a.A)(this,"payload",void 0),this.reset()}var e,i;return(0,s.A)(t,[{key:"reset",value:function(){this.capturePattern="OggS",this.streamStructureVersion=0,this.headerTypeFlag=0,this.granulePosition=u.Dh,this.serialNumber=0,this.pageSequenceNumber=0,this.crcCheckSum=0,this.numberPageSegments=0,this.segmentTable=[]}},{key:"read",value:(i=(0,n.A)(o().mark((function t(e){var i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.readPageHeader(e);case 2:if(!(i=this.segmentTable.reduce((function(t,e){return t+e}),0))){t.next=7;break}return t.next=6,e.readBuffer(i);case 6:this.payload=t.sent;case 7:case"end":return t.stop()}}),t,this)}))),function(t){return i.apply(this,arguments)})},{key:"readPageHeader",value:(e=(0,n.A)(o().mark((function t(e){var i,n;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.readString(4);case 2:return this.capturePattern=t.sent,t.next=5,e.readUint8();case 5:return this.streamStructureVersion=t.sent,t.next=8,e.readUint8();case 8:return this.headerTypeFlag=t.sent,t.next=11,e.readUint64();case 11:return this.granulePosition=t.sent,t.next=14,e.readUint32();case 14:return this.serialNumber=t.sent,t.next=17,e.readUint32();case 17:return this.pageSequenceNumber=t.sent,t.next=20,e.readUint32();case 20:return this.crcCheckSum=t.sent,t.next=23,e.readUint8();case 23:if(this.numberPageSegments=t.sent,!this.numberPageSegments){t.next=34;break}i=0;case 26:if(!(i<this.numberPageSegments)){t.next=34;break}return t.next=29,e.readUint8();case 29:n=t.sent,this.segmentTable.push(n);case 31:i++,t.next=26;break;case 34:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"write",value:function(t){if(t.writeString(this.capturePattern),t.writeUint8(this.streamStructureVersion),t.writeUint8(this.headerTypeFlag),t.writeUint64(this.granulePosition),t.writeUint32(this.serialNumber),t.writeUint32(this.pageSequenceNumber),t.writeUint32(this.crcCheckSum),this.payload){this.numberPageSegments=Math.ceil(this.payload.length/255);var e=this.payload.length%255;t.writeUint8(this.numberPageSegments);for(var i=0;i<this.numberPageSegments-1;i++)t.writeUint8(255);t.writeUint8(e),t.writeBuffer(this.payload)}else t.writeUint8(0)}}]),t}()},94929:(t,e,i)=>{"use strict";i.d(e,{o:()=>u,q:()=>h});var n=i(78716),r=i(81570),s=i(134),a=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamCount",void 0),(0,s.A)(this,"coupledStreamCount",void 0),(0,s.A)(this,"mapping",void 0),this.streamCount=1,this.coupledStreamCount=0,this.mapping=null}return(0,r.A)(t,[{key:"read",value:function(t){this.streamCount=t.readUint8(),this.coupledStreamCount=t.readUint8(),this.mapping=t.readBuffer(this.streamCount+this.coupledStreamCount)}},{key:"write",value:function(t){t.writeUint8(this.streamCount),t.writeUint8(this.coupledStreamCount),t.writeBuffer(this.mapping)}}]),t}(),h=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"channels",void 0),(0,s.A)(this,"preSkip",void 0),(0,s.A)(this,"sampleRate",void 0),(0,s.A)(this,"outputGain",void 0),(0,s.A)(this,"channelMappingFamily",void 0),(0,s.A)(this,"channelMappingTable",void 0),this.signature="OpusHead",this.version=1,this.channels=1,this.preSkip=0,this.sampleRate=48e3,this.outputGain=0,this.channelMappingFamily=0,this.channelMappingTable=new a}return(0,r.A)(t,[{key:"read",value:function(t){this.signature=t.readString(8),this.version=t.readUint8(),this.channels=t.readUint8(),this.preSkip=t.readUint16(),this.sampleRate=t.readUint32(),this.outputGain=t.readInt16(),this.channelMappingFamily=t.readUint8(),0!==this.channelMappingFamily&&this.channelMappingTable.read(t)}},{key:"write",value:function(t){t.writeString(this.signature),t.writeUint8(this.version),t.writeUint8(this.channels),t.writeUint16(this.preSkip),t.writeUint32(this.sampleRate),t.writeInt16(this.outputGain),t.writeUint8(this.channelMappingFamily),0!==this.channelMappingFamily&&this.channelMappingTable.write(t)}},{key:"setCodec",value:function(t){this.sampleRate=t.sampleRate,this.channels=t.chLayout.nbChannels}}]),t}(),o=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"list",void 0),this.list=[]}return(0,r.A)(t,[{key:"read",value:function(t,e){for(var i=0;i<e;i++){var n=t.readUint32();this.list.push(t.readString(n))}}},{key:"write",value:function(t){for(var e=0;e<this.list.length;e++){var i=t.encodeString(this.list[e]);t.writeUint32(i.length),t.writeBuffer(i)}}},{key:"addComment",value:function(t){this.list.push(t)}}]),t}(),u=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"vendorStringLength",void 0),(0,s.A)(this,"vendorString",void 0),(0,s.A)(this,"userCommentListLength",void 0),(0,s.A)(this,"comments",void 0),this.signature="OpusTags",this.vendorString="libmedia.0.0.1",this.vendorStringLength=this.vendorString.length,this.userCommentListLength=0,this.comments=new o}return(0,r.A)(t,[{key:"read",value:function(t){this.signature=t.readString(8),this.vendorStringLength=t.readUint32(),this.vendorString=t.readString(this.vendorStringLength),this.userCommentListLength=t.readUint32(),this.userCommentListLength&&this.comments.read(t,this.userCommentListLength)}},{key:"write",value:function(t){t.writeString(this.signature);var e=t.encodeString(this.vendorString);t.writeUint32(e.length),t.writeBuffer(e),t.writeUint32(this.comments.list.length),this.comments.write(t)}},{key:"addComment",value:function(t){this.comments.addComment(t)}},{key:"setCodec",value:function(t){}}]),t}()},797:(t,e,i)=>{"use strict";i.d(e,{G:()=>o,m:()=>a});var n=i(78716),r=i(81570),s=i(134),a=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"packetType",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"channels",void 0),(0,s.A)(this,"sampleRate",void 0),(0,s.A)(this,"bitrateMaximum",void 0),(0,s.A)(this,"bitrateNominal",void 0),(0,s.A)(this,"bitrateMinimum",void 0),(0,s.A)(this,"blocksize0",void 0),(0,s.A)(this,"blocksize1",void 0),(0,s.A)(this,"framingFlag",void 0),this.signature="vorbis",this.version=0,this.channels=1,this.sampleRate=48e3,this.bitrateMaximum=0,this.bitrateNominal=0,this.bitrateMinimum=0}return(0,r.A)(t,[{key:"read",value:function(t){this.packetType=t.readUint8(),this.signature=t.readString(6),this.version=t.readUint32(),this.channels=t.readUint8(),this.sampleRate=t.readInt32(),this.bitrateMaximum=t.readInt32(),this.bitrateNominal=t.readInt32(),this.bitrateMinimum=t.readInt32();var e=255&t.readUint8();this.blocksize0=Math.pow(2,e>>>4),this.blocksize1=Math.pow(2,15&e),this.framingFlag=t.readUint8()}},{key:"write",value:function(t){t.writeUint8(1),t.writeString(this.signature),t.writeUint32(this.version),t.writeUint8(this.channels),t.writeInt32(this.sampleRate),t.writeInt32(this.bitrateMaximum),t.writeInt32(this.bitrateNominal),t.writeInt32(this.bitrateMinimum),t.writeUint8(Math.log2(this.blocksize0)<<4|Math.log2(this.blocksize1)),t.writeUint8(1)}},{key:"setCodec",value:function(t){this.sampleRate=t.sampleRate,this.channels=t.chLayout.nbChannels}}]),t}(),h=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"list",void 0),this.list=[]}return(0,r.A)(t,[{key:"read",value:function(t,e){for(var i=0;i<e;i++){var n=t.readUint32();this.list.push(t.readString(n))}}},{key:"write",value:function(t){for(var e=0;e<this.list.length;e++){var i=t.encodeString(this.list[e]);t.writeUint32(i.length),t.writeBuffer(i)}}},{key:"addComment",value:function(t){this.list.push(t)}}]),t}(),o=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"packetType",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"vendorStringLength",void 0),(0,s.A)(this,"vendorString",void 0),(0,s.A)(this,"userCommentListLength",void 0),(0,s.A)(this,"comments",void 0),(0,s.A)(this,"framingFlag",void 0),this.signature="vorbis",this.vendorString="libmedia.0.0.1",this.vendorStringLength=this.vendorString.length,this.userCommentListLength=0,this.comments=new h}return(0,r.A)(t,[{key:"read",value:function(t){this.packetType=t.readUint8(),this.signature=t.readString(6),this.vendorStringLength=t.readUint32(),this.vendorString=t.readString(this.vendorStringLength),this.userCommentListLength=t.readUint32(),this.userCommentListLength&&this.comments.read(t,this.userCommentListLength),this.framingFlag=t.readUint8()}},{key:"write",value:function(t){t.writeString(this.signature);var e=t.encodeString(this.vendorString);t.writeUint32(e.length),t.writeBuffer(e),t.writeUint32(this.comments.list.length),this.comments.write(t),t.writeUint8(1)}},{key:"addComment",value:function(t){this.comments.addComment(t)}},{key:"setCodec",value:function(t){}}]),t}()},2187:(t,e,i)=>{"use strict";i.d(e,{d:()=>a});var n=i(72739),r=i(44328),s=i(77231);function a(t,e,i){var a=BigInt(0);return n.__(t,(function(t){a+=t.codecpar.bitRate*(0,r.k)(e,i,s.i0)/BigInt(8e3)})),a}},52071:(t,e,i)=>{"use strict";i.d(e,{A:()=>v});var n=i(25182),r=i(36443),s=i.n(r),a=i(63939),h=i(9599),o=i(29170),u=i(77231),f=i(44328),c=i(2187),l=i(71517),d=i(9705),g=i(4624),p="src/avformat/function/seekInBytes.ts";function v(t,e,i,n,r,s){return m.apply(this,arguments)}function m(){return(m=(0,n.A)(s().mark((function t(e,i,n,r,v,m){var k,b,y,A,w,x,S,I,B,P,U,L,R,z;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return k=e.ioReader.getPos(),t.next=3,e.ioReader.fileSize();case 3:if(b=t.sent,y=u.Dh,A=n,i.startTime!==u.Dh?A-=i.startTime:A-=i.firstDTS,!((w=(0,f.k)(n,i.timeBase,u.i0))<BigInt(1e4))){t.next=13;break}return g.Yz("seek pts is earlier then 10s, seek to first packet pos(".concat(r,") directly"),p,63),t.next=12,e.ioReader.seek(r);case 12:return t.abrupt("return",k);case 13:if(x=(0,c.d)(e.streams,A,i.timeBase),S=b-(0,c.d)(e.streams,BigInt(5e3),u.i0),I=(0,c.d)(e.streams,BigInt(1e4),u.i0),x>S&&(x=S),!(x<r)){t.next=21;break}return t.next=20,e.ioReader.seek(r);case 20:return t.abrupt("return",k);case 21:B=(0,l._5)(),P=b,U=BigInt(0);case 24:if(!(P-U<I)){t.next=28;break}return y=U,t.abrupt("break",51);case 28:return t.next=30,e.ioReader.seek(x);case 30:return t.next=32,m(e);case 32:return L=e.ioReader.getPos(),t.next=35,v(e,B);case 35:if(!(t.sent>=0)){t.next=48;break}if(R=(0,f.k)(a.f[17](B+8),(0,o.A)(B+72,h.P),u.i0),z=R-w,g.Yz("try to seek to pos: ".concat(x,", got packet pts: ").concat(a.f[17](B+8),"(").concat(R,"ms), diff: ").concat(z,"ms"),p,98),!(z<=BigInt(0)&&-z<BigInt(1e4))){t.next=45;break}return y=L,t.abrupt("break",51);case 45:x=z>BigInt(0)?U+(P=x)>>BigInt(1):(U=x)+P>>BigInt(1);case 46:t.next=49;break;case 48:return t.abrupt("break",51);case 49:t.next=24;break;case 51:if((0,l.Qe)(B),y===u.Dh){t.next=61;break}return g.Yz("finally seek to pos ".concat(y),p,124),t.next=56,e.ioReader.seek(y);case 56:return t.next=58,m(e);case 58:return t.abrupt("return",k);case 61:return t.next=63,e.ioReader.seek(k);case 63:return t.abrupt("return",BigInt(d.E$));case 64:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},82348:(t,e,i)=>{"use strict";i.d(e,{A:()=>u});var n=i(78716),r=i(81570),s=i(134),a=i(4624),h=i(50011),o="src/common/io/IOReaderSync.ts",u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1048576,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2?arguments[2]:void 0;if((0,n.A)(this,t),(0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"endPointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"fileSize_",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),(0,s.A)(this,"onSize",void 0),(0,s.A)(this,"flags",void 0),this.pos=BigInt(0),this.pointer=0,this.error=0,this.endPointer=0,this.littleEndian=!i,this.flags=0,r&&r.view)this.size=r.length,this.buffer=r,this.data=r.view;else if(r&&!r.byteOffset)this.size=r.length,this.buffer=r,this.data=new DataView(this.buffer.buffer);else{if(r)throw new Error("not support subarray of ArrayBuffer");this.size=Math.max(e,102400),this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}return(0,r.A)(t,[{key:"readUint8",value:function(){this.remainingLength()<1&&this.flush(1);var t=this.data.getUint8(this.pointer);return this.pointer++,this.pos++,t}},{key:"peekUint8",value:function(){return this.remainingLength()<1&&this.flush(1),this.data.getUint8(this.pointer)}},{key:"readUint16",value:function(){this.remainingLength()<2&&this.flush(2);var t=this.data.getUint16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}},{key:"peekUint16",value:function(){return this.remainingLength()<2&&this.flush(2),this.data.getUint16(this.pointer,this.littleEndian)}},{key:"readUint24",value:function(){return this.readUint16()<<8|this.readUint8()}},{key:"peekUint24",value:function(){this.remainingLength()<3&&this.flush(3);var t=this.pointer,e=this.pos,i=this.readUint16()<<8|this.readUint8();return this.pointer=t,this.pos=e,i}},{key:"readUint32",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getUint32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekUint32",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getUint32(this.pointer,this.littleEndian)}},{key:"readUint64",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getBigUint64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekUint64",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getBigUint64(this.pointer,this.littleEndian)}},{key:"readInt8",value:function(){this.remainingLength()<1&&this.flush(1);var t=this.data.getInt8(this.pointer);return this.pointer++,this.pos++,t}},{key:"peekInt8",value:function(){return this.remainingLength()<1&&this.flush(1),this.data.getInt8(this.pointer)}},{key:"readInt16",value:function(){this.remainingLength()<2&&this.flush(2);var t=this.data.getInt16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}},{key:"peekInt16",value:function(){return this.remainingLength()<2&&this.flush(2),this.data.getInt16(this.pointer,this.littleEndian)}},{key:"readInt32",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getInt32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekInt32",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getInt32(this.pointer,this.littleEndian)}},{key:"readInt64",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getBigInt64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekInt64",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getBigInt64(this.pointer,this.littleEndian)}},{key:"readFloat",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getFloat32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekFloat",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getFloat32(this.pointer,this.littleEndian)}},{key:"readDouble",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getFloat64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekDouble",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getFloat64(this.pointer,this.littleEndian)}},{key:"readHex",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e="",i=0;i<t;i++){var n=this.readUint8().toString(16);e+=1===n.length?"0"+n:n}return e}},{key:"peekHex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;t>this.size&&(this.error=-1048574,a.h2("peekHex, length too large",o,341)),this.remainingLength()<t&&this.flush(t);for(var e=this.pointer,i=this.pos,n="",r=0;r<t;r++){var s=this.readUint8().toString(16);n+=1===s.length?"0"+s:s}return this.pointer=e,this.pos=i,n}},{key:"readBuffer",value:function(t,e){if(!t)return new Uint8Array(0);if(e||(e=new Uint8Array(t)),this.remainingLength()<t){var i=0;if(this.remainingLength()>0){var n=this.remainingLength();e.set(this.buffer.subarray(this.pointer,this.pointer+n),i),i+=n,this.pointer+=n,this.pos+=BigInt(n),t-=n}for(;t>0;){this.flush();var r=Math.min(this.endPointer-this.pointer,t);e.set(this.buffer.subarray(this.pointer,this.pointer+r),i),i+=r,this.pointer+=r,this.pos+=BigInt(r),t-=r}}else e.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t);return e}},{key:"peekBuffer",value:function(t,e){return t?(t>this.size&&(this.error=-1048574,a.h2("peekBuffer, length too large",o,425)),this.remainingLength()<t&&this.flush(t),e||(e=new Uint8Array(t)),e.set(this.buffer.subarray(this.pointer,this.pointer+t),0),e):new Uint8Array(0)}},{key:"readString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.readBuffer(t);return h.decode(e)}},{key:"peekString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.peekBuffer(t);return h.decode(e)}},{key:"readLine",value:function(){for(var t="";;){for(var e=!1,i=this.pointer;i<this.endPointer;i++)if(10===this.buffer[i]||13===this.buffer[i]){i!==this.pointer&&(t+=this.readString(i-this.pointer)),e=!0;break}if(e)break;t+=this.readString(this.remainingLength()),this.flush()}var n=this.peekUint8();return 10!==n&&13!==n||(this.pointer++,13===n&&10===(n=this.peekUint8())&&this.pointer++),t}},{key:"peekLine",value:function(){this.remainingLength()<this.size&&this.flush();for(var t="",e=!1,i=this.pointer;i<this.endPointer;i++)if(10===this.buffer[i]||13===this.buffer[i]){t+=this.peekString(i-this.pointer),e=!0;break}return e||(this.error=-1048574,a.h2("peekLine, out of buffer",o,516)),t}},{key:"getPointer",value:function(){return this.pointer}},{key:"getPos",value:function(){return this.pos}},{key:"skip",value:function(t){for(var e=t;this.remainingLength()<t;)t-=this.remainingLength(),this.pointer=this.endPointer,this.flush();this.remainingLength()>=t&&(this.pointer+=t),this.pos+=BigInt(e)}},{key:"remainingLength",value:function(){return this.endPointer-this.pointer}},{key:"flush",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.onFlush||(this.error=-1048574,a.h2("IOReader error, flush failed because of no flush callback",o,574)),!(this.size-this.remainingLength()<=0))if(t=Math.min(t,this.size),this.pointer<this.endPointer?(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer):this.endPointer=0,this.pointer=0,t)for(;this.remainingLength()<t;){var e=this.onFlush(this.buffer.subarray(this.endPointer));if(e<0)throw this.error=e,new Error("IOReader error, flush ".concat(-1048576===e?"ended":"failed",", ret: ").concat(e));this.endPointer+=e}else{var i=this.onFlush(this.buffer.subarray(this.endPointer));if(i<0)throw this.error=i,new Error("IOReader error, flush ".concat(-1048576===i?"ended":"failed",", ret: ").concat(i));this.endPointer+=i}}},{key:"seek",value:function(t){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!(arguments.length>1&&void 0!==arguments[1]&&arguments[1])){var i=Number(t-this.pos);if(i<0&&Math.abs(i)<this.pointer)return this.pointer+=i,void(this.pos=t);if(i>0&&this.pointer+i<this.endPointer)return this.pointer+=i,void(this.pos=t);if(0===i)return}this.onSeek||(this.error=-1048574,a.h2("IOReader error, seek failed because of no seek callback",o,634)),this.pointer=this.endPointer=0,this.pos=t;var n=this.onSeek(t);0!==n&&(this.error=n,a.h2("IOReader error, seek failed",o,643)),e&&this.flush()}},{key:"getBuffer",value:function(){return this.buffer}},{key:"appendBuffer",value:function(t){if(this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else if(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer,this.pointer=0,this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else{var e=Math.min(this.size-this.endPointer,t.length);this.buffer.set(t.subarray(0,e),this.endPointer),this.endPointer+=e,a.R8("IOReader, call appendBuffer but the buffer's size is lagger then the remaining size",o,674)}}},{key:"reset",value:function(){this.pointer=this.endPointer=0,this.pos=BigInt(0),this.error=0}},{key:"setEndian",value:function(t){this.littleEndian=!t}},{key:"fileSize",value:function(){return this.fileSize_||(this.onSize||(this.error=-1048574,a.h2("IOReader error, fileSize failed because of no onSize callback",o,695)),this.fileSize_=this.onSize()),this.fileSize_}},{key:"getBufferSize",value:function(){return this.size}},{key:"pipe",value:function(t,e){if(e)if(this.remainingLength()<e){if(this.remainingLength()>0){var i=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i),e-=i}for(;e>0;){this.flush();var n=Math.min(this.endPointer-this.pointer,e);t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+n)),this.pointer+=n,this.pos+=BigInt(n),e-=n}}else t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e);else{if(this.remainingLength()>0){var r=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+r)),this.pointer+=r,this.pos+=BigInt(r)}for(;this.onFlush(this.buffer.subarray(0))>0;){var s=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+s)),this.pointer+=s,this.pos+=BigInt(s)}}}}]),t}()},35336:(t,e,i)=>{"use strict";i.d(e,{A:()=>h});var n=i(78716),r=i(81570),s=i(134),a=i(50011),h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1048576,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2?arguments[2]:void 0;if((0,n.A)(this,t),(0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),this.pointer=0,this.pos=BigInt(0),this.size=e,this.littleEndian=!i,this.error=0,r&&r.view)this.size=r.length,this.buffer=r,this.data=r.view;else if(r&&!r.byteOffset)this.size=r.length,this.buffer=r,this.data=new DataView(this.buffer.buffer);else{if(r)throw new Error("not support subarray of ArrayBuffer");this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}return(0,r.A)(t,[{key:"writeUint8",value:function(t){this.remainingLength()<1&&this.flush(),this.data.setUint8(this.pointer,t),this.pointer++,this.pos++}},{key:"writeUint16",value:function(t){this.remainingLength()<2&&this.flush(),this.data.setUint16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}},{key:"writeUint24",value:function(t){this.remainingLength()<3&&this.flush();var e=(16711680&t)>>16,i=(65280&t)>>8,n=255&t;this.littleEndian?(this.writeUint8(n),this.writeUint8(i),this.writeUint8(e)):(this.writeUint8(e),this.writeUint8(i),this.writeUint8(n))}},{key:"writeUint32",value:function(t){this.remainingLength()<4&&this.flush(),this.data.setUint32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}},{key:"writeUint64",value:function(t){this.remainingLength()<8&&this.flush(),this.data.setBigUint64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}},{key:"writeInt8",value:function(t){this.remainingLength()<1&&this.flush(),this.data.setInt8(this.pointer,t),this.pointer++,this.pos++}},{key:"writeInt16",value:function(t){this.remainingLength()<2&&this.flush(),this.data.setInt16(this.pointer,t,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}},{key:"writeInt32",value:function(t){this.remainingLength()<4&&this.flush(),this.data.setInt32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}},{key:"writeInt64",value:function(t){this.remainingLength()<8&&this.flush(),this.data.setBigInt64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}},{key:"writeFloat",value:function(t){this.remainingLength()<4&&this.flush(),this.data.setFloat32(this.pointer,t,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}},{key:"writeDouble",value:function(t){this.remainingLength()<8&&this.flush(),this.data.setFloat64(this.pointer,t,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}},{key:"getPointer",value:function(){return this.pointer}},{key:"getPos",value:function(){return this.pos}},{key:"remainingLength",value:function(){return this.size-this.pointer}},{key:"writeBuffer",value:function(t){if(t.length){var e=t.length;if(this.remainingLength()<e)for(var i=0;e>0;){this.flush();var n=Math.min(this.size,e);this.buffer.set(t.subarray(i,i+n),this.pointer),this.pointer+=n,this.pos+=BigInt(n),i+=n,e-=n}else this.buffer.set(t,this.pointer),this.pointer+=e,this.pos+=BigInt(e)}}},{key:"writeString",value:function(t){var e=a.encode(t);return this.writeBuffer(e),e.length}},{key:"encodeString",value:function(t){return a.encode(t)}},{key:"flush",value:function(){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){var t=this.onFlush(this.buffer.subarray(0,this.pointer));if(0!==t)throw this.error=t,Error("IOWriter error, flush failed")}this.pointer=0}},{key:"flushToPos",value:function(t){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){var e=this.onFlush(this.buffer.subarray(0,this.pointer),t);if(0!==e)throw this.error=e,Error("IOWriter error, flush failed")}this.pointer=0}},{key:"seek",value:function(t){if(!this.onSeek)throw this.error=-1048574,Error("IOWriter error, seek failed because of no seek callback");this.flush();var e=this.onSeek(t);if(0!==e)throw this.error=e,Error("IOWriter error, seek failed");this.pos=t}},{key:"seekInline",value:function(t){var e=this.pointer;this.pointer=Math.max(0,Math.min(this.size,t)),this.pos+=BigInt(this.pointer-e)}},{key:"skip",value:function(t){var e=this.pointer;this.pointer=Math.min(this.size,this.pointer+t),this.pos+=BigInt(this.pointer-e)}},{key:"back",value:function(t){var e=this.pointer;this.pointer=Math.max(0,this.pointer-t),this.pos+=BigInt(this.pointer-e)}},{key:"getBuffer",value:function(){return this.buffer.subarray(0,this.pointer)}},{key:"setEndian",value:function(t){this.littleEndian=!t}},{key:"reset",value:function(){this.pointer=0,this.pos=BigInt(0),this.error=0}},{key:"getBufferSize",value:function(){return this.size}}]),t}()},803:(t,e,i)=>{var n=i(16560),r=i(54220);function s(e){return t.exports=s="function"==typeof n&&"symbol"==typeof r?function(t){return typeof t}:function(t){return t&&"function"==typeof n&&t.constructor===n&&t!==n.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,s(e)}t.exports=s,t.exports.__esModule=!0,t.exports.default=t.exports}}]);