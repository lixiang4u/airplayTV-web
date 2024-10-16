import { Uint8ArrayInterface } from 'common/io/interface';
import ArrayLikeInterface from 'common/interface/ArrayLike';
export declare class SafeBufferView {
    private pointer;
    private len;
    constructor(pointer: pointer<uint8>, len: size);
    get byteLength(): int32;
    get buffer(): ArrayBufferLike;
    get byteOffset(): pointer<uint8>;
    getFloat32(byteOffset: number, littleEndian?: boolean): number;
    getFloat64(byteOffset: number, littleEndian?: boolean): number;
    getInt8(byteOffset: number): number;
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    getInt32(byteOffset: number, littleEndian?: boolean): number;
    getUint8(byteOffset: number): number;
    getUint16(byteOffset: number, littleEndian?: boolean): number;
    getUint32(byteOffset: number, littleEndian?: boolean): number;
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
    setInt8(byteOffset: number, value: number): void;
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUint8(byteOffset: number, value: number): void;
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
}
export default class SafeUint8Array extends ArrayLikeInterface implements Uint8ArrayInterface {
    private pointer;
    private len;
    constructor(pointer: pointer<uint8>, len: size);
    protected getIndexValue(index: uint32): uint8;
    protected setIndexValue(index: uint32, value: uint8): void;
    set(array: ArrayLike<number>, offset?: number): void;
    subarray(begin?: number, end?: number, safe?: boolean): Uint8Array;
    slice(start?: number, end?: number): Uint8Array;
    get length(): int32;
    get byteLength(): int32;
    get buffer(): ArrayBufferLike;
    get byteOffset(): pointer<uint8>;
    get view(): DataView;
    [n: int32]: uint8;
}
