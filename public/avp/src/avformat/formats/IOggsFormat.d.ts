import AVStream from '../AVStream';
import { AVIFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import { PagePayload } from './oggs/OggPage';
import IFormat from './IFormat';
import { AVFormat } from '../avformat';
export default class IOggFormat extends IFormat {
    type: AVFormat;
    headerPagesPayload: PagePayload[];
    private page;
    private curSegIndex;
    private curSegStart;
    private segCount;
    private segIndex;
    private currentPts;
    private firstPos;
    private firstGranulePosition;
    constructor();
    init(formatContext: AVIFormatContext): void;
    private estimateTotalBlock;
    private getNextSegment;
    readHeader(formatContext: AVIFormatContext): Promise<number>;
    readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): Promise<number>;
    private syncPage;
    seek(formatContext: AVIFormatContext, stream: AVStream, timestamp: int64, flags: int32): Promise<int64>;
    getAnalyzeStreamsCount(): number;
}