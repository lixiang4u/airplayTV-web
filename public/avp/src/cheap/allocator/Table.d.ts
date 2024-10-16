interface Node {
    pointer: number;
    length: number;
    free: boolean;
}
export declare const enum BuiltinTableSlot {
    FREE = 1,
    MALLOC = 2,
    CALLOC = 3,
    REALLOC = 4,
    ALIGNED_ALLOC = 5,
    SLOT_NB = 6
}
export declare class WebassemblyTable {
    table: WebAssembly.Table;
    pointer: number;
    private nodes;
    constructor();
    getPointer(): number;
    alloc(count: number): number;
    free(pointer: number): void;
    get<T extends (...args: any[]) => any>(index: pointer<T>): T;
    set<T extends (...args: any[]) => any>(index: number, value: T): void;
    inspect(): Node[];
    private findFree;
    private findNode;
}
export {};
