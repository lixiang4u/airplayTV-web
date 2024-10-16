import AVFrame from '../struct/avframe';
import { AVPixelFormat } from '../pixfmt';
import { Rational } from '../struct/rational';
export declare function avPixelFormat2Format(pixfmt: AVPixelFormat): "BGRA" | "I420" | "I420A" | "I422" | "I444" | "NV12" | "RGBA";
export declare function getVideoColorSpaceInit(avframe: pointer<AVFrame>): VideoColorSpaceInit;
export declare function avframe2VideoFrame(avframe: pointer<AVFrame>, timeBase?: Rational): VideoFrame;
