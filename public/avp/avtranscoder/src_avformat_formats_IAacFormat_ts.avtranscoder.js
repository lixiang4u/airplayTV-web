"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IAacFormat_ts"],{

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

/***/ "./src/avformat/formats/IAacFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IAacFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IAacFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
var cheap__fileName__15 = "src\\avformat\\formats\\IAacFormat.ts";












const PACKET_SIZE = 1024;
class IAacFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 12 /* AVFormat.AAC */;
    frameType;
    fileSize;
    currentPts;
    constructor() {
        super();
    }
    init(formatContext) {
        this.currentPts = BigInt(0);
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
        }
        // ADTS
        else if (signature[0] === 0xff && (signature[1] & 0xf0) === 0xf0) {
            this.frameType = 1 /* FrameType.ADTS */;
            const stream = formatContext.createStream();
            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
            stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
            const nextFrame = await formatContext.ioReader.peekBuffer(7);
            const profile = (nextFrame[2] & 0xC0) >>> 6;
            const samplingFrequencyIndex = (nextFrame[2] & 0x3C) >>> 2;
            const channelConfiguration = ((nextFrame[2] & 0x01) << 2) | ((nextFrame[3] & 0xC0) >>> 6);
            stream.codecpar.profile = profile + 1;
            stream.codecpar.sampleRate = _codecs_aac__WEBPACK_IMPORTED_MODULE_11__.MPEG4SamplingFrequencies[samplingFrequencyIndex];
            stream.codecpar.chLayout.nbChannels = _codecs_aac__WEBPACK_IMPORTED_MODULE_11__.MPEG4Channels[channelConfiguration];
            const extradata = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_11__.avCodecParameters2Extradata)(stream.codecpar);
            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(extradata.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
            stream.codecpar.extradataSize = extradata.length;
            stream.timeBase.den = stream.codecpar.sampleRate;
            stream.timeBase.num = 1;
            stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(BigInt(Math.floor((await this.estimateTotalBlock(formatContext)) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q, stream.timeBase);
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
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
                nextFrame = await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, (Number(this.fileSize - now & 0xffffffffn) >> 0)));
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
                const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(BigInt(Math.floor((numberOfRawDataBlocksInFrame + 1) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q, stream.timeBase);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, duration);
                nextFrame = await formatContext.ioReader.readBuffer(adtsFramePayloadLength);
            }
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(nextFrame.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, nextFrame.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, this.currentPts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, this.currentPts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, now);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            this.currentPts += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 48);
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__15, 193);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncFrame(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        while (true) {
            try {
                const word = (await formatContext.ioReader.peekUint16()) >>> 4;
                if (word === 0xfff) {
                    pos = formatContext.ioReader.getPos();
                    const header = await formatContext.ioReader.peekBuffer(7);
                    const aacFrameLength = ((header[3] & 0x03) << 11)
                        | (header[4] << 3)
                        | ((header[5] & 0xE0) >>> 5);
                    if (aacFrameLength > 512000) {
                        await formatContext.ioReader.skip(1);
                        continue;
                    }
                    await formatContext.ioReader.skip(aacFrameLength);
                    let count = 0;
                    while (true) {
                        if (count === analyzeCount) {
                            break;
                        }
                        const word = (await formatContext.ioReader.peekUint16()) >>> 4;
                        if (word === 0xfff) {
                            count++;
                            const header = await formatContext.ioReader.peekBuffer(7);
                            const aacFrameLength = ((header[3] & 0x03) << 11)
                                | (header[4] << 3)
                                | ((header[5] & 0xE0) >>> 5);
                            if (aacFrameLength > 512000) {
                                break;
                            }
                            await formatContext.ioReader.skip(aacFrameLength);
                        }
                        else {
                            break;
                        }
                    }
                    if (count === analyzeCount) {
                        break;
                    }
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        if (this.frameType === 1 /* FrameType.ADTS */) {
            const now = formatContext.ioReader.getPos();
            if (flags & 2 /* AVSeekFlags.BYTE */) {
                const size = await formatContext.ioReader.fileSize();
                if (size <= BigInt(0)) {
                    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
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
                    let index = common_util_array__WEBPACK_IMPORTED_MODULE_10__.binarySearch(stream.sampleIndexes, (item) => {
                        if (item.pts > timestamp) {
                            return -1;
                        }
                        return 1;
                    });
                    if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_MILLI_TIME_BASE_Q) < BigInt(5000)) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__15, 296);
                        await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                        this.currentPts = timestamp;
                        return now;
                    }
                }
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__15, 303);
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
                            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_8__.avRescaleQ)(BigInt(Math.floor((numberOfRawDataBlocksInFrame + 1) * 1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q, stream.timeBase);
                            pts += duration;
                            await formatContext.ioReader.skip(aacFrameLength);
                        }
                        catch (error) {
                            return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
                        }
                    }
                }
                else {
                    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
                }
            }
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
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