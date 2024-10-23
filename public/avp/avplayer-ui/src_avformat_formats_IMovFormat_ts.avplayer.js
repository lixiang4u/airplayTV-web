"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IMovFormat_ts"],{

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   parseADTSHeader: () => (/* binding */ parseADTSHeader),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseLATMHeader: () => (/* binding */ parseLATMHeader)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencyIndex, MPEG4SamplingFrequencies, MPEG4Channels, getAVCodecParameters */
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

/***/ "./src/avformat/codecs/ac3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/ac3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AC3ChannelLayout: () => (/* binding */ AC3ChannelLayout),
/* harmony export */   parseHeader: () => (/* binding */ parseHeader)
/* harmony export */ });
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/*
 * libmedia ac3 util
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

const AC3ChannelLayout = [
    3 /* AV_CH_LAYOUT.AV_CH_LAYOUT_STEREO */,
    4 /* AV_CH_LAYOUT.AV_CH_LAYOUT_MONO */,
    3 /* AV_CH_LAYOUT.AV_CH_LAYOUT_STEREO */,
    7 /* AV_CH_LAYOUT.AV_CH_LAYOUT_SURROUND */,
    259 /* AV_CH_LAYOUT.AV_CH_LAYOUT_2_1 */,
    263 /* AV_CH_LAYOUT.AV_CH_LAYOUT_4POINT0 */,
    1539 /* AV_CH_LAYOUT.AV_CH_LAYOUT_2_2 */,
    1543 /* AV_CH_LAYOUT.AV_CH_LAYOUT_5POINT0 */
];
const AC3FrameSizeTab = [
    [64, 69, 96],
    [64, 70, 96],
    [80, 87, 120],
    [80, 88, 120],
    [96, 104, 144],
    [96, 105, 144],
    [112, 121, 168],
    [112, 122, 168],
    [128, 139, 192],
    [128, 140, 192],
    [160, 174, 240],
    [160, 175, 240],
    [192, 208, 288],
    [192, 209, 288],
    [224, 243, 336],
    [224, 244, 336],
    [256, 278, 384],
    [256, 279, 384],
    [320, 348, 480],
    [320, 349, 480],
    [384, 417, 576],
    [384, 418, 576],
    [448, 487, 672],
    [448, 488, 672],
    [512, 557, 768],
    [512, 558, 768],
    [640, 696, 960],
    [640, 697, 960],
    [768, 835, 1152],
    [768, 836, 1152],
    [896, 975, 1344],
    [896, 976, 1344],
    [1024, 1114, 1536],
    [1024, 1115, 1536],
    [1152, 1253, 1728],
    [1152, 1254, 1728],
    [1280, 1393, 1920],
    [1280, 1394, 1920],
];
const CenterLevelsTab = [4, 5, 6, 5];
const SurroundLevelsTab = [4, 6, 7, 6];
const AC3SampleRateTab = [48000, 44100, 32000, 0];
const AC3BitrateTab = [
    32, 40, 48, 56, 64, 80, 96, 112, 128,
    160, 192, 224, 256, 320, 384, 448, 512, 576, 640
];
const AC3ChannelsTab = [
    2, 1, 2, 3, 3, 4, 4, 5
];
const EAC3Blocks = [
    1, 2, 3, 6
];
const AC3_HEADER_SIZE = 7;
function parseHeader(buf) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__["default"](buf.length);
    bitReader.appendBuffer(buf);
    const info = {
        syncWord: 0,
        crc1: 0,
        srCode: 0,
        bitstreamId: 0,
        bitstreamMode: 0,
        channelMode: 0,
        lfeOn: 0,
        frameType: 0,
        substreamId: 0,
        centerMixLevel: 0,
        surroundMixLevel: 0,
        channelMap: 0,
        numBlocks: 0,
        dolbySurroundMode: 0,
        srShift: 0,
        sampleRate: 0,
        bitrate: 0,
        channels: 0,
        frameSize: 0,
        channelLayout: BigInt(0),
        ac3BitrateCode: 0
    };
    info.syncWord = bitReader.readU(16);
    if (info.syncWord !== 0x0B77) {
        return -1;
    }
    info.bitstreamId = bitReader.peekU(29) & 0x1f;
    if (info.bitstreamId > 16) {
        return -2;
    }
    info.numBlocks = 6;
    info.ac3BitrateCode = -1;
    info.centerMixLevel = 5;
    info.surroundMixLevel = 6;
    info.dolbySurroundMode = 0 /* AC3DolbySurroundMode.AC3_DSURMOD_NOTINDICATED */;
    if (info.bitstreamId <= 10) {
        info.crc1 = bitReader.readU(16);
        info.srCode = bitReader.readU(2);
        if (info.srCode === 3) {
            return -3;
        }
        const frameSizeCode = bitReader.readU(6);
        if (frameSizeCode > 37) {
            return -4;
        }
        info.ac3BitrateCode = (frameSizeCode >> 1);
        bitReader.readU(5);
        info.bitstreamMode = bitReader.readU(3);
        info.channelMode = bitReader.readU(3);
        if (info.channelMode == 2 /* AC3ChannelMode.AC3_CHMODE_STEREO */) {
            info.dolbySurroundMode = bitReader.readU(2);
        }
        else {
            if ((info.channelMode & 1) && info.channelMode != 1 /* AC3ChannelMode.AC3_CHMODE_MONO */) {
                info.centerMixLevel = CenterLevelsTab[bitReader.readU(2)];
            }
            if (info.channelMode & 4) {
                info.surroundMixLevel = SurroundLevelsTab[bitReader.readU(2)];
            }
        }
        info.lfeOn = bitReader.readU(1);
        info.srShift = Math.max(info.bitstreamId, 8) - 8;
        info.sampleRate = AC3SampleRateTab[info.srCode] >> info.srShift;
        info.bitrate = (AC3BitrateTab[info.ac3BitrateCode] * 1000) >> info.srShift;
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
        info.frameSize = AC3FrameSizeTab[frameSizeCode][info.srCode] * 2;
        info.frameType = 2 /* EAC3FrameType.EAC3_FRAME_TYPE_AC3_CONVERT */;
        info.substreamId = 0;
    }
    else {
        /* Enhanced AC-3 */
        info.crc1 = 0;
        info.frameType = bitReader.readU(2);
        if (info.frameType == 3 /* EAC3FrameType.EAC3_FRAME_TYPE_RESERVED */) {
            return -5;
        }
        info.substreamId = bitReader.readU(3);
        info.frameSize = (bitReader.readU(11) + 1) << 1;
        if (info.frameSize < AC3_HEADER_SIZE) {
            return -6;
        }
        info.srCode = bitReader.readU(2);
        if (info.srCode == 3) {
            const srCode2 = bitReader.readU(2);
            if (srCode2 == 3) {
                return -7;
            }
            info.sampleRate = AC3SampleRateTab[srCode2] / 2;
            info.srShift = 1;
        }
        else {
            info.numBlocks = EAC3Blocks[bitReader.readU(2)];
            info.sampleRate = AC3SampleRateTab[info.srCode];
            info.srShift = 0;
        }
        info.channelMode = bitReader.readU(3);
        info.lfeOn = bitReader.readU(1);
        info.bitrate = 8 * info.frameSize * info.sampleRate / (info.numBlocks * 256);
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
    }
    info.channelLayout = BigInt(AC3ChannelLayout[info.channelMode]);
    if (info.lfeOn) {
        info.channelLayout |= BigInt(8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */);
    }
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

/***/ "./src/avformat/formats/IMovFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IMovFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMovFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _mov_imov__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mov/imov */ "./src/avformat/formats/mov/imov.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var _mov_function_getNextSample__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mov/function/getNextSample */ "./src/avformat/formats/mov/function/getNextSample.ts");
/* harmony import */ var _mov_function_createMovContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mov/function/createMovContext */ "./src/avformat/formats/mov/function/createMovContext.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IMovFormat.ts";
















class IMovFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_6__["default"] {
    type = 1 /* AVFormat.MOV */;
    context;
    options;
    constructor(options = {}) {
        super();
        this.options = options;
        this.context = (0,_mov_function_createMovContext__WEBPACK_IMPORTED_MODULE_8__["default"])();
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
    }
    async readHeader(formatContext) {
        try {
            const fileSize = await formatContext.ioReader.fileSize();
            let ret = 0;
            let size = await formatContext.ioReader.readUint32();
            let type = await formatContext.ioReader.readUint32();
            if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("ftyp" /* BoxType.FTYP */)) {
                await _mov_imov__WEBPACK_IMPORTED_MODULE_5__.readFtyp(formatContext.ioReader, this.context, {
                    type,
                    size: size - 8
                });
            }
            else if (!fileSize || size < fileSize) {
                await formatContext.ioReader.skip(size - 8);
            }
            let firstMdatPos = BigInt(0);
            while (!this.context.foundMoov) {
                const pos = formatContext.ioReader.getPos();
                if (pos === fileSize) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not mp4', cheap__fileName__0, 100);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
                }
                size = await formatContext.ioReader.readUint32();
                type = await formatContext.ioReader.readUint32();
                if (size < 8 || fileSize && (pos + BigInt(Math.floor(size)) > fileSize)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`invalid box size ${size}`, cheap__fileName__0, 108);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
                }
                if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("mdat" /* BoxType.MDAT */)) {
                    if (!this.context.foundMdat) {
                        firstMdatPos = pos;
                    }
                    this.context.foundMdat = true;
                    await formatContext.ioReader.seek(pos + BigInt(Math.floor(size)));
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("moov" /* BoxType.MOOV */)) {
                    await _mov_imov__WEBPACK_IMPORTED_MODULE_5__.readMoov(formatContext.ioReader, formatContext, this.context, {
                        size: size - 8,
                        type
                    });
                    this.context.foundMoov = true;
                }
                else {
                    await formatContext.ioReader.seek(pos + BigInt(Math.floor(size)));
                }
            }
            if (!this.context.fragment && !this.context.foundMdat) {
                const nextType = (await formatContext.ioReader.peekUint64()) >> BigInt(32);
                if (Number(nextType) === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("moof" /* BoxType.MOOF */)) {
                    this.context.fragment = true;
                }
            }
            if (this.context.fragment && formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */) {
                const now = formatContext.ioReader.getPos();
                const fileSize = await formatContext.ioReader.fileSize();
                if (fileSize > BigInt(16)) {
                    await formatContext.ioReader.seek(fileSize - BigInt(12));
                    let type = await formatContext.ioReader.readUint32();
                    if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("mfro" /* BoxType.MFRO */)) {
                        await formatContext.ioReader.skip(4);
                        const mfraSize = await formatContext.ioReader.readUint32();
                        await formatContext.ioReader.seek(fileSize - BigInt(Math.floor(mfraSize)));
                        const size = await formatContext.ioReader.readUint32();
                        type = await formatContext.ioReader.readUint32();
                        if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("mfra" /* BoxType.MFRA */)) {
                            await _mov_imov__WEBPACK_IMPORTED_MODULE_5__.readMfra(formatContext.ioReader, formatContext, this.context, {
                                size: size - 8,
                                type
                            });
                        }
                    }
                    await formatContext.ioReader.seek(now);
                }
            }
            if (!this.context.fragment && this.context.foundMdat) {
                await formatContext.ioReader.seek(firstMdatPos);
            }
            return ret;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__0, 170);
            if (!this.context.foundMoov) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('moov not found', cheap__fileName__0, 173);
            }
            return formatContext.ioReader.error;
        }
    }
    async readAVPacket_(formatContext, avpacket) {
        const { sample, stream } = (0,_mov_function_getNextSample__WEBPACK_IMPORTED_MODULE_7__.getNextSample)(formatContext, this.context);
        if (sample) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, sample.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, sample.pts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(sample.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | sample.flags);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, sample.pos);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            if (stream.startTime === avutil_constant__WEBPACK_IMPORTED_MODULE_14__.NOPTS_VALUE_BIGINT) {
                stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16);
            }
            await formatContext.ioReader.seek(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 56));
            const len = sample.size;
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(len);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketData)(avpacket, data, len);
            await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapSafeUint8Array)(data, len));
            if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 1 /* BitFormat.AVCC */);
            }
            if (stream.codecpar.codecId === 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */
                && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) >= 8) {
                const tag = (avutil_util_intread__WEBPACK_IMPORTED_MODULE_15__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + 4) >>> 0);
                const packetSize = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
                if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("vtte" /* BoxType.VTTE */)) {
                    if (packetSize === 8) {
                        const newData = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMallocz)(1);
                        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketData)(avpacket, newData, 1);
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 28, 1);
                    }
                }
                if (packetSize > 8 && (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("vtte" /* BoxType.VTTE */) || tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("vttc" /* BoxType.VTTC */))) {
                    let start = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + 8);
                    const end = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + packetSize);
                    while (start < end) {
                        const size = avutil_util_intread__WEBPACK_IMPORTED_MODULE_15__.rb32(start);
                        const tag = (avutil_util_intread__WEBPACK_IMPORTED_MODULE_15__.rb32(start + 4) >>> 0);
                        if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("payl" /* BoxType.PAYL */) && size > 8) {
                            const newData = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(size - 8);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.memcpy)(newData, (start + 8), size - 8);
                            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketData)(avpacket, newData, size - 8);
                            break;
                        }
                        else {
                            start = start + size;
                        }
                    }
                }
            }
            if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
                const len = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */].length;
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(len);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, len);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.memcpyFromUint8Array)(extradata, len, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
                delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
            }
        }
        else {
            return -1048576 /* IOError.END */;
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            if (this.context.fragment && !this.context.currentFragment) {
                while (!this.context.currentFragment) {
                    const pos = formatContext.ioReader.getPos();
                    const size = await formatContext.ioReader.readUint32();
                    const type = await formatContext.ioReader.readUint32();
                    if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("moof" /* BoxType.MOOF */)) {
                        this.context.currentFragment = {
                            pos: pos,
                            size,
                            sequence: 0,
                            tracks: [],
                            currentTrack: null
                        };
                        if (!this.context.firstMoof) {
                            this.context.firstMoof = pos;
                        }
                        await _mov_imov__WEBPACK_IMPORTED_MODULE_5__.readMoof(formatContext.ioReader, formatContext, this.context, {
                            type,
                            size: size - 8
                        });
                    }
                    else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_4__["default"])("moov" /* BoxType.MOOV */)) {
                        await _mov_imov__WEBPACK_IMPORTED_MODULE_5__.readMoov(formatContext.ioReader, formatContext, this.context, {
                            size: size - 8,
                            type
                        });
                    }
                    else {
                        await formatContext.ioReader.skip(size - 8);
                    }
                }
            }
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 306);
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const pts = timestamp;
        const streamContext = stream.privData;
        const resetFragment = () => {
            this.context.currentFragment = null;
            formatContext.streams.forEach((stream) => {
                const movStreamContext = stream.privData;
                movStreamContext.samplesIndex.length = 0;
            });
        };
        // dash 使用时间戳去 seek
        if (flags & 16 /* AVSeekFlags.TIMESTAMP */ && this.context.fragment) {
            const seekTime = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_14__.AV_MILLI_TIME_BASE_Q);
            await formatContext.ioReader.seek(seekTime, true);
            resetFragment();
            return BigInt(0);
        }
        if (this.context.fragment) {
            if (streamContext.fragIndexes.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_9__.binarySearch(streamContext.fragIndexes, (item) => {
                    if (item.time > pts) {
                        return -1;
                    }
                    else if (item.time === pts) {
                        return 0;
                    }
                    return 1;
                });
                if (index > -1) {
                    await formatContext.ioReader.seek(streamContext.fragIndexes[index].pos, true);
                    resetFragment();
                    return BigInt(0);
                }
            }
            if (pts === BigInt(0) && this.context.firstMoof) {
                await formatContext.ioReader.seek(this.context.firstMoof);
                resetFragment();
                return BigInt(0);
            }
            return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
        }
        let index = common_util_array__WEBPACK_IMPORTED_MODULE_9__.binarySearch(streamContext.samplesIndex, (item) => {
            if (item.pts > pts) {
                return -1;
            }
            else if (item.pts === pts) {
                return 0;
            }
            return 1;
        });
        if (index > -1 && stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            let i = index;
            for (; i >= 0; i--) {
                if (streamContext.samplesIndex[i].flags & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                    index = i;
                    break;
                }
            }
            if (i < 0) {
                index = -1;
            }
        }
        if (index > -1) {
            streamContext.currentSample = index;
            streamContext.sampleEnd = false;
            common_util_array__WEBPACK_IMPORTED_MODULE_9__.each(formatContext.streams, (st) => {
                if (st !== stream) {
                    const stContext = st.privData;
                    let seeked = false;
                    let timestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(streamContext.samplesIndex[streamContext.currentSample].pts, stream.timeBase, st.timeBase);
                    common_util_array__WEBPACK_IMPORTED_MODULE_9__.each(stContext.samplesIndex, (sample, i) => {
                        if (sample.pts >= timestamp) {
                            stContext.currentSample = i;
                            seeked = true;
                            return false;
                        }
                    });
                    if (!seeked) {
                        stContext.sampleEnd = true;
                        stContext.currentSample = stContext.samplesIndex.length;
                    }
                    else {
                        stContext.sampleEnd = false;
                    }
                }
            });
            return BigInt(0);
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID);
    }
    getAnalyzeStreamsCount() {
        // mov 在 readheader 时分析了 moov，不需要在进行流分析
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/boxType.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/mov/boxType.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContainerBoxs: () => (/* binding */ ContainerBoxs),
/* harmony export */   FullBoxs: () => (/* binding */ FullBoxs)
/* harmony export */ });
/* unused harmony export BasicBoxs */
/*
 * libmedia mp4 box defined
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
const BasicBoxs = [
    "ftyp" /* BoxType.FTYP */,
    "mdat" /* BoxType.MDAT */,
    "idat" /* BoxType.IDAT */,
    "free" /* BoxType.FREE */,
    "skip" /* BoxType.SKIP */,
    "meco" /* BoxType.MECO */,
    "strk" /* BoxType.STRK */,
];
const FullBoxs = [
    "hmhd" /* BoxType.HMHD */,
    "nmhd" /* BoxType.NMHD */,
    "iods" /* BoxType.IODS */,
    "xml " /* BoxType.XML */,
    "url " /* BoxType.URL */,
    "bxml" /* BoxType.BXML */,
    "ipro" /* BoxType.IPRO */,
    "mere" /* BoxType.MERE */,
    "stts" /* BoxType.STTS */,
    "ctts" /* BoxType.CTTS */,
    "stss" /* BoxType.STSS */,
    "stsz" /* BoxType.STSZ */,
    "stz2" /* BoxType.STZ2 */,
    "stsc" /* BoxType.STSC */,
    "stco" /* BoxType.STCO */,
    "co64" /* BoxType.CO64 */,
    "stsd" /* BoxType.STSD */,
    "dref" /* BoxType.DREF */,
    "mvhd" /* BoxType.MVHD */,
    "tkhd" /* BoxType.TKHD */,
    "mdhd" /* BoxType.MDHD */,
    "hdlr" /* BoxType.HDLR */
];
const ContainerBoxs = [
    "moov" /* BoxType.MOOV */,
    "trak" /* BoxType.TRAK */,
    "edts" /* BoxType.EDTS */,
    "mdia" /* BoxType.MDIA */,
    "minf" /* BoxType.MINF */,
    "dinf" /* BoxType.DINF */,
    "stbl" /* BoxType.STBL */,
    "mvex" /* BoxType.MVEX */,
    "moof" /* BoxType.MOOF */,
    "traf" /* BoxType.TRAF */,
    "vttc" /* BoxType.VTTC */,
    "tref" /* BoxType.TREF */,
    "iref" /* BoxType.IREF */,
    "mfra" /* BoxType.MFRA */,
    "hnti" /* BoxType.HNTI */,
    "hinf" /* BoxType.HINF */,
    "strd" /* BoxType.STRD */,
    "sinf" /* BoxType.SINF */,
    "rinf" /* BoxType.RINF */,
    "schi" /* BoxType.SCHI */,
    "trgr" /* BoxType.TRGR */,
    "udta" /* BoxType.UDTA */,
    "iprp" /* BoxType.IPRP */,
    "ipco" /* BoxType.IPCO */,
    "strk" /* BoxType.STRK */,
    "meco" /* BoxType.MECO */
];


/***/ }),

/***/ "./src/avformat/formats/mov/function/buildFragmentIndex.ts":
/*!*****************************************************************!*\
  !*** ./src/avformat/formats/mov/function/buildFragmentIndex.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildFragmentIndex: () => (/* binding */ buildFragmentIndex)
