import AVPacket from 'avutil/struct/avpacket';
import { AVIFormatContext } from '../AVFormatContext';
import IFormat from './IFormat';
import { AVFormat } from '../avformat';
import AVStream from '../AVStream';
export default class IMpegtsFormat extends IFormat {
    type: AVFormat;
    private context;
    private firstTSPacketPos;
    private cacheAVPacket;
    constructor();
    init(formatContext: AVIFormatContext): void;
    destroy(formatContext: AVIFormatContext): void;
    readHeader(formatContext: AVIFormatContext): Promise<number>;
    private checkExtradata;
    private parsePESSlice;
    private readAVPacket_;
    readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): Promise<number>;
    private syncTSPacket;
    seek(formatContext: AVIFormatContext, stream: AVStream, timestamp: int64, flags: int32): Promise<int64>;
    getAnalyzeStreamsCount(): number;
}
