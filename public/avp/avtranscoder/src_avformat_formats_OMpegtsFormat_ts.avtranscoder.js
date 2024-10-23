"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OMpegtsFormat_ts"],{

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

/***/ "./src/avformat/bsf/aac/Raw2ADTSFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/Raw2ADTSFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2ADTSFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");







class Raw2ADTSFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    cache;
    cached;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.createAVPacket)();
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.destroyAVPacket)(this.cache);
        this.cache = 0;
        this.cached = false;
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return 0;
        }
        const size = 7 + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_5__.avMalloc)(size);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(bufferPointer, size);
        // syncword 0xfff
        buffer[0] = 0xff;
        buffer[1] = 0xf0;
        // ID
        buffer[1] |= 8;
        // Protection Absent
        buffer[1] |= 1;
        // profile
        buffer[2] = ((cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) - 1) & 0x03) << 6;
        // Sampling Frequency Index
        buffer[2] |= (_codecs_aac__WEBPACK_IMPORTED_MODULE_2__.MPEG4SamplingFrequencyIndex[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136)] & 0x0f) << 2;
        // Channel Configuration 第三位
        buffer[2] |= (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x04) >> 2;
        // Channel Configuration 后两位
        buffer[3] = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x03) << 6;
        // Frame Length 高 2 位
        buffer[3] |= (buffer.length >> 11) & 0x03;
        // Frame Length 中 8 位
        buffer[4] = (buffer.length >> 3) & 0xff;
        // Frame Length 低 3 位
        buffer[5] = (buffer.length & 0x07) << 5;
        // Buffer Fullness 全 1
        buffer[5] |= 0x1f;
        buffer[6] = 0xfc;
        buffer.set((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)), 7);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.addAVPacketData)(this.cache, bufferPointer, size);
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_4__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_6__.EOF;
        }
    }
    reset() {
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/aac/Raw2LATMFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/Raw2LATMFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2LATMFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");










const defaultAACRaw2LATMFilterOptions = {
    mod: 20
};
const LATM_HEADER = new Uint8Array([0x56, 0xe0, 0x00]);
class Raw2LATMFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    cache;
    cached;
    bitWriter;
    counter;
    options;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_8__.extend({}, defaultAACRaw2LATMFilterOptions, options);
    }
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.createAVPacket)();
        this.cached = false;
        this.counter = 0;
        this.bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__["default"]();
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    writeHeader() {
        this.bitWriter.writeU1(this.counter === 0 ? 0 : 1);
        // StreamMuxConfig
        if (this.counter === 0) {
            // audioMuxVersion
            this.bitWriter.writeU1(0);
            // allStreamsSameTimeFraming
            this.bitWriter.writeU1(1);
            // numSubFrames
            this.bitWriter.writeU(6, 0);
            // numProgram
            this.bitWriter.writeU(4, 0);
            // numLayer
            this.bitWriter.writeU(3, 0);
            // profile
            this.bitWriter.writeU(5, (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) - 1) & 0x1f);
            // samplingFreqIndex
            this.bitWriter.writeU(4, _codecs_aac__WEBPACK_IMPORTED_MODULE_3__.MPEG4SamplingFrequencyIndex[cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136)] & 0x0f);
            // channelConfig
            this.bitWriter.writeU(4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) & 0x0f);
            // padding
            this.bitWriter.writeU(3, 0);
            // frameLengthType
            this.bitWriter.writeU(3, 0);
            // latmBufferFullness
            this.bitWriter.writeU(8, 0xff);
            // otherDataPresent
            this.bitWriter.writeU1(0);
            // crcCheckPresent
            this.bitWriter.writeU1(0);
        }
        this.counter++;
        this.counter %= this.options.mod;
    }
    copyBytes(data) {
        for (let i = 0; i < data.length; i++) {
            this.bitWriter.writeU(8, data[i]);
        }
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return 0;
        }
        this.bitWriter.reset();
        const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
        if (element) {
            const { profile, sampleRate, channels } = (0,_codecs_aac__WEBPACK_IMPORTED_MODULE_3__.getAVCodecParameters)((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 48, profile);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 136, sampleRate);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.inCodecpar + 116, channels);
            this.counter = 0;
        }
        this.writeHeader();
        let i = 0;
        for (; i <= cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) - 255; i += 255) {
            this.bitWriter.writeU(8, 255);
        }
        this.bitWriter.writeU(8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) - i);
        const packetBuffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        if ((packetBuffer[0] & 0xe1) === 0x81) {
            /*
             * Convert byte-aligned DSE to non-aligned.
             * Due to the input format encoding we know that
             * it is naturally byte-aligned in the input stream,
             * so there are no padding bits to account for.
             * To avoid having to add padding bits and rearrange
             * the whole stream we just remove the byte-align flag.
             * This allows us to remux our FATE AAC samples into latm
             * files that are still playable with minimal effort.
             */
            this.bitWriter.writeU(8, packetBuffer[0] & 0xfe);
            this.copyBytes(packetBuffer.subarray(1));
        }
        else {
            this.copyBytes(packetBuffer);
        }
        this.bitWriter.padding();
        const len = this.bitWriter.getPointer();
        const size = 3 + len;
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(size);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_4__.mapUint8Array)(bufferPointer, size);
        buffer.set(LATM_HEADER, 0);
        buffer[1] |= (len >> 8) & 0x1f;
        buffer[2] |= len & 0xff;
        buffer.set(this.bitWriter.getBuffer().subarray(0, len), 3);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.addAVPacketData)(this.cache, bufferPointer, size);
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
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

/***/ "./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Avcc2AnnexbFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
var cheap__fileName__8 = "src\\avformat\\bsf\\h2645\\Avcc2AnnexbFilter.ts";