/* harmony export */ });
/*
 * libmedia mov fragment indexes
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
function buildFragmentIndex(stream, track, movContext, ioFlag = 0) {
    const context = stream.privData;
    const trex = movContext.trexs.find((trex) => {
        return trex.trackId === track.trackId;
    });
    let currentOffset = track.baseDataOffset + BigInt(Math.floor(track.dataOffset));
    if (track.baseIsMoof) {
        currentOffset += movContext.currentFragment.pos;
    }
    let currentDts = track.baseMediaDecodeTime;
    const sampleSizes = track.sampleSizes;
    const sampleDurations = track.sampleDurations;
    const sampleFlags = track.sampleFlags;
    const sampleCompositionTimeOffset = track.sampleCompositionTimeOffset;
    if (!sampleSizes.length) {
        for (let i = 0; i < track.sampleCount; i++) {
            sampleSizes.push(track.defaultSampleSize || trex.size);
        }
    }
    if (!sampleDurations.length) {
        for (let i = 0; i < track.sampleCount; i++) {
            sampleDurations.push(track.defaultSampleDuration || trex.duration);
        }
    }
    if (!sampleFlags.length) {
        for (let i = 0; i < track.sampleCount; i++) {
            sampleFlags.push(track.defaultSampleFlags || trex.flags);
        }
    }
    if (!sampleCompositionTimeOffset.length) {
        for (let i = 0; i < track.sampleCount; i++) {
            sampleCompositionTimeOffset.push(0);
        }
    }
    const samplesIndex = [];
    for (let i = 0; i < track.sampleCount; i++) {
        const sample = {
            dts: currentDts,
            pts: currentDts + BigInt(Math.floor(sampleCompositionTimeOffset[i])),
            pos: currentOffset,
            size: sampleSizes[i],
            duration: sampleDurations[i],
            flags: 0
        };
        currentDts += BigInt(Math.floor(sample.duration));
        currentOffset += BigInt(Math.floor(sample.size));
        let currentFlags = sampleFlags[i];
        if (i === 0 && track.firstSampleFlags) {
            currentFlags = track.firstSampleFlags;
        }
        if (!(currentFlags & (65536 /* SampleFlags.IS_NON_SYN */ | 16777216 /* SampleFlags.DEPENDS_YES */))) {
            sample.flags |= 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */;
        }
        if (i === 0 && sampleSizes.length > 1 && (ioFlag & 2 /* IOFlags.SLICE */)) {
            // 切片的第一个帧强制为关键帧
            sample.flags |= 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */;
        }
        samplesIndex.push(sample);
    }
    context.samplesIndex = samplesIndex;
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/buildIndex.ts":
/*!*********************************************************!*\
  !*** ./src/avformat/formats/mov/function/buildIndex.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildIndex: () => (/* binding */ buildIndex)
/* harmony export */ });
/*
 * libmedia mov indexes
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
function buildIndex(stream) {
    const context = stream.privData;
    const chunkOffsets = context.chunkOffsets;
    const sampleSizes = context.sampleSizes;
    const cttsSampleCounts = context.cttsSampleCounts;
    const cttsSampleOffsets = context.cttsSampleOffsets;
    const stscFirstChunk = context.stscFirstChunk;
    const stscSamplesPerChunk = context.stscSamplesPerChunk;
    const stssSampleNumbers = context.stssSampleNumbersMap;
    const sttsSampleCounts = context.sttsSampleCounts;
    const sttsSampleDeltas = context.sttsSampleDeltas;
    if (!chunkOffsets.length) {
        return;
    }
    let stscIndex = 0;
    let sttsIndex = 0;
    let sttsCurrentIndex = 0;
    let cttsIndex = 0;
    let cttsCurrentIndex = 0;
    let chunkSamples = 0;
    let currentOffset = BigInt(0);
    let currentSample = 0;
    let currentDts = BigInt(0);
    const samplesIndex = [];
    for (let i = 0; i < chunkOffsets.length; i++) {
        currentOffset = chunkOffsets[i];
        if (stscIndex < (stscFirstChunk.length - 1) && stscFirstChunk[stscIndex + 1] === i + 1) {
            stscIndex++;
        }
        chunkSamples = stscSamplesPerChunk[stscIndex];
        while (chunkSamples > 0) {
            const sample = {
                dts: currentDts,
                pts: currentDts,
                pos: currentOffset,
                size: sampleSizes[currentSample],
                duration: 0,
                flags: 0
            };
            if (stssSampleNumbers && stssSampleNumbers.has(currentSample + 1)
                || stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                sample.flags |= 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */;
            }
            if (cttsSampleOffsets) {
                sample.pts = sample.dts + BigInt(Math.floor(cttsSampleOffsets[cttsIndex]));
                cttsCurrentIndex++;
                if (cttsCurrentIndex === cttsSampleCounts[cttsIndex]) {
                    cttsIndex++;
                    cttsCurrentIndex = 0;
                }
            }
            if (currentSample) {
                samplesIndex[currentSample - 1].duration = Number(sample.dts - samplesIndex[currentSample - 1].dts);
            }
            currentOffset += BigInt(Math.floor(sample.size));
            currentDts += BigInt(Math.floor(sttsSampleDeltas[sttsIndex]));
            sttsCurrentIndex++;
            if (sttsCurrentIndex === sttsSampleCounts[sttsIndex]) {
                sttsIndex++;
                sttsCurrentIndex = 0;
            }
            currentSample++;
            samplesIndex.push(sample);
            chunkSamples--;
        }
    }
    if (samplesIndex.length > 1) {
        // 最后一个 sample 使用前一个的 duration
        samplesIndex[currentSample - 1].duration = samplesIndex[currentSample - 2].duration;
    }
    context.samplesIndex = samplesIndex;
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/createFragmentTrack.ts":
/*!******************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createFragmentTrack.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createFragmentTrack)
/* harmony export */ });
/*
 * libmedia create fragment track
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
function createFragmentTrack() {
    return {
        trackId: 0,
        baseDataOffset: BigInt(0),
        defaultSampleDuration: 0,
        defaultSampleSize: 0,
        defaultSampleFlags: 0,
        baseMediaDecodeTime: BigInt(0),
        sampleCount: 0,
        dataOffset: 0,
        dataOffsetPos: BigInt(0),
        firstSampleFlags: 0,
        sampleDurations: [],
        sampleSizes: [],
        sampleFlags: [],
        sampleCompositionTimeOffset: [],
        baseIsMoof: false,
        ioWriter: null,
        buffers: []
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/createMovContext.ts":
/*!***************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createMovContext.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMovContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mov context
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

function createMovContext() {
    return {
        isom: false,
        timescale: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        duration: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        foundMoov: false,
        foundMdat: false,
        majorBrand: 0,
        minorVersion: 0,
        compatibleBrand: [],
        creationTime: BigInt(0),
        modificationTime: BigInt(0),
        rate: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        volume: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        matrix: null,
        nextTrackId: 1,
        fragment: false,
        trexs: [],
        currentFragment: null,
        boxsPositionInfo: [],
        holdMoovPos: BigInt(0),
        currentChunk: null
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/createMovStreamContext.ts":
/*!*********************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createMovStreamContext.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMovStreamContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mov stream context
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

function createMovStreamContext() {
    return {
        chunkOffsets: null,
        cttsSampleCounts: null,
        cttsSampleOffsets: null,
        stscFirstChunk: null,
        stscSamplesPerChunk: null,
        stscSampleDescriptionIndex: null,
        stssSampleNumbersMap: null,
        stssSampleNumbers: null,
        sampleSizes: null,
        sttsSampleCounts: null,
        sttsSampleDeltas: null,
        timescale: 0,
        duration: BigInt(0),
        trackId: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        layer: 0,
        alternateGroup: 0,
        volume: 0,
        matrix: null,
        width: 0,
        height: 0,
        audioCid: 0,
        samplesPerFrame: 0,
        bytesPerFrame: 0,
        currentSample: 0,
        sampleEnd: false,
        samplesIndex: [],
        fragIndexes: [],
        lastPts: BigInt(0),
        lastDts: BigInt(0),
        startDts: BigInt(0),
        startCT: 0,
        lastDuration: 0,
        chunkCount: 0,
        firstWrote: false,
        lastStscCount: 0,
        perStreamGrouping: false,
        index: 0,
        flags: 0
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/getNextSample.ts":
/*!************************************************************!*\
  !*** ./src/avformat/formats/mov/function/getNextSample.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNextSample: () => (/* binding */ getNextSample)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia get next sample
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


function getNextSample(context, movContext) {
    let sample;
    let stream;
    let bestDts = BigInt(0);
    let posSample;
    let posStream;
    let dtsSample;
    let dtsStream;
    context.streams.forEach((s) => {
        const context = s.privData;
        if (!context.samplesIndex || !context.samplesIndex.length) {
            context.sampleEnd = true;
            return true;
        }
        if (!context.sampleEnd
            && (!posSample
                || (context.samplesIndex[context.currentSample].pos < posSample.pos))) {
            posSample = context.samplesIndex[context.currentSample];
            posStream = s;
        }
        if (!context.sampleEnd
            && (!dtsSample
                || (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(context.samplesIndex[context.currentSample].dts, s.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_0__.AV_TIME_BASE_Q)
                    < bestDts)) {
            dtsSample = context.samplesIndex[context.currentSample];
            bestDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(dtsSample.dts, s.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_0__.AV_TIME_BASE_Q);
            dtsStream = s;
        }
    });
    if (posSample && dtsSample) {
        const posDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(posSample.dts, posStream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_0__.AV_TIME_BASE_Q);
        const dtsDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(dtsSample.dts, dtsStream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_0__.AV_TIME_BASE_Q);
        const diff = Math.abs(Number(posDts - dtsDts));
        // 两者时间差值在 1s 内优先 pos，避免来回 seek
        if ((diff < 1000000) || (context.ioReader.flags & 2 /* IOFlags.SLICE */)) {
            sample = posSample;
            stream = posStream;
        }
        else {
            sample = dtsSample;
            stream = dtsStream;
        }
    }
    else if (posSample) {
        sample = posSample;
        stream = posStream;
    }
    else if (dtsSample) {
        sample = dtsSample;
        stream = dtsStream;
    }
    if (stream) {
        stream.privData.currentSample++;
        if (stream.privData.currentSample
            >= stream.privData.samplesIndex.length) {
            stream.privData.sampleEnd = true;
        }
    }
    if (movContext.fragment) {
        const hasSample = !!context.streams.find((stream) => {
            return stream.privData.sampleEnd === false;
        });
        if (!hasSample) {
            movContext.currentFragment = null;
        }
    }
    return {
        sample,
        stream
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/imov.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/mov/imov.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readFtyp: () => (/* binding */ readFtyp),
/* harmony export */   readMfra: () => (/* binding */ readMfra),
/* harmony export */   readMoof: () => (/* binding */ readMoof),
/* harmony export */   readMoov: () => (/* binding */ readMoov)
/* harmony export */ });
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _boxType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boxType */ "./src/avformat/formats/mov/boxType.ts");
/* harmony import */ var _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parsing/parsers */ "./src/avformat/formats/mov/parsing/parsers.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _function_buildFragmentIndex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/buildFragmentIndex */ "./src/avformat/formats/mov/function/buildFragmentIndex.ts");
/* harmony import */ var _function_buildIndex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/buildIndex */ "./src/avformat/formats/mov/function/buildIndex.ts");
/* harmony import */ var _function_createFragmentTrack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/createFragmentTrack */ "./src/avformat/formats/mov/function/createFragmentTrack.ts");
/* harmony import */ var _function_createMovStreamContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./function/createMovStreamContext */ "./src/avformat/formats/mov/function/createMovStreamContext.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\imov.ts";











