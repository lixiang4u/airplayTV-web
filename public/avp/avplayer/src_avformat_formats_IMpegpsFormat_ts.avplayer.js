"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IMpegpsFormat_ts"],{

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

/***/ "./src/avformat/bsf/ac3/Ac32RawFilter.ts":
/*!***********************************************!*\
  !*** ./src/avformat/bsf/ac3/Ac32RawFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ac32RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\ac3\\Ac32RawFilter.ts";













class Ac32RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    caches;
    cache;
    lastDts;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
        let buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        let firstGot = false;
        let hasCache = !!this.cache;
        if (hasCache) {
            buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__["default"])(Uint8Array, [this.cache, buffer]);
            this.cache = null;
        }
        while (i < buffer.length) {
            if (i > buffer.length - 10) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_10__.parseHeader(buffer.subarray(i));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_12__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error('parse ac3 header failed', cheap__fileName__4, 84);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const item = {
                dts: lastDts,
                buffer: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
            };
            let frameLength = info.frameSize;
            item.buffer = buffer.subarray(i, i + frameLength);
            if (i + frameLength > buffer.length) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__.avRescaleQ)(BigInt(1536 / info.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE), avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            this.caches.push(item);
            i += frameLength;
            lastDts += duration;
            if (!firstGot && hasCache) {
                firstGot = true;
                lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
            }
        }
        this.lastDts = BigInt(0);
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.EOF;
        }
    }
    reset() {
        this.cache = null;
        this.lastDts = BigInt(0);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/dts/Dts2RawFilter.ts":
/*!***********************************************!*\
  !*** ./src/avformat/bsf/dts/Dts2RawFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dts2RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_dts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../codecs/dts */ "./src/avformat/codecs/dts.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\dts\\Dts2RawFilter.ts";













class Dts2RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    caches;
    cache;
    lastDts;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
        let buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        let firstGot = false;
        let hasCache = !!this.cache;
        if (hasCache) {
            buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__["default"])(Uint8Array, [this.cache, buffer]);
            this.cache = null;
        }
        while (i < buffer.length) {
            if (i > buffer.length - 6) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const info = _codecs_dts__WEBPACK_IMPORTED_MODULE_10__.parseHeader(buffer.subarray(i));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_12__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error('parse dts header failed', cheap__fileName__4, 84);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const item = {
                dts: lastDts,
                buffer: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
            };
            let frameLength = info.frameSize;
            item.buffer = buffer.subarray(i, i + frameLength);
            if (i + frameLength > buffer.length) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__.avRescaleQ)(BigInt(Math.floor(((info.sampleBlock * _codecs_dts__WEBPACK_IMPORTED_MODULE_10__.DTS_PCMBLOCK_SAMPLES) / info.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE))), avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            this.caches.push(item);
            i += frameLength;
            lastDts += duration;
            if (!firstGot && hasCache) {
                firstGot = true;
                lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
            }
        }
        this.lastDts = BigInt(0);
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.EOF;
        }
    }
    reset() {
        this.cache = null;
        this.lastDts = BigInt(0);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/mp3/Mp32RawFilter.ts":
/*!***********************************************!*\
  !*** ./src/avformat/bsf/mp3/Mp32RawFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mp32RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../formats/mp3/frameHeader */ "./src/avformat/formats/mp3/frameHeader.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\mp3\\Mp32RawFilter.ts";













class Mp32RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    frameHeader;
    caches;
    cache;
    lastDts;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        this.frameHeader = new _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.FrameHeader();
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
        let buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        let firstGot = false;
        let hasCache = !!this.cache;
        if (hasCache) {
            buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_12__["default"])(Uint8Array, [this.cache, buffer]);
            this.cache = null;
        }
        while (i < buffer.length) {
            const syncWord = (buffer[i] << 4) | ((buffer[i + 1] >> 4) & 0x0e);
            if (syncWord !== 0xFFE) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error(`found syncWord not 0xFFE, got: 0x${syncWord.toString(16)}`, cheap__fileName__4, 83);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const ver = (buffer[1] >>> 3) & 0x03;
            // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
            const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
            const item = {
                dts: lastDts,
                buffer: null,
                extradata: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
            };
            const sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_11__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
            _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.parse(this.frameHeader, (buffer[i] << 24) | (buffer[i + 1] << 16) | (buffer[i + 2] << 8) | buffer[i + 3]);
            let frameLength = _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.getFrameLength(this.frameHeader, sampleRate);
            item.buffer = buffer.subarray(i, i + frameLength);
            if (i + frameLength > buffer.length) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                break;
            }
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__.avRescaleQ)(BigInt(Math.floor(frameLength / sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            this.caches.push(item);
            i += frameLength;
            lastDts += duration;
            if (!firstGot && hasCache) {
                firstGot = true;
                lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
            }
        }
        this.lastDts = BigInt(0);
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.EOF;
        }
    }
    reset() {
        this.cache = null;
        this.lastDts = BigInt(0);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   parseADTSHeader: () => (/* binding */ parseADTSHeader),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseLATMHeader: () => (/* binding */ parseLATMHeader)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencyIndex, MPEG4SamplingFrequencies, MPEG4Channels, getAVCodecParameters */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/*
 * libmedia aac util
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


const AACProfile2Name = {
    [1 /* MPEG4AudioObjectTypes.AAC_MAIN */]: 'Main',
    [2 /* MPEG4AudioObjectTypes.AAC_LC */]: 'LC',
    [3 /* MPEG4AudioObjectTypes.AAC_SSR */]: 'LC',
    [4 /* MPEG4AudioObjectTypes.AAC_LTP */]: 'LC',
    [5 /* MPEG4AudioObjectTypes.AAC_SBR */]: 'HE',
    [6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */]: 'HE'
};
const MPEG4SamplingFrequencyIndex = {
    96000: 0,
    88200: 1,
    64000: 2,
    48000: 3,
    44100: 4,
    32000: 5,
    24000: 6,
    22050: 7,
    16000: 8,
    12000: 9,
    11025: 10,
    8000: 11,
    7350: 12
};
const MPEG4SamplingFrequencies = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE
];
const MPEG4Channels = [
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    1,
    2,
    3,
    4,
    5,
    6,
    7
];
/**
 * 解析 AAC AudioSpecificConfig
 *
 *             frequency
 *              44100Hz        fill bit
 *               4 bit          3 bit
 *              -------         -----
 *    0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0
 *    ---------         -------
 *      5 bit            4 bit
 *     AAC LC           fl, fr
 *    profile           channel
 *
 * url: https://wiki.multimedia.cx/index.php/MPEG-4_Audio#Audio_Specific_Config
 *
 */