class Avcc2AnnexbFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 80) === 2 /* h264.BitFormat.ANNEXB */ || (0,avutil_util_nalu__WEBPACK_IMPORTED_MODULE_8__.isAnnexb)(buffer)) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(this.cache, avpacket);
        }
        else {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
            let convert;
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            let extradata = null;
            if (element) {
                extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                convert = _codecs_h264__WEBPACK_IMPORTED_MODULE_4__.avcc2Annexb(buffer, extradata);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                convert = _codecs_hevc__WEBPACK_IMPORTED_MODULE_5__.avcc2Annexb(buffer, extradata);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                convert = _codecs_vvc__WEBPACK_IMPORTED_MODULE_6__.avcc2Annexb(buffer, extradata);
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_9__.fatal(`not support for codecId: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4)}`, cheap__fileName__8, 92);
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 80, 2 /* h264.BitFormat.ANNEXB */);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, convert.bufferPointer, convert.length);
            if (convert.key) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.cache + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
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
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
        }
    }
    reset() {
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/opus/Raw2MpegtsFilter.ts":
/*!***************************************************!*\
  !*** ./src/avformat/bsf/opus/Raw2MpegtsFilter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raw2MpegtsFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../codecs/opus */ "./src/avformat/codecs/opus.ts");







class Raw2MpegtsFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    cache;
    cached;
    opusPendingTrimStart;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.createAVPacket)();
        this.cached = false;
        this.opusPendingTrimStart = (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 148) > 0 ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 148) : 0)
            * 48000 / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136);
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    sendAVPacket(avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) || !cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            return;
        }
        const packetBuffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        const opusSamples = _codecs_opus__WEBPACK_IMPORTED_MODULE_6__.getBufferSamples(packetBuffer);
        let sideData = null;
        const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.getAVPacketSideData)(avpacket, 11 /* AVPacketSideDataType.AV_PKT_DATA_SKIP_SAMPLES */);
        if (element) {
            sideData = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
        }
        let trimEnd = 0;
        if (sideData && sideData.length >= 10) {
            const value = (sideData[4] << 24) | (sideData[5] << 16) | (sideData[6] << 8) | sideData[9];
            trimEnd = value * 48000 / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136);
        }
        let ctrlHeaderSize = packetBuffer.length + 2 + packetBuffer.length / 255 + 1;
        if (this.opusPendingTrimStart) {
            ctrlHeaderSize += 2;
        }
        if (trimEnd) {
            ctrlHeaderSize += 2;
        }
        const bufferPointer = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_4__.avMalloc)(ctrlHeaderSize);
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_2__.mapUint8Array)(bufferPointer, ctrlHeaderSize);
        buffer[0] = 0x7f;
        buffer[1] = 0xe0;
        if (this.opusPendingTrimStart) {
            buffer[1] |= 0x10;
        }
        if (trimEnd) {
            buffer[1] |= 0x08;
        }
        let n = packetBuffer.length;
        let i = 2;
        do {
            buffer[i] = Math.min(n, 255);
            n -= 255;
            i++;
        } while (n >= 0);
        let trimStart = 0;
        if (this.opusPendingTrimStart) {
            trimStart = Math.min(this.opusPendingTrimStart, opusSamples);
            buffer[i] = (trimStart & 0xff00) >> 8;
            buffer[i + 1] = trimStart & 0xff;
            i += 2;
            this.opusPendingTrimStart -= trimStart;
        }
        if (trimEnd) {
            trimEnd = Math.min(trimEnd, opusSamples - trimStart);
            buffer[i] = (trimEnd & 0xff00) >> 8;
            buffer[i + 1] = trimEnd & 0xff;
            i += 2;
        }
        buffer.set(packetBuffer, i);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, bufferPointer, ctrlHeaderSize);
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
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
        }
    }
    reset() {
        return 0;
    }
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

/***/ "./src/avformat/codecs/vvc.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/vvc.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   annexbExtradata2AvccExtradata: () => (/* binding */ annexbExtradata2AvccExtradata),
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb),
/* harmony export */   isIDR: () => (/* binding */ isIDR),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseAVCodecParametersBySps: () => (/* binding */ parseAVCodecParametersBySps),
/* harmony export */   parseAnnexbExtraData: () => (/* binding */ parseAnnexbExtraData),
/* harmony export */   parseAvccExtraData: () => (/* binding */ parseAvccExtraData),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports extradata2VpsSpsPps, vpsSpsPps2Extradata */
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
/* eslint-disable camelcase */
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
/* eslint-enable camelcase */
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
        bufferReader.skip(bitReader.getPointer());
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
            let ptlSubLayerLevelPresentFlags = 0;
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                ptlSubLayerLevelPresentFlags = (ptlSubLayerLevelPresentFlags << 1 | spsParams.ptlSublayerLevelPresentFlag[i]);
            }
            biWriter.writeU(spsParams.spsMaxSublayersMinus1, ptlSubLayerLevelPresentFlags);
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
        const nalu = data.subarray(Number(BigInt.asIntN(32, bufferReader.getPos())), Number(BigInt.asIntN(32, bufferReader.getPos())) + length);
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

/***/ "./src/avformat/formats/OMpegtsFormat.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/OMpegtsFormat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMpegtsFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mpegts/function/createMpegtsContext */ "./src/avformat/formats/mpegts/function/createMpegtsContext.ts");
/* harmony import */ var _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mpegts/struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mpegts/ompegts */ "./src/avformat/formats/mpegts/ompegts.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _mpegts_function_createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mpegts/function/createMpegtsStreamContext */ "./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts");
/* harmony import */ var _bsf_aac_Raw2ADTSFilter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../bsf/aac/Raw2ADTSFilter */ "./src/avformat/bsf/aac/Raw2ADTSFilter.ts");
/* harmony import */ var _bsf_aac_Raw2LATMFilter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../bsf/aac/Raw2LATMFilter */ "./src/avformat/bsf/aac/Raw2LATMFilter.ts");
/* harmony import */ var _bsf_opus_Raw2MpegtsFilter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../bsf/opus/Raw2MpegtsFilter */ "./src/avformat/bsf/opus/Raw2MpegtsFilter.ts");
/* harmony import */ var _bsf_h2645_Avcc2AnnexbFilter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../bsf/h2645/Avcc2AnnexbFilter */ "./src/avformat/bsf/h2645/Avcc2AnnexbFilter.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__3 = "src\\avformat\\formats\\OMpegtsFormat.ts";





















