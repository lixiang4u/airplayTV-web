import Stream from '../../../AVStream';
import AVPacket from 'avutil/struct/avpacket';
import { PES } from '../struct';
export default function parsePES(pes: PES, avpacket: pointer<AVPacket>, stream: Stream): void;
