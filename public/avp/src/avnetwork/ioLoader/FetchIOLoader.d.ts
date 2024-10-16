import IOLoader, { IOLoaderOptions, Range } from './IOLoader';
import { Uint8ArrayInterface } from 'common/io/interface';
export interface FetchInfo {
    url: string;
    headers?: Object;
    withCredentials?: boolean;
    referrerPolicy?: string;
}
export interface FetchIOLoaderOptions extends IOLoaderOptions {
    disableSegment?: boolean;
}
export default class FetchIOLoader extends IOLoader {
    options: FetchIOLoaderOptions;
    private contentLength;
    private receivedLength;
    private info;
    private range;
    private startBytes;
    private endBytes;
    private eofIndex;
    private abortController;
    private reader;
    private buffers;
    constructor(options?: FetchIOLoaderOptions);
    open(info: FetchInfo, range: Range): Promise<void>;
    private openReader;
    private readInterval;
    read(buffer: Uint8ArrayInterface): Promise<int32>;
    seek(pos: int64): Promise<void>;
    size(): Promise<int64 | 0n>;
    abort(): Promise<void>;
    stop(): Promise<void>;
}
