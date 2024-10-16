import { AVFormatContextInterface, AVIFormatContext, AVOFormatContext } from './AVFormatContext';
import { AVCodecID, AVMediaType } from 'avutil/codec';
import { AVFormat } from './avformat';
export interface DumpIOInfo {
    from: string;
    tag: 'Input' | 'Output';
}
export declare function dumpTime(time: int64): string;
export declare function dumpInt64(v: int64): string;
export declare function dumpBitrate(v: int64): string;
export declare function dumpKey<T>(obj: Record<string, T>, value: T, defaultValue?: string): string;
export declare function dumpCodecName(codecType: AVMediaType, codecId: AVCodecID): string;
export declare function dumpFormatName(format: AVFormat): string;
export default function dump(formatContexts: (AVFormatContextInterface | AVIFormatContext | AVOFormatContext)[], inputs: DumpIOInfo[]): string;
