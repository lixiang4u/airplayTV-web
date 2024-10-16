"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IMatroskaFormat_ts"],{

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   MPEG4Channels: () => (/* binding */ MPEG4Channels),
/* harmony export */   MPEG4SamplingFrequencies: () => (/* binding */ MPEG4SamplingFrequencies),
/* harmony export */   MPEG4SamplingFrequencyIndex: () => (/* binding */ MPEG4SamplingFrequencyIndex),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   getAVCodecParameters: () => (/* binding */ getAVCodecParameters),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
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
/* harmony export */   generateExtradata: () => (/* binding */ generateExtradata),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, AV1LevelIdx, parseSequenceHeader, splitOBU */
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
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb),
/* harmony export */   extradata2SpsPps: () => (/* binding */ extradata2SpsPps),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports NALULengthSizeMinusOne, LevelCapabilities, spsPps2Extradata, isIDR */
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
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb),
/* harmony export */   extradata2VpsSpsPps: () => (/* binding */ extradata2VpsSpsPps),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parsePPS: () => (/* binding */ parsePPS),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, vpsSpsPps2Extradata, isIDR */
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

/***/ "./src/avformat/codecs/mp3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/mp3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP3Profile2Name: () => (/* binding */ MP3Profile2Name),
/* harmony export */   getBitRateByVersionLayerIndex: () => (/* binding */ getBitRateByVersionLayerIndex),
/* harmony export */   getFrameSizeByVersionLayer: () => (/* binding */ getFrameSizeByVersionLayer),
/* harmony export */   getProfileByLayer: () => (/* binding */ getProfileByLayer),
/* harmony export */   getSampleRateByVersionIndex: () => (/* binding */ getSampleRateByVersionIndex),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mp3 util
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

const MpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
const MpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
const MpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
const MpegAudioV10FrameSizeTable = [0, 1152, 1152, 384];
const MpegAudioV20FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV25FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV1L1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
const MpegAudioV1L2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
const MpegAudioV1L3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
const MpegAudioV2L1BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1];
const MpegAudioV2L2L3BitRateTable = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1];
function getSampleRateByVersionIndex(version, samplingFreqIndex) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25SampleRateTable[samplingFreqIndex];
        case 2:
            // MPEG 2
            return MpegAudioV20SampleRateTable[samplingFreqIndex];
        case 3:
            // MPEG 1
            return MpegAudioV10SampleRateTable[samplingFreqIndex];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getFrameSizeByVersionLayer(version, layer) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25FrameSizeTable[layer];
        case 2:
            // MPEG 2
            return MpegAudioV20FrameSizeTable[layer];
        case 3:
            // MPEG 1
            return MpegAudioV10FrameSizeTable[layer];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getBitRateByVersionLayerIndex(version, layer, index) {
    switch (layer) {
        // layer3
        case 1:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L3BitRateTable[index];
            }
            break;
        // layer2
        case 2:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L2BitRateTable[index];
            }
        // layer1
        case 3:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L1BitRateTable[index];
                case 3:
                    return MpegAudioV1L1BitRateTable[index];
            }
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getProfileByLayer(layer) {
    switch (layer) {
        case 1:
            // Layer 3
            return 34;
        case 2:
            // Layer 2
            return 33;
        case 3:
            // Layer 1
            return 32;
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
const MP3Profile2Name = {
    [32 /* MP3Profile.Layer1 */]: 'Layer1',
    [33 /* MP3Profile.Layer2 */]: 'Layer2',
    [34 /* MP3Profile.Layer3 */]: 'Layer3'
};
function parseAVCodecParameters(stream, buffer) {
    if (buffer && buffer.length >= 4) {
        const ver = (buffer[1] >>> 3) & 0x03;
        const layer = (buffer[1] & 0x06) >> 1;
        // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
        const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
        const channelMode = (buffer[3] >>> 6) & 0x03;
        const channelCount = channelMode !== 3 ? 2 : 1;
        const profile = getProfileByLayer(layer);
        const sampleRate = getSampleRateByVersionIndex(ver, samplingFreqIndex);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channelCount;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/opus.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/opus.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   getBufferSamples: () => (/* binding */ getBufferSamples),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* unused harmony export durations */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia opus util
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



const durations = [
    /* Silk NB */
    480, 960, 1920, 2880,
    /* Silk MB */
    480, 960, 1920, 2880,
    /* Silk WB */
    480, 960, 1920, 2880,
    /* Hybrid SWB */
    480, 960,
    /* Hybrid FB */
    480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960
];
function getBufferSamples(buffer) {
    let toc = 0, frameDuration = 0, nframes = 0;
    if (buffer.length < 1) {
        return 0;
    }
    toc = buffer[0];
    frameDuration = durations[toc >> 3];
    switch (toc & 3) {
        case 0:
            nframes = 1;
            break;
        case 1:
            nframes = 2;
            break;
        case 2:
            nframes = 2;
            break;
        case 3:
            if (buffer.length < 2) {
                return 0;
            }
            nframes = buffer[1] & 63;
            break;
    }
    return nframes * frameDuration;
}
/**
 * opus extradata
 *
 * - 8 bytes Magic Signature: OpusHead
 * - 1 bytes unsigned, 对应值 0x01 version
 * - 1 bytes unsigned, channels 它可能和编码声道数不一致， 它可能被修改成 packet-by-packet, 对应值 0x01
 * - 2 bytes unsigned, preSkip 这是要从开始播放时的解码器输出， 从页面的颗粒位置减去以计算其 PCM 样本位置。
 * - 4 bytes unsigned, sampleRate 原始输入采样率
 * - 2 bytes signed, outputGain 这是解码时要应用的增益， 20 * log10 缩放解码器输出以实现所需的播放音量
 * - 1 bytes unsigned, channelMappingFamily 指示输出渠道的顺序和语音含义。该八位位组的每个当前指定的值表示一个映射系列，它定义了一组允许的通道数，以及每个允许的通道数的通道名称的有序集合
 * - channelMappingTable 可选， 当 Channel Mapping Family 为 0 时被省略。
 *  - 1 bytes, streamCount, unsigned ogg packet 里面编码了多少路 stream
 *  - 1 bytes, coupledStreamCount, unsigned 标识有多少路流是双声声道，必须小于 streamCount
 *  - C bytes, C 为总输出声道数 coupledStreamCount + streamCount
 *
 */
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 19) {
        const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](extradata, false);
        reader.skip(9);
        stream.codecpar.chLayout.nbChannels = reader.readUint8();
        stream.codecpar.initialPadding = reader.readUint16();
        stream.codecpar.sampleRate = reader.readUint32();
        stream.codecpar.seekPreroll = Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__.avRescaleQ)(BigInt(80), {
            den: 1000,
            num: 1
        }, {
            den: 48000,
            num: 1
        }));
    }
}
function avCodecParameters2Extradata(codecpar) {
    const extradata = new Uint8Array(19);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](extradata, false);
    writer.writeString('OpusHead');
    writer.writeUint8(0x01);
    writer.writeUint8(codecpar.chLayout.nbChannels);
    writer.writeUint16(codecpar.initialPadding);
    writer.writeUint32(codecpar.sampleRate);
    return extradata;
}


/***/ }),

/***/ "./src/avformat/codecs/vp8.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vp8.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/*
 * libmedia vp8 util
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
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__["default"](extradata.length);
    bitReader.appendBuffer(extradata.subarray(4));
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


/***/ }),

/***/ "./src/avformat/codecs/vp9.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vp9.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VP9Profile2Name: () => (/* binding */ VP9Profile2Name),
/* harmony export */   generateExtradata: () => (/* binding */ generateExtradata),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony export LevelCapabilities */
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
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAVCodecParametersBySps: () => (/* binding */ parseAVCodecParametersBySps),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports extradata2VpsSpsPps, vpsSpsPps2Extradata, annexbExtradata2AvccExtradata, isIDR */
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

/***/ "./src/avformat/formats/IMatroskaFormat.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/IMatroskaFormat.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMatroskaFormat)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _matroska_matroska__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./matroska/matroska */ "./src/avformat/formats/matroska/matroska.ts");
/* harmony import */ var _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./matroska/imatroska */ "./src/avformat/formats/matroska/imatroska.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var _codecs_vp8__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../codecs/vp8 */ "./src/avformat/codecs/vp8.ts");
/* harmony import */ var _codecs_vp9__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../codecs/vp9 */ "./src/avformat/codecs/vp9.ts");
/* harmony import */ var _codecs_av1__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../codecs/av1 */ "./src/avformat/codecs/av1.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var _matroska_function_findStreamByTrackUid__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./matroska/function/findStreamByTrackUid */ "./src/avformat/formats/matroska/function/findStreamByTrackUid.ts");
/* harmony import */ var _matroska_function_findStreamByTrackNumber__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./matroska/function/findStreamByTrackNumber */ "./src/avformat/formats/matroska/function/findStreamByTrackNumber.ts");
/* harmony import */ var avutil_util_intwrite__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! avutil/util/intwrite */ "./src/avutil/util/intwrite.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _riff_riff__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./riff/riff */ "./src/avformat/formats/riff/riff.ts");
/* harmony import */ var _isom_tags__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./isom/tags */ "./src/avformat/formats/isom/tags.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IMatroskaFormat.ts";





































class IMatroskaFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_8__["default"] {
    type = 5 /* AVFormat.MATROSKA */;
    context;
    blockReader;
    constructor() {
        super();
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
        const context = {
            isLive: true,
            firstCluster: -BigInt(1),
            segmentStart: -BigInt(1),
            header: {
                version: 0,
                readVersion: 0,
                maxIdLength: 4,
                maxSizeLength: 8,
                docType: '',
                docTypeVersion: 0,
                docTypeReadVersion: 0
            },
            seekHead: null,
            info: null,
            tracks: null,
            attachments: null,
            chapters: null,
            cues: null,
            tags: null,
            currentCluster: {
                timeCode: BigInt(0),
                pos: -BigInt(1),
                block: {
                    pos: -BigInt(1),
                    size: -BigInt(1)
                },
                blockGroup: {
                    block: null
                }
            },
            clusterIndexes: [],
            clusterIndexesPosMap: new Map()
        };
        formatContext.privateData = this.context = context;
    }
    analyzeStreams(formatContext) {
        const tag2CodecId = this.context.header.docType === 'webm' ? _matroska_matroska__WEBPACK_IMPORTED_MODULE_12__.WebmTag2CodecId : _matroska_matroska__WEBPACK_IMPORTED_MODULE_12__.MkvTag2CodecId;
        if (this.context.tracks) {
            common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(this.context.tracks.entry, (track) => {
                const stream = formatContext.createStream();
                stream.privData = track;
                stream.codecpar.codecId = tag2CodecId[track.codecId] || 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                switch (track.type) {
                    case 2 /* MATROSKATrackType.AUDIO */:
                        stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        break;
                    case 1 /* MATROSKATrackType.VIDEO */:
                        stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        break;
                    case 17 /* MATROSKATrackType.SUBTITLE */:
                        stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
                        break;
                    default:
                        stream.codecpar.codecType = -1 /* AVMediaType.AVMEDIA_TYPE_UNKNOWN */;
                }
                if (track.language) {
                    stream.metadata['language'] = track.language;
                }
                if (track.name) {
                    stream.metadata['name'] = track.name;
                }
                track.currentDts = -BigInt(1);
                if (track.audio) {
                    if (track.codecName === 'A_PCM/FLOAT/IEEE') {
                        if (track.audio.bitDepth === 64) {
                            stream.codecpar.codecId = 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */;
                        }
                        else if (track.audio.bitDepth === 32) {
                            stream.codecpar.codecId = 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */;
                        }
                    }
                    else if (track.codecName === 'A_PCM/INT/BIG') {
                        if (track.audio.bitDepth === 16) {
                            stream.codecpar.codecId = 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */;
                        }
                        else if (track.audio.bitDepth === 24) {
                            stream.codecpar.codecId = 65549 /* AVCodecID.AV_CODEC_ID_PCM_S24BE */;
                        }
                        else if (track.audio.bitDepth === 32) {
                            stream.codecpar.codecId = 65545 /* AVCodecID.AV_CODEC_ID_PCM_S32BE */;
                        }
                    }
                    else if (track.codecName === 'A_PCM/INT/LIT') {
                        if (track.audio.bitDepth === 8) {
                            stream.codecpar.codecId = 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */;
                        }
                        else if (track.audio.bitDepth === 16) {
                            stream.codecpar.codecId = 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                        }
                        else if (track.audio.bitDepth === 24) {
                            stream.codecpar.codecId = 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */;
                        }
                        else if (track.audio.bitDepth === 32) {
                            stream.codecpar.codecId = 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */;
                        }
                    }
                    stream.codecpar.chLayout.nbChannels = track.audio.channels;
                    stream.codecpar.sampleRate = ((track.audio.sampleRate) >> 0);
                    stream.codecpar.bitsPerCodedSample = track.audio.bitDepth;
                }
                else if (track.video) {
                    stream.codecpar.width = track.video.pixelWidth;
                    stream.codecpar.height = track.video.pixelHeight;
                    if (track.video.color) {
                        if (common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(track.video.color.primaries)) {
                            stream.codecpar.colorPrimaries = track.video.color.primaries;
                        }
                        if (common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(track.video.color.transferCharacteristics)) {
                            stream.codecpar.colorTrc = track.video.color.transferCharacteristics;
                        }
                        if (common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(track.video.color.range)) {
                            stream.codecpar.colorRange = track.video.color.range;
                        }
                        if (common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(track.video.color.matrixCoefficients)) {
                            stream.codecpar.colorSpace = track.video.color.matrixCoefficients;
                        }
                    }
                }
                let extradataOffset = 0;
                if (track.codecId === 'V_MS/VFW/FOURCC' && track.codecPrivate?.size >= 40) {
                    stream.codecpar.bitsPerCodedSample = (track.codecPrivate.data[15] << 8) | track.codecPrivate.data[14];
                    stream.codecpar.codecTag = (track.codecPrivate.data[19] << 24) | (track.codecPrivate.data[18] << 16)
                        | (track.codecPrivate.data[17] << 8) | track.codecPrivate.data[16];
                    stream.codecpar.codecId = _riff_riff__WEBPACK_IMPORTED_MODULE_31__.codecBmpTags[stream.codecpar.codecTag] || 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                    if (stream.codecpar.codecId === 0 /* AVCodecID.AV_CODEC_ID_NONE */) {
                        stream.codecpar.codecId === _isom_tags__WEBPACK_IMPORTED_MODULE_32__.codecMovVideoTags[stream.codecpar.codecTag] || 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                    }
                    extradataOffset = 40;
                }
                else if (track.codecId === 'V_QUICKTIME' && track.codecPrivate?.size >= 21) {
                    const tags = stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */ ? _isom_tags__WEBPACK_IMPORTED_MODULE_32__.codecMovAudioTags : _isom_tags__WEBPACK_IMPORTED_MODULE_32__.codecMovVideoTags;
                    stream.codecpar.codecTag = (track.codecPrivate.data[3] << 24) | (track.codecPrivate.data[2] << 16)
                        | (track.codecPrivate.data[1] << 8) | track.codecPrivate.data[0];
                    const codecId = tags[stream.codecpar.codecTag];
                    if (codecId) {
                        const data = new Uint8Array(4);
                        const size = (Number(track.codecPrivate.size & 0xffffffffn) >> 0);
                        data[0] = (size >>> 24) & 0xff;
                        data[1] = (size >>> 16) & 0xff;
                        data[2] = (size >>> 8) & 0xff;
                        data[3] = size & 0xff;
                        track.codecPrivate.size += BigInt(4);
                        track.codecPrivate.data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_33__["default"])(Uint8Array, [data, track.codecPrivate.data]);
                    }
                    stream.codecpar.codecId = codecId || 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                }
                if (track.codecPrivate?.data && (track.codecPrivate.size - BigInt(Math.floor(extradataOffset))) > 0) {
                    let codecPrivateData = track.codecPrivate.data.subarray(extradataOffset);
                    if (stream.codecpar.codecId === 94212 /* AVCodecID.AV_CODEC_ID_SSA */
                        || stream.codecpar.codecId === 94230 /* AVCodecID.AV_CODEC_ID_ASS */) {
                        const header = common_util_text__WEBPACK_IMPORTED_MODULE_34__.decode(codecPrivateData);
                        let lines = header.split(/\r?\n/);
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].trim() === '[Events]') {
                                lines = lines.slice(0, i);
                                break;
                            }
                        }
                        lines.push('[Events]');
                        lines.push('Format: ReadOrder, Layer, Style, Name, MarginL, MarginR, MarginV, Effect, Text');
                        codecPrivateData = common_util_text__WEBPACK_IMPORTED_MODULE_34__.encode(lines.join('\n'));
                    }
                    stream.codecpar.extradataSize = codecPrivateData.length;
                    stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(codecPrivateData.length);
                    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(stream.codecpar.extradata, codecPrivateData.length, codecPrivateData);
                    if (stream.codecpar.extradata) {
                        switch (stream.codecpar.codecId) {
                            case 27 /* AVCodecID.AV_CODEC_ID_H264 */:
                                _codecs_h264__WEBPACK_IMPORTED_MODULE_15__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 173 /* AVCodecID.AV_CODEC_ID_HEVC */:
                                _codecs_hevc__WEBPACK_IMPORTED_MODULE_16__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 196 /* AVCodecID.AV_CODEC_ID_VVC */:
                                _codecs_vvc__WEBPACK_IMPORTED_MODULE_17__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 225 /* AVCodecID.AV_CODEC_ID_AV1 */:
                                _codecs_av1__WEBPACK_IMPORTED_MODULE_20__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 139 /* AVCodecID.AV_CODEC_ID_VP8 */:
                                _codecs_vp8__WEBPACK_IMPORTED_MODULE_18__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 167 /* AVCodecID.AV_CODEC_ID_VP9 */:
                                _codecs_vp9__WEBPACK_IMPORTED_MODULE_19__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 86018 /* AVCodecID.AV_CODEC_ID_AAC */:
                                _codecs_aac__WEBPACK_IMPORTED_MODULE_23__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 86017 /* AVCodecID.AV_CODEC_ID_MP3 */:
                                _codecs_mp3__WEBPACK_IMPORTED_MODULE_21__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                            case 86076 /* AVCodecID.AV_CODEC_ID_OPUS */:
                                _codecs_opus__WEBPACK_IMPORTED_MODULE_22__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                break;
                        }
                    }
                    else {
                        let extradata;
                        switch (stream.codecpar.codecId) {
                            case 86018 /* AVCodecID.AV_CODEC_ID_AAC */:
                                extradata = _codecs_aac__WEBPACK_IMPORTED_MODULE_23__.avCodecParameters2Extradata(stream.codecpar);
                                break;
                        }
                        if (extradata) {
                            stream.codecpar.extradataSize = extradata.length;
                            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(stream.codecpar.extradataSize);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize, extradata);
                        }
                    }
                }
                if (this.context.info) {
                    stream.timeBase.num = 1;
                    if (this.context.info.timestampScale) {
                        stream.timeBase.den = (((avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE * 1000) / this.context.info.timestampScale) >> 0);
                    }
                    else {
                        stream.timeBase.den = 1000;
                        this.context.info.timestampScale = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE;
                    }
                    if (this.context.info.duration) {
                        stream.duration = BigInt(Math.floor(this.context.info.duration));
                    }
                }
                if (track.default == null || track.default) {
                    stream.disposition |= 1 /* AVDisposition.DEFAULT */;
                }
                if (track.encodings) {
                    common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(track.encodings.entry, (entry) => {
                        if (entry.compression && (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_35__["default"])(entry.compression.algo)) {
                            track.needDecompression = true;
                        }
                        if (entry.encryption && (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_35__["default"])(entry.encryption.algo)) {
                            track.needDecryption = true;
                        }
                    });
                }
            });
        }
        if (this.context.attachments) {
            common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(this.context.attachments.entry, (attachment) => {
                const stream = formatContext.createStream();
                stream.codecpar.codecType = 4 /* AVMediaType.AVMEDIA_TYPE_ATTACHMENT */;
                stream.privData = attachment;
                if (attachment.data) {
                    stream.codecpar.extradataSize = (Number(attachment.data.size & 0xffffffffn) >> 0);
                    stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(stream.codecpar.extradataSize);
                    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize, attachment.data.data);
                }
            });
        }
        if (this.context.tags) {
            common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(this.context.tags.entry, (tag) => {
                if (tag.tag?.name === 'DURATION') {
                    let time = tag.tag.string.replaceAll('\x00', '').split('.');
                    let f = time[0].split(':');
                    let duration = BigInt(+f[0]) * BigInt(3600000000)
                        + BigInt(+f[1]) * BigInt(60000000)
                        + BigInt(+f[2]) * BigInt(1000000)
                        + (BigInt(+time[1]) / BigInt(1000));
                    const stream = (0,_matroska_function_findStreamByTrackUid__WEBPACK_IMPORTED_MODULE_26__["default"])(formatContext.streams, tag.target.trackUid);
                    if (stream) {
                        stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(duration, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase);
                    }
                }
            });
        }
        if (this.context.chapters) {
            common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(this.context.chapters.entry, (chapter) => {
                const atom = chapter.atom;
                if (atom) {
                    common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(atom, (item) => {
                        formatContext.chapters.push({
                            id: item.uid,
                            start: item.start,
                            end: item.end,
                            timeBase: {
                                num: 1,
                                den: 1000000000
                            },
                            metadata: {
                                title: item.display?.title || '',
                                language: item.display?.language || ''
                            }
                        });
                    });
                }
            });
        }
    }
    async readHeader(formatContext) {
        const magic = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
        if (magic !== 440786851 /* EBMLId.HEADER */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('not matroska format', cheap__fileName__0, 408);
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
        const headerSize = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
        this.context.header = common_util_object__WEBPACK_IMPORTED_MODULE_30__.extend(this.context.header, await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, headerSize, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxHeader));
        const segmentId = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
        if (segmentId !== 408125543 /* EBMLId.SEGMENT */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('not matroska format', cheap__fileName__0, 417);
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
        const segmentSize = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
        this.context.segmentStart = formatContext.ioReader.getPos();
        const segmentEndPos = formatContext.ioReader.getPos() + segmentSize;
        const readTopLevelEbml = new Set();
        let hasTracks = false;
        let hasCluster = false;
        while (formatContext.ioReader.getPos() < segmentEndPos || !hasTracks || !hasCluster) {
            const currentElementPos = formatContext.ioReader.getPos();
            const id = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
            if (id === avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID) {
                await this.syncTopLevelElement(formatContext, 2);
                continue;
            }
            const length = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
            if (length === BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID)) {
                await this.syncTopLevelElement(formatContext, 2);
                continue;
            }
            if (id === 290298740 /* EBMLId.SEEK_HEAD */) {
                this.context.isLive = false;
                this.context.seekHead = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxHeadSeek);
            }
            else if (id === 475249515 /* EBMLId.CUES */) {
                this.context.isLive = false;
                this.context.cues = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxCues);
            }
            else if (id === 272869232 /* EBMLId.CHAPTERS */) {
                this.context.isLive = false;
                this.context.chapters = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxChapters);
            }
            else if (id === 357149030 /* EBMLId.INFO */) {
                this.context.info = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxInfo);
            }
            else if (id === 307544935 /* EBMLId.TAGS */) {
                this.context.tags = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxTags);
            }
            else if (id === 423732329 /* EBMLId.ATTACHMENTS */) {
                this.context.attachments = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxAttachments);
            }
            else if (id === 374648427 /* EBMLId.TRACKS */) {
                hasTracks = true;
                this.context.tracks = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxTracks);
            }
            else if (id === 524531317 /* EBMLId.CLUSTER */) {
                hasCluster = true;
                this.context.firstCluster = currentElementPos;
                if (this.context.isLive || !this.context.seekHead || !(formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */)) {
                    break;
                }
                const entry = this.context.seekHead.entry;
                let i = 0;
                for (; i < entry.length; i++) {
                    if (!readTopLevelEbml.has(entry[i].id)) {
                        await formatContext.ioReader.seek(entry[i].pos + this.context.segmentStart);
                        break;
                    }
                }
                if (i === entry.length) {
                    break;
                }
            }
            else {
                await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
            }
            readTopLevelEbml.add(id);
        }
        if (this.context.firstCluster > 0) {
            await formatContext.ioReader.seek(this.context.firstCluster);
        }
        this.analyzeStreams(formatContext);
        return 0;
    }
    parseAdditions(avpacket, additions) {
        for (let i = 0; i < additions.entry.length; i++) {
            const addition = additions.entry[i];
            if (addition.additional?.size) {
                if (addition.additionalId === 4 /* MATROSKABlockAddIdType.ITU_T_T35 */) {
                    // TODO handle ITU_T_T35
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn('ITU_T_T35 not support now', cheap__fileName__0, 511);
                }
                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(addition.additional.data.length + 8);
                avutil_util_intwrite__WEBPACK_IMPORTED_MODULE_28__.wb64(data, BigInt(addition.additionalId >>> 0));
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data + 8, addition.additional.data.length, addition.additional.data);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_10__.addAVPacketSideData)(avpacket, 15 /* AVPacketSideDataType.AV_PKT_DATA_MATROSKA_BLOCKADDITIONAL */, data, addition.additional.data.length + 8);
            }
        }
    }
    async parseBlock(formatContext, packet) {
        const buffer = this.context.currentCluster.block?.data || this.context.currentCluster.blockGroup.block.data;
        let basePos = this.context.currentCluster.block?.pos;
        if (basePos < 0) {
            basePos = this.context.currentCluster.blockGroup.block.pos;
        }
        let isKey = -1;
        let additions;
        let duration = BigInt(0);
        if (this.context.currentCluster.blockGroup?.block) {
            additions = this.context.currentCluster.blockGroup.additions;
            if (this.context.currentCluster.blockGroup.reference) {
                isKey = this.context.currentCluster.blockGroup.reference.length === 0 ? 1 : 0;
            }
            else {
                isKey = 1;
            }
            if (this.context.currentCluster.blockGroup.duration) {
                duration = this.context.currentCluster.blockGroup.duration;
            }
        }
        if (!this.blockReader) {
            this.blockReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_25__["default"](buffer);
        }
        else {
            this.blockReader.resetBuffer(buffer);
        }
        const now = this.blockReader.getPos();
        const trackNumber = Number(await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(this.blockReader, 8) & 0xffffffffn);
        const stream = (0,_matroska_function_findStreamByTrackNumber__WEBPACK_IMPORTED_MODULE_27__["default"])(formatContext.streams, trackNumber);
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(`invalid track number ${trackNumber}`, cheap__fileName__0, 562);
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.EAGAIN;
        }
        const timestamp = this.blockReader.readInt16();
        const flags = this.blockReader.readUint8();
        if (isKey === -1) {
            isKey = (flags & 0x80) ? 1 : 0;
        }
        const lacing = (flags >>> 1) & 0x03;
        let frameCount = 0;
        let frameSize = [];
        switch (lacing) {
            case 1 /* MATROSKALacingMode.XIPH */: {
                frameCount = this.blockReader.readUint8() + 1;
                let sum = 0;
                for (let i = 0; i < frameCount - 1; i++) {
                    let size = 0;
                    while (true) {
                        const next = this.blockReader.readUint8();
                        if (next === 0) {
                            break;
                        }
                        if (next !== 0xff) {
                            size += next;
                            break;
                        }
                        size += 0xff;
                    }
                    sum += size;
                    frameSize.push(size);
                }
                // the last frame
                frameSize.push(buffer.length - (Number(this.blockReader.getPos() - now & 0xffffffffn) >> 0) - sum);
                break;
            }
            case 3 /* MATROSKALacingMode.EBML */: {
                frameCount = this.blockReader.readUint8() + 1;
                frameSize.push(await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt)(this.blockReader, 4));
                let sum = frameSize[0];
                for (let i = 1; i < frameCount - 1; i++) {
                    const next = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVSint)(this.blockReader, 4);
                    let size = next + frameSize[i - 1];
                    sum += size;
                    frameSize.push(size);
                }
                // the last frame
                frameSize.push(buffer.length - (Number(this.blockReader.getPos() - now & 0xffffffffn) >> 0) - sum);
                break;
            }
            case 2 /* MATROSKALacingMode.FIXED_SIZE */:
                frameCount = this.blockReader.readUint8() + 1;
                const size = (buffer.length - (Number(this.blockReader.getPos() - now & 0xffffffffn) >> 0)) / frameCount;
                for (let i = 0; i < frameCount; i++) {
                    frameSize.push(size);
                }
                break;
            case 0 /* MATROSKALacingMode.NO_LACING */:
                frameCount = 1;
                frameSize.push(buffer.length - (Number(this.blockReader.getPos() - now & 0xffffffffn) >> 0));
                break;
        }
        const track = stream.privData;
        const trackTimestampScale = track.timeScale || 1;
        if (track.needDecryption) {
            throw new Error('not support encryption stream');
        }
        // 纳秒时间戳
        let pts = (this.context.currentCluster.timeCode + BigInt(Math.floor((timestamp * trackTimestampScale))))
            * BigInt(this.context.info.timestampScale >>> 0);
        if (track.codecDelay) {
            pts -= track.codecDelay;
        }
        // 微秒时间戳
        pts /= BigInt(1000);
        pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(pts, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase);
        duration = BigInt(Math.floor(((Number(duration & 0xffffffffn) >> 0) * trackTimestampScale))) * BigInt(this.context.info.timestampScale >>> 0);
        duration /= BigInt(1000);
        duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(duration, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase);
        for (let i = 0; i < frameCount; i++) {
            const avpacket = i !== 0 ? (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_10__.createAVPacket)() : packet;
            let size = frameSize[i];
            let offset = 0;
            let header;
            if (track.needDecompression) {
                const compression = track.encodings.entry.find((entry) => {
                    return !!entry.compression;
                });
                switch (compression.compression.algo) {
                    case 3 /* MATROSKATrackEncodingComp.HEADER_STRIP */:
                        header = compression.compression.settings.data;
                        size += header.length;
                        offset = header.length;
                        break;
                    default:
                        throw new Error(`not support compression stream, algo: ${compression.compression.algo}`);
                }
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 56, basePos + this.blockReader.getPos());
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(avpacket + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 8, pts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 28, size);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 48, duration);
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(size);
            if (header) {
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data, offset, header);
            }
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data + offset, frameSize[i], this.blockReader.readBuffer(frameSize[i]));
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_10__.addAVPacketData)(avpacket, data, size);
            if (stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                if (isKey) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, pts);
            }
            else {
                if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 80, 1 /* h264.BitFormat.AVCC */);
                }
                if (isKey) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                    if (track.gopCount > 1) {
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.maxPts - track.minPts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q) / BigInt(track.gopCount - 1 >>> 0);
                        track.firstGopGot = true;
                    }
                    else if (!track.dtsDelta) {
                        // 以 30 帧开始
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(BigInt(33), avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_MILLI_TIME_BASE_Q, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q);
                    }
                    track.gopCount = 1;
                    track.minPts = pts;
                    track.maxPts = pts;
                }
                else {
                    if (!track.firstGopGot && track.gopCount > 2 && pts > track.maxPts) {
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.maxPts - track.minPts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q) / BigInt(track.gopCount - 1 >>> 0);
                    }
                    else if (!track.dtsDelta) {
                        // 以 30 帧开始
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(BigInt(33), avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_MILLI_TIME_BASE_Q, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q);
                    }
                    track.gopCount++;
                }
                if (pts > track.maxPts) {
                    track.maxPts = pts;
                }
                if (track.currentDts >= BigInt(0)) {
                    if (duration) {
                        track.currentDts = track.currentDts + (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(duration, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q);
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.currentDts, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase));
                    }
                    else {
                        track.currentDts = track.currentDts + track.dtsDelta;
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.currentDts, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase));
                    }
                }
                else {
                    track.currentDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 8), stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q);
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 8));
                    // 第一个包从 0 开始
                    if (track.currentDts < BigInt(100000)) {
                        track.currentDts = BigInt(0);
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, BigInt(0));
                    }
                }
            }
            if (additions) {
                this.parseAdditions(avpacket, additions);
            }
            if (i !== 0) {
                formatContext.interval.packetBuffer.push(avpacket);
            }
        }
        this.context.currentCluster.block = {
            pos: -BigInt(1),
            size: -BigInt(1)
        };
        this.context.currentCluster.blockGroup = {
            block: null
        };
        return 0;
    }
    addClusterIndex(clusterIndex) {
        if (this.context.clusterIndexesPosMap.has(clusterIndex.pos)) {
            return;
        }
        const index = common_util_array__WEBPACK_IMPORTED_MODULE_14__.binarySearch(this.context.clusterIndexes, (sample) => {
            if (sample.time < clusterIndex.time) {
                return 1;
            }
            else {
                return -1;
            }
        });
        if (index > -1) {
            this.context.clusterIndexesPosMap.set(clusterIndex.pos, index);
            this.context.clusterIndexes.splice(index, 0, clusterIndex);
        }
        else {
            this.context.clusterIndexesPosMap.set(clusterIndex.pos, this.context.clusterIndexes.length);
            this.context.clusterIndexes.push(clusterIndex);
        }
    }
    async readAVPacket_(formatContext, avpacket) {
        const now = formatContext.ioReader.getPos();
        const id = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
        if (id === avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID) {
            await this.syncTopLevelElement(formatContext);
            return this.readAVPacket_(formatContext, avpacket);
        }
        const length = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
        if (length === BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID)) {
            await this.syncTopLevelElement(formatContext);
            return this.readAVPacket_(formatContext, avpacket);
        }
        if (id === 524531317 /* EBMLId.CLUSTER */) {
            this.context.currentCluster.pos = now;
            this.context.currentCluster.timeCode = BigInt(0);
            await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxCluster, this.context.currentCluster, [163 /* EBMLId.SIMPLE_BLOCK */, 160 /* EBMLId.BLOCK_GROUP */]);
            this.addClusterIndex({
                time: this.context.currentCluster.timeCode,
                pos: now
            });
            let ret = await this.parseBlock(formatContext, avpacket);
            if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_7__.EAGAIN) {
                return this.readAVPacket_(formatContext, avpacket);
            }
            else if (ret < 0) {
                return ret;
            }
        }
        else if (id === 163 /* EBMLId.SIMPLE_BLOCK */) {
            this.context.currentCluster.block = {
                pos: formatContext.ioReader.getPos(),
                size: length,
                data: await formatContext.ioReader.readBuffer((Number(length & 0xffffffffn) >> 0))
            };
            let ret = await this.parseBlock(formatContext, avpacket);
            if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_7__.EAGAIN) {
                return this.readAVPacket_(formatContext, avpacket);
            }
            else if (ret < 0) {
                return ret;
            }
        }
        else if (id === 160 /* EBMLId.BLOCK_GROUP */) {
            await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, length, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxBlockGroup, this.context.currentCluster.blockGroup);
            let ret = await this.parseBlock(formatContext, avpacket);
            if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_7__.EAGAIN) {
                return this.readAVPacket_(formatContext, avpacket);
            }
            else if (ret < 0) {
                return ret;
            }
        }
        else if (id === 475249515 /* EBMLId.CUES */
            || id === 307544935 /* EBMLId.TAGS */
            || id === 423732329 /* EBMLId.ATTACHMENTS */
            || id === 272869232 /* EBMLId.CHAPTERS */
            || id === 357149030 /* EBMLId.INFO */
            || id === 374648427 /* EBMLId.TRACKS */
            || id === 290298740 /* EBMLId.SEEK_HEAD */) {
            await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
            return this.readAVPacket_(formatContext, avpacket);
        }
        else {
            await this.syncTopLevelElement(formatContext);
            return this.readAVPacket_(formatContext, avpacket);
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(error.message, cheap__fileName__0, 889);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncTopLevelElement(formatContext, analyzeCount = 3) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
        while (true) {
            try {
                const now = formatContext.ioReader.getPos();
                const id = await formatContext.ioReader.peekUint32();
                if (id === 524531317 /* EBMLId.CLUSTER */
                    || id === 475249515 /* EBMLId.CUES */
                    || id === 307544935 /* EBMLId.TAGS */
                    || id === 423732329 /* EBMLId.ATTACHMENTS */
                    || id === 272869232 /* EBMLId.CHAPTERS */
                    || id === 357149030 /* EBMLId.INFO */
                    || id === 374648427 /* EBMLId.TRACKS */
                    || id === 290298740 /* EBMLId.SEEK_HEAD */) {
                    pos = now;
                    let count = 0;
                    await formatContext.ioReader.skip(4);
                    const length = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
                    if (length === BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID)) {
                        await formatContext.ioReader.seek(now + BigInt(1));
                        continue;
                    }
                    await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
                    while (count <= analyzeCount) {
                        const id = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
                        const length = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
                        if (id === 524531317 /* EBMLId.CLUSTER */
                            || id === 475249515 /* EBMLId.CUES */
                            || id === 307544935 /* EBMLId.TAGS */
                            || id === 423732329 /* EBMLId.ATTACHMENTS */
                            || id === 272869232 /* EBMLId.CHAPTERS */
                            || id === 357149030 /* EBMLId.INFO */
                            || id === 374648427 /* EBMLId.TRACKS */
                            || id === 290298740 /* EBMLId.SEEK_HEAD */) {
                            count++;
                            await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
                        }
                        else {
                            break;
                        }
                    }
                    if (count < analyzeCount) {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
                    }
                    else {
                        break;
                    }
                }
                else {
                    await formatContext.ioReader.skip(1);
                    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
                }
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q);
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
        if (this.context.cues?.entry.length) {
            const track = stream.privData;
            for (let i = 0; i < this.context.cues.entry.length; i++) {
                const cue = this.context.cues.entry[i];
                const time = (cue.time || BigInt(0)) * BigInt(this.context.info.timestampScale >>> 0) / BigInt(1000);
                if (time > pts) {
                    const poses = this.context.cues.entry[Math.max(i - 1, 0)].pos;
                    if (poses.length) {
                        const matchPos = poses.find((p) => p.track === track.number);
                        if (matchPos) {
                            pos = matchPos.pos + this.context.segmentStart;
                            break;
                        }
                    }
                }
            }
        }
        if (pos === avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT && this.context.clusterIndexes.length) {
            for (let i = 0; i < this.context.clusterIndexes.length; i++) {
                const time = this.context.clusterIndexes[i].time * BigInt(this.context.info.timestampScale >>> 0) / BigInt(1000);
                if (time > pts) {
                    pos = this.context.clusterIndexes[Math.max(i - 1, 0)].pos;
                    break;
                }
            }
            if (pos === avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT) {
                pos = this.context.clusterIndexes[this.context.clusterIndexes.length - 1].pos;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
            common_util_array__WEBPACK_IMPORTED_MODULE_14__.each(this.context.tracks.entry, (track) => {
                track.currentDts = -BigInt(1);
            });
            return now;
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.FORMAT_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return this.context.tracks?.entry.length ?? 2;
    }
}


/***/ }),

