/**
 * oggs vorbis IDPage 和 commentPage
 *
 * https://datatracker.ietf.org/doc/html/rfc7845
 */
import IOWriter from 'common/io/IOWriterSync';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { PagePayload } from './OggPage';
import IOReaderSync from 'common/io/IOReaderSync';
export declare class VorbisOggsIdPage implements PagePayload {
    streamIndex: number;
    /**
     * 8 bits packet_type
     */
    packetType: number;
    /**
     * 6 bytes Magic Signature: vorbis
     */
    signature: string;
    /**
     * 4 bytes unsigned, 对应值 0x01
     */
    version: number;
    /**
     * 1 bytes unsigned, 声道数
     */
    channels: number;
    /**
     * 4 bytes unsigned, 原始输入采样率
     */
    sampleRate: number;
    /**
     * 4 bytes
     */
    bitrateMaximum: number;
    /**
     * 4 bytes
     */
    bitrateNominal: number;
    /**
     * 4 bytes
     */
    bitrateMinimum: number;
    /**
     * 4 bits
     */
    blocksize0: number;
    /**
     * 4 bits
     */
    blocksize1: number;
    /**
     * 1 bit
     */
    framingFlag: number;
    constructor();
    read(ioReader: IOReaderSync): void;
    write(ioWriter: IOWriter): void;
    setCodec(codecpar: AVCodecParameters): void;
}
declare class UserComment {
    list: string[];
    constructor();
    read(ioReader: IOReaderSync, count: number): void;
    write(ioWriter: IOWriter): void;
    addComment(comment: string): void;
}
export declare class VorbisOggsCommentPage implements PagePayload {
    streamIndex: number;
    /**
     * 8 bits packet_type
     */
    packetType: number;
    /**
     * 8 bytes Magic Signature: OpusTags
     */
    signature: string;
    /**
     * 4 bytes unsigned
     */
    vendorStringLength: number;
    /**
     * 长度由 Vendor String Length 指定， utf-8 编码
     */
    vendorString: string;
    /**
     * 4 bytes unsigned, 该字段指示用户提供的注释数。它可能表示用户提供的评论为零，在这种情况下数据包中没有其他字段。
     * 一定不要表示评论太多，以至于评论字符串长度将需要比其余的可用数据更多的数据数据包
     */
    userCommentListLength: number;
    comments: UserComment;
    /**
     * 1 bit
     */
    framingFlag: number;
    constructor();
    read(ioReader: IOReaderSync): void;
    write(ioWriter: IOWriter): void;
    addComment(comment: string): void;
    setCodec(codecpar: AVCodecParameters): void;
}
export {};
