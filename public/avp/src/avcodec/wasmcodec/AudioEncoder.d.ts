import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVFrame from 'avutil/struct/avframe';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import AVPacket, { AVPacketPool } from 'avutil/struct/avpacket';
import { Rational } from 'avutil/struct/rational';
import { Data } from 'common/types/type';
export type WasmAudioEncoderOptions = {
    resource: WebAssemblyResource;
    onReceiveAVPacket: (avpacket: pointer<AVPacket>) => void;
    onError: (error?: Error) => void;
    avpacketPool?: AVPacketPool;
};
export default class WasmAudioEncoder {
    private options;
    private encoder;
    private parameters;
    private timeBase;
    private avpacket;
    private avframe;
    private pts;
    private frameSize;
    private audioFrameResizer;
    private encoderOptions;
    constructor(options: WasmAudioEncoderOptions);
    private getAVPacket;
    private outputAVPacket;
    private receiveAVPacket;
    open(parameters: pointer<AVCodecParameters>, timeBase: Rational, opts?: Data): Promise<void>;
    private encode_;
    encode(avframe: pointer<AVFrame> | AudioData): int32 | 0;
    flush(): Promise<void>;
    getExtraData(): Uint8Array;
    close(): void;
}