// @ts-ignore
async function readFtyp(ioReader, context, atom) {
    const endPos = ioReader.getPos() + BigInt(Math.floor(atom.size));
    context.majorBrand = await ioReader.readUint32();
    context.minorVersion = await ioReader.readUint32();
    if (context.majorBrand === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('qt  ')) {
        context.isom = true;
    }
    while (ioReader.getPos() < endPos) {
        context.compatibleBrand.push(await ioReader.readUint32());
    }
}
// @ts-ignore
async function parseOneBox(ioReader, stream, atom, movContext) {
    const endPos = ioReader.getPos() + BigInt(Math.floor(atom.size));
    while (ioReader.getPos() < endPos) {
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        if (size < 8) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`invalid box size ${size}`, cheap__fileName__0, 76);
            return;
        }
        if (_parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type]) {
            await _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type](ioReader, stream, {
                type,
                size: size - 8
            }, movContext);
        }
        // 兼容 hdlr 在 minf 后面，先解析 hdlr 得到 track 类型
        else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("mdia" /* BoxType.MDIA */)) {
            let hdlr = false;
            let minfPos = BigInt(0);
            const endPos = ioReader.getPos() + BigInt(Math.floor(size - 8));
            while (ioReader.getPos() < endPos) {
                const size = await ioReader.readUint32();
                const type = await ioReader.readUint32();
                if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("hdlr" /* BoxType.HDLR */)) {
                    await _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type](ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                    hdlr = true;
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("minf" /* BoxType.MINF */) && hdlr) {
                    await parseOneBox(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else {
                    if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("minf" /* BoxType.MINF */) && !hdlr) {
                        minfPos = ioReader.getPos() - BigInt(8);
                        await ioReader.skip(size - 8);
                    }
                    else if (_parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type]) {
                        await _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type](ioReader, stream, {
                            type,
                            size: size - 8
                        }, movContext);
                    }
                    else if (_boxType__WEBPACK_IMPORTED_MODULE_1__.ContainerBoxs.some((boxType) => {
                        return (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])(boxType) === type;
                    })) {
                        await parseOneBox(ioReader, stream, {
                            type,
                            size: size - 8
                        }, movContext);
                    }
                    else {
                        await ioReader.skip(size - 8);
                    }
                }
            }
            if (minfPos) {
                const now = ioReader.getPos();
                await ioReader.seek(minfPos);
                const size = await ioReader.readUint32();
                const type = await ioReader.readUint32();
                await parseOneBox(ioReader, stream, {
                    type,
                    size: size - 8
                }, movContext);
                await ioReader.seek(now);
            }
        }
        else if (_boxType__WEBPACK_IMPORTED_MODULE_1__.ContainerBoxs.some((boxType) => {
            return (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])(boxType) === type;
        })) {
            await parseOneBox(ioReader, stream, {
                type,
                size: size - 8
            }, movContext);
        }
        else {
            await ioReader.skip(size - 8);
        }
    }
}
// @ts-ignore
async function readMoov(ioReader, formatContext, movContext, atom) {
    const endPos = ioReader.getPos() + BigInt(Math.floor(atom.size));
    while (ioReader.getPos() < endPos) {
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        if (size < 8) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`invalid box, type: ${type}, size ${size}`, cheap__fileName__0, 209);
            return;
        }
        if (_parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type]) {
            await _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type](ioReader, null, {
                type,
                size: size - 8
            }, movContext);
        }
        else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("trak" /* BoxType.TRAK */)) {
            if (!movContext.foundMoov || movContext.fragment) {
                const stream = formatContext.createStream();
                stream.privData = (0,_function_createMovStreamContext__WEBPACK_IMPORTED_MODULE_7__["default"])();
                await parseOneBox(ioReader, stream, {
                    type,
                    size: size - 8
                }, movContext);
                if (!movContext.fragment) {
                    (0,_function_buildIndex__WEBPACK_IMPORTED_MODULE_5__.buildIndex)(stream);
                }
                else {
                    const streamContext = stream.privData;
                    const old = formatContext.streams.find((st) => {
                        const context = st.privData;
                        if (st.index !== stream.index && context.trackId === streamContext.trackId) {
                            return true;
                        }
                    });
                    if (old) {
                        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
                            old.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
                            if (old.codecpar.extradata) {
                                (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avFree)(old.codecpar.extradata);
                            }
                            old.codecpar.extradataSize = old.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */].length;
                            old.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(old.codecpar.extradataSize);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.memcpyFromUint8Array)(old.codecpar.extradata, old.codecpar.extradataSize, old.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
                            if (stream.codecpar.width === avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE && streamContext.width > 0) {
                                old.codecpar.width = streamContext.width;
                            }
                            if (stream.codecpar.width === avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE && streamContext.height > 0) {
                                old.codecpar.height = streamContext.height;
                            }
                        }
                        formatContext.removeStream(stream);
                        formatContext.streamIndex--;
                    }
                    else {
                        if (stream.codecpar.width === avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE && streamContext.width > 0) {
                            stream.codecpar.width = streamContext.width;
                        }
                        if (stream.codecpar.width === avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE && streamContext.height > 0) {
                            stream.codecpar.height = streamContext.height;
                        }
                    }
                }
            }
            else {
                await ioReader.skip(size - 8);
            }
        }
        else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("mvex" /* BoxType.MVEX */)) {
            movContext.fragment = true;
            await parseOneBox(ioReader, null, {
                type,
                size: size - 8
            }, movContext);
        }
        else {
            await ioReader.skip(size - 8);
        }
    }
}
// @ts-ignore
async function readMoof(ioReader, formatContext, movContext, atom) {
    const endPos = ioReader.getPos() + BigInt(Math.floor(atom.size));
    while (ioReader.getPos() < endPos) {
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        if (size < 8) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`invalid box, type: ${type}, size ${size}`, cheap__fileName__0, 314);
            return;
        }
        if (_parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type]) {
            await _parsing_parsers__WEBPACK_IMPORTED_MODULE_2__["default"][type](ioReader, null, {
                type,
                size: size - 8
            }, movContext);
        }
        else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("traf" /* BoxType.TRAF */)) {
            const track = (0,_function_createFragmentTrack__WEBPACK_IMPORTED_MODULE_6__["default"])();
            movContext.currentFragment.currentTrack = track;
            await parseOneBox(ioReader, null, {
                type,
                size: size - 8
            }, movContext);
            movContext.currentFragment.tracks.push(track);
            movContext.currentFragment.currentTrack = null;
            const stream = formatContext.streams.find((stream) => {
                return stream.privData.trackId === track.trackId;
            });
            if (stream) {
                const streamContext = stream.privData;
                track.streamIndex = stream.index;
                (0,_function_buildFragmentIndex__WEBPACK_IMPORTED_MODULE_4__.buildFragmentIndex)(stream, track, movContext, formatContext.ioReader.flags);
                streamContext.currentSample = 0;
                streamContext.sampleEnd = false;
            }
        }
        else {
            await ioReader.skip(size - 8);
        }
    }
}
// @ts-ignore
async function readMfra(ioReader, formatContext, movContext, atom) {
    const endPos = ioReader.getPos() + BigInt(Math.floor(atom.size));
    while (ioReader.getPos() < endPos) {
        const pos = ioReader.getPos();
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("tfra" /* BoxType.TFRA */)) {
            const version = await ioReader.readUint8();
            await ioReader.skip(3);
            const trackId = await ioReader.readUint32();
            const fieldLength = await ioReader.readUint32();
            const itemCount = await ioReader.readUint32();
            const stream = formatContext.streams.find((stream) => {
                return stream.privData.trackId === trackId;
            });
            if (stream) {
                const movStreamContext = stream.privData;
                let time;
                let offset;
                for (let i = 0; i < itemCount; i++) {
                    if (version === 1) {
                        time = await ioReader.readUint64();
                        offset = await ioReader.readUint64();
                    }
                    else {
                        time = BigInt(Math.floor(await ioReader.readUint32()));
                        offset = BigInt(Math.floor(await ioReader.readUint32()));
                    }
                    movStreamContext.fragIndexes.push({
                        pos: offset,
                        time
                    });
                    for (let j = 0; j < ((fieldLength >> 4) & 3) + 1; j++) {
                        await ioReader.skip(1);
                    }
                    for (let j = 0; j < ((fieldLength >> 2) & 3) + 1; j++) {
                        await ioReader.skip(1);
                    }
                    for (let j = 0; j < ((fieldLength >> 0) & 3) + 1; j++) {
                        await ioReader.skip(1);
                    }
                }
                if (movStreamContext.fragIndexes.length) {
                    await ioReader.seek(movStreamContext.fragIndexes[movStreamContext.fragIndexes.length - 1].pos);
                    const size = await ioReader.readUint32();
                    const type = await ioReader.readUint32();
                    if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("moof" /* BoxType.MOOF */)) {
                        movContext.currentFragment = {
                            pos: BigInt(0),
                            size,
                            sequence: 0,
                            tracks: [],
                            currentTrack: null
                        };
                        await readMoof(ioReader, formatContext, movContext, {
                            size,
                            type
                        });
                        if (movStreamContext.samplesIndex.length) {
                            const sample = movStreamContext.samplesIndex[movStreamContext.samplesIndex.length - 1];
                            stream.duration = sample.pts + BigInt(Math.floor(sample.duration));
                            movStreamContext.samplesIndex.length = 0;
                        }
                    }
                }
            }
        }
        await ioReader.seek(pos + BigInt(Math.floor(size)), false, false);
    }
    movContext.currentFragment = null;
}


