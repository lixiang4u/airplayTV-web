/**
 * WebAssembly runtime 实例
 */
export declare let instance: WebAssembly.Instance;
export declare function support(): boolean;
export default function init(memory: WebAssembly.Memory): Promise<void>;
