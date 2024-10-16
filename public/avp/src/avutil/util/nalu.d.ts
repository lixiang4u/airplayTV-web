import { Uint8ArrayInterface } from 'common/io/interface';
export declare function isAnnexb(data: Uint8ArrayInterface): boolean;
export declare function getNextNaluStart(data: Uint8ArrayInterface, offset: number): {
    offset: number;
    startCode: number;
};
export declare function splitNaluByStartCode<T extends Uint8ArrayInterface>(buffer: T): T[];
export declare function splitNaluByLength<T extends Uint8ArrayInterface>(buffer: T, naluLengthSizeMinusOne: int32): T[];
export declare function joinNaluByStartCode(nalus: Uint8ArrayInterface[], output?: Uint8Array, slice?: boolean): Uint8Array;
export declare function joinNaluByLength(nalus: Uint8Array[], naluLengthSizeMinusOne: int32, output?: Uint8Array): Uint8Array;
export declare function naluUnescape(data: Uint8Array, start?: number, end?: number): Uint8Array;
export declare function naluEscape(data: Uint8Array, start?: number, end?: number): Uint8Array;
