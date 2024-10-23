"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IAacFormat_ts"],{

/***/ "./src/avformat/bsf/AVBSFilter.ts":
/*!****************************************!*\
  !*** ./src/avformat/bsf/AVBSFilter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVBSFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/struct/avcodecparameters */ "./src/avutil/struct/avcodecparameters.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/codecparameters */ "./src/avutil/util/codecparameters.ts");




class AVBSFilter {
    inCodecpar;
    inTimeBase;
    outCodecpar;
    init(codecpar, timeBase) {
        this.inCodecpar = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avMallocz)(168);
        (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.copyCodecParameters)(this.inCodecpar, codecpar);
        this.inTimeBase = {
            den: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase + 4),
            num: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase)
        };
        return 0;
    }
    destroy() {
        if (this.inCodecpar) {
            (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.freeCodecParameters)(this.inCodecpar);
            this.inCodecpar = 0;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/aac/LATM2RawFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/LATM2RawFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LATM2RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _avutil_struct_avcodecparameters_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\..\avutil\struct\avcodecparameters.ts */ "./src/avutil/struct/avcodecparameters.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\aac\\LATM2RawFilter.ts";
















class LATM2RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_4__["default"] {
    bitReader;
    streamMuxConfig;
    caches;
    refSampleDuration;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        this.refSampleDuration = BigInt(0);
        this.bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_13__["default"]();
        this.streamMuxConfig = {
            profile: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            sampleRate: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            channels: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE
        };
        return 0;
    }
    sendAVPacket(avpacket) {
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        this.bitReader.appendBuffer(buffer);
        let lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
        while (this.bitReader.remainingLength() >= 20) {
            const now = this.bitReader.getPointer();
            const info = _codecs_aac__WEBPACK_IMPORTED_MODULE_9__.parseLATMHeader(null, this.bitReader);
            if (common_util_is__WEBPACK_IMPORTED_MODULE_14__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('AACLATMParser parse failed', cheap__fileName__4, 94);
                this.bitReader.reset();
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            if (info.framePayloadLength >= this.bitReader.remainingLength()) {
                this.bitReader.skipPadding();
                this.bitReader.setPointer(now);
                break;
            }
            if (!info.useSameStreamMux) {
                this.streamMuxConfig.profile = info.profile;
                this.streamMuxConfig.sampleRate = info.sampleRate;
                this.streamMuxConfig.channels = info.channels;
            }
            const length = info.framePayloadLength;
            const rawData = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
                rawData[i] = this.bitReader.readU(8);
            }
            const item = {
                dts: lastDts,
                buffer: rawData,
                extradata: null
            };
            const hasNewExtraData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) !== this.streamMuxConfig.profile
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136) !== this.streamMuxConfig.sampleRate
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) !== this.streamMuxConfig.channels;
            if (hasNewExtraData) {
                this.refSampleDuration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_10__.avRescaleQ)(BigInt(Math.floor(1024 / this.streamMuxConfig.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE_Q, this.inTimeBase);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 48, this.streamMuxConfig.profile);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 136, this.streamMuxConfig.sampleRate);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 116, this.streamMuxConfig.channels);
                const extradata = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_9__.avCodecParameters2Extradata)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(this.inCodecpar, _avutil_struct_avcodecparameters_ts__WEBPACK_IMPORTED_MODULE_2__["default"]));
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](this.inCodecpar + 12)) {
                    (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avFree)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](this.inCodecpar + 12));
                }
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](this.inCodecpar + 12, (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(extradata.length));
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](this.inCodecpar + 12), extradata.length, extradata);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 16, extradata.length);
                item.extradata = extradata;
            }
            this.caches.push(item);
            lastDts += this.refSampleDuration;
            this.bitReader.skipPadding();
        }
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, this.refSampleDuration);
            if (item.extradata) {
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_11__.avMalloc)(item.extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(extradata, item.extradata.length, item.extradata);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, item.extradata.length);
            }
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.EOF;
        }
    }
    reset() {
        this.bitReader.reset();
        return 0;
    }
}


/***/ }),

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

/***/ "./src/avformat/formats/IAacFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IAacFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IAacFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var _bsf_aac_LATM2RawFilter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../bsf/aac/LATM2RawFilter */ "./src/avformat/bsf/aac/LATM2RawFilter.ts");
var cheap__fileName__26 = "src\\avformat\\formats\\IAacFormat.ts";















