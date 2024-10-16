import AllocatorInterface from './allocator/Allocator';
import { WebassemblyTable } from './allocator/Table';
import { AtomicsBuffer } from './typedef';
/**
 * 线程 id
 */
export declare let ThreadId: number;
export declare let isMainThread: boolean;
/**
 * 线程名
 */
export declare let ThreadName: string;
/**
 * 当前线程的栈顶指针
 */
export declare let StackPointer: WebAssembly.Global;
/**
 * 栈结束位置
 */
export declare let StackTop: int32;
/**
 * 当前线程栈大小
 */
export declare let StackSize: int32;
/**
 * 当前线程的 Table
 */
export declare let Table: WebassemblyTable;
/**
 * 堆分配器
 */
export declare let Allocator: AllocatorInterface;
/**
 * 堆
 */
export declare let Memory: WebAssembly.Memory;
export declare function getHeapU8(): Uint8Array;
export declare function getHeap8(): Int8Array;
export declare function getHeapU16(): Uint16Array;
export declare function getHeap16(): Int16Array;
export declare function getHeapU32(): Uint32Array;
export declare function getHeap32(): Int32Array;
export declare function getHeap64(): BigInt64Array;
export declare function getHeapU64(): BigUint64Array;
export declare function getHeapF32(): Float32Array;
export declare function getHeapF64(): Float64Array;
export declare function getView(): DataView;
export declare function getAtomicsBuffer(type: number): AtomicsBuffer;
export declare function allocThreadId(): number;
/**
 * 子线程初始化
 *
 * @param options
 */
export declare function initThread(options: {
    memory: WebAssembly.Memory;
    stackPointer?: number;
    stackSize?: number;
    name?: string;
    disableAsm?: boolean;
    id?: int32;
}): Promise<void>;
/**
 * 主线程初始化
 */
export declare function initMain(): void;