/***/ "./src/avformat/formats/isom/tags.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/isom/tags.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   codecMovAudioTags: () => (/* binding */ codecMovAudioTags),
/* harmony export */   codecMovVideoTags: () => (/* binding */ codecMovVideoTags)
/* harmony export */ });
/* harmony import */ var avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avformat/function/mktagle */ "./src/avformat/function/mktagle.ts");
/*
 * libmedia isom tag defined
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

const codecMovVideoTags = {
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvc1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvi1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hvc1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvhe')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc3')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc4')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai52')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai53')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai55')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai56')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai12')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai13')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai15')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai16')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AVin')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('aivx')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('rv64')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('xalg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avlg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dva1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvav')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp08')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp09')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('av01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
};
const codecMovAudioTags = {
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4a')]: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sac3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-4')]: 86119 /* AVCodecID.AV_CODEC_ID_AC4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsc')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsh')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsl')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtse')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DTS ')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ec-3')]: 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('.mp3')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp3 ')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [0x6D730055]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('spex')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SPXN')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fLaC')]: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Opus')]: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('alaw')]: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ulaw')]: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl32')]: 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl64')]: 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('twos')]: 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('lpcm')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in24')]: 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in32')]: 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('raw ')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('NONE')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
};


/***/ }),

