import AVPacket from 'avutil/struct/avpacket';
import AVStream from '../AVStream';
import { Uint8ArrayInterface } from 'common/io/interface';
export declare const enum HEVCProfile {
    Main = 1,
    Main10 = 2,
    MainStillPicture = 3,
    Main444 = 4
}
export declare const HEVCProfile2Name: Record<HEVCProfile, string>;
export declare const LevelCapabilities: {
    level: number;
    maxLumaSamplesPerSecond: number;
    maxLumaPictureSize: number;
    maxBitRate: {
        main: number;
        main10: number;
    };
}[];
export declare function getLevelByResolution(profile: number, width: number, height: number, fps: number, bitrate: number): number;
export declare const enum HEVCNaluType {
    kSliceTRAIL_N = 0,
    kSliceTRAIL_R = 1,
    kSliceTSA_N = 2,
    kSliceTSA_R = 3,
    kSliceSTSA_N = 4,
    kSliceSTSA_R = 5,
    kSliceRADL_N = 6,
    kSliceRADL_R = 7,
    kSliceRASL_N = 8,
    kSliceRASL_R = 9,
    kSliceBLA_W_LP = 16,
    kSliceBLA_W_RADL = 17,
    kSliceBLA_N_LP = 18,
    kSliceIDR_W_RADL = 19,
    kSliceIDR_N_LP = 20,
    kSliceCRA_NUT = 21,
    kSliceVPS = 32,
    kSliceSPS = 33,
    kSlicePPS = 34,
    kSliceAUD = 35,
    kSliceEOS_NUT = 36,
    kSliceEOB_NUT = 37,
    kSliceFD_NUT = 38,
    kSliceSEI_PREFIX = 39,
    kSliceSEI_SUFFIX = 40
}
export declare const enum HEVCSliceType {
    kSliceNone = -1,
    kSliceB = 0,
    kSliceP = 1,
    kSliceI = 2
}
/**
 *
 * avcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 8   configurationVersion( 固定   1)
 * - 2   general_profile_space
 * - 1   general_tier_flag
 * - 5   general_profile_idc
 * - 32  general_profile_compatibility_flags
 * - 48  general_constraint_indicator_flags (6 个 字节）
 * - 8   general_level_idc
 * - 4   reserved1 (1111)
 * - 4   min_spatial_segmentation_idc_L
 * - 8   min_spatial_segmentation_idc_H
 * - 6   reserved2 (111111)
 * - 2   parallelismType
 * - 6   reserved3 (111111)
 * - 2   chromaFormat
 * - 5   reserved4 (11111)
 * - 3   bitDepthLumaMinus8
 * - 5   reserved5(11111)
 * - 3   bitDepthChromaMinus8
 * - 16  avgFrameRate
 * - 2   constantFrameRate
 * - 3   numTemporalLayers
 * - 1   temporalIdNested
 * - 2   lengthSizeMinusOne
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 1   reserved (0)
 * - 6   NAL_unit_type
 * - 16  numNalus
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
export declare function extradata2VpsSpsPps(extradata: Uint8ArrayInterface): {
    vpss: any[];
    spss: any[];
    ppss: any[];
};
export declare function vpsSpsPps2Extradata(vpss: Uint8ArrayInterface[], spss: Uint8ArrayInterface[], ppss: Uint8ArrayInterface[]): Uint8Array;
export declare function annexbExtradata2AvccExtradata(data: Uint8ArrayInterface): Uint8Array;
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
export declare function annexb2Avcc(data: Uint8ArrayInterface): {
    bufferPointer: pointer<void>;
    length: number;
    extradata: Uint8Array;
    key: boolean;
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
export interface HevcSPS {
    profile: number;
    level: number;
    width: number;
    height: number;
    chroma_format_idc: number;
    bit_depth_luma_minus8: number;
    bit_depth_chroma_minus8: number;
    general_profile_space: number;
    general_tier_flag: number;
    general_profile_compatibility_flags: number;
    constraint_flags: number;
    separate_colour_plane_flag: number;
    log2_min_cb_size: number;
    log2_diff_max_min_coding_block_size: number;
    log2_min_tb_size: number;
    log2_diff_max_min_transform_block_size: number;
    log2_max_trafo_size: number;
    log2_ctb_size: number;
    log2_min_pu_size: number;
    ctb_width: number;
    ctb_height: number;
    ctb_size: number;
    min_cb_width: number;
    min_cb_height: number;
    min_tb_width: number;
    min_tb_height: number;
    min_pu_width: number;
    min_pu_height: number;
    log2_max_poc_lsb: number;
}
export declare function parseSPS(sps: Uint8ArrayInterface): HevcSPS;
export interface HevcPPS {
    pps_pic_parameter_set_id: number;
    pps_seq_parameter_set_id: number;
    dependent_slice_segment_flag: number;
    output_flag_present_flag: number;
    num_extra_slice_header_bits: number;
}
export declare function parsePPS(pps: Uint8ArrayInterface): HevcPPS;
