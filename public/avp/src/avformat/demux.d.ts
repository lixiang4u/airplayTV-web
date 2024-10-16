import AVPacket from 'avutil/struct/avpacket';
import { AVIFormatContext } from './AVFormatContext';
export interface DemuxOptions {
    fastOpen?: boolean;
    maxAnalyzeDuration?: number;
}
export declare const DefaultDemuxOptions: {
    fastOpen: boolean;
    maxAnalyzeDuration: number;
};
export declare function open(formatContext: AVIFormatContext, options?: DemuxOptions): Promise<number>;
export declare function analyzeStreams(formatContext: AVIFormatContext): Promise<number>;
export declare function readAVPacket(formatContext: AVIFormatContext, avpacket: pointer<AVPacket>): any;
export declare function seek(formatContext: AVIFormatContext, streamIndex: number, timestamp: int64, flags: int32): Promise<int64>;