/***/ "./src/avformat/formats/matroska/function/findStreamByTrackNumber.ts":
/*!***************************************************************************!*\
  !*** ./src/avformat/formats/matroska/function/findStreamByTrackNumber.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findStreamByTrackNumber)
/* harmony export */ });
/*
 * libmedia
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
function findStreamByTrackNumber(streams, number) {
    for (let i = 0; i < streams.length; i++) {
        const track = streams[i].privData;
        if (track.number === number) {
            return streams[i];
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/matroska/function/findStreamByTrackUid.ts":
/*!************************************************************************!*\
  !*** ./src/avformat/formats/matroska/function/findStreamByTrackUid.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ findStreamByTrackUid)
/* harmony export */ });
/*
 * libmedia
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
function findStreamByTrackUid(streams, uid) {
    for (let i = 0; i < streams.length; i++) {
        const track = streams[i].privData;
        if (track.uid === uid) {
            return streams[i];
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/matroska/imatroska.ts":
/*!****************************************************!*\
  !*** ./src/avformat/formats/matroska/imatroska.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EbmlSyntaxAttachments: () => (/* binding */ EbmlSyntaxAttachments),
/* harmony export */   EbmlSyntaxBlockGroup: () => (/* binding */ EbmlSyntaxBlockGroup),
/* harmony export */   EbmlSyntaxChapters: () => (/* binding */ EbmlSyntaxChapters),
/* harmony export */   EbmlSyntaxCluster: () => (/* binding */ EbmlSyntaxCluster),
/* harmony export */   EbmlSyntaxCues: () => (/* binding */ EbmlSyntaxCues),
/* harmony export */   EbmlSyntaxHeadSeek: () => (/* binding */ EbmlSyntaxHeadSeek),
/* harmony export */   EbmlSyntaxHeader: () => (/* binding */ EbmlSyntaxHeader),
/* harmony export */   EbmlSyntaxInfo: () => (/* binding */ EbmlSyntaxInfo),
/* harmony export */   EbmlSyntaxTags: () => (/* binding */ EbmlSyntaxTags),
/* harmony export */   EbmlSyntaxTracks: () => (/* binding */ EbmlSyntaxTracks),
/* harmony export */   parseEbmlSyntax: () => (/* binding */ parseEbmlSyntax),
/* harmony export */   readEbmlId: () => (/* binding */ readEbmlId),
/* harmony export */   readVInt: () => (/* binding */ readVInt),
/* harmony export */   readVInt64: () => (/* binding */ readVInt64),
/* harmony export */   readVSint: () => (/* binding */ readVSint)
/* harmony export */ });
/* unused harmony exports EbmlSyntaxHeadSeekEntry, EbmlSyntaxTrackAudio, EbmlSyntaxMasteringMeta, EbmlSyntaxVideoColor, EbmlSyntaxVideoProjection, EbmlSyntaxTrackVideo, EbmlSyntaxTrackPlane, EbmlSyntaxTrackCombinePlanes, EbmlSyntaxTrackOperation, EbmlSyntaxTrackEncodingCompression, EbmlSyntaxTrackEncodingEncryption, EbmlSyntaxTrackEncoding, EbmlSyntaxTrackEncodings, EbmlSyntaxTrackEntry, EbmlSyntaxAttachment, EbmlSyntaxChapterDisplay, EbmlSyntaxChapterAtom, EbmlSyntaxChapter, EbmlSyntaxCuePointPos, EbmlSyntaxCuePoint, EbmlSyntaxTagTargets, EbmlSyntaxSimpleTag, EbmlSyntaxTag, EbmlSyntaxAddition, EbmlSyntaxAdditions, readUint, readInt, readFloat, parseEbml */
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\matroska\\imatroska.ts";