const PACKET_SIZE = 1024;
class IAacFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_5__["default"] {
    type = 13 /* AVFormat.AAC */;
    frameType;
    fileSize;
    currentPts;
    latmFilter;
    constructor() {
        super();
    }
    init(formatContext) {
        this.currentPts = BigInt(0);
    }
    destroy(formatContext) {
        if (this.latmFilter) {
            this.latmFilter.destroy();
            this.latmFilter = null;
        }
    }
    async estimateTotalBlock(formatContext) {
        let duration = 0;
        const now = formatContext.ioReader.getPos();
        while (true) {
            try {
                const nextFrame = await formatContext.ioReader.peekBuffer(7);
                const aacFrameLength = ((nextFrame[3] & 0x03) << 11)
                    | (nextFrame[4] << 3)
                    | ((nextFrame[5] & 0xE0) >>> 5);
                const numberOfRawDataBlocksInFrame = nextFrame[6] & 0x03;
                duration += (numberOfRawDataBlocksInFrame + 1);
                await formatContext.ioReader.skip(aacFrameLength);
            }
            catch (error) {
                break;
            }
        }
        await formatContext.ioReader.seek(now);
        return duration;
    }
    async readHeader(formatContext) {
        const signature = await formatContext.ioReader.peekBuffer(4);
        this.fileSize = await formatContext.ioReader.fileSize();
        // ADIF
        if (signature[0] === 65 && signature[1] === 68 && signature[2] === 73 && signature[3] === 70) {
            const stream = formatContext.createStream();
            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
            stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
            this.frameType = 0 /* FrameType.ADIF */;
            stream.duration = this.fileSize;
            stream.timeBase.den = PACKET_SIZE * 16;
            stream.timeBase.num = 1;
        }
        // ADTS
        else if (signature[0] === 0xff && (signature[1] & 0xf0) === 0xf0) {
            this.frameType = 1 /* FrameType.ADTS */;
            const stream = formatContext.createStream();
            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
            stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
            const info = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.parseADTSHeader)(await formatContext.ioReader.peekBuffer(20));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_13__.number(info)) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            stream.codecpar.profile = info.profile;
            stream.codecpar.sampleRate = info.sampleRate;
            stream.codecpar.chLayout.nbChannels = info.channels;
            const extradata = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.avCodecParameters2Extradata)(stream.codecpar);
            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
            stream.codecpar.extradataSize = extradata.length;
            stream.timeBase.den = stream.codecpar.sampleRate;
            stream.timeBase.num = 1;
            stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_9__.avRescaleQ)(BigInt(Math.floor((await this.estimateTotalBlock(formatContext)) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE_Q, stream.timeBase);
        }
        // LATM
        else if (signature[0] === 0x56 && (signature[1] & 0xe0) === 0xe0) {
            this.frameType = 2 /* FrameType.LATM */;
            const stream = formatContext.createStream();
            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
            stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
            const info = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.parseLATMHeader)(await formatContext.ioReader.peekBuffer(20));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_13__.number(info)) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            stream.codecpar.profile = info.profile;
            stream.codecpar.sampleRate = info.sampleRate;
            stream.codecpar.chLayout.nbChannels = info.channels;
            const extradata = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.avCodecParameters2Extradata)(stream.codecpar);
            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
            stream.codecpar.extradataSize = extradata.length;
            stream.duration = this.fileSize;
            stream.timeBase.den = PACKET_SIZE * 16;
            stream.timeBase.num = 1;
            this.latmFilter = new _bsf_aac_LATM2RawFilter__WEBPACK_IMPORTED_MODULE_14__["default"]();
            this.latmFilter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        });
        try {
            const now = formatContext.ioReader.getPos();
            let nextFrame;
            if (this.frameType === 0 /* FrameType.ADIF */) {
                nextFrame = await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.fileSize - now))));
                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(nextFrame.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, nextFrame.length);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 48, BigInt(PACKET_SIZE));
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, now);
            }
            else if (this.frameType === 1 /* FrameType.ADTS */) {
                const header = await formatContext.ioReader.readBuffer(7);
                const protectionAbsent = header[1] & 0x01;
                const aacFrameLength = ((header[3] & 0x03) << 11)
                    | (header[4] << 3)
                    | ((header[5] & 0xE0) >>> 5);
                const numberOfRawDataBlocksInFrame = header[6] & 0x03;
                let adtsHeaderLength = protectionAbsent === 1 ? 7 : 9;
                let adtsFramePayloadLength = aacFrameLength - adtsHeaderLength;
                if (adtsHeaderLength === 9) {
                    await formatContext.ioReader.skip(2);
                }
                const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_9__.avRescaleQ)(BigInt(Math.floor((numberOfRawDataBlocksInFrame + 1) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE_Q, stream.timeBase);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 48, duration);
                nextFrame = await formatContext.ioReader.readBuffer(adtsFramePayloadLength);
                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(nextFrame.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, nextFrame.length);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, now);
            }
            else if (this.frameType === 2 /* FrameType.LATM */) {
                if (now === this.fileSize) {
                    return -1048576 /* IOError.END */;
                }
                while (true) {
                    let ret = this.latmFilter.receiveAVPacket(avpacket);
                    if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_4__.EOF) {
                        if (formatContext.ioReader.getPos() === this.fileSize) {
                            return -1048576 /* IOError.END */;
                        }
                        nextFrame = await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.fileSize - now))));
                        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(nextFrame.length);
                        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
                        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, nextFrame.length);
                        this.latmFilter.sendAVPacket(avpacket);
                        continue;
                    }
                    else if (ret < 0) {
                        return ret;
                    }
                    else {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 48, BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) >> 0));
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, this.currentPts);
                        break;
                    }
                }
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 16, this.currentPts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 8, this.currentPts);
            this.currentPts += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48);
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`read packet error, ${error}`, cheap__fileName__26, 271);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async syncFrame(formatContext) {
        if (this.frameType === 0 /* FrameType.ADIF */) {
            return;
        }
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        const syncWord = this.frameType === 1 /* FrameType.ADTS */ ? 0xFFF : 0x2B7;
        const shift = this.frameType === 1 /* FrameType.ADTS */ ? 4 : 5;
        while (true) {
            try {
                let count = 0;
                pos = formatContext.ioReader.getPos();
                while (true) {
                    if (count === analyzeCount) {
                        break;
                    }
                    const word = (await formatContext.ioReader.peekUint16()) >>> shift;
                    if (word === syncWord) {
                        const info = this.frameType === 1 /* FrameType.ADTS */
                            ? (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.parseADTSHeader)(await formatContext.ioReader.peekBuffer(9))
                            : (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_12__.parseLATMHeader)(await formatContext.ioReader.peekBuffer(20));
                        if (!common_util_is__WEBPACK_IMPORTED_MODULE_13__.number(info)) {
                            count++;
                            await formatContext.ioReader.skip(info.headerLength + info.framePayloadLength);
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                if (count === analyzeCount) {
                    break;
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        if (this.frameType === 1 /* FrameType.ADTS */) {
            const now = formatContext.ioReader.getPos();
            if (flags & 2 /* AVSeekFlags.BYTE */) {
                const size = await formatContext.ioReader.fileSize();
                if (size <= BigInt(0)) {
                    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
                }
                if (timestamp < BigInt(0)) {
                    timestamp = BigInt(0);
                }
                else if (timestamp > size) {
                    timestamp = size;
                }
                await formatContext.ioReader.seek(timestamp);
                if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                    await this.syncFrame(formatContext);
                    if (stream.duration && this.fileSize) {
                        this.currentPts = timestamp / this.fileSize * stream.duration;
                    }
                }
                return now;
            }
            else {
                if (stream && stream.sampleIndexes.length) {
                    let index = common_util_array__WEBPACK_IMPORTED_MODULE_11__.binarySearch(stream.sampleIndexes, (item) => {
                        if (item.pts > timestamp) {
                            return -1;
                        }
                        return 1;
                    });
                    if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_9__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_MILLI_TIME_BASE_Q) < BigInt(5000)) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__26, 370);
                        await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                        this.currentPts = timestamp;
                        return now;
                    }
                }
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__26, 377);
                if (stream.duration) {
                    await formatContext.ioReader.seek(BigInt(0));
                    let pts = BigInt(0);
                    while (true) {
                        try {
                            if (pts >= timestamp) {
                                this.currentPts = pts;
                                return now;
                            }
                            const nextFrame = await formatContext.ioReader.peekBuffer(7);
                            const aacFrameLength = ((nextFrame[3] & 0x03) << 11)
                                | (nextFrame[4] << 3)
                                | ((nextFrame[5] & 0xE0) >>> 5);
                            const numberOfRawDataBlocksInFrame = nextFrame[6] & 0x03;
                            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_9__.avRescaleQ)(BigInt(Math.floor((numberOfRawDataBlocksInFrame + 1) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE_Q, stream.timeBase);
                            pts += duration;
                            await formatContext.ioReader.skip(aacFrameLength);
                        }
                        catch (error) {
                            return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
                        }
                    }
                }
                else {
                    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
                }
            }
        }
        else if (this.frameType === 0 /* FrameType.ADIF */ || this.frameType === 2 /* FrameType.LATM */) {
            if (this.latmFilter) {
                this.latmFilter.reset();
            }
            const now = formatContext.ioReader.getPos();
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > this.fileSize) {
                timestamp = this.fileSize;
            }
            await formatContext.ioReader.seek(timestamp);
            this.currentPts = timestamp;
            if (this.frameType === 2 /* FrameType.LATM */ && !(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncFrame(formatContext);
            }
            return now;
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return 1;
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IAacFormat_ts.avtranscoder.js.map