const defaultOMpegtsFormatOptions = {
    pesMaxSize: (15) * 184 + 170,
    delay: 1.4,
    latm: false,
    patPeriod: 0.1
};
class OMpegtsFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_6__["default"] {
    type = 2 /* AVFormat.MPEGTS */;
    context;
    sdtPacket;
    patPacket;
    pmtPacket;
    options;
    firstDtsCheck;
    firstVideoCheck;
    lastPatDst;
    patPeriod;
    constructor(options = {}) {
        super();
        this.context = (0,_mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_4__["default"])();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_9__.extend({}, defaultOMpegtsFormatOptions, options);
        this.options.pesMaxSize = this.options.pesMaxSize ? (this.options.pesMaxSize + 14 + 183) / 184 * 184 - 14 : 0;
        this.firstDtsCheck = false;
        this.firstVideoCheck = false;
        this.patPeriod = BigInt(Math.floor(this.options.patPeriod * avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE));
    }
    init(context) {
        context.ioWriter.setEndian(true);
        return 0;
    }
    destroy(context) {
        super.destroy(context);
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.filter) {
                streamContext.filter.destroy();
                streamContext.filter = null;
            }
        });
    }
    writeHeader(context) {
        this.context.pat = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PAT();
        this.context.pat.program2PmtPid.set(1, 4096);
        this.context.pmt = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PMT();
        this.context.pmt.programNumber = 1;
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            stream.timeBase.den = 90000;
            stream.timeBase.num = 1;
            const pid = this.context.startPid++;
            if (this.context.pmt.pcrPid <= 0) {
                this.context.pmt.pcrPid = pid;
            }
            let streamType = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getStreamType(stream);
            const streamContext = (0,_mpegts_function_createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_10__["default"])();
            stream.privData = streamContext;
            const tsPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.TSPacket();
            tsPacket.pid = pid;
            tsPacket.adaptationFieldControl = 0x01;
            streamContext.tsPacket = tsPacket;
            streamContext.pid = pid;
            let filter = null;
            switch (streamType) {
                case 15 /* mpegts.TSStreamType.AUDIO_AAC */:
                    if (this.options.latm) {
                        streamContext.latm = true;
                        streamType = 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */;
                        filter = new _bsf_aac_Raw2LATMFilter__WEBPACK_IMPORTED_MODULE_12__["default"]();
                    }
                    else {
                        filter = new _bsf_aac_Raw2ADTSFilter__WEBPACK_IMPORTED_MODULE_11__["default"]();
                    }
                    break;
                case 27 /* mpegts.TSStreamType.VIDEO_H264 */:
                case 36 /* mpegts.TSStreamType.VIDEO_HEVC */:
                    filter = new _bsf_h2645_Avcc2AnnexbFilter__WEBPACK_IMPORTED_MODULE_14__["default"]();
                    break;
                case 6 /* mpegts.TSStreamType.PRIVATE_DATA */:
                    if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                        filter = new _bsf_opus_Raw2MpegtsFilter__WEBPACK_IMPORTED_MODULE_13__["default"]();
                    }
                    break;
            }
            if (filter) {
                filter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
            }
            streamContext.filter = filter;
            this.context.pmt.pid2StreamType.set(pid, streamType);
            const pes = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.PES();
            pes.pid = pid;
            pes.streamType = streamType;
            pes.streamId = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getStreamId(stream);
            streamContext.pes = pes;
        });
        this.patPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.pmtPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.sdtPacket = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_5__.SectionPacket();
        this.sdtPacket.pid = 17 /* mpegts.TSPid.SDT */;
        this.sdtPacket.adaptationFieldControl = 0x01;
        this.patPacket.pid = 0 /* mpegts.TSPid.PAT */;
        this.patPacket.adaptationFieldControl = 0x01;
        this.pmtPacket.pid = 4096;
        this.pmtPacket.adaptationFieldControl = 0x01;
        this.sdtPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getSDTPayload();
        this.patPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getPATPayload(this.context.pat);
        this.pmtPacket.payload = _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.getPMTPayload(this.context.pmt, context.streams);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.sdtPacket, this.context);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.patPacket, this.context);
        _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(context.ioWriter, this.pmtPacket, this.context);
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_20__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__3, 211);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_20__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__3, 218);
            return;
        }
        if (!this.firstDtsCheck) {
            if ((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase)
                < BigInt(Math.floor(this.options.delay * 90000))) {
                this.context.delay = BigInt(Math.floor(this.options.delay * 90000)) - (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase);
            }
            this.firstDtsCheck = true;
            this.lastPatDst = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q);
        }
        if (this.patPeriod > BigInt(0)
            && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q) - this.lastPatDst > this.patPeriod) {
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.sdtPacket, this.context);
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.patPacket, this.context);
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writeSection(formatContext.ioWriter, this.pmtPacket, this.context);
            this.lastPatDst = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_TIME_BASE_Q);
        }
        const streamContext = stream.privData;
        let buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.getAVPacketData)(avpacket);
        if (streamContext.filter) {
            if (!this.firstVideoCheck
                && !(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)
                && stream.codecpar.extradata
                && (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */)) {
                this.firstVideoCheck = true;
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_19__.avMalloc)(stream.codecpar.extradataSize);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_16__.memcpy)(extradata, stream.codecpar.extradata, stream.codecpar.extradataSize);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, stream.codecpar.extradataSize);
            }
            streamContext.filter.sendAVPacket(avpacket);
            streamContext.filter.receiveAVPacket(avpacket);
            buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_18__.getAVPacketData)(avpacket);
        }
        if (!buffer.length) {
            return 0;
        }
        buffer = buffer.slice();
        let currentWrote = false;
        if (streamContext.pesSlices.total + buffer.length > this.options.pesMaxSize
            || stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if (streamContext.pesSlices.total === 0) {
                streamContext.pesSlices.total = buffer.length;
                streamContext.pesSlices.buffers.push(buffer);
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.dts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                currentWrote = true;
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                streamContext.pes.randomAccessIndicator = 1;
            }
            _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writePES(formatContext.ioWriter, streamContext.pes, streamContext.pesSlices, stream, this.context);
            streamContext.pesSlices.total = 0;
            streamContext.pesSlices.buffers = [];
        }
        if (!currentWrote) {
            if (streamContext.pesSlices.total === 0) {
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.dts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    streamContext.pes.pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_2__.Rational), stream.timeBase) + this.context.delay;
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                    streamContext.pes.randomAccessIndicator = 1;
                }
            }
            streamContext.pesSlices.total += buffer.length;
            streamContext.pesSlices.buffers.push(buffer);
        }
        return 0;
    }
    writeTrailer(context) {
        common_util_array__WEBPACK_IMPORTED_MODULE_8__.each(context.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.pesSlices.total) {
                _mpegts_ompegts__WEBPACK_IMPORTED_MODULE_7__.writePES(context.ioWriter, streamContext.pes, streamContext.pesSlices, stream, this.context);
            }
            streamContext.pesSlices.total = 0;
            streamContext.pesSlices.buffers = [];
        });
        context.ioWriter.flush();
        return 0;
    }
    flush(context) {
        context.ioWriter.flush();
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/crc32.ts":
/*!*******************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/crc32.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateCRC32: () => (/* binding */ calculateCRC32)
/* harmony export */ });
/*
 * libmedia calculate crc32
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
function calculateCRC32(data) {
    const generatorPolynomial = 0x04C11DB7;
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i] << 24;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x80000000) {
                crc = (crc << 1) ^ generatorPolynomial;
            }
            else {
                crc <<= 1;
            }
        }
    }
    return crc >>> 0;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/createMpegtsContext.ts":
/*!*********************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/createMpegtsContext.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMpegtsContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/*
 * libmedia create mpegts context
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


function createMpegtsContext() {
    return {
        currentProgram: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        currentPmtPid: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        tsPacketSize: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        hasPAT: false,
        hasPMT: false,
        tsSliceQueueMap: new Map(),
        pat: new _struct__WEBPACK_IMPORTED_MODULE_1__.PAT(),
        pmt: new _struct__WEBPACK_IMPORTED_MODULE_1__.PMT(),
        program2Pmt: new Map(),
        ioEnd: false,
        startPid: 0x100,
        delay: BigInt(0)
    };
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts":
/*!***************************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMpegtsStreamContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mpegts stream context
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

function createMpegtsStreamContext() {
    return {
        pid: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        filter: null,
        tsPacket: null,
        pes: null,
        continuityCounter: 0,
        pesSlices: {
            total: 0,
            buffers: []
        },
        latm: false
    };
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/mpegts.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/mpegts.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ISO_639_LANGUAGE_DESCRIPTOR: () => (/* binding */ ISO_639_LANGUAGE_DESCRIPTOR),
/* harmony export */   PROBE_PACKET_MARGIN: () => (/* binding */ PROBE_PACKET_MARGIN),
/* harmony export */   PROBE_PACKET_MAX_BUF: () => (/* binding */ PROBE_PACKET_MAX_BUF),
/* harmony export */   REGISTRATION_DESCRIPTOR: () => (/* binding */ REGISTRATION_DESCRIPTOR),
/* harmony export */   StreamType2AVCodecId: () => (/* binding */ StreamType2AVCodecId),
/* harmony export */   TS_DVHS_PACKET_SIZE: () => (/* binding */ TS_DVHS_PACKET_SIZE),
/* harmony export */   TS_FEC_PACKET_SIZE: () => (/* binding */ TS_FEC_PACKET_SIZE),
/* harmony export */   TS_MAX_PACKET_SIZE: () => (/* binding */ TS_MAX_PACKET_SIZE),
/* harmony export */   TS_PACKET_SIZE: () => (/* binding */ TS_PACKET_SIZE)
/* harmony export */ });
/* unused harmony exports NB_PID_MAX, USUAL_SECTION_SIZE, MAX_SECTION_SIZE, MAX_RESYNC_SIZE, MAX_PES_PAYLOAD, MAX_MP4_DESCR_COUNT */
/*
 * libmedia mpegts identify defined
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
const TS_FEC_PACKET_SIZE = 204;
const TS_DVHS_PACKET_SIZE = 192;
const TS_PACKET_SIZE = 188;
const TS_MAX_PACKET_SIZE = 204;
const NB_PID_MAX = 8192;
const USUAL_SECTION_SIZE = 1024;
const MAX_SECTION_SIZE = 4096;
const PROBE_PACKET_MAX_BUF = 8192;
const PROBE_PACKET_MARGIN = 5;
/**
 * maximum size in which we look for synchronization if
 * synchronization is lost
 */
