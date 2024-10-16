import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVPacket from 'avutil/struct/avpacket';
export type WebAudioDecoderOptions = {
    onReceiveFrame: (frame: AudioData) => void;
    onError: (error?: Error) => void;
};
export default class WebAudioDecoder {
    private options;
    private decoder;
    private parameters;
    private extradata;
    private currentError;
    constructor(options: WebAudioDecoderOptions);
    private output;
    private error;
    open(parameters: pointer<AVCodecParameters>): Promise<void>;
    changeExtraData(buffer: Uint8Array): void;
    decode(avpacket: pointer<AVPacket>, pts?: int64): 0 | -1;
    flush(): Promise<void>;
    close(): void;
    getQueueLength(): number;
    static isSupported(parameters: pointer<AVCodecParameters>): Promise<boolean>;
}
