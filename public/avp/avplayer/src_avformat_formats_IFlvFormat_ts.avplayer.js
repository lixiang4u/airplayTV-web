"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IFlvFormat_ts"],{

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   MPEG4Channels: () => (/* binding */ MPEG4Channels),
/* harmony export */   MPEG4SamplingFrequencies: () => (/* binding */ MPEG4SamplingFrequencies),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencyIndex, getAVCodecParameters */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia aac util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

const AACProfile2Name = {
    [1 /* MPEG4AudioObjectTypes.AAC_MAIN */]: 'Main',
    [2 /* MPEG4AudioObjectTypes.AAC_LC */]: 'LC',
    [3 /* MPEG4AudioObjectTypes.AAC_SSR */]: 'LC',
    [4 /* MPEG4AudioObjectTypes.AAC_LTP */]: 'LC',
    [5 /* MPEG4AudioObjectTypes.AAC_SBR */]: 'HE',
    [6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */]: 'HE'
};
const MPEG4SamplingFrequencyIndex = {
    96000: 0,
    88200: 1,
    64000: 2,
    48000: 3,
    44100: 4,
    32000: 5,
    24000: 6,
    22050: 7,
    16000: 8,
    12000: 9,
    11025: 10,
    8000: 11,
    7350: 12
};
const MPEG4SamplingFrequencies = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE
];
const MPEG4Channels = [
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    1,
    2,
    3,
    4,
    5,
    6,
    7
];
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
function getAVCodecParameters(extradata) {
    let profile = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let sampleRate = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let channels = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    if (extradata.length >= 2) {
        profile = (extradata[0] >> 3) & 0x1f;
        sampleRate = MPEG4SamplingFrequencies[((extradata[0] & 0x07) << 1)
            | (extradata[1] >> 7)] ?? 48000;
        channels = MPEG4Channels[(extradata[1] >> 3) & 0x0f] ?? 2;
    }
    return {
        profile,
        sampleRate,
        channels
    };
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata) {
        const { profile, sampleRate, channels } = getAVCodecParameters(extradata);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channels;
    }
}
function avCodecParameters2Extradata(codecpar) {
    const samplingFreqIndex = MPEG4SamplingFrequencyIndex[codecpar.sampleRate];
    const channelConfig = codecpar.chLayout.nbChannels;
    const extradata = new Uint8Array(2);
    extradata[0] = ((codecpar.profile & 0x1f) << 3) | ((samplingFreqIndex & 0x0e) >> 1);
    extradata[1] = ((samplingFreqIndex & 0x01) << 7) | ((channelConfig & 0x0f) << 3);
    return extradata;
}


/***/ }),

/***/ "./src/avformat/codecs/av1.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/av1.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV1Profile2Name: () => (/* binding */ AV1Profile2Name),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, AV1LevelIdx, getLevelByResolution, parseSequenceHeader, splitOBU, generateExtradata */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/av1syntax */ "./src/avutil/util/av1syntax.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/* harmony import */ var avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");





const AV1Profile2Name = {
    [0 /* AV1Profile.Main */]: 'Main',
    [1 /* AV1Profile.High */]: 'High',
    [2 /* AV1Profile.Professional */]: 'Professional'
};
const LevelCapabilities = [
    { level: 20, maxResolution: 2359296 },
    { level: 21, maxResolution: 4460544 },
    { level: 30, maxResolution: 10653696 },
    { level: 31, maxResolution: 17040384 },
    { level: 40, maxResolution: 21233664 },
    { level: 41, maxResolution: 21233664 },
    { level: 50, maxResolution: 35651584 },
    { level: 51, maxResolution: 35651584 },
    { level: 52, maxResolution: 35651584 },
    { level: 53, maxResolution: 35651584 },
    { level: 60, maxResolution: 142606336 },
    { level: 61, maxResolution: 142606336 },
    { level: 62, maxResolution: 142606336 },
    { level: 63, maxResolution: 142606336 }
];
const AV1LevelIdx = [20, 21, 22, 23, 30, 31, 32, 33, 40, 41, 42, 43, 50, 51, 52, 53, 60, 61, 62, 63, 70, 71, 72, 73];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 4) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 bit marker
 * - 7 bit version
 * - 3 bit profile
 * - 5 bit level
 * - 1 bit tier
 * - 1 bit bitdepth > 8
 * - 1 bit bitdepth == 12
 * - 1 bit monochrome
 * - 1 bit chroma_subsampling_x
 * - 1 bit chroma_subsampling_y
 * - 2 bit chroma_sample_position
 * - 8 bit padding
 *
 * @param header
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    // marker
    bitReader.readU1();
    // version
    bitReader.readU(7);
    const profile = bitReader.readU(3);
    const level = bitReader.readU(5);
    const tier = bitReader.readU1();
    let bitDepth = bitReader.readU1() ? 10 : 8;
    if (bitReader.readU1()) {
        bitDepth = 12;
    }
    const monochrome = bitReader.readU1();
    const chromaSubsamplingX = bitReader.readU1();
    const chromaSubsamplingY = bitReader.readU1();
    const chromaSamplePosition = bitReader.readU(2);
    return {
        profile,
        level,
        tier,
        bitDepth,
        monochrome,
        chromaSubsamplingX,
        chromaSubsamplingY,
        chromaSamplePosition
    };
}
/* eslint-disable camelcase */
function parseSequenceHeader(header) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](header.length);
    bitReader.appendBuffer(header);
    bitReader.readU1();
    bitReader.readU(4);
    const extensionFlag = bitReader.readU1();
    const hasSizeFlag = bitReader.readU1();
    // obu_reserved_1bit
    bitReader.readU1();
    if (extensionFlag) {
        bitReader.readU(8);
    }
    if (hasSizeFlag) {
        avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader);
    }
    const seq_profile = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    const still_picture = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    const reduced_still_picture_header = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let timing_info_present_flag = 0;
    let decoder_model_info_present_flag = 0;
    let initial_display_delay_present_flag = 0;
    let operating_points_cnt_minus_1 = 0;
    let operating_point_idc = [0];
    let seq_level_idx = [0];
    let seq_tier = [0];
    let decoder_model_present_for_this_op = [0];
    let initial_display_delay_present_for_this_op = [0];
    let initial_display_delay_minus_1 = [0];
    let buffer_delay_length_minus_1 = 0;
    let decoder_buffer_delay = [0];
    let encoder_buffer_delay = [0];
    let low_delay_mode_flag = [0];
    if (reduced_still_picture_header) {
        seq_level_idx[0] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
    }
    else {
        timing_info_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (timing_info_present_flag) {
            let num_units_in_display_tick = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let time_scale = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let equal_picture_interval = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (equal_picture_interval) {
                let num_ticks_per_picture_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.uvlc(bitReader);
            }
            let decoder_model_info_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (decoder_model_info_present_flag) {
                buffer_delay_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let num_units_in_decoding_tick = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
                let buffer_removal_time_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let frame_presentation_time_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            }
        }
        else {
            decoder_model_info_present_flag = 0;
        }
        let initial_display_delay_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        let operating_points_cnt_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
        for (let i = 0; i <= operating_points_cnt_minus_1; i++) {
            operating_point_idc[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 12);
            seq_level_idx[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            if (seq_level_idx[i] > 7) {
                seq_tier[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
            else {
                seq_tier[i] = 0;
            }
            if (decoder_model_info_present_flag) {
                decoder_model_present_for_this_op[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (decoder_model_present_for_this_op[i]) {
                    let n = buffer_delay_length_minus_1 + 1;
                    decoder_buffer_delay[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    encoder_buffer_delay[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    low_delay_mode_flag[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
            }
            else {
                decoder_model_present_for_this_op[i] = 0;
            }
            if (initial_display_delay_present_flag) {
                initial_display_delay_present_for_this_op[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (initial_display_delay_present_for_this_op[i]) {
                    initial_display_delay_minus_1[i] = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
                }
            }
        }
    }
    let frame_width_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let frame_height_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let n = frame_width_bits_minus_1 + 1;
    let max_frame_width_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    n = frame_height_bits_minus_1 + 1;
    let max_frame_height_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    let frame_id_numbers_present_flag = 0;
    let delta_frame_id_length_minus_2 = 0;
    let additional_frame_id_length_minus_1 = 0;
    if (reduced_still_picture_header) {
        frame_id_numbers_present_flag = 0;
    }
    else {
        frame_id_numbers_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    if (frame_id_numbers_present_flag) {
        delta_frame_id_length_minus_2 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
        additional_frame_id_length_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    }
    let use_128x128_superblock = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_filter_intra = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_intra_edge_filter = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_interintra_compound = 0;
    let enable_masked_compound = 0;
    let enable_warped_motion = 0;
    let enable_dual_filter = 0;
    let enable_order_hint = 0;
    let enable_jnt_comp = 0;
    let enable_ref_frame_mvs = 0;
    let seq_force_screen_content_tools = 2;
    let seq_force_integer_mv = 2;
    let OrderHintBits = 0;
    if (!reduced_still_picture_header) {
        let enable_interintra_compound = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_masked_compound = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_warped_motion = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_dual_filter = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_order_hint = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (enable_order_hint) {
            enable_jnt_comp = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            enable_ref_frame_mvs = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        else {
            enable_jnt_comp = 0;
            enable_ref_frame_mvs = 0;
        }
        let seq_choose_screen_content_tools = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_choose_screen_content_tools) {
            seq_force_screen_content_tools = 2;
        }
        else {
            seq_force_screen_content_tools = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        if (seq_force_screen_content_tools > 0) {
            let seq_choose_integer_mv = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (seq_choose_integer_mv) {
                seq_force_integer_mv = 2;
            }
            else {
                seq_force_integer_mv = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
        }
        else {
            seq_force_integer_mv = 2;
        }
        if (enable_order_hint) {
            const order_hint_bits_minus_1 = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
            OrderHintBits = order_hint_bits_minus_1 + 1;
        }
        else {
            OrderHintBits = 0;
        }
    }
    let enable_superres = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_cdef = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_restoration = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let high_bitdepth = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let twelve_bit = 0;
    let bit_depth = 0;
    let mono_chrome = 0;
    if (seq_profile == 2 && high_bitdepth) {
        twelve_bit = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        bit_depth = twelve_bit ? 12 : 10;
    }
    else if (seq_profile <= 2) {
        bit_depth = high_bitdepth ? 10 : 8;
    }
    if (seq_profile == 1) {
        mono_chrome = 0;
    }
    else {
        mono_chrome = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    const color_description_present_flag = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let color_primaries = 0;
    let transfer_characteristics = 0;
    let matrix_coefficients = 0;
    if (color_description_present_flag) {
        color_primaries = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        transfer_characteristics = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        matrix_coefficients = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
    }
    else {
        color_primaries = 2;
        transfer_characteristics = 2;
        matrix_coefficients = 2;
    }
    let color_range = 0;
    let subsampling_x = 0;
    let subsampling_y = 0;
    let chroma_sample_position = 0;
    let separate_uv_delta_q = 0;
    if (mono_chrome) {
        color_range = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        subsampling_x = 1;
        subsampling_y = 1;
        chroma_sample_position = 0;
        separate_uv_delta_q = 0;
    }
    else if (color_primaries == 1
        && transfer_characteristics == 13
        && matrix_coefficients == 0) {
        color_range = 1;
        subsampling_x = 0;
        subsampling_y = 0;
        separate_uv_delta_q = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    else {
        color_range = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_profile == 0) {
            subsampling_x = 1;
            subsampling_y = 1;
        }
        else if (seq_profile == 1) {
            subsampling_x = 0;
            subsampling_y = 0;
        }
        else {
            if (bit_depth == 12) {
                subsampling_x = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (subsampling_x) {
                    subsampling_y = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
                else {
                    subsampling_y = 0;
                }
            }
            else {
                subsampling_x = 1;
                subsampling_y = 0;
            }
        }
        if (subsampling_x && subsampling_y) {
            chroma_sample_position = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 2);
        }
        separate_uv_delta_q = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    let film_grain_params_present = avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    return {
        width: max_frame_width_minus_1 + 1,
        height: max_frame_height_minus_1 + 1,
        profile: seq_profile,
        level: AV1LevelIdx[seq_level_idx[0]],
        tier: seq_tier[0],
        bitDepth: bit_depth,
        monoChrome: mono_chrome,
        colorRange: color_range,
        colorPrimaries: color_primaries,
        transferCharacteristics: transfer_characteristics,
        matrixCoefficients: matrix_coefficients,
        subsamplingX: subsampling_x,
        subsamplingY: subsampling_y,
        chromaSamplePosition: chroma_sample_position
    };
}
function splitOBU(buffer) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
    bitReader.appendBuffer(buffer);
    const list = [];
    while (bitReader.remainingLength()) {
        const now = bitReader.getPos();
        // obu_forbidden_bit
        bitReader.readU1();
        const type = bitReader.readU(4);
        const extensionFlag = bitReader.readU1();
        const hasSizeFlag = bitReader.readU1();
        // obu_reserved_1bit
        bitReader.readU1();
        if (extensionFlag) {
            bitReader.readU(8);
        }
        const size = hasSizeFlag ? avutil_util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader) : buffer.length - 1 - extensionFlag;
        const headerSize = bitReader.getPos() - now;
        list.push(buffer.subarray(now, now + headerSize + size));
        bitReader.skip(size * 8);
    }
    return list;
}
function generateExtradata(codecpar, buffer) {
    const bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__["default"](4);
    // marker
    bitWriter.writeU1(1);
    // version
    bitWriter.writeU(7, 1);
    const header = splitOBU(buffer).find((buffer) => {
        return ((buffer[0] >>> 3) & 0x0f) === 1 /* OBUType.SEQUENCE_HEADER */;
    });
    if (header) {
        const params = parseSequenceHeader(header);
        bitWriter.writeU(3, params.profile);
        bitWriter.writeU(5, params.level);
        bitWriter.writeU(1, params.tier);
        bitWriter.writeU(1, params.bitDepth > 8 ? 1 : 0);
        bitWriter.writeU(1, params.bitDepth === 12 ? 1 : 0);
        bitWriter.writeU(1, params.monoChrome);
        bitWriter.writeU(1, params.subsamplingX);
        bitWriter.writeU(1, params.subsamplingY);
        bitWriter.writeU(1, params.chromaSamplePosition);
    }
    else {
        const desc = avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__.PixelFormatDescriptorsMap[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28)];
        bitWriter.writeU(3, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48));
        bitWriter.writeU(5, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52));
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, desc.comp[0].depth > 8 ? 1 : 0);
        bitWriter.writeU(1, desc.comp[0].depth === 12 ? 1 : 0);
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 0);
    }
    // padding
    bitWriter.writeU(8, 0);
    return bitWriter.getBuffer();
}


/***/ }),

/***/ "./src/avformat/codecs/h264.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/h264.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H264Profile2Name: () => (/* binding */ H264Profile2Name),
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   annexbExtradata2AvccExtradata: () => (/* binding */ annexbExtradata2AvccExtradata),
/* harmony export */   extradata2SpsPps: () => (/* binding */ extradata2SpsPps),
/* harmony export */   isIDR: () => (/* binding */ isIDR),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports NALULengthSizeMinusOne, LevelCapabilities, getLevelByResolution, spsPps2Extradata, avcc2Annexb */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");
var cheap__fileName__0 = "src\\avformat\\codecs\\h264.ts";


/*
 * libmedia h264 util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */











const NALULengthSizeMinusOne = 3;
const H264Profile2Name = {
    [66 /* H264Profile.kBaseline */]: 'Constrained Baseline',
    [77 /* H264Profile.kMain */]: 'Main',
    [100 /* H264Profile.kHigh */]: 'High',
    [110 /* H264Profile.kHigh10 */]: 'High10',
    [122 /* H264Profile.kHigh422 */]: 'High422',
    [244 /* H264Profile.kHigh444 */]: 'High444'
};
const LevelCapabilities = [
    { level: 10, maxResolution: 25344, maxFrameRate: 15 },
    { level: 11, maxResolution: 25344, maxFrameRate: 30 },
    { level: 12, maxResolution: 101376, maxFrameRate: 30 },
    { level: 13, maxResolution: 101376, maxFrameRate: 30 },
    { level: 20, maxResolution: 101376, maxFrameRate: 30 },
    { level: 21, maxResolution: 202752, maxFrameRate: 30 },
    { level: 22, maxResolution: 414720, maxFrameRate: 30 },
    { level: 30, maxResolution: 414720, maxFrameRate: 30 },
    { level: 31, maxResolution: 921600, maxFrameRate: 30 },
    { level: 32, maxResolution: 1310720, maxFrameRate: 60 },
    { level: 40, maxResolution: 2097152, maxFrameRate: 30 },
    { level: 41, maxResolution: 2097152, maxFrameRate: 60 },
    { level: 42, maxResolution: 2228224, maxFrameRate: 60 },
    { level: 50, maxResolution: 8912896, maxFrameRate: 30 },
    { level: 51, maxResolution: 8912896, maxFrameRate: 60 },
    { level: 52, maxResolution: 8912896, maxFrameRate: 120 },
    { level: 60, maxResolution: 35651584, maxFrameRate: 30 },
    { level: 61, maxResolution: 35651584, maxFrameRate: 60 },
    { level: 62, maxResolution: 35651584, maxFrameRate: 120 }
];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution && fps <= level.maxFrameRate) {
            return level.level;
        }
    }
}
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
function extradata2SpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata);
    bufferReader.skip(5);
    const spss = [];
    const ppss = [];
    const spsExts = [];
    const spsLength = bufferReader.readUint8() & 0x1f;
    for (let i = 0; i < spsLength; i++) {
        const length = bufferReader.readUint16();
        spss.push(bufferReader.readBuffer(length));
    }
    const ppsLength = bufferReader.readUint8();
    for (let i = 0; i < ppsLength; i++) {
        const length = bufferReader.readUint16();
        ppss.push(bufferReader.readBuffer(length));
    }
    if (bufferReader.remainingSize() > 4) {
        bufferReader.skip(3);
        const spsExtLength = bufferReader.readUint8();
        if (spsExtLength > 0) {
            for (let i = 0; i < spsExtLength; i++) {
                const length = bufferReader.readUint16();
                spsExts.push(bufferReader.readBuffer(length));
            }
        }
    }
    return {
        spss,
        ppss,
        spsExts
    };
}
function spsPps2Extradata(spss, ppss, spsExts = []) {
    if (spss.length > 32) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`h264 metadata\'s sps max length is 32, but get ${spss.length}`, cheap__fileName__0, 210);
        spss = spss.slice(0, 32);
    }
    if (spss.length > 256) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`h264 metadata\'s pps max length is 256, but get ${spss.length}`, cheap__fileName__0, 214);
        spss = spss.slice(0, 256);
    }
    let length = 7;
    length = spss.reduce((prev, sps) => {
        return prev + 2 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 2 + pps.length;
    }, length);
    const sps = spss[0];
    const params = parseSPS(sps);
    if (params.profile !== 66 && params.profile !== 77 && params.profile !== 88) {
        length += 4;
        if (spsExts.length) {
            length = spsExts.reduce((prev, ext) => {
                return prev + 2 + ext.length;
            }, length);
        }
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(sps[1]);
    bufferWriter.writeUint8(sps[2]);
    bufferWriter.writeUint8(sps[3]);
    bufferWriter.writeUint8(0xfc | NALULengthSizeMinusOne);
    // sps
    bufferWriter.writeUint8(0xe0 | (spss.length & 0x1f));
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint16(sps.length);
        bufferWriter.writeBuffer(sps);
    });
    // pps
    bufferWriter.writeUint8(ppss.length);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint16(pps.length);
        bufferWriter.writeBuffer(pps);
    });
    if (params.profile !== 66 && params.profile !== 77 && params.profile !== 88) {
        bufferWriter.writeUint8(0xfc | params.chromaFormatIdc);
        bufferWriter.writeUint8(0xf8 | params.bitDepthLumaMinus8);
        bufferWriter.writeUint8(0xf8 | params.bitDepthChromaMinus8);
        if (spsExts.length) {
            common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spsExts, (ext) => {
                bufferWriter.writeUint16(ext.length);
                bufferWriter.writeBuffer(ext);
            });
        }
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            return spsPps2Extradata(spss, ppss, spsExts);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    let extradata;
    let key = false;
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            extradata = spsPps2Extradata(spss, ppss, spsExts);
        }
        nalus = nalus.filter((nalu) => {
            const type = nalu[0] & 0x1f;
            return type !== 9 /* H264NaluType.kSliceAUD */
                && type !== 8 /* H264NaluType.kSlicePPS */
                && type !== 7 /* H264NaluType.kSliceSPS */
                && type !== 13 /* H264NaluType.kSPSExt */;
        });
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = nalu[0] & 0x1f;
        if (type === 5 /* H264NaluType.kSliceIDR */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        key,
        extradata
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? (extradata[4] & 0x03) : NALULengthSizeMinusOne;
    let spss = [];
    let ppss = [];
    let spsExts = [];
    let key = false;
    if (extradata) {
        const result = extradata2SpsPps(extradata);
        spss = result.spss;
        ppss = result.ppss;
        spsExts = result.spsExts;
        key = true;
    }
    const nalus = [];
    const seis = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = nalu[0] & 0x1f;
        if (naluType === 6 /* H264NaluType.kSliceSEI */) {
            seis.push(nalu);
        }
        else if (naluType !== 9 /* H264NaluType.kSliceAUD */) {
            nalus.push(nalu);
        }
    }
    let length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, 0);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = spsExts.reduce((prev, ext) => {
        return prev + 4 + ext.length;
    }, length);
    length = seis.reduce((prev, sei) => {
        return prev + 4 + sei.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(length + 6);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"]((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapUint8Array)(bufferPointer, length + 6));
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(0x09);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(seis, (sei) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sei);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spsExts, (ext) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(ext);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = nalu[0] & 0x1f;
        if (type === 5 /* H264NaluType.kSliceIDR */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 6,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let spss = [];
    let ppss = [];
    let spsExts = [];
    let others = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = nalu[0] & 0x1f;
        if (naluType === 7 /* H264NaluType.kSliceSPS */) {
            spss.push(nalu);
        }
        else if (naluType === 8 /* H264NaluType.kSlicePPS */) {
            ppss.push(nalu);
        }
        else if (naluType === 13 /* H264NaluType.kSPSExt */) {
            spsExts.push(nalu);
        }
        else {
            others.push(nalu);
        }
    }
    if (spss.length || ppss.length) {
        const extradata = spsPps2Extradata(spss, ppss, spsExts);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)(data);
    if (nalus.length > 1) {
        const spss = [];
        const ppss = [];
        const spsExts = [];
        nalus.forEach((nalu) => {
            const type = nalu[0] & 0x1f;
            if (type === 7 /* H264NaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 8 /* H264NaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
            else if (type === 13 /* H264NaluType.kSPSExt */) {
                spsExts.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            const extradata = spsPps2Extradata(spss, ppss, spsExts);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[4] & 0x03);
        const { spss } = extradata2SpsPps(extradata);
        if (spss.length) {
            const { profile, level, width, height } = parseSPS(spss[0]);
            stream.codecpar.profile = profile;
            stream.codecpar.level = level;
            stream.codecpar.width = width;
            stream.codecpar.height = height;
        }
    }
}
function isIDR(avpacket, naluLengthSize = 4) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return false;
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 2 /* BitFormat.ANNEXB */) {
        let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.splitNaluByStartCode)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        return nalus.some((nalu) => {
            const type = nalu[0] & 0x1f;
            return type === 5 /* H264NaluType.kSliceIDR */;
        });
    }
    else {
        const size = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        let i = 0;
        while (i < (size - naluLengthSize)) {
            const type = avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + (i + naluLengthSize)) & 0x1f;
            if (type === 5 /* H264NaluType.kSliceIDR */) {
                return true;
            }
            if (naluLengthSize === 4) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 3) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 2) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            i += naluLengthSize;
        }
        return false;
    }
}
function parseSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nal_ref_idc
    bitReader.readU(2);
    // nal_unit_type
    bitReader.readU(5);
    const profile = bitReader.readU(8);
    // constraint_set0_flag
    bitReader.readU1();
    // constraint_set1_flag
    bitReader.readU1();
    // constraint_set2_flag
    bitReader.readU1();
    // constraint_set3_flag
    bitReader.readU1();
    // constraint_set4_flag
    bitReader.readU1();
    // constraint_set4_flag
    bitReader.readU1();
    // reserved_zero_2bits
    bitReader.readU(2);
    const level = bitReader.readU(8);
    // seq_parameter_set_id
    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    // 摄像机出图大部分格式是 4:2:0
    let chromaFormatIdc = 1;
    let bitDepthLumaMinus8 = 0;
    let bitDepthChromaMinus8 = 0;
    if (profile == 100 || profile == 110 || profile == 122
        || profile == 244 || profile == 44 || profile == 83
        || profile == 86 || profile == 118 || profile == 128
        || profile == 138 || profile == 139 || profile == 134 || profile == 135) {
        chromaFormatIdc = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        if (chromaFormatIdc === 3) {
            // separate_colour_plane_flag
            bitReader.readU1();
        }
        // bit_depth_luma_minus8
        bitDepthLumaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        // bit_depth_chroma_minus8
        bitDepthChromaMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        // qpprime_y_zero_transform_bypass_flag
        bitReader.readU1();
        let seqScalingMatrixPresentFlag = bitReader.readU1();
        if (seqScalingMatrixPresentFlag) {
            const seqScalingListPresentFlag = new Array(8);
            for (let i = 0; i < ((chromaFormatIdc != 3) ? 8 : 12); i++) {
                seqScalingListPresentFlag[i] = bitReader.readU1();
            }
        }
    }
    // log2_max_frame_num_minus4
    const log2MaxFrameNumMinus4 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const picOrderCntType = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    let log2MaxPicOrderCntLsbMinus4 = 0;
    let deltaPicOrderAlwaysZeroFlag = 0;
    if (picOrderCntType === 0) {
        // log2_max_pic_order_cnt_lsb_minus4
        log2MaxPicOrderCntLsbMinus4 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    }
    else if (picOrderCntType === 1) {
        // delta_pic_order_always_zero_flag
        deltaPicOrderAlwaysZeroFlag = bitReader.readU1();
        // offset_for_non_ref_pic
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        // offset_for_top_to_bottom_field
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        const numRefFramesInPicOrderCntCycle = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        for (let i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
            avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readSE(bitReader);
        }
    }
    // max_num_ref_frames
    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    // gaps_in_frame_num_value_allowed_flag
    bitReader.readU1();
    const picWidthInMbsMinus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const picHeightInMapUnitsMinus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
    const frameMbsOnlyFlag = bitReader.readU1();
    let width = (picWidthInMbsMinus1 + 1) * 16;
    let height = (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16;
    if (!frameMbsOnlyFlag) {
        // mb_adaptive_frame_field_flag
        bitReader.readU1();
    }
    // direct_8x8_inference_flag
    bitReader.readU1();
    const frameCroppingFlag = bitReader.readU1();
    if (frameCroppingFlag) {
        const frameCropLeftOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropRightOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropTopOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        const frameCropBottomOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_11__.readUE(bitReader);
        let cropUnitX = 1;
        let cropUnitY = 2 - frameCroppingFlag;
        if (chromaFormatIdc === 1) {
            cropUnitX = 2;
            cropUnitY = 2 * (2 - frameCroppingFlag);
        }
        else if (frameCroppingFlag === 2) {
            cropUnitX = 2;
            cropUnitY = 2 - frameCroppingFlag;
        }
        width -= cropUnitX * (frameCropLeftOffset + frameCropRightOffset);
        height -= cropUnitY * (frameCropTopOffset + frameCropBottomOffset);
    }
    return {
        profile,
        level,
        width,
        height,
        chromaFormatIdc,
        bitDepthLumaMinus8,
        bitDepthChromaMinus8,
        frameMbsOnlyFlag,
        picOrderCntType,
        log2MaxPicOrderCntLsbMinus4,
        deltaPicOrderAlwaysZeroFlag,
        log2MaxFrameNumMinus4
    };
}


