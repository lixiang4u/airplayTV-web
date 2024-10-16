import AVFilterNode, { AVFilterNodeOptions } from './AVFilterNode';
import AVFrame from 'avutil/struct/avframe';
export interface RangeFilterNodeOptions extends AVFilterNodeOptions {
    start: int64;
    end: int64;
}
export default class RangeFilterNode extends AVFilterNode {
    options: RangeFilterNodeOptions;
    constructor(options: RangeFilterNodeOptions);
    ready(): Promise<void>;
    destroy(): Promise<void>;
    process(inputs: (pointer<AVFrame> | VideoFrame)[], outputs: (pointer<AVFrame> | VideoFrame)[]): Promise<void>;
}
