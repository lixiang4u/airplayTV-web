import { AVCodecID, AVMediaType } from 'avutil/codec';
import AVStream, { AVStreamInterface } from './AVStream';
import AVPacket from 'avutil/struct/avpacket';
import OFormat from './formats/OFormat';
import IFormat from './formats/IFormat';
import IOWriter from 'common/io/IOWriterSync';
import IOReader from 'common/io/IOReader';
import IOReaderSync from 'common/io/IOReaderSync';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import { AVFormat } from './avformat';
import { Rational } from 'avutil/struct/rational';
export interface AVChapter {
    /**
     * 章节 id
     */
    id: uint64;
    /**
     * 时间基
     */
    timeBase: Rational;
    /**
     * 开始时间
     */
    start: int64;
    /**
     * 结束时间
     */
    end: int64;
    /**
     * 元数据
     */
    metadata: Record<string, any>;
}
declare class AVFormatContextInterval {
    packetBuffer: pointer<AVPacket>[];
    constructor();
}
export interface AVIFormatContext {
    metadata: Record<string, any>;
    streams: AVStream[];
    options: Record<string, any>;
    chapters: AVChapter[];
    privateData: Record<string, any>;
    format: AVFormat;
    iformat: IFormat;
    ioReader: IOReader;
    errorFlag: number;
    interval: AVFormatContextInterval;
    streamIndex: number;
    getStreamById(id: number): AVStream;
    getStreamByIndex(index: number): AVStream;
    getStreamByMediaType(mediaType: AVMediaType): AVStream;
    createStream(): AVStream;
    addStream(stream: AVStream): void;
    removeStream(stream: AVStream): void;
    removeStreamById(id: number): void;
    removeStreamByIndex(index: number): void;
    destroy(): void;
    getDecoderResource: (mediaType: AVMediaType, codecId: AVCodecID) => Promise<WebAssemblyResource> | WebAssemblyResource;
}
export interface AVOFormatContext {
    metadataHeaderPadding: int32;
    metadata: Record<string, any>;
    streams: AVStream[];
    options: Record<string, any>;
    chapters: AVChapter[];
    privateData: Record<string, any>;
    processPrivateData: Record<string, any>;
    format: AVFormat;
    oformat: OFormat;
    ioWriter: IOWriter;
    errorFlag: number;
    interval: AVFormatContextInterval;
    streamIndex: number;
    getStreamById(id: number): AVStream;
    getStreamByIndex(index: number): AVStream;
    getStreamByMediaType(mediaType: AVMediaType): AVStream;
    createStream(): AVStream;
    addStream(stream: AVStream): void;
    removeStream(stream: AVStream): void;
    removeStreamById(id: number): void;
    removeStreamByIndex(index: number): void;
    destroy(): void;
}
export interface AVFormatContextInterface {
    metadata: Record<string, any>;
    format: AVFormat;
    streams: AVStreamInterface[];
    chapters: AVChapter[];
}
export declare class AVFormatContext implements AVIFormatContext, AVOFormatContext {
    metadataHeaderPadding: number;
    metadata: Record<string, any>;
    streams: AVStream[];
    options: Record<string, any>;
    chapters: AVChapter[];
    privateData: Record<string, any>;
    processPrivateData: Record<string, any>;
    iformat: IFormat;
    oformat: OFormat;
    ioReader: IOReader | IOReaderSync;
    ioWriter: IOWriter;
    errorFlag: number;
    interval: AVFormatContextInterval;
    streamIndex: number;
    getDecoderResource: (mediaType: AVMediaType, codecId: AVCodecID) => Promise<WebAssemblyResource> | WebAssemblyResource;
    constructor();
    get format(): AVFormat;
    getStreamById(id: number): AVStream;
    getStreamByIndex(index: number): AVStream;
    getStreamByMediaType(mediaType: AVMediaType): AVStream;
    createStream(): AVStream;
    addStream(stream: AVStream): void;
    removeStream(stream: AVStream): void;
    removeStreamById(id: number): void;
    removeStreamByIndex(i: number): void;
    destroy(): void;
}
/**
 * 创建 AVIFormatContext
 *
 * @returns
 */
export declare function createAVIFormatContext(): AVIFormatContext;
/**
 * 创建 AVOFormatContext
 *
 * @returns
 */
export declare function createAVOFormatContext(): AVOFormatContext;
export {};