const MAX_ATTACHMENT_READ_SIZE = BigInt(20971520);
const EbmlSyntaxHeadSeekEntry = {
    [21419 /* EBMLId.SEEK_ID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'id'
    },
    [21420 /* EBMLId.SEEK_POSITION */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'pos'
    }
};
const EbmlSyntaxHeadSeek = {
    [19899 /* EBMLId.SEEK_ENTRY */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxHeadSeekEntry
    }
};
const EbmlSyntaxInfo = {
    [29604 /* EBMLId.SEGMENT_UID */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'segmentUUID'
    },
    [2807729 /* EBMLId.TIME_CODE_SCALE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'timestampScale'
    },
    [17545 /* EBMLId.DURATION */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'duration'
    },
    [31657 /* EBMLId.TITLE */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'title'
    },
    [19840 /* EBMLId.MUXING_APP */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'muxingApp'
    },
    [22337 /* EBMLId.WRITING_APP */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'writingApp'
    },
    [17505 /* EBMLId.DATE_UTC */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'dateUTC'
    },
};
const EbmlSyntaxTrackAudio = {
    [181 /* EBMLId.AUDIO_SAMPLING_FREQ */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'sampleRate'
    },
    [30901 /* EBMLId.AUDIO_OUT_SAMPLING_FREQ */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'outSampleRate'
    },
    [25188 /* EBMLId.AUDIO_BITDEPTH */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'bitDepth'
    },
    [159 /* EBMLId.AUDIO_CHANNELS */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'channels'
    },
};
const EbmlSyntaxMasteringMeta = {
    [21969 /* EBMLId.VIDEO_COLOR_RX */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'rx'
    },
    [21970 /* EBMLId.VIDEO_COLOR_RY */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'ry'
    },
    [21971 /* EBMLId.VIDEO_COLOR_GX */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'gx'
    },
    [21972 /* EBMLId.VIDEO_COLOR_GY */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'gy'
    },
    [21973 /* EBMLId.VIDEO_COLOR_BX */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'bx'
    },
    [21974 /* EBMLId.VIDEO_COLOR_BY */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'by'
    },
    [21975 /* EBMLId.VIDEO_COLOR_WHITE_X */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'whiteX'
    },
    [21976 /* EBMLId.VIDEO_COLOR_WHITE_Y */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'whiteY'
    },
    [21978 /* EBMLId.VIDEO_COLOR_LUMINA_NCE_MIN */]: {
        type: 5 /* EbmlType.FLOAT */,
        isArray: true,
        filedName: 'minLuminance'
    },
    [21977 /* EBMLId.VIDEO_COLOR_LUMINA_NCE_MAX */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'maxLuminance'
    }
};
const EbmlSyntaxVideoColor = {
    [21937 /* EBMLId.VIDEO_COLOR_MATRIX_COEFF */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'matrixCoefficients'
    },
    [21938 /* EBMLId.VIDEO_COLOR_BITS_PER_CHANNEL */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'bitsPerChannel'
    },
    [21941 /* EBMLId.VIDEO_COLOR_CB_SUB_HORZ */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'cbSubHorz'
    },
    [21942 /* EBMLId.VIDEO_COLOR_CB_SUB_VERT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'cbSubVert'
    },
    [21939 /* EBMLId.VIDEO_COLOR_CHROMA_SUB_HORZ */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'chromaSubHorz'
    },
    [21940 /* EBMLId.VIDEO_COLOR_CHROMA_SUB_VERT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'chromaSubVert'
    },
    [21943 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_HORZ */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'chromaSitingHorz'
    },
    [21944 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_VERT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'chromaSitingVert'
    },
    [21945 /* EBMLId.VIDEO_COLOR_RANGE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'range'
    },
    [21946 /* EBMLId.VIDEO_COLOR_TRANSFER_CHARACTERISTICS */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'transferCharacteristics'
    },
    [21947 /* EBMLId.VIDEO_COLOR_PRIMARIES */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'primaries'
    },
    [21948 /* EBMLId.VIDEO_COLOR_MAX_CLL */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'maxCll'
    },
    [21949 /* EBMLId.VIDEO_COLOR_MAX_FALL */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'maxFall'
    },
    [21968 /* EBMLId.VIDEO_COLOR_MASTERING_META */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'masteringMeta',
        child: EbmlSyntaxMasteringMeta
    },
};
const EbmlSyntaxVideoProjection = {
    [30321 /* EBMLId.VIDEO_PROJECTION_TYPE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'type'
    },
    [30322 /* EBMLId.VIDEO_PROJECTION_PRIVATE */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'private'
    },
    [30323 /* EBMLId.VIDEO_PROJECTION_POSE_YAW */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'yaw'
    },
    [30324 /* EBMLId.VIDEO_PROJECTION_POSE_PITCH */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'pitch'
    },
    [30325 /* EBMLId.VIDEO_PROJECTION_POSE_ROLL */]: {
        type: 5 /* EbmlType.FLOAT */,
        filedName: 'roll'
    },
};
const EbmlSyntaxTrackVideo = {
    [2327523 /* EBMLId.VIDEO_FRAMERATE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'framerate'
    },
    [21680 /* EBMLId.VIDEO_DISPLAY_WIDTH */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'displayWidth'
    },
    [21690 /* EBMLId.VIDEO_DISPLAY_HEIGHT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'displayHeight'
    },
    [176 /* EBMLId.VIDEO_PIXEL_WIDTH */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'pixelWidth'
    },
    [186 /* EBMLId.VIDEO_PIXEL_HEIGHT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'pixelHeight'
    },
    [3061028 /* EBMLId.VIDEO_COLORSPACE */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'colorSpace'
    },
    [21440 /* EBMLId.VIDEO_ALPHA_MODE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'alphaMode'
    },
    [21936 /* EBMLId.VIDEO_COLOR */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'color',
        child: EbmlSyntaxVideoColor
    },
    [30320 /* EBMLId.VIDEO_PROJECTION */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'projection',
        child: EbmlSyntaxVideoProjection
    },
    [21682 /* EBMLId.VIDEO_DISPLAY_UNIT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'displayUnit'
    },
    [154 /* EBMLId.VIDEO_FLAG_INTERLACED */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'interlaced'
    },
    [157 /* EBMLId.VIDEO_FIELD_ORDER */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'fieldOrder'
    },
    [21432 /* EBMLId.VIDEO_STEREO_MODE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'stereoMode'
    },
    [21683 /* EBMLId.VIDEO_ASPECT_RATIO */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'aspectRatio'
    }
};
const EbmlSyntaxTrackPlane = {
    [230 /* EBMLId.TRACK_PLANE_TYPE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'type'
    },
    [229 /* EBMLId.TRACK_PLANE_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'uid'
    }
};
const EbmlSyntaxTrackCombinePlanes = {
    [228 /* EBMLId.TRACK_PLANE */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'planes',
        child: EbmlSyntaxTrackPlane
    }
};
const EbmlSyntaxTrackOperation = {
    [227 /* EBMLId.TRACK_COMBINE_PLANES */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxTrackCombinePlanes
    }
};
const EbmlSyntaxTrackEncodingCompression = {
    [16980 /* EBMLId.ENCODING_COMP_ALGO */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'algo'
    },
    [16981 /* EBMLId.ENCODING_COMP_SETTINGS */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'settings'
    }
};
const EbmlSyntaxTrackEncodingEncryption = {
    [18401 /* EBMLId.ENCODING_ENC_ALGO */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'algo'
    },
    [18402 /* EBMLId.ENCODING_ENC_KEY_ID */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'keyId'
    }
};
const EbmlSyntaxTrackEncoding = {
    [20530 /* EBMLId.ENCODING_SCOPE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'scope'
    },
    [20531 /* EBMLId.ENCODING_TYPE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'type'
    },
    [20532 /* EBMLId.ENCODING_COMPRESSION */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'compression',
        child: EbmlSyntaxTrackEncodingCompression
    },
    [20533 /* EBMLId.ENCODING_ENCRYPTION */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'encryption',
        child: EbmlSyntaxTrackEncodingEncryption
    },
};
const EbmlSyntaxTrackEncodings = {
    [25152 /* EBMLId.TRACK_CONTENT_ENCODING */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxTrackEncoding
    }
};
const EbmlSyntaxTrackEntry = {
    [215 /* EBMLId.TRACK_NUMBER */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'number'
    },
    [29637 /* EBMLId.TRACK_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'uid'
    },
    [131 /* EBMLId.TRACK_TYPE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'type'
    },
    [21358 /* EBMLId.TRACK_NAME */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'name'
    },
    [136 /* EBMLId.TRACK_FLAG_DEFAULT */]: {
        type: 10 /* EbmlType.BOOL */,
        filedName: 'default'
    },
    [185 /* EBMLId.TRACK_FLAG_ENABLED */]: {
        type: 10 /* EbmlType.BOOL */,
        filedName: 'enabled'
    },
    [2274716 /* EBMLId.TRACK_LANGUAGE */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'language'
    },
    [2306383 /* EBMLId.TRACK_TIME_CODE_SCALE */]: {
        type: 6 /* EbmlType.DOUBLE */,
        filedName: 'timeScale'
    },
    [134 /* EBMLId.CODEC_ID */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'codecId'
    },
    [2459272 /* EBMLId.CODEC_NAME */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'codecName'
    },
    [25506 /* EBMLId.CODEC_PRIVATE */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'codecPrivate'
    },
    [225 /* EBMLId.TRACK_AUDIO */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'audio',
        child: EbmlSyntaxTrackAudio
    },
    [224 /* EBMLId.TRACK_VIDEO */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'video',
        child: EbmlSyntaxTrackVideo
    },
    [226 /* EBMLId.TRACK_OPERATION */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'operations',
        child: EbmlSyntaxTrackOperation
    },
    [28032 /* EBMLId.TRACK_CONTENT_ENCODINGS */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'encodings',
        child: EbmlSyntaxTrackEncodings
    }
};
const EbmlSyntaxTracks = {
    [174 /* EBMLId.TRACK_ENTRY */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxTrackEntry
    }
};
const EbmlSyntaxAttachment = {
    [18094 /* EBMLId.FILE_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'uid'
    },
    [18030 /* EBMLId.FILE_NAME */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'name'
    },
    [18016 /* EBMLId.FILE_MIMETYPE */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'mime'
    },
    [18046 /* EBMLId.FILE_DESC */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'description'
    },
    [18012 /* EBMLId.FILE_DATA */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'data'
    }
};
const EbmlSyntaxAttachments = {
    [24999 /* EBMLId.ATTACHED_FILE */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxAttachment
    }
};
const EbmlSyntaxChapterDisplay = {
    [133 /* EBMLId.CHAP_STRING */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'title'
    },
    [17276 /* EBMLId.CHAP_LANG */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'language'
    }
};
const EbmlSyntaxChapterAtom = {
    [145 /* EBMLId.CHAPTER_TIME_START */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'start'
    },
    [146 /* EBMLId.CHAPTER_TIME_END */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'end'
    },
    [29636 /* EBMLId.CHAPTER_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'uid'
    },
    [128 /* EBMLId.CHAPTER_DISPLAY */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'display',
        child: EbmlSyntaxChapterDisplay
    }
};
const EbmlSyntaxChapter = {
    [182 /* EBMLId.CHAPTER_ATOM */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'atom',
        child: EbmlSyntaxChapterAtom
    }
};
const EbmlSyntaxChapters = {
    [17849 /* EBMLId.EDITION_ENTRY */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxChapter
    }
};
const EbmlSyntaxCuePointPos = {
    [247 /* EBMLId.CUE_TRACK */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'track'
    },
    [241 /* EBMLId.CUE_CLUSTER_POSITION */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'pos'
    }
};
const EbmlSyntaxCuePoint = {
    [179 /* EBMLId.CUE_TIME */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'time'
    },
    [183 /* EBMLId.CUE_TRACK_POSITION */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'pos',
        child: EbmlSyntaxCuePointPos
    }
};
const EbmlSyntaxCues = {
    [187 /* EBMLId.POINT_ENTRY */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxCuePoint
    }
};
const EbmlSyntaxTagTargets = {
    [25546 /* EBMLId.TAG_TARGETS_TYPE */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'type'
    },
    [26826 /* EBMLId.TAG_TARGETS_TYPE_VALUE */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'typeValue'
    },
    [25541 /* EBMLId.TAG_TARGETS_TRACK_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'trackUid'
    },
    [25540 /* EBMLId.TAG_TARGETS_CHAPTER_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'chapterUid'
    },
    [25542 /* EBMLId.TAG_TARGETS_ATTACH_UID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'attachUid'
    },
};
const EbmlSyntaxSimpleTag = {
    [17827 /* EBMLId.TAG_NAME */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'name'
    },
    [17543 /* EBMLId.TAG_STRING */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'string'
    },
    [17530 /* EBMLId.TAG_LANG */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'language'
    },
    [17540 /* EBMLId.TAG_DEFAULT */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'default'
    },
    [17588 /* EBMLId.TAG_DEFAULT_BUG */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'default'
    },
    [26568 /* EBMLId.TAG_SIMPLE */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'sub'
    }
};
EbmlSyntaxSimpleTag[26568 /* EBMLId.TAG_SIMPLE */].child = EbmlSyntaxSimpleTag;
const EbmlSyntaxTag = {
    [26568 /* EBMLId.TAG_SIMPLE */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'tag',
        child: EbmlSyntaxSimpleTag
    },
    [25536 /* EBMLId.TAG_TARGETS */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'target',
        child: EbmlSyntaxTagTargets
    }
};
const EbmlSyntaxTags = {
    [29555 /* EBMLId.TAG */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxTag
    }
};
const EbmlSyntaxAddition = {
    [238 /* EBMLId.BLOCK_ADD_ID */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'additionalId'
    },
    [165 /* EBMLId.BLOCK_ADDITIONAL */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'additional'
    }
};
const EbmlSyntaxAdditions = {
    [166 /* EBMLId.BLOCK_MORE */]: {
        type: 9 /* EbmlType.OBJECT */,
        isArray: true,
        filedName: 'entry',
        child: EbmlSyntaxAddition
    }
};
const EbmlSyntaxBlockGroup = {
    [161 /* EBMLId.BLOCK */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'block'
    },
    [30113 /* EBMLId.BLOCK_ADDITIONS */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'additions',
        child: EbmlSyntaxAdditions
    },
    [155 /* EBMLId.BLOCK_DURATION */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'duration'
    },
    [30114 /* EBMLId.DISCARD_PADDING */]: {
        type: 4 /* EbmlType.SINT64 */,
        filedName: 'discardPadding'
    },
    [251 /* EBMLId.BLOCK_REFERENCE */]: {
        type: 4 /* EbmlType.SINT64 */,
        isArray: true,
        filedName: 'reference'
    },
    [164 /* EBMLId.CODEC_STATE */]: {
        type: 10 /* EbmlType.BOOL */,
        filedName: 'nonSimple'
    }
};
const EbmlSyntaxCluster = {
    [163 /* EBMLId.SIMPLE_BLOCK */]: {
        type: 8 /* EbmlType.BUFFER */,
        filedName: 'block'
    },
    [160 /* EBMLId.BLOCK_GROUP */]: {
        type: 9 /* EbmlType.OBJECT */,
        filedName: 'blockGroup',
        child: EbmlSyntaxBlockGroup
    },
    [231 /* EBMLId.CLUSTER_TIME_CODE */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'timeCode'
    },
    [167 /* EBMLId.CLUSTER_POSITION */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'pos'
    },
    [171 /* EBMLId.CLUSTER_PREV_SIZE */]: {
        type: 2 /* EbmlType.UINT64 */,
        filedName: 'prevSize'
    }
};
const EbmlSyntaxHeader = {
    [17030 /* EBMLId.EBML_VERSION */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'version'
    },
    [17143 /* EBMLId.EBML_READ_VERSION */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'readVersion'
    },
    [17138 /* EBMLId.EBML_MAX_ID_LENGTH */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'maxIdLength'
    },
    [17139 /* EBMLId.EBML_MAX_SIZE_LENGTH */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'maxSizeLength'
    },
    [17026 /* EBMLId.DOCTYPE */]: {
        type: 7 /* EbmlType.STRING */,
        filedName: 'docType'
    },
    [17031 /* EBMLId.DOC_TYPE_VERSION */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'docTypeVersion'
    },
    [17029 /* EBMLId.DOC_TYPE_READ_VERSION */]: {
        type: 1 /* EbmlType.UINT */,
        filedName: 'docTypeReadVersion'
    }
};
// @ts-ignore
async function readVInt(reader, maxLen) {
    const pos = reader.getPos();
    let mask = await reader.readUint8();
    if (!mask) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`0x00 as pos ${pos} invalid as first byte of an EBML number`, cheap__fileName__0, 768);
        return avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID;
    }
    let len = 1;
    while (!(mask & 0x80)) {
        len++;
        mask <<= 1;
    }
    mask &= 0x7f;
    if (len > maxLen) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`Length ${len} indicated by an EBML number's first byte ${mask.toString(16)} at pos ${pos} exceeds max length ${maxLen}.`, cheap__fileName__0, 781);
        return avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID;
    }
    let value = mask >>> (len - 1);
    while (--len) {
        value <<= 8;
        const next = await reader.readUint8();
        value |= next;
    }
    return value;
}
// @ts-ignore
async function readVSint(reader, maxLen) {
    const now = reader.getPos();
    const value = await readVInt(reader, maxLen);
    return value - ((1 << (7 * ((Number(reader.getPos() - now & 0xffffffffn) >> 0)) - 1)) - 1);
}
// @ts-ignore
async function readVInt64(reader, maxLen) {
    const pos = reader.getPos();
    let mask = await reader.readUint8();
    let len = 1;
    if (!mask) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`0x00 as pos ${pos} invalid as first byte of an EBML number`, cheap__fileName__0, 819);
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID);
    }
    while (!(mask & 0x80)) {
        len++;
        mask <<= 1;
    }
    mask &= 0x7f;
    if (len > maxLen) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`Length ${len} indicated by an EBML number's first byte ${mask.toString(16)} at pos ${pos} exceeds max length ${maxLen}.`, cheap__fileName__0, 830);
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID);
    }
    let value = BigInt(Math.floor(mask >>> (len - 1)));
    while (--len) {
        value <<= BigInt(8);
        const next = await reader.readUint8();
        value |= BigInt(Math.floor(next));
    }
    return value;
}
// @ts-ignore
async function readUint(formatContext, len) {
    switch (len) {
        case BigInt(0):
            return 0;
        case BigInt(1):
            return formatContext.ioReader.readUint8();
        case BigInt(2):
            return formatContext.ioReader.readUint16();
        case BigInt(3):
            return formatContext.ioReader.readUint24();
        case BigInt(4):
            return formatContext.ioReader.readUint32();
        case BigInt(8):
            return formatContext.ioReader.readUint64();
    }
    let num = BigInt(0);
    let n = 0;
    while (n++ < len) {
        const next = await formatContext.ioReader.readUint8();
        num = (num << BigInt(8)) | BigInt.asUintN(64, BigInt(Math.floor(next)));
    }
    return num;
}
// @ts-ignore
async function readInt(formatContext, len) {
    switch (len) {
        case BigInt(0):
            return 0;
        case BigInt(1):
            return formatContext.ioReader.readInt8();
        case BigInt(2):
            return formatContext.ioReader.readInt16();
        case BigInt(4):
            return formatContext.ioReader.readInt32();
        case BigInt(8):
            return formatContext.ioReader.readInt64();
    }
    let num = BigInt(0);
    let n = 0;
    while (n++ < len) {
        const next = await formatContext.ioReader.readUint8();
        num = (num << BigInt(8)) | BigInt.asUintN(64, BigInt(Math.floor(next)));
    }
    if (len === BigInt(3)) {
        return (Number(BigInt.asIntN(24, num) & 0xffffffffn) >> 0);
    }
    return BigInt.asIntN(64, num);
}
// @ts-ignore
async function readFloat(formatContext, len) {
    if (len === BigInt(4)) {
        return formatContext.ioReader.readFloat();
    }
    else if (len === BigInt(8)) {
        return formatContext.ioReader.readDouble();
    }
    else {
        await formatContext.ioReader.skip((Number(len & 0xffffffffn) >> 0));
        return 0.0;
    }
}
// @ts-ignore
async function readEbmlId(formatContext, maxLen) {
    const pos = formatContext.ioReader.getPos();
    let mask = await formatContext.ioReader.peekUint8();
    if (!mask) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`0x00 as pos ${pos} invalid as first byte of an EBML number`, cheap__fileName__0, 923);
        return avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID;
    }
    let len = 1;
    while (!(mask & 0x80)) {
        len++;
        mask <<= 1;
    }
    if (len > maxLen) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`Length ${len} indicated by an EBML number's first byte ${mask.toString(16)} at pos ${pos} exceeds max length ${maxLen}.`, cheap__fileName__0, 935);
        return avutil_error__WEBPACK_IMPORTED_MODULE_1__.DATA_INVALID;
    }
    let value = 0;
    while (len--) {
        value <<= 8;
        const next = await formatContext.ioReader.readUint8();
        value |= next;
    }
    return value;
}
// @ts-ignore
async function parseEbml(formatContext, size, callback) {
    const matroskaContext = formatContext.privateData;
    const now = formatContext.ioReader.getPos();
    while (formatContext.ioReader.getPos() < now + size) {
        const id = await readEbmlId(formatContext, matroskaContext.header.maxIdLength);
        const length = await readVInt64(formatContext.ioReader, matroskaContext.header.maxSizeLength);
        const currentPos = formatContext.ioReader.getPos();
        if ((await callback(id, length)) === false) {
            return;
        }
    }
}
// @ts-ignore
async function parseEbmlSyntax(formatContext, size, syntax, ebml = {}, stopId = []) {
    await parseEbml(formatContext, size, async (id, length) => {
        if (syntax[id]) {
            const item = syntax[id];
            let value;
            switch (item.type) {
                case 1 /* EbmlType.UINT */:
                    value = await readUint(formatContext, length);
                    break;
                case 2 /* EbmlType.UINT64 */: {
                    value = await readUint(formatContext, length);
                    if (common_util_is__WEBPACK_IMPORTED_MODULE_2__.number(value)) {
                        value = BigInt(value);
                    }
                    break;
                }
                case 3 /* EbmlType.SINT */:
                    value = await readInt(formatContext, length);
                    break;
                case 4 /* EbmlType.SINT64 */: {
                    value = await readInt(formatContext, length);
                    if (common_util_is__WEBPACK_IMPORTED_MODULE_2__.number(value)) {
                        value = BigInt(value);
                    }
                    break;
                }
                case 6 /* EbmlType.DOUBLE */:
                case 5 /* EbmlType.FLOAT */:
                    value = await readFloat(formatContext, length);
                    break;
                case 7 /* EbmlType.STRING */:
                    value = await formatContext.ioReader.readString((Number(length & 0xffffffffn) >> 0));
                    break;
                case 10 /* EbmlType.BOOL */:
                    value = !!(await readUint(formatContext, length));
                    break;
                case 8 /* EbmlType.BUFFER */:
                    value = {
                        pos: formatContext.ioReader.getPos(),
                        size: length,
                        data: (length < MAX_ATTACHMENT_READ_SIZE) ? await formatContext.ioReader.readBuffer((Number(length & 0xffffffffn) >> 0)) : null
                    };
                    break;
                case 9 /* EbmlType.OBJECT */: {
                    if (item.child) {
                        value = await parseEbmlSyntax(formatContext, length, item.child);
                    }
                    else {
                        value = {};
                    }
                    break;
                }
                default:
                    await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
                    break;
            }
            if (value != null) {
                if (item.isArray) {
                    const list = ebml[item.filedName] || [];
                    list.push(value);
                    ebml[item.filedName] = list;
                }
                else {
                    ebml[item.filedName] = value;
                }
            }
        }
        else {
            await formatContext.ioReader.skip((Number(length & 0xffffffffn) >> 0));
        }
        if (stopId.length && common_util_array__WEBPACK_IMPORTED_MODULE_3__.has(stopId, id)) {
            return false;
        }
    });
    return ebml;
}


