import { AVIFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import IFormat from './IFormat';
import { AVFormat } from '../avformat';
import AVStream from '../AVStream';
export declare const enum IVFCodec {
    VP8 = "VP80",
    VP9 = "VP90"
}
export declare class IVFHeader {
    version: number;
    length: number;
    codec: IVFCodec;
    width: number;
    height: number;
    denominator: number;
    numerator: number;
    framesCount: number;
    constructor();
}
export default class IIVFFormat extends IFormat {
    type: AVFormat;
    header: IVFHeader;
    constructor();
    init(formatContext: AVIFormatContext): void;
    readHeader(formatContext: AVIFormatContext): Promise<number>;
    readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): Promise<number>;
    seek(formatContext: AVIFormatContext, stream: AVStream, timestamp: int64, flags: int32): Promise<int64>;
    getAnalyzeStreamsCount(): number;
}
