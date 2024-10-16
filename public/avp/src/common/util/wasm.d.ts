import { BytesReaderSync, BytesReader, BytesWriter, BytesWriterSync } from '../io/interface';
export declare const enum SectionId {
    Custom = 0,
    Type = 1,
    Import = 2,
    Function = 3,
    Table = 4,
    Memory = 5,
    Global = 6,
    Export = 7,
    Start = 8,
    Element = 9,
    Code = 10,
    Data = 11
}
export declare const enum ExternalKind {
    Function = 0,
    Table = 1,
    Memory = 2,
    Global = 3
}
export declare function readULeb128(reader: BytesReaderSync): number;
export declare function readULeb128Async(reader: BytesReader): Promise<number>;
export declare function readSLeb128(reader: BytesReaderSync): number;
export declare function readSLeb128Async(reader: BytesReader): Promise<number>;
export declare function writeSleb128(writer: BytesWriterSync, value: number): void;
export declare function writeSleb128Async(writer: BytesWriter, value: number): Promise<void>;
export declare function writeUleb128(writer: BytesWriterSync, value: number): void;
export declare function writeUleb128Async(writer: BytesWriter, value: number): Promise<void>;
export declare function setMemoryShared(wasm: Uint8Array, shared: boolean): void;