/***/ }),

/***/ "./src/avformat/formats/mov/mov.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/mov/mov.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVCodecID2Mp4a: () => (/* binding */ AVCodecID2Mp4a),
/* harmony export */   HandlerType2MediaType: () => (/* binding */ HandlerType2MediaType),
/* harmony export */   Mp4aObj2AVCodecID: () => (/* binding */ Mp4aObj2AVCodecID),
/* harmony export */   tag2CodecId: () => (/* binding */ tag2CodecId)
/* harmony export */ });
/* unused harmony export Mp4Tag2AVCodecID */
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/*
 * libmedia mp4 identify defined
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

const Mp4Tag2AVCodecID = {
    mp4v: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    avc1: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    avc3: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    hev1: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    hvc1: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    vvc1: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    vvi1: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    vp09: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    av01: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    mp4a: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    opus: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */
};
const AVCodecID2Mp4a = {
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 0x40,
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: 0x69,
    [86076 /* AVCodecID.AV_CODEC_ID_OPUS */]: 0xAD,
    [86028 /* AVCodecID.AV_CODEC_ID_FLAC */]: 0xC1,
    [86021 /* AVCodecID.AV_CODEC_ID_VORBIS */]: 0xDD,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: 0x20,
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 0x21,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 0x23,
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: 0x33,
    [167 /* AVCodecID.AV_CODEC_ID_VP9 */]: 0xB1,
    [0 /* AVCodecID.AV_CODEC_ID_NONE */]: 0
};
const Mp4aObj2AVCodecID = {
    0x20: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    0x21: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    0x23: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    0x33: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    0xB1: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    0x40: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x66: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x67: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x68: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x69: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    0x6B: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    0xAD: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    0xC1: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    0xDD: 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    0: 0 /* AVCodecID.AV_CODEC_ID_NONE */
};
const HandlerType2MediaType = {
    vide: 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
    soun: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
    clcp: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    sbtl: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    subt: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    subp: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    text: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */
};
const tag2CodecId = {
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("mp4a" /* BoxType.MP4A */)]: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    [0x6D730055]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('Opus')]: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('fLaC')]: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('spex')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('SPXN')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('sac3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"]["mp4v" /* BoxType.MP4V */]]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('av01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vp08')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vp09')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('hvc1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vvc1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vvi1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('text')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('tx3g')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */
};


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/av1c.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/av1c.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var _codecs_av1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/av1 */ "./src/avformat/codecs/av1.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\av1c.ts";




// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
    if (atom.size <= 0) {
        return;
    }
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avMalloc)(atom.size);
    const extradata = await ioReader.readBuffer(atom.size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapSafeUint8Array)(data, atom.size));
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = atom.size;
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
    }
    _codecs_av1__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read avcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 67);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/avcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/avcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/h264 */ "./src/avformat/codecs/h264.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\avcc.ts";




// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
    if (atom.size <= 0) {
        return;
    }
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(atom.size);
    const extradata = await ioReader.readBuffer(atom.size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapSafeUint8Array)(data, atom.size));
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = atom.size;
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
    }
    _codecs_h264__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read avcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 67);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/co64.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/co64.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\co64.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const chunkOffsets = [];
    const entryCount = await ioReader.readUint32();
    if (version === 0) {
        for (let i = 0; i < entryCount; i++) {
            chunkOffsets.push(await ioReader.readUint64());
        }
    }
    stream.privData.chunkOffsets = chunkOffsets;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read co64 error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 56);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/colr.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/colr.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\colr.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    let colorParameterType = await ioReader.readString(4);
    if (colorParameterType === 'nclx'
        || colorParameterType === 'nclc'
        || colorParameterType === 'prof') {
        if (colorParameterType === 'prof') {
            const buffer = await ioReader.readBuffer(atom.size - 4);
            stream.sideData[28 /* AVPacketSideDataType.AV_PKT_DATA_ICC_PROFILE */] = buffer;
        }
        else {
            let colorPrimaries = await ioReader.readUint16();
            let colorTrc = await ioReader.readUint16();
            let colorMatrix = await ioReader.readUint16();
            if (colorParameterType === 'nclx') {
                const colorRange = await ioReader.readUint8() >> 7;
                if (colorRange) {
                    stream.codecpar.colorRange = 2 /* AVColorRange.AVCOL_RANGE_JPEG */;
                }
                else {
                    stream.codecpar.colorRange = 1 /* AVColorRange.AVCOL_RANGE_MPEG */;
                }
            }
            if (colorPrimaries >= 23 /* AVColorPrimaries.AVCOL_PRI_NB */) {
                colorPrimaries = 2 /* AVColorPrimaries.AVCOL_PRI_UNSPECIFIED */;
            }
            if (colorTrc >= 19 /* AVColorTransferCharacteristic.AVCOL_TRC_NB */) {
                colorTrc = 2 /* AVColorTransferCharacteristic.AVCOL_TRC_UNSPECIFIED */;
            }
            if (colorMatrix >= 15 /* AVColorSpace.AVCOL_SPC_NB */) {
                colorMatrix = 2 /* AVColorSpace.AVCOL_SPC_UNSPECIFIED */;
            }
            stream.codecpar.colorPrimaries = colorPrimaries;
            stream.codecpar.colorTrc = colorTrc;
            stream.codecpar.colorSpace = colorMatrix;
        }
    }
    else {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`unsupported color_parameter_type: ${colorParameterType}`, cheap__fileName__0, 79);
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 87);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/ctts.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/ctts.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\ctts.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const streamContext = stream.privData;
    // version & flags
    await ioReader.skip(4);
    const sampleCounts = [];
    const sampleOffsets = [];
    const entryCount = await ioReader.readUint32();
    for (let i = 0; i < entryCount; i++) {
        sampleCounts.push(await ioReader.readUint32());
        sampleOffsets.push(await ioReader.readInt32());
    }
    streamContext.cttsSampleCounts = sampleCounts;
    streamContext.cttsSampleOffsets = sampleOffsets;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read ctts error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 59);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/dac3.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/dac3.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/channel */ "./src/avutil/util/channel.ts");
var cheap__fileName__6 = "src\\avformat\\formats\\mov\\parsing\\dac3.ts";







// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
    if (atom.size <= 0) {
        return;
    }
    const sd = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.newSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 24, 7 /* AVPacketSideDataType.AV_PKT_DATA_AUDIO_SERVICE_TYPE */, 4);
    const ast = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](sd);
    const ac3info = await ioReader.readUint24();
    const bsmod = (ac3info >> 14) & 0x7;
    const acmod = (ac3info >> 11) & 0x7;
    const lfeon = (ac3info >> 10) & 0x1;
    let mask = _codecs_ac3__WEBPACK_IMPORTED_MODULE_5__.AC3ChannelLayout[acmod];
    if (lfeon) {
        mask |= 8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */;
    }
    avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__.unInitChannelLayout(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112);
    avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__.setChannelLayoutFromMask(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112, mask);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ast, bsmod);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`read avcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__6, 77);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/dec3.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/dec3.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/channel */ "./src/avutil/util/channel.ts");
var cheap__fileName__7 = "src\\avformat\\formats\\mov\\parsing\\dec3.ts";







// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */;
    if (atom.size <= 0) {
        return;
    }
    const sd = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.newSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 24, 7 /* AVPacketSideDataType.AV_PKT_DATA_AUDIO_SERVICE_TYPE */, 4);
    const ast = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](sd);
    // data_rate and num_ind_sub
    await ioReader.skip(2);
    const eac3info = await ioReader.readUint24();
    const bsmod = (eac3info >> 12) & 0x1f;
    const acmod = (eac3info >> 9) & 0x7;
    const lfeon = (eac3info >> 8) & 0x1;
    let mask = _codecs_ac3__WEBPACK_IMPORTED_MODULE_5__.AC3ChannelLayout[acmod];
    if (lfeon) {
        mask |= 8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */;
    }
    avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__.unInitChannelLayout(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112);
    avutil_util_channel__WEBPACK_IMPORTED_MODULE_6__.setChannelLayoutFromMask(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112, mask);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ast, bsmod);
    if (stream.codecpar.chLayout.nbChannels > 1 && bsmod == 0x7) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](ast, 8 /* AVAudioServiceType.AV_AUDIO_SERVICE_TYPE_KARAOKE */);
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`read avcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__7, 82);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/dfla.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/dfla.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\dfla.ts";



// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 86028 /* AVCodecID.AV_CODEC_ID_FLAC */;
    // FlacSpecificBox version
    await ioReader.skip(1);
    // flag
    await ioReader.skip(3);
    const tmp = await ioReader.readUint8();
    const last = tmp & 0x80;
    const type = tmp & 0x7f;
    const size = await ioReader.readUint24();
    if (type === 0 /* FlacMetadataType.FLAC_METADATA_TYPE_STREAMINFO */ && size === 34) {
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__.avMalloc)(size);
        const extradata = await ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapSafeUint8Array)(data, size));
        if (movContext.foundMoov) {
            stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
            (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__.avFree)(data);
        }
        else {
            stream.codecpar.extradata = data;
            stream.codecpar.extradataSize = size;
        }
    }
    else {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('streaminfo must be first FLACMetadataBlock', cheap__fileName__0, 67);
    }
    if (!last) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('non streaminfo FLACMetadataBlock(s) ignored', cheap__fileName__0, 71);
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 79);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/dops.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/dops.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\dops.ts";






// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 86076 /* AVCodecID.AV_CODEC_ID_OPUS */;
    // OpusSpecificBox version
    await ioReader.skip(1);
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__.avMalloc)(atom.size + 8);
    const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapSafeUint8Array)(data, atom.size + 8);
    const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_5__["default"](extradata, false);
    writer.writeString('OpusHead');
    writer.writeUint8(1);
    await ioReader.readBuffer(atom.size - 1, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapSafeUint8Array)(data + 9, atom.size - 1));
    reader.seek(10);
    writer.seek(10);
    // 大端变小端
    writer.writeUint16(reader.readUint16());
    writer.writeUint32(reader.readUint32());
    writer.writeUint16(reader.readUint16());
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_1__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = extradata.length;
        _codecs_opus__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, extradata.slice());
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read dops error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 81);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/esds.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/esds.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _mov__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mov */ "./src/avformat/formats/mov/mov.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../codecs/opus */ "./src/avformat/codecs/opus.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\esds.ts";






