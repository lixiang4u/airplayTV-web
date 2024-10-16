/**
 * 读字节流工具
 */
import IOWriter from './IOWriter';
import { Uint8ArrayInterface, BytesReader } from './interface';
export default class IOReader implements BytesReader {
    private data;
    private buffer;
    private pointer;
    private endPointer;
    private pos;
    private size;
    private littleEndian;
    private fileSize_;
    error: number;
    onFlush: (buffer: Uint8Array) => Promise<number> | number;
    onSeek: (seek: bigint) => Promise<number> | number;
    onSize: () => Promise<bigint> | bigint;
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
    readUint8(): Promise<number>;
    peekUint8(): Promise<number>;
    /**
     * 读取 16 位无符号整数
     *
     * @returns
     */
    readUint16(): Promise<number>;
    peekUint16(): Promise<number>;
    /**
     * 读取 24 位无符号整数
     *
     * @returns
     */
    readUint24(): Promise<number>;
    peekUint24(): Promise<number>;
    /**
     * 读取 32 位无符号整数
     *
     * @returns
     */
    readUint32(): Promise<number>;
    peekUint32(): Promise<number>;
    /**
     * 读取 64 位无符号整数
     *
     * @returns
     */
    readUint64(): Promise<bigint>;
    peekUint64(): Promise<bigint>;
    /**
     * 读取 8 位有符号整数
     *
     * @returns
     */
    readInt8(): Promise<number>;
    peekInt8(): Promise<number>;
    /**
     * 读取 16 位有符号整数
     *
     * @returns
     */
    readInt16(): Promise<number>;
    peekInt16(): Promise<number>;
    /**
     * 读取 32 位有符号整数
     *
     * @returns
     */
    readInt32(): Promise<number>;
    peekInt32(): Promise<number>;
    /**
     * 读取 64 位有符号整数
     *
     * @returns
     */
    readInt64(): Promise<bigint>;
    peekInt64(): Promise<bigint>;
    /**
     * 读取单精度浮点数
     *
     * @returns
     */
    readFloat(): Promise<number>;
    peekFloat(): Promise<number>;
    /**
     * 读取双精度浮点数
     *
     * @returns
     */
    readDouble(): Promise<number>;
    peekDouble(): Promise<number>;
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回
     *
     * @param length 默认 1
     * @returns
     */
    readHex(length?: number): Promise<string>;
    peekHex(length?: number): Promise<string>;
    /**
     * 读取指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    readBuffer(length: number): Promise<Uint8Array>;
    readBuffer<T extends Uint8ArrayInterface>(length: number, buffer: T): Promise<T>;
    readToBuffer(length: number, buffer: Uint8ArrayInterface): Promise<number>;
    peekBuffer(length: number): Promise<Uint8Array>;
    peekBuffer<T extends Uint8ArrayInterface>(length: number, buffer: T): Promise<T>;
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
    readString(length?: number): Promise<string>;
    peekString(length?: number): Promise<string>;
    /**
     * 读取一行字符
     */
    readLine(): Promise<string>;
    peekLine(): Promise<string>;
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
    skip(length: number): Promise<void>;
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength(): number;
    private flush_;
    flush(need?: number): Promise<void>;
    seek(pos: bigint, force?: boolean, flush?: boolean): Promise<void>;
    getBuffer(): Uint8ArrayInterface;
    appendBuffer(buffer: Uint8Array): void;
    reset(): void;
    setEndian(bigEndian: boolean): void;
    fileSize(): Promise<bigint>;
    getBufferSize(): number;
    pipe(ioWriter: IOWriter, length?: number): Promise<void>;
}
