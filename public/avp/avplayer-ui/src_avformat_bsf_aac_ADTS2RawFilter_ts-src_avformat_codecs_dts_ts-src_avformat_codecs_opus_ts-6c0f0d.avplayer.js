"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_bsf_aac_ADTS2RawFilter_ts-src_avformat_codecs_dts_ts-src_avformat_codecs_opus_ts-6c0f0d"],{

/***/ "./src/avformat/bsf/aac/ADTS2RawFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/ADTS2RawFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ADTS2RawFilter)
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
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\aac\\ADTS2RawFilter.ts";















class ADTS2RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_4__["default"] {
    streamMuxConfig;
    caches;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        this.streamMuxConfig = {
            profile: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            sampleRate: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            channels: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE
        };
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        while (i < buffer.length) {
            const info = _codecs_aac__WEBPACK_IMPORTED_MODULE_9__.parseADTSHeader(buffer.subarray(i));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_13__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('AACADTSParser parse failed', cheap__fileName__4, 81);
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            const item = {
                dts: lastDts,
                buffer: null,
                extradata: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            };
            item.buffer = buffer.subarray(i + info.headerLength, i + info.headerLength + info.framePayloadLength);
            this.streamMuxConfig.profile = info.profile;
            this.streamMuxConfig.sampleRate = info.sampleRate;
            this.streamMuxConfig.channels = info.channels;
            const hasNewExtraData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) !== this.streamMuxConfig.profile
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136) !== this.streamMuxConfig.sampleRate
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) !== this.streamMuxConfig.channels;
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_10__.avRescaleQ)(BigInt(Math.floor((info.numberOfRawDataBlocksInFrame + 1) * 1024 / this.streamMuxConfig.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            if (hasNewExtraData) {
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
            i += info.aacFrameLength;
            lastDts += duration;
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
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
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
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/dts.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/dts.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DTS_PCMBLOCK_SAMPLES: () => (/* binding */ DTS_PCMBLOCK_SAMPLES),
/* harmony export */   parseHeader: () => (/* binding */ parseHeader)
/* harmony export */ });
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_math_align__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/math/align */ "./src/common/math/align.ts");
/*
 * libmedia dts util
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


const DTSChannelTab = [1, 2, 2, 2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 7, 8, 8];
const DTSSampleRateTab = [0, 8000, 16000, 32000, 0, 0, 11025, 22050, 44100, 0, 0, 12000, 24000, 48000, 96000, 192000];
const DTSBitrateTab = [32000, 56000, 64000, 96000, 112000, 128000, 192000, 224000, 256000, 320000, 384000, 448000,
    512000, 576000, 640000, 768000, 960000, 1024000, 1152000, 1280000, 1344000, 1408000, 1411200, 1472000, 1536000,
    1920000, 2048000, 3072000, 3840000, 0, 0, 0
];
const DTS_PCMBLOCK_SAMPLES = 32;
function parseHeader(buf) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__["default"](buf.length);
    bitReader.appendBuffer(buf);
    const info = {
        syncWord: 0,
        frameType: 0,
        deficitSamples: 0,
        crcFlag: 0,
        sampleBlock: 0,
        frameSize: 0,
        channelIndex: 0,
        sampleRateIndex: 0,
        bitrateIndex: 0,
        channels: 0,
        sampleRate: 0,
        bitrate: 0
    };
    info.syncWord = bitReader.readU(32);
    if (info.syncWord !== 0x7ffe8001 && info.syncWord !== 0xfe7f0180) {
        return -1;
    }
    info.frameType = bitReader.readU1();
    info.deficitSamples = bitReader.readU(5) + 1;
    info.crcFlag = bitReader.readU1();
    info.sampleBlock = bitReader.readU(7) + 1;
    info.frameSize = (0,common_math_align__WEBPACK_IMPORTED_MODULE_1__["default"])(bitReader.readU(14) + 1, 4);
    info.channelIndex = bitReader.readU(6);
    info.sampleRateIndex = bitReader.readU(4);
    info.bitrateIndex = bitReader.readU(5);
    info.channels = DTSChannelTab[info.channelIndex];
    info.sampleRate = DTSSampleRateTab[info.sampleRateIndex];
    info.bitrate = DTSBitrateTab[info.bitrateIndex];
    return info;
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

/***/ "./src/avformat/formats/mpegts/function/parsePES.ts":
/*!**********************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parsePES.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parsePES)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mpegts\\function\\parsePES.ts";



function parsePES(pes) {
    const data = pes.data;
    const streamId = data[3];
    const pesPacketLength = (data[4] << 8) | data[5];
    let headerSize = 0;
    let offset = 0;
    let flags = 0;
    if (streamId !== 188 /* TSStreamId.PROGRAM_STREAM_MAP */
        && streamId !== 190 /* TSStreamId.PADDING_STREAM */
        && streamId !== 191 /* TSStreamId.PRIVATE_STREAM_2 */
        && streamId !== 240 /* TSStreamId.ECM_STREAM */
        && streamId !== 241 /* TSStreamId.EMM_STREAM */
        && streamId !== 255 /* TSStreamId.PROGRAM_STREAM_DIRECTORY */
        && streamId !== 242 /* TSStreamId.DSMCC_STREAM */
        && streamId !== 248 /* TSStreamId.TYPE_E_STREAM */) {
        let pts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
        let dts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
        while (true) {
            if (6 + offset >= data.length) {
                return;
            }
            flags = data[6 + offset];
            if (flags !== 0xff) {
                break;
            }
            offset++;
        }
        if ((flags & 0xc0) === 0x40) {
            offset += 2;
            flags = data[6 + offset];
        }
        if ((flags & 0xe0) == 0x20) {
            headerSize += 5;
            pts = pts = BigInt(Math.floor((data[6 + offset] & 0x0E) * 536870912
                + (data[7 + offset] & 0xFF) * 4194304
                + (data[8 + offset] & 0xFE) * 16384
                + (data[9 + offset] & 0xFF) * 128
                + (data[10 + offset] & 0xFE) / 2));
            if (flags & 0x10) {
                dts = BigInt(Math.floor((data[11 + offset] & 0x0E) * 536870912
                    + (data[12 + offset] & 0xFF) * 4194304
                    + (data[13 + offset] & 0xFE) * 16384
                    + (data[14 + offset] & 0xFF) * 128
                    + (data[15 + offset] & 0xFE) / 2));
                headerSize += 5;
            }
            else {
                dts = pts;
            }
        }
        else if ((flags & 0xc0) == 0x80) {
            // const pesScramblingControl = (data[6] & 0x30) >>> 4
            const ptsDtsFlags = (data[7 + offset] & 0xC0) >>> 6;
            headerSize = 3 + data[8 + offset];
            if (ptsDtsFlags === 0x02 || ptsDtsFlags === 0x03) {
                pts = BigInt(Math.floor((data[9 + offset] & 0x0E) * 536870912
                    + (data[10 + offset] & 0xFF) * 4194304
                    + (data[11 + offset] & 0xFE) * 16384
                    + (data[12 + offset] & 0xFF) * 128
                    + (data[13 + offset] & 0xFE) / 2));
                if (ptsDtsFlags === 0x03) {
                    dts = BigInt(Math.floor((data[14 + offset] & 0x0E) * 536870912
                        + (data[15 + offset] & 0xFF) * 4194304
                        + (data[16 + offset] & 0xFE) * 16384
                        + (data[17 + offset] & 0xFF) * 128
                        + (data[18 + offset] & 0xFE) / 2));
                }
                else {
                    dts = pts;
                }
            }
        }
        else if (flags === 0xf) {
            headerSize = 1;
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('invalid data', cheap__fileName__0, 121);
            return avutil_error__WEBPACK_IMPORTED_MODULE_2__.DATA_INVALID;
        }
        pes.dts = dts;
        pes.pts = pts;
        const payloadStartIndex = 6 + offset + headerSize;
        let payloadLength = 0;
        if (pesPacketLength !== 0) {
            if (pesPacketLength < offset + headerSize) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('Malformed PES: PES_packet_length < 3 + PES_header_data_length', cheap__fileName__0, 133);
                return;
            }
            payloadLength = pesPacketLength - (offset + headerSize);
        }
        else {
            // PES_packet_length === 0
            payloadLength = data.byteLength - payloadStartIndex;
        }
        pes.payload = data.subarray(payloadStartIndex, payloadStartIndex + payloadLength);
    }
    else if (streamId === 188 /* TSStreamId.PROGRAM_STREAM_MAP */
        || streamId === 191 /* TSStreamId.PRIVATE_STREAM_2 */
        || streamId === 240 /* TSStreamId.ECM_STREAM */
        || streamId === 241 /* TSStreamId.EMM_STREAM */
        || streamId === 255 /* TSStreamId.PROGRAM_STREAM_DIRECTORY */
        || streamId === 242 /* TSStreamId.DSMCC_STREAM */
        || streamId === 248 /* TSStreamId.TYPE_E_STREAM */) {
        if (pes.streamId === 6 /* TSStreamType.PRIVATE_DATA */) {
            const payloadStartIndex = 6;
            let payloadLength = 0;
            if (pesPacketLength !== 0) {
                payloadLength = pesPacketLength;
            }
            else {
                // PES_packet_length === 0
                payloadLength = data.byteLength - payloadStartIndex;
            }
            pes.payload = data.subarray(payloadStartIndex, payloadStartIndex + payloadLength);
        }
    }
    return 0;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/struct.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/struct.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESDescriptor: () => (/* binding */ ESDescriptor),