// @ts-ignore
async function readDescriptorLength(ioReader) {
    let len = 0;
    for (let i = 0; i < 4; i++) {
        const c = await ioReader.readUint8();
        len = (len << 7) | (c & 0x7f);
        if (!(c & 0x80)) {
            break;
        }
    }
    return len;
}
// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    // version = 0
    await ioReader.skip(4);
    let endPos = ioReader.getPos() + BigInt(Math.floor(atom.size - 4));
    while (ioReader.getPos() < endPos) {
        let tag = await ioReader.readUint8();
        let size = await readDescriptorLength(ioReader);
        if (size === 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('esds invalid descriptor size 0, skip', cheap__fileName__0, 68);
            await ioReader.skip(Number(endPos - ioReader.getPos()));
            continue;
        }
        // ES descriptor
        if (tag === 3 /* MP4Tag.MP4_ES_DESCR_TAG */) {
            let subEndPos = ioReader.getPos() + BigInt(Math.floor(size));
            // track_id
            await ioReader.skip(2);
            // flags = 0
            await ioReader.skip(1);
            tag = await ioReader.readUint8();
            size = await readDescriptorLength(ioReader);
            if (size === 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('esds invalid ES descriptor size 0, skip', cheap__fileName__0, 85);
                await ioReader.skip(Number(subEndPos - ioReader.getPos()));
                continue;
            }
            // DecoderConfig descriptor
            if (tag === 4 /* MP4Tag.MP4_DEC_CONFIG_DESCR_TAG */) {
                stream.codecpar.codecId = _mov__WEBPACK_IMPORTED_MODULE_1__.Mp4aObj2AVCodecID[await ioReader.readUint8()];
                /*
                 * the following fields is made of 6 bits to identify the streamtype (4 for video, 5 for audio)
                 * plus 1 bit to indicate upstream and 1 bit set to 1 (reserved)
                 */
                await ioReader.skip(1);
                // Buffersize DB
                await ioReader.skip(3);
                // maxbitrate
                await ioReader.skip(4);
                // avgbitrate
                await ioReader.skip(4);
                if (ioReader.getPos() < (subEndPos - BigInt(5))) {
                    tag = await ioReader.readUint8();
                    size = await readDescriptorLength(ioReader);
                    // DecoderSpecific info descriptor
                    if (tag === 5 /* MP4Tag.MP4_DEC_SPECIFIC_DESCR_TAG */) {
                        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avMalloc)(size);
                        const extradata = await ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapSafeUint8Array)(data, size));
                        if (movContext.foundMoov) {
                            stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
                            (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avFree)(data);
                        }
                        else {
                            stream.codecpar.extradata = data;
                            stream.codecpar.extradataSize = size;
                            if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                                _codecs_aac__WEBPACK_IMPORTED_MODULE_4__.parseAVCodecParameters(stream, extradata.slice());
                            }
                            else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                                _codecs_opus__WEBPACK_IMPORTED_MODULE_5__.parseAVCodecParameters(stream, extradata.slice());
                            }
                        }
                    }
                    else {
                        await ioReader.skip(Number(subEndPos - ioReader.getPos()));
                    }
                }
                else {
                    await ioReader.skip(Number(subEndPos - ioReader.getPos()));
                }
            }
            else {
                await ioReader.skip(Math.min(size, Number(subEndPos - ioReader.getPos())));
            }
        }
        else {
            await ioReader.skip(Math.min(size, Number(endPos - ioReader.getPos())));
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 153);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/hdlr.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/hdlr.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
/* harmony import */ var _mov__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mov */ "./src/avformat/formats/mov/mov.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\hdlr.ts";



// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    if (version === 0) {
        // handler
        await ioReader.skip(4);
        const handlerType = await ioReader.readString(4);
        const codecType = _mov__WEBPACK_IMPORTED_MODULE_2__.HandlerType2MediaType[handlerType];
        if ((0,common_function_isDef__WEBPACK_IMPORTED_MODULE_1__["default"])(codecType)) {
            stream.codecpar.codecType = codecType;
        }
        // component manufacture 
        await ioReader.skip(4);
        // component flags 
        await ioReader.skip(4);
        // component flags mask 
        await ioReader.skip(4);
        const len = atom.size - 24;
        if (len > 0) {
            const skip = !movContext.isom && (await ioReader.peekUint8()) === len - 1;
            if (skip) {
                await ioReader.skip(1);
            }
            stream.metadata['handlerName'] = await ioReader.readString(len - (skip ? 1 : 0));
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read hdlr error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 77);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/hvcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/hvcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\hvcc.ts";




// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    stream.codecpar.codecId = 173 /* AVCodecID.AV_CODEC_ID_HEVC */;
    if (atom.size <= 0) {
        return;
    }
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(atom.size);
    const extradata = await ioReader.readBuffer(atom.size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapSafeUint8Array)(data, atom.size));
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = atom.size;
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
    }
    _codecs_hevc__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read hevc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 67);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/mdhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/mdhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\mdhd.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    let creationTime = BigInt(0);
    let modificationTime = BigInt(0);
    let timescale = 0;
    let duration = BigInt(0);
    if (version === 1) {
        creationTime = await ioReader.readUint64();
        modificationTime = await ioReader.readUint64();
        timescale = await ioReader.readUint32();
        duration = await ioReader.readUint64();
    }
    else {
        creationTime = BigInt(Math.floor(await ioReader.readUint32()));
        modificationTime = BigInt(Math.floor(await ioReader.readUint32()));
        timescale = await ioReader.readUint32();
        duration = BigInt(Math.floor(await ioReader.readUint32()));
    }
    stream.duration = duration;
    stream.timeBase.den = timescale;
    stream.timeBase.num = 1;
    stream.metadata['creationTime'] = creationTime;
    stream.metadata['modificationTime'] = modificationTime;
    const language = await ioReader.readUint16();
    const chars = [];
    chars[0] = (language >> 10) & 0x1F;
    chars[1] = (language >> 5) & 0x1F;
    chars[2] = language & 0x1F;
    const languageString = String.fromCharCode(chars[0] + 0x60, chars[1] + 0x60, chars[2] + 0x60);
    stream.metadata['language'] = language;
    stream.metadata['languageString'] = languageString;
    await ioReader.skip(2);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read mdhd error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 83);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/mfhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/mfhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\mfhd.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    movContext.currentFragment.sequence = await ioReader.readUint32();
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 49);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/mvhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/mvhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\mvhd.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    if (version === 1) {
        movContext.creationTime = await ioReader.readUint64();
        movContext.modificationTime = await ioReader.readUint64();
        movContext.timescale = await ioReader.readUint32();
        movContext.duration = await ioReader.readUint64();
    }
    else {
        movContext.creationTime = BigInt(Math.floor(await ioReader.readUint32()));
        movContext.modificationTime = BigInt(Math.floor(await ioReader.readUint32()));
        movContext.timescale = await ioReader.readUint32();
        movContext.duration = BigInt(Math.floor(await ioReader.readUint32()));
    }
    movContext.rate = await ioReader.readUint32();
    movContext.volume = await ioReader.readUint16() >>> 8;
    await ioReader.skip(10);
    movContext.matrix = new Uint32Array(9);
    for (let i = 0; i < 9; i++) {
        movContext.matrix[i] = await ioReader.readUint32();
    }
    await ioReader.skip(24);
    movContext.nextTrackId = await ioReader.readUint32();
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read mvhd error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 70);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/parsers.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/parsers.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stts */ "./src/avformat/formats/mov/parsing/stts.ts");
/* harmony import */ var _ctts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ctts */ "./src/avformat/formats/mov/parsing/ctts.ts");
/* harmony import */ var _stss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stss */ "./src/avformat/formats/mov/parsing/stss.ts");
/* harmony import */ var _stsz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stsz */ "./src/avformat/formats/mov/parsing/stsz.ts");
/* harmony import */ var _stz2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stz2 */ "./src/avformat/formats/mov/parsing/stz2.ts");
/* harmony import */ var _stsc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stsc */ "./src/avformat/formats/mov/parsing/stsc.ts");
/* harmony import */ var _stco__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stco */ "./src/avformat/formats/mov/parsing/stco.ts");
/* harmony import */ var _co64__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./co64 */ "./src/avformat/formats/mov/parsing/co64.ts");
/* harmony import */ var _mdhd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mdhd */ "./src/avformat/formats/mov/parsing/mdhd.ts");
/* harmony import */ var _mvhd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mvhd */ "./src/avformat/formats/mov/parsing/mvhd.ts");
/* harmony import */ var _tkhd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tkhd */ "./src/avformat/formats/mov/parsing/tkhd.ts");
/* harmony import */ var _hdlr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hdlr */ "./src/avformat/formats/mov/parsing/hdlr.ts");
/* harmony import */ var _stsd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stsd */ "./src/avformat/formats/mov/parsing/stsd.ts");
/* harmony import */ var _trex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./trex */ "./src/avformat/formats/mov/parsing/trex.ts");
/* harmony import */ var _mfhd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mfhd */ "./src/avformat/formats/mov/parsing/mfhd.ts");
/* harmony import */ var _tfhd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tfhd */ "./src/avformat/formats/mov/parsing/tfhd.ts");
/* harmony import */ var _tfdt__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tfdt */ "./src/avformat/formats/mov/parsing/tfdt.ts");
/* harmony import */ var _trun__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./trun */ "./src/avformat/formats/mov/parsing/trun.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../function/mktag */ "./src/avformat/function/mktag.ts");
/*
 * libmedia mp4 box parsers map
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



















const parsers = {
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stts" /* BoxType.STTS */)]: _stts__WEBPACK_IMPORTED_MODULE_0__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("ctts" /* BoxType.CTTS */)]: _ctts__WEBPACK_IMPORTED_MODULE_1__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stss" /* BoxType.STSS */)]: _stss__WEBPACK_IMPORTED_MODULE_2__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stsz" /* BoxType.STSZ */)]: _stsz__WEBPACK_IMPORTED_MODULE_3__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stz2" /* BoxType.STZ2 */)]: _stz2__WEBPACK_IMPORTED_MODULE_4__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stsc" /* BoxType.STSC */)]: _stsc__WEBPACK_IMPORTED_MODULE_5__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stco" /* BoxType.STCO */)]: _stco__WEBPACK_IMPORTED_MODULE_6__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("co64" /* BoxType.CO64 */)]: _co64__WEBPACK_IMPORTED_MODULE_7__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("mdhd" /* BoxType.MDHD */)]: _mdhd__WEBPACK_IMPORTED_MODULE_8__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("mvhd" /* BoxType.MVHD */)]: _mvhd__WEBPACK_IMPORTED_MODULE_9__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("tkhd" /* BoxType.TKHD */)]: _tkhd__WEBPACK_IMPORTED_MODULE_10__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("hdlr" /* BoxType.HDLR */)]: _hdlr__WEBPACK_IMPORTED_MODULE_11__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("stsd" /* BoxType.STSD */)]: _stsd__WEBPACK_IMPORTED_MODULE_12__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("trex" /* BoxType.TREX */)]: _trex__WEBPACK_IMPORTED_MODULE_13__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("mfhd" /* BoxType.MFHD */)]: _mfhd__WEBPACK_IMPORTED_MODULE_14__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("tfhd" /* BoxType.TFHD */)]: _tfhd__WEBPACK_IMPORTED_MODULE_15__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("tfdt" /* BoxType.TFDT */)]: _tfdt__WEBPACK_IMPORTED_MODULE_16__["default"],
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_18__["default"])("trun" /* BoxType.TRUN */)]: _trun__WEBPACK_IMPORTED_MODULE_17__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parsers);


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stco.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stco.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stco.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const chunkOffsets = [];
    const chunkCount = await ioReader.readUint32();
    if (version === 0) {
        for (let i = 0; i < chunkCount; i++) {
            chunkOffsets.push(BigInt(Math.floor(await ioReader.readUint32())));
        }
    }
    stream.privData.chunkOffsets = chunkOffsets;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stco error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 56);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stsc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stsc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stsc.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const streamContext = stream.privData;
    const firstChunk = [];
    const samplesPerChunk = [];
    const sampleDescriptionIndex = [];
    const entryCount = await ioReader.readUint32();
    if (version === 0) {
        for (let i = 0; i < entryCount; i++) {
            firstChunk.push(await ioReader.readUint32());
            samplesPerChunk.push(await ioReader.readUint32());
            sampleDescriptionIndex.push(await ioReader.readUint32());
        }
    }
    streamContext.stscFirstChunk = firstChunk;
    streamContext.stscSamplesPerChunk = samplesPerChunk;
    streamContext.stscSampleDescriptionIndex = sampleDescriptionIndex;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stsc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 65);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stsd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stsd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _mov__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mov */ "./src/avformat/formats/mov/mov.ts");
