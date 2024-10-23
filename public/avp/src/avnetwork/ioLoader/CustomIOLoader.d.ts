import { Uint8ArrayInterface } from 'common/io/interface';
import { Data } from 'common/types/type';
export default abstract class CustomIOLoader {
    constructor();
    /**
     * 源扩展名，若无法自动分析出源的格式需要使用此数据获取默认的格式
     */
    get ext(): string;
    /**
     * 源的名字，主要用于日志打印，可不传
     */
    get name(): string;
    /**
     * 最小缓冲时长默认 4（秒）
     *
     * 开启 jitter buffer 需要
     */
    get minBuffer(): number;
    /**
     * 打开 ioloader
     *
     * @param info
     * @param range
     *
     * @returns 成功返回 0, 失败返回错误码（负值）
     */
    abstract open(): Promise<int32>;
    /**
     * 读取数据到缓冲区
     *
     * @param buffer 可以放置数据的缓冲区，类 Uint8Array 结构
     * @param options 一些配置（比如 hls 和 dash 有相关配置项）
     *
     * @returns 返回写入的数据长度，失败返回错误码（负值）
     */
    abstract read(buffer: Uint8ArrayInterface, options?: Data): Promise<int32>;
    /**
     * seek 到指定位置
     *
     * @param pos 位置
     * @param options 一些配置（比如 hls 和 dash 有相关配置项）
     *
     * @returns 成功返回 0, 否则失败，可以返回错误码（负值）
     */
    abstract seek(pos: int64, options?: Data): Promise<int32>;
    /**
     * 数据总字节大小
     *
     * 没有返回 0n
     */
    abstract size(): Promise<int64>;
    /**
     * 停止 ioloader
     */
    abstract stop(): Promise<void>;
}
