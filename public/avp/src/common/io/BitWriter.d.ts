/**
 * bit 写存器
 */
/**
 * 写字节流工具
 */
export default class BitWriter {
    private buffer;
    private pointer;
    private bitPointer;
    private size;
    error: number;
    onFlush: (data: Uint8Array, pos?: number) => number;
    /**
     * @param data 待写的 Uint8Array
     */
    constructor(size?: number);
    /**
     * 写一个 bit
     *
     * @param bit
     */
    writeU1(bit: number): void;
    /**
     * 写 n 个比特
     *
     * @param n
     */
    writeU(n: number, v: number): void;
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength(): number;
    flush(): void;
    padding(): void;
    clear(): void;
    getBuffer(): Uint8Array;
    getPointer(): number;
}
