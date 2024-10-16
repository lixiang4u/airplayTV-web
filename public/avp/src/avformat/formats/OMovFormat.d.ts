import OFormat from './OFormat';
import AVPacket from 'avutil/struct/avpacket';
import { AVOFormatContext } from '../AVFormatContext';
import { MovFormatOptions } from './mov/type';
import { AVFormat } from '../avformat';
export default class OMovFormat extends OFormat {
    type: AVFormat;
    private context;
    options: MovFormatOptions;
    private annexb2AvccFilter;
    constructor(options?: MovFormatOptions);
    init(formatContext: AVOFormatContext): number;
    destroy(formatContext: AVOFormatContext): void;
    private enableStreams;
    writeHeader(formatContext: AVOFormatContext): number;
    private updateCurrentChunk;
    private checkMdat;
    private updateCurrentFragment;
    private handleEAC3;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
