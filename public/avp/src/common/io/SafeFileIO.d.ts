import FileIO from './FileIO';
export default class SafeFileIO extends FileIO {
    private commandQueue;
    constructor(handler: FileHandle, append?: boolean);
    write(data: ArrayBuffer | ArrayBufferView): Promise<void>;
    seek(position: number): Promise<void>;
    seekToEnd(): Promise<void>;
    resize(size: number): Promise<void>;
    read(start: number, end: number): Promise<ArrayBuffer>;
    appendBufferByPosition(buffer: ArrayBuffer | Uint8Array, position: number): Promise<void>;
    close(): Promise<void>;
    destroy(): Promise<void>;
    get writeQueueSize(): number;
}
