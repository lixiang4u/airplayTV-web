import AVPacket from '../struct/avpacket';
export default function avpacket2EncodedAudioChunk(avpacket: pointer<AVPacket>, pts?: int64): EncodedAudioChunk;
