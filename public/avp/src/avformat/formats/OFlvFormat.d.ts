import OFormat from './OFormat';
import FlvHeader from './flv/FlvHeader';
import FlvScriptTag from './flv/FlvScriptTag';
import AVPacket from 'avutil/struct/avpacket';
import { AVOFormatContext } from '../AVFormatContext';
import { AVFormat } from '../avformat';
export interface FlvFormatOptions {
    hasKeyframes?: boolean;
    live?: boolean;
}
export default class OFlvFormat extends OFormat {
    type: AVFormat;
    private context;
    header: FlvHeader;
    script: FlvScriptTag;
    options: FlvFormatOptions;
    private annexb2AvccFilter;
    constructor(options?: FlvFormatOptions);
    init(formatContext: AVOFormatContext): number;
    destroy(formatContext: AVOFormatContext): void;
    writeHeader(formatContext: AVOFormatContext): number;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(context: AVOFormatContext): number;
}
