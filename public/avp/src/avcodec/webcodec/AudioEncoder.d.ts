import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVPacket, { AVPacketPool } from 'avutil/struct/avpacket';
import AVFrame, { AVFramePool } from 'avutil/struct/avframe';
import { Rational } from 'avutil/struct/rational';
export type WebAudioEncoderOptions = {
    onReceivePacket: (avpacket: pointer<AVPacket>) => void;
    onError: (error?: Error) => void;
    avpacketPool?: AVPacketPool;
    avframePool?: AVFramePool;
};
export default class WebAudioEncoder {
    private encoder;
    private options;
    private parameters;
    private timeBase;
    private currentError;
    private pts;
    private avframeCache;
    private extradata;
    constructor(options: WebAudioEncoderOptions);
    private output;
    private error;
    open(parameters: pointer<AVCodecParameters>, timeBase: Rational): Promise<void>;
    encode(frame: AudioData | pointer<AVFrame>): 0 | -1;
    flush(): Promise<void>;
    close(): void;
    getExtraData(): Uint8Array;
    getQueueLength(): number;
    static isSupported(parameters: pointer<AVCodecParameters>): Promise<boolean>;
}
