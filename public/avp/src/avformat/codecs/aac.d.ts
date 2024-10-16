import Stream from '../AVStream';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { Uint8ArrayInterface } from 'common/io/interface';
export declare const enum MPEG4AudioObjectTypes {
    NULL = 0,
    /**
     * Main-AAC
     */
    AAC_MAIN = 1,
    /**
     * LC-AAC
     */
    AAC_LC = 2,
    AAC_SSR = 3,
    AAC_LTP = 4,
    /**
     * HE-AAC
     */
    AAC_SBR = 5,
    AAC_SCALABLE = 6,
    LAYER1 = 32,
    LAYER2 = 33,
    /**
     * MP3
     */
    LAYER3 = 34
}
export declare const AACProfile2Name: Partial<Record<MPEG4AudioObjectTypes, string>>;
export declare const MPEG4SamplingFrequencyIndex: {
    96000: number;
    88200: number;
    64000: number;
    48000: number;
    44100: number;
    32000: number;
    24000: number;
    22050: number;
    16000: number;
    12000: number;
    11025: number;
    8000: number;
    7350: number;
};
export declare const MPEG4SamplingFrequencies: number[];
export declare const MPEG4Channels: number[];
/**
 * 解析 AAC AudioSpecificConfig
 *
 *             frequency
 *              44100Hz        fill bit
 *               4 bit          3 bit
 *              -------         -----
 *    0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0
 *    ---------         -------
 *      5 bit            4 bit
 *     AAC LC           fl, fr
 *    profile           channel
 *
 * url: https://wiki.multimedia.cx/index.php/MPEG-4_Audio#Audio_Specific_Config
 *
 */
export declare function getAVCodecParameters(extradata: Uint8ArrayInterface): {
    profile: int32;
    sampleRate: int32;
    channels: int32;
};
export declare function parseAVCodecParameters(stream: Stream, extradata?: Uint8ArrayInterface): void;
export declare function avCodecParameters2Extradata(codecpar: AVCodecParameters): Uint8Array;
