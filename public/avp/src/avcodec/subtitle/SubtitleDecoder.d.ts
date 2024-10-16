import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVPacket from 'avutil/struct/avpacket';
import { AVSubtitle } from 'avutil/struct/avsubtitle';
export type SubtitleDecoderOptions = {
    onReceiveSubtitle?: (subtitle: AVSubtitle) => void;
    onError?: (error?: Error) => void;
};
export default class SubtitleDecoder {
    private options;
    private frame;
    private decoder;
    constructor(options: SubtitleDecoderOptions);
    private getAVFrame;
    private outputAVFrame;
    private receiveAVFrame;
    open(parameters: pointer<AVCodecParameters>): Promise<0 | -8>;
    decode(avpacket: pointer<AVPacket>): int32 | 0;
    flush(): Promise<void>;
    close(): void;
}