function getAVCodecParameters(extradata) {
    let profile = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let sampleRate = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let channels = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    if (extradata.length >= 2) {
        profile = (extradata[0] >> 3) & 0x1f;
        sampleRate = MPEG4SamplingFrequencies[((extradata[0] & 0x07) << 1)
            | (extradata[1] >> 7)] ?? 48000;
        channels = MPEG4Channels[(extradata[1] >> 3) & 0x0f] ?? 2;
    }
    return {
        profile,
        sampleRate,
        channels
    };
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata) {
        const { profile, sampleRate, channels } = getAVCodecParameters(extradata);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channels;
    }
}
function avCodecParameters2Extradata(codecpar) {
    const samplingFreqIndex = MPEG4SamplingFrequencyIndex[codecpar.sampleRate];
    const channelConfig = codecpar.chLayout.nbChannels;
    const extradata = new Uint8Array(2);
    extradata[0] = ((codecpar.profile & 0x1f) << 3) | ((samplingFreqIndex & 0x0e) >> 1);
    extradata[1] = ((samplingFreqIndex & 0x01) << 7) | ((channelConfig & 0x0f) << 3);
    return extradata;
}
/**
 *
 * adts 封装转 raw
 *
 * bits
 * - 12  syncword
 * - 1   ID (MPEG 标识位，固定为 1)
 * - 2   Layer ( 固定为 0)
 * - 1   Protection Absent ( 指示是否有 CRC 校验，1 表示没有校验）
 * - 2   Profile
 * - 4   Sampling Frequency Index ( 采样率的索引）
 * - 1   Private Bit ( 保留位，一般设置为 0)
 * - 3   Channel Configuration ( 音频通道数）
 * - 1   Original Copy ( 原始拷贝标志位，一般设置为 0)
 * - 1   Home ( 保留位，一般设置为 0)
 * - 1   Copyright Identification Bit（置 0）
 * - 1   Copyright Identification Start（置 0）
 * - 13  Frame Length ( 帧长度，包括 ADTS 头和音频帧数据的长度）
 * - 11  Buffer Fullness ( 缓冲区满度，可用于音频流的同步）
 * - 2   Number of Raw Data Blocks in Frame ( 帧中原始数据块的数量）
 * - 16  CRC (Protection Absent 控制）
 * - N  raw aac data
 *
 */
function parseADTSHeader(buffer) {
    if (buffer.length < 7) {
        return -1;
    }
    const syncWord = (buffer[0] << 4) | (buffer[1] >> 4);
    if (syncWord !== 0xFFF) {
        return -1;
    }
    /*
      * const id = (buffer[1] & 0x08) >>> 3
      * const layer = (buffer[1] & 0x06) >>> 1
      */
    const protectionAbsent = buffer[1] & 0x01;
    const profile = (buffer[2] & 0xC0) >>> 6;
    const samplingFrequencyIndex = (buffer[2] & 0x3C) >>> 2;
    const channelConfiguration = ((buffer[2] & 0x01) << 2) | ((buffer[3] & 0xC0) >>> 6);
    // adts_variable_header()
    const aacFrameLength = ((buffer[3] & 0x03) << 11)
        | (buffer[4] << 3)
        | ((buffer[5] & 0xE0) >>> 5);
    const numberOfRawDataBlocksInFrame = buffer[6] & 0x03;
    let headerLength = protectionAbsent === 1 ? 7 : 9;
    let framePayloadLength = aacFrameLength - headerLength;
    return {
        syncWord,
        profile: profile + 1,
        sampleRate: MPEG4SamplingFrequencies[samplingFrequencyIndex],
        channels: MPEG4Channels[channelConfiguration],
        aacFrameLength,
        numberOfRawDataBlocksInFrame,
        headerLength,
        framePayloadLength
    };
}
function parseLATMHeader(buffer, bitReader) {
    if (!bitReader) {
        bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        bitReader.appendBuffer(buffer);
    }
    function getLATMValue() {
        const bytesForValue = bitReader.readU(2);
        let value = 0;
        for (let i = 0; i <= bytesForValue; i++) {
            value = value << 8;
            value = value | bitReader.readU(8);
        }
        return value;
    }
    const now = bitReader.getPointer();
    const info = {
        syncWord: 0,
        profile: 0,
        sampleRate: 0,
        channels: 0,
        useSameStreamMux: false,
        headerLength: 0,
        framePayloadLength: 0,
        muxLengthBytes: 0
    };
    const syncWord = bitReader.readU(11);
    if (syncWord !== 0x2B7) {
        return -1;
    }
    info.syncWord = syncWord;
    info.muxLengthBytes = bitReader.readU(13);
    const useSameStreamMux = bitReader.readU1() === 0x01;
    info.useSameStreamMux = useSameStreamMux;
    if (!useSameStreamMux) {
        const audioMuxVersion = bitReader.readU1() === 0x01;
        const audioMuxVersionA = audioMuxVersion && bitReader.readU1() === 0x01;
        if (audioMuxVersionA) {
            return -1;
        }
        if (audioMuxVersion) {
            getLATMValue();
        }
        const allStreamsSameTimeFraming = bitReader.readU1() === 0x01;
        if (!allStreamsSameTimeFraming) {
            return -1;
        }
        const numSubFrames = bitReader.readU(6);
        if (numSubFrames !== 0) {
            return -1;
        }
        const numProgram = bitReader.readU(4);
        if (numProgram !== 0) {
            return -1;
        }
        const numLayer = bitReader.readU(3);
        if (numLayer !== 0) {
            return -1;
        }
        let fillBits = audioMuxVersion ? getLATMValue() : 0;
        const audioObjectType = bitReader.readU(5);
        fillBits -= 5;
        const samplingFreqIndex = bitReader.readU(4);
        fillBits -= 4;
        const channelConfig = bitReader.readU(4);
        fillBits -= 4;
        bitReader.readU(3);
        fillBits -= 3;
        if (fillBits > 0) {
            bitReader.readU(fillBits);
        }
        const frameLengthType = bitReader.readU(3);
        if (frameLengthType === 0) {
            bitReader.readU(8);
        }
        else {
            return -1;
        }
        const otherDataPresent = bitReader.readU1() === 0x01;
        if (otherDataPresent) {
            if (audioMuxVersion) {
                getLATMValue();
            }
            else {
                let otherDataLenBits = 0;
                while (true) {
                    otherDataLenBits = otherDataLenBits << 8;
                    const otherDataLenEsc = bitReader.readU1() === 0x01;
                    const otherDataLenTmp = bitReader.readU(8);
                    otherDataLenBits += otherDataLenTmp;
                    if (!otherDataLenEsc) {
                        break;
                    }
                }
            }
        }
        const crcCheckPresent = bitReader.readU1() === 0x01;
        if (crcCheckPresent) {
            bitReader.readU(8);
        }
        info.profile = audioObjectType + 1;
        info.sampleRate = MPEG4SamplingFrequencies[samplingFreqIndex];
        info.channels = MPEG4Channels[channelConfig];
    }
    let length = 0;
    while (true) {
        const tmp = bitReader.readU(8);
        length += tmp;
        if (tmp !== 0xff) {
            break;
        }
    }
    info.framePayloadLength = length;
    info.headerLength = bitReader.getPointer() - now + (bitReader.getBitLeft() === 8 ? 0 : 1);
    return info;
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
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
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
function parseHeader(buf) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__["default"](buf.length);
    bitReader.appendBuffer(buf);
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
        bitrate: 0,
        channels: 0,
        frameSize: 0,
        channelLayout: BigInt(0),
        ac3BitrateCode: 0
    };
    info.syncWord = bitReader.readU(16);
    if (info.syncWord !== 0x0B77) {
        return -1;
    }
    info.bitstreamId = bitReader.peekU(29) & 0x1f;
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
        info.bitrate = (AC3BitrateTab[info.ac3BitrateCode] * 1000) >> info.srShift;
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
        info.bitrate = 8 * info.frameSize * info.sampleRate / (info.numBlocks * 256);
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
    }
    info.channelLayout = BigInt(AC3ChannelLayout[info.channelMode]);
    if (info.lfeOn) {
        info.channelLayout |= BigInt(8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */);
    }
    return info;
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