/***/ }),

/***/ "./src/avformat/codecs/hevc.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/hevc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HEVCProfile2Name: () => (/* binding */ HEVCProfile2Name),
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   annexbExtradata2AvccExtradata: () => (/* binding */ annexbExtradata2AvccExtradata),
/* harmony export */   extradata2VpsSpsPps: () => (/* binding */ extradata2VpsSpsPps),
/* harmony export */   isIDR: () => (/* binding */ isIDR),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parsePPS: () => (/* binding */ parsePPS),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, vpsSpsPps2Extradata, avcc2Annexb */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");


/*
 * libmedia hevc util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */










const HEVCProfile2Name = {
    [1 /* HEVCProfile.Main */]: 'Main',
    [2 /* HEVCProfile.Main10 */]: 'Main10',
    [3 /* HEVCProfile.MainStillPicture */]: 'MainStillPicture',
    [4 /* HEVCProfile.Main444 */]: 'Main444'
};
const LevelCapabilities = [
    { level: 10, maxLumaSamplesPerSecond: 552960, maxLumaPictureSize: 36864, maxBitRate: { main: 128, main10: 150 } },
    { level: 20, maxLumaSamplesPerSecond: 3686400, maxLumaPictureSize: 122880, maxBitRate: { main: 1500, main10: 1875 } },
    { level: 21, maxLumaSamplesPerSecond: 7372800, maxLumaPictureSize: 245760, maxBitRate: { main: 3000, main10: 3750 } },
    { level: 30, maxLumaSamplesPerSecond: 16588800, maxLumaPictureSize: 552960, maxBitRate: { main: 6000, main10: 7500 } },
    { level: 31, maxLumaSamplesPerSecond: 33177600, maxLumaPictureSize: 983040, maxBitRate: { main: 10000, main10: 12500 } },
    { level: 40, maxLumaSamplesPerSecond: 66846720, maxLumaPictureSize: 2228224, maxBitRate: { main: 12000, main10: 15000 } },
    { level: 41, maxLumaSamplesPerSecond: 133693440, maxLumaPictureSize: 2228224, maxBitRate: { main: 20000, main10: 25000 } },
    { level: 50, maxLumaSamplesPerSecond: 267386880, maxLumaPictureSize: 8912896, maxBitRate: { main: 25000, main10: 40000 } },
    { level: 51, maxLumaSamplesPerSecond: 534773760, maxLumaPictureSize: 8912896, maxBitRate: { main: 40000, main10: 60000 } },
    { level: 52, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 60, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 61, maxLumaSamplesPerSecond: 2139095040, maxLumaPictureSize: 89128960, maxBitRate: { main: 120000, main10: 240000 } },
    { level: 62, maxLumaSamplesPerSecond: 4278190080, maxLumaPictureSize: 356515840, maxBitRate: { main: 240000, main10: 480000 } }
];
function getLevelByResolution(profile, width, height, fps, bitrate) {
    bitrate /= 1000;
    const selectedProfile = profile === 1 /* HEVCProfile.Main */ ? 'main' : 'main10';
    const lumaSamplesPerSecond = width * height * fps;
    for (const level of LevelCapabilities) {
        if (lumaSamplesPerSecond <= level.maxLumaSamplesPerSecond && width * height <= level.maxLumaPictureSize && bitrate <= level.maxBitRate[selectedProfile]) {
            return level.level;
        }
    }
}
const NALULengthSizeMinusOne = 3;
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
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata, true);
    bufferReader.skip(22);
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x3f;
        const count = bufferReader.readUint16();
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
            vpss = list;
        }
        else if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss = list;
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
            ppss = list;
        }
    }
    return {
        vpss,
        spss,
        ppss
    };
}
function vpsSpsPps2Extradata(vpss, spss, ppss) {
    const sps = spss[0];
    let length = 23;
    if (vpss.length) {
        // type + count
        length += 3;
        length = vpss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (spss.length) {
        // type + count
        length += 3;
        length = spss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (ppss.length) {
        // type + count
        length += 3;
        length = ppss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer, true);
    const spsData = parseSPS(sps);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(sps[1]);
    bufferWriter.writeUint8(sps[2]);
    bufferWriter.writeUint8(sps[3]);
    bufferWriter.writeUint8(sps[4]);
    bufferWriter.writeUint8(sps[5]);
    // general_constraint_indicator_flags
    bufferWriter.writeUint8(sps[6]);
    bufferWriter.writeUint8(sps[7]);
    bufferWriter.writeUint8(sps[8]);
    bufferWriter.writeUint8(sps[9]);
    bufferWriter.writeUint8(sps[10]);
    bufferWriter.writeUint8(sps[11]);
    bufferWriter.writeUint8(spsData.level);
    // min_spatial_segmentation_idc
    bufferWriter.writeUint8((1020) | 0);
    bufferWriter.writeUint8(0);
    // parallelismType
    bufferWriter.writeUint8((16320) | 0);
    // chromaFormat
    bufferWriter.writeUint8((16320) | spsData.chroma_format_idc);
    // bitDepthLumaMinus8
    bufferWriter.writeUint8((8160) | spsData.bit_depth_luma_minus8);
    // bitDepthChromaMinus8
    bufferWriter.writeUint8((8160) | spsData.bit_depth_chroma_minus8);
    // avgFrameRate
    bufferWriter.writeUint16(0);
    // constantFrameRate numTemporalLayers temporalIdNested lengthSizeMinusOne
    bufferWriter.writeUint8((0) | (8) | ((sps[0] & 0x01) << 2) | NALULengthSizeMinusOne);
    // numOfArrays
    let numOfArrays = 0;
    if (vpss.length) {
        numOfArrays++;
    }
    if (spss.length) {
        numOfArrays++;
    }
    if (ppss.length) {
        numOfArrays++;
    }
    bufferWriter.writeUint8(numOfArrays);
    // vps
    if (vpss.length) {
        bufferWriter.writeUint8((128) | 32 /* HEVCNaluType.kSliceVPS */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 33 /* HEVCNaluType.kSliceSPS */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 34 /* HEVCNaluType.kSlicePPS */);
        bufferWriter.writeUint16(ppss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
            bufferWriter.writeUint16(pps.length);
            bufferWriter.writeBuffer(pps);
        });
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            return vpsSpsPps2Extradata(vpss, spss, ppss);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let extradata;
    let key = false;
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[0] >>> 1) & 0x3f;
                return type !== 32 /* HEVCNaluType.kSliceVPS */
                    && type !== 33 /* HEVCNaluType.kSliceSPS */
                    && type !== 34 /* HEVCNaluType.kSlicePPS */
                    && type !== 35 /* HEVCNaluType.kSliceAUD */;
            });
        }
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        extradata,
        key
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? (extradata[21] & 0x03) : NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    let key = false;
    if (extradata) {
        const result = extradata2VpsSpsPps(extradata);
        vpss = result.vpss;
        spss = result.spss;
        ppss = result.ppss;
        key = true;
    }
    const nalus = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        nalus.push(bufferReader.readBuffer(length));
    }
    let length = vpss.reduce((prev, vps) => {
        return prev + 4 + vps.length;
    }, 0);
    length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length + 7);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length + 7);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(35 /* HEVCNaluType.kSliceAUD */ << 1);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(vps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 7,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = (nalu[0] >>> 1) & 0x3f;
        if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss.push(nalu);
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
            ppss.push(nalu);
        }
        else if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
            vpss.push(nalu);
        }
    }
    if (spss.length || ppss.length || vpss.length) {
        const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[21] & 0x03);
        const { spss } = extradata2VpsSpsPps(extradata);
        if (spss.length) {
            const { profile, level, width, height } = parseSPS(spss[0]);
            stream.codecpar.profile = profile;
            stream.codecpar.level = level;
            stream.codecpar.width = width;
            stream.codecpar.height = height;
        }
    }
}
function isIDR(avpacket, naluLengthSize = 4) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return false;
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 2 /* BitFormat.ANNEXB */) {
        let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        return nalus.some((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            return type === 20 /* HEVCNaluType.kSliceIDR_N_LP */ || type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */;
        });
    }
    else {
        const size = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        let i = 0;
        while (i < (size - naluLengthSize)) {
            const type = (avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + (i + naluLengthSize)) >>> 1) & 0x3f;
            if (type === 20 /* HEVCNaluType.kSliceIDR_N_LP */ || type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */) {
                return true;
            }
            if (naluLengthSize === 4) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 3) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 2) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            i += naluLengthSize;
        }
        return false;
    }
}
function parseSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    let profile = 0;
    let level = 0;
    let width = 0;
    let height = 0;
    let bit_depth_luma_minus8 = 0;
    let bit_depth_chroma_minus8 = 0;
    let chroma_format_idc = 1;
    let general_profile_space = 0;
    let general_tier_flag = 0;
    let general_profile_compatibility_flags = 0;
    let constraint_flags = 0;
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nalu type
    bitReader.readU(6);
    // layerId
    bitReader.readU(6);
    // tid
    bitReader.readU(3);
    // sps_video_parameter_set_id
    bitReader.readU(4);
    // The value of sps_max_sub_layers_minus1 shall be in the range of 0 to 6, inclusive.
    const spsMaxSubLayersMinus1 = bitReader.readU(3);
    // sps_temporal_id_nesting_flag
    bitReader.readU1();
    let separate_colour_plane_flag = 0;
    if (spsMaxSubLayersMinus1 <= 6) {
        // profile_tier_level(sps_max_sub_layers_minus1)
        // general_profile_space
        general_profile_space = bitReader.readU(2);
        // general_tier_flag
        general_tier_flag = bitReader.readU1();
        // general_profile_idc
        profile = bitReader.readU(5);
        // general_profile_compatibility_flag[32]
        general_profile_compatibility_flags = bitReader.readU(32);
        /**
         * 1 general_progressive_source_flag
         * 1 general_interlaced_source_flag
         * 1 general_non_packed_constraint_flag
         * 1 general_frame_only_constraint_flag
         * 44 general_reserved_zero_44bits
         */
        constraint_flags = bitReader.readU(48);
        // general_level_idc
        level = bitReader.readU(8);
        const subLayerProfilePresentFlag = new Array(6);
        const subLayerLevelPresentFlag = new Array(6);
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            subLayerProfilePresentFlag[i] = bitReader.readU1();
            subLayerLevelPresentFlag[i] = bitReader.readU1();
        }
        if (spsMaxSubLayersMinus1 > 0) {
            for (let i = spsMaxSubLayersMinus1; i < 8; i++) {
                // reserved_zero_2bits
                bitReader.readU(2);
            }
        }
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            if (subLayerProfilePresentFlag[i]) {
                // sub_layer_profile_space[i]
                bitReader.readU(2);
                // sub_layer_tier_flag[i]
                bitReader.readU(1);
                // sub_layer_profile_idc[i]
                bitReader.readU(5);
                // sub_layer_profile_compatibility_flag[i][32]
                bitReader.readU(32);
                // sub_layer_progressive_source_flag[i]
                bitReader.readU(1);
                // sub_layer_interlaced_source_flag[i]
                bitReader.readU(1);
                // sub_layer_non_packed_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_frame_only_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_reserved_zero_44bits[i]
                bitReader.readU(44);
            }
            if (subLayerLevelPresentFlag[i]) {
                // sub_layer_level_idc[i]
                bitReader.readU(8);
            }
        }
        // "The  value  of sps_seq_parameter_set_id shall be in the range of 0 to 15, inclusive."
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        chroma_format_idc = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        if (chroma_format_idc === 3) {
            // separate_colour_plane_flag
            separate_colour_plane_flag = bitReader.readU(1);
        }
        width = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        height = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        const conformanceWindowFlag = bitReader.readU1();
        let confWinLeftOffset = 0;
        let confWinRightOffset = 0;
        let confWinTopOffset = 0;
        let confWinBottomOffset = 0;
        if (conformanceWindowFlag) {
            confWinLeftOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinRightOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinTopOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinBottomOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        }
        bit_depth_luma_minus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        bit_depth_chroma_minus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        let SubWidthC = 2;
        let SubHeightC = 2;
        if (chroma_format_idc === 0) {
            SubWidthC = SubHeightC = 0;
        }
        else if (chroma_format_idc === 2) {
            SubWidthC = 2;
            SubHeightC = 1;
        }
        else if (chroma_format_idc === 3) {
            SubWidthC = SubHeightC = 1;
        }
        const cropUnitX = SubWidthC * (1 << (bit_depth_luma_minus8 + 1));
        const cropUnitY = SubHeightC * (1 << (bit_depth_luma_minus8 + 1));
        width -= cropUnitX * (confWinLeftOffset + confWinRightOffset);
        height -= cropUnitY * (confWinTopOffset + confWinBottomOffset);
    }
    const log2_max_poc_lsb = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 4;
    const sublayer_ordering_info_flag = bitReader.readU1();
    const start = sublayer_ordering_info_flag ? 0 : spsMaxSubLayersMinus1;
    for (let i = start; i < (spsMaxSubLayersMinus1 + 1); i++) {
        // max_dec_pic_buffering
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // num_reorder_pics
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // max_latency_increase
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    }
    const log2_min_cb_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 3;
    const log2_diff_max_min_coding_block_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const log2_min_tb_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 2;
    const log2_diff_max_min_transform_block_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const log2_max_trafo_size = log2_diff_max_min_transform_block_size + log2_min_tb_size;
    const log2_ctb_size = log2_min_cb_size + log2_diff_max_min_coding_block_size;
    const log2_min_pu_size = log2_min_cb_size - 1;
    const ctb_width = (width + (1 << log2_ctb_size) - 1) >> log2_ctb_size;
    const ctb_height = (height + (1 << log2_ctb_size) - 1) >> log2_ctb_size;
    const ctb_size = ctb_width * ctb_height;
    const min_cb_width = width >> log2_min_cb_size;
    const min_cb_height = height >> log2_min_cb_size;
    const min_tb_width = width >> log2_min_tb_size;
    const min_tb_height = height >> log2_min_tb_size;
    const min_pu_width = width >> log2_min_pu_size;
    const min_pu_height = height >> log2_min_pu_size;
    return {
        profile,
        level,
        width,
        height,
        chroma_format_idc,
        bit_depth_luma_minus8,
        bit_depth_chroma_minus8,
        general_profile_space,
        general_tier_flag,
        general_profile_compatibility_flags,
        constraint_flags,
        separate_colour_plane_flag,
        log2_min_cb_size,
        log2_diff_max_min_coding_block_size,
        log2_min_tb_size,
        log2_diff_max_min_transform_block_size,
        log2_max_trafo_size,
        log2_ctb_size,
        log2_min_pu_size,
        ctb_width,
        ctb_height,
        ctb_size,
        min_cb_width,
        min_cb_height,
        min_tb_width,
        min_tb_height,
        min_pu_width,
        min_pu_height,
        log2_max_poc_lsb
    };
}
function parsePPS(pps) {
    if (!pps || pps.length < 3) {
        return;
    }
    let offset = 0;
    if (pps[0] === 0x00
        && pps[1] === 0x00
        && pps[2] === 0x00
        && pps[3] === 0x01) {
        offset = 4;
    }
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(pps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    const pps_pic_parameter_set_id = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const pps_seq_parameter_set_id = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const dependent_slice_segment_flag = bitReader.readU1();
    const output_flag_present_flag = bitReader.readU1();
    const num_extra_slice_header_bits = bitReader.readU(3);
    return {
        pps_pic_parameter_set_id,
        pps_seq_parameter_set_id,
        dependent_slice_segment_flag,
        output_flag_present_flag,
        num_extra_slice_header_bits
    };
}


/***/ }),

