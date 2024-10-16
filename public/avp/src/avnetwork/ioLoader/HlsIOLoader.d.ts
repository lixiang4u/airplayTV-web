import IOLoader, { IOLoaderVideoStreamInfo, Range } from './IOLoader';
import { Uint8ArrayInterface } from 'common/io/interface';
export interface FetchInfo {
    url: string;
    headers?: Object;
    withCredentials?: boolean;
    referrerPolicy?: string;
}
export default class HlsIOLoader extends IOLoader {
    private info;
    private range;
    private masterPlaylist;
    private mediaPlayList;
    private mediaPlayListIndex;
    private fetchedMap;
    private fetchedHistoryList;
    private mediaListUrl;
    private segmentIndex;
    private currentUri;
    private loader;
    private minBuffer;
    private keyMap;
    private currentIV;
    private currentKey;
    private aesDecryptPipe;
    private initLoaded;
    private fetchMasterPlayList;
    private fetchMediaPlayList;
    open(info: FetchInfo, range: Range): Promise<void>;
    private checkNeedDecrypt;
    read(buffer: Uint8ArrayInterface): Promise<number>;
    seek(timestamp: int64): Promise<void>;
    size(): Promise<bigint>;
    abort(): Promise<void>;
    stop(): Promise<void>;
    getDuration(): number;
    getVideoList(): IOLoaderVideoStreamInfo;
    selectVideo(index: number): void;
    getMinBuffer(): number;
}
