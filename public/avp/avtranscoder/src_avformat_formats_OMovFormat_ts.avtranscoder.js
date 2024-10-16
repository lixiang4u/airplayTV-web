"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OMovFormat_ts"],{

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

/***/ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/bsf/h2645/Annexb2AvccFilter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Annexb2AvccFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__6 = "src\\avformat\\bsf\\h2645\\Annexb2AvccFilter.ts";












class Annexb2AvccFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    cache;
    cached;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.createAVPacket)();
        this.cached = false;
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    sendAVPacket(avpacket) {
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 1 /* h264.BitFormat.AVCC */ || !(0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_9__.isAnnexb)(buffer)) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(this.cache, avpacket);
        }
        else {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
            let convert;
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                convert = _codecs_h264__WEBPACK_IMPORTED_MODULE_4__.annexb2Avcc(buffer);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                convert = _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__.annexb2Avcc(buffer);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                convert = _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__.annexb2Avcc(buffer);
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_11__.fatal(`not support for codecId: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4)}`, cheap__fileName__6, 91);
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 80, 1 /* h264.BitFormat.AVCC */);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, convert.bufferPointer, convert.length);
            if (convert.key) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.cache + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            }
            if (convert.extradata) {
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(convert.extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradata, convert.extradata.length, convert.extradata);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketSideData)(this.cache, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, convert.extradata.length);
            }
        }
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
        }
    }
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
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
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
function parseHeader(buf, size) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](size);
    bitReader.appendBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(buf, size));
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
        bitRate: 0,
        channels: 0,
        frameSize: 0,
        channelLayout: BigInt(0),
        ac3BitrateCode: 0
    };
    info.syncWord = bitReader.readU(16);
    if (info.syncWord !== 0x0B77) {
        return -1;
    }
    info.bitstreamId = bitReader.readU(29) & 0x1f;
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
        info.bitRate = (AC3BitrateTab[info.ac3BitrateCode] * 1000) >> info.srShift;
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
        info.bitRate = 8 * info.frameSize * info.sampleRate / (info.numBlocks * 256);
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
    }
    info.channelLayout = BigInt.asUintN(64, AC3ChannelLayout[info.channelMode]);
    if (info.lfeOn) {
        info.channelLayout |= BigInt(8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */);
    }
    return info;
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

/***/ "./src/avformat/formats/OMovFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OMovFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMovFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _mov_function_createMovContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mov/function/createMovContext */ "./src/avformat/formats/mov/function/createMovContext.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _mov_omov__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mov/omov */ "./src/avformat/formats/mov/omov.ts");
/* harmony import */ var _mov_function_createMovStreamContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mov/function/createMovStreamContext */ "./src/avformat/formats/mov/function/createMovStreamContext.ts");
/* harmony import */ var _mov_function_createFragmentTrack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mov/function/createFragmentTrack */ "./src/avformat/formats/mov/function/createFragmentTrack.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _mov_function_updatePositionSize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mov/function/updatePositionSize */ "./src/avformat/formats/mov/function/updatePositionSize.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _function_rewriteIO__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../function/rewriteIO */ "./src/avformat/function/rewriteIO.ts");
/* harmony import */ var _function_arrayItemSame__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../function/arrayItemSame */ "./src/avformat/function/arrayItemSame.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../bsf/h2645/Annexb2AvccFilter */ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
var cheap__fileName__2 = "src\\avformat\\formats\\OMovFormat.ts";




