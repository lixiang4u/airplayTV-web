"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OFlvFormat_ts"],{

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

/***/ "./src/avformat/formats/OFlvFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OFlvFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OFlvFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flv/FlvHeader */ "./src/avformat/formats/flv/FlvHeader.ts");
/* harmony import */ var _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./flv/FlvScriptTag */ "./src/avformat/formats/flv/FlvScriptTag.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _flv_flv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./flv/flv */ "./src/avformat/formats/flv/flv.ts");
/* harmony import */ var _flv_oflv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./flv/oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var _flv_codecs_aac__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./flv/codecs/aac */ "./src/avformat/formats/flv/codecs/aac.ts");
/* harmony import */ var _flv_codecs_h264__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./flv/codecs/h264 */ "./src/avformat/formats/flv/codecs/h264.ts");
/* harmony import */ var _flv_codecs_enhanced__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./flv/codecs/enhanced */ "./src/avformat/formats/flv/codecs/enhanced.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../bsf/h2645/Annexb2AvccFilter */ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\OFlvFormat.ts";




/*
 * libmedia flv encoder
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

















class OFlvFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 0 /* AVFormat.FLV */;
    context;
    header;
    script;
    options;
    annexb2AvccFilter;
    constructor(options = {}) {
        super();
        this.header = new _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.script = new _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_6__["default"]();
        this.options = options;
        this.context = {
            keyframeFilePositions: [],
            keyFrameTimes: [],
            lastkeyframelocation: 0,
            lastkeyframetimestamp: BigInt(0),
            lasttimestamp: BigInt(0),
            framerate: 0,
            filesize: 0,
            audioSize: 0,
            videosize: 0,
            datasize: 0,
            duration: 0,
            scriptWrote: false,
            frameCount: 0,
            firstKeyframePositionWrote: false,
            videoMetadataWrote: false
        };
    }
    init(formatContext) {
        if (formatContext.ioWriter) {
            formatContext.ioWriter.setEndian(true);
        }
        const audioStream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        const videoStream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        if (audioStream) {
            this.header.hasAudio = true;
            this.script.onMetaData.hasAudio = true;
            if (audioStream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                if (audioStream.codecpar.sampleRate !== 16000) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_16__.fatal('flv speex only support 16000 sample rate', cheap__fileName__0, 114);
                }
                if (audioStream.codecpar.chLayout.nbChannels !== 1) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_16__.fatal('flv speex only support 1 channel', cheap__fileName__0, 117);
                }
            }
            if (common_util_object__WEBPACK_IMPORTED_MODULE_8__.has(_flv_flv__WEBPACK_IMPORTED_MODULE_9__.AVCodecID2FlvCodecType, audioStream.codecpar.codecId)) {
                this.script.onMetaData.audiocodecid = _flv_flv__WEBPACK_IMPORTED_MODULE_9__.AVCodecID2FlvCodecType[audioStream.codecpar.codecId];
                this.script.onMetaData.stereo = audioStream.codecpar.chLayout.nbChannels > 1 ? true : false;
                this.script.onMetaData.audiosamplerate = audioStream.codecpar.sampleRate || 0;
                this.script.onMetaData.audiosamplesize = audioStream.codecpar.frameSize || 0;
            }
            audioStream.timeBase.den = 1000;
            audioStream.timeBase.num = 1;
        }
        if (videoStream) {
            this.header.hasVideo = true;
            this.script.onMetaData.hasVideo = true;
            if (common_util_object__WEBPACK_IMPORTED_MODULE_8__.has(_flv_flv__WEBPACK_IMPORTED_MODULE_9__.AVCodecID2FlvCodecType, videoStream.codecpar.codecId)) {
                this.script.onMetaData.videocodecid = _flv_flv__WEBPACK_IMPORTED_MODULE_9__.AVCodecID2FlvCodecType[videoStream.codecpar.codecId];
                this.script.onMetaData.width = videoStream.codecpar.width || 0;
                this.script.onMetaData.height = videoStream.codecpar.height || 0;
                this.script.onMetaData.framerate = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avQ2D)(videoStream.codecpar.framerate);
            }
            videoStream.timeBase.den = 1000;
            videoStream.timeBase.num = 1;
            this.annexb2AvccFilter = new _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_19__["default"]();
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
    writeHeader(formatContext) {
        this.header.write(formatContext.ioWriter);
        // previousTagSize0 总是 0
        formatContext.ioWriter.writeUint32(0);
        if (this.options.live) {
            this.script.write(formatContext.ioWriter);
            this.context.scriptWrote = true;
        }
        const audioStream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        const videoStream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        if (audioStream && audioStream.codecpar.extradata) {
            if (audioStream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                const length = _flv_codecs_aac__WEBPACK_IMPORTED_MODULE_11__.writeExtradata(formatContext.ioWriter, audioStream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(audioStream.codecpar.extradata, audioStream.codecpar.extradataSize));
                this.context.filesize += length + 4;
                this.context.audioSize += audioStream.codecpar.extradataSize;
                this.context.datasize += audioStream.codecpar.extradataSize;
            }
            this.script.onMetaData.hasMetadata = true;
        }
        if (videoStream && videoStream.codecpar.extradata) {
            if (videoStream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || videoStream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || videoStream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                || videoStream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                || videoStream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */
                || videoStream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                const now = formatContext.ioWriter.getPos();
                const usdEnhanced = videoStream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || videoStream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || videoStream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                    || videoStream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
                const length = usdEnhanced
                    ? _flv_codecs_enhanced__WEBPACK_IMPORTED_MODULE_13__.writeExtradata(formatContext.ioWriter, videoStream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(videoStream.codecpar.extradata, videoStream.codecpar.extradataSize), 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)
                    : _flv_codecs_h264__WEBPACK_IMPORTED_MODULE_12__.writeExtradata(formatContext.ioWriter, videoStream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(videoStream.codecpar.extradata, videoStream.codecpar.extradataSize), 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                this.context.filesize += length + 4;
                this.context.videosize += videoStream.codecpar.extradataSize;
                this.context.datasize += videoStream.codecpar.extradataSize;
                this.context.keyFrameTimes.push(0);
                this.context.keyframeFilePositions.push(Number(now));
                this.context.videoMetadataWrote = true;
            }
            this.script.onMetaData.hasMetadata = true;
        }
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_16__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 235);
            return;
        }
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            // 如果有 metadata，先写 metadata 为一个 tag
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_17__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element) {
                const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](element + 4));
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    _flv_codecs_aac__WEBPACK_IMPORTED_MODULE_11__.writeExtradata(formatContext.ioWriter, stream, extradata);
                }
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
                const now = formatContext.ioWriter.getPos();
                _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeTagHeader(formatContext.ioWriter, 8 /* FlvTag.AUDIO */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) + 1 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[stream.codecpar.codecId], (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase));
                _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeAudioTagDataHeader(formatContext.ioWriter, stream);
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    _flv_codecs_aac__WEBPACK_IMPORTED_MODULE_11__.writeDataHeader(formatContext.ioWriter, 1 /* flvAAC.AACPacketType.AAC_RAW */);
                }
                formatContext.ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)));
                const previousTagSize = Number(formatContext.ioWriter.getPos() - now);
                formatContext.ioWriter.writeUint32(previousTagSize);
                this.context.audioSize += previousTagSize;
                this.context.filesize += previousTagSize + 4;
                this.context.lasttimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
                this.context.datasize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) || 0;
            }
        }
        else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if ((stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 80) !== 1 /* BitFormat.AVCC */) {
                this.annexb2AvccFilter.sendAVPacket(avpacket);
                this.annexb2AvccFilter.receiveAVPacket(avpacket);
            }
            const keyframePos = formatContext.ioWriter.getPos();
            // 如果有 extradata，先写 extradata 为一个 tag
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_17__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element) {
                const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](element + 4));
                if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                    _flv_codecs_h264__WEBPACK_IMPORTED_MODULE_12__.writeExtradata(formatContext.ioWriter, stream, extradata, 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
                else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                    || stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                    _flv_codecs_enhanced__WEBPACK_IMPORTED_MODULE_13__.writeExtradata(formatContext.ioWriter, stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize), 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
                const now = formatContext.ioWriter.getPos();
                if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                    || stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                    const packetType = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8)
                        && (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                            || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)
                        ? 1 /* PacketTypeExt.PacketTypeCodedFrames */
                        : 3 /* PacketTypeExt.PacketTypeCodedFramesX */;
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeTagHeader(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) + 1 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[stream.codecpar.codecId]
                        + (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */ ? 3 : 0), (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase));
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeVideoTagExtDataHeader(formatContext.ioWriter, stream, packetType, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36));
                    _flv_codecs_enhanced__WEBPACK_IMPORTED_MODULE_13__.writeCodecTagHeader(formatContext.ioWriter, stream.codecpar.codecId);
                    if (packetType === 1 /* PacketTypeExt.PacketTypeCodedFrames */) {
                        let ct = 0;
                        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_20__.NOPTS_VALUE_BIGINT) {
                            ct = (Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) & 0xffffffffn) >> 0);
                        }
                        formatContext.ioWriter.writeUint24(ct);
                    }
                }
                else {
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeTagHeader(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) + 1 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[stream.codecpar.codecId], (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase));
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                        _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeVideoTagDataHeader(formatContext.ioWriter, stream, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36));
                        let ct = 0;
                        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_20__.NOPTS_VALUE_BIGINT) {
                            ct = (Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) & 0xffffffffn) >> 0);
                        }
                        _flv_codecs_h264__WEBPACK_IMPORTED_MODULE_12__.writeDataHeader(formatContext.ioWriter, 1 /* AVCPacketType.AVC_NALU */, ct);
                    }
                }
                formatContext.ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_15__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)));
                const previousTagSize = Number(formatContext.ioWriter.getPos() - now);
                formatContext.ioWriter.writeUint32(previousTagSize);
                this.context.videosize += previousTagSize;
                this.context.filesize += previousTagSize + 4;
                this.context.lasttimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
                this.context.datasize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) || 0;
                this.context.frameCount++;
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                    if (this.context.firstKeyframePositionWrote || !this.context.videoMetadataWrote) {
                        this.context.lastkeyframetimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
                        this.context.lastkeyframelocation = Number(keyframePos);
                        this.context.keyFrameTimes.push(Number((Number(this.context.lastkeyframetimestamp) * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_18__.avQ2D)(stream.timeBase)).toFixed(2)));
                        this.context.keyframeFilePositions.push(this.context.lastkeyframelocation);
                    }
                    else {
                        this.context.firstKeyframePositionWrote = true;
                    }
                }
            }
        }
        return 0;
    }
    writeTrailer(formatContext) {
        const videoStream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        if (videoStream
            && (videoStream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || videoStream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || videoStream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                || videoStream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                || videoStream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */
                || videoStream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */)) {
            const usdEnhanced = videoStream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || videoStream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                || videoStream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
                || videoStream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
            _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeTagHeader(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, 1 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[videoStream.codecpar.codecId], BigInt(0));
            if (usdEnhanced) {
                _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeVideoTagExtDataHeader(formatContext.ioWriter, videoStream, 2 /* PacketTypeExt.PacketTypeSequenceEnd */, 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                _flv_codecs_enhanced__WEBPACK_IMPORTED_MODULE_13__.writeCodecTagHeader(formatContext.ioWriter, videoStream.codecpar.codecId);
            }
            else {
                _flv_oflv__WEBPACK_IMPORTED_MODULE_10__.writeVideoTagDataHeader(formatContext.ioWriter, videoStream, 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                _flv_codecs_h264__WEBPACK_IMPORTED_MODULE_12__.writeDataHeader(formatContext.ioWriter, 2 /* AVCPacketType.AVC_END_OF_ENQUENCE */, 0);
            }
            formatContext.ioWriter.writeUint32(12 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[videoStream.codecpar.codecId]);
            this.context.videosize += 12 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[videoStream.codecpar.codecId];
            this.context.filesize += 12 + _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvCodecHeaderLength[videoStream.codecpar.codecId] + 4;
            this.script.onMetaData.canSeekToEnd = true;
        }
        if (!this.context.scriptWrote) {
            formatContext.ioWriter.flush();
            this.script.onMetaData.filesize = this.context.filesize;
            this.script.onMetaData.audiosize = this.context.audioSize;
            this.script.onMetaData.videosize = this.context.videosize;
            this.script.onMetaData.datasize = this.context.datasize;
            this.script.onMetaData.lasttimestamp = this.context.lasttimestamp;
            if (this.options.hasKeyframes) {
                this.script.onMetaData.lastkeyframetimestamp = this.context.lastkeyframetimestamp;
                this.script.onMetaData.lastkeyframelocation = this.context.lastkeyframelocation;
                if (this.context.keyFrameTimes.length > 1) {
                    this.script.onMetaData.hasKeyframes = true;
                    this.script.onMetaData.keyframes = {
                        filepositions: this.context.keyframeFilePositions,
                        times: this.context.keyFrameTimes
                    };
                }
                else {
                    this.script.onMetaData.hasKeyframes = false;
                }
            }
            else {
                this.script.onMetaData.hasKeyframes = false;
            }
            this.script.onMetaData.duration = Number((Number(this.context.lasttimestamp) / 1000).toFixed(2));
            this.script.onMetaData.audiodatarate = Number((this.context.audioSize / this.script.onMetaData.duration / 1000).toFixed(2));
            this.script.onMetaData.videodatarate = Number((this.context.videosize / this.script.onMetaData.duration / 1000).toFixed(2));
            this.script.onMetaData.framerate = Math.floor(this.context.frameCount / this.script.onMetaData.duration);
            const size = this.script.computeSize();
            common_util_array__WEBPACK_IMPORTED_MODULE_7__.each(this.context.keyframeFilePositions, (item, index) => {
                this.context.keyframeFilePositions[index] = item + 11 + size + 4;
            });
            if (this.script.onMetaData.keyframes) {
                this.script.onMetaData.keyframes.filepositions = this.context.keyframeFilePositions;
            }
            this.context.filesize += 11 + size + 4;
            this.script.onMetaData.filesize = this.context.filesize;
            const buffers = [];
            const oldFlush = formatContext.ioWriter.onFlush;
            formatContext.ioWriter.onFlush = (buffer) => {
                buffers.push(buffer.slice());
                return 0;
            };
            this.script.write(formatContext.ioWriter);
            formatContext.ioWriter.flush();
            formatContext.ioWriter.onFlush = oldFlush;
            const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_14__["default"])(Uint8Array, buffers);
            if (oldFlush) {
                oldFlush(data, BigInt(13));
            }
        }
        else {
            formatContext.ioWriter.flush();
        }
        return 0;
    }
    flush(context) {
        context.ioWriter.flush();
        return 0;
    }
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

/***/ "./src/avformat/formats/flv/codecs/aac.ts":
/*!************************************************!*\
  !*** ./src/avformat/formats/flv/codecs/aac.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeDataHeader: () => (/* binding */ writeDataHeader),
