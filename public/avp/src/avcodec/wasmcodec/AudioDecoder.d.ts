import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVPacket from 'avutil/struct/avpacket';
import AVFrame, { AVFramePool } from 'avutil/struct/avframe';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import { Data } from 'common/types/type';
export type WasmAudioDecoderOptions = {
    resource: WebAssemblyResource;
    onReceiveFrame: (frame: pointer<AVFrame>) => void;
    onError: (error?: Error) => void;
    avframePool?: AVFramePool;
};
export default class WasmAudioDecoder {
    private options;
    private decoder;
    private frame;
    private decoderOptions;
    constructor(options: WasmAudioDecoderOptions);
    private getAVFrame;
    private outputAVFrame;
    private receiveAVFrame;
    open(parameters: pointer<AVCodecParameters>, opts?: Data): Promise<void>;
    decode(avpacket: pointer<AVPacket>): int32 | 0;
    flush(): Promise<void>;
    close(): void;
}
