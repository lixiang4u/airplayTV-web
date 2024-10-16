"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OIvfFormat_ts"],{

/***/ "./src/avformat/formats/OIvfFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OIvfFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IVFHeader: () => (/* binding */ IVFHeader),
/* harmony export */   "default": () => (/* binding */ OIVFFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
var cheap__fileName__1 = "src\\avformat\\formats\\OIvfFormat.ts";







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
class OIVFFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_3__["default"] {
    type = 4 /* AVFormat.IVF */;
    header;
    constructor() {
        super();
        this.header = new IVFHeader();
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(false);
        const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        if (stream) {
            this.header.width = stream.codecpar.width;
            this.header.height = stream.codecpar.height;
            this.header.numerator = stream.timeBase.num;
            this.header.denominator = stream.timeBase.den;
        }
        return 0;
    }
    writeHeader(formatContext) {
        // byte 0-3 signature: 'DKIF'
        formatContext.ioWriter.writeString('DKIF');
        // byte 4-5 version (should be 0)
        formatContext.ioWriter.writeUint16(this.header.version);
        // byte 6-7 length of header in bytes
        formatContext.ioWriter.writeUint16(32);
        // bytes 8-11 codec FourCC (e.g., 'VP80')
        formatContext.ioWriter.writeString(this.header.codec);
        // bytes 12-13 width in pixels
        formatContext.ioWriter.writeUint16(this.header.width);
        // bytes 14-15 height in pixels
        formatContext.ioWriter.writeUint16(this.header.height);
        // bytes 16-19 denominator
        formatContext.ioWriter.writeUint32(this.header.denominator);
        // bytes 19-23 numerator
        formatContext.ioWriter.writeUint32(this.header.numerator);
        // bytes 24-27 number of frames in file
        formatContext.ioWriter.writeUint32(this.header.framesCount);
        // bytes 28-31 unused
        formatContext.ioWriter.writeUint32(0);
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 120);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 127);
            return;
        }
        if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            const stream = formatContext.getStreamByMediaType(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
            if (stream) {
                formatContext.ioWriter.writeUint32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
                formatContext.ioWriter.writeUint64((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_5__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational), stream.timeBase));
                formatContext.ioWriter.writeBuffer((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.getAVPacketData)(avpacket));
                this.header.framesCount++;
            }
        }
        return 0;
    }
    writeTrailer(formatContext) {
        formatContext.ioWriter.seek(BigInt(24));
        // 更新 framesCount
        formatContext.ioWriter.writeUint32(this.header.framesCount);
        formatContext.ioWriter.flush();
        return 0;
    }
    flush(formatContext) {
        formatContext.ioWriter.flush();
        return 0;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OIvfFormat_ts.avtranscoder.js.map