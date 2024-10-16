import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVFrame from 'avutil/struct/avframe';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import AVPacket, { AVPacketPool } from 'avutil/struct/avpacket';
import { Rational } from 'avutil/struct/rational';
import { Data } from 'common/types/type';
export type WasmVideoEncoderOptions = {
    resource: WebAssemblyResource;
    onReceiveAVPacket: (avpacket: pointer<AVPacket>) => void;
    onError: (error?: Error) => void;
    avpacketPool?: AVPacketPool;
};
export default class WasmVideoEncoder {
    private options;
    private encoder;
    private parameters;
    private timeBase;
    private avpacket;
    private avframe;
    private encodeQueueSize;
    private framerate;
    private inputCounter;
    private bitrateFilter;
    private extradata;
    private encoderOptions;
    constructor(options: WasmVideoEncoderOptions);
    private getAVPacket;
    private outputAVPacket;
    private receiveAVPacket;
    open(parameters: pointer<AVCodecParameters>, timeBase: Rational, threadCount?: number, opts?: Data): Promise<void>;
    private preEncode;
    private postEncode;
    encodeAsync(frame: pointer<AVFrame> | VideoFrame, key: boolean): Promise<int32 | 0>;
    encode(frame: pointer<AVFrame> | VideoFrame, key: boolean): int32 | 0;
    flush(): Promise<void>;
    getExtraData(): Uint8Array;
    getColorSpace(): {
        colorSpace: int32;
        colorPrimaries: int32;
        colorTrc: int32;
    };
    close(): void;
    getQueueLength(): number;
}
