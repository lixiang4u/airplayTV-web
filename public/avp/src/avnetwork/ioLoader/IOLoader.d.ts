import { Uint8ArrayInterface } from 'common/io/interface';
import { Data, Timeout } from 'common/types/type';
export interface Range {
    from: number;
    to: number;
}
export declare const enum IOLoaderStatus {
    IDLE = 0,
    CONNECTING = 1,
    BUFFERING = 2,
    ERROR = 3,
    COMPLETE = 4
}
export interface IOLoaderVideoStreamInfo {
    list: {
        width: number;
        height: number;
        frameRate: number;
        codecs: string;
    }[];
    selectedIndex: number;
}
export interface IOLoaderAudioStreamInfo {
    list: {
        lang: string;
        codecs: string;
    }[];
    selectedIndex: number;
}
export interface IOLoaderSubtitleStreamInfo {
    list: {
        lang: string;
        codecs: string;
    }[];
    selectedIndex: number;
}
export type IOLoaderOptions = {
    isLive?: boolean;
    preload?: number;
    retryCount?: number;
    retryInterval?: number;
};
export default abstract class IOLoader {
    options: IOLoaderOptions;
    protected status: IOLoaderStatus;
    protected retryCount: number;
    protected retryTimeout: Timeout;
    constructor(options?: IOLoaderOptions);
    abstract open(info: Data, range: Range): Promise<any>;
    abstract read(buffer: Uint8ArrayInterface, options?: Data): Promise<int32>;
    abstract seek(pos: int64, options?: Data): Promise<any>;
    abstract size(): Promise<int64>;
    abstract abort(): Promise<any>;
    abstract stop(): Promise<any>;
}
