import { AVIFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import IFormat from './IFormat';
import { AVFormat } from '../avformat';
import AVStream from '../AVStream';
export default class IMp3Format extends IFormat {
    type: AVFormat;
    private context;
    constructor();
    init(formatContext: AVIFormatContext): void;
    readHeader(formatContext: AVIFormatContext): Promise<number>;
    readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): Promise<number>;
    private syncToFrame;
    seek(formatContext: AVIFormatContext, stream: AVStream, timestamp: int64, flags: int32): Promise<int64>;
    getAnalyzeStreamsCount(): number;
}