const MAX_RESYNC_SIZE = 65536;
const MAX_PES_PAYLOAD = 204800;
const MAX_MP4_DESCR_COUNT = 16;
const REGISTRATION_DESCRIPTOR = 0x05;
const ISO_639_LANGUAGE_DESCRIPTOR = 0x0a;
const StreamType2AVCodecId = {
    [15 /* TSStreamType.AUDIO_AAC */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86018 /* AVCodecID.AV_CODEC_ID_AAC */],
    [17 /* TSStreamType.AUDIO_AAC_LATM */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86018 /* AVCodecID.AV_CODEC_ID_AAC */],
    [3 /* TSStreamType.AUDIO_MPEG1 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86017 /* AVCodecID.AV_CODEC_ID_MP3 */],
    [4 /* TSStreamType.AUDIO_MPEG2 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86017 /* AVCodecID.AV_CODEC_ID_MP3 */],
    [1 /* TSStreamType.VIDEO_MPEG1 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */],
    [2 /* TSStreamType.VIDEO_MPEG2 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */],
    [27 /* TSStreamType.VIDEO_H264 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 27 /* AVCodecID.AV_CODEC_ID_H264 */],
    [16 /* TSStreamType.VIDEO_MPEG4 */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */],
    [36 /* TSStreamType.VIDEO_HEVC */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 173 /* AVCodecID.AV_CODEC_ID_HEVC */],
    [51 /* TSStreamType.VIDEO_VVC */]: [0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 196 /* AVCodecID.AV_CODEC_ID_VVC */],
    [129 /* TSStreamType.AUDIO_AC3 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86019 /* AVCodecID.AV_CODEC_ID_AC3 */],
    [135 /* TSStreamType.AUDIO_EAC3 */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */],
    [130 /* TSStreamType.AUDIO_DTS */]: [1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 86020 /* AVCodecID.AV_CODEC_ID_DTS */]
};


/***/ }),

/***/ "./src/avformat/formats/mpegts/ompegts.ts":
/*!************************************************!*\
  !*** ./src/avformat/formats/mpegts/ompegts.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPATPayload: () => (/* binding */ getPATPayload),