/* harmony export */   writeExtradata: () => (/* binding */ writeExtradata)
/* harmony export */ });
/* harmony import */ var _oflv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var _flv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flv */ "./src/avformat/formats/flv/flv.ts");
/*
 * libmedia flv aac util
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


function writeDataHeader(ioWriter, type) {
    ioWriter.writeUint8(type);
}
function writeExtradata(ioWriter, stream, metadata) {
    const now = ioWriter.getPos();
    _oflv__WEBPACK_IMPORTED_MODULE_0__.writeTagHeader(ioWriter, 8 /* FlvTag.AUDIO */, metadata.length + 1 + _flv__WEBPACK_IMPORTED_MODULE_1__.FlvCodecHeaderLength[86018 /* AVCodecID.AV_CODEC_ID_AAC */], BigInt(0));
    // tag header
    _oflv__WEBPACK_IMPORTED_MODULE_0__.writeAudioTagDataHeader(ioWriter, stream);
    // tag body
    writeDataHeader(ioWriter, 0 /* AACPacketType.AAC_SEQUENCE_HEADER */);
    ioWriter.writeBuffer(metadata);
    const length = Number(ioWriter.getPos() - now);
    ioWriter.writeUint32(length);
    return length;
}


/***/ }),

/***/ "./src/avformat/formats/flv/codecs/enhanced.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/formats/flv/codecs/enhanced.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeCodecTagHeader: () => (/* binding */ writeCodecTagHeader),
/* harmony export */   writeExtradata: () => (/* binding */ writeExtradata)
/* harmony export */ });
/* harmony import */ var _oflv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var _flv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flv */ "./src/avformat/formats/flv/flv.ts");
/*
 * libmedia flv enhanced util
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



function writeCodecTagHeader(ioWriter, codecId) {
    switch (codecId) {
        case 173 /* AVCodecID.AV_CODEC_ID_HEVC */:
            ioWriter.writeString('hvc1');
            break;
        case 196 /* AVCodecID.AV_CODEC_ID_VVC */:
            ioWriter.writeString('vvc1');
            break;
        case 167 /* AVCodecID.AV_CODEC_ID_VP9 */:
            ioWriter.writeString('vp09');
            break;
        case 225 /* AVCodecID.AV_CODEC_ID_AV1 */:
            ioWriter.writeString('av01');
            break;
    }
}
/**
 * 写 extradata 数据
 *
 * @param ioWriter
 * @param stream
 * @param data
 * @param metadata
 */