/***/ "./src/avformat/codecs/vp9.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vp9.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VP9Profile2Name: () => (/* binding */ VP9Profile2Name),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, generateExtradata */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");








const VP9Profile2Name = {
    [0 /* VP9Profile.Profile0 */]: 'Profile0',
    [1 /* VP9Profile.Profile1 */]: 'Profile1',
    [2 /* VP9Profile.Profile2 */]: 'Profile2',
    [3 /* VP9Profile.Profile3 */]: 'Profile3'
};
const LevelCapabilities = [
    { level: 10, maxResolution: 196608, maxFrameRate: 30 },
    { level: 11, maxResolution: 196608, maxFrameRate: 60 },
    { level: 20, maxResolution: 518400, maxFrameRate: 30 },
    { level: 21, maxResolution: 518400, maxFrameRate: 60 },
    { level: 30, maxResolution: 2073600, maxFrameRate: 30 },
    { level: 31, maxResolution: 2073600, maxFrameRate: 60 },
    { level: 40, maxResolution: 3686400, maxFrameRate: 30 },
    { level: 41, maxResolution: 3686400, maxFrameRate: 60 },
    { level: 50, maxResolution: 8294400, maxFrameRate: 30 },
    { level: 51, maxResolution: 8294400, maxFrameRate: 60 },
    { level: 60, maxResolution: 8847360, maxFrameRate: 30 },
    { level: 61, maxResolution: 8847360, maxFrameRate: 60 },
    { level: 70, maxResolution: 35389440, maxFrameRate: 30 },
    { level: 71, maxResolution: 35389440, maxFrameRate: 60 }
];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution && fps <= level.maxFrameRate) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 byte profile
 * - 1 byte level
 * - 4 bit bitdepth
 * - 3 bit chroma_subsampling
 * - 1 bit full_range_flag
 * - 1 byte color_primaries
 * - 1 byte color_trc
 * - 1 byte color_space
 *
 * @param extradata
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    const profile = bitReader.readU(8);
    const level = bitReader.readU(8);
    let bitDepth = bitReader.readU(4);
    const chromaSubsampling = bitReader.readU(3);
    const fullRangeFlag = bitReader.readU1();
    const colorPrimaries = bitReader.readU(8);
    const colorTrc = bitReader.readU(8);
    const colorSpace = bitReader.readU(8);
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRangeFlag,
        colorPrimaries,
        colorTrc,
        colorSpace
    };
}
function getVpccFeature(codecpar) {
    let profile = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48);
    let level = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52);
    if (level === avutil_constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE) {
        level = getLevelByResolution(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 56), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 60), (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(codecpar + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational)));
    }
    const desc = avutil_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__.PixelFormatDescriptorsMap[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28)];
    let bitDepth = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 40);
    let chromaSubsampling = 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */;
    if (desc) {
        bitDepth = desc.comp[0].depth;
        if (desc.log2ChromaW === 1 && desc.log2ChromaH === 1) {
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 100) === 1 /* AVChromaLocation.AVCHROMA_LOC_LEFT */) {
                chromaSubsampling = 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */;
            }
        }
        else if (desc.log2ChromaW === 1 && desc.log2ChromaH === 0) {
            chromaSubsampling = 2 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_422 */;
        }
        else if (desc.log2ChromaW === 0 && desc.log2ChromaH === 0) {
            chromaSubsampling = 3 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_444 */;
        }
    }
    const fullRange = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 84) === 2 /* AVColorRange.AVCOL_RANGE_JPEG */ ? 1 : 0;
    if (profile === avutil_constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE && bitDepth) {
        if (chromaSubsampling == 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */
            || chromaSubsampling == 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */) {
            profile = (bitDepth == 8) ? 0 /* VP9Profile.Profile0 */ : 2 /* VP9Profile.Profile2 */;
        }
        else {
            profile = (bitDepth == 8) ? 1 /* VP9Profile.Profile1 */ : 3 /* VP9Profile.Profile3 */;
        }
    }
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRange
    };
}
function generateExtradata(codecpar) {
    const ioWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__["default"](new Uint8Array(8));
    const vpcc = getVpccFeature(codecpar);
    ioWriter.writeUint8(vpcc.profile);
    ioWriter.writeUint8(vpcc.level);
    ioWriter.writeUint8((vpcc.bitDepth << 4) | (vpcc.chromaSubsampling << 1) | vpcc.fullRange);
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 88));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 92));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 96));
    ioWriter.writeUint16(0);
    return ioWriter.getWroteBuffer();
}