/***/ }),

/***/ "./src/avformat/formats/matroska/matroska.ts":
/*!***************************************************!*\
  !*** ./src/avformat/formats/matroska/matroska.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MkvTag2CodecId: () => (/* binding */ MkvTag2CodecId),
/* harmony export */   WebmTag2CodecId: () => (/* binding */ WebmTag2CodecId)
/* harmony export */ });
/*
 * libmedia matroska defined
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
const MkvTag2CodecId = {
    'A_AAC': 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    'A_AC3': 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    'A_ALAC': 86032 /* AVCodecID.AV_CODEC_ID_ALAC */,
    'A_DTS': 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    'A_EAC3': 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    'A_FLAC': 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    'A_MLP': 86045 /* AVCodecID.AV_CODEC_ID_MLP */,
    'A_MPEG/L2': 86016 /* AVCodecID.AV_CODEC_ID_MP2 */,
    'A_MPEG/L1': 86058 /* AVCodecID.AV_CODEC_ID_MP1 */,
    'A_MPEG/L3': 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_OPUS/EXPERIMENTAL': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_PCM/FLOAT/IEEE': 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    'A_PCM/INT/BIG': 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    'A_PCM/INT/LIT': 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    'A_QUICKTIME/QDMC': 86066 /* AVCodecID.AV_CODEC_ID_QDMC */,
    'A_QUICKTIME/QDM2': 86035 /* AVCodecID.AV_CODEC_ID_QDM2 */,
    'A_REAL/14_4': 77824 /* AVCodecID.AV_CODEC_ID_RA_144 */,
    'A_REAL/28_8': 77825 /* AVCodecID.AV_CODEC_ID_RA_288 */,
    'A_REAL/ATRC': 86047 /* AVCodecID.AV_CODEC_ID_ATRAC3 */,
    'A_REAL/COOK': 86036 /* AVCodecID.AV_CODEC_ID_COOK */,
    'A_REAL/SIPR': 86057 /* AVCodecID.AV_CODEC_ID_SIPR */,
    'A_TRUEHD': 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */,
    'A_TTA1': 86038 /* AVCodecID.AV_CODEC_ID_TTA */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_WAVPACK4': 86041 /* AVCodecID.AV_CODEC_ID_WAVPACK */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'S_TEXT/UTF8': 94225 /* AVCodecID.AV_CODEC_ID_SUBRIP */,
    'S_TEXT/ASCII': 94210 /* AVCodecID.AV_CODEC_ID_TEXT */,
    'S_TEXT/ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_TEXT/SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_VOBSUB': 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */,
    'S_DVBSUB': 94209 /* AVCodecID.AV_CODEC_ID_DVB_SUBTITLE */,
    'S_HDMV/PGS': 94214 /* AVCodecID.AV_CODEC_ID_HDMV_PGS_SUBTITLE */,
    'S_HDMV/TEXTST': 94231 /* AVCodecID.AV_CODEC_ID_HDMV_TEXT_SUBTITLE */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'V_DIRAC': 116 /* AVCodecID.AV_CODEC_ID_DIRAC */,
    'V_FFV1': 33 /* AVCodecID.AV_CODEC_ID_FFV1 */,
    'V_MJPEG': 7 /* AVCodecID.AV_CODEC_ID_MJPEG */,
    'V_MPEG1': 1 /* AVCodecID.AV_CODEC_ID_MPEG1VIDEO */,
    'V_MPEG2': 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    'V_MPEG4/ISO/ASP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/SP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AVC': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'V_MPEGH/ISO/HEVC': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'V_MPEGH/ISO/VVC': 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    'V_MPEG4/MS/V3': 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    'V_PRORES': 147 /* AVCodecID.AV_CODEC_ID_PRORES */,
    'V_REAL/RV10': 5 /* AVCodecID.AV_CODEC_ID_RV10 */,
    'V_REAL/RV20': 6 /* AVCodecID.AV_CODEC_ID_RV20 */,
    'V_REAL/RV30': 68 /* AVCodecID.AV_CODEC_ID_RV30 */,
    'V_REAL/RV40': 69 /* AVCodecID.AV_CODEC_ID_RV40 */,
    'V_SNOW': 208 /* AVCodecID.AV_CODEC_ID_SNOW */,
    'V_THEORA': 30 /* AVCodecID.AV_CODEC_ID_THEORA */,
    'V_UNCOMPRESSED': 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */,
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */
};
const WebmTag2CodecId = {
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
};