function writeExtradata(ioWriter, stream, metadata, flags) {
    const now = ioWriter.getPos();
    _oflv__WEBPACK_IMPORTED_MODULE_0__.writeTagHeader(ioWriter, 9 /* FlvTag.VIDEO */, metadata.length + 1 + _flv__WEBPACK_IMPORTED_MODULE_1__.FlvCodecHeaderLength[stream.codecpar.codecId], BigInt(0));
    (0,_oflv__WEBPACK_IMPORTED_MODULE_0__.writeVideoTagExtDataHeader)(ioWriter, stream, 0 /* PacketTypeExt.PacketTypeSequenceStart */, flags);
    writeCodecTagHeader(ioWriter, stream.codecpar.codecId);
    ioWriter.writeBuffer(metadata);
    const length = Number(ioWriter.getPos() - now);
    ioWriter.writeUint32(length);
    return length;
}


/***/ }),

/***/ "./src/avformat/formats/flv/codecs/h264.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/flv/codecs/h264.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeDataHeader: () => (/* binding */ writeDataHeader),
/* harmony export */   writeExtradata: () => (/* binding */ writeExtradata)
/* harmony export */ });
/* harmony import */ var _oflv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var _flv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../flv */ "./src/avformat/formats/flv/flv.ts");
/*
 * libmedia flv h264 util
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


function writeDataHeader(ioWriter, type, ct) {
    ioWriter.writeUint8(type);
    ioWriter.writeUint24(ct);
}
/**
 * 写 extradata 数据
 *
 * @param ioWriter
 * @param stream
 * @param data
 * @param metadata
 */
function writeExtradata(ioWriter, stream, metadata, flags) {
    const now = ioWriter.getPos();
    _oflv__WEBPACK_IMPORTED_MODULE_0__.writeTagHeader(ioWriter, 9 /* FlvTag.VIDEO */, metadata.length + 1 + _flv__WEBPACK_IMPORTED_MODULE_1__.FlvCodecHeaderLength[27 /* AVCodecID.AV_CODEC_ID_H264 */], BigInt(0));
    _oflv__WEBPACK_IMPORTED_MODULE_0__.writeVideoTagDataHeader(ioWriter, stream, flags);
    writeDataHeader(ioWriter, 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */, 0);
    ioWriter.writeBuffer(metadata);
    const length = Number(ioWriter.getPos() - now);
    ioWriter.writeUint32(length);
    return length;
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
//# sourceMappingURL=src_avformat_formats_OFlvFormat_ts.avtranscoder.js.map