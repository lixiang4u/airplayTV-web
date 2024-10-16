export default class ASMRunner {
    private runner;
    private wasm;
    constructor(asmBase64: string);
    run(): Promise<void>;
    call(name: string, ...args: (number | bigint)[]): any;
    destroy(): void;
    get exports(): WebAssembly.Exports;
}
