"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IVvcFormat_ts"],{

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

/***/ "./src/avformat/formats/IVvcFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IVvcFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IHevcFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var _nalu_NaluReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nalu/NaluReader */ "./src/avformat/formats/nalu/NaluReader.ts");














const DefaultIVvcFormatOptions = {
    framerate: {
        num: 30,
        den: 1
    }
};
class IHevcFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_3__["default"] {
    type = 10 /* AVFormat.HEVC */;
    options;
    currentDts;
    currentPts;
    step;
    slices;
    naluPos;
    queue;
    bitReader;
    sliceType;
    naluType;
    poc;
    pocTid0;
    sps;
    naluReader;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_7__.extend({}, DefaultIVvcFormatOptions, options);
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(false);
        }
        this.slices = [];
        this.queue = [];
        this.bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_11__["default"](500);
        this.naluReader = new _nalu_NaluReader__WEBPACK_IMPORTED_MODULE_13__["default"]();
    }
    destroy(formatContext) {
        if (this.queue.length) {
            for (let i = 0; i < this.queue.length; i++) {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(this.queue[i].avpacket);
            }
            this.queue.length = 0;
        }
    }
    isFrameNalu(data) {
        const type = (data[(data[2] === 1 ? 4 : 5)] >>> 3) & 0x1f;
        return type < 12 /* vvc.VVCNaluType.kOPI_NUT */;
    }
    async readNaluFrame(formatContext) {
        let hasFrame = false;
        const nalus = this.slices;
        this.slices = [];
        if (nalus.length) {
            hasFrame = this.isFrameNalu(nalus[0]);
        }
        while (true) {
            const next = await this.naluReader.read(formatContext.ioReader);
            if (!next) {
                return nalus;
            }
            const type = (next[(next[2] === 1 ? 4 : 5)] >>> 3) & 0x1f;
            if (this.isFrameNalu(next)) {
                if (hasFrame) {
                    const hasPh = next[next[2] === 1 ? 5 : 6] >>> 7;
                    if (hasPh) {
                        this.slices.push(next);
                        return nalus;
                    }
                    else {
                        nalus.push(next);
                    }
                }
                else {
                    nalus.push(next);
                    hasFrame = true;
                }
            }
            else if (hasFrame
                && (type === 20 /* vvc.VVCNaluType.kAUD_NUT */
                    || type === 19 /* vvc.VVCNaluType.kPH_NUT */
                    || type === 15 /* vvc.VVCNaluType.kSPS_NUT */
                    || type === 14 /* vvc.VVCNaluType.kVPS_NUT */
                    || type === 16 /* vvc.VVCNaluType.kPPS_NUT */
                    || type === 12 /* vvc.VVCNaluType.kOPI_NUT */
                    || type === 13 /* vvc.VVCNaluType.kDCI_NUT */)) {
                this.slices.push(next);
                return nalus;
            }
            else {
                nalus.push(next);
            }
        }
    }
    async readHeader(formatContext) {
        const stream = formatContext.createStream();
        stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
        stream.codecpar.codecId = 196 /* AVCodecID.AV_CODEC_ID_VVC */;
        stream.timeBase.den = avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE;
        stream.timeBase.num = 1;
        stream.codecpar.bitFormat = 2 /* BitFormat.ANNEXB */;
        this.currentDts = BigInt(0);
        this.currentPts = BigInt(0);
        this.naluPos = BigInt(0);
        this.poc = 0;
        this.pocTid0 = 0;
        this.step = BigInt(Math.floor((avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE / this.options.framerate.num * this.options.framerate.den)));
        while (true) {
            const slices = await this.readNaluFrame(formatContext);
            if (!slices.length) {
                return -1048576 /* IOError.END */;
            }
            const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_8__["default"])(Uint8Array, slices);
            const extradata = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_8__["default"])(Uint8Array, slices.filter((n) => {
                const type = (n[(n[2] === 1 ? 4 : 5)] >>> 3) & 0x1f;
                return type === 14 /* vvc.VVCNaluType.kVPS_NUT */
                    || type === 15 /* vvc.VVCNaluType.kSPS_NUT */
                    || type === 16 /* vvc.VVCNaluType.kPPS_NUT */;
            }));
            if (extradata) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
                stream.codecpar.extradataSize = extradata.length;
                const sps = slices.find((n) => {
                    const type = (n[(n[2] === 1 ? 4 : 5)] >>> 3) & 0x1f;
                    return type === 15 /* vvc.VVCNaluType.kSPS_NUT */;
                });
                _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__.parseAVCodecParametersBySps(stream, sps);
                this.sps = _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__.parseSPS(sps);
                const avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.createAVPacket)();
                const dataP = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(data.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.memcpyFromUint8Array)(dataP, data.length, data);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.addAVPacketData)(avpacket, dataP, data.length);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, this.naluPos);
                this.naluPos += BigInt(Math.floor(data.length));
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, this.currentDts);
                this.currentDts += this.step;
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, this.currentPts);
                this.currentPts += this.step;
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 2 /* BitFormat.ANNEXB */);
                formatContext.interval.packetBuffer.push(avpacket);
                break;
            }
            this.naluPos += BigInt(Math.floor(data.length));
        }
        return 0;
    }
    computePoc(naluType, temporalId, ph, sliceHeader) {
        /* eslint-disable camelcase */
        this.bitReader.reset();
        this.bitReader.appendBuffer(ph.subarray(0, 500));
        if (sliceHeader) {
            // sh_picture_header_in_slice_header_flag
            this.bitReader.readU1();
        }
        const ph_gdr_or_irap_pic_flag = this.bitReader.readU1();
        const ph_non_ref_pic_flag = this.bitReader.readU1();
        let ph_gdr_pic_flag = 0;
        if (ph_gdr_or_irap_pic_flag) {
            ph_gdr_pic_flag = this.bitReader.readU1();
        }
        const ph_inter_slice_allowed_flag = this.bitReader.readU1();
        if (ph_inter_slice_allowed_flag) {
            // ph_intra_slice_allowed_flag
            this.bitReader.readU1();
        }
        // ph_pic_parameter_set_id
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
        const poc_lsb = this.bitReader.readU(this.sps.sps_log2_max_pic_order_cnt_lsb_minus4 + 4);
        if (ph_gdr_pic_flag) {
            // ph_recovery_poc_cnt
            avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
        }
        for (let i = 0; i < this.sps.sps_num_extra_ph_bytes * 8; i++) {
            if (this.sps.sps_extra_ph_bit_present_flag[i]) {
                this.bitReader.readU1();
            }
        }
        let ph_poc_msb_cycle_val = 0;
        let ph_poc_msb_cycle_present_flag = 0;
        if (this.sps.sps_poc_msb_cycle_flag) {
            ph_poc_msb_cycle_present_flag = this.bitReader.readU1();
            if (ph_poc_msb_cycle_present_flag) {
                ph_poc_msb_cycle_val = this.bitReader.readU(this.sps.sps_poc_msb_cycle_len_minus1 + 1);
            }
        }
        const max_poc_lsb = 1 << (this.sps.sps_log2_max_pic_order_cnt_lsb_minus4 + 4);
        let poc_msb = 0;
        if (naluType === 8 /* vvc.VVCNaluType.kIDR_N_LP */
            || naluType === 7 /* vvc.VVCNaluType.kIDR_W_RADL */) {
            if (ph_poc_msb_cycle_present_flag) {
                poc_msb = ph_poc_msb_cycle_val * max_poc_lsb;
            }
            else {
                poc_msb = 0;
            }
        }
        else {
            const prev_poc = this.pocTid0;
            const prev_poc_lsb = prev_poc & (max_poc_lsb - 1);
            const prev_poc_msb = prev_poc - prev_poc_lsb;
            if (ph_poc_msb_cycle_present_flag) {
                poc_msb = ph_poc_msb_cycle_val * max_poc_lsb;
            }
            else {
                if ((poc_lsb < prev_poc_lsb)
                    && ((prev_poc_lsb - poc_lsb) >= (max_poc_lsb / 2))) {
                    poc_msb = prev_poc_msb + max_poc_lsb;
                }
                else if ((poc_lsb > prev_poc_lsb)
                    && ((poc_lsb - prev_poc_lsb) > (max_poc_lsb / 2))) {
                    poc_msb = prev_poc_msb - max_poc_lsb;
                }
                else {
                    poc_msb = prev_poc_msb;
                }
            }
        }
        this.poc = poc_msb + poc_lsb;
        if (temporalId == 0
            && !ph_non_ref_pic_flag
            && naluType !== 2 /* vvc.VVCNaluType.kRADL_NUT */
            && naluType !== 3 /* vvc.VVCNaluType.kRASL_NUT */) {
            this.pocTid0 = this.poc;
        }
        /* eslint-enable camelcase */
    }
    async readAVPacket_(formatContext, avpacket) {
        const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        const nalus = await this.readNaluFrame(formatContext);
        if (!nalus.length) {
            return -1048576 /* IOError.END */;
        }
        this.sliceType = -1 /* vvc.VVCSliceType.kSliceNone */;
        let isKey = false;
        let isFirst = true;
        nalus.forEach((n) => {
            const header = n[2] === 1 ? n[4] : n[5];
            const type = (header >>> 3) & 0x1f;
            const temporalId = (header & 0x07) - 1;
            if (type === 15 /* vvc.VVCNaluType.kSPS_NUT */) {
                this.sps = _codecs_vvc__WEBPACK_IMPORTED_MODULE_9__.parseSPS(n);
            }
            if (type === 8 /* vvc.VVCNaluType.kIDR_N_LP */
                || type === 7 /* vvc.VVCNaluType.kIDR_W_RADL */) {
                isKey = true;
            }
            if (type === 19 /* vvc.VVCNaluType.kPH_NUT */) {
                this.computePoc(type, temporalId, n.subarray(n[2] === 1 ? 5 : 6), false);
            }
            if (type < 14 /* vvc.VVCNaluType.kVPS_NUT */ && isFirst) {
                isFirst = false;
                this.naluType = type;
                const hasPh = n[n[2] === 1 ? 5 : 6] >>> 7;
                if (hasPh) {
                    this.computePoc(type, temporalId, n.subarray(n[2] === 1 ? 5 : 6), true);
                }
            }
        });
        const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_8__["default"])(Uint8Array, nalus);
        const dataP = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(data.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.memcpyFromUint8Array)(dataP, data.length, data);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.addAVPacketData)(avpacket, dataP, data.length);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, this.naluPos);
        this.naluPos += BigInt(Math.floor(data.length));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, this.currentDts);
        this.currentDts += this.step;
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 2 /* BitFormat.ANNEXB */);
        if (isKey) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        let ipFrameCount = this.queue.length;
        const output = () => {
            if (this.queue.length > 1) {
                this.queue.sort((a, b) => {
                    return a.poc - b.poc > 0 ? 1 : -1;
                });
            }
            for (let i = 0; i < this.queue.length; i++) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](this.queue[i].avpacket + 8, this.currentPts);
                this.currentPts += this.step;
            }
            if (this.queue.length > 1) {
                this.queue.sort((a, b) => {
                    return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](a.avpacket + 16) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](b.avpacket + 16) > BigInt(0) ? 1 : -1;
                });
            }
            if (this.queue.length) {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.refAVPacket)(avpacket, this.queue[0].avpacket);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(this.queue[0].avpacket);
            }
            for (let i = 1; i < this.queue.length; i++) {
                formatContext.interval.packetBuffer.push(this.queue[i].avpacket);
            }
            this.queue.length = 0;
        };
        while (true) {
            const next = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.createAVPacket)();
            let ret = await this.readAVPacket_(formatContext, next);
            if (ret < 0) {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(next);
                if (this.queue.length) {
                    output();
                    return 0;
                }
                else {
                    return ret;
                }
            }
            if ((cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](next + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)
                || this.naluType === 9 /* vvc.VVCNaluType.kCRA_NUT */
                || (this.sliceType === 1 /* vvc.VVCSliceType.kSliceP */
                    || this.sliceType === 2 /* vvc.VVCSliceType.kSliceI */)) {
                if (ipFrameCount === 1
                    || (this.naluType === 9 /* vvc.VVCNaluType.kCRA_NUT */
                        || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](next + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */))
                        && this.queue.length) {
                    output();
                    this.queue.push({
                        avpacket: next,
                        poc: this.poc
                    });
                    return 0;
                }
                else {
                    this.queue.push({
                        avpacket: next,
                        poc: this.poc
                    });
                    ipFrameCount++;
                }
            }
            else {
                this.queue.push({
                    avpacket: next,
                    poc: this.poc
                });
            }
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_2__.FORMAT_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ }),