/***/ }),

/***/ "./src/avformat/codecs/vvc.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vvc.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAVCodecParametersBySps: () => (/* binding */ parseAVCodecParametersBySps),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports extradata2VpsSpsPps, vpsSpsPps2Extradata, annexbExtradata2AvccExtradata, avcc2Annexb, isIDR */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");


/*
 * libmedia vvc util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */











const NALULengthSizeMinusOne = 3;
function parsePTL(bitReader) {
    const olsIdx = bitReader.readU(9);
    const numSublayers = bitReader.readU(3);
    const constantFrameRate = bitReader.readU(2);
    const chromaFormatIdc = bitReader.readU(2);
    const bitDepthMinus8 = bitReader.readU(3);
    bitReader.readU(5);
    // VvcPTLRecord
    bitReader.readU(2);
    const num_bytes_constraint_info = bitReader.readU(6);
    const generalProfileIdc = bitReader.readU(7);
    const generalTierFlag = bitReader.readU(1);
    const generalLevelIdc = bitReader.readU(8);
    const ptlFrameOnlyConstraintFlag = bitReader.readU(1);
    const ptlMultilayerEnabledFlag = bitReader.readU(1);
    const generalConstraintInfo = [];
    const sublayerLevelIdc = [];
    if (num_bytes_constraint_info) {
        for (let i = 0; i < num_bytes_constraint_info - 1; i++) {
            generalConstraintInfo[i] = bitReader.readU(8);
        }
        generalConstraintInfo[num_bytes_constraint_info - 1] = bitReader.readU(6);
    }
    else {
        bitReader.readU(6);
    }
    if (numSublayers > 1) {
        let ptl_sublayer_present_mask = 0;
        for (let j = numSublayers - 2; j >= 0; --j) {
            const val = bitReader.readU(1);
            ptl_sublayer_present_mask |= val << j;
        }
        for (let j = numSublayers; j <= 8 && numSublayers > 1; ++j) {
            bitReader.readU(1);
        }
        for (let j = numSublayers - 2; j >= 0; --j) {
            if (ptl_sublayer_present_mask & (1 << j)) {
                sublayerLevelIdc[j] = bitReader.readU(8);
            }
        }
    }
    const ptl_num_sub_profiles = bitReader.readU(8);
    const generalSubProfileIdc = [];
    if (ptl_num_sub_profiles) {
        for (let i = 0; i < ptl_num_sub_profiles; i++) {
            generalSubProfileIdc.push(bitReader.readU(8));
        }
    }
    const maxPictureWidth = bitReader.readU(16);
    const maxPictureHeight = bitReader.readU(16);
    const avgFramerate = bitReader.readU(16);
    return {
        olsIdx,
        numSublayers,
        bitDepthMinus8,
        chromaFormatIdc,
        constantFrameRate,
        generalProfileIdc,
        generalTierFlag,
        generalLevelIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        generalConstraintInfo,
        sublayerLevelIdc,
        generalSubProfileIdc,
        maxPictureWidth,
        maxPictureHeight,
        avgFramerate
    };
}
/**
 *
 * vvcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 5   reserved (11111)
 * - 2   lengthSizeMinusOne
 * - 1   ptl_present_flag
 * if ptl_present_flag
 *   - 9   ols_idx
 *   - 3  num_sublayers
 *   - 2  constant_frame_rate
 *   - 2  chroma_format_idc
 *   - 3  bit_depth_minus8
 *   - 5  reserved (11111)
 *   VvcPTLRecord
 *   - 2 reserved (11)
 *   - 6 num_bytes_constraint_info
 *   - 7 general_profile_idc
 *   - 1 general_tier_flag
 *   - 8 general_level_idc
 *   - 1 general_level_idc
 *   - 1 ptl_multilayer_enabled_flag
 *   if num_bytes_constraint_info > 0
 *      for (i = 0; i < num_bytes_constraint_info - 1; i++)
 *        - 8 general_constraint_info[i]
 *      - 6 general_constraint_info[num_bytes_constraint_info - 1]
 *   else
 *      - 6 reserved
 *   if num_sublayers > 1
 *      - num_sublayers - 2 ptl_sublayer_level_present_flag
 *      - 8 - num_sublayers + 1 ptl_reserved_zero_bit
 *      for (i = num_sublayers -2; i >= 0; i--)
 *        if ptl_sublayer_present_mask & (1 << i)
 *          - 8 sublayer_level_idc[i]
 *    - 8 ptl_num_sub_profiles
 *    if ptl_num_sub_profiles
 *      for (i = 0; i < ptl_num_sub_profiles; i++)
 *        - 32 general_sub_profile_idc[i]
 *    - 16 max_picture_width
 *    - 16 max_picture_height
 *    - 16 avg_frame_rate
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 2   reserved (0)
 * - 5   NAL_unit_type
 * if nalu_type != VVC_NALU_DEC_PARAM && nalu_type != VVC_NALU_OPI
 *    - 16  numNalus
 * else
 *   numNalus = 1
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata, true);
    const ptlPresentFlag = bufferReader.readUint8() & 0x01;
    if (ptlPresentFlag) {
        const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"]();
        bitReader.appendBuffer(extradata.subarray(1));
        parsePTL(bitReader);
        bufferReader.skip(bitReader.getPos());
    }
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x1f;
        let count = 1;
        if (naluType !== 13 /* VVCNaluType.kDCI_NUT */ && naluType !== 12 /* VVCNaluType.kOPI_NUT */) {
            count = bufferReader.readUint16();
        }
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 14 /* VVCNaluType.kVPS_NUT */) {
            vpss = list;
        }
        else if (naluType === 15 /* VVCNaluType.kSPS_NUT */) {
            spss = list;
        }
        else if (naluType === 16 /* VVCNaluType.kPPS_NUT */) {
            ppss = list;
        }
    }
    return {
        vpss,
        spss,
        ppss
    };
}
function vpsSpsPps2Extradata(vpss, spss, ppss) {
    const sps = spss[0];
    let ptl;
    if (sps) {
        const spsParams = parseSPS(sps);
        let generalConstraintInfo = spsParams.generalConstraintInfo;
        if (!generalConstraintInfo.length) {
            generalConstraintInfo = new Array(12).fill(0);
        }
        const biWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_11__["default"]();
        biWriter.writeU(9, 0);
        biWriter.writeU(3, spsParams.spsMaxSublayersMinus1 + 1);
        biWriter.writeU(2, 1);
        biWriter.writeU(2, spsParams.chromaFormatIdc);
        biWriter.writeU(3, spsParams.bitDepthMinus8);
        biWriter.writeU(5, 0b11111);
        biWriter.writeU(2, 0);
        biWriter.writeU(6, generalConstraintInfo.length);
        biWriter.writeU(7, spsParams.profile);
        biWriter.writeU1(spsParams.tierFlag);
        biWriter.writeU(8, spsParams.level);
        biWriter.writeU1(spsParams.ptlFrameOnlyConstraintFlag);
        biWriter.writeU1(spsParams.ptlMultilayerEnabledFlag);
        if (generalConstraintInfo.length) {
            for (let i = 0; i < generalConstraintInfo.length - 1; i++) {
                biWriter.writeU(8, generalConstraintInfo[i]);
            }
            biWriter.writeU(6, generalConstraintInfo[generalConstraintInfo.length - 1]);
        }
        else {
            biWriter.writeU(6, 0b111111);
        }
        if (spsParams.spsMaxSublayersMinus1 + 1 > 1) {
            let ptl_sublayer_level_present_flags = 0;
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                ptl_sublayer_level_present_flags = (ptl_sublayer_level_present_flags << 1 | spsParams.ptlSublayerLevelPresentFlag[i]);
            }
            biWriter.writeU(spsParams.spsMaxSublayersMinus1, ptl_sublayer_level_present_flags);
            for (let j = spsParams.spsMaxSublayersMinus1 + 1; j <= 8 && spsParams.spsMaxSublayersMinus1 > 0; ++j) {
                biWriter.writeU1(0);
            }
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                if (spsParams.ptlSublayerLevelPresentFlag[i]) {
                    biWriter.writeU(8, spsParams.sublayerLevelIdc[i]);
                }
            }
        }
        biWriter.writeU(8, spsParams.generalSubProfileIdc.length);
        for (let i = 0; i < spsParams.generalSubProfileIdc.length; i++) {
            biWriter.writeU(8, spsParams.sublayerLevelIdc[i]);
        }
        biWriter.writeU(16, spsParams.width);
        biWriter.writeU(16, spsParams.height);
        biWriter.writeU(16, 0);
        biWriter.padding();
        ptl = biWriter.getBuffer().subarray(0, biWriter.getPointer());
    }
    let length = 2 + (ptl ? ptl.length : 0);
    if (vpss.length) {
        // type + count
        length += 3;
        length = vpss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (spss.length) {
        // type + count
        length += 3;
        length = spss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (ppss.length) {
        // type + count
        length += 3;
        length = ppss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer, true);
    bufferWriter.writeUint8(NALULengthSizeMinusOne << 1 | (ptl ? 1 : 0) | 0xf8);
    if (ptl) {
        bufferWriter.writeBuffer(ptl);
    }
    // numOfArrays
    let numOfArrays = 0;
    if (vpss.length) {
        numOfArrays++;
    }
    if (spss.length) {
        numOfArrays++;
    }
    if (ppss.length) {
        numOfArrays++;
    }
    bufferWriter.writeUint8(numOfArrays);
    // vps
    if (vpss.length) {
        bufferWriter.writeUint8((128) | 14 /* VVCNaluType.kVPS_NUT */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 15 /* VVCNaluType.kSPS_NUT */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 16 /* VVCNaluType.kPPS_NUT */);
        bufferWriter.writeUint16(ppss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
            bufferWriter.writeUint16(pps.length);
            bufferWriter.writeBuffer(pps);
        });
    }
    return buffer;
}
function annexbExtradata2AvccExtradata(data) {
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            return vpsSpsPps2Extradata(vpss, spss, ppss);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 */
function annexb2Avcc(data) {
    let extradata;
    let key = false;
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[1] >>> 3) & 0x1f;
                return type !== 14 /* VVCNaluType.kVPS_NUT */
                    && type !== 15 /* VVCNaluType.kSPS_NUT */
                    && type !== 16 /* VVCNaluType.kPPS_NUT */
                    && type !== 20 /* VVCNaluType.kAUD_NUT */;
            });
        }
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (NALULengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (NALULengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu.subarray(0));
        const type = (nalu[1] >>> 3) & 0x1f;
        if (type === 8 /* VVCNaluType.kIDR_N_LP */
            || type === 7 /* VVCNaluType.kIDR_W_RADL */
            || type === 9 /* VVCNaluType.kCRA_NUT */
            || type === 10 /* VVCNaluType.kGDR_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length,
        extradata,
        key
    };
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? ((extradata[0] >>> 1) & 0x03) : NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    let key = false;
    if (extradata) {
        const result = extradata2VpsSpsPps(extradata);
        vpss = result.vpss;
        spss = result.spss;
        ppss = result.ppss;
        key = true;
    }
    const nalus = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        nalus.push(bufferReader.readBuffer(length));
    }
    let length = vpss.reduce((prev, vps) => {
        return prev + 4 + vps.length;
    }, 0);
    length = spss.reduce((prev, sps) => {
        return prev + 4 + sps.length;
    }, length);
    length = ppss.reduce((prev, pps) => {
        return prev + 4 + pps.length;
    }, length);
    length = nalus.reduce((prev, nalu, index) => {
        return prev + (index ? 3 : 4) + nalu.length;
    }, length);
    const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(length + 7);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(bufferPointer, length + 7);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](buffer);
    // AUD
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(0x00);
    bufferWriter.writeUint8(20 /* VVCNaluType.kAUD_NUT */ << 3);
    bufferWriter.writeUint8(0xf0);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(vps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(sps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(ppss, (pps) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(pps);
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
        const type = (nalu[1] >>> 3) & 0x1f;
        if (type === 8 /* VVCNaluType.kIDR_N_LP */
            || type === 7 /* VVCNaluType.kIDR_W_RADL */
            || type === 9 /* VVCNaluType.kCRA_NUT */
            || type === 10 /* VVCNaluType.kGDR_NUT */) {
            key = true;
        }
    });
    return {
        bufferPointer,
        length: length + 7,
        key
    };
}
function parseAvccExtraData(avpacket, stream) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if ((0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    const naluLengthSizeMinusOne = stream.metadata.naluLengthSizeMinusOne ?? NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](data);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = data.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length);
        bufferReader.skip(length);
        const naluType = (nalu[1] >>> 3) & 0x1f;
        if (naluType === 15 /* VVCNaluType.kSPS_NUT */) {
            spss.push(nalu);
        }
        else if (naluType === 16 /* VVCNaluType.kPPS_NUT */) {
            ppss.push(nalu);
        }
        else if (naluType === 14 /* VVCNaluType.kVPS_NUT */) {
            vpss.push(nalu);
        }
    }
    if (spss.length || ppss.length || vpss.length) {
        const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
        const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
    }
}
function parseAnnexbExtraData(avpacket, force = false) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) && !force) {
        return;
    }
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
    if (!(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.isAnnexb)(data)) {
        return;
    }
    let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)(data);
    if (nalus.length > 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (vpss.length && spss.length && ppss.length) {
            const extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            const extradataPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(extradataPointer, extradata.length, extradata);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradataPointer, extradata.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
    }
}
function parseAVCodecParametersBySps(stream, sps) {
    const { profile, level, width, height } = parseSPS(sps);
    stream.codecpar.profile = profile;
    stream.codecpar.level = level;
    stream.codecpar.width = width;
    stream.codecpar.height = height;
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[0] >>> 1) & 0x03;
        const { spss } = extradata2VpsSpsPps(extradata);
        if (spss.length) {
            parseAVCodecParametersBySps(stream, spss[0]);
        }
    }
}
function isIDR(avpacket, naluLengthSize = 4) {
    if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
        return false;
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 2 /* BitFormat.ANNEXB */) {
        let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        return nalus.some((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            return type === 8 /* VVCNaluType.kIDR_N_LP */ || type === 7 /* VVCNaluType.kIDR_W_RADL */;
        });
    }
    else {
        const size = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        let i = 0;
        while (i < (size - naluLengthSize)) {
            const type = (avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + (i + naluLengthSize + 1)) >>> 3) & 0x1f;
            if (type === 8 /* VVCNaluType.kIDR_N_LP */ || type === 7 /* VVCNaluType.kIDR_W_RADL */) {
                return true;
            }
            if (naluLengthSize === 4) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 3) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 2) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.rb16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_12__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            i += naluLengthSize;
        }
        return false;
    }
}
function parseSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    let profile = 0;
    let level = 0;
    let width = 0;
    let height = 0;
    let bitDepthMinus8 = 0;
    let chromaFormatIdc = 1;
    let generalProfileSpace = 0;
    let tierFlag = 0;
    let ptlFrameOnlyConstraintFlag = 0;
    let ptlMultilayerEnabledFlag = 0;
    const generalConstraintInfo = [];
    const ptlSublayerLevelPresentFlag = [];
    const sublayerLevelIdc = [];
    const generalSubProfileIdc = [];
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nuh_reserved_zero_bit
    bitReader.readU1();
    // layerId
    bitReader.readU(6);
    // nalu type
    bitReader.readU(5);
    // tid
    bitReader.readU(3);
    // sps_seq_parameter_set_id && sps_video_parameter_set_id
    bitReader.readU(8);
    const spsMaxSublayersMinus1 = bitReader.readU(3);
    chromaFormatIdc = bitReader.readU(2);
    const sps_log2_ctu_size_minus5 = bitReader.readU(2);
    const sps_ptl_dpb_hrd_params_present_flag = bitReader.readU(1);
    if (sps_ptl_dpb_hrd_params_present_flag) {
        profile = bitReader.readU(7);
        tierFlag = bitReader.readU(1);
        level = bitReader.readU(8);
        ptlFrameOnlyConstraintFlag = bitReader.readU(1);
        ptlMultilayerEnabledFlag = bitReader.readU(1);
        const gci_present_flag = bitReader.readU(1);
        if (gci_present_flag) {
            for (let j = 0; j < 8; j++) {
                generalConstraintInfo[j] = bitReader.readU(8);
            }
            generalConstraintInfo[8] = bitReader.readU(7);
            const gci_num_reserved_bits = bitReader.readU(8);
            bitReader.readU(gci_num_reserved_bits);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            ptlSublayerLevelPresentFlag[i] = bitReader.readU(1);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            if (ptlSublayerLevelPresentFlag[i]) {
                sublayerLevelIdc[i] = bitReader.readU(8);
            }
        }
        const ptl_num_sub_profiles = bitReader.readU(8);
        if (ptl_num_sub_profiles) {
            for (let i = 0; i < ptl_num_sub_profiles; i++) {
                generalSubProfileIdc[i] = bitReader.readU(32);
            }
        }
    }
    // sps_gdr_enabled_flag
    bitReader.readU1();
    const sps_ref_pic_resampling_enabled_flag = bitReader.readU1();
    if (sps_ref_pic_resampling_enabled_flag) {
        // sps_res_change_in_clvs_allowed_flag
        bitReader.readU1();
    }
    const sps_pic_width_max_in_luma_samples = width = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const sps_pic_height_max_in_luma_samples = height = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    if (bitReader.readU1()) {
        // sps_conf_win_left_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_right_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_top_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // sps_conf_win_bottom_offset
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    }
    if (bitReader.readU1()) {
        const sps_num_subpics_minus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        const ctb_log2_size_y = sps_log2_ctu_size_minus5 + 5;
        const ctb_size_y = 1 << ctb_log2_size_y;
        const tmp_width_val = sps_pic_width_max_in_luma_samples / (1 << ctb_log2_size_y);
        const tmp_height_val = sps_pic_height_max_in_luma_samples / (1 << ctb_log2_size_y);
        const wlen = Math.ceil(Math.log2(tmp_width_val));
        const hlen = Math.ceil(Math.log2(tmp_height_val));
        let sps_subpic_id_len = 0;
        let sps_subpic_same_size_flag = 0;
        let sps_independent_subpics_flag = 0;
        // sps_num_subpics_minus1
        if (sps_num_subpics_minus1 > 0) {
            sps_independent_subpics_flag = bitReader.readU1();
            sps_subpic_same_size_flag = bitReader.readU1();
        }
        for (let i = 0; sps_num_subpics_minus1 > 0 && i <= sps_num_subpics_minus1; i++) {
            if (!sps_subpic_same_size_flag || i == 0) {
                if (i > 0 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i > 0 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
            }
            if (!sps_independent_subpics_flag) {
                // sps_subpic_treated_as_pic_flag && sps_loop_filter_across_subpic_enabled_flag
                bitReader.readU(2);
            }
        }
        sps_subpic_id_len = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 1;
        // sps_subpic_id_mapping_explicitly_signalled_flag
        if (bitReader.readU(1)) {
            // sps_subpic_id_mapping_present_flag
            if (bitReader.readU(1)) {
                for (let i = 0; i <= sps_num_subpics_minus1; i++) {
                    // sps_subpic_id[i]
                    bitReader.readU(sps_subpic_id_len);
                }
            }
        }
    }
    bitDepthMinus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    // sps_entropy_coding_sync_enabled_flag
    bitReader.readU(1);
    // sps_entry_point_offsets_present_flag
    bitReader.readU(1);
    const sps_log2_max_pic_order_cnt_lsb_minus4 = bitReader.readU(4);
    const sps_poc_msb_cycle_flag = bitReader.readU(1);
    let sps_poc_msb_cycle_len_minus1 = 0;
    if (sps_poc_msb_cycle_flag) {
        sps_poc_msb_cycle_len_minus1 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    }
    const sps_extra_ph_bit_present_flag = [];
    const sps_num_extra_ph_bytes = bitReader.readU(2);
    for (let i = 0; i < (sps_num_extra_ph_bytes * 8); i++) {
        sps_extra_ph_bit_present_flag[i] = bitReader.readU(1);
    }
    return {
        profile,
        level,
        width,
        height,
        chromaFormatIdc,
        bitDepthMinus8,
        generalProfileSpace,
        tierFlag,
        generalConstraintInfo,
        generalSubProfileIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        spsMaxSublayersMinus1,
        ptlSublayerLevelPresentFlag,
        sublayerLevelIdc,
        sps_log2_max_pic_order_cnt_lsb_minus4,
        sps_poc_msb_cycle_flag,
        sps_poc_msb_cycle_len_minus1,
        sps_num_extra_ph_bytes,
        sps_extra_ph_bit_present_flag
    };
}
function parseExtraData(extradata) {
    if (extradata[0] === 0 && extradata[1] === 0 && extradata[2] === 0 && extradata[3] === 1) {
        extradata = annexbExtradata2AvccExtradata(extradata);
    }
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"]();
    bitReader.appendBuffer(extradata);
    const ptlPresentFlag = bitReader.readU(8) & 0x01;
    if (ptlPresentFlag) {
        return parsePTL(bitReader);
    }
    return {};
}


