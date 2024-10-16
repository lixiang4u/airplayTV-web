export type AtomicType2Shift<T> = T extends atomic_char ? 0 : T extends atomic_int16 ? 1 : T extends atomic_int32 ? 2 : T extends atomic_int8 ? 0 : T extends atomic_uint8 ? 0 : T extends atomic_uint16 ? 1 : T extends atomic_uint32 ? 2 : T extends atomic_uint64 ? 4 : T extends atomic_int64 ? 4 : T extends atomic_bool ? 0 : never;
type AtomicType2CTypeEnum<T> = T extends atomic_bool ? atomic_int8 : T;
/**
 * 给定的值加到指定位置上
 *
 * 返回该位置的旧值
 *
 */
export declare let add: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 给定的值与指定位置上的值相减
 *
 * 返回该位置的旧值
 *
 */
export declare let sub: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 给定的值与指定位置上的值进行与运算
 *
 * 返回该位置的旧值
 *
 */
export declare let and: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 给定的值与指定位置上的值进行或运算
 *
 * 返回该位置的旧值
 *
 */
export declare let or: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 给定的值与指定位置上的值进行异或运算
 *
 * 返回该位置的旧值
 *
 */
export declare let xor: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 给定的值存在给定位置上
 *
 * 返回该位置的旧值
 *
 */
export declare let store: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 读取给定位置上的值
 *
 * 返回该位置的旧值
 *
 */
export declare let load: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>) => AtomicType2Type<T>;
/**
 * 如果指定位置的值与给定的值相等，则将其更新为新的值，并返回该元素原先的值
 *
 * 返回该位置的旧值
 *
 */
export declare let compareExchange: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, expectedValue: AtomicType2Type<T>, replacementValue: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 将指定位置的值更新为给定的值，并返回该元素更新前的值。
 *
 * 返回该位置的旧值
 *
 */
export declare let exchange: <T extends atomictype, args = [AtomicType2CTypeEnum<T>, AtomicType2Shift<T>]>(address: pointer<T>, value: AtomicType2Type<T>) => AtomicType2Type<T>;
/**
 * 唤醒等待队列中正在指定位置上等待的线程。返回值为成功唤醒的线程数量。
 *
 * 返回被唤醒的代理的数量 0 将不会唤醒任何线程
 *
 */
export declare let notify: (address: pointer<atomic_int32>, count: uint32) => uint32;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 0 "ok"、1 "not-equal"
 *
 */
export declare let wait: (address: pointer<atomic_int32>, value: int32) => 0 | 1 | 2;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时（毫秒）
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
export declare let waitTimeout: (address: pointer<atomic_int32>, value: int32, timeout: int32) => 0 | 1 | 2;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒
 *
 * 异步非阻塞，适合在主线程上使用
 *
 * 0 "ok"、1 "not-equal"
 *
 */
export declare let waitAsync: (address: pointer<atomic_int32>, value: int32) => Promise<0 | 1 | 2>;
/**
 * 检测指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时
 *
 * 异步非阻塞，适合在主线程上使用
 *
 * 0 "ok"、1 "not-equal" 或 2 "time-out"
 *
 */
export declare let waitTimeoutAsync: (address: pointer<atomic_int32>, value: int32, timeout: int32) => Promise<0 | 1 | 2>;
export declare function override(funcs: Partial<{
    add: typeof add;
    sub: typeof sub;
    and: typeof and;
    or: typeof or;
    xor: typeof xor;
    store: typeof store;
    load: typeof load;
    compareExchange: typeof compareExchange;
    exchange: typeof exchange;
    notify: typeof notify;
    wait: typeof wait;
    waitTimeout: typeof waitTimeout;
    waitAsync: typeof waitAsync;
    waitTimeoutAsync: typeof waitTimeoutAsync;
}>): void;
export {};
