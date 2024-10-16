import { TypeArrayConstructor, TypeArray } from '../types/type';
export default class RingBuffer<T extends TypeArray> {
    private size;
    private length;
    private valid;
    private tail;
    private data;
    private pos;
    private constructorFunction;
    constructor(size: number, constructor: TypeArrayConstructor);
    write(data: T): void;
    read(length: number): T;
    readByRange(start: number, end: number): T;
    getCurrentPointer(): number;
    readByte(): number;
    getByteByIndex(index: number): number;
    getSize(): number;
    getLength(): number;
    getPos(): number;
    getRemainingSize(): number;
    back(length: number): void;
    skip(length: number): void;
    clear(): void;
}