/*
 * libmedia mov encoder
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




















const defaultOptions = {
    fragmentMode: 0 /* FragmentMode.GOP */,
    movMode: 0 /* MovMode.MP4 */,
    fragment: false,
    fastOpen: false,
    defaultBaseIsMoof: false
};
class OMovFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 1 /* AVFormat.MOV */;
    context;
    options;
    annexb2AvccFilter;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_16__.extend({}, defaultOptions, options);
        this.context = (0,_mov_function_createMovContext__WEBPACK_IMPORTED_MODULE_5__["default"])();
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(true);
        const videoStream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        if (videoStream) {
            this.annexb2AvccFilter = new _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_21__["default"]();
            this.annexb2AvccFilter.init(videoStream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], videoStream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
        }
        return 0;
    }
    destroy(formatContext) {
        super.destroy(formatContext);
        if (this.annexb2AvccFilter) {
            this.annexb2AvccFilter.destroy();
            this.annexb2AvccFilter = null;
        }
    }
    /*
     * stream.disposition controls the "enabled" flag in the tkhd tag.
     * QuickTime will not play a track if it is not enabled.  So make sure
     * that one track of each type (audio, video, subtitle) is enabled.
     *
     * Subtitles are special.  For audio and video, setting "enabled" also
     * makes the track "default" (i.e. it is rendered when played). For
     * subtitles, an "enabled" subtitle is not rendered by default, but
     * if no subtitle is enabled, the subtitle menu in QuickTime will be
     * empty!
     */
    enableStreams(formatContext) {
        const enabled = [];
        const first = [];
        for (let i = 0; i < 5 /* AVMediaType.AVMEDIA_TYPE_NB */; i++) {
            enabled[i] = 0;
            first[i] = -1;
        }
        common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(formatContext.streams, (stream, index) => {
            if (stream.codecpar.codecType === -1 /* AVMediaType.AVMEDIA_TYPE_UNKNOWN */
                || stream.codecpar.codecType >= 5 /* AVMediaType.AVMEDIA_TYPE_NB */) {
                return true;
            }
            if (first[stream.codecpar.codecType] < 0) {
                first[stream.codecpar.codecType] = index;
            }
            if (stream.disposition & 1 /* AVDisposition.DEFAULT */) {
                enabled[stream.codecpar.codecType]++;
                stream.privData.flags |= 1 /* TKHDFlags.ENABLED */;
            }
        });
        for (let i = 0; i < 5 /* AVMediaType.AVMEDIA_TYPE_NB */; i++) {
            switch (i) {
                case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */:
                case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */:
                case 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */:
                    if (enabled[i] > 1) {
                        formatContext.streams[enabled[i]].privData.perStreamGrouping = true;
                    }
                    if (!enabled[i] && first[i] >= 0) {
                        formatContext.streams[first[i]].privData.flags |= 1 /* TKHDFlags.ENABLED */;
                    }
                    break;
            }
        }
    }
    writeHeader(formatContext) {
        this.context.majorBrand = (0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('isom');
        this.context.minorVersion = 512;
        this.context.compatibleBrand = [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('isom')];
        this.context.timescale = 1000;
        if (this.options.fragment) {
            this.context.compatibleBrand.push((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('iso6'));
            this.context.fragment = true;
        }
        if (this.options.movMode === 1 /* MovMode.MOV */) {
            this.context.isom = true;
            this.context.majorBrand = (0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('qt  ');
            this.context.compatibleBrand = [this.context.majorBrand];
        }
        if (this.options.movMode !== 1 /* MovMode.MOV */) {
            this.context.compatibleBrand.push((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('iso2'));
            const videoStream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
            if (videoStream && videoStream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                this.context.compatibleBrand.push((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('avc1'));
            }
            this.context.compatibleBrand.push((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])('mp41'));
        }
        _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeFtyp(formatContext.ioWriter, this.context);
        this.context.holdMoovPos = formatContext.ioWriter.getPos();
        if (this.options.fragment) {
            this.context.currentFragment = {
                pos: BigInt(0),
                currentTrack: null,
                sequence: 1,
                tracks: [],
                size: 0,
                firstWrote: false
            };
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(formatContext.streams, (stream, index) => {
                const streamContext = (0,_mov_function_createMovStreamContext__WEBPACK_IMPORTED_MODULE_8__["default"])();
                stream.privData = streamContext;
                streamContext.chunkOffsets = [];
                streamContext.cttsSampleCounts = [];
                streamContext.cttsSampleOffsets = [];
                streamContext.stscFirstChunk = [];
                streamContext.stscSamplesPerChunk = [];
                streamContext.stscSampleDescriptionIndex = [];
                streamContext.stssSampleNumbers = [];
                streamContext.sampleSizes = [];
                streamContext.sttsSampleCounts = [];
                streamContext.sttsSampleDeltas = [];
                streamContext.alternateGroup = index;
                const track = (0,_mov_function_createFragmentTrack__WEBPACK_IMPORTED_MODULE_9__["default"])();
                track.baseIsMoof = this.options.defaultBaseIsMoof;
                track.streamIndex = stream.index;
                track.trackId = this.context.nextTrackId++;
                streamContext.trackId = track.trackId;
                track.ioWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_10__["default"]();
                track.ioWriter.onFlush = (data) => {
                    track.buffers.push(data.slice());
                    return 0;
                };
                this.context.currentFragment.tracks.push(track);
            });
            this.enableStreams(formatContext);
            _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeMoov(formatContext.ioWriter, formatContext, this.context);
            formatContext.ioWriter.flush();
        }
        else {
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(formatContext.streams, (stream, index) => {
                const streamContext = (0,_mov_function_createMovStreamContext__WEBPACK_IMPORTED_MODULE_8__["default"])();
                stream.privData = streamContext;
                streamContext.trackId = this.context.nextTrackId++;
                streamContext.chunkOffsets = [];
                streamContext.cttsSampleCounts = [];
                streamContext.cttsSampleOffsets = [];
                streamContext.stscFirstChunk = [];
                streamContext.stscSamplesPerChunk = [];
                streamContext.stscSampleDescriptionIndex = [];
                streamContext.stssSampleNumbers = [];
                streamContext.sampleSizes = [];
                streamContext.sttsSampleCounts = [];
                streamContext.sttsSampleDeltas = [];
                streamContext.alternateGroup = index;
            });
            this.enableStreams(formatContext);
            const pos = formatContext.ioWriter.getPos();
            formatContext.ioWriter.writeUint32(0);
            formatContext.ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])("mdat" /* BoxType.MDAT */));
            this.context.boxsPositionInfo.push({
                pos,
                type: "mdat" /* BoxType.MDAT */,
                size: 0
            });
        }
        return 0;
    }
    updateCurrentChunk(formatContext) {
        let currentChunk = this.context.currentChunk;
        if (!currentChunk.sampleCount) {
            return;
        }
        const prevStream = formatContext.streams.find((stream) => {
            return stream.index === currentChunk.streamIndex;
        });
        const prevMovStreamContext = prevStream.privData;
        prevMovStreamContext.chunkCount++;
        prevMovStreamContext.chunkOffsets.push(currentChunk.pos);
        if (!prevMovStreamContext.stscFirstChunk.length) {
            prevMovStreamContext.stscFirstChunk.push(prevMovStreamContext.chunkCount);
            prevMovStreamContext.stscSamplesPerChunk.push(currentChunk.sampleCount);
            prevMovStreamContext.stscSampleDescriptionIndex.push(1);
            prevMovStreamContext.lastStscCount = currentChunk.sampleCount;
        }
        else {
            if (prevMovStreamContext.lastStscCount !== currentChunk.sampleCount) {
                prevMovStreamContext.stscFirstChunk.push(prevMovStreamContext.chunkCount);
                prevMovStreamContext.stscSamplesPerChunk.push(currentChunk.sampleCount);
                prevMovStreamContext.stscSampleDescriptionIndex.push(1);
                prevMovStreamContext.lastStscCount = currentChunk.sampleCount;
            }
        }
    }
    checkMdat(formatContext, len) {
        const mdat = this.context.boxsPositionInfo[this.context.boxsPositionInfo.length - 1];
        if (mdat.type !== "mdat" /* BoxType.MDAT */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_12__.error('last box is not mdat', cheap__fileName__2, 301);
            return;
        }
        const pos = formatContext.ioWriter.getPos();
        const size = Number(pos - mdat.pos);
        if (size + len > avutil_constant__WEBPACK_IMPORTED_MODULE_15__.UINT32_MAX) {
            mdat.size = size;
            formatContext.ioWriter.writeUint32(0);
            formatContext.ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])("mdat" /* BoxType.MDAT */));
            this.context.boxsPositionInfo.push({
                pos,
                type: "mdat" /* BoxType.MDAT */,
                size: 0
            });
        }
    }
    updateCurrentFragment(formatContext, currentDts) {
        if (this.context.currentFragment.firstWrote) {
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(this.context.currentFragment.tracks, (track) => {
                const stream = formatContext.streams.find((stream) => {
                    return stream.index === track.streamIndex;
                });
                if (!track.sampleCount || !stream) {
                    return true;
                }
                const streamContext = stream.privData;
                track.baseDataOffset = formatContext.ioWriter.getPos();
                if (!track.sampleDurations.length) {
                    if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                        if (currentDts) {
                            track.sampleDurations.push(Number(currentDts - streamContext.lastDts));
                        }
                        else if (stream.codecpar.frameSize > 0) {
                            track.sampleDurations.push(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(BigInt(stream.codecpar.frameSize / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q, stream.timeBase)));
                        }
                        else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                            track.sampleDurations.push(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(BigInt(1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q, stream.timeBase)));
                        }
                        else {
                            // 随便猜一个？每帧一个 fragment 没有 sampleDuration QuickTime 无法播放
                            track.sampleDurations.push(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(BigInt(1024 / stream.codecpar.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q, stream.timeBase)));
                        }
                    }
                    else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                        if (currentDts) {
                            track.sampleDurations.push(Number(currentDts - streamContext.lastDts));
                        }
                        else if ((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avQ2D)(stream.codecpar.framerate) > 0) {
                            track.sampleDurations.push(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(BigInt(Math.floor(1 / (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avQ2D)(stream.codecpar.framerate) * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q, stream.timeBase)));
                        }
                        else {
                            // 随便猜一个？每帧一个 fragment 没有 sampleDuration QuickTime 无法播放
                            // 取帧率 30
                            track.sampleDurations.push((stream.timeBase.den / (30 * stream.timeBase.num)) >>> 0);
                        }
                    }
                    else {
                        track.sampleDurations.push(0);
                    }
                }
                else if (currentDts && track.sampleDurations.length === track.sampleSizes.length - 1) {
                    track.sampleDurations.push(Number(currentDts - streamContext.lastDts));
                }
                streamContext.lastDuration = track.sampleDurations[track.sampleSizes.length - 1];
                if (track.sampleFlags.length === 1 || (0,_function_arrayItemSame__WEBPACK_IMPORTED_MODULE_18__["default"])(track.sampleFlags, 1)) {
                    track.firstSampleFlags = track.sampleFlags[0];
                    track.defaultSampleFlags = track.sampleFlags[1] ?? track.firstSampleFlags;
                    track.sampleFlags = [];
                }
                if (track.sampleSizes.length === 1 || (0,_function_arrayItemSame__WEBPACK_IMPORTED_MODULE_18__["default"])(track.sampleSizes)) {
                    track.defaultSampleSize = track.sampleSizes[0];
                    track.sampleSizes = [];
                }
                if (track.sampleDurations.length === 1 || (0,_function_arrayItemSame__WEBPACK_IMPORTED_MODULE_18__["default"])(track.sampleDurations)) {
                    track.defaultSampleDuration = track.sampleDurations[0];
                    track.sampleDurations = [];
                }
                if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                    track.defaultSampleFlags = 33554432 /* SampleFlags.DEPENDS_NO */;
                }
                else if (track.sampleFlags.length) {
                    track.defaultSampleFlags = track.sampleFlags[0];
                }
                if (track.sampleSizes.length) {
                    track.defaultSampleSize = track.sampleSizes[0];
                }
                if (track.sampleDurations.length) {
                    track.defaultSampleDuration = track.sampleDurations[0];
                }
            });
            formatContext.ioWriter.flush();
            _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeMoof(formatContext.ioWriter, formatContext, this.context);
            let dataOffset = this.context.currentFragment.size + 8;
            const buffers = [];
            let mdatSize = 8;
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(this.context.currentFragment.tracks, (track) => {
                if (!track.sampleCount) {
                    return true;
                }
                track.ioWriter.flush();
                const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_13__["default"])(Uint8Array, track.buffers);
                track.dataOffset = dataOffset;
                dataOffset += buffer.length;
                mdatSize += buffer.length;
                buffers.push(buffer);
                (0,_function_rewriteIO__WEBPACK_IMPORTED_MODULE_17__["default"])(formatContext.ioWriter, track.dataOffsetPos, track.dataOffset, 'int32');
                track.buffers = [];
                track.sampleFlags = [];
                track.sampleSizes = [];
                track.sampleDurations = [];
                track.sampleCompositionTimeOffset = [];
                track.sampleCount = 0;
                track.firstSampleFlags = 0;
            });
            formatContext.ioWriter.writeUint32(mdatSize);
            formatContext.ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_6__["default"])("mdat" /* BoxType.MDAT */));
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(buffers, (buffer) => {
                formatContext.ioWriter.writeBuffer(buffer);
            });
            (0,_mov_function_updatePositionSize__WEBPACK_IMPORTED_MODULE_14__["default"])(formatContext.ioWriter, this.context);
            formatContext.ioWriter.flush();
            this.context.currentFragment.firstWrote = false;
            this.context.currentFragment.sequence++;
        }
    }
    handleEAC3(avpacket, stream) {
        if (!this.context.ac3Info) {
            this.context.ac3Info = {
                done: false,
                numBlocks: 0,
                dataRate: 0,
                ac3BitrateCode: -1,
                numIndSub: 0,
                substream: []
            };
        }
        const ac3Info = this.context.ac3Info;
        const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_23__.parseHeader(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
        if (common_util_is__WEBPACK_IMPORTED_MODULE_22__.number(info)) {
            ac3Info.done = true;
            return;
        }
        ac3Info.dataRate = Math.max(ac3Info.dataRate, info.bitRate / 1000);
        ac3Info.ac3BitrateCode = Math.max(ac3Info.ac3BitrateCode, info.ac3BitrateCode);
        if (!ac3Info.done) {
            if (info.bitstreamId <= 10 && info.substreamId != 0) {
                return;
            }
            if (info.frameType === 0 /* ac3.EAC3FrameType.EAC3_FRAME_TYPE_INDEPENDENT */
                || info.frameType == 2 /* ac3.EAC3FrameType.EAC3_FRAME_TYPE_AC3_CONVERT */) {
                /* substream ids must be incremental */
                if (info.substreamId > ac3Info.numIndSub + 1) {
                    return;
                }
                if (info.substreamId == ac3Info.numIndSub + 1) {
                    return;
                }
                else if (info.substreamId < ac3Info.numIndSub ||
                    info.substreamId == 0 && ac3Info.substream[0]?.bsid) {
                    ac3Info.done = true;
                    return;
                }
            }
            else {
                if (info.substreamId != 0) {
                    return;
                }
            }
            if (!ac3Info.substream[info.substreamId]) {
                ac3Info.substream[info.substreamId] = {
                    fscod: 0,
                    bsid: 0,
                    bsmod: 0,
                    acmod: 0,
                    lfeon: 0,
                    numDepSub: 0,
                    chanLoc: 0
                };
            }
            ac3Info.substream[info.substreamId].fscod = info.srCode;
            ac3Info.substream[info.substreamId].bsid = info.bitstreamId;
            ac3Info.substream[info.substreamId].bsmod = info.bitstreamMode;
            ac3Info.substream[info.substreamId].acmod = info.channelMode;
            ac3Info.substream[info.substreamId].lfeon = info.lfeOn;
            if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
                ac3Info.done = true;
                return;
            }
        }
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_12__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__2, 542);
            return 0;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_12__.warn(`can not found the stream width the avpacket\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__2, 549);
            return;
        }
        const streamContext = stream.privData;
        const dts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) < BigInt(0) ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) : cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
        if ((stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
            || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
            || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)
            && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 80) === 2 /* BitFormat.ANNEXB */) {
            this.annexb2AvccFilter.sendAVPacket(avpacket);
            this.annexb2AvccFilter.receiveAVPacket(avpacket);
        }
        else if ((stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
            || stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */)
            && (!this.context.ac3Info || !this.context.ac3Info.done)) {
            this.handleEAC3(avpacket, stream);
        }
        if (this.context.fragment) {
            const track = this.context.currentFragment.tracks.find((track) => {
                return track.streamIndex === cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32);
            });
            if (track) {
                if (this.options.fragmentMode === 0 /* FragmentMode.GOP */
                    && stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                    && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */
                    || this.options.fragmentMode === 1 /* FragmentMode.FRAME */) {
                    if (this.context.currentFragment.tracks.length === 1) {
                        this.updateCurrentFragment(formatContext, dts);
                    }
                    else {
                        this.updateCurrentFragment(formatContext);
                    }
                }
                track.ioWriter.writeBuffer((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_20__.getAVPacketData)(avpacket));
                if (!track.sampleSizes.length) {
                    track.baseMediaDecodeTime = dts;
                }
                if (track.sampleSizes.length
                    && (!track.sampleDurations[track.sampleSizes.length - 1]
                        || track.sampleDurations[track.sampleSizes.length - 1] <= 0)) {
                    track.sampleDurations[track.sampleSizes.length - 1] = Number(dts - streamContext.lastDts);
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48) > 0) {
                    track.sampleDurations.push(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase)));
                }
                track.sampleSizes.push(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
                if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                    let flag = 0;
                    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                        flag |= 33554432 /* SampleFlags.DEPENDS_NO */;
                    }
                    else {
                        flag |= (16777216 /* SampleFlags.DEPENDS_YES */ | 65536 /* SampleFlags.IS_NON_SYN */);
                    }
                    track.sampleCompositionTimeOffset.push(Number((pts || dts) - dts));
                    track.sampleFlags.push(flag);
                }
                track.sampleCount++;
                streamContext.lastPts = pts > streamContext.lastPts ? pts : streamContext.lastPts;
                streamContext.lastDts = dts;
                this.context.currentFragment.firstWrote = true;
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_12__.warn(`can not found track width streamIndex ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__2, 635);
            }
        }
        else {
            this.checkMdat(formatContext, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
            const pos = formatContext.ioWriter.getPos();
            let currentChunk = this.context.currentChunk;
            if (!currentChunk) {
                currentChunk = this.context.currentChunk = {
                    pos,
                    streamIndex: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32),
                    sampleCount: 1
                };
            }
            else if (currentChunk.streamIndex !== cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)) {
                this.updateCurrentChunk(formatContext);
                currentChunk.streamIndex = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32);
                currentChunk.sampleCount = 1;
                currentChunk.pos = pos;
            }
            else {
                currentChunk.sampleCount++;
            }
            formatContext.ioWriter.writeBuffer((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_20__.getAVPacketData)(avpacket));
            streamContext.sampleSizes.push(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
            if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                streamContext.stssSampleNumbers.push(streamContext.sampleSizes.length);
            }
            if (!streamContext.firstWrote) {
                streamContext.startDts = dts;
                streamContext.startCT = Number((pts || dts) - dts);
                streamContext.firstWrote = true;
            }
            else {
                const deltas = Number(dts - streamContext.lastDts);
                if (!streamContext.sttsSampleCounts.length) {
                    streamContext.sttsSampleCounts.push(1);
                    streamContext.sttsSampleDeltas.push(deltas);
                }
                else {
                    if (streamContext.sttsSampleDeltas[streamContext.sttsSampleDeltas.length - 1] === deltas) {
                        streamContext.sttsSampleCounts[streamContext.sttsSampleCounts.length - 1]++;
                    }
                    else {
                        streamContext.sttsSampleCounts.push(1);
                        streamContext.sttsSampleDeltas.push(deltas);
                    }
                }
            }
            if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                const ctts = Number((pts || dts) - dts);
                if (!streamContext.cttsSampleCounts.length) {
                    streamContext.cttsSampleCounts.push(1);
                    streamContext.cttsSampleOffsets.push(ctts);
                }
                else {
                    if (streamContext.cttsSampleOffsets[streamContext.cttsSampleOffsets.length - 1]
                        === ctts) {
                        streamContext.cttsSampleCounts[streamContext.cttsSampleCounts.length - 1]++;
                    }
                    else {
                        streamContext.cttsSampleCounts.push(1);
                        streamContext.cttsSampleOffsets.push(ctts);
                    }
                }
            }
            streamContext.lastPts = (pts || dts) > streamContext.lastPts ? (pts || dts) : streamContext.lastPts;
            streamContext.lastDts = dts;
        }
        return 0;
    }
    writeTrailer(formatContext) {
        if (!this.context.fragment) {
            this.updateCurrentChunk(formatContext);
            let lastPts = BigInt(0);
            let timeBase;
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(formatContext.streams, (stream) => {
                const streamContext = stream.privData;
                if (streamContext.sampleSizes.length) {
                    if (streamContext.sttsSampleDeltas.length) {
                        streamContext.sttsSampleCounts[streamContext.sttsSampleCounts.length - 1]++;
                    }
                    else {
                        streamContext.sttsSampleCounts = [1];
                        streamContext.sttsSampleDeltas = [0];
                    }
                }
                if (streamContext.lastPts > lastPts) {
                    lastPts = streamContext.lastPts;
                    timeBase = stream.timeBase;
                }
            });
            if (lastPts) {
                this.context.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_19__.avRescaleQ)(lastPts, timeBase, { den: 1000, num: 1 });
            }
            const mdat = this.context.boxsPositionInfo[this.context.boxsPositionInfo.length - 1];
            if (mdat.type !== "mdat" /* BoxType.MDAT */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_12__.error('last box is not mdat', cheap__fileName__2, 751);
            }
            mdat.size = Number(formatContext.ioWriter.getPos() - mdat.pos);
            (0,_mov_function_updatePositionSize__WEBPACK_IMPORTED_MODULE_14__["default"])(formatContext.ioWriter, this.context);
            if (this.options.fastOpen) {
                formatContext.ioWriter.flush();
                let buffers = [];
                const rawFlush = formatContext.ioWriter.onFlush;
                formatContext.ioWriter.onFlush = (buffer) => {
                    buffers.push(buffer.slice());
                    return 0;
                };
                _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeMoov(formatContext.ioWriter, formatContext, this.context);
                formatContext.ioWriter.flush();
                let data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_13__["default"])(Uint8Array, buffers);
                common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(formatContext.streams, (stream) => {
                    const streamContext = stream.privData;
                    if (streamContext.chunkOffsets.length) {
                        for (let i = 0; i < streamContext.chunkOffsets.length; i++) {
                            streamContext.chunkOffsets[i] += BigInt(Math.floor(data.length));
                        }
                    }
                });
                buffers = [];
                _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeMoov(formatContext.ioWriter, formatContext, this.context);
                formatContext.ioWriter.flush();
                data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_13__["default"])(Uint8Array, buffers);
                if (rawFlush) {
                    rawFlush(data, this.context.holdMoovPos);
                }
                formatContext.ioWriter.onFlush = rawFlush;
            }
            else {
                _mov_omov__WEBPACK_IMPORTED_MODULE_7__.writeMoov(formatContext.ioWriter, formatContext, this.context);
                formatContext.ioWriter.flush();
            }
        }
        else {
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(this.context.currentFragment.tracks, (track) => {
                const stream = formatContext.streams.find((stream) => {
                    return stream.index === track.streamIndex;
                });
                const streamContext = stream.privData;
                if (track.sampleCount) {
                    if (track.sampleDurations.length) {
                        track.sampleDurations.push(track.sampleDurations[track.sampleDurations.length - 1]);
                    }
                    else {
                        track.sampleDurations = [streamContext.lastDuration];
                    }
                }
            });
            this.updateCurrentFragment(formatContext);
            formatContext.ioWriter.writeUint32(8);
            formatContext.ioWriter.writeString("mfra" /* BoxType.MFRA */);
            formatContext.ioWriter.flush();
        }
        return 0;
    }
    flush(formatContext) {
        if (this.options.fragment) {
            common_util_array__WEBPACK_IMPORTED_MODULE_11__.each(this.context.currentFragment.tracks, (track) => {
                const stream = formatContext.streams.find((stream) => {
                    return stream.index === track.streamIndex;
                });
                const streamContext = stream.privData;
                if (track.sampleCount) {
                    if (track.sampleDurations.length) {
                        track.sampleDurations.push(track.sampleDurations[track.sampleDurations.length - 1]);
                    }
                    else {
                        track.sampleDurations = [streamContext.lastDuration];
                    }
                }
            });
            this.updateCurrentFragment(formatContext);
        }
        formatContext.ioWriter.flush();
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

/***/ "./src/avformat/formats/mov/function/updatePositionSize.ts":
/*!*****************************************************************!*\
  !*** ./src/avformat/formats/mov/function/updatePositionSize.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updatePositionSize)
/* harmony export */ });
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/*
 * libmedia update box position size
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

function updatePositionSize(ioWriter, movContext) {
    const pos = ioWriter.getPos();
    const pointer = ioWriter.getPointer();
    const minPos = pos - BigInt(Math.floor(pointer));
    const seeks = [];
    common_util_array__WEBPACK_IMPORTED_MODULE_0__.each(movContext.boxsPositionInfo, (item) => {
        if (item.pos < pos && item.pos >= minPos) {
            ioWriter.seekInline(pointer + Number(item.pos - pos));
            ioWriter.writeUint32(item.size);
        }
        else {
            seeks.push(item);
        }
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_0__.each(seeks, (item) => {
        ioWriter.seek(item.pos);
        ioWriter.writeUint32(item.size);
    });
    if (seeks.length) {
        ioWriter.seek(pos);
    }
    else {
        ioWriter.seekInline(pointer);
    }
    movContext.boxsPositionInfo = [];
}


/***/ }),

