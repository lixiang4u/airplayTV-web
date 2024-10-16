import { AVOFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import OFormat from './OFormat';
import { PagePayload } from './oggs/OggPage';
import { AVFormat } from '../avformat';
export default class OOggFormat extends OFormat {
    type: AVFormat;
    private checksumTable;
    headerPagesPayload: PagePayload[];
    private cacheWriter;
    private page;
    constructor();
    private initChecksumTab;
    private getChecksum;
    init(formatContext: AVOFormatContext): number;
    private writePage;
    writeHeader(formatContext: AVOFormatContext): number;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
