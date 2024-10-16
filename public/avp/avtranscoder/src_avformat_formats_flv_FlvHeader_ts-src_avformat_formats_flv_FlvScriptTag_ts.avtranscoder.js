"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_flv_FlvHeader_ts-src_avformat_formats_flv_FlvScriptTag_ts"],{

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
/* harmony export */   FlvCodecHeaderLength: () => (/* binding */ FlvCodecHeaderLength),
/* harmony export */   FlvVideoCodecType2AVCodecID: () => (/* binding */ FlvVideoCodecType2AVCodecID)
/* harmony export */ });
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
/* harmony export */   writeAudioTagDataHeader: () => (/* binding */ writeAudioTagDataHeader),
/* harmony export */   writeTagHeader: () => (/* binding */ writeTagHeader),
/* harmony export */   writeVideoTagDataHeader: () => (/* binding */ writeVideoTagDataHeader),
/* harmony export */   writeVideoTagExtDataHeader: () => (/* binding */ writeVideoTagExtDataHeader)
/* harmony export */ });
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_flv_FlvHeader_ts-src_avformat_formats_flv_FlvScriptTag_ts.avtranscoder.js.map