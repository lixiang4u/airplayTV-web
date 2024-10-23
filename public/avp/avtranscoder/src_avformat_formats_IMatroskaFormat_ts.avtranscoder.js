"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IMatroskaFormat_ts"],{

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   MPEG4SamplingFrequencyIndex: () => (/* binding */ MPEG4SamplingFrequencyIndex),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   getAVCodecParameters: () => (/* binding */ getAVCodecParameters),
/* harmony export */   parseADTSHeader: () => (/* binding */ parseADTSHeader),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseLATMHeader: () => (/* binding */ parseLATMHeader)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencies, MPEG4Channels */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
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
/**
 *
 * adts 封装转 raw
 *
 * bits
 * - 12  syncword
 * - 1   ID (MPEG 标识位，固定为 1)
 * - 2   Layer ( 固定为 0)
 * - 1   Protection Absent ( 指示是否有 CRC 校验，1 表示没有校验）
 * - 2   Profile
 * - 4   Sampling Frequency Index ( 采样率的索引）
 * - 1   Private Bit ( 保留位，一般设置为 0)
 * - 3   Channel Configuration ( 音频通道数）
 * - 1   Original Copy ( 原始拷贝标志位，一般设置为 0)
 * - 1   Home ( 保留位，一般设置为 0)
 * - 1   Copyright Identification Bit（置 0）
 * - 1   Copyright Identification Start（置 0）
 * - 13  Frame Length ( 帧长度，包括 ADTS 头和音频帧数据的长度）
 * - 11  Buffer Fullness ( 缓冲区满度，可用于音频流的同步）
 * - 2   Number of Raw Data Blocks in Frame ( 帧中原始数据块的数量）
 * - 16  CRC (Protection Absent 控制）
 * - N  raw aac data
 *
 */
function parseADTSHeader(buffer) {
    if (buffer.length < 7) {
        return -1;
    }
    const syncWord = (buffer[0] << 4) | (buffer[1] >> 4);
    if (syncWord !== 0xFFF) {
        return -1;
    }
    /*
      * const id = (buffer[1] & 0x08) >>> 3
      * const layer = (buffer[1] & 0x06) >>> 1
      */
    const protectionAbsent = buffer[1] & 0x01;
    const profile = (buffer[2] & 0xC0) >>> 6;
    const samplingFrequencyIndex = (buffer[2] & 0x3C) >>> 2;
    const channelConfiguration = ((buffer[2] & 0x01) << 2) | ((buffer[3] & 0xC0) >>> 6);
    // adts_variable_header()
    const aacFrameLength = ((buffer[3] & 0x03) << 11)
        | (buffer[4] << 3)
        | ((buffer[5] & 0xE0) >>> 5);
    const numberOfRawDataBlocksInFrame = buffer[6] & 0x03;
    let headerLength = protectionAbsent === 1 ? 7 : 9;
    let framePayloadLength = aacFrameLength - headerLength;
    return {
        syncWord,
        profile: profile + 1,
        sampleRate: MPEG4SamplingFrequencies[samplingFrequencyIndex],
        channels: MPEG4Channels[channelConfiguration],
        aacFrameLength,
        numberOfRawDataBlocksInFrame,
        headerLength,
        framePayloadLength
    };
}
function parseLATMHeader(buffer, bitReader) {
    if (!bitReader) {
        bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        bitReader.appendBuffer(buffer);
    }
    function getLATMValue() {
        const bytesForValue = bitReader.readU(2);
        let value = 0;
        for (let i = 0; i <= bytesForValue; i++) {
            value = value << 8;
            value = value | bitReader.readU(8);
        }
        return value;
    }
    const now = bitReader.getPointer();
    const info = {
        syncWord: 0,
        profile: 0,
        sampleRate: 0,
        channels: 0,
        useSameStreamMux: false,
        headerLength: 0,
        framePayloadLength: 0,
        muxLengthBytes: 0
    };
    const syncWord = bitReader.readU(11);
    if (syncWord !== 0x2B7) {
        return -1;
    }
    info.syncWord = syncWord;
    info.muxLengthBytes = bitReader.readU(13);
    const useSameStreamMux = bitReader.readU1() === 0x01;
    info.useSameStreamMux = useSameStreamMux;
    if (!useSameStreamMux) {
        const audioMuxVersion = bitReader.readU1() === 0x01;
        const audioMuxVersionA = audioMuxVersion && bitReader.readU1() === 0x01;
        if (audioMuxVersionA) {
            return -1;
        }
        if (audioMuxVersion) {
            getLATMValue();
        }
        const allStreamsSameTimeFraming = bitReader.readU1() === 0x01;
        if (!allStreamsSameTimeFraming) {
            return -1;
        }
        const numSubFrames = bitReader.readU(6);
        if (numSubFrames !== 0) {
            return -1;
        }
        const numProgram = bitReader.readU(4);
        if (numProgram !== 0) {
            return -1;
        }
        const numLayer = bitReader.readU(3);
        if (numLayer !== 0) {
            return -1;
        }
        let fillBits = audioMuxVersion ? getLATMValue() : 0;
        const audioObjectType = bitReader.readU(5);
        fillBits -= 5;
        const samplingFreqIndex = bitReader.readU(4);
        fillBits -= 4;
        const channelConfig = bitReader.readU(4);
        fillBits -= 4;
        bitReader.readU(3);
        fillBits -= 3;
        if (fillBits > 0) {
            bitReader.readU(fillBits);
        }
        const frameLengthType = bitReader.readU(3);
        if (frameLengthType === 0) {
            bitReader.readU(8);
        }
        else {
            return -1;
        }
        const otherDataPresent = bitReader.readU1() === 0x01;
        if (otherDataPresent) {
            if (audioMuxVersion) {
                getLATMValue();
            }
            else {
                let otherDataLenBits = 0;
                while (true) {
                    otherDataLenBits = otherDataLenBits << 8;
                    const otherDataLenEsc = bitReader.readU1() === 0x01;
                    const otherDataLenTmp = bitReader.readU(8);
                    otherDataLenBits += otherDataLenTmp;
                    if (!otherDataLenEsc) {
                        break;
                    }
                }
            }
        }
        const crcCheckPresent = bitReader.readU1() === 0x01;
        if (crcCheckPresent) {
            bitReader.readU(8);
        }
        info.profile = audioObjectType + 1;
        info.sampleRate = MPEG4SamplingFrequencies[samplingFreqIndex];
        info.channels = MPEG4Channels[channelConfig];
    }
    let length = 0;
    while (true) {
        const tmp = bitReader.readU(8);
        length += tmp;
        if (tmp !== 0xff) {
            break;
        }
    }
    info.framePayloadLength = length;
    info.headerLength = bitReader.getPointer() - now + (bitReader.getBitLeft() === 8 ? 0 : 1);
    return info;
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
        const now = bitReader.getPointer();
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
        const headerSize = bitReader.getPointer() - now;
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
    type = 6 /* AVFormat.MATROSKA */;
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
                        const size = Number(BigInt.asIntN(32, track.codecPrivate.size));
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
                        // add the default Events Format
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
                    stream.codecpar.extradataSize = Number(BigInt.asIntN(32, attachment.data.size));
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
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('not matroska format', cheap__fileName__0, 409);
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
        const headerSize = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(formatContext.ioReader, this.context.header.maxSizeLength);
        this.context.header = common_util_object__WEBPACK_IMPORTED_MODULE_30__.extend(this.context.header, await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.parseEbmlSyntax)(formatContext, headerSize, _matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.EbmlSyntaxHeader));
        const segmentId = await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readEbmlId)(formatContext, this.context.header.maxIdLength);
        if (segmentId !== 408125543 /* EBMLId.SEGMENT */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('not matroska format', cheap__fileName__0, 418);
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
                await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn('ITU_T_T35 not support now', cheap__fileName__0, 512);
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
        const trackNumber = Number(BigInt.asUintN(32, await (0,_matroska_imatroska__WEBPACK_IMPORTED_MODULE_13__.readVInt64)(this.blockReader, 8)));
        const stream = (0,_matroska_function_findStreamByTrackNumber__WEBPACK_IMPORTED_MODULE_27__["default"])(formatContext.streams, trackNumber);
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(`invalid track number ${trackNumber}`, cheap__fileName__0, 563);
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
                frameSize.push(buffer.length - Number(BigInt.asIntN(32, this.blockReader.getPos() - now)) - sum);
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
                frameSize.push(buffer.length - Number(BigInt.asIntN(32, this.blockReader.getPos() - now)) - sum);
                break;
            }
            case 2 /* MATROSKALacingMode.FIXED_SIZE */:
                frameCount = this.blockReader.readUint8() + 1;
                const size = (buffer.length - Number(BigInt.asIntN(32, this.blockReader.getPos() - now))) / frameCount;
                for (let i = 0; i < frameCount; i++) {
                    frameSize.push(size);
                }
                break;
            case 0 /* MATROSKALacingMode.NO_LACING */:
                frameCount = 1;
                frameSize.push(buffer.length - Number(BigInt.asIntN(32, this.blockReader.getPos() - now)));
                break;
        }
        const track = stream.privData;
        const trackTimestampScale = track.timeScale || 1;
        if (track.needDecryption) {
            throw new Error('not support encryption stream');
        }
        // 纳秒时间戳
        let pts = (this.context.currentCluster.timeCode + BigInt(Math.floor((timestamp * trackTimestampScale))))
            * BigInt(this.context.info.timestampScale >> 0);
        if (track.codecDelay) {
            pts -= track.codecDelay;
        }
        // 微秒时间戳
        pts /= BigInt(1000);
        pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(pts, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q, stream.timeBase);
        duration = BigInt(Math.floor((Number(BigInt.asIntN(32, duration)) * trackTimestampScale))) * BigInt(this.context.info.timestampScale >> 0);
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
                        common_util_logger__WEBPACK_IMPORTED_MODULE_6__.fatal(`not support compression stream, algo: ${compression.compression.algo}`, cheap__fileName__0, 673);
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
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.maxPts - track.minPts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q) / BigInt(track.gopCount - 1 >> 0);
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
                        track.dtsDelta = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_24__.avRescaleQ)(track.maxPts - track.minPts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_TIME_BASE_Q) / BigInt(track.gopCount - 1 >> 0);
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
                data: await formatContext.ioReader.readBuffer(Number(BigInt.asIntN(32, length)))
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
            await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(`read packet error, ${error}`, cheap__fileName__0, 890);
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
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
                    await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
                            await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
                const time = (cue.time || BigInt(0)) * BigInt(this.context.info.timestampScale >> 0) / BigInt(1000);
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
                const time = this.context.clusterIndexes[i].time * BigInt(this.context.info.timestampScale >> 0) / BigInt(1000);
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
/* harmony import */ var _function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktagle */ "./src/avformat/function/mktagle.ts");
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
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvc1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvi1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hvc1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvhe')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc3')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc4')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai52')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai53')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai55')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai56')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai12')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai13')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai15')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai16')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AVin')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('aivx')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('rv64')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('xalg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avlg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dva1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvav')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp08')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp09')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('av01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
};
const codecMovAudioTags = {
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4a')]: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sac3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-4')]: 86119 /* AVCodecID.AV_CODEC_ID_AC4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsc')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsh')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsl')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtse')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DTS ')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ec-3')]: 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('.mp3')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp3 ')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [0x6D730055]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('spex')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SPXN')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fLaC')]: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Opus')]: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('alaw')]: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ulaw')]: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl32')]: 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl64')]: 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('twos')]: 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('lpcm')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in24')]: 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in32')]: 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('raw ')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('NONE')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
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
    return value - ((1 << (7 * (Number(BigInt.asIntN(32, reader.getPos() - now))) - 1)) - 1);
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
        return Number(BigInt.asIntN(32, BigInt.asIntN(24, num)));
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
        await formatContext.ioReader.skip(Number(BigInt.asIntN(32, len)));
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
                    value = await formatContext.ioReader.readString(Number(BigInt.asIntN(32, length)));
                    break;
                case 10 /* EbmlType.BOOL */:
                    value = !!(await readUint(formatContext, length));
                    break;
                case 8 /* EbmlType.BUFFER */:
                    value = {
                        pos: formatContext.ioReader.getPos(),
                        size: length,
                        data: (length < MAX_ATTACHMENT_READ_SIZE) ? await formatContext.ioReader.readBuffer(Number(BigInt.asIntN(32, length))) : null
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
                    await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
            await formatContext.ioReader.skip(Number(BigInt.asIntN(32, length)));
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
/* harmony import */ var _function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktagle */ "./src/avformat/function/mktagle.ts");

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
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('h264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('X264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('x264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMV2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSSH')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Q264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('V264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMSV')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('tshd')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('INMC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DX50')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP4S')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4S2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [0x04]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ZMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('BLZ0')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WV1F')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SEDG')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('RMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WAWV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FFDS')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FVFW')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DCOD')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MVXM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DXGM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VIDM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4T3')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('G264')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('HDX4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DMK2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DYM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIGI')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EPHV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EM4A')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4CC')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SN40')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSPX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ULDX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SIPP')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVIX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DreX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('QMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PLV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GLV4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MNM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GTM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG4')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP41')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP42')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV2')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP43')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV5')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV6')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV4')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DVX3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AP41')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL1')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL0')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP80')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP90')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */
};


/***/ }),

/***/ "./src/avformat/function/mktagle.ts":
/*!******************************************!*\
  !*** ./src/avformat/function/mktagle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktagle)
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

function mktagle(tag) {
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
    wl32(p, Number(BigInt.asUintN(32, value)));
    wl32(p + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
}
function wb64(p, value) {
    wb32(p, Number(BigInt.asUintN(32, value >> BigInt(32))));
    wb32(p + 4, Number(BigInt.asUintN(32, value)));
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IMatroskaFormat_ts.avtranscoder.js.map