/* harmony export */   getPMTPayload: () => (/* binding */ getPMTPayload),
/* harmony export */   getSDTPayload: () => (/* binding */ getSDTPayload),
/* harmony export */   getStreamId: () => (/* binding */ getStreamId),
/* harmony export */   getStreamType: () => (/* binding */ getStreamType),
/* harmony export */   writePES: () => (/* binding */ writePES),
/* harmony export */   writeSection: () => (/* binding */ writeSection)
/* harmony export */ });
/* unused harmony export writeTSPacket */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _mpegts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_crc32__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./function/crc32 */ "./src/avformat/formats/mpegts/function/crc32.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mpegts\\ompegts.ts";







function getAdaptationFieldLength(tsPacket) {
    if (tsPacket.adaptationFieldControl !== 0x02 && tsPacket.adaptationFieldControl !== 0x03) {
        return 0;
    }
    if (tsPacket.adaptationFieldControl === 0x02) {
        return _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4;
    }
    let len = 2;
    if (tsPacket.adaptationFieldInfo.pcrFlag) {
        len += 6;
    }
    if (tsPacket.adaptationFieldInfo.opcrFlag) {
        len += 6;
    }
    if (tsPacket.adaptationFieldInfo.splicingPointFlag) {
        len += 1;
    }
    if (tsPacket.adaptationFieldInfo.transportPrivateDataFlag) {
        len += tsPacket.adaptationFieldInfo.transportPrivateData
            ? tsPacket.adaptationFieldInfo.transportPrivateData.length
            : 0;
    }
    if (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag) {
        len += tsPacket.adaptationFieldInfo.extension ? tsPacket.adaptationFieldInfo.extension.length : 0;
    }
    if (len > 256) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('adaptationField size is too large', cheap__fileName__0, 68);
    }
    return len;
}
function getPESHeaderLength(pes) {
    let len = 6;
    const streamId = pes.streamId;
    if (streamId !== 188 /* mpegts.TSStreamId.PROGRAM_STREAM_MAP */
        && streamId !== 190 /* mpegts.TSStreamId.PADDING_STREAM */
        && streamId !== 191 /* mpegts.TSStreamId.PRIVATE_STREAM_2 */
        && streamId !== 240 /* mpegts.TSStreamId.ECM_STREAM */
        && streamId !== 241 /* mpegts.TSStreamId.EMM_STREAM */
        && streamId !== 255 /* mpegts.TSStreamId.PROGRAM_STREAM_DIRECTORY */
        && streamId !== 242 /* mpegts.TSStreamId.DSMCC_STREAM */
        && streamId !== 248 /* mpegts.TSStreamId.TYPE_E_STREAM */) {
        len += 3;
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            len += 5;
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            len += 5;
        }
    }
    return len;
}
function writePESPayload(ioWriter, pes, payload, stream, mpegtsContext) {
    const streamContext = stream.privData;
    const tsPacket = streamContext.tsPacket;
    if (pes.pid === mpegtsContext.pmt.pcrPid) {
        tsPacket.adaptationFieldControl = 0x03;
        tsPacket.adaptationFieldInfo.pcrFlag = 1;
        tsPacket.adaptationFieldInfo.pcr = pes.dts * BigInt(300);
    }
    tsPacket.adaptationFieldInfo.randomAccessIndicator = pes.randomAccessIndicator;
    if (pes.randomAccessIndicator) {
        tsPacket.adaptationFieldControl = 0x03;
    }
    let adaptationFieldLength = getAdaptationFieldLength(tsPacket);
    let continuityCounter = streamContext.continuityCounter;
    if (4 + adaptationFieldLength + payload.length <= _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        tsPacket.payloadUnitStartIndicator = 0x01;
        tsPacket.payload = payload;
        tsPacket.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, tsPacket, mpegtsContext);
        streamContext.continuityCounter = continuityCounter % 16;
        return;
    }
    let len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
    let pos = 0;
    while (pos < payload.length) {
        let next = Math.min(pos + len, payload.length);
        if (pos === 0) {
            tsPacket.payloadUnitStartIndicator = 0x01;
        }
        else {
            tsPacket.payloadUnitStartIndicator = 0x00;
        }
        if (tsPacket.adaptationFieldControl === 0x01 && (next - pos + 4 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 1)) {
            // padding 至少需要 2 字节
            next--;
        }
        tsPacket.payload = payload.subarray(pos, next);
        tsPacket.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, tsPacket, mpegtsContext);
        if (pos === 0) {
            tsPacket.adaptationFieldInfo.randomAccessIndicator = 0;
            tsPacket.adaptationFieldControl = 0x01;
            tsPacket.adaptationFieldInfo.pcrFlag = 0;
            adaptationFieldLength = getAdaptationFieldLength(tsPacket);
            len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
        }
        pos = next;
    }
    streamContext.continuityCounter = continuityCounter % 16;
}
function getStreamType(stream) {
    const context = stream.privData || {};
    switch (stream.codecpar.codecId) {
        case 1 /* AVCodecID.AV_CODEC_ID_MPEG1VIDEO */:
        case 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */:
            return 2 /* mpegts.TSStreamType.VIDEO_MPEG2 */;
        case 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */:
            return 16 /* mpegts.TSStreamType.VIDEO_MPEG4 */;
        case 27 /* AVCodecID.AV_CODEC_ID_H264 */:
            return 27 /* mpegts.TSStreamType.VIDEO_H264 */;
        case 87 /* AVCodecID.AV_CODEC_ID_CAVS */:
            return 66 /* mpegts.TSStreamType.VIDEO_CAVS */;
        case 173 /* AVCodecID.AV_CODEC_ID_HEVC */:
            return 36 /* mpegts.TSStreamType.VIDEO_HEVC */;
        case 196 /* AVCodecID.AV_CODEC_ID_VVC */:
            return 51 /* mpegts.TSStreamType.VIDEO_VVC */;
        case 116 /* AVCodecID.AV_CODEC_ID_DIRAC */:
            return 209 /* mpegts.TSStreamType.VIDEO_DIRAC */;
        case 70 /* AVCodecID.AV_CODEC_ID_VC1 */:
            return 234 /* mpegts.TSStreamType.VIDEO_VC1 */;
        case 86016 /* AVCodecID.AV_CODEC_ID_MP2 */:
        case 86017 /* AVCodecID.AV_CODEC_ID_MP3 */:
            return stream.codecpar.sampleRate < 32000
                ? 4 /* mpegts.TSStreamType.AUDIO_MPEG2 */
                : 3 /* mpegts.TSStreamType.AUDIO_MPEG1 */;
        case 86018 /* AVCodecID.AV_CODEC_ID_AAC */:
            return context.latm
                ? 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */
                : 15 /* mpegts.TSStreamType.AUDIO_AAC */;
        case 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */:
            return 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */;
        case 86019 /* AVCodecID.AV_CODEC_ID_AC3 */:
            return 129 /* mpegts.TSStreamType.AUDIO_AC3 */;
        case 86076 /* AVCodecID.AV_CODEC_ID_OPUS */:
        case 225 /* AVCodecID.AV_CODEC_ID_AV1 */:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
        case 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */:
            return 131 /* mpegts.TSStreamType.AUDIO_TRUEHD */;
        case 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */:
            return 135 /* mpegts.TSStreamType.AUDIO_EAC3 */;
        case 86020 /* AVCodecID.AV_CODEC_ID_DTS */:
            return 130 /* mpegts.TSStreamType.AUDIO_DTS */;
        case 94209 /* AVCodecID.AV_CODEC_ID_DVB_SUBTITLE */:
        case 98311 /* AVCodecID.AV_CODEC_ID_SMPTE_KLV */:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
        default:
            return 6 /* mpegts.TSStreamType.PRIVATE_DATA */;
    }
}
function getStreamId(stream) {
    if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        if (stream.codecpar.codecId === 116 /* AVCodecID.AV_CODEC_ID_DIRAC */) {
            return 253 /* mpegts.TSStreamId.EXTENDED_STREAM_ID */;
        }
        else {
            return 224 /* mpegts.TSStreamId.VIDEO_STREAM_0 */;
        }
    }
    else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
        && (stream.codecpar.codecId === 86016 /* AVCodecID.AV_CODEC_ID_MP2 */
            || stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */
            || stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */)) {
        return 192 /* mpegts.TSStreamId.AUDIO_STREAM_0 */;
    }
    else if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
        && stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
        return 253 /* mpegts.TSStreamId.EXTENDED_STREAM_ID */;
    }
    else if (stream.codecpar.codecType === 2 /* AVMediaType.AVMEDIA_TYPE_DATA */) {
        return 252 /* mpegts.TSStreamId.METADATA_STREAM */;
    }
    else {
        return 189 /* mpegts.TSStreamId.PRIVATE_STREAM_1 */;
    }
}
function getPATPayload(pat) {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x00;
    buffer[2] = 0xb0;
    // transport_stream_id 1 
    buffer[5] = 1;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    if (pat.networkPid > -1) {
        pos += 2;
        buffer[pos++] = (224) | ((pat.networkPid >> 8) & 0x1f);
        buffer[pos++] = (pat.networkPid & 0xff);
    }
    pat.program2PmtPid.forEach((pid, programNumber) => {
        buffer[pos++] = (programNumber >> 8) & 0xff;
        buffer[pos++] = programNumber & 0xff;
        buffer[pos++] = (224) | (pid >> 8) & 0x1f;
        buffer[pos++] = pid & 0xff;
    });
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    const len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function getPMTPayload(pmt, streams) {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x02;
    buffer[2] = 0xb0;
    buffer[4] = ((pmt.programNumber >> 8) & 0x0f);
    buffer[5] = pmt.programNumber & 0xff;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    buffer[pos++] = (224) | (pmt.pcrPid >> 8) & 0x1f;
    buffer[pos++] = pmt.pcrPid & 0xff;
    const programInfoLengthPos = pos;
    pos += 2;
    function putRegistrationDescriptor(tag) {
        buffer[pos++] = _mpegts__WEBPACK_IMPORTED_MODULE_1__.REGISTRATION_DESCRIPTOR;
        buffer[pos++] = 4;
        buffer[pos++] = tag >> 24;
        buffer[pos++] = tag >> 16;
        buffer[pos++] = tag >> 8;
        buffer[pos++] = tag;
    }
    let len = 0xf000 | (pos - programInfoLengthPos - 2);
    buffer[programInfoLengthPos] = len >> 8;
    buffer[programInfoLengthPos + 1] = len;
    for (let i = 0; i < streams.length; i++) {
        const streamType = getStreamType(streams[i]);
        buffer[pos++] = streamType;
        const streamContext = streams[i].privData;
        buffer[pos++] = (224) | (streamContext.pid >> 8) & 0x1f;
        buffer[pos++] = streamContext.pid & 0xff;
        const descLengthPos = pos;
        pos += 2;
        const codecId = streams[i].codecpar.codecId;
        switch (streams[i].codecpar.codecType) {
            case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */: {
                if (codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('AC-3'));
                }
                if (codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('EAC3'));
                }
                if (codecId === 65562 /* AVCodecID.AV_CODEC_ID_S302M */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('BSSD'));
                }
                if (codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('Opus'));
                    buffer[pos++] = 0x7f;
                    buffer[pos++] = 2;
                    buffer[pos++] = 0x80;
                    buffer[pos++] = streams[i].codecpar.chLayout.nbChannels;
                }
                // language und
                buffer[pos++] = _mpegts__WEBPACK_IMPORTED_MODULE_1__.ISO_639_LANGUAGE_DESCRIPTOR;
                buffer[pos++] = 4;
                buffer[pos++] = 117;
                buffer[pos++] = 110;
                buffer[pos++] = 100;
                buffer[pos++] = 0;
                break;
            }
            case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */: {
                if (codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                    putRegistrationDescriptor((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])('AV01'));
                    if (streams[i].codecpar.extradata) {
                        buffer[pos++] = 0x80;
                        buffer[pos++] = streams[i].codecpar.extradataSize;
                        for (let j = 0; j < streams[i].codecpar.extradataSize; j++) {
                            buffer[pos++] = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](streams[i].codecpar.extradata + j);
                        }
                    }
                }
            }
        }
        let len = 0xf000 | (pos - descLengthPos - 2);
        buffer[descLengthPos] = len >> 8;
        buffer[descLengthPos + 1] = len;
    }
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function getSDTPayload() {
    const buffer = new Uint8Array(1024);
    buffer[1] = 0x42;
    buffer[2] = 0xf0;
    // transport_stream_id 1 
    buffer[5] = 1;
    // current_next_indicator
    buffer[6] = (192) | 0x01;
    let pos = 9;
    // original_network_id
    buffer[pos++] = 0xff;
    buffer[pos++] = 1;
    buffer[pos++] = 0xff;
    /*
     * put service
     * service id
     */
    buffer[pos++] = 0;
    buffer[pos++] = 1;
    /* currently no EIT info */
    buffer[pos++] = 252;
    const descListLenPtr = pos;
    pos += 2;
    // write only one descriptor for the service name and provider */
    buffer[pos++] = 0x48;
    const descLenPtr = pos++;
    // service_type
    buffer[pos++] = 1;
    const providerName = 'format-js';
    const serviceName = 'Service01';
    buffer[pos++] = providerName.length;
    for (let i = 0; i < providerName.length; i++) {
        buffer[pos] = providerName.charCodeAt(i);
        pos++;
    }
    buffer[pos++] = serviceName.length;
    for (let i = 0; i < serviceName.length; i++) {
        buffer[pos] = serviceName.charCodeAt(i);
        pos++;
    }
    buffer[descLenPtr] = pos - descLenPtr - 1;
    // fill descriptor length 
    let value = (32768) | (0) | (pos - descListLenPtr - 2);
    buffer[descListLenPtr] = (value >> 8) & 0xff;
    buffer[descListLenPtr + 1] = value & 0xff;
    const crcPos = pos;
    pos += 4;
    for (let i = pos; i < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4; i++) {
        buffer[i] = 0xff;
    }
    const len = (pos - 1) - 3;
    buffer[2] |= ((len >> 8) & 0x0f);
    buffer[3] = len & 0xff;
    // CRC32
    const crc32 = (0,_function_crc32__WEBPACK_IMPORTED_MODULE_6__.calculateCRC32)(buffer.subarray(1, crcPos));
    buffer[crcPos] = (crc32 >> 24) & 0xff;
    buffer[crcPos + 1] = (crc32 >> 16) & 0xff;
    buffer[crcPos + 2] = (crc32 >> 8) & 0xff;
    buffer[crcPos + 3] = crc32 & 0xff;
    return buffer.slice(0, _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4);
}
function writeTSPacket(ioWriter, tsPacket, mpegtsContext) {
    // TODO
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_DVHS_PACKET_SIZE) {
        // skip ATS field (2-bits copy-control + 30-bits timestamp) for m2ts
        ioWriter.skip(4);
    }
    if (!tsPacket.payload || tsPacket.payload.length === 0) {
        tsPacket.adaptationFieldControl = 0x02;
    }
    if (tsPacket.adaptationFieldControl === 0x01
        && (tsPacket.payload.length + 4) < _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        tsPacket.adaptationFieldControl = 0x03;
    }
    const pos = ioWriter.getPos();
    ioWriter.writeUint8(0x47);
    let byte = 0;
    if (tsPacket.payloadUnitStartIndicator) {
        // Payload unit start indicator
        byte |= (64);
    }
    byte |= (tsPacket.transportPriority << 5);
    // pid 高 5 位
    byte |= (tsPacket.pid >> 8);
    ioWriter.writeUint8(byte);
    // pid 低 8 位
    ioWriter.writeUint8(tsPacket.pid & 0xff);
    byte = ((tsPacket.transportScramblingControl & 0x03) << 6);
    byte |= ((tsPacket.adaptationFieldControl & 0x03) << 4);
    byte |= (tsPacket.continuityCounter & 0x0f);
    ioWriter.writeUint8(byte);
    let adaptationFieldLength = getAdaptationFieldLength(tsPacket);
    let paddingLen = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - 4 - adaptationFieldLength;
    if (tsPacket.payload?.length) {
        paddingLen -= tsPacket.payload.length;
    }
    if (tsPacket.adaptationFieldControl === 0x02 || tsPacket.adaptationFieldControl === 0x03) {
        const now = ioWriter.getPos();
        ioWriter.writeUint8(adaptationFieldLength - 1 + paddingLen);
        byte = ((tsPacket.adaptationFieldInfo.discontinuityIndicator & 0x01) << 7);
        byte |= ((tsPacket.adaptationFieldInfo.randomAccessIndicator & 0x01) << 6);
        byte |= ((tsPacket.adaptationFieldInfo.elementaryStreamPriorityIndicator & 0x01) << 5);
        byte |= ((tsPacket.adaptationFieldInfo.pcrFlag & 0x01) << 4);
        byte |= ((tsPacket.adaptationFieldInfo.opcrFlag & 0x01) << 3);
        byte |= ((tsPacket.adaptationFieldInfo.splicingPointFlag & 0x01) << 2);
        byte |= ((tsPacket.adaptationFieldInfo.transportPrivateDataFlag & 0x01) << 1);
        byte |= (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag & 0x01);
        ioWriter.writeUint8(byte);
        if (tsPacket.adaptationFieldInfo.pcrFlag) {
            const pcrLow = Number(tsPacket.adaptationFieldInfo.pcr % BigInt(300));
            const pcrHigh = Number((tsPacket.adaptationFieldInfo.pcr - BigInt(Math.floor(pcrLow))) / BigInt(300));
            ioWriter.writeUint8((pcrHigh >> 25) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 17) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 9) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 1) & 0xff);
            ioWriter.writeUint8((pcrHigh << 7) | (pcrLow >> 8) | 0x7e);
            ioWriter.writeUint8(pcrLow);
        }
        if (tsPacket.adaptationFieldInfo.opcrFlag) {
            const pcrLow = Number(tsPacket.adaptationFieldInfo.pcr % BigInt(300));
            const pcrHigh = Number((tsPacket.adaptationFieldInfo.pcr - BigInt(Math.floor(pcrLow))) / BigInt(300));
            ioWriter.writeUint8((pcrHigh >> 25) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 17) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 9) & 0xff);
            ioWriter.writeUint8((pcrHigh >> 1) & 0xff);
            ioWriter.writeUint8((pcrHigh << 7) | (pcrLow >> 8) | 0x7e);
            ioWriter.writeUint8(pcrLow);
        }
        if (tsPacket.adaptationFieldInfo.splicingPointFlag) {
            ioWriter.writeUint8(tsPacket.adaptationFieldInfo.spliceCountDown);
        }
        if (tsPacket.adaptationFieldInfo.transportPrivateDataFlag) {
            if (tsPacket.adaptationFieldInfo.transportPrivateData
                && tsPacket.adaptationFieldInfo.transportPrivateData.length) {
                ioWriter.writeUint8(tsPacket.adaptationFieldInfo.transportPrivateData.length);
                ioWriter.writeBuffer(tsPacket.adaptationFieldInfo.transportPrivateData);
            }
            else {
                ioWriter.writeUint8(0);
            }
        }
        if (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag) {
            if (tsPacket.adaptationFieldInfo.extension && tsPacket.adaptationFieldInfo.extension.length) {
                ioWriter.writeUint8(tsPacket.adaptationFieldInfo.extension.length);
                ioWriter.writeBuffer(tsPacket.adaptationFieldInfo.extension);
            }
            else {
                ioWriter.writeUint8(0);
            }
        }
        const wroteAdaptationFieldLength = Number(ioWriter.getPos() - now);
        if (wroteAdaptationFieldLength < adaptationFieldLength) {
            ioWriter.skip(adaptationFieldLength - wroteAdaptationFieldLength);
        }
        while (paddingLen > 0) {
            ioWriter.writeUint8(0xff);
            paddingLen--;
        }
    }
    if ((tsPacket.adaptationFieldControl === 0x01 || tsPacket.adaptationFieldControl === 0x03)) {
        if (tsPacket.payload?.length) {
            ioWriter.writeBuffer(tsPacket.payload);
        }
    }
    if (Number(ioWriter.getPos() - pos) !== _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`write error data size to ts packet, need ${_mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE}, wrote: ${Number(ioWriter.getPos() - pos)}`, cheap__fileName__0, 641);
    }
    // TODO
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_FEC_PACKET_SIZE) {
        // 16 crc
        ioWriter.skip(16);
    }
}
function writePts(buffer, pos, fourBits, pts) {
    let value = fourBits << 4 | ((Number(pts >> BigInt(30)) & 0x07) << 1) | 1;
    buffer[pos++] = value;
    value = ((Number(pts >> BigInt(15)) & 0x7fff) << 1) | 1;
    buffer[pos++] = (value >> 8) & 0xff;
    buffer[pos++] = value & 0xff;
    value = (Number(pts & BigInt(0x7fff)) << 1) | 1;
    buffer[pos++] = (value >> 8) & 0xff;
    buffer[pos++] = value & 0xff;
}
function writePES(ioWriter, pes, pesSlices, stream, mpegtsContext) {
    const streamId = pes.streamId;
    const header = new Uint8Array(getPESHeaderLength(pes));
    header[2] = 0x01;
    header[3] = streamId;
    let len = pesSlices.total;
    if (streamId !== 188 /* mpegts.TSStreamId.PROGRAM_STREAM_MAP */
        && streamId !== 190 /* mpegts.TSStreamId.PADDING_STREAM */
        && streamId !== 191 /* mpegts.TSStreamId.PRIVATE_STREAM_2 */
        && streamId !== 240 /* mpegts.TSStreamId.ECM_STREAM */
        && streamId !== 241 /* mpegts.TSStreamId.EMM_STREAM */
        && streamId !== 255 /* mpegts.TSStreamId.PROGRAM_STREAM_DIRECTORY */
        && streamId !== 242 /* mpegts.TSStreamId.DSMCC_STREAM */
        && streamId !== 248 /* mpegts.TSStreamId.TYPE_E_STREAM */) {
        let flags = 0;
        let headerLen = 0;
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            headerLen += 5;
            flags |= 0x80;
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            headerLen += 5;
            flags |= 0x40;
        }
        let value = 0x80;
        /* data alignment indicator is required for subtitle and data streams */
        if (stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */
            || stream.codecpar.codecType === 2 /* AVMediaType.AVMEDIA_TYPE_DATA */) {
            value |= 0x04;
        }
        header[6] = value;
        header[7] = flags;
        header[8] = headerLen;
        len += (headerLen + 3);
        if (pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT) {
            writePts(header, 9, flags >> 6, pes.pts);
        }
        if (pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_5__.NOPTS_VALUE_BIGINT && pes.dts !== pes.pts) {
            writePts(header, 14, 1, pes.dts);
        }
    }
    if (len <= avutil_constant__WEBPACK_IMPORTED_MODULE_5__.UINT16_MAX && stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
        header[4] = (len >> 8) & 0xff;
        header[5] = len & 0xff;
    }
    writePESPayload(ioWriter, pes, (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_4__["default"])(Uint8Array, [header, ...pesSlices.buffers]), stream, mpegtsContext);
}
function writeSection(ioWriter, packet, mpegtsContext) {
    const adaptationFieldLength = getAdaptationFieldLength(packet);
    let continuityCounter = packet.continuityCounter;
    if (4 + adaptationFieldLength + packet.payload.length <= _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
        packet.payloadUnitStartIndicator = 0x01;
        packet.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, packet, mpegtsContext);
        packet.continuityCounter = continuityCounter % 16;
        return;
    }
    const len = _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE - (4 + adaptationFieldLength);
    let pos = 0;
    const payload = packet.payload;
    while (pos < payload.length) {
        let next = Math.min(pos + len, payload.length);
        if (pos === 0) {
            packet.payloadUnitStartIndicator = 0x01;
        }
        else {
            packet.payloadUnitStartIndicator = 0x00;
        }
        const currentLen = next - pos;
        if (currentLen + 4 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
            packet.adaptationFieldControl = 0x01;
        }
        else if (adaptationFieldLength === 0 && currentLen + 4 + 1 === _mpegts__WEBPACK_IMPORTED_MODULE_1__.TS_PACKET_SIZE) {
            // adaptationFieldLength 需要至少 2 byte
            next--;
        }
        packet.payload = payload.subarray(pos, next);
        packet.continuityCounter = (continuityCounter++) % 16;
        writeTSPacket(ioWriter, packet, mpegtsContext);
        pos = next;
    }
    packet.continuityCounter = continuityCounter % 16;
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
/* harmony export */   SectionPacket: () => (/* binding */ SectionPacket),
/* harmony export */   TSPacket: () => (/* binding */ TSPacket),
/* harmony export */   TSSliceQueue: () => (/* binding */ TSSliceQueue)
/* harmony export */ });
/* unused harmony export TSPacketAdaptationFieldInfo */
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OMpegtsFormat_ts.avtranscoder.js.map