/***/ "./src/avformat/formats/nalu/NaluReader.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/nalu/NaluReader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NaluReader)
/* harmony export */ });
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/*
 * libmedia NaluReader
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


class NaluReader {
    buffer;
    pos;
    end;
    ended;
    constructor() {
        this.buffer = new Uint8Array(102400);
        this.pos = 0;
        this.end = 0;
        this.ended = false;
    }
    async read(ioReader) {
        if (this.ended && this.pos >= this.end) {
            return;
        }
        const slices = [];
        if (this.pos < this.end - 4) {
            let next = avutil_util_nalu__WEBPACK_IMPORTED_MODULE_0__.getNextNaluStart(this.buffer.subarray(this.pos, this.end - 4), 3);
            if (next.offset > -1) {
                const nalu = this.buffer.slice(this.pos, this.pos + next.offset);
                this.pos += next.offset;
                return nalu;
            }
            else {
                slices.push(this.buffer.slice(this.pos, this.end - 4));
                this.buffer.copyWithin(0, this.end - 4, this.end);
                this.pos = 0;
                this.end = 4;
            }
        }
        while (true) {
            if (!this.ended && this.end < this.buffer.length) {
                try {
                    const len = await ioReader.readToBuffer(this.buffer.length - this.end, this.buffer.subarray(this.end));
                    this.end += len;
                }
                catch (error) {
                    this.ended = true;
                    if (this.pos >= this.end) {
                        return slices.length ? (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, slices) : null;
                    }
                }
            }
            let next = avutil_util_nalu__WEBPACK_IMPORTED_MODULE_0__.getNextNaluStart(this.buffer.subarray(this.pos, this.end - 4), slices.length ? 0 : 3);
            if (next.offset > -1) {
                slices.push(this.buffer.slice(this.pos, this.pos + next.offset));
                this.pos += next.offset;
                return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, slices);
            }
            else {
                if (this.ended) {
                    slices.push(this.buffer.slice(this.pos, this.end));
                    this.pos = this.end = 0;
                    return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, slices);
                }
                else {
                    slices.push(this.buffer.slice(this.pos, this.end - 4));
                    this.buffer.copyWithin(0, this.end - 4, this.end);
                    this.pos = 0;
                    this.end = 4;
                }
            }
        }
    }
    reset() {
        this.pos = 0;
        this.end = 0;
        this.ended = false;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IVvcFormat_ts.avtranscoder.js.map