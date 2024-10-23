"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IIvfFormat_ts"],{

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

/***/ "./src/avformat/formats/IIvfFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IIvfFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IVFHeader: () => (/* binding */ IVFHeader),
/* harmony export */   "default": () => (/* binding */ IIVFFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IIvfFormat.ts";









const IVFCodec2CodecId = {
    ["VP80" /* IVFCodec.VP8 */]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    ["VP90" /* IVFCodec.VP9 */]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
};
class IVFHeader {
    // version (should be 0)
    version;
    // length of header in bytes
    length;
    // FourCC (e.g., 'VP80')
    codec;
    // width in pixels
    width;
    // height in pixels
    height;
    // denominator
    denominator;
    // numerator
    numerator;
    // number of frames in file
    framesCount;
    constructor() {
        this.version = 0;
        this.length = 32;
        this.codec = "VP80" /* IVFCodec.VP8 */;
        this.width = 0;
        this.height = 0;
        this.framesCount = 0;
        this.denominator = 1;
        this.numerator = 0;
    }
}
class IIVFFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 5 /* AVFormat.IVF */;
    header;
    constructor() {
        super();
        this.header = new IVFHeader();
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(false);
        }
    }
    async readHeader(formatContext) {
        try {
            const signature = await formatContext.ioReader.readString(4);
            if (signature !== 'DKIF') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not ivf', cheap__fileName__0, 104);
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            this.header.version = await formatContext.ioReader.readUint16();
            await formatContext.ioReader.skip(2);
            this.header.codec = await formatContext.ioReader.readString(4);
            this.header.width = await formatContext.ioReader.readUint16();
            this.header.height = await formatContext.ioReader.readUint16();
            this.header.denominator = await formatContext.ioReader.readUint32();
            this.header.numerator = await formatContext.ioReader.readUint32();
            this.header.framesCount = await formatContext.ioReader.readUint32();
            // unused
            await formatContext.ioReader.skip(4);
            const stream = formatContext.createStream();
            stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
            stream.codecpar.codecId = IVFCodec2CodecId[this.header.codec];
            stream.timeBase.den = this.header.denominator;
            stream.timeBase.num = this.header.numerator;
            stream.codecpar.width = this.header.width;
            stream.codecpar.height = this.header.height;
            stream.nbFrames = BigInt(Math.floor(this.header.framesCount));
            if (this.onStreamAdd) {
                this.onStreamAdd(stream);
            }
            return 0;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__0, 136);
            return formatContext.ioReader.error;
        }
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
            if (stream) {
                const pos = formatContext.ioReader.getPos();
                const size = await formatContext.ioReader.readUint32();
                const pts = await formatContext.ioReader.readUint64();
                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(size);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, size);
                await formatContext.ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(data, size));
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, pos);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, pts);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, this.header.denominator);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, this.header.numerator);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                if (stream.startTime === avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE_BIGINT) {
                    stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16);
                }
            }
            else {
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 173);
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IIvfFormat_ts.avplayer.js.map