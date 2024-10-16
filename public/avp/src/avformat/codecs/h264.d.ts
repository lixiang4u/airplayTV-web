import AVPacket from 'avutil/struct/avpacket';
import AVStream from '../AVStream';
import { Uint8ArrayInterface } from 'common/io/interface';
export declare const NALULengthSizeMinusOne = 3;
export declare const enum BitFormat {
    AVCC = 1,
    ANNEXB = 2
}
export declare const enum PictureType {
    I = 1,
    P = 2,
    B = 3,
    SPS = 4,
    PPS = 5,
    SEI = 6
}
export declare const enum H264NaluType {
    kUnspecified = 0,
    kSliceNonIDR = 1,
    kSliceDPA = 2,
    kSliceDPB = 3,
    kSliceDPC = 4,
    kSliceIDR = 5,
    kSliceSEI = 6,
    kSliceSPS = 7,
    kSlicePPS = 8,
    kSliceAUD = 9,
    kEndOfSequence = 10,
    kEndOfStream = 11,
    kFiller = 12,
    kSPSExt = 13,
    kReserved0 = 14
}
export declare const enum H264SliceType {
    kSliceNone = -1,
    kSliceP = 0,
    kSliceB = 1,
    kSliceI = 2,
    kSliceSP = 5,
    kSliceSB = 6,
    kSliceSI = 7
}
export declare const enum H264Profile {
    kBaseline = 66,
    kMain = 77,
    kHigh = 100,
    kConstrained = 66,
    kHigh10 = 110,
    kHigh422 = 122,
    kHigh444 = 244
}
export declare const H264Profile2Name: Record<H264Profile, string>;
export declare const LevelCapabilities: {
    level: number;
    maxResolution: number;
    maxFrameRate: number;
}[];
export declare function getLevelByResolution(width: number, height: number, fps: number): number;
/**
 *
 * avcc 格式的 extradata 转 annexb sps pps
 *
 * bits
 * - 8   version ( always 0x01 )
 * - 8   avc profile ( sps[0][1] )
 * - 8   avc compatibility ( sps[0][2] )
 * - 8   avc level ( sps[0][3] )
 * - 6   reserved ( all bits on )
 * - 2   NALULengthSizeMinusOne
 * - 3   reserved ( all bits on )
 * - 5   number of SPS NALUs (usually 1)
 * - repeated once per SPS:
 *   - 16         SPS size
 *   - variable   SPS NALU data
 * - 8 number of PPS NALUs (usually 1)
 * - repeated once per PPS:
 *   - 16       PPS size
 *   - variable PPS NALU data
 *
 * - ext (profile !== 66 && profile !== 77 && profile !== 88)
 *  - 6 reserved ( all bits on )
 *  - 2 chroma_format_idc
 *  - 5 reserved ( all bits on )
 *  - 3 bit_depth_luma_minus8
 *  - 5 reserved ( all bits on )
 *  - 3 bit_depth_chroma_minus8
 *  - 8 number of SPS_EXT NALUs
 *    - 16 SPS_EXT size
 *    - variable   SPS_EXT NALU data
 *
 */
export declare function extradata2SpsPps(extradata: Uint8ArrayInterface): {
    spss: any[];
    ppss: any[];
    spsExts: any[];
};
export declare function spsPps2Extradata(spss: Uint8ArrayInterface[], ppss: Uint8ArrayInterface[], spsExts?: Uint8ArrayInterface[]): Uint8Array;
export declare function annexbExtradata2AvccExtradata(data: Uint8ArrayInterface): Uint8Array;
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
export declare function annexb2Avcc(data: Uint8ArrayInterface): {
    bufferPointer: pointer<void>;
    length: number;
    key: boolean;
    extradata: Uint8Array;
};
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
export declare function avcc2Annexb(data: Uint8ArrayInterface, extradata?: Uint8ArrayInterface): {
    bufferPointer: pointer<void>;
    length: any;
    key: boolean;
};
export declare function parseAvccExtraData(avpacket: pointer<AVPacket>, stream: AVStream): void;
export declare function parseAnnexbExtraData(avpacket: pointer<AVPacket>, force?: boolean): void;
export declare function parseAVCodecParameters(stream: AVStream, extradata?: Uint8ArrayInterface): void;
export declare function isIDR(avpacket: pointer<AVPacket>, naluLengthSize?: int32): boolean;
export interface H264SPS {
    profile: number;
    level: number;
    width: number;
    height: number;
    chromaFormatIdc: number;
    bitDepthLumaMinus8: number;
    bitDepthChromaMinus8: number;
    frameMbsOnlyFlag: number;
    picOrderCntType: number;
    log2MaxPicOrderCntLsbMinus4: number;
    deltaPicOrderAlwaysZeroFlag: number;
    log2MaxFrameNumMinus4: number;
}
export declare function parseSPS(sps: Uint8ArrayInterface): H264SPS;
