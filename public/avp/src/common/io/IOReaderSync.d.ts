/**
 * 读字节流工具
 */
import IOWriter from './IOWriterSync';
import { Uint8ArrayInterface, BytesReaderSync } from './interface';
export default class IOReaderSync implements BytesReaderSync {
    private data;
    private buffer;
    private pointer;
    private endPointer;
    private pos;
    private size;
    private littleEndian;
    private fileSize_;
    error: number;
    onFlush: (buffer: Uint8Array) => number;
    onSeek: (seek: bigint) => number;
    onSize: () => bigint;
    flags: number;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size?: number, bigEndian?: boolean, map?: Uint8ArrayInterface);
    /**
     * 读取 8 位无符号整数
     *
     * @returns
     */
    readUint8(): number;
    peekUint8(): number;
    /**
     * 读取 16 位无符号整数
     *
     * @returns
     */
    readUint16(): number;
    peekUint16(): number;
    /**
     * 读取 24 位无符号整数
     *
     * @returns
     */
    readUint24(): number;
    peekUint24(): number;
    /**
     * 读取 32 位无符号整数
     *
     * @returns
     */
    readUint32(): number;
    peekUint32(): number;
    /**
     * 读取 64 位无符号整数
     *
     * @returns
     */
    readUint64(): bigint;
    peekUint64(): bigint;
    /**
     * 读取 8 位有符号整数
     *
     * @returns
     */
    readInt8(): number;
    peekInt8(): number;
    /**
     * 读取 16 位有符号整数
     *
     * @returns
     */
    readInt16(): number;
    peekInt16(): number;
    /**
     * 读取 32 位有符号整数
     *
     * @returns
     */
    readInt32(): number;
    peekInt32(): number;
    /**
     * 读取 64 位有符号整数
     *
     * @returns
     */
    readInt64(): bigint;
    peekInt64(): bigint;
    /**
     * 读取单精度浮点数
     *
     * @returns
     */
    readFloat(): number;
    peekFloat(): number;
    /**
     * 读取双精度浮点数
     *
     * @returns
     */
    readDouble(): number;
    peekDouble(): number;
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回
     *
     * @param length 默认 1
     * @returns
     */
    readHex(length?: number): string;
    peekHex(length?: number): string;
    /**
     * 读取指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    readBuffer(length: number): Uint8Array;
    readBuffer<T extends Uint8ArrayInterface>(length: number, buffer: T): T;
    peekBuffer(length: number): Uint8Array;
    peekBuffer<T extends Uint8ArrayInterface>(length: number, buffer: T): T;
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
    readString(length?: number): string;
    peekString(length?: number): string;
    /**
     * 读取一行字符
     */
    readLine(): string;
    peekLine(): string;
    /**
     * 获取当前读取指针
     *
     * @returns
     */
    getPointer(): number;
    /**
     * 获取已读字节偏移
     *
     * @returns
     */
    getPos(): bigint;
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    skip(length: number): void;
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength(): number;
    flush(need?: number): void;
    seek(pos: bigint, force?: boolean, flush?: boolean): void;
    getBuffer(): Uint8ArrayInterface;
    appendBuffer(buffer: Uint8ArrayInterface): void;
    reset(): void;
    setEndian(bigEndian: boolean): void;
    fileSize(): bigint;
    getBufferSize(): number;
    pipe(ioWriter: IOWriter, length?: number): void;
}
