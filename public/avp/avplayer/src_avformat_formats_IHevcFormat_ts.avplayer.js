"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IHevcFormat_ts"],{

/***/ "./src/avformat/codecs/hevc.ts":
/*!*************************************!*\
  !*** ./src/avformat/codecs/hevc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HEVCProfile2Name: () => (/* binding */ HEVCProfile2Name),
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   annexbExtradata2AvccExtradata: () => (/* binding */ annexbExtradata2AvccExtradata),
/* harmony export */   extradata2VpsSpsPps: () => (/* binding */ extradata2VpsSpsPps),
/* harmony export */   isIDR: () => (/* binding */ isIDR),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parsePPS: () => (/* binding */ parsePPS),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, vpsSpsPps2Extradata, avcc2Annexb */
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
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");


/*
 * libmedia hevc util
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










const HEVCProfile2Name = {
    [1 /* HEVCProfile.Main */]: 'Main',
    [2 /* HEVCProfile.Main10 */]: 'Main10',
    [3 /* HEVCProfile.MainStillPicture */]: 'MainStillPicture',
    [4 /* HEVCProfile.Main444 */]: 'Main444'
};
const LevelCapabilities = [
    { level: 10, maxLumaSamplesPerSecond: 552960, maxLumaPictureSize: 36864, maxBitRate: { main: 128, main10: 150 } },
    { level: 20, maxLumaSamplesPerSecond: 3686400, maxLumaPictureSize: 122880, maxBitRate: { main: 1500, main10: 1875 } },
    { level: 21, maxLumaSamplesPerSecond: 7372800, maxLumaPictureSize: 245760, maxBitRate: { main: 3000, main10: 3750 } },
    { level: 30, maxLumaSamplesPerSecond: 16588800, maxLumaPictureSize: 552960, maxBitRate: { main: 6000, main10: 7500 } },
    { level: 31, maxLumaSamplesPerSecond: 33177600, maxLumaPictureSize: 983040, maxBitRate: { main: 10000, main10: 12500 } },
    { level: 40, maxLumaSamplesPerSecond: 66846720, maxLumaPictureSize: 2228224, maxBitRate: { main: 12000, main10: 15000 } },
    { level: 41, maxLumaSamplesPerSecond: 133693440, maxLumaPictureSize: 2228224, maxBitRate: { main: 20000, main10: 25000 } },
    { level: 50, maxLumaSamplesPerSecond: 267386880, maxLumaPictureSize: 8912896, maxBitRate: { main: 25000, main10: 40000 } },
    { level: 51, maxLumaSamplesPerSecond: 534773760, maxLumaPictureSize: 8912896, maxBitRate: { main: 40000, main10: 60000 } },
    { level: 52, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 60, maxLumaSamplesPerSecond: 1069547520, maxLumaPictureSize: 35651584, maxBitRate: { main: 60000, main10: 100000 } },
    { level: 61, maxLumaSamplesPerSecond: 2139095040, maxLumaPictureSize: 89128960, maxBitRate: { main: 120000, main10: 240000 } },
    { level: 62, maxLumaSamplesPerSecond: 4278190080, maxLumaPictureSize: 356515840, maxBitRate: { main: 240000, main10: 480000 } }
];
function getLevelByResolution(profile, width, height, fps, bitrate) {
    bitrate /= 1000;
    const selectedProfile = profile === 1 /* HEVCProfile.Main */ ? 'main' : 'main10';
    const lumaSamplesPerSecond = width * height * fps;
    for (const level of LevelCapabilities) {
        if (lumaSamplesPerSecond <= level.maxLumaSamplesPerSecond && width * height <= level.maxLumaPictureSize && bitrate <= level.maxBitRate[selectedProfile]) {
            return level.level;
        }
    }
}
const NALULengthSizeMinusOne = 3;
/**
 *
 * avcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 8   configurationVersion( 固定   1)
 * - 2   general_profile_space
 * - 1   general_tier_flag
 * - 5   general_profile_idc
 * - 32  general_profile_compatibility_flags
 * - 48  general_constraint_indicator_flags (6 个 字节）
 * - 8   general_level_idc
 * - 4   reserved1 (1111)
 * - 4   min_spatial_segmentation_idc_L
 * - 8   min_spatial_segmentation_idc_H
 * - 6   reserved2 (111111)
 * - 2   parallelismType
 * - 6   reserved3 (111111)
 * - 2   chromaFormat
 * - 5   reserved4 (11111)
 * - 3   bitDepthLumaMinus8
 * - 5   reserved5(11111)
 * - 3   bitDepthChromaMinus8
 * - 16  avgFrameRate
 * - 2   constantFrameRate
 * - 3   numTemporalLayers
 * - 1   temporalIdNested
 * - 2   lengthSizeMinusOne
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 1   reserved (0)
 * - 6   NAL_unit_type
 * - 16  numNalus
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_4__["default"](extradata, true);
    bufferReader.skip(22);
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x3f;
        const count = bufferReader.readUint16();
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
            vpss = list;
        }
        else if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss = list;
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
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
    let length = 23;
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
    const spsData = parseSPS(sps);
    bufferWriter.writeUint8(0x01);
    bufferWriter.writeUint8(sps[1]);
    bufferWriter.writeUint8(sps[2]);
    bufferWriter.writeUint8(sps[3]);
    bufferWriter.writeUint8(sps[4]);
    bufferWriter.writeUint8(sps[5]);
    // general_constraint_indicator_flags
    bufferWriter.writeUint8(sps[6]);
    bufferWriter.writeUint8(sps[7]);
    bufferWriter.writeUint8(sps[8]);
    bufferWriter.writeUint8(sps[9]);
    bufferWriter.writeUint8(sps[10]);
    bufferWriter.writeUint8(sps[11]);
    bufferWriter.writeUint8(spsData.level);
    // min_spatial_segmentation_idc
    bufferWriter.writeUint8((1020) | 0);
    bufferWriter.writeUint8(0);
    // parallelismType
    bufferWriter.writeUint8((16320) | 0);
    // chromaFormat
    bufferWriter.writeUint8((16320) | spsData.chroma_format_idc);
    // bitDepthLumaMinus8
    bufferWriter.writeUint8((8160) | spsData.bit_depth_luma_minus8);
    // bitDepthChromaMinus8
    bufferWriter.writeUint8((8160) | spsData.bit_depth_chroma_minus8);
    // avgFrameRate
    bufferWriter.writeUint16(0);
    // constantFrameRate numTemporalLayers temporalIdNested lengthSizeMinusOne
    bufferWriter.writeUint8((0) | (8) | ((sps[0] & 0x01) << 2) | NALULengthSizeMinusOne);
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
        bufferWriter.writeUint8((128) | 32 /* HEVCNaluType.kSliceVPS */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 33 /* HEVCNaluType.kSliceSPS */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 34 /* HEVCNaluType.kSlicePPS */);
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
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
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
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[0] >>> 1) & 0x3f;
                return type !== 32 /* HEVCNaluType.kSliceVPS */
                    && type !== 33 /* HEVCNaluType.kSliceSPS */
                    && type !== 34 /* HEVCNaluType.kSlicePPS */
                    && type !== 35 /* HEVCNaluType.kSliceAUD */;
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
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
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
    const naluLengthSizeMinusOne = extradata ? (extradata[21] & 0x03) : NALULengthSizeMinusOne;
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
    bufferWriter.writeUint8(35 /* HEVCNaluType.kSliceAUD */ << 1);
    bufferWriter.writeUint8(0x00);
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
        const type = (nalu[0] >>> 1) & 0x3f;
        if (type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */
            || type === 20 /* HEVCNaluType.kSliceIDR_N_LP */
            || type === 21 /* HEVCNaluType.kSliceCRA_NUT */) {
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
        const naluType = (nalu[0] >>> 1) & 0x3f;
        if (naluType === 33 /* HEVCNaluType.kSliceSPS */) {
            spss.push(nalu);
        }
        else if (naluType === 34 /* HEVCNaluType.kSlicePPS */) {
            ppss.push(nalu);
        }
        else if (naluType === 32 /* HEVCNaluType.kSliceVPS */) {
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
            const type = (nalu[0] >>> 1) & 0x3f;
            if (type === 32 /* HEVCNaluType.kSliceVPS */) {
                vpss.push(nalu);
            }
            else if (type === 33 /* HEVCNaluType.kSliceSPS */) {
                spss.push(nalu);
            }
            else if (type === 34 /* HEVCNaluType.kSlicePPS */) {
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
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[21] & 0x03);
        const { spss } = extradata2VpsSpsPps(extradata);
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
        let nalus = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.splitNaluByStartCode)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        return nalus.some((nalu) => {
            const type = (nalu[0] >>> 1) & 0x3f;
            return type === 20 /* HEVCNaluType.kSliceIDR_N_LP */ || type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */;
        });
    }
    else {
        const size = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        let i = 0;
        while (i < (size - naluLengthSize)) {
            const type = (avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + (i + naluLengthSize)) >>> 1) & 0x3f;
            if (type === 20 /* HEVCNaluType.kSliceIDR_N_LP */ || type === 19 /* HEVCNaluType.kSliceIDR_W_RADL */) {
                return true;
            }
            if (naluLengthSize === 4) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 3) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 2) {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.rb16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else {
                i += avutil_util_intread__WEBPACK_IMPORTED_MODULE_11__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
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
    let bit_depth_luma_minus8 = 0;
    let bit_depth_chroma_minus8 = 0;
    let chroma_format_idc = 1;
    let general_profile_space = 0;
    let general_tier_flag = 0;
    let general_profile_compatibility_flags = 0;
    let constraint_flags = 0;
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nalu type
    bitReader.readU(6);
    // layerId
    bitReader.readU(6);
    // tid
    bitReader.readU(3);
    // sps_video_parameter_set_id
    bitReader.readU(4);
    // The value of sps_max_sub_layers_minus1 shall be in the range of 0 to 6, inclusive.
    const spsMaxSubLayersMinus1 = bitReader.readU(3);
    // sps_temporal_id_nesting_flag
    bitReader.readU1();
    let separate_colour_plane_flag = 0;
    if (spsMaxSubLayersMinus1 <= 6) {
        // profile_tier_level(sps_max_sub_layers_minus1)
        // general_profile_space
        general_profile_space = bitReader.readU(2);
        // general_tier_flag
        general_tier_flag = bitReader.readU1();
        // general_profile_idc
        profile = bitReader.readU(5);
        // general_profile_compatibility_flag[32]
        general_profile_compatibility_flags = bitReader.readU(32);
        /**
         * 1 general_progressive_source_flag
         * 1 general_interlaced_source_flag
         * 1 general_non_packed_constraint_flag
         * 1 general_frame_only_constraint_flag
         * 44 general_reserved_zero_44bits
         */
        constraint_flags = bitReader.readU(48);
        // general_level_idc
        level = bitReader.readU(8);
        const subLayerProfilePresentFlag = new Array(6);
        const subLayerLevelPresentFlag = new Array(6);
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            subLayerProfilePresentFlag[i] = bitReader.readU1();
            subLayerLevelPresentFlag[i] = bitReader.readU1();
        }
        if (spsMaxSubLayersMinus1 > 0) {
            for (let i = spsMaxSubLayersMinus1; i < 8; i++) {
                // reserved_zero_2bits
                bitReader.readU(2);
            }
        }
        for (let i = 0; i < spsMaxSubLayersMinus1; i++) {
            if (subLayerProfilePresentFlag[i]) {
                // sub_layer_profile_space[i]
                bitReader.readU(2);
                // sub_layer_tier_flag[i]
                bitReader.readU(1);
                // sub_layer_profile_idc[i]
                bitReader.readU(5);
                // sub_layer_profile_compatibility_flag[i][32]
                bitReader.readU(32);
                // sub_layer_progressive_source_flag[i]
                bitReader.readU(1);
                // sub_layer_interlaced_source_flag[i]
                bitReader.readU(1);
                // sub_layer_non_packed_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_frame_only_constraint_flag[i]
                bitReader.readU(1);
                // sub_layer_reserved_zero_44bits[i]
                bitReader.readU(44);
            }
            if (subLayerLevelPresentFlag[i]) {
                // sub_layer_level_idc[i]
                bitReader.readU(8);
            }
        }
        // "The  value  of sps_seq_parameter_set_id shall be in the range of 0 to 15, inclusive."
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        chroma_format_idc = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        if (chroma_format_idc === 3) {
            // separate_colour_plane_flag
            separate_colour_plane_flag = bitReader.readU(1);
        }
        width = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        height = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        const conformanceWindowFlag = bitReader.readU1();
        let confWinLeftOffset = 0;
        let confWinRightOffset = 0;
        let confWinTopOffset = 0;
        let confWinBottomOffset = 0;
        if (conformanceWindowFlag) {
            confWinLeftOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinRightOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinTopOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
            confWinBottomOffset = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        }
        bit_depth_luma_minus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        bit_depth_chroma_minus8 = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        let SubWidthC = 2;
        let SubHeightC = 2;
        if (chroma_format_idc === 0) {
            SubWidthC = SubHeightC = 0;
        }
        else if (chroma_format_idc === 2) {
            SubWidthC = 2;
            SubHeightC = 1;
        }
        else if (chroma_format_idc === 3) {
            SubWidthC = SubHeightC = 1;
        }
        const cropUnitX = SubWidthC * (1 << (bit_depth_luma_minus8 + 1));
        const cropUnitY = SubHeightC * (1 << (bit_depth_luma_minus8 + 1));
        width -= cropUnitX * (confWinLeftOffset + confWinRightOffset);
        height -= cropUnitY * (confWinTopOffset + confWinBottomOffset);
    }
    const log2_max_poc_lsb = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 4;
    const sublayer_ordering_info_flag = bitReader.readU1();
    const start = sublayer_ordering_info_flag ? 0 : spsMaxSubLayersMinus1;
    for (let i = start; i < (spsMaxSubLayersMinus1 + 1); i++) {
        // max_dec_pic_buffering
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // num_reorder_pics
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
        // max_latency_increase
        avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    }
    const log2_min_cb_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 3;
    const log2_diff_max_min_coding_block_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const log2_min_tb_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader) + 2;
    const log2_diff_max_min_transform_block_size = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const log2_max_trafo_size = log2_diff_max_min_transform_block_size + log2_min_tb_size;
    const log2_ctb_size = log2_min_cb_size + log2_diff_max_min_coding_block_size;
    const log2_min_pu_size = log2_min_cb_size - 1;
    const ctb_width = (width + (1 << log2_ctb_size) - 1) >> log2_ctb_size;
    const ctb_height = (height + (1 << log2_ctb_size) - 1) >> log2_ctb_size;
    const ctb_size = ctb_width * ctb_height;
    const min_cb_width = width >> log2_min_cb_size;
    const min_cb_height = height >> log2_min_cb_size;
    const min_tb_width = width >> log2_min_tb_size;
    const min_tb_height = height >> log2_min_tb_size;
    const min_pu_width = width >> log2_min_pu_size;
    const min_pu_height = height >> log2_min_pu_size;
    return {
        profile,
        level,
        width,
        height,
        chroma_format_idc,
        bit_depth_luma_minus8,
        bit_depth_chroma_minus8,
        general_profile_space,
        general_tier_flag,
        general_profile_compatibility_flags,
        constraint_flags,
        separate_colour_plane_flag,
        log2_min_cb_size,
        log2_diff_max_min_coding_block_size,
        log2_min_tb_size,
        log2_diff_max_min_transform_block_size,
        log2_max_trafo_size,
        log2_ctb_size,
        log2_min_pu_size,
        ctb_width,
        ctb_height,
        ctb_size,
        min_cb_width,
        min_cb_height,
        min_tb_width,
        min_tb_height,
        min_pu_width,
        min_pu_height,
        log2_max_poc_lsb
    };
}
function parsePPS(pps) {
    if (!pps || pps.length < 3) {
        return;
    }
    let offset = 0;
    if (pps[0] === 0x00
        && pps[1] === 0x00
        && pps[2] === 0x00
        && pps[3] === 0x01) {
        offset = 4;
    }
    const buffer = (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_7__.naluUnescape)(pps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_5__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    const pps_pic_parameter_set_id = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const pps_seq_parameter_set_id = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_10__.readUE(bitReader);
    const dependent_slice_segment_flag = bitReader.readU1();
    const output_flag_present_flag = bitReader.readU1();
    const num_extra_slice_header_bits = bitReader.readU(3);
    return {
        pps_pic_parameter_set_id,
        pps_seq_parameter_set_id,
        dependent_slice_segment_flag,
        output_flag_present_flag,
        num_extra_slice_header_bits
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

/***/ "./src/avformat/formats/IHevcFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IHevcFormat.ts ***!
  \*********************************************/
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
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var _nalu_NaluReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nalu/NaluReader */ "./src/avformat/formats/nalu/NaluReader.ts");














const DefaultIHevcFormatOptions = {
    framerate: {
        num: 30,
        den: 1
    }
};
class IHevcFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_3__["default"] {
    type = 9 /* AVFormat.HEVC */;
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
    pocTid0;
    sps;
    pps;
    naluReader;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_7__.extend({}, DefaultIHevcFormatOptions, options);
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
        const type = (data[(data[2] === 1 ? 3 : 4)] >>> 1) & 0x3f;
        return type < 32 /* hevc.HEVCNaluType.kSliceVPS */;
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
            const type = (next[(next[2] === 1 ? 3 : 4)] >>> 1) & 0x3f;
            if (this.isFrameNalu(next)) {
                if (hasFrame) {
                    const firstSliceInPicFlag = next[next[2] === 1 ? 5 : 6] >>> 7;
                    if (firstSliceInPicFlag) {
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
                && (type === 35 /* hevc.HEVCNaluType.kSliceAUD */
                    || type === 33 /* hevc.HEVCNaluType.kSliceSPS */
                    || type === 34 /* hevc.HEVCNaluType.kSlicePPS */
                    || type === 32 /* hevc.HEVCNaluType.kSliceVPS */)) {
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
        stream.codecpar.codecId = 173 /* AVCodecID.AV_CODEC_ID_HEVC */;
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
            const extradata = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.annexbExtradata2AvccExtradata(data);
            if (extradata) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
                stream.codecpar.extradataSize = extradata.length;
                _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.parseAVCodecParameters(stream, extradata);
                const { spss, ppss } = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.extradata2VpsSpsPps(extradata);
                this.sps = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.parseSPS(spss[0]);
                this.pps = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.parsePPS(ppss[0]);
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
    async readAVPacket_(formatContext, avpacket) {
        const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        const nalus = await this.readNaluFrame(formatContext);
        if (!nalus.length) {
            return -1048576 /* IOError.END */;
        }
        this.sliceType = -1 /* hevc.HEVCSliceType.kSliceNone */;
        let isKey = false;
        let isFirst = true;
        nalus.forEach((n) => {
            const header = n[2] === 1 ? n[3] : n[4];
            const type = (header >>> 1) & 0x3f;
            const temporalId = (n[2] === 1 ? n[4] : n[5]) & 0x07;
            if (type === 33 /* hevc.HEVCNaluType.kSliceSPS */) {
                this.sps = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.parseSPS(n);
            }
            if (type === 34 /* hevc.HEVCNaluType.kSlicePPS */) {
                this.pps = _codecs_hevc__WEBPACK_IMPORTED_MODULE_9__.parsePPS(n);
            }
            if (type === 19 /* hevc.HEVCNaluType.kSliceIDR_W_RADL */
                || type === 20 /* hevc.HEVCNaluType.kSliceIDR_N_LP */) {
                isKey = true;
            }
            if (type < 32 /* hevc.HEVCNaluType.kSliceVPS */ && isFirst) {
                isFirst = false;
                this.bitReader.clear();
                this.bitReader.appendBuffer(n.subarray(n[2] === 1 ? 5 : 6, 50));
                const firstSliceInPicFlag = this.bitReader.readU1();
                if (type >= 16 && type <= 23) {
                    isKey = true;
                    // no_output_of_prior_pics_flag
                    this.bitReader.readU1();
                }
                // pps_id
                avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                if (!firstSliceInPicFlag) {
                    if (this.pps.dependent_slice_segment_flag) {
                        // dependent_slice_segment_flag
                        this.bitReader.readU1();
                    }
                    const sliceAddressLength = Math.ceil(Math.log2(this.sps.ctb_width * this.sps.ctb_height));
                    this.bitReader.readU(sliceAddressLength);
                }
                for (let i = 0; i < this.pps.num_extra_slice_header_bits; i++) {
                    // slice_reserved_undetermined_flag
                    this.bitReader.readU1();
                }
                this.sliceType = avutil_util_expgolomb__WEBPACK_IMPORTED_MODULE_12__.readUE(this.bitReader);
                if (this.pps.output_flag_present_flag) {
                    // pic_output_flag
                    this.bitReader.readU1();
                }
                if (this.sps.separate_colour_plane_flag) {
                    // colour_plane_id
                    this.bitReader.readU(2);
                }
                if (type === 19 /* hevc.HEVCNaluType.kSliceIDR_W_RADL */
                    || type === 20 /* hevc.HEVCNaluType.kSliceIDR_N_LP */) {
                    this.poc = 0;
                }
                else {
                    const picOrderCntLsb = this.bitReader.readU(this.sps.log2_max_poc_lsb);
                    let maxPocLsb = 1 << this.sps.log2_max_poc_lsb;
                    let prevPocLsb = this.pocTid0 % maxPocLsb;
                    let prevPocMsb = this.pocTid0 - prevPocLsb;
                    let pocMsb = 0;
                    if (picOrderCntLsb < prevPocLsb && prevPocLsb - picOrderCntLsb >= maxPocLsb / 2) {
                        pocMsb = prevPocMsb + maxPocLsb;
                    }
                    else if (picOrderCntLsb > prevPocLsb && picOrderCntLsb - prevPocLsb > maxPocLsb / 2) {
                        pocMsb = prevPocMsb - maxPocLsb;
                    }
                    else {
                        pocMsb = prevPocMsb;
                    }
                    // For BLA picture types, POCmsb is set to 0.
                    if (type == 16 /* hevc.HEVCNaluType.kSliceBLA_W_LP */
                        || type == 17 /* hevc.HEVCNaluType.kSliceBLA_W_RADL */
                        || type == 18 /* hevc.HEVCNaluType.kSliceBLA_N_LP */) {
                        pocMsb = 0;
                    }
                    this.poc = pocMsb + picOrderCntLsb;
                }
                if (temporalId == 0
                    && type != 0 /* hevc.HEVCNaluType.kSliceTRAIL_N */
                    && type != 2 /* hevc.HEVCNaluType.kSliceTSA_N */
                    && type != 4 /* hevc.HEVCNaluType.kSliceSTSA_N */
                    && type != 6 /* hevc.HEVCNaluType.kSliceRADL_N */
                    && type != 8 /* hevc.HEVCNaluType.kSliceRASL_N */
                    && type != 7 /* hevc.HEVCNaluType.kSliceRADL_R */
                    && type != 9 /* hevc.HEVCNaluType.kSliceRASL_R */) {
                    this.pocTid0 = this.poc;
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
                || (this.sliceType === 1 /* hevc.HEVCSliceType.kSliceP */
                    || this.sliceType === 2 /* hevc.HEVCSliceType.kSliceI */)) {
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
//# sourceMappingURL=src_avformat_formats_IHevcFormat_ts.avplayer.js.map