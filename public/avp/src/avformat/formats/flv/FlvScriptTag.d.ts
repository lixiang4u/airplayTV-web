import IOReader from 'common/io/IOReader';
import IOWriterSync from 'common/io/IOWriterSync';
import { FlvMetaData } from './type';
export default class FlvScriptTag {
    onMetaData: Partial<FlvMetaData>;
    constructor();
    private parseObject;
    private parseValue;
    read(ioReader: IOReader, size: number): Promise<0 | -2>;
    private writeValue;
    computeSize(): number;
    write(ioWriter: IOWriterSync): void;
    dts2Position(dts: number): {
        pos: number;
        dts: number;
    };
    position2DTS(pos: number): number;
    canSeek(): boolean;
}
