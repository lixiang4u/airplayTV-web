/**
 * bit 读取器
 */
import { Uint8ArrayInterface } from './interface';
export default class BitReader {
    private buffer;
    private pointer;
    private bitsLeft;
    private size;
    private endPointer;
    error: number;
    onFlush: (data: Uint8Array) => number;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size?: number);
    /**
     * 不影响原读取操作的情况下，读取 1 个比特
     */
    peekU1(): number;
    /**
     * 读取 1 个比特
     */
    readU1(): number;
    /**
     * 读取 n 个比特
     *
     * @param n
     */
    readU(n: number): number;
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength(): number;
    getPos(): number;
    skip(n: number): void;
    flush(): void;
    getBuffer(): Uint8Array;
    appendBuffer(buffer: Uint8ArrayInterface): void;
    clear(): void;
    skipPadding(): void;
}
