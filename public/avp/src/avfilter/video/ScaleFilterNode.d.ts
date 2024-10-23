import AVFilterNode, { AVFilterNodeOptions } from '../AVFilterNode';
import AVFrame from 'avutil/struct/avframe';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import { ScaleParameters } from 'videoscale/VideoScaler';
export interface ScaleFilterNodeOptions extends AVFilterNodeOptions {
    resource: WebAssemblyResource | ArrayBuffer;
    output: ScaleParameters;
}
export default class ScaleFilterNode extends AVFilterNode {
    options: ScaleFilterNodeOptions;
    private scaler;
    constructor(options: ScaleFilterNodeOptions);
    ready(): Promise<void>;
    destroy(): Promise<void>;
    process(inputs: (pointer<AVFrame> | VideoFrame)[], outputs: (pointer<AVFrame> | VideoFrame)[]): Promise<void>;
}