/* harmony import */ var _avcc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avcc */ "./src/avformat/formats/mov/parsing/avcc.ts");
/* harmony import */ var _hvcc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hvcc */ "./src/avformat/formats/mov/parsing/hvcc.ts");
/* harmony import */ var _vvcc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vvcc */ "./src/avformat/formats/mov/parsing/vvcc.ts");
/* harmony import */ var _vpcc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vpcc */ "./src/avformat/formats/mov/parsing/vpcc.ts");
/* harmony import */ var _av1c__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./av1c */ "./src/avformat/formats/mov/parsing/av1c.ts");
/* harmony import */ var _esds__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./esds */ "./src/avformat/formats/mov/parsing/esds.ts");
/* harmony import */ var _wave__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./wave */ "./src/avformat/formats/mov/parsing/wave.ts");
/* harmony import */ var _dfla__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dfla */ "./src/avformat/formats/mov/parsing/dfla.ts");
/* harmony import */ var _dops__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dops */ "./src/avformat/formats/mov/parsing/dops.ts");
/* harmony import */ var _colr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./colr */ "./src/avformat/formats/mov/parsing/colr.ts");
/* harmony import */ var _dac3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dac3 */ "./src/avformat/formats/mov/parsing/dac3.ts");
/* harmony import */ var _dec3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dec3 */ "./src/avformat/formats/mov/parsing/dec3.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stsd.ts";















// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    // version
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const streamContext = stream.privData;
    const entryCount = await ioReader.readUint32();
    for (let i = 0; i < entryCount; i++) {
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        const endPos = ioReader.getPos() + BigInt(Math.floor(size - 8));
        if (_mov__WEBPACK_IMPORTED_MODULE_2__.tag2CodecId[type]) {
            stream.codecpar.codecId = _mov__WEBPACK_IMPORTED_MODULE_2__.tag2CodecId[type];
        }
        if (size === 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('stsd entry invalid box size 0, skip', cheap__fileName__0, 73);
            await ioReader.skip(Number(endPos - ioReader.getPos()));
            break;
        }
        if (size >= 16) {
            // reserved
            await ioReader.skip(6);
            // referenceIndex uin16
            await ioReader.skip(2);
        }
        else if (size <= 7) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal(`invalid size: ${size} in stsd`, cheap__fileName__0, 86);
        }
        if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            // version
            await ioReader.skip(2);
            // revision level
            await ioReader.skip(2);
            // vendor
            stream.metadata['vendorId'] = await ioReader.readString(4);
            // temporal quality
            await ioReader.skip(4);
            // spatial quality
            await ioReader.skip(4);
            stream.codecpar.width = await ioReader.readUint16();
            stream.codecpar.height = await ioReader.readUint16();
            // horizresolution uin32
            await ioReader.skip(4);
            // vertresolution uin32
            await ioReader.skip(4);
            // data size = 0 uin32
            await ioReader.skip(4);
            // frames per samples = 1 uin16
            await ioReader.skip(2);
            let len = await ioReader.readUint8();
            if (len > 31) {
                len = 31;
            }
            stream.metadata['encoder'] = await ioReader.readString(len);
            if (len < 31) {
                await ioReader.skip(31 - len);
            }
            // depth uin16
            await ioReader.skip(2);
            // Reserved
            await ioReader.skip(2);
            while (ioReader.getPos() < endPos) {
                const size = await ioReader.readUint32();
                const type = await ioReader.readUint32();
                if (size === 0) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('stsd video invalid box size 0, skip', cheap__fileName__0, 135);
                    await ioReader.skip(Number(endPos - ioReader.getPos()));
                    continue;
                }
                if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("avcC" /* BoxType.AVCC */)) {
                    await (0,_avcc__WEBPACK_IMPORTED_MODULE_3__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("hvcC" /* BoxType.HVCC */)) {
                    await (0,_hvcc__WEBPACK_IMPORTED_MODULE_4__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("vvcC" /* BoxType.VVCC */)) {
                    await (0,_vvcc__WEBPACK_IMPORTED_MODULE_5__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("av1C" /* BoxType.AV1C */)) {
                    await (0,_av1c__WEBPACK_IMPORTED_MODULE_7__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("vpcC" /* BoxType.VPCC */)) {
                    await (0,_vpcc__WEBPACK_IMPORTED_MODULE_6__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("esds" /* BoxType.ESDS */)) {
                    await (0,_esds__WEBPACK_IMPORTED_MODULE_8__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("wave" /* BoxType.WAVE */)) {
                    await (0,_wave__WEBPACK_IMPORTED_MODULE_9__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("colr" /* BoxType.COLR */)) {
                    await (0,_colr__WEBPACK_IMPORTED_MODULE_12__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else {
                    await ioReader.skip(Math.min(size - 8, Number(endPos - ioReader.getPos())));
                }
            }
        }
        else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            // SoundDescription Version
            const subVersion = await ioReader.readUint16();
            // Revision level
            await ioReader.skip(2);
            stream.metadata['vendorId'] = await ioReader.readString(4);
            stream.codecpar.chLayout.nbChannels = await ioReader.readUint16();
            stream.codecpar.bitsPerCodedSample = await ioReader.readUint16();
            streamContext.audioCid = await ioReader.readUint16();
            // packet size = 0 
            await ioReader.skip(2);
            stream.codecpar.sampleRate = (await ioReader.readUint32()) >>> 16;
            if (!movContext.isom || (version === 0 && subVersion > 0)) {
                if (subVersion === 1) {
                    streamContext.samplesPerFrame = await ioReader.readUint32();
                    // bytes per packet
                    await ioReader.skip(4);
                    streamContext.bytesPerFrame = await ioReader.readUint32();
                    // bytes per sample
                    await ioReader.skip(4);
                }
                else if (subVersion === 2) {
                    // sizeof struct only
                    await ioReader.skip(4);
                    stream.codecpar.sampleRate = Number(await ioReader.readUint64());
                    stream.codecpar.chLayout.nbChannels = await ioReader.readUint32();
                    // always 0x7F000000
                    await ioReader.skip(4);
                    stream.codecpar.bitsPerCodedSample = await ioReader.readUint32();
                    // lpcm format specific flag
                    await ioReader.skip(4);
                    streamContext.bytesPerFrame = await ioReader.readUint32();
                    streamContext.samplesPerFrame = await ioReader.readUint32();
                }
            }
            while (ioReader.getPos() < endPos) {
                const size = await ioReader.readUint32();
                const type = await ioReader.readUint32();
                if (size === 0) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('stsd audio invalid box size 0, skip', cheap__fileName__0, 282);
                    await ioReader.skip(Number(endPos - ioReader.getPos()));
                    continue;
                }
                if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("esds" /* BoxType.ESDS */)) {
                    await (0,_esds__WEBPACK_IMPORTED_MODULE_8__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("dfLa" /* BoxType.DFLA */)) {
                    await (0,_dfla__WEBPACK_IMPORTED_MODULE_10__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("dOps" /* BoxType.DOPS */)) {
                    await (0,_dops__WEBPACK_IMPORTED_MODULE_11__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("wave" /* BoxType.WAVE */)) {
                    await (0,_wave__WEBPACK_IMPORTED_MODULE_9__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("dac3" /* BoxType.DAC3 */)) {
                    await (0,_dac3__WEBPACK_IMPORTED_MODULE_13__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("dec3" /* BoxType.DEC3 */)) {
                    await (0,_dec3__WEBPACK_IMPORTED_MODULE_14__["default"])(ioReader, stream, {
                        type,
                        size: size - 8
                    }, movContext);
                }
                else {
                    await ioReader.skip(Math.min(size - 8, Number(endPos - ioReader.getPos())));
                }
            }
        }
        else if (stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
            if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("stpp" /* BoxType.STPP */)) {
                stream.codecpar.codecId = 94232 /* AVCodecID.AV_CODEC_ID_TTML */;
            }
            else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("wvtt" /* BoxType.WVTT */)) {
                stream.codecpar.codecId = 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */;
            }
            else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("tx3g" /* BoxType.TX3G */) || type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("text" /* BoxType.TEXT */)) {
                stream.codecpar.codecId = 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */;
            }
            else if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("c608" /* BoxType.C608 */)) {
                stream.codecpar.codecId = 94218 /* AVCodecID.AV_CODEC_ID_EIA_608 */;
            }
            await ioReader.skip(Math.min(size - 8, Number(endPos - ioReader.getPos())));
        }
        else {
            await ioReader.skip(Math.min(size - 8, Number(endPos - ioReader.getPos())));
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stsd error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 383);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stss.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stss.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stss.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const sampleNumbers = new Map();
    const entryCount = await ioReader.readUint32();
    if (version === 0) {
        for (let i = 0; i < entryCount; i++) {
            sampleNumbers.set(await ioReader.readUint32(), true);
        }
    }
    stream.privData.stssSampleNumbersMap = sampleNumbers;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stss error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 57);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stsz.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stsz.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stsz.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const sampleSizes = [];
    let sampleSize = 0;
    let sampleCount = 0;
    if (version === 0) {
        sampleSize = await ioReader.readUint32();
        sampleCount = await ioReader.readUint32();
        for (let i = 0; i < sampleCount; i++) {
            if (sampleSize === 0) {
                sampleSizes.push(await ioReader.readUint32());
            }
            else {
                sampleSizes[i] = sampleSize;
            }
        }
    }
    stream.privData.sampleSizes = sampleSizes;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stsz error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 65);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stts.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stts.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stts.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const streamContext = stream.privData;
    const sampleCounts = [];
    const sampleDeltas = [];
    const entryCount = await ioReader.readUint32();
    let delta = 1;
    if (version === 0) {
        for (let i = 0; i < entryCount; i++) {
            sampleCounts.push(await ioReader.readUint32());
            delta = await ioReader.readInt32();
            if (delta < 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('File uses negative stts sample delta, using value 1 instead, sync may be lost!', cheap__fileName__0, 53);
            }
            sampleDeltas.push(delta);
        }
    }
    streamContext.sttsSampleCounts = sampleCounts;
    streamContext.sttsSampleDeltas = sampleDeltas;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stts error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 67);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/stz2.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/stz2.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\stz2.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const sampleSizes = [];
    let sampleCount = 0;
    let fieldSize = 0;
    if (version === 0) {
        await ioReader.skip(3);
        fieldSize = await ioReader.readUint8();
        sampleCount = await ioReader.readUint32();
        if (fieldSize === 4) {
            for (let i = 0; i < sampleCount; i += 2) {
                const tmp = await ioReader.readUint8();
                sampleSizes[i] = (tmp >> 4) & 0xF;
                sampleSizes[i + 1] = tmp & 0xF;
            }
        }
        else if (fieldSize === 8) {
            for (let i = 0; i < sampleCount; i++) {
                sampleSizes[i] = await ioReader.readUint8();
            }
        }
        else if (fieldSize === 16) {
            for (let i = 0; i < sampleCount; i++) {
                sampleSizes[i] = await ioReader.readUint16();
            }
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('Error in length field in stz2 box', cheap__fileName__0, 67);
        }
    }
    stream.privData.sampleSizes = sampleSizes;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read stz2 error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 78);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/tfdt.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/tfdt.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\tfdt.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    await ioReader.skip(3);
    const track = movContext.currentFragment.currentTrack;
    if (track) {
        if (version === 1) {
            track.baseMediaDecodeTime = await ioReader.readUint64();
        }
        else {
            track.baseMediaDecodeTime = BigInt(Math.floor(await ioReader.readUint32()));
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 57);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/tfhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/tfhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\tfhd.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    const flags = await ioReader.readUint24();
    const trackId = await ioReader.readUint32();
    const track = movContext.currentFragment.currentTrack;
    track.trackId = trackId;
    if (track) {
        if (flags & 1 /* TFHDFlags.BASE_DATA_OFFSET */) {
            track.baseDataOffset = await ioReader.readUint64();
        }
        if (flags & 2 /* TFHDFlags.SAMPLE_DESCRIPTION */) {
            await ioReader.skip(4);
        }
        if (flags & 8 /* TFHDFlags.SAMPLE_DURATION */) {
            track.defaultSampleDuration = await ioReader.readUint32();
        }
        if (flags & 16 /* TFHDFlags.SAMPLE_SIZE */) {
            track.defaultSampleSize = await ioReader.readUint32();
        }
        if (flags & 32 /* TFHDFlags.SAMPLE_FLAGS */) {
            track.defaultSampleFlags = await ioReader.readUint32();
        }
        if (flags & 131072 /* TFHDFlags.DEFAULT_BASE_IS_MOOF */) {
            track.baseIsMoof = true;
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 75);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/tkhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/tkhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\tkhd.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const streamContext = stream.privData;
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    streamContext.flags = await ioReader.readUint24();
    if (streamContext.flags & 1 /* TKHDFlags.ENABLED */) {
        stream.disposition |= 1 /* AVDisposition.DEFAULT */;
    }
    if (version === 1) {
        stream.metadata['creationTime'] = await ioReader.readUint64();
        stream.metadata['modificationTime'] = await ioReader.readUint64();
        streamContext.trackId = await ioReader.readUint32();
        await ioReader.skip(4);
        streamContext.duration = await ioReader.readUint64();
    }
    else {
        stream.metadata['creationTime'] = BigInt(Math.floor(await ioReader.readUint32()));
        stream.metadata['modificationTime'] = BigInt(Math.floor(await ioReader.readUint32()));
        streamContext.trackId = await ioReader.readUint32();
        await ioReader.skip(4);
        streamContext.duration = BigInt(Math.floor(await ioReader.readUint32()));
    }
    await ioReader.skip(8);
    streamContext.layer = await ioReader.readInt16();
    streamContext.alternateGroup = await ioReader.readInt16();
    streamContext.volume = await ioReader.readInt16() >> 8;
    await ioReader.skip(2);
    streamContext.matrix = new Uint32Array(9);
    for (let i = 0; i < 9; i++) {
        streamContext.matrix[i] = await ioReader.readUint32();
    }
    streamContext.width = (await ioReader.readUint32()) >> 16;
    streamContext.height = (await ioReader.readUint32()) >> 16;
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read tkhd error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 82);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/trex.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/trex.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\trex.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    const trackId = await ioReader.readUint32();
    // default_sample_description_index
    await ioReader.skip(4);
    const duration = await ioReader.readUint32();
    const size = await ioReader.readUint32();
    const flags = await ioReader.readUint32();
    movContext.trexs.push({
        trackId,
        duration,
        size,
        flags
    });
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read trex error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 61);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/trun.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/trun.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\trun.ts";

// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    const flags = await ioReader.readUint24();
    const track = movContext.currentFragment.currentTrack;
    if (track) {
        track.sampleCount = await ioReader.readUint32();
        if (flags & 1 /* TRUNFlags.DATA_OFFSET */) {
            track.dataOffset = await ioReader.readInt32();
        }
        if (flags & 4 /* TRUNFlags.FIRST_FLAG */) {
            track.firstSampleFlags = await ioReader.readUint32();
        }
        for (let i = 0; i < track.sampleCount; i++) {
            if (flags & 256 /* TRUNFlags.DURATION */) {
                track.sampleDurations.push(await ioReader.readUint32());
            }
            if (flags & 512 /* TRUNFlags.SIZE */) {
                track.sampleSizes.push(await ioReader.readUint32());
            }
            if (flags & 1024 /* TRUNFlags.FLAGS */) {
                track.sampleFlags.push(await ioReader.readUint32());
            }
            if (flags & 2048 /* TRUNFlags.CTS_OFFSET */) {
                if (version === 0) {
                    track.sampleCompositionTimeOffset.push(await ioReader.readUint32());
                }
                else {
                    track.sampleCompositionTimeOffset.push(await ioReader.readInt32());
                }
            }
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 79);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/vpcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/vpcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _codecs_vp9__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/vp9 */ "./src/avformat/codecs/vp9.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\vpcc.ts";




// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    stream.codecpar.codecId = 167 /* AVCodecID.AV_CODEC_ID_VP9 */;
    if ((atom.size - 4) <= 0) {
        return;
    }
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(atom.size - 4);
    const extradata = await ioReader.readBuffer(atom.size - 4, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapSafeUint8Array)(data, atom.size - 4));
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = atom.size - 4;
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
    }
    _codecs_vp9__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 71);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/vvcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/vvcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\vvcc.ts";




// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const version = await ioReader.readUint8();
    // flags
    await ioReader.skip(3);
    stream.codecpar.codecId = 196 /* AVCodecID.AV_CODEC_ID_VVC */;
    if ((atom.size - 4) <= 0) {
        return;
    }
    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(atom.size - 4);
    const extradata = await ioReader.readBuffer(atom.size - 4, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapSafeUint8Array)(data, atom.size - 4));
    if (movContext.foundMoov) {
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
        (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avFree)(data);
    }
    else {
        stream.codecpar.extradata = data;
        stream.codecpar.extradataSize = atom.size - 4;
        stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = extradata.slice();
    }
    _codecs_vvc__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read vvcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 71);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/parsing/wave.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/parsing/wave.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ read)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _esds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./esds */ "./src/avformat/formats/mov/parsing/esds.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\parsing\\wave.ts";



// @ts-ignore
async function read(ioReader, stream, atom, movContext) {
    const now = ioReader.getPos();
    const endPos = now + BigInt(Math.floor(atom.size));
    while (ioReader.getPos() < endPos) {
        const size = await ioReader.readUint32();
        const type = await ioReader.readUint32();
        if (size === 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('wave invalid box size 0, skip', cheap__fileName__0, 47);
            await ioReader.skip(Number(endPos - ioReader.getPos()));
            continue;
        }
        if (type === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_1__["default"])("esds" /* BoxType.ESDS */)) {
            await (0,_esds__WEBPACK_IMPORTED_MODULE_2__["default"])(ioReader, stream, {
                type,
                size: size - 8
            }, movContext);
        }
        else {
            await ioReader.skip(Math.min(size - 8, Number(endPos - ioReader.getPos())));
        }
    }
    const remainingLength = atom.size - Number(ioReader.getPos() - now);
    if (remainingLength > 0) {
        await ioReader.skip(remainingLength);
    }
    else if (remainingLength < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error(`read vpcc error, size: ${atom.size}, read: ${atom.size - remainingLength}`, cheap__fileName__0, 73);
    }
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IMovFormat_ts.avplayer.js.map