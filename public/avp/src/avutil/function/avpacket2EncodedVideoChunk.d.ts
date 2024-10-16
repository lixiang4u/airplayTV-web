import AVPacket from '../struct/avpacket';
export default function avpacket2EncodedVideoChunk(avpacket: pointer<AVPacket>, pts?: int64): EncodedVideoChunk;
