import AVFrame from '../struct/avframe';
import { Rational } from '../struct/rational';
export declare function avframe2AudioData(avframe: pointer<AVFrame>, timeBase?: Rational): AudioData;