/***/ }),

/***/ "./src/avformat/formats/IFlvFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IFlvFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFlvFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flv/FlvHeader */ "./src/avformat/formats/flv/FlvHeader.ts");
/* harmony import */ var _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flv/FlvScriptTag */ "./src/avformat/formats/flv/FlvScriptTag.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _flv_flv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flv/flv */ "./src/avformat/formats/flv/flv.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var _codecs_av1__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../codecs/av1 */ "./src/avformat/codecs/av1.ts");
/* harmony import */ var _codecs_vp9__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../codecs/vp9 */ "./src/avformat/codecs/vp9.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IFlvFormat.ts";


/*
 * libmedia flv decoder
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */




















class IFlvFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_13__["default"] {
    type = 0 /* AVFormat.FLV */;
    header;
    script;
    options;
    firstTagPos;
    constructor(options = {}) {
        super();
        this.header = new _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.script = new _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.options = options;
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
    }
    async readHeader(formatContext) {
        try {
            const signature = await formatContext.ioReader.peekString(3);
            if (signature !== 'FLV') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error('the file format is not flv', cheap__fileName__0, 101);
                return avutil_error__WEBPACK_IMPORTED_MODULE_12__.DATA_INVALID;
            }
            await this.header.read(formatContext.ioReader);
            const prev = await formatContext.ioReader.readUint32();
            if (prev !== 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn('the previousTagSize0 is not 0', cheap__fileName__0, 108);
            }
            let ret = 0;
            const type = await formatContext.ioReader.peekUint8();
            if (type === 18 /* FlvTag.SCRIPT */) {
                await formatContext.ioReader.skip(1);
                const size = await formatContext.ioReader.readUint24();
                await formatContext.ioReader.skip(7);
                ret = await this.script.read(formatContext.ioReader, size);
            }
            if (ret >= 0) {
                this.firstTagPos = formatContext.ioReader.getPos();
            }
            return ret;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error(error.message, cheap__fileName__0, 126);
            return formatContext.ioReader.error;
        }
    }
    async readCodecConfigurationRecord(formatContext, stream, len) {
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = len;
        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapUint8Array)(data, len).slice();
        if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
            _codecs_h264__WEBPACK_IMPORTED_MODULE_6__.parseAVCodecParameters(stream);
        }
        else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
            _codecs_hevc__WEBPACK_IMPORTED_MODULE_8__.parseAVCodecParameters(stream);
        }
        else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
            _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__.parseAVCodecParameters(stream);
        }
        else if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
            _codecs_av1__WEBPACK_IMPORTED_MODULE_10__.parseAVCodecParameters(stream);
        }
        else if (stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
            _codecs_vp9__WEBPACK_IMPORTED_MODULE_11__.parseAVCodecParameters(stream);
        }
    }
    async readAVPacketData(formatContext, stream, avpacket, len) {
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_16__.addAVPacketData)(avpacket, data, len);
        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
        if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
            _codecs_h264__WEBPACK_IMPORTED_MODULE_6__.parseAvccExtraData(avpacket, stream);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
        }
        else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
            _codecs_hevc__WEBPACK_IMPORTED_MODULE_8__.parseAvccExtraData(avpacket, stream);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
        }
        else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
            _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__.parseAvccExtraData(avpacket, stream);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
        }
    }
    async readAVPacket_(formatContext, avpacket) {
        const now = formatContext.ioReader.getPos();
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, now);
        const type = (await formatContext.ioReader.readUint8()) & 0x1f;
        const size = await formatContext.ioReader.readUint24();
        let timestamp = await formatContext.ioReader.readUint24();
        const timestampExt = await formatContext.ioReader.readUint8();
        if (timestampExt) {
            timestamp = (timestampExt << 24) | timestamp;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, BigInt(Math.floor(timestamp))), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, BigInt(Math.floor(timestamp)));
        // streamId 总是 0
        await formatContext.ioReader.skip(3);
        if (type === 8 /* FlvTag.AUDIO */) {
            let stream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
            if (stream) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            const audioHeader = await formatContext.ioReader.readUint8();
            if (stream) {
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    const packetType = await formatContext.ioReader.readUint8();
                    if (packetType === 0 /* flvAAC.AACPacketType.AAC_SEQUENCE_HEADER */) {
                        const len = size - 2;
                        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
                        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_16__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, data, len);
                        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
                        // aac.parseAVCodecParameters(stream, mapUint8Array(data, len))
                    }
                    else {
                        await this.readAVPacketData(formatContext, stream, avpacket, size - 2);
                    }
                }
                else {
                    await this.readAVPacketData(formatContext, stream, avpacket, size - 1);
                }
            }
            else {
                stream = formatContext.createStream();
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                stream.timeBase.den = 1000;
                stream.timeBase.num = 1;
                stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16);
                if (this.script.onMetaData.duration) {
                    stream.duration = BigInt(Math.floor(this.script.onMetaData.duration * 1000));
                }
                stream.codecpar.chLayout.nbChannels = (audioHeader & 0x01) === 1 ? 2 : 1;
                stream.codecpar.sampleRate = 44100 << ((audioHeader & 0x0c) >>> 2) >> 3;
                stream.codecpar.bitsPerCodedSample = (audioHeader & 0x02) ? 16 : 8;
                const flvAudioCodecId = (audioHeader & 0xf0) >> 4;
                // FLV_CODECID_PCM
                if (flvAudioCodecId === 0) {
                    stream.codecpar.codecId = stream.codecpar.bitsPerCodedSample === 8 ? 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */ : 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                }
                // FLV_CODECID_PCM_LE
                else if (flvAudioCodecId === 3) {
                    stream.codecpar.codecId = stream.codecpar.bitsPerCodedSample === 8 ? 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */ : 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                }
                else {
                    stream.codecpar.codecId = _flv_flv__WEBPACK_IMPORTED_MODULE_5__.FlvAudioCodecType2AVCodecID[flvAudioCodecId];
                }
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    const packetType = await formatContext.ioReader.readUint8();
                    if (packetType === 0 /* flvAAC.AACPacketType.AAC_SEQUENCE_HEADER */) {
                        const len = size - 2;
                        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
                        stream.codecpar.extradata = data;
                        stream.codecpar.extradataSize = len;
                        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
                        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapUint8Array)(data, len).slice();
                        _codecs_aac__WEBPACK_IMPORTED_MODULE_7__.parseAVCodecParameters(stream);
                    }
                    else {
                        await this.readAVPacketData(formatContext, stream, avpacket, size - 2);
                    }
                }
                else {
                    if (stream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                        stream.codecpar.sampleRate = 16000;
                        stream.codecpar.chLayout.nbChannels = 1;
                    }
                    else if (stream.codecpar.codecId === 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */
                        || stream.codecpar.codecId === 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */) {
                        stream.codecpar.sampleRate = 8000;
                    }
                    await this.readAVPacketData(formatContext, stream, avpacket, size - 1);
                }
                if (this.onStreamAdd) {
                    this.onStreamAdd(stream);
                }
            }
        }
        else if (type === 9 /* FlvTag.VIDEO */) {
            let stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
            if (stream) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            }
            const videoHeader = await formatContext.ioReader.readUint8();
            if (stream) {
                if ((((videoHeader & 0x70) >> 4)) === 1) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
                // https://veovera.github.io/enhanced-rtmp/enhanced-rtmp.pdf
                if (videoHeader & 0x80) {
                    await formatContext.ioReader.skip(4);
                    const packetType = videoHeader & 0x0f;
                    if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
                    }
                    if (packetType === 0 /* PacketTypeExt.PacketTypeSequenceStart */) {
                        const len = size - 5;
                        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
                        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_16__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, data, len);
                        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
                    }
                    else if (packetType === 2 /* PacketTypeExt.PacketTypeSequenceEnd */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                    }
                    else if (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */ || packetType === 3 /* PacketTypeExt.PacketTypeCodedFramesX */) {
                        if (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */ && (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */ || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)) {
                            const ct = await formatContext.ioReader.readUint24();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) + BigInt(Math.floor(ct)));
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 8);
                        }
                        else {
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 5);
                        }
                    }
                }
                else {
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
                        const packetType = await formatContext.ioReader.readUint8();
                        const ct = await formatContext.ioReader.readUint24();
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) + BigInt(Math.floor(ct)));
                        if (packetType === 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */) {
                            const len = size - 5;
                            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_15__.avMalloc)(len);
                            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_16__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, data, len);
                            await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapSafeUint8Array)(data, len));
                        }
                        else if (packetType === 2 /* AVCPacketType.AVC_END_OF_ENQUENCE */) {
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                        }
                        else {
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 5);
                        }
                    }
                    else {
                        await this.readAVPacketData(formatContext, stream, avpacket, size - 1);
                    }
                }
            }
            else {
                stream = formatContext.createStream();
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                stream.timeBase.den = 1000;
                stream.timeBase.num = 1;
                stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16);
                if (this.script.onMetaData.duration) {
                    stream.duration = BigInt(Math.floor(this.script.onMetaData.duration * 1000));
                }
                if (this.script.onMetaData.width > 0) {
                    stream.codecpar.width = this.script.onMetaData.width;
                }
                if (this.script.onMetaData.height > 0) {
                    stream.codecpar.height = this.script.onMetaData.height;
                }
                if ((((videoHeader & 0x70) >> 4)) === 1) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
                if (videoHeader & 0x80) {
                    const tag = await formatContext.ioReader.readUint32();
                    if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_17__["default"])('hvc1')) {
                        stream.codecpar.codecId = 173 /* AVCodecID.AV_CODEC_ID_HEVC */;
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
                    }
                    else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_17__["default"])('vvc1')) {
                        stream.codecpar.codecId = 196 /* AVCodecID.AV_CODEC_ID_VVC */;
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
                    }
                    else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_17__["default"])('av01')) {
                        stream.codecpar.codecId = 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
                    }
                    else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_17__["default"])('vp09')) {
                        stream.codecpar.codecId = 167 /* AVCodecID.AV_CODEC_ID_VP9 */;
                    }
                    const packetType = videoHeader & 0x0f;
                    if (packetType === 0 /* PacketTypeExt.PacketTypeSequenceStart */) {
                        await this.readCodecConfigurationRecord(formatContext, stream, size - 5);
                    }
                    else if (packetType === 2 /* PacketTypeExt.PacketTypeSequenceEnd */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                    }
                    else if (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */ || packetType === 3 /* PacketTypeExt.PacketTypeCodedFramesX */) {
                        if (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */ && (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */ || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)) {
                            const ct = await formatContext.ioReader.readUint24();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) + BigInt(Math.floor(ct)));
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 8);
                        }
                        else {
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 5);
                        }
                    }
                }
                else {
                    stream.codecpar.codecId = _flv_flv__WEBPACK_IMPORTED_MODULE_5__.FlvVideoCodecType2AVCodecID[videoHeader & 0x0f];
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
                        const packetType = await formatContext.ioReader.readUint8();
                        const ct = await formatContext.ioReader.readUint24();
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) + BigInt(Math.floor(ct)));
                        if (packetType === 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */) {
                            await this.readCodecConfigurationRecord(formatContext, stream, size - 5);
                        }
                        else if (packetType === 2 /* AVCPacketType.AVC_END_OF_ENQUENCE */) {
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                        }
                        else {
                            await this.readAVPacketData(formatContext, stream, avpacket, size - 5);
                        }
                    }
                    else {
                        await this.readAVPacketData(formatContext, stream, avpacket, size - 1);
                    }
                }
                if (this.onStreamAdd) {
                    this.onStreamAdd(stream);
                }
            }
        }
        else if (type === 18 /* FlvTag.SCRIPT */) {
            let ret = await this.script.read(formatContext.ioReader, size);
            if (ret < 0) {
                return ret;
            }
            return await this.readAVPacket_(formatContext, avpacket);
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`invalid tag type: ${type}, try to sync to next tag`, cheap__fileName__0, 458);
            await this.syncTag(formatContext);
            return this.readAVPacket_(formatContext, avpacket);
        }
        const tagSize = formatContext.ioReader.getPos() - now;
        const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
        if (tagSize !== prev) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`tag ${type} size not match, size: ${tagSize}, previousTagSize: ${prev}`, cheap__fileName__0, 467);
            // 数据不合法，返回错误
            return avutil_error__WEBPACK_IMPORTED_MODULE_12__.DATA_INVALID;
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, 1000);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, 1);
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error(error.message, cheap__fileName__0, 483);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncTag(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_19__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        while (true) {
            try {
                const byte = await formatContext.ioReader.readUint8();
                if (byte === 8 /* FlvTag.AUDIO */ || byte === 9 /* FlvTag.VIDEO */) {
                    pos = formatContext.ioReader.getPos() - BigInt(1);
                    const size = await formatContext.ioReader.readUint24();
                    if (size > 10485760) {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        continue;
                    }
                    await formatContext.ioReader.skip(7 + size);
                    const tagSize = formatContext.ioReader.getPos() - pos;
                    const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                    if (tagSize === prev) {
                        let count = 0;
                        while (count <= analyzeCount) {
                            const now = formatContext.ioReader.getPos();
                            const type = await formatContext.ioReader.readUint8();
                            if (type === 8 /* FlvTag.AUDIO */ || type === 9 /* FlvTag.VIDEO */ || type === 18 /* FlvTag.SCRIPT */) {
                                const size = await formatContext.ioReader.readUint24();
                                await formatContext.ioReader.skip(7 + size);
                                const tagSize = formatContext.ioReader.getPos() - now;
                                const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                                if (tagSize === prev) {
                                    count++;
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        if (count < analyzeCount) {
                            await formatContext.ioReader.seek(pos + BigInt(1));
                            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_19__.NOPTS_VALUE_BIGINT;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        pos = avutil_constant__WEBPACK_IMPORTED_MODULE_19__.NOPTS_VALUE_BIGINT;
                        continue;
                    }
                }
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_19__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncTag(formatContext);
            }
            return now;
        }
        else {
            if (stream && stream.sampleIndexes.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_20__.binarySearch(stream.sampleIndexes, (item) => {
                    if (item.pts > timestamp) {
                        return -1;
                    }
                    return 1;
                });
                if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_19__.AV_MILLI_TIME_BASE_Q) < BigInt(10000)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_4__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 581);
                    await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                    return now;
                }
            }
            if (this.script.canSeek()) {
                const { pos, dts } = this.script.dts2Position(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_19__.AV_MILLI_TIME_BASE_Q) / BigInt(1000)));
                if (pos > 0) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_4__.debug(`seek in filepositions, found pts: ${dts}, pos: ${pos}`, cheap__fileName__0, 590);
                    await formatContext.ioReader.seek(BigInt(Math.floor(pos)));
                    const nextTag = await formatContext.ioReader.peekUint8();
                    if (nextTag !== 8 /* FlvTag.AUDIO */ && nextTag !== 9 /* FlvTag.VIDEO */ && nextTag !== 18 /* FlvTag.SCRIPT */) {
                        await this.syncTag(formatContext);
                    }
                    return now;
                }
            }
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 600);
            return (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_21__["default"])(formatContext, stream, timestamp, this.firstTagPos, this.readAVPacket.bind(this), this.syncTag.bind(this));
        }
    }
    getAnalyzeStreamsCount() {
        let count = 0;
        if (this.header.hasAudio) {
            count++;
        }
        if (this.header.hasVideo) {
            count++;
        }
        return count;
    }
}


