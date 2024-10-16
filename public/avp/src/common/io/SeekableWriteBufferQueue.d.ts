export default class SeekableWriteBufferQueue {
    private queue;
    private pos;
    private startPos;
    private endPos;
    private index;
    private offset;
    constructor();
    push(buffer: Uint8Array): void;
    seek(pos: bigint): boolean;
    flush(): Uint8Array;
    get size(): number;
}
