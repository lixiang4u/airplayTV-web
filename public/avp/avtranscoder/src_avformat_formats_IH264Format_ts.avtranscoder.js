"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IH264Format_ts"],{

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

/***/ "./src/avformat/formats/IH264Format.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IH264Format.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IH264Format)
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
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var _nalu_NaluReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nalu/NaluReader */ "./src/avformat/formats/nalu/NaluReader.ts");














const DefaultIH264FormatOptions = {
    framerate: {
        num: 30,
        den: 1
    }
};
class IH264Format extends _IFormat__WEBPACK_IMPORTED_MODULE_3__["default"] {
    type = 8 /* AVFormat.H264 */;
    options;
    currentDts;
    currentPts;
    step;
    slices;
    naluPos;
    queue;
    bitReader;
    sliceType;
    poc;
    picOrderCntMsb;
    lastPicOrderCntLsb;
    frameNumberOffset;
    prevFrameNumber;
    sps;
    naluReader;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_7__.extend({}, DefaultIH264FormatOptions, options);
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(false);
        }
        this.slices = [];
        this.queue = [];
        this.bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_11__["default"](50);
        this.naluReader = new _nalu_NaluReader__WEBPACK_IMPORTED_MODULE_13__["default"]();
    }
    isFrameNalu(data) {
        const type = data[(data[2] === 1 ? 3 : 4)] & 0x1f;
        return type === 1 /* h264.H264NaluType.kSliceNonIDR */
            || type === 5 /* h264.H264NaluType.kSliceIDR */
            || type === 2 /* h264.H264NaluType.kSliceDPA */
            || type === 3 /* h264.H264NaluType.kSliceDPB */
            || type === 4 /* h264.H264NaluType.kSliceDPC */;
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
            const type = next[(next[2] === 1 ? 3 : 4)] & 0x1f;
            if (this.isFrameNalu(next)) {
                if (hasFrame) {
                    this.bitReader.clear();
                    this.bitReader.appendBuffer(next.subarray(next[2] === 1 ? 4 : 5, 10));
                    const firstMbInSlice = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                    if (firstMbInSlice === 0) {
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
                && (type === 9 /* h264.H264NaluType.kSliceAUD */
                    || type === 7 /* h264.H264NaluType.kSliceSPS */
                    || type === 8 /* h264.H264NaluType.kSlicePPS */)) {
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
        stream.codecpar.codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
        stream.timeBase.den = avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE;
        stream.timeBase.num = 1;
        stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
        this.currentDts = BigInt(0);
        this.currentPts = BigInt(0);
        this.naluPos = BigInt(0);
        this.poc = BigInt(0);
        this.picOrderCntMsb = BigInt(0);
        this.lastPicOrderCntLsb = 0;
        this.frameNumberOffset = BigInt(0);
        this.prevFrameNumber = 0;
        this.step = BigInt(Math.floor((avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_TIME_BASE / this.options.framerate.num * this.options.framerate.den)));
        while (true) {
            const slices = await this.readNaluFrame(formatContext);
            if (!slices.length) {
                return -1048576 /* IOError.END */;
            }
            const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_8__["default"])(Uint8Array, slices);
            const extradata = _codecs_h264__WEBPACK_IMPORTED_MODULE_9__.annexbExtradata2AvccExtradata(data);
            if (extradata) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
                stream.codecpar.extradataSize = extradata.length;
                _codecs_h264__WEBPACK_IMPORTED_MODULE_9__.parseAVCodecParameters(stream, extradata);
                const { spss } = _codecs_h264__WEBPACK_IMPORTED_MODULE_9__.extradata2SpsPps(extradata);
                this.sps = _codecs_h264__WEBPACK_IMPORTED_MODULE_9__.parseSPS(spss[0]);
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
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 2 /* h264.BitFormat.ANNEXB */);
                formatContext.interval.packetBuffer.push(avpacket);
                break;
            }
            this.naluPos += BigInt(Math.floor(data.length));
        }
        return 0;
    }
    async readAVPacket_(formatContext, avpacket) {
        const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        const nalus = await this.readNaluFrame(formatContext);
        if (!nalus.length) {
            return -1048576 /* IOError.END */;
        }
        this.sliceType = -1 /* h264.H264SliceType.kSliceNone */;
        let isKey = false;
        let isFirst = true;
        nalus.forEach((n) => {
            const header = n[2] === 1 ? n[3] : n[4];
            const type = header & 0x1f;
            const nalRefIdc = (header >>> 5) & 0x03;
            if (type === 7 /* h264.H264NaluType.kSliceSPS */) {
                this.sps = _codecs_h264__WEBPACK_IMPORTED_MODULE_9__.parseSPS(n);
            }
            if (type === 5 /* h264.H264NaluType.kSliceIDR */) {
                isKey = true;
            }
            if ((type === 1 /* h264.H264NaluType.kSliceNonIDR */
                || type === 2 /* h264.H264NaluType.kSliceDPA */
                || type === 3 /* h264.H264NaluType.kSliceDPB */
                || type === 4 /* h264.H264NaluType.kSliceDPC */
                || type === 5 /* h264.H264NaluType.kSliceIDR */)
                && isFirst) {
                isFirst = false;
                this.bitReader.clear();
                this.bitReader.appendBuffer(n.subarray(n[2] === 1 ? 4 : 5, 50));
                // first_mb_in_slice
                avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                this.sliceType = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                // pic_parameter_set_id
                avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                // frame_num
                const frameNumber = this.bitReader.readU(this.sps.log2MaxFrameNumMinus4 + 4);
                let fieldPicFlag = 0;
                let bottomFieldFlag = 0;
                if (!this.sps.frameMbsOnlyFlag) {
                    fieldPicFlag = this.bitReader.readU1();
                }
                if (fieldPicFlag) {
                    bottomFieldFlag = this.bitReader.readU1();
                }
                if (type === 5 /* h264.H264NaluType.kSliceIDR */) {
                    // idr_pic_id
                    avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                }
                if (this.sps.picOrderCntType === 0) {
                    const picOrderCntLsb = this.bitReader.readU(this.sps.log2MaxPicOrderCntLsbMinus4 + 4);
                    const max = (1 << (this.sps.log2MaxPicOrderCntLsbMinus4 + 4)) - 1;
                    if (Math.abs(picOrderCntLsb - this.lastPicOrderCntLsb) > (max >>> 1)) {
                        this.picOrderCntMsb += BigInt(Math.floor(max));
                    }
                    this.poc = this.picOrderCntMsb + BigInt(Math.floor(picOrderCntLsb));
                    this.lastPicOrderCntLsb = picOrderCntLsb;
                }
                else if (this.sps.picOrderCntType === 1) {
                    const deltaPicOrderCnt = [0, 0];
                    if (!this.sps.deltaPicOrderAlwaysZeroFlag) {
                        deltaPicOrderCnt[0] = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readSE(this.bitReader);
                        if (bottomFieldFlag) {
                            deltaPicOrderCnt[1] = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readSE(this.bitReader);
                        }
                    }
                    if (frameNumber < this.prevFrameNumber) {
                        const max = (1 << (this.sps.log2MaxFrameNumMinus4 + 4)) - 1;
                        this.frameNumberOffset += BigInt(Math.floor(max));
                    }
                    let absFrameNumber = this.frameNumberOffset + BigInt(Math.floor(frameNumber));
                    if (nalRefIdc === 0 && absFrameNumber > 0) {
                        absFrameNumber--;
                    }
                    this.poc = BigInt(2) * absFrameNumber + BigInt(deltaPicOrderCnt[0] >>> 0);
                    if (fieldPicFlag && bottomFieldFlag) {
                        this.poc += BigInt(deltaPicOrderCnt[1] >>> 0);
                    }
                    this.prevFrameNumber = frameNumber;
                }
                else {
                    this.poc++;
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
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 2 /* h264.BitFormat.ANNEXB */);
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
                    return a.poc - b.poc > BigInt(0) ? 1 : -1;
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
                || (this.sliceType === 0 /* h264.H264SliceType.kSliceP */
                    || this.sliceType === 2 /* h264.H264SliceType.kSliceI */
                    || this.sliceType === 5 /* h264.H264SliceType.kSliceSP */
                    || this.sliceType === 7 /* h264.H264SliceType.kSliceSI */)) {
                if (ipFrameCount === 1
                    || ((cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](next + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)
                        && this.queue.length)) {
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
//# sourceMappingURL=src_avformat_formats_IH264Format_ts.avtranscoder.js.map