/***/ }),

/***/ "./src/avformat/formats/IFormat.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/IFormat.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFormat)
/* harmony export */ });
/*
 * libmedia abstract format decoder
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
class IFormat {
    type = -1 /* AVFormat.UNKNOWN */;
    onStreamAdd;
    destroy(formatContext) { }
}


/***/ }),

/***/ "./src/avformat/formats/flv/FlvHeader.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/flv/FlvHeader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlvHeader)
/* harmony export */ });
/*
 * libmedia flv header format
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
class FlvHeader {
    /**
     * 3 bytes 签名
     */
    signature;
    /**
     * 1 bytes 版本，比如 0x01 表示 FLV 版本 1
     */
    version;
    /**
     * 1 bytes 第一位标记是否有视频，第 4 位标记是否有音频，其余位保留
     */
    flags;
    /**
     * 4 bytes FLV header 的大小，单位是字节，目前是 9
     */
    dataOffset;
    /**
     * 是否有视频
     */
    hasVideo;
    /**
     * 是否有音频
     */
    hasAudio;
    constructor() {
        this.signature = 'FLV';
        this.version = 1;
        this.flags = 0;
        this.dataOffset = 9;
        this.hasAudio = false;
        this.hasVideo = false;
    }
    async read(ioReader) {
        this.signature = await ioReader.readString(3);
        this.version = await ioReader.readUint8();
        this.flags = await ioReader.readUint8();
        this.dataOffset = await ioReader.readUint32();
        this.hasAudio = !!(this.flags & 0x04);
        this.hasVideo = !!(this.flags & 0x01);
    }
    write(ioWriter) {
        this.flags = 0;
        if (this.hasAudio) {
            this.flags |= 0x04;
        }
        if (this.hasVideo) {
            this.flags |= 0x01;
        }
        ioWriter.writeString(this.signature);
        ioWriter.writeUint8(this.version);
        ioWriter.writeUint8(this.flags);
        ioWriter.writeUint32(this.dataOffset);
    }
}


/***/ }),

/***/ "./src/avformat/formats/flv/FlvScriptTag.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/flv/FlvScriptTag.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlvScriptTag)
/* harmony export */ });
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _oflv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\flv\\FlvScriptTag.ts";








class FlvScriptTag {
    onMetaData;
    constructor() {
        this.onMetaData = {
            audiocodecid: 10,
            canSeekToEnd: false,
            width: 0,
            height: 0,
            stereo: true,
            videocodecid: 7
        };
    }
    async parseObject(ioReader, endPos) {
        const key = await ioReader.readString(await ioReader.readUint16());
        const value = await this.parseValue(ioReader, endPos);
        return {
            key,
            value
        };
    }
    async parseValue(ioReader, endPos) {
        const type = await ioReader.readUint8();
        let value;
        switch (type) {
            // double
            case 0:
                value = await ioReader.readDouble();
                break;
            // boolean
            case 1:
                value = await ioReader.readUint8() ? true : false;
                break;
            // string
            case 2:
                value = await ioReader.readString(await ioReader.readUint16());
                break;
            // object
            case 3:
                value = {};
                while (ioReader.getPos() < endPos) {
                    const { key, value: val } = await this.parseObject(ioReader, endPos);
                    value[key] = val;
                    if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
                        await ioReader.skip(3);
                        break;
                    }
                }
                break;
            // ECMA array type (Mixed array)
            case 8:
                value = {};
                // skip ECMAArrayLength(UI32)
                await ioReader.skip(4);
                while (ioReader.getPos() < endPos) {
                    const { key, value: val } = await this.parseObject(ioReader, endPos);
                    value[key] = val;
                    if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
                        await ioReader.skip(3);
                        break;
                    }
                }
                break;
            // ScriptDataObjectEnd
            case 9:
                value = null;
                break;
            // Strict array type
            case 10:
                value = [];
                const length = await ioReader.readUint32();
                for (let i = 0; i < length; i++) {
                    value.push(await this.parseValue(ioReader, endPos));
                }
                break;
            // Date
            case 11:
                const timestamp = await ioReader.readDouble();
                const localTimeOffset = await ioReader.readInt16();
                value = new Date(timestamp + localTimeOffset * 60 * 1000);
                break;
            // Long string type
            case 12:
                value = await ioReader.readString(await ioReader.readUint32());
                break;
            default:
        }
        return value;
    }
    async read(ioReader, size) {
        const now = ioReader.getPos();
        const endPos = now + BigInt(Math.floor(size));
        const key = await this.parseValue(ioReader, endPos);
        const value = await this.parseValue(ioReader, endPos);
        this[key] = value;
        const tagSize = Number(ioReader.getPos() - now);
        const prev = await ioReader.readUint32();
        if (tagSize + 11 !== prev) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_5__.warn(`script size not match, size: ${tagSize + 11}, previousTagSize: ${prev}`, cheap__fileName__0, 150);
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
        return 0;
    }
    writeValue(ioWriter, value) {
        // double
        if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.number(value)) {
            ioWriter.writeUint8(0);
            ioWriter.writeDouble(value);
        }
        else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.bigint(value)) {
            ioWriter.writeUint8(0);
            ioWriter.writeDouble(Number(value));
        }
        // boolean
        else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.boolean(value)) {
            ioWriter.writeUint8(1);
            ioWriter.writeUint8(value ? 1 : 0);
        }
        // string
        else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(value)) {
            // long string
            if (value.length >= 65536) {
                ioWriter.writeUint8(12);
                ioWriter.writeUint32(value.length);
                ioWriter.writeString(value);
            }
            // string
            else {
                ioWriter.writeUint8(2);
                ioWriter.writeUint16(value.length);
                ioWriter.writeString(value);
            }
        }
        // array type
        else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(value)) {
            ioWriter.writeUint8(10);
            ioWriter.writeUint32(value.length);
            common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(value, (value) => {
                this.writeValue(ioWriter, value);
            });
        }
        // object
        else if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.object(value)) {
            ioWriter.writeUint8(3);
            common_util_object__WEBPACK_IMPORTED_MODULE_3__.each(value, (item, key) => {
                ioWriter.writeUint16(key.length);
                ioWriter.writeString(key);
                this.writeValue(ioWriter, item);
            });
            // object end flag
            ioWriter.writeUint24(9);
        }
        else if (value instanceof Date) {
            ioWriter.writeUint8(11);
            ioWriter.writeDouble(value.getTime());
            ioWriter.writeInt16(0);
        }
    }
    computeSize() {
        const cache = [];
        const cacheWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__["default"]();
        cacheWriter.onFlush = (data) => {
            cache.push(data.slice());
            return 0;
        };
        this.writeValue(cacheWriter, 'onMetaData');
        this.writeValue(cacheWriter, this.onMetaData);
        cacheWriter.flush();
        const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__["default"])(Uint8Array, cache);
        return buffer.length;
    }
    write(ioWriter) {
        if (this.onMetaData) {
            const cache = [];
            const cacheWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__["default"]();
            cacheWriter.onFlush = (data) => {
                cache.push(data.slice());
                return 0;
            };
            this.writeValue(cacheWriter, 'onMetaData');
            this.writeValue(cacheWriter, this.onMetaData);
            cacheWriter.flush();
            const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__["default"])(Uint8Array, cache);
            const now = ioWriter.getPos();
            // tag header
            _oflv__WEBPACK_IMPORTED_MODULE_6__.writeTagHeader(ioWriter, 18 /* FlvTag.SCRIPT */, buffer.length, BigInt(0));
            // tag body
            ioWriter.writeBuffer(buffer);
            // previousTagSize
            ioWriter.writeUint32(Number(ioWriter.getPos() - now));
        }
    }
    dts2Position(dts) {
        if (this.canSeek()) {
            let index = -1;
            const times = this.onMetaData.keyframes.times;
            const position = this.onMetaData.keyframes.filepositions;
            let i;
            for (i = 0; i < times.length; i++) {
                if (times[i] === dts) {
                    index = i;
                    break;
                }
                else if (times[i] > dts) {
                    index = Math.max(i - 1, 0);
                    break;
                }
            }
            if (i && i === times.length) {
                index = times.length - 1;
            }
            return {
                pos: position[index],
                dts: times[index]
            };
        }
        return {
            pos: -1,
            dts: -1
        };
    }
    position2DTS(pos) {
        if (this.canSeek()) {
            let index = -1;
            const times = this.onMetaData.keyframes.times;
            const position = this.onMetaData.keyframes.filepositions;
            let i = 0;
            for (i = 0; i < position.length; i++) {
                if (position[i] > pos) {
                    index = i;
                    break;
                }
            }
            if (i === position.length) {
                return this.onMetaData.duration ?? times[times.length - 1];
            }
            return times[index];
        }
        return -1;
    }
    canSeek() {
        return !!(this.onMetaData.keyframes
            && this.onMetaData.keyframes.filepositions
            && this.onMetaData.keyframes.filepositions.length);
    }
}


/***/ }),

/***/ "./src/avformat/formats/flv/flv.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/flv/flv.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVCodecID2FlvCodecType: () => (/* binding */ AVCodecID2FlvCodecType),
/* harmony export */   FlvAudioCodecType2AVCodecID: () => (/* binding */ FlvAudioCodecType2AVCodecID),
/* harmony export */   FlvVideoCodecType2AVCodecID: () => (/* binding */ FlvVideoCodecType2AVCodecID)
/* harmony export */ });
/* unused harmony export FlvCodecHeaderLength */
/*
 * libmedia flv defined
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
const AVCodecID2FlvCodecType = {
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 10,
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: 2,
    [86051 /* AVCodecID.AV_CODEC_ID_SPEEX */]: 11,
    [69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */]: 1,
    [86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */]: 6,
    [65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */]: 7,
    [65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */]: 8,
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 7,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 12,
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: 13,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: 9,
    [4 /* AVCodecID.AV_CODEC_ID_H263 */]: 2,
    [86 /* AVCodecID.AV_CODEC_ID_FLASHSV */]: 3,
    [92 /* AVCodecID.AV_CODEC_ID_VP6F */]: 4,
    [106 /* AVCodecID.AV_CODEC_ID_VP6A */]: 5,
    [131 /* AVCodecID.AV_CODEC_ID_FLASHSV2 */]: 6
};
const FlvAudioCodecType2AVCodecID = {
    10: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    2: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    11: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    1: 69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */,
    4: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    5: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    6: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    7: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    8: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */
};
const FlvVideoCodecType2AVCodecID = {
    7: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    12: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    13: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    9: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    2: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    3: 86 /* AVCodecID.AV_CODEC_ID_FLASHSV */,
    4: 92 /* AVCodecID.AV_CODEC_ID_VP6F */,
    5: 106 /* AVCodecID.AV_CODEC_ID_VP6A */,
    6: 131 /* AVCodecID.AV_CODEC_ID_FLASHSV2 */
};
const FlvCodecHeaderLength = {
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 1,
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: 0,
    [86051 /* AVCodecID.AV_CODEC_ID_SPEEX */]: 0,
    [65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */]: 0,
    [65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */]: 0,
    [69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */]: 0,
    [86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */]: 0,
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 4,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: 4,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 4,
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: 4,
    [167 /* AVCodecID.AV_CODEC_ID_VP9 */]: 4,
    [225 /* AVCodecID.AV_CODEC_ID_AV1 */]: 4,
    [4 /* AVCodecID.AV_CODEC_ID_H263 */]: 0,
    [86 /* AVCodecID.AV_CODEC_ID_FLASHSV */]: 0,
    [92 /* AVCodecID.AV_CODEC_ID_VP6F */]: 0,
    [106 /* AVCodecID.AV_CODEC_ID_VP6A */]: 0,
    [131 /* AVCodecID.AV_CODEC_ID_FLASHSV2 */]: 0
};