/***/ }),

/***/ "./src/avformat/formats/riff/riff.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/riff/riff.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WavTag2CodecId: () => (/* binding */ WavTag2CodecId),
/* harmony export */   codecBmpTags: () => (/* binding */ codecBmpTags)
/* harmony export */ });
/* harmony import */ var avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avformat/function/mktagle */ "./src/avformat/function/mktagle.ts");

const WavTag2CodecId = {
    0x0001: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */,
    0x0002: 69638 /* AVCodecID.AV_CODEC_ID_ADPCM_MS */,
    0x0003: 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    0x0006: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    0x0007: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    0x000A: 86052 /* AVCodecID.AV_CODEC_ID_WMAVOICE */,
    0x0010: 69664 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI */,
    0x0011: 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */,
    0x0017: 69664 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI */,
    0x0020: 69646 /* AVCodecID.AV_CODEC_ID_ADPCM_YAMAHA */,
    0x0022: 86037 /* AVCodecID.AV_CODEC_ID_TRUESPEECH */,
    0x0031: 86046 /* AVCodecID.AV_CODEC_ID_GSM_MS */,
    0x0032: 86046 /* AVCodecID.AV_CODEC_ID_GSM_MS */,
    0x0038: 73728 /* AVCodecID.AV_CODEC_ID_AMR_NB */,
    0x0042: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    0x0045: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0014: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0040: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0061: 69635 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_DK4 */,
    0x0062: 69634 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_DK3 */,
    0x0064: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0069: 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */,
    0x0075: 86079 /* AVCodecID.AV_CODEC_ID_METASOUND */,
    0x0083: 86069 /* AVCodecID.AV_CODEC_ID_G729 */,
    0x00ff: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x0111: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    // ADTS AAC
    0x1600: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x1602: 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */,
    0x2000: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
};
const codecBmpTags = {
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('h264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('X264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('x264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMV2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSSH')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Q264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('V264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMSV')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('tshd')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('INMC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DX50')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP4S')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4S2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [0x04]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ZMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('BLZ0')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WV1F')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SEDG')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('RMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WAWV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FFDS')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FVFW')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DCOD')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MVXM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DXGM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VIDM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4T3')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('G264')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('HDX4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DMK2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DYM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIGI')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EPHV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EM4A')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4CC')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SN40')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSPX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ULDX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SIPP')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVIX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DreX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('QMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PLV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GLV4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MNM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GTM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG4')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP41')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP42')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV2')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP43')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV5')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV6')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV4')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DVX3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AP41')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL1')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL0')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP80')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP90')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */
};


