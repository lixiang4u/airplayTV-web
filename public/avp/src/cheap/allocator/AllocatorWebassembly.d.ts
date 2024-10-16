import Allocator from './Allocator';
export type AllocatorWebassemblyOptions = {
    memory: WebAssembly.Memory;
    instance: WebAssembly.Instance;
    map?: {
        malloc: string;
        calloc: string;
        realloc: string;
        alignedAlloc: string;
        free: string;
    };
};
export default class AllocatorWebassembly implements Allocator {
    onArrayBufferUpdate: (buffer: ArrayBuffer) => void;
    private instance;
    private options;
    constructor(options: AllocatorWebassemblyOptions);
    addUpdateHandle(handle: (buffer: ArrayBuffer) => void): void;
    removeUpdateHandle(handle: (buffer: ArrayBuffer) => void): void;
    /**
     * Allocate a given number of bytes and return the offset.
     * If allocation fails, returns 0.
     */
    malloc(size: size): pointer<void>;
    calloc(num: size, size: size): pointer<void>;
    realloc(address: pointer<void>, size: size): pointer<void>;
    alignedAlloc(alignment: size, size: size): pointer<void>;
    /**
     * Free a number of bytes from the given address.
     */
    free(address: pointer<void>): void;
    isAlloc(pointer: pointer<void>): boolean;
    private call;
    sizeof(address: int32): size;
    onGrow(memory: WebAssembly.Memory): void;
    getBuffer(): ArrayBuffer;
    get asm(): Object;
}
