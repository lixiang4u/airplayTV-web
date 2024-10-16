import { AVOFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import OFormat from './OFormat';
import { AVFormat } from '../avformat';
export interface OMatroskaFormatOptions {
    isLive?: boolean;
    docType?: string;
}
export default class OMatroskaFormat extends OFormat {
    type: AVFormat;
    private options;
    private context;
    private random;
    private randomView;
    constructor(options?: OMatroskaFormatOptions);
    init(formatContext: AVOFormatContext): number;
    writeHeader(formatContext: AVOFormatContext): number;
    private writeBlock;
    private writeCluster;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