/***/ "./src/avformat/codecs/mp3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/mp3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP3Profile2Name: () => (/* binding */ MP3Profile2Name),
/* harmony export */   getBitRateByVersionLayerIndex: () => (/* binding */ getBitRateByVersionLayerIndex),
/* harmony export */   getFrameSizeByVersionLayer: () => (/* binding */ getFrameSizeByVersionLayer),
/* harmony export */   getProfileByLayer: () => (/* binding */ getProfileByLayer),
/* harmony export */   getSampleRateByVersionIndex: () => (/* binding */ getSampleRateByVersionIndex),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mp3 util
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

const MpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
const MpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
const MpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
const MpegAudioV10FrameSizeTable = [0, 1152, 1152, 384];
const MpegAudioV20FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV25FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV1L1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
const MpegAudioV1L2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
const MpegAudioV1L3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
const MpegAudioV2L1BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1];
const MpegAudioV2L2L3BitRateTable = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1];
function getSampleRateByVersionIndex(version, samplingFreqIndex) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25SampleRateTable[samplingFreqIndex];
        case 2:
            // MPEG 2
            return MpegAudioV20SampleRateTable[samplingFreqIndex];
        case 3:
            // MPEG 1
            return MpegAudioV10SampleRateTable[samplingFreqIndex];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getFrameSizeByVersionLayer(version, layer) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25FrameSizeTable[layer];
        case 2:
            // MPEG 2
            return MpegAudioV20FrameSizeTable[layer];
        case 3:
            // MPEG 1
            return MpegAudioV10FrameSizeTable[layer];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getBitRateByVersionLayerIndex(version, layer, index) {
    switch (layer) {
        // layer3
        case 1:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L3BitRateTable[index];
            }
            break;
        // layer2
        case 2:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L2BitRateTable[index];
            }
        // layer1
        case 3:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L1BitRateTable[index];
                case 3:
                    return MpegAudioV1L1BitRateTable[index];
            }
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getProfileByLayer(layer) {
    switch (layer) {
        case 1:
            // Layer 3
            return 34;
        case 2:
            // Layer 2
            return 33;
        case 3:
            // Layer 1
            return 32;
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
const MP3Profile2Name = {
    [32 /* MP3Profile.Layer1 */]: 'Layer1',
    [33 /* MP3Profile.Layer2 */]: 'Layer2',
    [34 /* MP3Profile.Layer3 */]: 'Layer3'
};
function parseAVCodecParameters(stream, buffer) {
    if (buffer && buffer.length >= 4) {
        const ver = (buffer[1] >>> 3) & 0x03;
        const layer = (buffer[1] & 0x06) >> 1;
        // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
        const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
        const channelMode = (buffer[3] >>> 6) & 0x03;
        const channelCount = channelMode !== 3 ? 2 : 1;
        const profile = getProfileByLayer(layer);
        const sampleRate = getSampleRateByVersionIndex(ver, samplingFreqIndex);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channelCount;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/mpegvideo.ts":
/*!******************************************!*\
  !*** ./src/avformat/codecs/mpegvideo.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIDR: () => (/* binding */ isIDR)
/* harmony export */ });
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/*
 * libmedia mpegvideo util
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

function isIDR(avpacket) {
    const data = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_0__.getAVPacketData)(avpacket);
    for (let i = 0; i < data.length - 6; i++) {
        if (data[i] === 0
            && data[i + 1] === 0
            && data[i + 2] === 1
            && data[i + 3] === 0) {
            const picType = (data[i + 5] >> 3) & 7;
            return picType === 1 /* MpegVideoPictureType.I */;
        }
    }
    return false;
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

/***/ "./src/avformat/formats/IMpegpsFormat.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/IMpegpsFormat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMpegpsFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mpegts/function/parsePES */ "./src/avformat/formats/mpegts/function/parsePES.ts");
/* harmony import */ var _mpegts_struct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mpegts/struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var _codecs_dts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../codecs/dts */ "./src/avformat/codecs/dts.ts");
/* harmony import */ var _codecs_mpegvideo__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../codecs/mpegvideo */ "./src/avformat/codecs/mpegvideo.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _mpegts_mpegps__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./mpegts/mpegps */ "./src/avformat/formats/mpegts/mpegps.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var _bsf_mp3_Mp32RawFilter__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../bsf/mp3/Mp32RawFilter */ "./src/avformat/bsf/mp3/Mp32RawFilter.ts");
/* harmony import */ var _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../formats/mp3/frameHeader */ "./src/avformat/formats/mp3/frameHeader.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var _bsf_ac3_Ac32RawFilter__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../bsf/ac3/Ac32RawFilter */ "./src/avformat/bsf/ac3/Ac32RawFilter.ts");
/* harmony import */ var _bsf_dts_Dts2RawFilter__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../bsf/dts/Dts2RawFilter */ "./src/avformat/bsf/dts/Dts2RawFilter.ts");
/* harmony import */ var _bsf_aac_ADTS2RawFilter__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../bsf/aac/ADTS2RawFilter */ "./src/avformat/bsf/aac/ADTS2RawFilter.ts");
var cheap__fileName__2 = "src\\avformat\\formats\\IMpegpsFormat.ts";



































class IMpegpsFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_7__["default"] {
    type = 3 /* AVFormat.MPEGPS */;
    context;
    cacheAVPacket;
    constructor() {
        super();
        this.context = {
            headerState: 0xff,
            psmType: new Map(),
            pes: new _mpegts_struct__WEBPACK_IMPORTED_MODULE_6__.PES(),
            slices: new Map(),
            lastPtsMap: new Map(),
            imkhCctv: false,
            sofdec: false,
            ioEnded: false,
            paddingPES: null
        };
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
        this.cacheAVPacket = 0;
    }
    destroy(formatContext) {
        super.destroy(formatContext);
        if (this.cacheAVPacket) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.destroyAVPacket)(this.cacheAVPacket);
            this.cacheAVPacket = 0;
        }
        common_util_array__WEBPACK_IMPORTED_MODULE_12__.each(formatContext.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.filter) {
                streamContext.filter.destroy();
                streamContext.filter = null;
            }
        });
    }
    async findNextStartCode(formatContext) {
        let code = 0xff;
        let n = 0;
        while (n < _mpegts_mpegps__WEBPACK_IMPORTED_MODULE_25__.MAX_SYNC_SIZE) {
            const v = await formatContext.ioReader.readUint8();
            if (code === 0x000001) {
                code = ((code << 8) | v) & 0xffffff;
                break;
            }
            code = ((code << 8) | v) & 0xffffff;
            n++;
        }
        if (n === _mpegts_mpegps__WEBPACK_IMPORTED_MODULE_25__.MAX_SYNC_SIZE) {
            code = -1;
        }
        this.context.headerState = code;
        return code;
    }
    async parsePSM(formatContext) {
        const psmLength = await formatContext.ioReader.readUint16();
        await formatContext.ioReader.skip(2);
        const psInfoLength = await formatContext.ioReader.readUint16();
        await formatContext.ioReader.skip(psInfoLength);
        // es_map_length
        await formatContext.ioReader.readUint16();
        let esMapLength = psmLength - psInfoLength - 10;
        while (esMapLength >= 4) {
            const type = await formatContext.ioReader.readUint8();
            const id = await formatContext.ioReader.readUint8();
            const length = await formatContext.ioReader.readUint16();
            this.context.psmType.set(id, type);
            await formatContext.ioReader.skip(length);
            esMapLength -= (length + 4);
        }
        // crc32
        await formatContext.ioReader.readUint32();
    }
    async readPES(formatContext) {
        while (true) {
            const startCode = await this.findNextStartCode(formatContext);
            if (startCode < 0) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            if (startCode === 442 /* mpegps.MpegpsStartCode.PACK_START */
                || startCode === 443 /* mpegps.MpegpsStartCode.SYSTEM_HEADER_START */) {
                continue;
            }
            if (startCode === 446 /* mpegps.MpegpsStartCode.PADDING_STREAM */
                || startCode === 447 /* mpegps.MpegpsStartCode.PRIVATE_STREAM_2 */) {
                const len = await formatContext.ioReader.readUint16();
                await formatContext.ioReader.skip(len);
                continue;
            }
            if (startCode === 444 /* mpegps.MpegpsStartCode.PROGRAM_STREAM_MAP */) {
                await this.parsePSM(formatContext);
                continue;
            }
            if (!((startCode >= 0x1c0 && startCode <= 0x1df)
                || (startCode >= 0x1e0 && startCode <= 0x1ef)
                || (startCode == 0x1bd)
                || (startCode == 447 /* mpegps.MpegpsStartCode.PRIVATE_STREAM_2 */)
                || (startCode == 0x1fd))) {
                continue;
            }
            const len = await formatContext.ioReader.readUint16();
            this.context.pes.pos = formatContext.ioReader.getPos() - BigInt(6);
            this.context.pes.streamId = startCode & 0xff;
            this.context.pes.streamType = this.context.psmType[this.context.pes.streamId];
            const data = new Uint8Array(len + 6);
            data[0] = 0;
            data[1] = 0;
            data[2] = 1;
            data[3] = this.context.pes.streamId;
            data[4] = len >> 8;
            data[5] = len & 0xff;
            await formatContext.ioReader.readBuffer(len, data.subarray(6));
            this.context.pes.data = data;
            return startCode;
        }
    }
    createStream(formatContext, streamType, streamId, startCode) {
        let codecId = 0 /* AVCodecID.AV_CODEC_ID_NONE */;
        let type = -1 /* AVMediaType.AVMEDIA_TYPE_UNKNOWN */;
        switch (streamId) {
            case 226 /* mpegps.MpegpsStreamId.H264_ID */:
                type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
                break;
            case 128 /* mpegps.MpegpsStreamId.AC3_ID */:
                type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
                break;
            case 136 /* mpegps.MpegpsStreamId.DTS_ID */:
                type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                codecId = 86020 /* AVCodecID.AV_CODEC_ID_DTS */;
                break;
            case 160 /* mpegps.MpegpsStreamId.LPCM_ID */:
                type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                codecId = 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */;
                break;
            case 32 /* mpegps.MpegpsStreamId.SUB_ID */:
                type = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
                codecId = 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */;
                break;
            default: {
                switch (streamType) {
                    case 1 /* mpegts.TSStreamType.VIDEO_MPEG1 */:
                    case 2 /* mpegts.TSStreamType.VIDEO_MPEG2 */:
                        type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        codecId = 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */;
                        break;
                    case 3 /* mpegts.TSStreamType.AUDIO_MPEG1 */:
                    case 4 /* mpegts.TSStreamType.AUDIO_MPEG2 */:
                        type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        codecId = 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
                        break;
                    case 15 /* mpegts.TSStreamType.AUDIO_AAC */:
                        type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
                        break;
                    case 16 /* mpegts.TSStreamType.VIDEO_MPEG4 */:
                        type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        codecId = 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */;
                        break;
                    case 27 /* mpegts.TSStreamType.VIDEO_H264 */:
                        type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
                        break;
                    case 36 /* mpegts.TSStreamType.VIDEO_HEVC */:
                        type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        codecId = 173 /* AVCodecID.AV_CODEC_ID_HEVC */;
                        break;
                    case 51 /* mpegts.TSStreamType.VIDEO_VVC */:
                        type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                        codecId = 196 /* AVCodecID.AV_CODEC_ID_VVC */;
                        break;
                    case 129 /* mpegts.TSStreamType.AUDIO_AC3 */:
                        type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
                        break;
                    case 0x90:
                        type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        codecId = 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */;
                        break;
                    case 0x91:
                        type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                        codecId = 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */;
                        break;
                    case 447 /* mpegps.MpegpsStartCode.PRIVATE_STREAM_2 */:
                        type = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
                        codecId = 98312 /* AVCodecID.AV_CODEC_ID_DVD_NAV */;
                        break;
                    default: {
                        if (startCode >= 0x1e0 && startCode <= 0x1ef) {
                            type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                            codecId = 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */;
                        }
                        else if (startCode >= 0x1c0 && startCode <= 0x1df) {
                            type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                            codecId = 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
                        }
                        else if (startCode >= 0x80 && startCode <= 0x87) {
                            type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                            codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
                        }
                        else if ((startCode >= 0x88 && startCode <= 0x8f)
                            || (startCode >= 0x98 && startCode <= 0x9f)) {
                            type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                            codecId = 86020 /* AVCodecID.AV_CODEC_ID_DTS */;
                        }
                        else if (startCode >= 0xb0 && startCode <= 0xbf) {
                            type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                            codecId = 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */;
                        }
                        else if (startCode >= 0xc0 && startCode <= 0xcf) {
                            type = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                            codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
                        }
                        else if (startCode >= 0x20 && startCode <= 0x3f) {
                            type = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
                            codecId = 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */;
                        }
                        else if (startCode >= 0xfd55 && startCode <= 0xfd5f) {
                            type = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                            codecId = 70 /* AVCodecID.AV_CODEC_ID_VC1 */;
                        }
                        else {
                            return;
                        }
                    }
                }
                break;
            }
        }
        const stream = formatContext.createStream();
        stream.codecpar.codecType = type;
        stream.codecpar.codecId = codecId;
        stream.timeBase.den = 90000;
        stream.timeBase.num = 1;
        const context = stream.privData = {
            streamId,
            streamType,
            filter: null,
            paddingPES: null
        };
        if (codecId === 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */
            || codecId === 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */) {
            stream.codecpar.chLayout.nbChannels = 1;
            stream.codecpar.sampleRate = 8000;
            stream.codecpar.chLayout.order = 1 /* AVChannelOrder.AV_CHANNEL_ORDER_NATIVE */;
            stream.codecpar.chLayout.u.mask = BigInt(4 /* AV_CH_LAYOUT.AV_CH_LAYOUT_MONO */ >>> 0);
        }
        if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
            context.filter = new _bsf_mp3_Mp32RawFilter__WEBPACK_IMPORTED_MODULE_28__["default"]();
        }
        else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
            context.filter = new _bsf_ac3_Ac32RawFilter__WEBPACK_IMPORTED_MODULE_31__["default"]();
        }
        else if (stream.codecpar.codecId === 86020 /* AVCodecID.AV_CODEC_ID_DTS */) {
            context.filter = new _bsf_dts_Dts2RawFilter__WEBPACK_IMPORTED_MODULE_32__["default"]();
        }
        else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
            context.filter = new _bsf_aac_ADTS2RawFilter__WEBPACK_IMPORTED_MODULE_33__["default"]();
        }
        if (context.filter) {
            context.filter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
        }
        return stream;
    }
    async readHeader(formatContext) {
        const str = await formatContext.ioReader.peekString(6);
        if (str.substring(0, 4) === 'IMKH') {
            this.context.imkhCctv = true;
            await formatContext.ioReader.skip(4);
        }
        else if (str === 'Sofdec') {
            this.context.sofdec = true;
            await formatContext.ioReader.skip(6);
        }
        const signature = await formatContext.ioReader.peekUint32();
        if (signature !== 442 /* mpegps.MpegpsStartCode.PACK_START */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('the file format is not mpegps', cheap__fileName__2, 386);
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        if (formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */) {
            const now = formatContext.ioReader.getPos();
            const MAX = BigInt(500) * BigInt(1000);
            const fileSize = await formatContext.ioReader.fileSize();
            let pos = fileSize - MAX;
            if (pos < now) {
                pos = now;
            }
            await formatContext.ioReader.seek(pos);
            try {
                this.context.pes.pts = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
                while (true) {
                    await this.readPES(formatContext);
                    (0,_mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_5__["default"])(this.context.pes);
                    if (this.context.pes.pts !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
                        this.context.lastPtsMap.set(this.context.pes.streamId, this.context.pes.pts);
                    }
                }
            }
            catch (error) {
                await formatContext.ioReader.seek(now);
            }
        }
        this.context.ioEnded = false;
        return 0;
    }
    checkExtradata(avpacket, stream) {
        if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */
            && stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE) {
            const buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
            const ver = (buffer[1] >>> 3) & 0x03;
            const layer = (buffer[1] & 0x06) >> 1;
            // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
            const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
            const channelMode = (buffer[3] >>> 6) & 0x03;
            const channelCount = channelMode !== 3 ? 2 : 1;
            const profile = _codecs_mp3__WEBPACK_IMPORTED_MODULE_14__.getProfileByLayer(layer);
            const sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_14__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
            stream.codecpar.profile = profile;
            stream.codecpar.sampleRate = sampleRate;
            stream.codecpar.chLayout.nbChannels = channelCount;
        }
        else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
            && stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE) {
            const buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
            const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_20__.parseHeader(buffer);
            if (!common_util_is__WEBPACK_IMPORTED_MODULE_30__.number(info)) {
                stream.codecpar.sampleRate = info.sampleRate;
                stream.codecpar.chLayout.nbChannels = info.channels;
                stream.codecpar.bitrate = BigInt(info.bitrate);
            }
        }
        else if (stream.codecpar.codecId === 86020 /* AVCodecID.AV_CODEC_ID_DTS */
            && stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE) {
            const buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
            const info = _codecs_dts__WEBPACK_IMPORTED_MODULE_21__.parseHeader(buffer);
            if (!common_util_is__WEBPACK_IMPORTED_MODULE_30__.number(info)) {
                stream.codecpar.sampleRate = info.sampleRate;
                stream.codecpar.chLayout.nbChannels = info.channels;
                stream.codecpar.bitrate = BigInt(info.bitrate >> 0);
            }
        }
        else if (!stream.codecpar.extradata) {
            let element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMalloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](element + 4));
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.memcpy)(stream.codecpar.extradata, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](element + 4));
                stream.codecpar.extradataSize = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](element + 4);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.deleteAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
                if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                    _codecs_h264__WEBPACK_IMPORTED_MODULE_15__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
                else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                    _codecs_hevc__WEBPACK_IMPORTED_MODULE_16__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
                else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                    _codecs_vvc__WEBPACK_IMPORTED_MODULE_17__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
                else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    _codecs_aac__WEBPACK_IMPORTED_MODULE_18__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
                else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                    _codecs_opus__WEBPACK_IMPORTED_MODULE_19__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
            }
        }
    }
    parseSlice(slice, formatContext, avpacket, stream) {
        const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_26__["default"])(Uint8Array, slice.buffers);
        const streamContext = stream.privData;
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
        const codecId = stream.codecpar.codecId;
        if (codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
            || codecId === 173 /* AVCodecID.AV_CODEC_ID_H265 */
            || codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 80, 2 /* h264.BitFormat.ANNEXB */);
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, stream.index);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 16, slice.dts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 8, slice.pts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, slice.pos);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, 90000);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, 1);
        if (stream.startTime === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
            stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16);
            if (this.context.lastPtsMap.has(streamContext.streamId)) {
                stream.duration = this.context.lastPtsMap.get(streamContext.streamId) - stream.startTime;
            }
        }
        const payload = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMalloc)(data.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_24__.memcpyFromUint8Array)(payload, data.length, data);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, payload, data.length);
        if (streamContext.filter) {
            let ret = 0;
            ret = streamContext.filter.sendAVPacket(avpacket);
            if (ret < 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('send avpacket to bsf failed', cheap__fileName__2, 534);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            ret = streamContext.filter.receiveAVPacket(avpacket);
            if (ret < 0) {
                return ret;
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, 90000);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, 1);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            this.checkExtradata(avpacket, stream);
            while (true) {
                const avpacket = this.cacheAVPacket || (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.createAVPacket)();
                ret = streamContext.filter.receiveAVPacket(avpacket);
                if (ret === 0) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, 90000);
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, 1);
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                    this.checkExtradata(avpacket, stream);
                    formatContext.interval.packetBuffer.push(avpacket);
                    this.cacheAVPacket = 0;
                }
                else {
                    this.cacheAVPacket = avpacket;
                    break;
                }
            }
        }
        else {
            if (stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */) {
                if (_codecs_mpegvideo__WEBPACK_IMPORTED_MODULE_22__.isIDR(avpacket)) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
            else if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                if (!stream.codecpar.extradata) {
                    _codecs_h264__WEBPACK_IMPORTED_MODULE_15__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
                if (_codecs_h264__WEBPACK_IMPORTED_MODULE_15__.isIDR(avpacket)) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
            else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                if (!stream.codecpar.extradata) {
                    _codecs_hevc__WEBPACK_IMPORTED_MODULE_16__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
                if (_codecs_hevc__WEBPACK_IMPORTED_MODULE_16__.isIDR(avpacket)) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
            else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                if (!stream.codecpar.extradata) {
                    _codecs_vvc__WEBPACK_IMPORTED_MODULE_17__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
                if (_codecs_vvc__WEBPACK_IMPORTED_MODULE_17__.isIDR(avpacket)) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
        }
        return 0;
    }
    getMpegVideoNextFrame(offset, payload, stream) {
        while (true) {
            const next = avutil_util_nalu__WEBPACK_IMPORTED_MODULE_27__.getNextNaluStart(payload, offset);
            if (next.offset >= 0) {
                if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    && next.startCode === 4
                    || stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */
                        && next.startCode === 3
                        && (next.offset + 3 < payload.length)
                        && (payload[next.offset + 3] < 0x01
                            || payload[next.offset + 3] > 0xaf)
                        && payload[next.offset + 3] !== 0xb5) {
                    return payload[next.offset + 3] === 0xb7 ? (next.offset + 4) : next.offset;
                }
                else if (stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */
                    && next.startCode === 4
                    && (next.offset + 4 < payload.length)
                    && (payload[next.offset + 4] < 0x01
                        || payload[next.offset + 4] > 0xaf)
                    && payload[next.offset + 4] !== 0xb5) {
                    return payload[next.offset + 4] === 0xb7 ? (next.offset + 5) : (next.offset + 1);
                }
                offset = next.offset + 3;
            }
            else {
                return -1;
            }
        }
    }
    getMpegAudioNextFrame(payload, stream) {
        let first = 0;
        let end = 2;
        if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
            first = 0x0b;
        }
        else if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
            first = 0xff;
        }
        else {
            first = 0x7f;
            end = 4;
        }
        for (let i = 0; i < payload.length - end; i++) {
            if (payload[i] === first) {
                const second = payload[i + 1];
                const max = 2;
                if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */ && ((second & 0xe0) === 0xe0)) {
                    if (i !== 0) {
                        let count = 0;
                        let offset = 0;
                        while (true) {
                            const header = new _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_29__.FrameHeader();
                            _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_29__.parse(header, (payload[i + offset] << 24)
                                | (payload[i + offset + 1] << 16)
                                | (payload[i + offset + 2] << 8)
                                | payload[i + offset + 3]);
                            const ver = (payload[i + offset + 1] >>> 3) & 0x03;
                            const samplingFreqIndex = (payload[i + offset + 2] & 0x0C) >>> 2;
                            const sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_14__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
                            let frameLength = _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_29__.getFrameLength(header, sampleRate);
                            if (frameLength
                                && (i + offset + frameLength < payload.length - 2)
                                && payload[i + offset + frameLength] === 0xff
                                && (payload[i + offset + frameLength + 1] & 0xe0) === 0xe0) {
                                count++;
                                offset += frameLength;
                                if (count === max) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        if (count === max) {
                            return i;
                        }
                        else {
                            continue;
                        }
                    }
                    break;
                }
                else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */ && second === 0x77) {
                    if (i !== 0) {
                        let count = 0;
                        let offset = 0;
                        while (true) {
                            const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_20__.parseHeader(payload.subarray(i + offset));
                            if (!common_util_is__WEBPACK_IMPORTED_MODULE_30__.number(info)
                                && (i + offset + info.frameSize < payload.length - 2)
                                && payload[i + offset + info.frameSize] === 0x0b
                                && payload[i + offset + info.frameSize + 1] === 0x77) {
                                count++;
                                offset += info.frameSize;
                                if (count === max) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        if (count === max) {
                            return i;
                        }
                        else {
                            continue;
                        }
                    }
                    break;
                }
                if (stream.codecpar.codecId === 86020 /* AVCodecID.AV_CODEC_ID_DTS */
                    && second === 0xfe
                    && payload[i + 2] === 0x80
                    && payload[i + 3] === 0x81) {
                    if (i !== 0) {
                        let count = 0;
                        let offset = 0;
                        while (true) {
                            const info = _codecs_dts__WEBPACK_IMPORTED_MODULE_21__.parseHeader(payload.subarray(i + offset));
                            if (!common_util_is__WEBPACK_IMPORTED_MODULE_30__.number(info)
                                && (i + offset + info.frameSize < payload.length - 4)
                                && payload[i + offset + info.frameSize] === 0x7f
                                && payload[i + offset + info.frameSize + 1] === 0xfe
                                && payload[i + offset + info.frameSize + 2] === 0x80
                                && payload[i + offset + info.frameSize + 3] === 0x81) {
                                count++;
                                offset += info.frameSize;
                                if (count === max) {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        if (count === max) {
                            return i;
                        }
                        else {
                            continue;
                        }
                    }
                    break;
                }
            }
        }
        return -1;
    }
    async readAVPacket_(formatContext, avpacket) {
        const handlePES = (context, stream) => {
            let slice = this.context.slices.get(context.streamId);
            if (!slice) {
                slice = {
                    pts: -BigInt(1),
                    dts: -BigInt(1),
                    pos: -BigInt(1),
                    buffers: []
                };
                this.context.slices.set(context.streamId, slice);
            }
            if (this.context.pes.dts === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT || !slice.buffers.length) {
                if (this.context.pes.dts !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
                    slice.dts = this.context.pes.dts;
                    slice.pts = this.context.pes.pts;
                    slice.pos = this.context.pes.pos;
                    // 剔除前一个包的数据
                    if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                        const offset = this.getMpegVideoNextFrame(0, this.context.pes.payload, stream);
                        if (offset > 0) {
                            this.context.pes.payload = this.context.pes.payload.subarray(offset);
                        }
                        // need next pes
                        else if (offset < 0) {
                            context.paddingPES = common_util_object__WEBPACK_IMPORTED_MODULE_13__.extend({}, this.context.pes);
                            return true;
                        }
                    }
                    else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
                        || stream.codecpar.codecId === 86020 /* AVCodecID.AV_CODEC_ID_DTS */
                        || stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
                        const offset = this.getMpegAudioNextFrame(this.context.pes.payload, stream);
                        if (offset > 0) {
                            this.context.pes.payload = this.context.pes.payload.subarray(offset);
                        }
                    }
                }
                slice.buffers.push(this.context.pes.payload);
                return true;
            }
            else {
                let ret = 0;
                if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                    let offset = this.getMpegVideoNextFrame(0, this.context.pes.payload, stream);
                    if (offset > 0) {
                        slice.buffers.push(this.context.pes.payload.subarray(0, offset));
                        this.context.pes.payload = this.context.pes.payload.subarray(offset);
                    }
                    // need next pes
                    else if (offset < 0) {
                        context.paddingPES = common_util_object__WEBPACK_IMPORTED_MODULE_13__.extend({}, this.context.pes);
                        return true;
                    }
                }
                // mpeg1/mpeg2 可能有多个帧
                if (stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */) {
                    let payload = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_26__["default"])(Uint8Array, slice.buffers);
                    const list = [];
                    while (true) {
                        let offset = 0;
                        let pos = 0;
                        let hasPic = false;
                        while (true) {
                            const next = this.getMpegVideoNextFrame(pos, payload, stream);
                            if (next >= 0) {
                                if (hasPic) {
                                    offset = next;
                                    break;
                                }
                                const type = payload[next + 3];
                                if (type === 0x00) {
                                    hasPic = true;
                                }
                                pos = next + 3;
                            }
                            else {
                                break;
                            }
                        }
                        if (offset > 0) {
                            list.push(payload.subarray(0, offset));
                            payload = payload.subarray(offset);
                        }
                        else {
                            break;
                        }
                    }
                    list.push(payload);
                    if (list.length > 1) {
                        const dtsDelta = (this.context.pes.dts - slice.dts) / BigInt(Math.floor(list.length));
                        const ptsDelta = (this.context.pes.pts - slice.pts) / BigInt(Math.floor(list.length));
                        for (let i = 0; i < list.length; i++) {
                            slice.buffers.length = 0;
                            slice.buffers.push(list[i]);
                            slice.dts += dtsDelta * BigInt(Math.floor(i));
                            slice.pts += ptsDelta * BigInt(Math.floor(i));
                            if (i === 0) {
                                this.parseSlice(slice, formatContext, avpacket, stream);
                            }
                            else {
                                const cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.createAVPacket)();
                                this.parseSlice(slice, formatContext, cache, stream);
                                formatContext.interval.packetBuffer.push(cache);
                            }
                        }
                    }
                    else {
                        slice.buffers = list;
                        this.parseSlice(slice, formatContext, avpacket, stream);
                    }
                }
                else {
                    ret = this.parseSlice(slice, formatContext, avpacket, stream);
                }
                slice.buffers.length = 0;
                if (this.context.paddingPES) {
                    // 更新 this.context.paddingPES 为下一帧数据的开始位置
                    this.context.paddingPES.payload = this.context.pes.payload;
                }
                else {
                    slice.buffers.push(this.context.pes.payload);
                    slice.dts = this.context.pes.dts;
                    slice.pts = this.context.pes.pts;
                    slice.pos = this.context.pes.pos;
                }
                if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_4__.EOF) {
                    return true;
                }
                return false;
            }
        };
        while (true) {
            let startCode = 0;
            if (this.context.paddingPES) {
                this.context.pes = this.context.paddingPES;
                this.context.paddingPES = null;
            }
            else {
                startCode = await this.readPES(formatContext);
                (0,_mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_5__["default"])(this.context.pes);
                if (startCode === 445 /* mpegps.MpegpsStartCode.PRIVATE_STREAM_1 */) {
                    startCode = this.context.pes.payload[0];
                    if (startCode === 0x0b) {
                        if (this.context.pes.payload[1] === 0x77) {
                            startCode = 0x80;
                        }
                        else {
                            this.context.pes.payload = this.context.pes.payload.subarray(1);
                        }
                    }
                    else {
                        if (startCode >= 0x80 && startCode <= 0xcf) {
                            this.context.pes.payload = this.context.pes.payload.subarray(4);
                        }
                        else {
                            this.context.pes.payload = this.context.pes.payload.subarray(1);
                        }
                    }
                    this.context.pes.streamId = startCode & 0xff;
                }
            }
            let stream = formatContext.streams.find(((stream) => {
                const context = stream.privData;
                return context.streamId === this.context.pes.streamId;
            }));
            if (!stream) {
                const id = startCode & 0xff;
                stream = this.createStream(formatContext, this.context.psmType.get(id), id, startCode);
            }
            if (stream) {
                const context = stream.privData;
                if (!this.context.pes.payload) {
                    continue;
                }
                // 当前流有 paddingPES 需要合并
                // 出现在 0x000001 在 paddingPES 的最后位置
                if (context.paddingPES) {
                    context.paddingPES.payload = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_26__["default"])(Uint8Array, [context.paddingPES.payload, this.context.pes.payload]);
                    if (this.context.pes.dts === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
                        this.context.pes = context.paddingPES;
                        context.paddingPES = null;
                    }
                    else {
                        // 新的帧先放到 this.context 下面，下一次处理
                        this.context.paddingPES = this.context.pes;
                        this.context.pes = context.paddingPES;
                        context.paddingPES = null;
                    }
                }
                if (handlePES(context, stream)) {
                    continue;
                }
                return 0;
            }
        }
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            if (this.context.ioEnded) {
                if (this.context.slices.size) {
                    let slice;
                    let stream;
                    this.context.slices.forEach((value, id) => {
                        if (value.buffers.length) {
                            stream = formatContext.streams.find(((stream) => {
                                const context = stream.privData;
                                return context.streamId === id;
                            }));
                            if (stream) {
                                slice = value;
                            }
                        }
                    });
                    if (slice) {
                        this.parseSlice(slice, formatContext, avpacket, stream);
                        slice.buffers.length = 0;
                        slice.pts = slice.dts = slice.pos = -BigInt(1);
                        return 0;
                    }
                }
                return -1048576 /* IOError.END */;
            }
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`read packet error, ${error}`, cheap__fileName__2, 1026);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            else {
                this.context.ioEnded = true;
                return this.readAVPacket(formatContext, avpacket);
            }
        }
    }
    async syncPSPacket(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
        try {
            this.context.pes.pts = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
            while (this.context.pes.pts === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
                await this.readPES(formatContext);
                (0,_mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_5__["default"])(this.context.pes);
                pos = this.context.pes.pos;
            }
        }
        catch (error) {
            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        let now = formatContext.ioReader.getPos();
        this.context.slices.forEach((slice) => {
            if (slice.buffers.length && slice.pos < now) {
                now = slice.pos;
            }
            slice.buffers.length = 0;
            slice.pts = slice.dts = slice.pos = -BigInt(1);
        });
        formatContext.streams.forEach((stream) => {
            const context = stream.privData;
            if (context.filter) {
                context.filter.reset();
            }
        });
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncPSPacket(formatContext);
            }
            this.context.ioEnded = false;
            return now;
        }
        else {
            if (stream && stream.sampleIndexes.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_12__.binarySearch(stream.sampleIndexes, (item) => {
                    if (item.pts > timestamp) {
                        return -1;
                    }
                    return 1;
                });
                if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_11__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_MILLI_TIME_BASE_Q) < BigInt(10000)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_3__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__2, 1111);
                    await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                    this.context.ioEnded = false;
                    return now;
                }
            }
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__2, 1118);
            let ret = await (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_10__["default"])(formatContext, stream, timestamp, BigInt(0), this.readAVPacket.bind(this), this.syncPSPacket.bind(this));
            if (ret >= 0) {
                this.context.ioEnded = false;
            }
            return ret;
        }
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mp3/frameHeader.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/mp3/frameHeader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FrameHeader: () => (/* binding */ FrameHeader),
/* harmony export */   getFrameLength: () => (/* binding */ getFrameLength),
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/*
 * libmedia mp3 FrameHeader utils
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

class FrameHeader {
    version;
    layer;
    protection;
    bitrateIndex;
    samplingFrequency;
    padding;
    private;
    mode;
    modeExtension;
    copyright;
    original;
    emphasis;
}
function parse(header, value) {
    header.version = (value >> 19) & 3;
    header.layer = (value >> 17) & 3;
    header.protection = (value >> 16) & 1;
    header.bitrateIndex = (value >> 12) & 0x0f;
    header.samplingFrequency = (value >> 10) & 3;
    header.padding = (value >> 9) & 1;
    header.mode = (value >> 6) & 3;
    header.modeExtension = (value >> 4) & 3;
    header.copyright = (value >> 3) & 1;
    header.original = (value >> 2) & 1;
    header.emphasis = value & 3;
}
function getFrameLength(header, sampleRate) {
    let frameSize = _codecs_mp3__WEBPACK_IMPORTED_MODULE_0__.getBitRateByVersionLayerIndex(header.version, header.layer, header.bitrateIndex);
    switch (header.layer) {
        case 1:
        default:
            // Layer 3
            frameSize = ((frameSize * 144000) / (sampleRate << ((header.version === 3) ? 0 : 1))) >>> 0;
            frameSize += header.padding;
            break;
        case 2:
            // Layer 2
            frameSize = ((frameSize * 144000) / sampleRate) >>> 0;
            frameSize += header.padding;
            break;
        case 3:
            // Layer 1
            frameSize = ((frameSize * 12000) / sampleRate) >>> 0;
            frameSize = (frameSize + header.padding) * 4;
            break;
    }
    return frameSize;
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

/***/ "./src/avformat/formats/mpegts/mpegps.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/mpegps.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_SYNC_SIZE: () => (/* binding */ MAX_SYNC_SIZE)
/* harmony export */ });
/*
 * libmedia mpegps identify defined
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
const MAX_SYNC_SIZE = 100000;


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
//# sourceMappingURL=src_avformat_formats_IMpegpsFormat_ts.avplayer.js.map