/***/ "./src/avformat/formats/mov/layout.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/mov/layout.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FragmentTrackBoxLayoutMap: () => (/* binding */ FragmentTrackBoxLayoutMap),
/* harmony export */   MoofTrafBoxLayout: () => (/* binding */ MoofTrafBoxLayout),
/* harmony export */   TrackBoxLayoutMap: () => (/* binding */ TrackBoxLayoutMap)
/* harmony export */ });
/*
 * libmedia mp4 box layout
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
function getTrackBoxAudioLayout(context) {
    return [
        {
            type: "tkhd" /* BoxType.TKHD */
        },
        {
            type: "edts" /* BoxType.EDTS */
        },
        {
            type: "mdia" /* BoxType.MDIA */,
            children: [
                {
                    type: "mdhd" /* BoxType.MDHD */
                },
                {
                    type: "hdlr" /* BoxType.HDLR */
                },
                {
                    type: "minf" /* BoxType.MINF */,
                    children: [
                        {
                            type: "smhd" /* BoxType.SMHD */
                        },
                        context.isom
                            ? {
                                type: "minf_hdlr" /* BoxType.MINF_HDLR */
                            }
                            : null,
                        {
                            type: "dinf" /* BoxType.DINF */,
                            children: [
                                {
                                    type: "dref" /* BoxType.DREF */,
                                    children: [
                                        {
                                            type: "url " /* BoxType.URL */
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "stbl" /* BoxType.STBL */,
                            children: [
                                {
                                    type: "stsd" /* BoxType.STSD */
                                },
                                {
                                    type: "stts" /* BoxType.STTS */
                                },
                                {
                                    type: "stsc" /* BoxType.STSC */
                                },
                                {
                                    type: "stsz" /* BoxType.STSZ */
                                },
                                {
                                    type: "stco" /* BoxType.STCO */
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
function getTrackBoxVideoLayout(context) {
    return [
        {
            type: "tkhd" /* BoxType.TKHD */
        },
        {
            type: "edts" /* BoxType.EDTS */
        },
        {
            type: "mdia" /* BoxType.MDIA */,
            children: [
                {
                    type: "mdhd" /* BoxType.MDHD */
                },
                {
                    type: "hdlr" /* BoxType.HDLR */
                },
                {
                    type: "minf" /* BoxType.MINF */,
                    children: [
                        {
                            type: "vmhd" /* BoxType.VMHD */
                        },
                        context.isom
                            ? {
                                type: "minf_hdlr" /* BoxType.MINF_HDLR */
                            }
                            : null,
                        {
                            type: "dinf" /* BoxType.DINF */,
                            children: [
                                {
                                    type: "dref" /* BoxType.DREF */,
                                    children: [
                                        {
                                            type: "url " /* BoxType.URL */
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "stbl" /* BoxType.STBL */,
                            children: [
                                {
                                    type: "stsd" /* BoxType.STSD */
                                },
                                {
                                    type: "stts" /* BoxType.STTS */
                                },
                                {
                                    type: "stss" /* BoxType.STSS */
                                },
                                {
                                    type: "ctts" /* BoxType.CTTS */
                                },
                                {
                                    type: "stsc" /* BoxType.STSC */
                                },
                                {
                                    type: "stsz" /* BoxType.STSZ */
                                },
                                {
                                    type: "stco" /* BoxType.STCO */
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
function getFragmentTrackAudioBoxLayout(context) {
    return [
        {
            type: "tkhd" /* BoxType.TKHD */
        },
        {
            type: "mdia" /* BoxType.MDIA */,
            children: [
                {
                    type: "mdhd" /* BoxType.MDHD */
                },
                {
                    type: "hdlr" /* BoxType.HDLR */
                },
                {
                    type: "minf" /* BoxType.MINF */,
                    children: [
                        {
                            type: "smhd" /* BoxType.SMHD */
                        },
                        context.isom
                            ? {
                                type: "minf_hdlr" /* BoxType.MINF_HDLR */
                            }
                            : null,
                        {
                            type: "dinf" /* BoxType.DINF */,
                            children: [
                                {
                                    type: "dref" /* BoxType.DREF */,
                                    children: [
                                        {
                                            type: "url " /* BoxType.URL */
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "stbl" /* BoxType.STBL */,
                            children: [
                                {
                                    type: "stsd" /* BoxType.STSD */
                                },
                                {
                                    type: "stts" /* BoxType.STTS */
                                },
                                {
                                    type: "stsc" /* BoxType.STSC */
                                },
                                {
                                    type: "stsz" /* BoxType.STSZ */
                                },
                                {
                                    type: "stco" /* BoxType.STCO */
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
function getFragmentTrackVideoBoxLayout(context) {
    return [
        {
            type: "tkhd" /* BoxType.TKHD */
        },
        {
            type: "mdia" /* BoxType.MDIA */,
            children: [
                {
                    type: "mdhd" /* BoxType.MDHD */
                },
                {
                    type: "hdlr" /* BoxType.HDLR */
                },
                {
                    type: "minf" /* BoxType.MINF */,
                    children: [
                        {
                            type: "vmhd" /* BoxType.VMHD */
                        },
                        context.isom
                            ? {
                                type: "minf_hdlr" /* BoxType.MINF_HDLR */
                            }
                            : null,
                        {
                            type: "dinf" /* BoxType.DINF */,
                            children: [
                                {
                                    type: "dref" /* BoxType.DREF */,
                                    children: [
                                        {
                                            type: "url " /* BoxType.URL */
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "stbl" /* BoxType.STBL */,
                            children: [
                                {
                                    type: "stsd" /* BoxType.STSD */
                                },
                                {
                                    type: "stts" /* BoxType.STTS */
                                },
                                {
                                    type: "stsc" /* BoxType.STSC */
                                },
                                {
                                    type: "stsz" /* BoxType.STSZ */
                                },
                                {
                                    type: "stco" /* BoxType.STCO */
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
const FragmentTrackBoxLayoutMap = {
    [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */]: getFragmentTrackAudioBoxLayout,
    [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */]: getFragmentTrackVideoBoxLayout
};
const TrackBoxLayoutMap = {
    [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */]: getTrackBoxAudioLayout,
    [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */]: getTrackBoxVideoLayout
};
const MoofTrafBoxLayout = [
    {
        type: "tfhd" /* BoxType.TFHD */
    },
    {
        type: "tfdt" /* BoxType.TFDT */
    },
    {
        type: "trun" /* BoxType.TRUN */
    }
];


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

/***/ "./src/avformat/formats/mov/omov.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/mov/omov.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeFtyp: () => (/* binding */ writeFtyp),
/* harmony export */   writeMoof: () => (/* binding */ writeMoof),
/* harmony export */   writeMoov: () => (/* binding */ writeMoov)
/* harmony export */ });
/* unused harmony export updateSize */
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var _boxType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boxType */ "./src/avformat/formats/mov/boxType.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _writing_writers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./writing/writers */ "./src/avformat/formats/mov/writing/writers.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout */ "./src/avformat/formats/mov/layout.ts");
/* harmony import */ var _function_updatePositionSize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./function/updatePositionSize */ "./src/avformat/formats/mov/function/updatePositionSize.ts");
/*
 * libmedia mp4 encode util
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






function updateSize(ioWriter, pointer, size) {
    const current = ioWriter.getPointer();
    ioWriter.seekInline(pointer);
    ioWriter.writeUint32(size);
    ioWriter.seekInline(current);
}
function writeFtyp(ioWriter, context) {
    ioWriter.flush();
    const pointer = ioWriter.getPointer();
    const now = ioWriter.getPos();
    ioWriter.writeUint32(0);
    ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("ftyp" /* BoxType.FTYP */));
    ioWriter.writeUint32(context.majorBrand || (0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('isom'));
    ioWriter.writeUint32(context.minorVersion || 512);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(context.compatibleBrand, (value) => {
        ioWriter.writeUint32(value);
    });
    updateSize(ioWriter, pointer, Number(ioWriter.getPos() - now));
    if (context.isom) {
        ioWriter.writeUint32(8);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("wide" /* BoxType.WIDE */));
    }
    else if (!context.fragment) {
        ioWriter.writeUint32(8);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("free" /* BoxType.FREE */));
    }
}
function writeEmptyBox(ioWriter, tag) {
    const isFullBox = common_util_array__WEBPACK_IMPORTED_MODULE_2__.has(_boxType__WEBPACK_IMPORTED_MODULE_1__.FullBoxs, tag);
    ioWriter.writeUint32(isFullBox ? 12 : 8);
    ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])(tag));
    if (isFullBox) {
        // version & flags
        ioWriter.writeUint32(0);
    }
}
function writeLayout(ioWriter, layouts, stream, movContext) {
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(layouts, (layout) => {
        if (!layout) {
            return true;
        }
        if (_writing_writers__WEBPACK_IMPORTED_MODULE_3__["default"][layout.type]) {
            _writing_writers__WEBPACK_IMPORTED_MODULE_3__["default"][layout.type](ioWriter, stream, movContext);
        }
        else if (layout.children) {
            const pos = ioWriter.getPos();
            ioWriter.writeUint32(0);
            ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])(layout.type));
            writeLayout(ioWriter, layout.children, stream, movContext);
            movContext.boxsPositionInfo.push({
                pos,
                type: layout.type,
                size: Number(ioWriter.getPos() - pos)
            });
        }
        else {
            writeEmptyBox(ioWriter, layout.type);
        }
    });
}
function writeMoov(ioWriter, formatContext, movContext) {
    const pos = ioWriter.getPos();
    ioWriter.writeUint32(0);
    ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("moov" /* BoxType.MOOV */));
    _writing_writers__WEBPACK_IMPORTED_MODULE_3__["default"]["mvhd" /* BoxType.MVHD */](ioWriter, null, movContext);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(formatContext.streams, (stream) => {
        const pos = ioWriter.getPos();
        ioWriter.writeUint32(0);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("trak" /* BoxType.TRAK */));
        writeLayout(ioWriter, movContext.fragment
            ? _layout__WEBPACK_IMPORTED_MODULE_4__.FragmentTrackBoxLayoutMap[stream.codecpar.codecType](movContext)
            : _layout__WEBPACK_IMPORTED_MODULE_4__.TrackBoxLayoutMap[stream.codecpar.codecType](movContext), stream, movContext);
        movContext.boxsPositionInfo.push({
            pos,
            type: "trak" /* BoxType.TRAK */,
            size: Number(ioWriter.getPos() - pos)
        });
    });
    if (movContext.fragment) {
        const pos = ioWriter.getPos();
        ioWriter.writeUint32(0);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("mvex" /* BoxType.MVEX */));
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(formatContext.streams, (stream) => {
            _writing_writers__WEBPACK_IMPORTED_MODULE_3__["default"]["trex" /* BoxType.TREX */](ioWriter, stream, movContext);
        });
        movContext.boxsPositionInfo.push({
            pos,
            type: "mvex" /* BoxType.MVEX */,
            size: Number(ioWriter.getPos() - pos)
        });
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: "moov" /* BoxType.MOOV */,
        size: Number(ioWriter.getPos() - pos)
    });
    (0,_function_updatePositionSize__WEBPACK_IMPORTED_MODULE_5__["default"])(ioWriter, movContext);
}
function writeMoof(ioWriter, formatContext, movContext) {
    const pos = ioWriter.getPos();
    ioWriter.writeUint32(0);
    ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("moof" /* BoxType.MOOF */));
    _writing_writers__WEBPACK_IMPORTED_MODULE_3__["default"]["mfhd" /* BoxType.MFHD */](ioWriter, null, movContext);
    common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(movContext.currentFragment.tracks, (track) => {
        if (!track.sampleCount) {
            return true;
        }
        const pos = ioWriter.getPos();
        ioWriter.writeUint32(0);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("traf" /* BoxType.TRAF */));
        const stream = formatContext.streams.find((stream) => {
            return stream.privData.trackId === track.trackId;
        });
        writeLayout(ioWriter, _layout__WEBPACK_IMPORTED_MODULE_4__.MoofTrafBoxLayout, stream, movContext);
        movContext.boxsPositionInfo.push({
            pos,
            type: "traf" /* BoxType.TRAF */,
            size: Number(ioWriter.getPos() - pos)
        });
    });
    const size = Number(ioWriter.getPos() - pos);
    movContext.boxsPositionInfo.push({
        pos,
        type: "moof" /* BoxType.MOOF */,
        size
    });
    movContext.currentFragment.size = size;
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/av1c.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/av1c.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 av1c box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(8 + stream.codecpar.extradataSize ?? 0);
    // tag
    ioWriter.writeString("av1C" /* BoxType.AV1C */);
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/avcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/avcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 avcc box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(8 + stream.codecpar.extradataSize ?? 0);
    // tag
    ioWriter.writeString("avcC" /* BoxType.AVCC */);
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/btrt.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/btrt.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 btrt box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(20);
    // tag
    ioWriter.writeString("btrt" /* BoxType.BTRT */);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/co64.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/co64.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 co64 box write
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
function write(ioWriter, stream, movContext) {
    const chunkOffsets = stream.privData.chunkOffsets || [];
    // size
    ioWriter.writeUint32(8 + chunkOffsets.length * 8);
    // tag
    ioWriter.writeString("co64" /* BoxType.CO64 */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(chunkOffsets.length);
    for (let i = 0; i < chunkOffsets.length; i++) {
        ioWriter.writeUint64(chunkOffsets[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/colr.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/colr.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 colr box write
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
function write(ioWriter, stream, movContext) {
    const icc = stream.sideData[28 /* AVPacketSideDataType.AV_PKT_DATA_ICC_PROFILE */];
    if (icc) {
        // size
        ioWriter.writeUint32(12 + icc.length);
        // tag
        ioWriter.writeString("colr" /* BoxType.COLR */);
        ioWriter.writeString('prof');
        ioWriter.writeBuffer(icc);
    }
    else {
        const fullRange = stream.codecpar.colorRange === 2 /* AVColorRange.AVCOL_RANGE_JPEG */;
        // size
        ioWriter.writeUint32(19);
        // tag
        ioWriter.writeString("colr" /* BoxType.COLR */);
        ioWriter.writeString('nclx');
        ioWriter.writeUint16(stream.codecpar.colorPrimaries);
        ioWriter.writeUint16(stream.codecpar.colorTrc);
        ioWriter.writeUint16(stream.codecpar.colorSpace);
        ioWriter.writeUint8(fullRange ? (128) : 0);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/ctts.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/ctts.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\writing\\ctts.ts";

function write(ioWriter, stream, movContext) {
    const context = stream.privData;
    const sampleCounts = context.cttsSampleCounts || [];
    const sampleOffsets = context.cttsSampleOffsets || [];
    if (sampleCounts.length !== sampleOffsets.length) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('ctts sampleCounts\'s length is not match sampleOffsets\'s length', cheap__fileName__0, 39);
    }
    const entryCount = Math.min(sampleCounts.length, sampleOffsets.length);
    // size
    ioWriter.writeUint32(16 + entryCount * 8);
    // tag
    ioWriter.writeString("ctts" /* BoxType.CTTS */);
    // version use int
    ioWriter.writeUint8(1);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(entryCount);
    for (let i = 0; i < entryCount; i++) {
        ioWriter.writeUint32(sampleCounts[i]);
        ioWriter.writeInt32(sampleOffsets[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/dac3.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/dac3.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/*
 * libmedia mp4 dac3 box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(11);
    // tag
    ioWriter.writeString("dac3" /* BoxType.DAC3 */);
    const bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_0__["default"](3);
    const info = movContext.ac3Info;
    bitWriter.writeU(2, info.substream[0].fscod);
    bitWriter.writeU(5, info.substream[0].bsid);
    bitWriter.writeU(3, info.substream[0].bsmod);
    bitWriter.writeU(3, info.substream[0].acmod);
    bitWriter.writeU(1, info.substream[0].lfeon);
    bitWriter.writeU(5, info.ac3BitrateCode);
    bitWriter.writeU(5, 0);
    ioWriter.writeBuffer(bitWriter.getBuffer());
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/dec3.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/dec3.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/*
 * libmedia mp4 dec3 box write
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

function write(ioWriter, stream, movContext) {
    const info = movContext.ac3Info;
    const bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_0__["default"](2 + ((34 * (info.numIndSub + 1) + 7) >> 3));
    bitWriter.writeU(13, info.dataRate);
    bitWriter.writeU(3, info.numIndSub);
    for (let i = 0; i < info.numIndSub; i++) {
        bitWriter.writeU(2, info.substream[i].fscod);
        bitWriter.writeU(5, info.substream[i].bsid);
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, 0);
        bitWriter.writeU(3, info.substream[i].bsmod);
        bitWriter.writeU(3, info.substream[i].acmod);
        bitWriter.writeU(1, info.substream[i].lfeon);
        bitWriter.writeU(5, 0);
        bitWriter.writeU(4, info.substream[i].numDepSub);
        if (!info.substream[i].numDepSub) {
            bitWriter.writeU(1, 0);
        }
        else {
            bitWriter.writeU(9, info.substream[i].chanLoc);
        }
    }
    bitWriter.padding();
    const size = bitWriter.getPointer();
    // size
    ioWriter.writeUint32(8 + size);
    // tag
    ioWriter.writeString("dec3" /* BoxType.DEC3 */);
    ioWriter.writeBuffer(bitWriter.getBuffer().subarray(0, size));
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/dfla.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/dfla.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\writing\\dfla.ts";


function write(ioWriter, stream, movContext) {
    let extradata;
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
        }
    }
    if (!extradata) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('invalid extradata', cheap__fileName__0, 56);
    }
    else {
        // size
        ioWriter.writeUint32(extradata.length + 16);
        // tag
        ioWriter.writeString("dfLa" /* BoxType.DFLA */);
        // version
        ioWriter.writeUint8(0);
        // flags
        ioWriter.writeUint24(0);
        ioWriter.writeUint8((128) | 0 /* FlacMetadataType.FLAC_METADATA_TYPE_STREAMINFO */);
        ioWriter.writeUint24(extradata.length);
        ioWriter.writeBuffer(extradata);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/dops.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/dops.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/*
 * libmedia mp4 dops box write
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


function write(ioWriter, stream, movContext) {
    let extradata;
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
        }
    }
    if (!extradata || extradata.length < 19) {
        ioWriter.writeUint32(19);
        ioWriter.writeString("dOps" /* BoxType.DOPS */);
        ioWriter.writeUint8(0);
        ioWriter.writeUint8(stream.codecpar.chLayout.nbChannels);
        ioWriter.writeUint16(stream.codecpar.initialPadding);
        ioWriter.writeUint32(stream.codecpar.sampleRate);
        ioWriter.writeUint16(0);
        ioWriter.writeUint8(0);
    }
    else {
        const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_1__["default"](extradata, false);
        // size
        ioWriter.writeUint32(extradata.length);
        // tag
        ioWriter.writeString("dOps" /* BoxType.DOPS */);
        // Version
        ioWriter.writeUint8(0);
        reader.seek(9);
        ioWriter.writeUint8(reader.readUint8());
        ioWriter.writeUint16(reader.readUint16());
        ioWriter.writeUint32(reader.readUint32());
        ioWriter.writeUint16(reader.readUint16());
        ioWriter.writeBuffer(extradata.subarray(18));
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/dref.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/dref.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 dref box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(28);
    // tag
    ioWriter.writeString("dref" /* BoxType.DREF */);
    // version & flags
    ioWriter.writeUint32(0);
    // entry count
    ioWriter.writeUint32(1);
    // size
    ioWriter.writeUint32(0x0c);
    ioWriter.writeString("url " /* BoxType.URL */);
    // version & flags
    ioWriter.writeUint32(1);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/edts.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/edts.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia mp4 edts box write
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


function write(ioWriter, stream, movContext) {
    const streamContext = stream.privData;
    let duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(streamContext.lastPts, stream.timeBase, {
        den: movContext.timescale,
        num: 1
    });
    let startCT = streamContext.startCT;
    const delay = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(streamContext.startDts + BigInt(Math.floor(startCT)), stream.timeBase, {
        den: streamContext.timescale,
        num: 1
    });
    let version = duration < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.INT32_MAX ? 0 : 1;
    version |= delay < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.INT32_MAX ? 0 : 1;
    const entrySize = (version === 1) ? 20 : 12;
    const entryCount = 1 + (delay > 0 ? 1 : 0);
    const size = 24 + entryCount * entrySize;
    // size
    ioWriter.writeUint32(size);
    // tag
    ioWriter.writeString("edts" /* BoxType.EDTS */);
    ioWriter.writeUint32(size - 8);
    ioWriter.writeString("elst" /* BoxType.ELST */);
    ioWriter.writeUint8(version);
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(entryCount);
    if (delay > 0) {
        if (version === 1) {
            ioWriter.writeUint64(delay);
            ioWriter.writeInt64(avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT);
        }
        else {
            ioWriter.writeUint32(Number(delay));
            ioWriter.writeInt32(-1);
        }
        ioWriter.writeUint32(0x00010000);
    }
    else {
        startCT = -Math.min(Number(streamContext.startDts), 0);
        duration += delay;
    }
    if (movContext.fragment) {
        duration = BigInt(0);
    }
    if (version === 1) {
        ioWriter.writeUint64(duration);
        ioWriter.writeInt64(BigInt(Math.floor(startCT)));
    }
    else {
        ioWriter.writeUint32(Number(duration));
        ioWriter.writeInt32(startCT);
    }
    ioWriter.writeUint32(0x00010000);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/esds.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/esds.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var _mov__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mov */ "./src/avformat/formats/mov/mov.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 esds box write
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


function writeDescriptorLength(ioWriter, tag, size) {
    ioWriter.writeUint8(tag);
    for (let i = 3; i > 0; i--) {
        ioWriter.writeUint8((size >> (7 * i)) | 0x80);
    }
    ioWriter.writeUint8(size & 0x7F);
}
function write(ioWriter, stream, movContext) {
    const streamContext = stream.privData;
    const decoderSpecificInfoLen = stream.codecpar.extradata ? 5 + stream.codecpar.extradataSize : 0;
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("esds" /* BoxType.ESDS */);
    // version = 0
    ioWriter.writeUint32(0);
    // ES descriptor
    writeDescriptorLength(ioWriter, 3 /* MP4Tag.MP4_ES_DESCR_TAG */, 21 + decoderSpecificInfoLen + 5 + 1);
    ioWriter.writeUint16(streamContext.trackId);
    // ioWriter
    ioWriter.writeUint8(0x00);
    // DecoderConfig descriptor
    writeDescriptorLength(ioWriter, 4 /* MP4Tag.MP4_DEC_CONFIG_DESCR_TAG */, 13 + decoderSpecificInfoLen);
    // Object type indication
    if ((stream.codecpar.codecId === 86016 /* AVCodecID.AV_CODEC_ID_MP2 */ || stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */)
        && stream.codecpar.sampleRate > 24000) {
        // 11172-3
        ioWriter.writeUint8(0x6B);
    }
    else {
        ioWriter.writeUint8(_mov__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2Mp4a[stream.codecpar.codecId]);
    }
    if (stream.codecpar.codecId === 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */) {
        // flags (= NeroSubpicStream)
        ioWriter.writeUint8((224) | 1);
    }
    else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
        // flags (= Audiostream)
        ioWriter.writeUint8(0x15);
    }
    else {
        // flags (= Visualstream)
        ioWriter.writeUint8(0x11);
    }
    //  Buffersize DB
    ioWriter.writeUint24(0);
    // maxbitrate
    ioWriter.writeUint32(0);
    // avgbitrate
    ioWriter.writeUint32(0);
    if (stream.codecpar.extradata) {
        writeDescriptorLength(ioWriter, 5 /* MP4Tag.MP4_DEC_SPECIFIC_DESCR_TAG */, stream.codecpar.extradataSize);
        ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
    }
    // SL descriptor
    writeDescriptorLength(ioWriter, 6 /* MP4Tag.MP4_SL_DESCR_TAG */, 1);
    ioWriter.writeUint8(0x02);
    movContext.boxsPositionInfo.push({
        pos,
        type: "esds" /* BoxType.ESDS */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/function/writeMatrix.ts":
/*!******************************************************************!*\
  !*** ./src/avformat/formats/mov/writing/function/writeMatrix.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ writeMatrix)
/* harmony export */ });
/*
 * libmedia write matrix
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
/**
 * transformation matrix
 *  |a  b  u|
 *  |c  d  v|
 *  |tx ty w|
 */
function writeMatrix(ioWriter, a, b, c, d, tx, ty) {
    ioWriter.writeUint32(a << 16);
    ioWriter.writeUint32(b << 16);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(c << 16);
    ioWriter.writeUint32(d << 16);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(tx << 16);
    ioWriter.writeUint32(ty << 16);
    ioWriter.writeUint32(1073741824);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/hdlr.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/hdlr.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 hdlr box write
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
function write(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("hdlr" /* BoxType.HDLR */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    let hdlr = 'dhlr';
    let hdlrType = 'url ';
    let descr = 'DataHandler';
    if (stream) {
        hdlr = 'mhlr';
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            hdlrType = 'soun';
            descr = 'SoundHandler';
        }
        else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            hdlrType = 'vide';
            descr = 'VideoHandler';
        }
        else if (stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
            hdlrType = 'text';
            descr = 'SubtitleHandler';
        }
        else {
            if (stream.metadata['handlerName']) {
                descr = stream.metadata['handlerName'];
            }
            if (stream.metadata['hdlrType']) {
                hdlrType = stream.metadata['hdlrType'];
            }
        }
    }
    // handler
    ioWriter.writeString(hdlr);
    // handler type 
    ioWriter.writeString(hdlrType);
    // reserved
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
    if (!stream || movContext.isom) {
        ioWriter.writeUint8(descr.length);
    }
    ioWriter.writeString(descr);
    if (stream && !movContext.isom) {
        // c string
        ioWriter.writeUint8(0);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: "hdlr" /* BoxType.HDLR */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/hvcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/hvcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 hvcc box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(8 + stream.codecpar.extradataSize ?? 0);
    // tag
    ioWriter.writeString("hvcC" /* BoxType.HVCC */);
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/mdhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/mdhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mp4 mdhd box write
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

function write(ioWriter, stream, movContext) {
    const streamContext = stream.privData;
    const duration = streamContext.lastPts;
    const creationTime = stream.metadata['creationTime'] || 0;
    const modificationTime = stream.metadata['modificationTime'] || 0;
    const languge = stream.metadata['language'] || 21956;
    let version = duration < BigInt(avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX) ? 0 : 1;
    version = creationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    version = modificationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    // size
    ioWriter.writeUint32(version === 1 ? 44 : 32);
    // tag
    ioWriter.writeString("mdhd" /* BoxType.MDHD */);
    // version
    ioWriter.writeUint8(version);
    // flags
    ioWriter.writeUint24(0);
    if (version === 1) {
        ioWriter.writeUint64(creationTime);
        ioWriter.writeUint64(modificationTime);
    }
    else {
        ioWriter.writeUint32(Number(creationTime));
        ioWriter.writeUint32(Number(modificationTime));
    }
    // timescale
    ioWriter.writeUint32(stream.timeBase.den);
    if (version === 1) {
        ioWriter.writeUint64(duration);
    }
    else {
        ioWriter.writeUint32(Number(duration));
    }
    // language
    ioWriter.writeUint16(languge);
    // reserved (quality) 
    ioWriter.writeUint16(0);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/mfhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/mfhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 mfhd box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(16);
    // tag
    ioWriter.writeString("mfhd" /* BoxType.MFHD */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(movContext.currentFragment.sequence);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/minfHdlr.ts":
/*!******************************************************!*\
  !*** ./src/avformat/formats/mov/writing/minfHdlr.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var _hdlr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hdlr */ "./src/avformat/formats/mov/writing/hdlr.ts");
/*
 * libmedia mp4 hdlr box write
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

function write(ioWriter, stream, movContext) {
    (0,_hdlr__WEBPACK_IMPORTED_MODULE_0__["default"])(ioWriter, null, movContext);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/mvhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/mvhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_writeMatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function/writeMatrix */ "./src/avformat/formats/mov/writing/function/writeMatrix.ts");
/*
 * libmedia mp4 mvhd box write
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


function write(ioWriter, stream, movContext) {
    const duration = movContext.duration;
    const creationTime = movContext.creationTime || 0;
    const modificationTime = movContext.modificationTime || 0;
    const timescale = movContext.timescale || 0;
    let nextTrackId = movContext.nextTrackId || 1;
    if (movContext.fragment) {
        nextTrackId = 2;
    }
    let version = duration < BigInt(avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX) ? 0 : 1;
    version = creationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    version = modificationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    // size
    ioWriter.writeUint32(version === 1 ? 120 : 108);
    // tag
    ioWriter.writeString("mvhd" /* BoxType.MVHD */);
    // version
    ioWriter.writeUint8(version);
    // flags
    ioWriter.writeUint24(0);
    if (version === 1) {
        ioWriter.writeUint64(creationTime);
        ioWriter.writeUint64(modificationTime);
    }
    else {
        ioWriter.writeUint32(Number(creationTime));
        ioWriter.writeUint32(Number(modificationTime));
    }
    // timescale
    ioWriter.writeUint32(timescale);
    if (version === 1) {
        ioWriter.writeUint64(duration);
    }
    else {
        ioWriter.writeUint32(Number(duration));
    }
    // reserved (preferred rate) 1.0 = normal
    ioWriter.writeUint32(0x00010000);
    // reserved (preferred volume) 1.0 = normal
    ioWriter.writeUint16(0x0100);
    // reserved
    ioWriter.writeUint16(0);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
    (0,_function_writeMatrix__WEBPACK_IMPORTED_MODULE_1__["default"])(ioWriter, 1, 0, 0, 1, 0, 0);
    // reserved (preview time)
    ioWriter.writeUint32(0);
    // reserved (preview duration)
    ioWriter.writeUint32(0);
    // reserved (poster time)
    ioWriter.writeUint32(0);
    // reserved (selection time)
    ioWriter.writeUint32(0);
    // reserved (selection time)
    ioWriter.writeUint32(0);
    // reserved (current time)
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(nextTrackId);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/pasp.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/pasp.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 pasp box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(16);
    // tag
    ioWriter.writeString("pasp" /* BoxType.PASP */);
    ioWriter.writeUint32(1);
    ioWriter.writeUint32(1);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/smhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/smhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 smhd box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(16);
    // tag
    ioWriter.writeString("smhd" /* BoxType.SMHD */);
    // version & flags
    ioWriter.writeUint32(0);
    // reserved (balance, normally = 0
    ioWriter.writeUint16(0);
    // reserved
    ioWriter.writeUint16(0);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stco.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stco.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 stco box write
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
function write(ioWriter, stream, movContext) {
    const context = stream.privData;
    const chunkOffsets = context.chunkOffsets || [];
    // size
    ioWriter.writeUint32(16 + chunkOffsets.length * 4);
    // tag
    ioWriter.writeString("stco" /* BoxType.STCO */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(chunkOffsets.length);
    for (let i = 0; i < chunkOffsets.length; i++) {
        ioWriter.writeUint32(Number(chunkOffsets[i]));
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stsc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stsc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\writing\\stsc.ts";

function write(ioWriter, stream, movContext) {
    const context = stream.privData;
    const firstChunk = context.stscFirstChunk;
    const samplesPerChunk = context.stscSamplesPerChunk;
    const sampleDescriptionIndex = context.stscSampleDescriptionIndex;
    if (firstChunk.length !== samplesPerChunk.length
        || firstChunk.length !== sampleDescriptionIndex.length) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('ctts firstChunk\'s length is not match samplesPerChunk\'s length or sampleDescriptionIndex\'s length', cheap__fileName__0, 42);
    }
    const entryCount = Math.min(firstChunk.length, samplesPerChunk.length, sampleDescriptionIndex.length);
    // size
    ioWriter.writeUint32(16 + entryCount * 12);
    // tag
    ioWriter.writeString("stsc" /* BoxType.STSC */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(entryCount);
    for (let i = 0; i < entryCount; i++) {
        ioWriter.writeUint32(firstChunk[i]);
        ioWriter.writeUint32(samplesPerChunk[i]);
        ioWriter.writeUint32(sampleDescriptionIndex[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stsd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stsd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var _avcc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avcc */ "./src/avformat/formats/mov/writing/avcc.ts");
/* harmony import */ var _hvcc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hvcc */ "./src/avformat/formats/mov/writing/hvcc.ts");
/* harmony import */ var _vvcc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vvcc */ "./src/avformat/formats/mov/writing/vvcc.ts");
/* harmony import */ var _vpcc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vpcc */ "./src/avformat/formats/mov/writing/vpcc.ts");
/* harmony import */ var _av1c__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./av1c */ "./src/avformat/formats/mov/writing/av1c.ts");
/* harmony import */ var _dfla__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dfla */ "./src/avformat/formats/mov/writing/dfla.ts");
/* harmony import */ var _dops__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dops */ "./src/avformat/formats/mov/writing/dops.ts");
/* harmony import */ var _esds__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./esds */ "./src/avformat/formats/mov/writing/esds.ts");
/* harmony import */ var _colr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./colr */ "./src/avformat/formats/mov/writing/colr.ts");
/* harmony import */ var _pasp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pasp */ "./src/avformat/formats/mov/writing/pasp.ts");
/* harmony import */ var _btrt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./btrt */ "./src/avformat/formats/mov/writing/btrt.ts");
/* harmony import */ var _wave__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./wave */ "./src/avformat/formats/mov/writing/wave.ts");
/* harmony import */ var _dac3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dac3 */ "./src/avformat/formats/mov/writing/dac3.ts");
/* harmony import */ var _dec3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dec3 */ "./src/avformat/formats/mov/writing/dec3.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _function_digital2Tag__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../function/digital2Tag */ "./src/avformat/function/digital2Tag.ts");
/*
 * libmedia mp4 stsd box write
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
















const AVCodecID2Tag = {
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: "avc1" /* BoxType.AVC1 */,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: "hvc1" /* BoxType.HVC1 */,
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: "vvc1" /* BoxType.VVC1 */,
    [225 /* AVCodecID.AV_CODEC_ID_AV1 */]: "av01" /* BoxType.AV01 */,
    [167 /* AVCodecID.AV_CODEC_ID_VP9 */]: "vp09" /* BoxType.VP09 */,
    [86019 /* AVCodecID.AV_CODEC_ID_AC3 */]: "ac-3" /* BoxType.AC_3 */,
    [86056 /* AVCodecID.AV_CODEC_ID_EAC3 */]: "ec-3" /* BoxType.EC_3 */,
};
function getTag(codecpar) {
    if (codecpar.codecTag) {
        return (0,_function_digital2Tag__WEBPACK_IMPORTED_MODULE_15__["default"])(codecpar.codecTag);
    }
    let tag = AVCodecID2Tag[codecpar.codecId];
    if (!tag) {
        if (codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            tag = "mp4v" /* BoxType.MP4V */;
        }
        else if (codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            if (codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                tag = "Opus" /* BoxType.OPUS */;
            }
            else if (codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */) {
                tag = "fLaC" /* BoxType.FLAC */;
            }
            else {
                tag = "mp4a" /* BoxType.MP4A */;
            }
        }
        else if (codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
            tag = "text" /* BoxType.TEXT */;
        }
        else {
            tag = "none" /* BoxType.NONE */;
        }
    }
    return tag;
}
function writeAudioTag(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    const tag = getTag(stream.codecpar);
    const version = movContext.isom ? 1 : 0;
    // size
    ioWriter.writeUint32(0);
    ioWriter.writeString(tag);
    // Reserved
    ioWriter.writeUint32(0);
    // Reserved
    ioWriter.writeUint16(0);
    // Data-reference index
    ioWriter.writeUint16(1);
    // SoundDescription Version
    ioWriter.writeUint16(version);
    // SoundDescription Revision level
    ioWriter.writeUint16(0);
    // Reserved
    ioWriter.writeUint32(0);
    if (movContext.isom) {
        ioWriter.writeUint16(stream.codecpar.chLayout.nbChannels);
        if (stream.codecpar.codecId === 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
            || stream.codecpar.codecId === 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */) {
            ioWriter.writeUint16(8);
        }
        else if (stream.codecpar.codecId === 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */) {
            ioWriter.writeUint16(stream.codecpar.bitsPerCodedSample);
        }
        else {
            ioWriter.writeUint16(16);
        }
        ioWriter.writeUint16(-2);
    }
    else {
        if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */
            || stream.codecpar.codecId === 86032 /* AVCodecID.AV_CODEC_ID_ALAC */
            || stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
            ioWriter.writeUint16(stream.codecpar.chLayout.nbChannels);
        }
        else {
            ioWriter.writeUint16(2);
        }
        if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */
            || stream.codecpar.codecId === 86032 /* AVCodecID.AV_CODEC_ID_ALAC */) {
            ioWriter.writeUint16(stream.codecpar.bitsPerCodedSample);
        }
        else {
            ioWriter.writeUint16(16);
        }
        ioWriter.writeUint16(0);
    }
    // packet size (= 0) 
    ioWriter.writeUint16(0);
    if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
        ioWriter.writeUint16(48000);
    }
    else if (stream.codecpar.codecId === 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */) {
        ioWriter.writeUint32(stream.codecpar.sampleRate);
    }
    else {
        ioWriter.writeUint16(stream.codecpar.sampleRate);
    }
    if (stream.codecpar.codecId !== 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */) {
        // Reserved
        ioWriter.writeUint16(0);
    }
    // SoundDescription V1 extended info
    if (version === 1) {
        // Samples per packet
        ioWriter.writeUint32(stream.codecpar.frameSize);
        // Bytes per packet
        ioWriter.writeUint32(0);
        // Bytes per frame
        ioWriter.writeUint32(0);
        // Bytes per sample
        ioWriter.writeUint32(2);
    }
    if (movContext.isom
        && (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */
            || stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
            || stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */
            || stream.codecpar.codecId === 73728 /* AVCodecID.AV_CODEC_ID_AMR_NB */
            || stream.codecpar.codecId === 86032 /* AVCodecID.AV_CODEC_ID_ALAC */
            || stream.codecpar.codecId === 69638 /* AVCodecID.AV_CODEC_ID_ADPCM_MS */
            || stream.codecpar.codecId === 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */
            || stream.codecpar.codecId === 86035 /* AVCodecID.AV_CODEC_ID_QDM2 */)) {
        (0,_wave__WEBPACK_IMPORTED_MODULE_11__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */) {
        (0,_dfla__WEBPACK_IMPORTED_MODULE_5__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
        (0,_dops__WEBPACK_IMPORTED_MODULE_6__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
        (0,_dac3__WEBPACK_IMPORTED_MODULE_12__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */) {
        (0,_dec3__WEBPACK_IMPORTED_MODULE_13__["default"])(ioWriter, stream, movContext);
    }
    else if (tag == "mp4a" /* BoxType.MP4A */) {
        (0,_esds__WEBPACK_IMPORTED_MODULE_7__["default"])(ioWriter, stream, movContext);
    }
    if (!movContext.isom) {
        (0,_btrt__WEBPACK_IMPORTED_MODULE_10__["default"])(ioWriter, stream, movContext);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: tag,
        size: Number(ioWriter.getPos() - pos)
    });
}
function writeVideoTag(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    const tag = getTag(stream.codecpar);
    const uncompressedYcbcr = ((stream.codecpar.codecId == 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */
        && stream.codecpar.format == 15 /* AVPixelFormat.AV_PIX_FMT_UYVY422 */)
        || (stream.codecpar.codecId == 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */
            && stream.codecpar.format == 1 /* AVPixelFormat.AV_PIX_FMT_YUYV422 */)
        || stream.codecpar.codecId == 202 /* AVCodecID.AV_CODEC_ID_V308 */
        || stream.codecpar.codecId == 203 /* AVCodecID.AV_CODEC_ID_V408 */
        || stream.codecpar.codecId == 156 /* AVCodecID.AV_CODEC_ID_V410 */
        || stream.codecpar.codecId == 127 /* AVCodecID.AV_CODEC_ID_V210 */);
    // size
    ioWriter.writeUint32(0);
    ioWriter.writeString(tag);
    // Reserved
    ioWriter.writeUint32(0);
    // Reserved
    ioWriter.writeUint16(0);
    // Data-reference index
    ioWriter.writeUint16(1);
    // Codec stream version
    ioWriter.writeUint16(uncompressedYcbcr ? 2 : 0);
    // Codec stream revision (=0)
    ioWriter.writeUint16(0);
    // Reserved
    if (movContext.isom) {
        ioWriter.writeString('FFMP');
        if (stream.codecpar.codecId === 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */ || uncompressedYcbcr) {
            /* Temporal Quality */
            ioWriter.writeUint32(0);
            /* Spatial Quality = lossless*/
            ioWriter.writeUint32(0x400);
        }
        else {
            /* Temporal Quality = normal */
            ioWriter.writeUint32(0x200);
            /* Spatial Quality = normal */
            ioWriter.writeUint32(0x200);
        }
    }
    else {
        ioWriter.writeUint32(0);
        ioWriter.writeUint32(0);
        ioWriter.writeUint32(0);
    }
    ioWriter.writeUint16(stream.codecpar.width);
    ioWriter.writeUint16(stream.codecpar.height);
    // Horizontal resolution 72dpi
    ioWriter.writeUint32(0x00480000);
    // Vertical resolution 72dpi
    ioWriter.writeUint32(0x00480000);
    // Data size (= 0)
    ioWriter.writeUint32(0);
    // Frame count (= 1)
    ioWriter.writeUint16(1);
    let compressorName = (stream.metadata['compressorName'] || '');
    compressorName = compressorName.slice(0, 31);
    ioWriter.writeUint8(compressorName.length);
    ioWriter.writeString(compressorName);
    if (compressorName.length < 31) {
        let len = 31 - compressorName.length;
        while (len > 0) {
            ioWriter.writeUint8(0);
            len--;
        }
    }
    // Reserved
    if (movContext.isom && stream.codecpar.bitsPerCodedSample) {
        ioWriter.writeUint16(stream.codecpar.bitsPerCodedSample);
    }
    else {
        ioWriter.writeUint16(0x18);
    }
    ioWriter.writeUint16(0xffff);
    if (tag === "mp4v" /* BoxType.MP4V */) {
        (0,_esds__WEBPACK_IMPORTED_MODULE_7__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
        (0,_avcc__WEBPACK_IMPORTED_MODULE_0__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
        (0,_hvcc__WEBPACK_IMPORTED_MODULE_1__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
        (0,_vvcc__WEBPACK_IMPORTED_MODULE_2__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
        (0,_vpcc__WEBPACK_IMPORTED_MODULE_3__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
        (0,_av1c__WEBPACK_IMPORTED_MODULE_4__["default"])(ioWriter, stream, movContext);
    }
    (0,_colr__WEBPACK_IMPORTED_MODULE_8__["default"])(ioWriter, stream, movContext);
    (0,_pasp__WEBPACK_IMPORTED_MODULE_9__["default"])(ioWriter, stream, movContext);
    if (!movContext.isom) {
        (0,_btrt__WEBPACK_IMPORTED_MODULE_10__["default"])(ioWriter, stream, movContext);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: tag,
        size: Number(ioWriter.getPos() - pos)
    });
}
function writeSubtitleTag(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    const tag = getTag(stream.codecpar);
    // size
    ioWriter.writeUint32(0);
    ioWriter.writeString(tag);
    // Reserved
    ioWriter.writeUint32(0);
    // Reserved
    ioWriter.writeUint16(0);
    // Data-reference index
    ioWriter.writeUint16(1);
    if (stream.codecpar.codecId === 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */) {
        (0,_esds__WEBPACK_IMPORTED_MODULE_7__["default"])(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.extradata) {
        ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_14__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
    }
    if (!movContext.isom) {
        (0,_btrt__WEBPACK_IMPORTED_MODULE_10__["default"])(ioWriter, stream, movContext);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: tag,
        size: Number(ioWriter.getPos() - pos)
    });
}
function write(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("stsd" /* BoxType.STSD */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    // entry count
    ioWriter.writeUint32(1);
    if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
        writeAudioTag(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        writeVideoTag(ioWriter, stream, movContext);
    }
    else if (stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
        writeSubtitleTag(ioWriter, stream, movContext);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: "esds" /* BoxType.ESDS */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stss.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stss.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 stss box write
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
function write(ioWriter, stream, movContext) {
    const sampleNumbers = stream.privData.stssSampleNumbers;
    // size
    ioWriter.writeUint32(16 + sampleNumbers.length * 4);
    // tag
    ioWriter.writeString("stss" /* BoxType.STSS */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(sampleNumbers.length);
    for (let i = 0; i < sampleNumbers.length; i++) {
        ioWriter.writeUint32(sampleNumbers[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stsz.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stsz.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 stsz box write
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
function write(ioWriter, stream, movContext) {
    const sampleSizes = stream.privData.sampleSizes;
    // size
    ioWriter.writeUint32(20 + sampleSizes.length * 4);
    // tag
    ioWriter.writeString("stsz" /* BoxType.STSZ */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(sampleSizes.length);
    for (let i = 0; i < sampleSizes.length; i++) {
        ioWriter.writeUint32(sampleSizes[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/stts.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/stts.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mov\\writing\\stts.ts";

function write(ioWriter, stream, movContext) {
    const context = stream.privData;
    const sampleCounts = context.sttsSampleCounts || [];
    const sampleDeltas = context.sttsSampleDeltas || [];
    if (sampleCounts.length !== sampleDeltas.length) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('stts sampleCounts\'s length is not match sampleDeltas\'s length', cheap__fileName__0, 39);
    }
    const entryCount = Math.min(sampleCounts.length, sampleDeltas.length);
    // size
    ioWriter.writeUint32(16 + entryCount * 8);
    // tag
    ioWriter.writeString("stts" /* BoxType.STTS */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(entryCount);
    for (let i = 0; i < entryCount; i++) {
        ioWriter.writeUint32(sampleCounts[i]);
        ioWriter.writeInt32(sampleDeltas[i]);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/tfdt.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/tfdt.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 tfdt box write
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
function write(ioWriter, stream, movContext) {
    const track = movContext.currentFragment.tracks.find((track) => {
        return track.trackId === stream.privData.trackId;
    });
    const baseMediaDecodeTime = track ? track.baseMediaDecodeTime : BigInt(0);
    // size
    ioWriter.writeUint32(20);
    // tag
    ioWriter.writeString("tfdt" /* BoxType.TFDT */);
    // version use int64
    ioWriter.writeUint8(1);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint64(baseMediaDecodeTime);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/tfhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/tfhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 tfhd box write
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
function write(ioWriter, stream, movContext) {
    const track = movContext.currentFragment.tracks.find((track) => {
        return track.trackId === stream.privData.trackId;
    });
    let flags = 1 /* TFHDFlags.BASE_DATA_OFFSET */
        | 8 /* TFHDFlags.SAMPLE_DURATION */
        | 16 /* TFHDFlags.SAMPLE_SIZE */
        | 32 /* TFHDFlags.SAMPLE_FLAGS */;
    if (track.baseIsMoof) {
        flags &= ~1 /* TFHDFlags.BASE_DATA_OFFSET */;
        flags |= 131072 /* TFHDFlags.DEFAULT_BASE_IS_MOOF */;
    }
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("tfhd" /* BoxType.TFHD */);
    // version use int64
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(flags);
    ioWriter.writeUint32(track.trackId);
    if (flags & 1 /* TFHDFlags.BASE_DATA_OFFSET */) {
        ioWriter.writeUint64(track.baseDataOffset);
    }
    if (flags & 8 /* TFHDFlags.SAMPLE_DURATION */) {
        ioWriter.writeUint32(track.defaultSampleDuration);
    }
    if (flags & 16 /* TFHDFlags.SAMPLE_SIZE */) {
        ioWriter.writeUint32(track.defaultSampleSize);
    }
    if (flags & 32 /* TFHDFlags.SAMPLE_FLAGS */) {
        ioWriter.writeUint32(track.defaultSampleFlags);
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: "tfhd" /* BoxType.TFHD */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/tkhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/tkhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_writeMatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function/writeMatrix */ "./src/avformat/formats/mov/writing/function/writeMatrix.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia mp4 tkhd box write
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



function write(ioWriter, stream, movContext) {
    const streamContext = stream.privData;
    const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_2__.avRescaleQ)(streamContext.lastPts, stream.timeBase, {
        den: movContext.timescale,
        num: 1
    });
    const creationTime = stream.metadata['creationTime'] || 0;
    const modificationTime = stream.metadata['modificationTime'] || 0;
    const layer = streamContext.layer || 0;
    const alternateGroup = streamContext.alternateGroup || 0;
    let width = stream.codecpar.width > 0 ? stream.codecpar.width : 0;
    let height = stream.codecpar.height > 0 ? stream.codecpar.height : 0;
    if (width < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT16_MAX) {
        width = width << 16;
    }
    if (height < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT16_MAX) {
        height = height << 16;
    }
    let version = duration < BigInt(avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX) ? 0 : 1;
    version = creationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    version = modificationTime < avutil_constant__WEBPACK_IMPORTED_MODULE_0__.UINT32_MAX ? 0 : 1;
    let flags = 2 /* TKHDFlags.IN_MOVIE */;
    if (streamContext.flags & 1 /* TKHDFlags.ENABLED */) {
        flags |= 1 /* TKHDFlags.ENABLED */;
    }
    // size
    ioWriter.writeUint32(version === 1 ? 100 : 92);
    // tag
    ioWriter.writeString("tkhd" /* BoxType.TKHD */);
    // version
    ioWriter.writeUint8(version);
    // flags
    ioWriter.writeUint24(flags);
    if (version === 1) {
        ioWriter.writeUint64(creationTime);
        ioWriter.writeUint64(modificationTime);
    }
    else {
        ioWriter.writeUint32(Number(creationTime));
        ioWriter.writeUint32(Number(modificationTime));
    }
    // trackId
    ioWriter.writeUint32(streamContext.trackId);
    // reserved
    ioWriter.writeUint32(0);
    if (version === 1) {
        ioWriter.writeUint64(duration);
    }
    else {
        ioWriter.writeUint32(Number(duration));
    }
    // reserved
    ioWriter.writeUint32(0);
    ioWriter.writeUint32(0);
    ioWriter.writeInt16(layer);
    ioWriter.writeInt16(streamContext.perStreamGrouping ? alternateGroup : stream.codecpar.codecType);
    if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
        ioWriter.writeInt16(0x0100);
    }
    else {
        ioWriter.writeInt16(0);
    }
    // reserved
    ioWriter.writeInt16(0);
    (0,_function_writeMatrix__WEBPACK_IMPORTED_MODULE_1__["default"])(ioWriter, 1, 0, 0, 1, 0, 0);
    ioWriter.writeUint32(width);
    ioWriter.writeUint32(height);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/trex.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/trex.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 trex box write
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
function write(ioWriter, stream, movContext) {
    const track = movContext.currentFragment.tracks.find((track) => {
        return track.trackId === stream.privData.trackId;
    });
    const trex = movContext.trexs.find((trex) => {
        trex.trackId === stream.privData.trackId;
    });
    const duration = trex?.duration ?? 0;
    const size = trex?.size ?? 0;
    const flags = trex?.flags ?? 0;
    // size
    ioWriter.writeUint32(32);
    // tag
    ioWriter.writeString("trex" /* BoxType.TREX */);
    // version use int64
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    ioWriter.writeUint32(track.trackId);
    // default_sample_description_index
    ioWriter.writeUint32(1);
    ioWriter.writeUint32(duration);
    ioWriter.writeUint32(size);
    ioWriter.writeUint32(flags);
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/trun.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/trun.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 trun box write
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
function write(ioWriter, stream, movContext) {
    const streamContext = stream.privData;
    const track = movContext.currentFragment.tracks.find((track) => {
        return track.trackId === streamContext.trackId;
    });
    const firstSampleFlags = track.firstSampleFlags || 0;
    const dataOffset = track.dataOffset || 0;
    const sampleDurations = track.sampleDurations;
    const sampleSizes = track.sampleSizes;
    const sampleFlags = track.sampleFlags;
    const sampleCompositionTimeOffset = track.sampleCompositionTimeOffset;
    const sampleCount = track.sampleCount;
    const hasSampleDurations = sampleDurations.length > 0;
    const hasSampleSizes = sampleSizes.length > 0;
    const hasSampleFlags = sampleFlags.length > 0;
    const hasSampleCompositionTimeOffset = sampleCompositionTimeOffset.length > 0;
    const hasFirstFlag = firstSampleFlags !== 0;
    let flags = 1 /* TRUNFlags.DATA_OFFSET */;
    if (hasFirstFlag) {
        flags |= 4 /* TRUNFlags.FIRST_FLAG */;
    }
    if (hasSampleDurations) {
        flags |= 256 /* TRUNFlags.DURATION */;
    }
    if (hasSampleSizes) {
        flags |= 512 /* TRUNFlags.SIZE */;
    }
    if (hasSampleFlags) {
        flags |= 1024 /* TRUNFlags.FLAGS */;
    }
    if (hasSampleCompositionTimeOffset) {
        flags |= 2048 /* TRUNFlags.CTS_OFFSET */;
    }
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("trun" /* BoxType.TRUN */);
    // version use int32
    ioWriter.writeUint8(1);
    // flags
    ioWriter.writeUint24(flags);
    ioWriter.writeUint32(sampleCount);
    track.dataOffsetPos = ioWriter.getPos();
    ioWriter.writeInt32(dataOffset);
    if (hasFirstFlag) {
        ioWriter.writeUint32(firstSampleFlags);
    }
    for (let i = 0; i < sampleCount; i++) {
        if (hasSampleDurations) {
            ioWriter.writeUint32(sampleDurations[i] || 0);
        }
        if (hasSampleSizes) {
            ioWriter.writeUint32(sampleSizes[i] || 0);
        }
        if (hasSampleFlags) {
            ioWriter.writeUint32(sampleFlags[i] || 0);
        }
        if (hasSampleCompositionTimeOffset) {
            ioWriter.writeInt32(sampleCompositionTimeOffset[i] || 0);
        }
    }
    movContext.boxsPositionInfo.push({
        pos,
        type: "trun" /* BoxType.TRUN */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/vmhd.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/vmhd.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/*
 * libmedia mp4 vmhd box write
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
function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(20);
    // tag
    ioWriter.writeString("vmhd" /* BoxType.VMHD */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(1);
    // reserved (graphics mode = copy)
    ioWriter.writeUint64(BigInt(0));
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/vpcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/vpcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 vpcc box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(12 + stream.codecpar.extradataSize ?? 0);
    // tag
    ioWriter.writeString("vpcC" /* BoxType.VPCC */);
    // version
    ioWriter.writeUint8(1);
    // flags
    ioWriter.writeUint24(0);
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/vvcc.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/vvcc.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/*
 * libmedia mp4 vvcc box write
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

function write(ioWriter, stream, movContext) {
    // size
    ioWriter.writeUint32(8 + stream.codecpar.extradataSize ?? 0);
    // tag
    ioWriter.writeString("vvcC" /* BoxType.VVCC */);
    // version
    ioWriter.writeUint8(0);
    // flags
    ioWriter.writeUint24(0);
    if (movContext.fragment) {
        if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
            ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
            delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    else {
        if (stream.codecpar.extradata) {
            ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/wave.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/mov/writing/wave.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _esds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./esds */ "./src/avformat/formats/mov/writing/esds.ts");
/*
 * libmedia mp4 wave box write
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


function write(ioWriter, stream, movContext) {
    const pos = ioWriter.getPos();
    // size
    ioWriter.writeUint32(0);
    // tag
    ioWriter.writeString("wave" /* BoxType.WAVE */);
    if (stream.codecpar.codecId !== 86035 /* AVCodecID.AV_CODEC_ID_QDM2 */) {
        ioWriter.writeUint32(12);
        ioWriter.writeString("frma" /* BoxType.FRMA */);
        ioWriter.writeUint32(stream.codecpar.codecTag);
    }
    if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
        // seless atom needed by mplayer, ipod, not needed by quicktime
        ioWriter.writeUint32(12);
        ioWriter.writeString("mp4a" /* BoxType.MP4A */);
        ioWriter.writeUint32(0);
        (0,_esds__WEBPACK_IMPORTED_MODULE_1__["default"])(ioWriter, stream, movContext);
    }
    else {
        if (movContext.fragment) {
            if (stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
                ioWriter.writeBuffer(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]);
                delete stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
            }
            else {
                if (stream.codecpar.extradata) {
                    ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
            }
        }
        else {
            if (stream.codecpar.extradata) {
                ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    // null tag
    ioWriter.writeUint32(8);
    ioWriter.writeUint32(0);
    movContext.boxsPositionInfo.push({
        pos,
        type: "wave" /* BoxType.WAVE */,
        size: Number(ioWriter.getPos() - pos)
    });
}


/***/ }),

/***/ "./src/avformat/formats/mov/writing/writers.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/formats/mov/writing/writers.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stts */ "./src/avformat/formats/mov/writing/stts.ts");
/* harmony import */ var _ctts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ctts */ "./src/avformat/formats/mov/writing/ctts.ts");
/* harmony import */ var _stss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stss */ "./src/avformat/formats/mov/writing/stss.ts");
/* harmony import */ var _stsz__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stsz */ "./src/avformat/formats/mov/writing/stsz.ts");
/* harmony import */ var _stsc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stsc */ "./src/avformat/formats/mov/writing/stsc.ts");
/* harmony import */ var _stco__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stco */ "./src/avformat/formats/mov/writing/stco.ts");
/* harmony import */ var _co64__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./co64 */ "./src/avformat/formats/mov/writing/co64.ts");
/* harmony import */ var _mdhd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mdhd */ "./src/avformat/formats/mov/writing/mdhd.ts");
/* harmony import */ var _mvhd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mvhd */ "./src/avformat/formats/mov/writing/mvhd.ts");
/* harmony import */ var _tkhd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tkhd */ "./src/avformat/formats/mov/writing/tkhd.ts");
/* harmony import */ var _hdlr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hdlr */ "./src/avformat/formats/mov/writing/hdlr.ts");
/* harmony import */ var _stsd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stsd */ "./src/avformat/formats/mov/writing/stsd.ts");
/* harmony import */ var _vmhd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./vmhd */ "./src/avformat/formats/mov/writing/vmhd.ts");
/* harmony import */ var _edts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./edts */ "./src/avformat/formats/mov/writing/edts.ts");
/* harmony import */ var _smhd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./smhd */ "./src/avformat/formats/mov/writing/smhd.ts");
/* harmony import */ var _dref__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dref */ "./src/avformat/formats/mov/writing/dref.ts");
/* harmony import */ var _trex__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./trex */ "./src/avformat/formats/mov/writing/trex.ts");
/* harmony import */ var _mfhd__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mfhd */ "./src/avformat/formats/mov/writing/mfhd.ts");
/* harmony import */ var _tfhd__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tfhd */ "./src/avformat/formats/mov/writing/tfhd.ts");
/* harmony import */ var _tfdt__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tfdt */ "./src/avformat/formats/mov/writing/tfdt.ts");
/* harmony import */ var _trun__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./trun */ "./src/avformat/formats/mov/writing/trun.ts");
/* harmony import */ var _minfHdlr__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./minfHdlr */ "./src/avformat/formats/mov/writing/minfHdlr.ts");
/*
 * libmedia mp4 box writers
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






















const writers = {
    ["stts" /* BoxType.STTS */]: _stts__WEBPACK_IMPORTED_MODULE_0__["default"],
    ["ctts" /* BoxType.CTTS */]: _ctts__WEBPACK_IMPORTED_MODULE_1__["default"],
    ["stss" /* BoxType.STSS */]: _stss__WEBPACK_IMPORTED_MODULE_2__["default"],
    ["stsz" /* BoxType.STSZ */]: _stsz__WEBPACK_IMPORTED_MODULE_3__["default"],
    ["stsc" /* BoxType.STSC */]: _stsc__WEBPACK_IMPORTED_MODULE_4__["default"],
    ["stco" /* BoxType.STCO */]: _stco__WEBPACK_IMPORTED_MODULE_5__["default"],
    ["co64" /* BoxType.CO64 */]: _co64__WEBPACK_IMPORTED_MODULE_6__["default"],
    ["mdhd" /* BoxType.MDHD */]: _mdhd__WEBPACK_IMPORTED_MODULE_7__["default"],
    ["mvhd" /* BoxType.MVHD */]: _mvhd__WEBPACK_IMPORTED_MODULE_8__["default"],
    ["tkhd" /* BoxType.TKHD */]: _tkhd__WEBPACK_IMPORTED_MODULE_9__["default"],
    ["hdlr" /* BoxType.HDLR */]: _hdlr__WEBPACK_IMPORTED_MODULE_10__["default"],
    ["stsd" /* BoxType.STSD */]: _stsd__WEBPACK_IMPORTED_MODULE_11__["default"],
    ["vmhd" /* BoxType.VMHD */]: _vmhd__WEBPACK_IMPORTED_MODULE_12__["default"],
    ["edts" /* BoxType.EDTS */]: _edts__WEBPACK_IMPORTED_MODULE_13__["default"],
    ["smhd" /* BoxType.SMHD */]: _smhd__WEBPACK_IMPORTED_MODULE_14__["default"],
    ["dref" /* BoxType.DREF */]: _dref__WEBPACK_IMPORTED_MODULE_15__["default"],
    ["trex" /* BoxType.TREX */]: _trex__WEBPACK_IMPORTED_MODULE_16__["default"],
    ["mfhd" /* BoxType.MFHD */]: _mfhd__WEBPACK_IMPORTED_MODULE_17__["default"],
    ["tfhd" /* BoxType.TFHD */]: _tfhd__WEBPACK_IMPORTED_MODULE_18__["default"],
    ["tfdt" /* BoxType.TFDT */]: _tfdt__WEBPACK_IMPORTED_MODULE_19__["default"],
    ["trun" /* BoxType.TRUN */]: _trun__WEBPACK_IMPORTED_MODULE_20__["default"],
    ["minf_hdlr" /* BoxType.MINF_HDLR */]: _minfHdlr__WEBPACK_IMPORTED_MODULE_21__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (writers);


/***/ }),

/***/ "./src/avformat/function/arrayItemSame.ts":
/*!************************************************!*\
  !*** ./src/avformat/function/arrayItemSame.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ arrayItemSame)
/* harmony export */ });
/*
 * libmedia array item is all same
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
function arrayItemSame(data, start = 0) {
    if (!data) {
        return false;
    }
    if (data.length < 2) {
        return true;
    }
    let first = data[start];
    let i = start + 1;
    for (; i < data.length; i++) {
        if (first !== data[i]) {
            break;
        }
    }
    return i === data.length;
}


/***/ }),

/***/ "./src/avformat/function/digital2Tag.ts":
/*!**********************************************!*\
  !*** ./src/avformat/function/digital2Tag.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ digital2Tag)
/* harmony export */ });
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/*
 * libmedia number to tag string
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

function digital2Tag(value, len = 4) {
    let tag = '';
    for (let i = 0; i < len; i++) {
        if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.number(value)) {
            tag = String.fromCharCode(value & 0xff) + tag;
            value >>>= 8;
        }
        else {
            tag = String.fromCharCode(Number(value & BigInt(0xff))) + tag;
            value >>= BigInt(8);
        }
    }
    return tag;
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

/***/ "./src/avformat/function/rewriteIO.ts":
/*!********************************************!*\
  !*** ./src/avformat/function/rewriteIO.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rewriteIO)
/* harmony export */ });
/*
 * libmedia rewrite value with pos
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
function rewriteIO(ioWriter, pos, value, type) {
    const nowPos = ioWriter.getPos();
    const pointer = ioWriter.getPointer();
    const minPos = nowPos - BigInt(Math.floor(pointer));
    let inline = false;
    if (pos < nowPos && pos >= minPos) {
        ioWriter.seekInline(pointer + Number(pos - nowPos));
        inline = true;
    }
    else {
        ioWriter.seek(pos);
    }
    switch (type) {
        case 'uint8':
            ioWriter.writeUint8((value & 0xff));
            break;
        case 'int8':
            ioWriter.writeInt8(value);
            break;
        case 'uint16':
            ioWriter.writeUint16((value & 0xffff));
            break;
        case 'int16':
            ioWriter.writeInt16(value);
            break;
        case 'uint32':
            ioWriter.writeUint32((value >>> 0));
            break;
        case 'int32':
            ioWriter.writeInt32(value);
            break;
        case 'uint64':
            ioWriter.writeUint64(BigInt.asUintN(64, value));
            break;
        case 'int64':
            ioWriter.writeInt64(value);
            break;
        case 'float':
            ioWriter.writeFloat(value);
            break;
        case 'double':
            ioWriter.writeDouble(value);
            break;
    }
    if (inline) {
        ioWriter.seekInline(pointer);
    }
    else {
        ioWriter.seek(nowPos);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OMovFormat_ts.avtranscoder.js.map