/***/ }),

/***/ "./src/avformat/formats/flv/oflv.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/flv/oflv.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeTagHeader: () => (/* binding */ writeTagHeader)
/* harmony export */ });
/* unused harmony exports writeAudioTagDataHeader, writeVideoTagDataHeader, writeVideoTagExtDataHeader */
/* harmony import */ var _flv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flv */ "./src/avformat/formats/flv/flv.ts");
/*
 * libmedia flv encode
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

function writeTagHeader(ioWriter, type, size, timestamp) {
    // tagType
    ioWriter.writeUint8(type);
    // size
    ioWriter.writeUint24(size);
    // timestamp
    ioWriter.writeUint24(Number(timestamp & BigInt(0xffffff)));
    // timestampExtended
    ioWriter.writeUint8(Number((timestamp >> BigInt(24)) & BigInt(0xff)));
    // streamId always 0
    ioWriter.writeUint24(0);
}
/**
 *
 *   0  1  2  3    4    5      6         7
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  |SoundFormat|SoundRate|SoundSize| SoundType| SoundData
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * @param ioWriter
 * @param stream
 */
function writeAudioTagDataHeader(ioWriter, stream) {
    /**
     * SoundSize 采样精度，对于压缩过的音频，永远是 16 位
     * - 0 snd8Bit
     * - 1 snd16Bit
     */
    let header = 0x02;
    /**
     * SoundType 声道类型，对 Nellymoser 来说，永远是单声道；对 AAC 来说，永远是双声道
     * - 0 sndMono 单声道
     * - 1 sndStereo 双声道
     */
    if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */ || stream.codecpar.chLayout.nbChannels > 1) {
        header |= 0x01;
    }
    /**
     * SoundRate 采样率，对 AAC 来说，永远等于 3
     * - 0 5.5-kHz
     * - 1 1-kHz
     * - 2 22-kHz
     * - 3 44-kHz
     */
    if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */ || stream.codecpar.sampleRate >= 44000) {
        header |= 0x0c;
    }
    else if (stream.codecpar.sampleRate >= 22000) {
        header |= 0x08;
    }
    else if (stream.codecpar.sampleRate >= 11000) {
        header |= 0x04;
    }
    header |= ((_flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecType[stream.codecpar.codecId]) << 4);
    ioWriter.writeUint8(header);
}
/**
 *
 *   0 1  2  3  4 5 6 7
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  |FrameType|CodecID| VideoData
 *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * @param ioWriter
 * @param stream
 */
function writeVideoTagDataHeader(ioWriter, stream, flags) {
    let header = _flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecType[stream.codecpar.codecId] & 0x0f;
    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */
        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
        if (flags & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
            header |= (16);
        }
        else {
            header |= (32);
        }
    }
    ioWriter.writeUint8(header);
}
function writeVideoTagExtDataHeader(ioWriter, stream, type, flags) {
    let header = (type & 0x0f) | 0x80;
    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
        || stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
        || stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
        if (flags & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
            header |= (16);
        }
        else {
            header |= (32);
        }
    }
    ioWriter.writeUint8(header);
}


/***/ }),

/***/ "./src/avformat/function/getBytesByDuration.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/function/getBytesByDuration.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBytesByDuration: () => (/* binding */ getBytesByDuration)
/* harmony export */ });
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia get bytes by duration
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */



function getBytesByDuration(streams, duration, timeBase) {
    let bytes = BigInt(0);
    common_util_array__WEBPACK_IMPORTED_MODULE_0__.each(streams, (st) => {
        bytes += st.codecpar.bitRate * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(duration, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q) / BigInt(8000);
    });
    return bytes;
}


/***/ }),

/***/ "./src/avformat/function/mktag.ts":
/*!****************************************!*\
  !*** ./src/avformat/function/mktag.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktag)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\function\\mktag.ts";
/*
 * libmedia string tag to uint32 in big end
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

function mktag(tag) {
    if (tag.length !== 4) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`tag length is not 4, tag: ${tag}`, cheap__fileName__0, 30);
    }
    let value = 0;
    for (let i = 0; i < 4; i++) {
        value = (value << 8) | tag.charCodeAt(i);
    }
    return value;
}


/***/ }),

/***/ "./src/avformat/function/seekInBytes.ts":
/*!**********************************************!*\
  !*** ./src/avformat/function/seekInBytes.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ seekInBytes)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getBytesByDuration */ "./src/avformat/function/getBytesByDuration.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\function\\seekInBytes.ts";









// @ts-ignore
async function seekInBytes(context, stream, timestamp, firstPacketPos, readAVPacket, syncAVPacket) {
    const now = context.ioReader.getPos();
    const fileSize = await context.ioReader.fileSize();
    let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
    let duration = timestamp;
    if (stream.startTime !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        duration -= stream.startTime;
    }
    else {
        duration -= stream.firstDTS;
    }
    const pointPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    // 头十秒直接回到开始位置
    if (pointPts < BigInt(10000)) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`seek pts is earlier then 10s, seek to first packet pos(${firstPacketPos}) directly`, cheap__fileName__0, 63);
        await context.ioReader.seek(firstPacketPos);
        return now;
    }
    let bytes = (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, duration, stream.timeBase);
    // 最大到结尾往前 5 秒
    const max = fileSize - (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(5000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    const length = (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(10000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    if (bytes > max) {
        bytes = max;
    }
    if (bytes < firstPacketPos) {
        await context.ioReader.seek(firstPacketPos);
        return now;
    }
    const avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.createAVPacket)();
    let seekMax = fileSize;
    let seekMin = BigInt(0);
    while (true) {
        if (seekMax - seekMin < length) {
            pos = seekMin;
            break;
        }
        await context.ioReader.seek(bytes);
        await syncAVPacket(context);
        const now = context.ioReader.getPos();
        let ret = await readAVPacket(context, avpacket);
        if (ret >= 0) {
            const currentPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
            const diff = currentPts - pointPts;
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`try to seek to pos: ${bytes}, got packet pts: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8)}(${currentPts}ms), diff: ${diff}ms`, cheap__fileName__0, 98);
            // seek 时间戳的前面 10 秒内
            if (diff <= BigInt(0) && -diff < BigInt(10000)) {
                pos = now;
                break;
            }
            // seek 后面
            else if (diff > BigInt(0)) {
                seekMax = bytes;
                bytes = (seekMin + seekMax) >> BigInt(1);
            }
            // seek 前面 10 秒外
            else {
                seekMin = bytes;
                bytes = (seekMin + seekMax) >> BigInt(1);
            }
        }
        else {
            break;
        }
    }
    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(avpacket);
    if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`finally seek to pos ${pos}`, cheap__fileName__0, 124);
        await context.ioReader.seek(pos);
        await syncAVPacket(context);
        return now;
    }
    else {
        await context.ioReader.seek(now);
    }
    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.FORMAT_NOT_SUPPORT);
}


/***/ }),

/***/ "./src/avutil/util/av1syntax.ts":
/*!**************************************!*\
  !*** ./src/avutil/util/av1syntax.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ f),
/* harmony export */   leb128: () => (/* binding */ leb128),
/* harmony export */   uvlc: () => (/* binding */ uvlc)
/* harmony export */ });
/* unused harmony exports le, su, ns, L, NS */
/*
 * libmedia av1 syntax util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
function f(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function uvlc(bitReader) {
    let leadingZeros = 0;
    while (true) {
        let done = f(bitReader, 1);
        if (done) {
            break;
        }
        leadingZeros++;
    }
    if (leadingZeros >= 32) {
        return (1) - 1;
    }
    const value = f(bitReader, leadingZeros);
    return value + (1 << leadingZeros) - 1;
}
function le(bitReader, n) {
    let t = 0;
    for (let i = 0; i < n; i++) {
        let byte = f(bitReader, 8);
        t += (byte << (i * 8));
    }
    return t;
}
function leb128(bitReader) {
    let value = 0;
    let Leb128Bytes = 0;
    for (let i = 0; i < 8; i++) {
        let leb128Byte_ = f(bitReader, 8);
        value |= ((leb128Byte_ & 0x7f) << (i * 7));
        Leb128Bytes += 1;
        if (!(leb128Byte_ & 0x80)) {
            break;
        }
    }
    return value;
}
function su(bitReader, n) {
    let value = f(bitReader, n);
    let signMask = 1 << (n - 1);
    if (value & signMask) {
        value = value - 2 * signMask;
    }
    return value;
}
function ns(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = f(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = f(bitReader, 1);
    return (v << 1) - m + extraBit;
}
function L(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function NS(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = L(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = L(bitReader, 1);
    return (v << 1) - m + extraBit;
}


/***/ }),

/***/ "./src/avutil/util/expgolomb.ts":
/*!**************************************!*\
  !*** ./src/avutil/util/expgolomb.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readSE: () => (/* binding */ readSE),
/* harmony export */   readUE: () => (/* binding */ readUE)
/* harmony export */ });
/* unused harmony exports readTE, writeUE, writeSE, writeTE */
/*
 * libmedia expgolomb util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
const UESizeTable = [
    // 0 的二进制所需的比特个数
    1,
    // 1 的二进制所需的比特个数    
    1,
    // 2~3 的二进制所需的比特个数   
    2, 2,
    // 4~7 的二进制所需的比特个数
    3, 3, 3, 3,
    // 8~15 的二进制所需的比特个数
    4, 4, 4, 4, 4, 4, 4, 4,
    // 16~31 的二进制所需的比特个数
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    // 32~63 的二进制所需的比特个数
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    // 64~127 的二进制所需的比特个数
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    // 128~255 的二进制所需的比特个数
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
];
/**
 * ue(v) 指数哥伦布解码
 */
function readUE(bitReader) {
    let result = 0;
    // leadingZeroBits
    let i = 0;
    while (i < 32 && bitReader.readU1() === 0) {
        i++;
    }
    // 计算 read_bits ( leadingZeroBits )
    result = bitReader.readU(i);
    // 计算 codeNum，1 << i 即为 2 的 i 次幂
    result += (1 << i) - 1;
    return result;
}
/**
 * se(v) 有符号指数哥伦布解码
 */
function readSE(bitReader) {
    let result = readUE(bitReader);
    // 判断 result 的奇偶性
    if (result & 0x01) {
        // 如果为奇数，说明编码前 > 0
        result = (result + 1) / 2;
    }
    else {
        // 如果为偶数，说明编码前 <= 0
        result = -result / 2;
    }
    return result;
}
/**
 * te(v) 截断指数哥伦布解码
 */
function readTE(bitReader, x) {
    let result = 0;
    // 判断取值上限
    if (x === 1) {
        // 如果为 1 则将读取到的比特值取反
        result = 1 - bitReader.readU1();
    }
    else if (x > 1) {
        // 否则按照 ue(v) 进行解码
        result = readUE(bitReader);
    }
    return result;
}
/**
 * ue(v) 指数哥伦布编码
 */
function writeUE(bitWriter, value) {
    let size = 0;
    if (value === 0) {
        // 0 直接编码为 1
        bitWriter.writeU1(1);
    }
    else {
        let tmp = ++value;
        // 判断所需比特个数是否大于 16 位
        if (tmp >= 0x00010000) {
            size += 16;
            tmp >>= 16;
        }
        // 判断此时所需比特个数是否大于 8 位
        if (tmp >= 0x100) {
            size += 8;
            tmp >>= 8;
        }
        // 最终 tmp 移位至 8 位以内，去查表
        size += UESizeTable[tmp];
        // 最终得出编码 value 所需的总比特数：2 * size - 1
        bitWriter.writeU(2 * size - 1, value);
    }
}
/**
 * se(v) 有符号指数哥伦布编码
 */
function writeSE(bitWriter, value) {
    if (value <= 0) {
        writeUE(bitWriter, -value * 2);
    }
    else {
        writeUE(bitWriter, value * 2 - 1);
    }
}
/**
 * te(v) 截断指数哥伦布编码
 */
function writeTE(bitWriter, x, value) {
    if (x === 1) {
        bitWriter.writeU1(1 & ~value);
    }
    else if (x > 1) {
        writeUE(bitWriter, value);
    }
}


/***/ }),

/***/ "./src/avutil/util/intread.ts":
/*!************************************!*\
  !*** ./src/avutil/util/intread.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r8: () => (/* binding */ r8),
/* harmony export */   rb16: () => (/* binding */ rb16),
/* harmony export */   rb24: () => (/* binding */ rb24),
/* harmony export */   rb32: () => (/* binding */ rb32),
/* harmony export */   rl16: () => (/* binding */ rl16),
/* harmony export */   rl32: () => (/* binding */ rl32)
/* harmony export */ });
/* unused harmony exports rl24, rl64, rb64 */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");

/*
 * libmedia int read util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */
function r8(p) {
    return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](p);
}
function rl16(p) {
    return (r8(p + 1) << 8) | r8(p);
}
function rb16(p) {
    return (r8(p) << 8) | r8(p + 1);
}
function rl24(p) {
    return (r8(p + 2) << 16) | (r8(p + 1) << 8) + r8(p);
}
function rb24(p) {
    return (r8(p) << 16) | (r8(p + 1) << 8) | r8(p + 2);
}
function rl32(p) {
    return (rl16(p + 2) << 16) | rl16(p);
}
function rb32(p) {
    return (rb16(p) << 16) | rb16(p + 2);
}
function rl64(p) {
    return (BigInt(rl32(p + 4)) << BigInt(32)) | BigInt(rl32(p));
}
function rb64(p) {
    return (BigInt(rb32(p)) << BigInt(32)) | BigInt(rb32(p + 4));
}


/***/ }),

/***/ "./src/avutil/util/nalu.ts":
/*!*********************************!*\
  !*** ./src/avutil/util/nalu.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNextNaluStart: () => (/* binding */ getNextNaluStart),
/* harmony export */   isAnnexb: () => (/* binding */ isAnnexb),
/* harmony export */   naluUnescape: () => (/* binding */ naluUnescape),
/* harmony export */   splitNaluByStartCode: () => (/* binding */ splitNaluByStartCode)
/* harmony export */ });
/* unused harmony exports splitNaluByLength, joinNaluByStartCode, joinNaluByLength, naluEscape */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/*
 * libmedia nalu util
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */



