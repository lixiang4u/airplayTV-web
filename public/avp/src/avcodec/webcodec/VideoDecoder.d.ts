import AVPacket from 'avutil/struct/avpacket';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
export type WebVideoDecoderOptions = {
    onReceiveFrame: (frame: VideoFrame) => void;
    enableHardwareAcceleration?: boolean;
    onError: (error?: Error) => void;
};
export default class WebVideoDecoder {
    private decoder;
    private options;
    private parameters;
    private extradata;
    private currentError;
    private inputQueue;
    private outputQueue;
    private sort;
    private keyframeRequire;
    constructor(options: WebVideoDecoderOptions);
    private output;
    private error;
    private changeExtraData;
    open(parameters: pointer<AVCodecParameters>): Promise<void>;
    decode(avpacket: pointer<AVPacket>): 0 | -1;
    flush(): Promise<void>;
    close(): void;
    getQueueLength(): number;
    setSkipFrameDiscard(discard: number): void;
    static isSupported(parameters: pointer<AVCodecParameters>, enableHardwareAcceleration: boolean): Promise<boolean>;
}