/***/ }),

/***/ "./src/avformat/function/mktagle.ts":
/*!******************************************!*\
  !*** ./src/avformat/function/mktagle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktagLe)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\function\\mktagle.ts";
/*
 * libmedia string tag to uint32 in litten end
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

function mktagLe(tag) {
    if (tag.length !== 4) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`tag length is not 4, tag: ${tag}`, cheap__fileName__0, 30);
    }
    let value = 0;
    for (let i = 3; i >= 0; i--) {
        value = (value << 8) | tag.charCodeAt(i);
    }
    return value;
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

/***/ "./src/avutil/util/intwrite.ts":
/*!*************************************!*\
  !*** ./src/avutil/util/intwrite.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wb64: () => (/* binding */ wb64)
/* harmony export */ });
/* unused harmony exports w8, wl16, wb16, wl24, wb24, wl32, wb32, wl64 */
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");

/*
 * libmedia int write util
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
function w8(p, value) {
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumWrite[2](p, value & 0xff);
}
function wl16(p, value) {
    w8(p, value);
    w8(p + 1, value >>> 8);
}
function wb16(p, value) {
    w8(p, value >>> 8);
    w8(p + 1, value);
}
function wl24(p, value) {
    w8(p, value);
    w8(p + 1, value >>> 8);
    w8(p + 2, value >>> 16);
}
function wb24(p, value) {
    w8(p, value >>> 16);
    w8(p + 1, value >>> 8);
    w8(p + 2, value);
}
function wl32(p, value) {
    wl16(p, value & 0xffff);
    wl16(p + 2, value >>> 16);
}
function wb32(p, value) {
    wb16(p, value >>> 16);
    wb16(p + 2, value & 0xffff);
}
function wl64(p, value) {
    wl32(p, Number(value & 0xffffffffn));
    wl32(p + 4, Number(value >> BigInt(32) & 0xffffffffn));
}
function wb64(p, value) {
    wb32(p, Number(value >> BigInt(32) & 0xffffffffn));
    wb32(p + 4, Number(value & 0xffffffffn));
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IMatroskaFormat_ts.avtranscoder.js.map