function isAnnexb(data) {
    return data.length > 4
        && data[0] === 0
        && data[1] === 0
        && (data[2] === 1
            || data[2] === 0 && data[3] === 1);
}
function getNextNaluStart(data, offset) {
    let t = 0;
    for (let i = offset; i < data.length; i++) {
        switch (data[i]) {
            case 0:
                t++;
                break;
            case 1:
                if (t >= 2) {
                    return {
                        offset: i - Math.min(t, 3),
                        startCode: Math.min(t + 1, 4)
                    };
                }
                t = 0;
                break;
            default:
                t = 0;
        }
    }
    return {
        offset: -1,
        startCode: 0
    };
}
function splitNaluByStartCode(buffer) {
    const list = [];
    let offset = 0;
    let current = getNextNaluStart(buffer, offset);
    let next = {
        offset: -1,
        startCode: 0
    };
    while (next = getNextNaluStart(buffer, current.offset + current.startCode), next.offset > -1) {
        list.push(buffer.subarray(current.offset + current.startCode, next.offset, true));
        current = next;
    }
    list.push(buffer.subarray(current.offset + current.startCode, undefined, true));
    return list;
}
function splitNaluByLength(buffer, naluLengthSizeMinusOne) {
    const list = [];
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](buffer);
    while (bufferReader.remainingSize() > 0) {
        let length = 0;
        if (naluLengthSizeMinusOne === 3) {
            length = bufferReader.readUint32();
        }
        else if (naluLengthSizeMinusOne === 2) {
            length = bufferReader.readUint24();
        }
        else if (naluLengthSizeMinusOne === 1) {
            length = bufferReader.readUint16();
        }
        else {
            length = bufferReader.readUint8();
        }
        const nalu = buffer.subarray((Number(bufferReader.getPos() & 0xffffffffn) >> 0), (Number(bufferReader.getPos() & 0xffffffffn) >> 0) + length, true);
        bufferReader.skip(length);
        list.push(nalu);
    }
    return list;
}
function joinNaluByStartCode(nalus, output, slice = false) {
    if (!output) {
        let length = nalus.reduce((prev, nalu, index) => {
            return prev + ((index && slice) ? 3 : 4) + nalu.length;
        }, 0);
        output = new Uint8Array(length);
    }
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](output);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu, index) => {
        bufferWriter.writeUint8(0x00);
        bufferWriter.writeUint8(0x00);
        if (!index && slice) {
            bufferWriter.writeUint8(0x00);
        }
        bufferWriter.writeUint8(0x01);
        bufferWriter.writeBuffer(nalu);
    });
    return output;
}
function joinNaluByLength(nalus, naluLengthSizeMinusOne, output) {
    if (!output) {
        const length = nalus.reduce((prev, nalu) => {
            return prev + naluLengthSizeMinusOne + 1 + nalu.length;
        }, 0);
        output = new Uint8Array(length);
    }
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](output);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(nalus, (nalu) => {
        if (naluLengthSizeMinusOne === 3) {
            bufferWriter.writeUint32(nalu.length);
        }
        else if (naluLengthSizeMinusOne === 2) {
            bufferWriter.writeUint24(nalu.length);
        }
        else if (naluLengthSizeMinusOne === 1) {
            bufferWriter.writeUint16(nalu.length);
        }
        else {
            bufferWriter.writeUint8(nalu.length);
        }
        bufferWriter.writeBuffer(nalu);
    });
    return output;
}
function naluUnescape(data, start = 0, end) {
    if (!end) {
        end = data.length;
    }
    const buffer = new Uint8Array(data.length);
    let zeroCount = 0;
    let pos = 0;
    for (let i = 0; i < data.length; i++) {
        if (i >= start && i < end) {
            if (data[i] === 0) {
                zeroCount++;
            }
            else {
                if (data[i] === 3 && zeroCount === 2 && i + 1 < data.length && data[i + 1] <= 3) {
                    i++;
                    if (i === data.length) {
                        break;
                    }
                    else {
                        if (data[i] === 0) {
                            zeroCount = 1;
                        }
                        else {
                            zeroCount = 0;
                        }
                    }
                }
                else {
                    zeroCount = 0;
                }
            }
        }
        buffer[pos++] = data[i];
    }
    return buffer.slice(0, pos);
}
function naluEscape(data, start = 0, end) {
    if (!end) {
        end = data.length;
    }
    const indexes = [];
    let zeroCount = 0;
    for (let i = start; i < end; i++) {
        if (i >= end) {
            break;
        }
        if (data[i] === 0) {
            zeroCount++;
        }
        else {
            if (data[i] <= 3 && zeroCount === 2) {
                indexes.push(i);
            }
            zeroCount = 0;
        }
    }
    if (indexes.length) {
        const buffer = new Uint8Array(data.length + indexes.length);
        let pos = 0;
        let subData = data.subarray(0, indexes[0]);
        buffer.set(subData, pos);
        pos += subData.length;
        buffer[pos++] = 3;
        for (let i = 1; i < indexes.length; i++) {
            subData = data.subarray(indexes[i - 1], indexes[i]);
            buffer.set(subData, pos);
            pos += subData.length;
            buffer[pos++] = 3;
        }
        subData = data.subarray(indexes[indexes.length - 1], data.length);
        buffer.set(subData, pos);
        pos += subData.length;
        return buffer;
    }
    else {
        return data;
    }
}


/***/ }),

/***/ "./src/common/io/BitReader.ts":
/*!************************************!*\
  !*** ./src/common/io/BitReader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BitReader)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\common\\io\\BitReader.ts";

class BitReader {
    buffer;
    pointer;
    bitsLeft;
    size;
    endPointer;
    error;
    onFlush;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576) {
        this.pointer = 0;
        this.bitsLeft = 8;
        this.size = size;
        this.endPointer = 0;
        this.error = 0;
        this.buffer = new Uint8Array(this.size);
    }
    /**
     * 不影响原读取操作的情况下，读取 1 个比特
     */
    peekU1() {
        let result = 0;
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitsLeft === 0) {
            this.flush();
        }
        let pointer = this.pointer;
        let bitsLeft = this.bitsLeft;
        if (bitsLeft === 0) {
            pointer++;
            bitsLeft = 8;
        }
        result = (this.buffer[pointer] >> (bitsLeft - 1)) & 0x01;
        return result;
    }
    /**
     * 读取 1 个比特
     */
    readU1() {
        let result = 0;
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitsLeft === 0) {
            this.flush();
        }
        this.bitsLeft--;
        result = (this.buffer[this.pointer] >> this.bitsLeft) & 0x01;
        if (this.bitsLeft === 0) {
            this.pointer++;
            this.bitsLeft = 8;
        }
        return result;
    }
    /**
     * 读取 n 个比特
     *
     * @param n
     */
    readU(n) {
        let result = 0;
        for (let i = 0; i < n; i++) {
            result |= (this.readU1() << (n - i - 1));
        }
        return result;
    }
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength() {
        return this.endPointer - this.pointer;
    }
    getPos() {
        return this.pointer;
    }
    skip(n) {
        const byte = (n - (n % 8)) / 8;
        this.pointer += byte;
        const bitsLeft = n % 8;
        if (this.bitsLeft <= bitsLeft) {
            this.pointer++;
            this.bitsLeft = 8 - (bitsLeft - this.bitsLeft);
        }
        else {
            this.bitsLeft -= bitsLeft;
        }
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOReader error, flush failed because of no flush callback');
        }
        if (this.bitsLeft === 0) {
            this.pointer++;
        }
        if (this.size - this.remainingLength() <= 0) {
            return;
        }
        if (this.pointer < this.endPointer) {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            const len = this.onFlush(this.buffer.subarray(this.endPointer - this.pointer, this.size));
            if (len < 0) {
                this.error = len;
                throw Error('IOReader error, flush failed');
            }
            this.endPointer = this.endPointer - this.pointer + len;
            this.pointer = 0;
        }
        else {
            const len = this.onFlush(this.buffer);
            this.endPointer = len;
            this.pointer = 0;
            this.bitsLeft = 8;
            if (len < 0) {
                this.error = len;
                throw Error('IOReader error, flush failed');
            }
        }
    }
    getBuffer() {
        return this.buffer;
    }
    appendBuffer(buffer) {
        if (this.size - this.endPointer >= buffer.length) {
            this.buffer.set(buffer, this.endPointer);
            this.endPointer += buffer.length;
        }
        else {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            this.endPointer = this.endPointer - this.pointer;
            this.pointer = 0;
            if (this.size - this.endPointer >= buffer.length) {
                this.buffer.set(buffer, this.endPointer);
                this.endPointer += buffer.length;
            }
            else {
                const len = Math.min(this.size - this.endPointer, buffer.length);
                this.buffer.set(buffer.subarray(0, len), this.endPointer);
                this.endPointer += len;
                _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('BSReader, call appendBuffer but the buffer\'s size is lagger then the remaining size', cheap__fileName__0, 190);
            }
        }
    }
    clear() {
        this.pointer = this.endPointer = 0;
        this.bitsLeft = 8;
        this.error = 0;
    }
    skipPadding() {
        if (this.bitsLeft < 8) {
            this.bitsLeft = 8;
            this.pointer++;
        }
    }
}


/***/ }),

/***/ "./src/common/io/BitWriter.ts":
/*!************************************!*\
  !*** ./src/common/io/BitWriter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BitWriter)
/* harmony export */ });
/**
 * bit 写存器
 */
/**
 * 写字节流工具
 */
class BitWriter {
    buffer;
    pointer;
    bitPointer;
    size;
    error;
    onFlush;
    /**
     * @param data 待写的 Uint8Array
     */
    constructor(size = 1048576) {
        this.pointer = 0;
        this.bitPointer = 0;
        this.size = size;
        this.error = 0;
        this.buffer = new Uint8Array(this.size);
    }
    /**
     * 写一个 bit
     *
     * @param bit
     */
    writeU1(bit) {
        if (this.remainingLength() < 1 || this.remainingLength() === 1 && this.bitPointer >= 8) {
            this.flush();
        }
        if (bit & 0x01) {
            this.buffer[this.pointer] |= (1 << (7 - this.bitPointer));
        }
        else {
            this.buffer[this.pointer] &= ~(1 << (7 - this.bitPointer));
        }
        this.bitPointer++;
        if (this.bitPointer === 8) {
            this.pointer++;
            this.bitPointer = 0;
        }
    }
    /**
     * 写 n 个比特
     *
     * @param n
     */
    writeU(n, v) {
        for (let i = 0; i < n; i++) {
            this.writeU1(v >> (n - i - 1) & 0x01);
        }
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('BSWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            if (this.bitPointer && this.pointer > 1) {
                const ret = this.onFlush(this.buffer.subarray(0, this.pointer - 1));
                if (ret !== 0) {
                    this.error = ret;
                    throw Error('BSWriter error, flush failed');
                }
                this.buffer[0] = this.buffer[this.pointer];
            }
            else if (this.bitPointer === 0) {
                const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
                if (ret !== 0) {
                    this.error = ret;
                    throw Error('BSWriter error, flush failed');
                }
            }
        }
        this.pointer = 0;
    }
    padding() {
        while (this.bitPointer !== 0) {
            this.writeU1(0);
        }
    }
    clear() {
        this.pointer = 0;
        this.bitPointer = 0;
        this.error = 0;
    }
    getBuffer() {
        return this.buffer;
    }
    getPointer() {
        return this.pointer;
    }
}


/***/ }),

/***/ "./src/common/io/BufferWriter.ts":
/*!***************************************!*\
  !*** ./src/common/io/BufferWriter.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BufferWriter)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
var cheap__fileName__0 = "src\\common\\io\\BufferWriter.ts";
/**
 * 写字节流工具
 */


class BufferWriter {
    data;
    buffer;
    byteStart;
    pos;
    size;
    littleEndian;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        this.data.setUint8(this.pos++ + this.byteStart, value);
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        this.data.setUint16(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 2;
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        const high = value & 0xf00;
        const middle = value & 0x0f0;
        const low = value & 0x00f;
        if (this.littleEndian) {
            this.writeUint8(low);
            this.writeUint8(middle);
            this.writeUint8(high);
        }
        else {
            this.writeUint8(high);
            this.writeUint8(middle);
            this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    writeUint32(value) {
        this.data.setUint32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        const low = value & BigInt(0xffffffff);
        const high = (value & (BigInt(0xffffffff) << BigInt(32))) >> BigInt(32);
        if (this.littleEndian) {
            this.writeUint32(Number(low));
            this.writeUint32(Number(high));
        }
        else {
            this.writeUint32(Number(high));
            this.writeUint32(Number(low));
        }
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        this.data.setInt8(this.pos++ + this.byteStart, value);
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        this.data.setInt16(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 2;
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        this.data.setInt32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        const low = value & BigInt(0xffffffff);
        const high = (value & (BigInt(0xffffffff) << BigInt(32))) >> BigInt(32);
        if (this.littleEndian) {
            this.writeInt32(Number(low));
            this.writeInt32(Number(high));
        }
        else {
            this.writeInt32(Number(high));
            this.writeInt32(Number(low));
        }
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        this.data.setFloat32(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 4;
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        this.data.setFloat64(this.pos + this.byteStart, value, this.littleEndian);
        this.pos += 8;
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPos() {
        return this.pos;
    }
    /**
     * seek 写指针
     *
     * @param pos
     */
    seek(pos) {
        if (pos > this.size) {
            pos = this.size;
        }
        this.pos = Math.max(0, pos);
    }
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    skip(length) {
        this.seek(this.pos + length);
    }
    /**
     * 返回指定字节长度
     *
     * @param length
     */
    back(length) {
        this.seek(this.pos - length);
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingSize() {
        return this.size - this.pos;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        let length = buffer.length;
        if (this.remainingSize() < length) {
            length = this.remainingSize();
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`the remaining buffer size is smaller then the wrote buffer, hope set ${buffer.length}, but set ${length}`, cheap__fileName__0, 211);
        }
        this.buffer.set(buffer, this.pos);
        this.pos += buffer.length;
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_1__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    getWroteBuffer() {
        return this.buffer.subarray(0, this.pos);
    }
    resetBuffer(data, bigEndian = true) {
        this.buffer = data;
        this.data = data instanceof Uint8Array ? new DataView(data.buffer) : data.view;
        this.byteStart = data instanceof Uint8Array ? data.byteOffset : 0;
        this.pos = 0;
        this.size = data.byteLength;
        this.littleEndian = !bigEndian;
    }
}


/***/ }),

/***/ "./src/common/io/IOWriterSync.ts":
/*!***************************************!*\
  !*** ./src/common/io/IOWriterSync.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOWriterSync)
/* harmony export */ });
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 写字节流工具
 */

class IOWriterSync {
    data;
    buffer;
    pointer;
    pos;
    size;
    littleEndian;
    error;
    onFlush;
    onSeek;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.size = size;
        this.littleEndian = !bigEndian;
        this.error = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setUint8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setUint16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        if (this.remainingLength() < 3) {
            this.flush();
        }
        const high = (value & 0xff0000) >> 16;
        const middle = (value & 0x00ff00) >> 8;
        const low = value & 0x0000ff;
        if (this.littleEndian) {
            this.writeUint8(low);
            this.writeUint8(middle);
            this.writeUint8(high);
        }
        else {
            this.writeUint8(high);
            this.writeUint8(middle);
            this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    writeUint32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setUint32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigUint64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setInt8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setInt16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setInt32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigInt64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setFloat32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setFloat64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    getPos() {
        return this.pos;
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        if (!buffer.length) {
            return;
        }
        let length = buffer.length;
        if (this.remainingLength() < length) {
            let index = 0;
            while (length > 0) {
                this.flush();
                const len = Math.min(this.size, length);
                this.buffer.set(buffer.subarray(index, index + len), this.pointer);
                this.pointer += len;
                this.pos += BigInt(len);
                index += len;
                length -= len;
            }
        }
        else {
            this.buffer.set(buffer, this.pointer);
            this.pointer += length;
            this.pos += BigInt(length);
        }
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    encodeString(str) {
        return _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    flushToPos(pos) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer), pos);
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    seek(pos) {
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, seek failed because of no seek callback');
        }
        this.flush();
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            throw Error('IOWriter error, seek failed');
        }
        this.pos = pos;
    }
    seekInline(pos) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, Math.min(this.size, pos));
        this.pos += BigInt(this.pointer - pointer);
    }
    skip(length) {
        const pointer = this.pointer;
        this.pointer = Math.min(this.size, this.pointer + length);
        this.pos += BigInt(this.pointer - pointer);
    }
    back(length) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, this.pointer - length);
        this.pos += BigInt(this.pointer - pointer);
    }
    getBuffer() {
        return this.buffer.subarray(0, this.pointer);
    }
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    reset() {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    getBufferSize() {
        return this.size;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IFlvFormat_ts.avplayer.js.map