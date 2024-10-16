/**
 * WebAssembly runtime 实例
 */
export declare let wasmThreadProxy: WebAssembly.Instance;
export declare function isSupport(): boolean;
export declare function init(memory: WebAssembly.Memory): Promise<void>;