/* harmony export */   PAT: () => (/* binding */ PAT),
/* harmony export */   PES: () => (/* binding */ PES),
/* harmony export */   PMT: () => (/* binding */ PMT),
/* harmony export */   TSPacket: () => (/* binding */ TSPacket),
/* harmony export */   TSSliceQueue: () => (/* binding */ TSSliceQueue)
/* harmony export */ });
/* unused harmony exports TSPacketAdaptationFieldInfo, SectionPacket */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mpegts struct defined
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

class TSPacketAdaptationFieldInfo {
    discontinuityIndicator = 0;
    randomAccessIndicator = 0;
    elementaryStreamPriorityIndicator = 0;
    pcrFlag = 0;
    opcrFlag = 0;
    splicingPointFlag = 0;
    transportPrivateDataFlag = 0;
    adaptationFieldExtensionFlag = 0;
    pcr = BigInt(0);
    opcr = BigInt(0);
    spliceCountDown = 0;
    transportPrivateData = null;
    extension = null;
}
class TSPacket {
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    payloadUnitStartIndicator = 0;
    transportPriority = 0;
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    adaptationFieldControl = 0;
    continuityCounter = 0;
    transportScramblingControl = 0;
    adaptationFieldInfo = new TSPacketAdaptationFieldInfo();
    payload = null;
}
class TSSliceQueue {
    slices = [];
    totalLength = 0;
    expectedLength = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    randomAccessIndicator = 0;
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    streamType = 0 /* TSStreamType.NONE */;
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
}
class PAT {
    versionNumber = 0;
    networkPid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    program2PmtPid = new Map();
}
class SectionPacket extends TSPacket {
}
class ESDescriptor {
    tag;
    buffer;
}
class PMT {
    versionNumber = 0;
    programNumber = 0;
    pcrPid = 0;
    pid2StreamType = new Map();
    pid2ESDescriptor = new Map();
}
class PES {
    pid = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    streamType = 0 /* TSStreamType.NONE */;
    streamId = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    dts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    pts = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    pos = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
    payload = null;
    data = null;
    randomAccessIndicator = 0;
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
        bytes += st.codecpar.bitrate * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(duration, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q) / BigInt(8000);
    });
    return bytes;
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
    // 最大到结尾往前 10 秒
    const max = fileSize - (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(10000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
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
            // 失败了重新 seek 回原来的位置
            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
            break;
        }
    }
    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(avpacket);
    if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`finally seek to pos ${pos}`, cheap__fileName__0, 126);
        await context.ioReader.seek(pos);
        await syncAVPacket(context);
        return now;
    }
    else {
        await context.ioReader.seek(now);
    }
    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.FORMAT_NOT_SUPPORT);
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_bsf_aac_ADTS2RawFilter_ts-src_avformat_codecs_dts_ts-src_avformat_codecs_opus_ts-6c0f0d.avplayer.js.map