import IOLoader, { Range } from './IOLoader';
import { Uint8ArrayInterface } from 'common/io/interface';
export interface FileInfo {
    file: File;
}
export default class FileIOLoader extends IOLoader {
    private info;
    private range;
    private readPos;
    private endPos;
    private reader;
    private readerResolve;
    open(info: FileInfo, range: Range): Promise<number>;
    private readBufferByReader;
    read(buffer: Uint8ArrayInterface): Promise<number>;
    seek(pos: int64): Promise<number>;
    size(): Promise<int64>;
    stop(): Promise<void>;
}
