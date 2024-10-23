import { PCMParameters } from 'audioresample/Resampler';
import AVFilterNode, { AVFilterNodeOptions } from '../AVFilterNode';
import AVFrame from 'avutil/struct/avframe';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
export interface ResampleFilterNodeOptions extends AVFilterNodeOptions {
    resource: WebAssemblyResource | ArrayBuffer;
    output: PCMParameters;
}
export default class ResampleFilterNode extends AVFilterNode {
    options: ResampleFilterNodeOptions;
    private resampler;
    private pcm;
    constructor(options: ResampleFilterNodeOptions);
    ready(): Promise<void>;
    destroy(): Promise<void>;
    process(inputs: (pointer<AVFrame> | VideoFrame)[], outputs: (pointer<AVFrame> | VideoFrame)[]): Promise<void>;
}
