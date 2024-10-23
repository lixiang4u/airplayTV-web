"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IMpegtsFormat_ts"],{

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

/***/ "./src/avformat/bsf/aac/LATM2RawFilter.ts":
/*!************************************************!*\
  !*** ./src/avformat/bsf/aac/LATM2RawFilter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LATM2RawFilter)
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
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\aac\\LATM2RawFilter.ts";
















class LATM2RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_4__["default"] {
    bitReader;
    streamMuxConfig;
    caches;
    refSampleDuration;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        this.refSampleDuration = BigInt(0);
        this.bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_13__["default"]();
        this.streamMuxConfig = {
            profile: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            sampleRate: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE,
            channels: avutil_constant__WEBPACK_IMPORTED_MODULE_8__.NOPTS_VALUE
        };
        return 0;
    }
    sendAVPacket(avpacket) {
        const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        this.bitReader.appendBuffer(buffer);
        let lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
        while (this.bitReader.remainingLength() >= 20) {
            const now = this.bitReader.getPointer();
            const info = _codecs_aac__WEBPACK_IMPORTED_MODULE_9__.parseLATMHeader(null, this.bitReader);
            if (common_util_is__WEBPACK_IMPORTED_MODULE_14__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error('AACLATMParser parse failed', cheap__fileName__4, 94);
                this.bitReader.reset();
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            if (info.framePayloadLength >= this.bitReader.remainingLength()) {
                this.bitReader.skipPadding();
                this.bitReader.setPointer(now);
                break;
            }
            if (!info.useSameStreamMux) {
                this.streamMuxConfig.profile = info.profile;
                this.streamMuxConfig.sampleRate = info.sampleRate;
                this.streamMuxConfig.channels = info.channels;
            }
            const length = info.framePayloadLength;
            const rawData = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
                rawData[i] = this.bitReader.readU(8);
            }
            const item = {
                dts: lastDts,
                buffer: rawData,
                extradata: null
            };
            const hasNewExtraData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 48) !== this.streamMuxConfig.profile
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136) !== this.streamMuxConfig.sampleRate
                || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 116) !== this.streamMuxConfig.channels;
            if (hasNewExtraData) {
                this.refSampleDuration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_10__.avRescaleQ)(BigInt(Math.floor(1024 / this.streamMuxConfig.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_8__.AV_TIME_BASE_Q, this.inTimeBase);
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
            lastDts += this.refSampleDuration;
            this.bitReader.skipPadding();
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
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, this.refSampleDuration);
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
        this.bitReader.reset();
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/opus/Mpegts2RawFilter.ts":
/*!***************************************************!*\
  !*** ./src/avformat/bsf/opus/Mpegts2RawFilter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mpegts2RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
var cheap__fileName__2 = "src\\avformat\\bsf\\opus\\Mpegts2RawFilter.ts";











class Mpegts2RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    caches;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
        const buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.getAVPacketData)(avpacket);
        while (i < buffer.length) {
            const syncWord = (buffer[i] << 3) | (buffer[i + 1] >> 5);
            if (syncWord !== 0x3ff) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(`MpegtsOpusParser found syncWord not 0x3ff, got: 0x${syncWord.toString(16)}`, cheap__fileName__2, 67);
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            const opusPendingTrimStart = (buffer[i + 1] & 0x10) !== 0;
            const trimEnd = (buffer[i + 1] & 0x08) !== 0;
            let index = i + 2;
            let size = 0;
            while (buffer[index] === 0xFF) {
                size += 255;
                index++;
            }
            size += buffer[index];
            index++;
            index += opusPendingTrimStart ? 2 : 0;
            index += trimEnd ? 2 : 0;
            let samples = buffer.subarray(index, index + size);
            const sampleRate = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136) > 0 ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 136) : 48000;
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ)(BigInt(Math.floor(_codecs_opus__WEBPACK_IMPORTED_MODULE_5__.getBufferSamples(samples) / sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_TIME_BASE_Q, this.inTimeBase);
            this.caches.push({
                dts: lastDts,
                buffer: samples.slice(),
                duration: Number(duration),
            });
            lastDts += duration;
            i = index + size;
        }
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
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

/***/ "./src/avformat/formats/IMpegtsFormat.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/IMpegtsFormat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMpegtsFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mpegts/function/createMpegtsContext */ "./src/avformat/formats/mpegts/function/createMpegtsContext.ts");
/* harmony import */ var _mpegts_impegts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mpegts/impegts */ "./src/avformat/formats/mpegts/impegts.ts");
/* harmony import */ var _mpegts_mpegts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mpegts/mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/* harmony import */ var _mpegts_function_handleSectionSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mpegts/function/handleSectionSlice */ "./src/avformat/formats/mpegts/function/handleSectionSlice.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mpegts/function/parsePES */ "./src/avformat/formats/mpegts/function/parsePES.ts");
/* harmony import */ var _mpegts_function_parsePESSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mpegts/function/parsePESSlice */ "./src/avformat/formats/mpegts/function/parsePESSlice.ts");
/* harmony import */ var _mpegts_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mpegts/function/clearTSSliceQueue */ "./src/avformat/formats/mpegts/function/clearTSSliceQueue.ts");
/* harmony import */ var _mpegts_struct__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mpegts/struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var _mpegts_function_initStream__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mpegts/function/initStream */ "./src/avformat/formats/mpegts/function/initStream.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var _codecs_h264__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var _codecs_hevc__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var _codecs_vvc__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../codecs/vvc */ "./src/avformat/codecs/vvc.ts");
/* harmony import */ var _codecs_aac__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var _codecs_dts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../codecs/dts */ "./src/avformat/codecs/dts.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IMpegtsFormat.ts";






























class IMpegtsFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_12__["default"] {
    type = 2 /* AVFormat.MPEGTS */;
    context;
    firstTSPacketPos;
    cacheAVPacket;
    constructor() {
        super();
        this.context = (0,_mpegts_function_createMpegtsContext__WEBPACK_IMPORTED_MODULE_3__["default"])();
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
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.destroyAVPacket)(this.cacheAVPacket);
            this.cacheAVPacket = 0;
        }
        common_util_array__WEBPACK_IMPORTED_MODULE_18__.each(formatContext.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.filter) {
                streamContext.filter.destroy();
                streamContext.filter = null;
            }
        });
    }
    async readHeader(formatContext) {
        try {
            let ret = 0;
            let packetSize = await _mpegts_impegts__WEBPACK_IMPORTED_MODULE_4__.getPacketSize(formatContext.ioReader);
            if (!packetSize) {
                packetSize = _mpegts_mpegts__WEBPACK_IMPORTED_MODULE_5__.TS_PACKET_SIZE;
            }
            this.context.tsPacketSize = packetSize;
            // 码流可能存在一些非 ts packet 数据，跳过
            if (this.context.tsPacketSize !== _mpegts_mpegts__WEBPACK_IMPORTED_MODULE_5__.TS_DVHS_PACKET_SIZE
                && (await formatContext.ioReader.peekUint8() !== 0x47)) {
                await this.syncTSPacket(formatContext, false);
            }
            while ((!this.context.hasPAT || !this.context.hasPMT)) {
                const tsPacket = await _mpegts_impegts__WEBPACK_IMPORTED_MODULE_4__.parserTSPacket(formatContext.ioReader, this.context);
                if (!tsPacket.payload) {
                    continue;
                }
                if (tsPacket.pid === 0
                    || tsPacket.pid === this.context.currentPmtPid
                    || this.context.pmt.pid2StreamType.get(tsPacket.pid) === 134 /* mpegts.TSStreamType.kSCTE35 */) {
                    (0,_mpegts_function_handleSectionSlice__WEBPACK_IMPORTED_MODULE_6__["default"])(tsPacket, this.context);
                }
            }
            if (!this.context.hasPAT || !this.context.hasPMT) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            else {
                this.firstTSPacketPos = formatContext.ioReader.getPos();
            }
            return ret;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__0, 148);
            return formatContext.ioReader.error;
        }
    }
    checkExtradata(avpacket, stream) {
        if (!stream.codecpar.extradata) {
            let element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (!element) {
                return;
            }
            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_27__.avMalloc)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.memcpy)(stream.codecpar.extradata, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4));
            stream.codecpar.extradataSize = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](element + 4);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.deleteAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                _codecs_h264__WEBPACK_IMPORTED_MODULE_20__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                _codecs_hevc__WEBPACK_IMPORTED_MODULE_21__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                _codecs_vvc__WEBPACK_IMPORTED_MODULE_22__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                _codecs_aac__WEBPACK_IMPORTED_MODULE_23__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                _codecs_opus__WEBPACK_IMPORTED_MODULE_24__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
        }
    }
    parsePESSlice(formatContext, avpacket, queue, stream) {
        const pes = (0,_mpegts_function_parsePESSlice__WEBPACK_IMPORTED_MODULE_9__["default"])(queue);
        (0,_mpegts_function_parsePES__WEBPACK_IMPORTED_MODULE_8__["default"])(pes);
        if (pes.randomAccessIndicator || stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
        const codecId = stream.codecpar.codecId;
        if (codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
            || codecId === 173 /* AVCodecID.AV_CODEC_ID_H265 */
            || codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 80, 2 /* BitFormat.ANNEXB */);
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, pes.dts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, pes.pts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, pes.pos);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, 90000);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, 1);
        if (stream.startTime === avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
            stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16);
        }
        const payload = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_27__.avMalloc)(pes.payload.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_28__.memcpyFromUint8Array)(payload, pes.payload.length, pes.payload);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.addAVPacketData)(avpacket, payload, pes.payload.length);
        (0,_mpegts_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_10__["default"])(queue);
        const streamContext = stream.privData;
        if (streamContext.filter) {
            let ret = 0;
            ret = streamContext.filter.sendAVPacket(avpacket);
            if (ret < 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('send avpacket to bsf failed', cheap__fileName__0, 224);
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            ret = streamContext.filter.receiveAVPacket(avpacket);
            if (ret < 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('receive avpacket from bsf failed', cheap__fileName__0, 231);
                return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, 90000);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, 1);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            this.checkExtradata(avpacket, stream);
            while (true) {
                const avpacket = this.cacheAVPacket || (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.createAVPacket)();
                ret = streamContext.filter.receiveAVPacket(avpacket);
                if (ret === 0) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, 90000);
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, 1);
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
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
            const streamType = this.context.pmt.pid2StreamType.get(streamContext.pid);
            if (streamType === 3 /* mpegts.TSStreamType.AUDIO_MPEG1 */
                || streamType === 4 /* mpegts.TSStreamType.AUDIO_MPEG2 */) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                const buffer = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.getAVPacketData)(avpacket);
                const ver = (buffer[1] >>> 3) & 0x03;
                const layer = (buffer[1] & 0x06) >> 1;
                // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
                const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
                const channelMode = (buffer[3] >>> 6) & 0x03;
                const channelCount = channelMode !== 3 ? 2 : 1;
                const profile = _codecs_mp3__WEBPACK_IMPORTED_MODULE_19__.getProfileByLayer(layer);
                const sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_19__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
                const hasNewExtraData = stream.codecpar.profile !== profile
                    || stream.codecpar.sampleRate !== sampleRate
                    || stream.codecpar.chLayout.nbChannels !== channelCount;
                if (hasNewExtraData) {
                    stream.codecpar.profile = profile;
                    stream.codecpar.sampleRate = sampleRate;
                    stream.codecpar.chLayout.nbChannels = channelCount;
                }
            }
            else if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                if (!stream.codecpar.extradata) {
                    _codecs_h264__WEBPACK_IMPORTED_MODULE_20__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
            }
            else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                if (!stream.codecpar.extradata) {
                    _codecs_hevc__WEBPACK_IMPORTED_MODULE_21__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
            }
            else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                if (!stream.codecpar.extradata) {
                    _codecs_vvc__WEBPACK_IMPORTED_MODULE_22__.parseAnnexbExtraData(avpacket, true);
                    this.checkExtradata(avpacket, stream);
                    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
                }
            }
            else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
                || stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */) {
                if (stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE) {
                    const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_25__.parseHeader((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.getAVPacketData)(avpacket));
                    if (!common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(info)) {
                        stream.codecpar.sampleRate = info.sampleRate;
                        stream.codecpar.chLayout.nbChannels = info.channels;
                    }
                }
            }
            else if (stream.codecpar.codecId === 86020 /* AVCodecID.AV_CODEC_ID_DTS */) {
                if (stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE) {
                    const info = _codecs_dts__WEBPACK_IMPORTED_MODULE_26__.parseHeader((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_14__.getAVPacketData)(avpacket));
                    if (!common_util_is__WEBPACK_IMPORTED_MODULE_29__.number(info)) {
                        stream.codecpar.sampleRate = info.sampleRate;
                        stream.codecpar.chLayout.nbChannels = info.channels;
                    }
                }
            }
        }
        return 0;
    }
    async readAVPacket_(formatContext, avpacket) {
        if (this.context.ioEnd) {
            if (!this.context.tsSliceQueueMap.size) {
                return -1048576 /* IOError.END */;
            }
            const it = this.context.tsSliceQueueMap.values();
            let queue;
            while (true) {
                const next = it.next();
                if (next.value && next.value.slices.length) {
                    queue = next.value;
                    break;
                }
                if (next.done) {
                    break;
                }
            }
            if (!queue) {
                return -1048576 /* IOError.END */;
            }
            const stream = formatContext.streams.find((stream) => {
                return stream.privData.pid === queue.pid;
            });
            if (stream) {
                return this.parsePESSlice(formatContext, avpacket, queue, stream);
            }
            else {
                (0,_mpegts_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_10__["default"])(queue);
                return this.readAVPacket_(formatContext, avpacket);
            }
        }
        else {
            try {
                while (true) {
                    // 码流可能存在一些非 ts packet 数据，跳过
                    if (this.context.tsPacketSize !== _mpegts_mpegts__WEBPACK_IMPORTED_MODULE_5__.TS_DVHS_PACKET_SIZE
                        && (await formatContext.ioReader.peekUint8() !== 0x47)) {
                        // 将剩余缓冲区移动到头部，方便 syncTSPacket 往回 seek
                        // m3u8 切片是不支持通过字节位置 seek 的
                        try {
                            await formatContext.ioReader.flush();
                        }
                        catch (e) { }
                        await this.syncTSPacket(formatContext, false);
                    }
                    const tsPacket = await _mpegts_impegts__WEBPACK_IMPORTED_MODULE_4__.parserTSPacket(formatContext.ioReader, this.context);
                    if (!tsPacket.payload) {
                        continue;
                    }
                    if (tsPacket.pid === 0
                        || tsPacket.pid === this.context.currentPmtPid
                        || this.context.pmt.pid2StreamType.get(tsPacket.pid) === 134 /* mpegts.TSStreamType.kSCTE35 */) {
                        (0,_mpegts_function_handleSectionSlice__WEBPACK_IMPORTED_MODULE_6__["default"])(tsPacket, this.context);
                        continue;
                    }
                    const streamType = this.context.pmt.pid2StreamType.get(tsPacket.pid);
                    if (!streamType) {
                        continue;
                    }
                    let stream = formatContext.streams.find((stream) => {
                        return stream.privData.pid === tsPacket.pid;
                    });
                    if (!stream) {
                        stream = formatContext.createStream();
                        (0,_mpegts_function_initStream__WEBPACK_IMPORTED_MODULE_13__["default"])(tsPacket.pid, stream, this.context);
                    }
                    let pesPacketLength = (tsPacket.payload[4] << 8) | tsPacket.payload[5];
                    let pesSliceQueue = this.context.tsSliceQueueMap.get(tsPacket.pid);
                    let packetGot = false;
                    if (pesSliceQueue) {
                        if (pesSliceQueue.totalLength > 0 && tsPacket.payloadUnitStartIndicator) {
                            const ret = this.parsePESSlice(formatContext, avpacket, pesSliceQueue, stream);
                            if (ret < 0) {
                                return ret;
                            }
                            packetGot = true;
                        }
                    }
                    else {
                        if (!tsPacket.payloadUnitStartIndicator) {
                            continue;
                        }
                        pesSliceQueue = new _mpegts_struct__WEBPACK_IMPORTED_MODULE_11__.TSSliceQueue();
                        this.context.tsSliceQueueMap.set(tsPacket.pid, pesSliceQueue);
                    }
                    if (tsPacket.payloadUnitStartIndicator) {
                        pesSliceQueue.randomAccessIndicator = tsPacket.adaptationFieldInfo?.randomAccessIndicator ?? 0;
                        pesSliceQueue.pos = tsPacket.pos;
                        pesSliceQueue.pid = tsPacket.pid;
                        pesSliceQueue.streamType = streamType;
                        pesSliceQueue.expectedLength = pesPacketLength === 0 ? 0 : pesPacketLength + 6;
                    }
                    pesSliceQueue.slices.push(tsPacket.payload);
                    pesSliceQueue.totalLength += tsPacket.payload.length;
                    if (pesSliceQueue.expectedLength > 0 && pesSliceQueue.expectedLength === pesSliceQueue.totalLength) {
                        const ret = this.parsePESSlice(formatContext, avpacket, pesSliceQueue, stream);
                        if (ret < 0) {
                            return ret;
                        }
                        packetGot = true;
                    }
                    if (packetGot) {
                        return 0;
                    }
                }
            }
            catch (error) {
                if (formatContext.ioReader.error === -1048576 /* IOError.END */ && !this.context.ioEnd) {
                    this.context.ioEnd = true;
                    return this.readAVPacket_(formatContext, avpacket);
                }
                else if (formatContext.ioReader.error === -1048576 /* IOError.END */) {
                    return -1048576 /* IOError.END */;
                }
                else {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 475);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_7__.DATA_INVALID;
                }
            }
        }
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            return this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__0, 488);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncTSPacket(formatContext, syncPES = true) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 10;
        while (true) {
            try {
                const byte = await formatContext.ioReader.readUint8();
                if (byte === 0x47) {
                    if (this.context.tsPacketSize === _mpegts_mpegts__WEBPACK_IMPORTED_MODULE_5__.TS_DVHS_PACKET_SIZE) {
                        pos = formatContext.ioReader.getPos() - BigInt(5);
                    }
                    else {
                        pos = formatContext.ioReader.getPos() - BigInt(1);
                    }
                    let count = 0;
                    let now = formatContext.ioReader.getPos();
                    while (count <= analyzeCount) {
                        await formatContext.ioReader.skip(this.context.tsPacketSize - 1);
                        const byte = await formatContext.ioReader.readUint8();
                        if (byte === 0x47) {
                            count++;
                        }
                        else {
                            break;
                        }
                    }
                    if (count < analyzeCount) {
                        pos = avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT;
                        await formatContext.ioReader.seek(now);
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }
            catch (error) {
                pos = avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT;
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
            // 移动到 ts packet 的开始
            await formatContext.ioReader.seek(pos);
            if (syncPES) {
                while (true) {
                    const tsPacket = await _mpegts_impegts__WEBPACK_IMPORTED_MODULE_4__.parserTSPacket(formatContext.ioReader, this.context);
                    // 移动到下一个 pes 的开始
                    if (tsPacket.payloadUnitStartIndicator) {
                        // 返回到上一个 ts packet 的开始
                        await formatContext.ioReader.seek(pos);
                        formatContext.streams.forEach((stream) => {
                            let pesSliceQueue = this.context.tsSliceQueueMap.get(stream.privData.pid);
                            if (pesSliceQueue) {
                                (0,_mpegts_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_10__["default"])(pesSliceQueue);
                            }
                        });
                        break;
                    }
                    pos = formatContext.ioReader.getPos();
                }
            }
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        let now = formatContext.ioReader.getPos();
        this.context.tsSliceQueueMap.forEach((queue) => {
            if (queue.slices.length && queue.pos < now) {
                now = queue.pos;
            }
            (0,_mpegts_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_10__["default"])(queue);
        });
        this.context.pmt.pid2StreamType.forEach((streamType, pid) => {
            this.context.tsSliceQueueMap.delete(pid);
        });
        // m3u8 使用时间戳去 seek
        if (flags & 16 /* AVSeekFlags.TIMESTAMP */) {
            const seekTime = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
            await formatContext.ioReader.seek(seekTime, true);
            this.context.ioEnd = false;
            return BigInt(0);
        }
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncTSPacket(formatContext);
            }
            this.context.ioEnd = false;
            return now;
        }
        else {
            if (stream && stream.sampleIndexes.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_18__.binarySearch(stream.sampleIndexes, (item) => {
                    if (item.pts > timestamp) {
                        return -1;
                    }
                    return 1;
                });
                if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_17__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q) < BigInt(10000)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 626);
                    await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                    this.context.ioEnd = false;
                    return now;
                }
            }
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 633);
            let ret = await (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_16__["default"])(formatContext, stream, timestamp, this.firstTSPacketPos, this.readAVPacket.bind(this), this.syncTSPacket.bind(this));
            if (ret >= 0) {
                this.context.ioEnd = false;
            }
            return ret;
        }
    }
    getAnalyzeStreamsCount() {
        return this.context.pmt?.pid2StreamType.size ?? 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/analyzeTSLength.ts":
/*!*****************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/analyzeTSLength.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ analyzeTSLength)
/* harmony export */ });
/* harmony import */ var _mpegts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/*
 * libmedia analyze ts packet length
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

function analyzeTSLength(buffer, packetSize, probe) {
    const stat = new Uint8Array(_mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_MAX_PACKET_SIZE);
    let statAll = 0;
    let bestScore = 0;
    for (let i = 0; i < buffer.length - 3; i++) {
        if (buffer[i] === 0x47) {
            const pid = ((buffer[i + 1] << 8) | buffer[i + 2]) & 0x1FFF;
            let asc = buffer[i + 3] & 0x30;
            if (!probe || pid === 0x1FFF || asc) {
                const x = i % packetSize;
                stat[x]++;
                statAll++;
                if (stat[x] > bestScore) {
                    bestScore = stat[x];
                }
            }
        }
    }
    return bestScore - Math.max(statAll - 10 * bestScore, 0) / 10;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/clearTSSliceQueue.ts":
/*!*******************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/clearTSSliceQueue.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clearTSSliceQueue)
/* harmony export */ });
/*
 * libmedia clear ts packet slice queue
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
function clearTSSliceQueue(queue) {
    queue.slices = [];
    queue.totalLength = 0;
    queue.expectedLength = -1;
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

/***/ "./src/avformat/formats/mpegts/function/handleSectionSlice.ts":
/*!********************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/handleSectionSlice.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handleSectionSlice)
/* harmony export */ });
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/clearTSSliceQueue */ "./src/avformat/formats/mpegts/function/clearTSSliceQueue.ts");
/* harmony import */ var _function_parseSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../function/parseSection */ "./src/avformat/formats/mpegts/function/parseSection.ts");
/*
 * libmedia handle mpegts section slice
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



function handleSectionSlice(tsPacket, mpegtsContext) {
    const tsSliceQueue = mpegtsContext.tsSliceQueueMap.get(tsPacket.pid);
    if (tsPacket.payloadUnitStartIndicator) {
        const pointerField = tsPacket.payload[0];
        if (tsSliceQueue && tsSliceQueue.totalLength > 0) {
            const remain = tsPacket.payload.slice(1, Math.min(1 + pointerField, tsPacket.payload.length));
            tsSliceQueue.slices.push(remain);
            tsSliceQueue.totalLength += remain.length;
            if (tsSliceQueue.totalLength === tsSliceQueue.expectedLength) {
                (0,_function_parseSection__WEBPACK_IMPORTED_MODULE_2__["default"])(tsPacket.pid, tsSliceQueue, mpegtsContext);
                (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
            }
            else {
                (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
                mpegtsContext.tsSliceQueueMap.delete(tsPacket.pid);
            }
        }
        for (let i = 1 + pointerField; i < tsPacket.payload.length;) {
            const tableId = tsPacket.payload[i];
            if (tableId === 0xff) {
                break;
            }
            const sectionLength = ((tsPacket.payload[i + 1] & 0x0f) << 8) | tsPacket.payload[i + 2];
            const tsSliceQueue = new _struct__WEBPACK_IMPORTED_MODULE_0__.TSSliceQueue();
            tsSliceQueue.pid = tsPacket.pid;
            tsSliceQueue.expectedLength = sectionLength + 3;
            tsSliceQueue.randomAccessIndicator = tsPacket.adaptationFieldInfo?.randomAccessIndicator ?? 0;
            const remain = tsPacket.payload.slice(i, Math.min(i + tsSliceQueue.expectedLength - tsSliceQueue.totalLength, tsPacket.payload.length));
            tsSliceQueue.slices.push(remain);
            tsSliceQueue.totalLength += remain.length;
            mpegtsContext.tsSliceQueueMap.set(tsPacket.pid, tsSliceQueue);
            if (tsSliceQueue.totalLength === tsSliceQueue.expectedLength) {
                (0,_function_parseSection__WEBPACK_IMPORTED_MODULE_2__["default"])(tsPacket.pid, tsSliceQueue, mpegtsContext);
                (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
            }
            else {
                (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
                mpegtsContext.tsSliceQueueMap.delete(tsPacket.pid);
            }
            i += remain.length;
        }
    }
    else if (tsSliceQueue && tsSliceQueue.totalLength !== 0) {
        const remain = tsPacket.payload.slice(0, Math.min(tsSliceQueue.expectedLength - tsSliceQueue.totalLength, tsPacket.payload.length));
        tsSliceQueue.slices.push(remain);
        tsSliceQueue.totalLength += remain.length;
        if (tsSliceQueue.totalLength === tsSliceQueue.expectedLength) {
            (0,_function_parseSection__WEBPACK_IMPORTED_MODULE_2__["default"])(tsPacket.pid, tsSliceQueue, mpegtsContext);
            (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
        }
        else {
            (0,_function_clearTSSliceQueue__WEBPACK_IMPORTED_MODULE_1__["default"])(tsSliceQueue);
            mpegtsContext.tsSliceQueueMap.delete(tsPacket.pid);
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/initStream.ts":
/*!************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/initStream.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initStream)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var _createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createMpegtsStreamContext */ "./src/avformat/formats/mpegts/function/createMpegtsStreamContext.ts");
/* harmony import */ var _mpegts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/* harmony import */ var _bsf_aac_ADTS2RawFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../bsf/aac/ADTS2RawFilter */ "./src/avformat/bsf/aac/ADTS2RawFilter.ts");
/* harmony import */ var _bsf_aac_LATM2RawFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../bsf/aac/LATM2RawFilter */ "./src/avformat/bsf/aac/LATM2RawFilter.ts");
/* harmony import */ var _bsf_opus_Mpegts2RawFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../bsf/opus/Mpegts2RawFilter */ "./src/avformat/bsf/opus/Mpegts2RawFilter.ts");
/* harmony import */ var _codecs_opus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../codecs/opus */ "./src/avformat/codecs/opus.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");









function initStream(pid, stream, mpegtsContext) {
    stream.timeBase.den = 90000;
    stream.timeBase.num = 1;
    const streamContext = (0,_createMpegtsStreamContext__WEBPACK_IMPORTED_MODULE_1__["default"])();
    streamContext.pid = pid;
    stream.privData = streamContext;
    const streamType = mpegtsContext.pmt.pid2StreamType.get(pid);
    if (streamType === 6 /* mpegts.TSStreamType.PRIVATE_DATA */) {
        const descriptorList = mpegtsContext.pmt.pid2ESDescriptor.get(pid);
        stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
        if (descriptorList) {
            const regDescriptor = descriptorList.find((descriptor) => {
                return descriptor.tag === 0x05;
            });
            if (regDescriptor && regDescriptor.buffer?.length >= 4) {
                if (String.fromCharCode(regDescriptor.buffer[0]) === 'O'
                    || String.fromCharCode(regDescriptor.buffer[1]) === 'p'
                    || String.fromCharCode(regDescriptor.buffer[2]) === 'u'
                    || String.fromCharCode(regDescriptor.buffer[3]) === 's') {
                    stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                    stream.codecpar.codecId = 86076 /* AVCodecID.AV_CODEC_ID_OPUS */;
                    stream.codecpar.sampleRate = 48000;
                    const extDescriptor = descriptorList.find((descriptor) => {
                        return descriptor.tag === 0x7f;
                    });
                    if (extDescriptor) {
                        const extDescTag = extDescriptor.buffer[0];
                        if (extDescTag === 0x80) {
                            stream.codecpar.chLayout.nbChannels = ((extDescriptor.buffer[1] & 0x0F) === 0)
                                ? 2
                                : (extDescriptor.buffer[1] & 0x0F);
                            const buffer = _codecs_opus__WEBPACK_IMPORTED_MODULE_6__.avCodecParameters2Extradata(stream.codecpar);
                            if (buffer) {
                                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(buffer.length);
                                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.memcpyFromUint8Array)(stream.codecpar.extradata, buffer.length, buffer);
                                stream.codecpar.extradataSize = buffer.length;
                            }
                        }
                    }
                }
                else if (String.fromCharCode(regDescriptor.buffer[0]) === 'A'
                    || String.fromCharCode(regDescriptor.buffer[1]) === 'V'
                    || String.fromCharCode(regDescriptor.buffer[2]) === '0'
                    || String.fromCharCode(regDescriptor.buffer[3]) === '1') {
                    stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                    stream.codecpar.codecId = 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
                    const extDescriptor = descriptorList.find((descriptor) => {
                        return descriptor.tag === 0x80;
                    });
                    if (extDescriptor) {
                        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(extDescriptor.buffer.length);
                        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.memcpyFromUint8Array)(stream.codecpar.extradata, extDescriptor.buffer.length, extDescriptor.buffer);
                        stream.codecpar.extradataSize = extDescriptor.buffer.length;
                    }
                }
            }
        }
    }
    else {
        const info = _mpegts__WEBPACK_IMPORTED_MODULE_2__.StreamType2AVCodecId[streamType];
        if (info) {
            stream.codecpar.codecType = info[0];
            stream.codecpar.codecId = info[1];
        }
        else {
            stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
        }
    }
    let filter;
    switch (streamType) {
        case 15 /* mpegts.TSStreamType.AUDIO_AAC */:
            filter = new _bsf_aac_ADTS2RawFilter__WEBPACK_IMPORTED_MODULE_3__["default"]();
            break;
        case 17 /* mpegts.TSStreamType.AUDIO_AAC_LATM */:
            filter = new _bsf_aac_LATM2RawFilter__WEBPACK_IMPORTED_MODULE_4__["default"]();
            break;
        case 27 /* mpegts.TSStreamType.VIDEO_H264 */:
            // filter = new Annexb2AvccFilter()
            break;
        case 36 /* mpegts.TSStreamType.VIDEO_HEVC */:
            // filter = new Annexb2AvccFilter()
            break;
        case 6 /* mpegts.TSStreamType.PRIVATE_DATA */:
            if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                filter = new _bsf_opus_Mpegts2RawFilter__WEBPACK_IMPORTED_MODULE_5__["default"]();
            }
            break;
    }
    if (filter) {
        stream.privData.filter = filter;
        filter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
    }
    return stream;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/parseAdaptationField.ts":
/*!**********************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parseAdaptationField.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseAdaptationField)
/* harmony export */ });
/*
 * libmedia parse adaptation field
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
function parseAdaptationField(buffer, tsPacket) {
    let i = 0;
    let byte = buffer[i++];
    tsPacket.adaptationFieldInfo.discontinuityIndicator = (byte >> 7) & 0x01;
    tsPacket.adaptationFieldInfo.randomAccessIndicator = (byte >> 6) & 0x01;
    tsPacket.adaptationFieldInfo.elementaryStreamPriorityIndicator = (byte >> 5) & 0x01;
    tsPacket.adaptationFieldInfo.pcrFlag = (byte >> 4) & 0x01;
    tsPacket.adaptationFieldInfo.opcrFlag = (byte >> 3) & 0x01;
    tsPacket.adaptationFieldInfo.splicingPointFlag = (byte >> 2) & 0x01;
    tsPacket.adaptationFieldInfo.transportPrivateDataFlag = (byte >> 1) & 0x01;
    tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag = byte & 0x01;
    if (tsPacket.adaptationFieldInfo.pcrFlag) {
        const pcrHigh = BigInt(Math.floor(buffer[i++] << 25
            | buffer[i++] << 17
            | buffer[i++] << 9
            | buffer[i++] << 1
            | buffer[i] >> 7));
        const prcLow = BigInt(Math.floor((buffer[i++] & 0x01) << 8 | buffer[i++]));
        tsPacket.adaptationFieldInfo.pcr = pcrHigh * BigInt(300) + prcLow;
    }
    if (tsPacket.adaptationFieldInfo.opcrFlag) {
        const pcrHigh = BigInt(Math.floor(buffer[i++] << 25
            | buffer[i++] << 17
            | buffer[i++] << 9
            | buffer[i++] << 1
            | buffer[i] >> 7));
        const prcLow = BigInt(Math.floor((buffer[i++] & 0x01) << 8 | buffer[i++]));
        tsPacket.adaptationFieldInfo.pcr = pcrHigh * BigInt(300) + prcLow;
    }
    if (tsPacket.adaptationFieldInfo.splicingPointFlag) {
        tsPacket.adaptationFieldInfo.spliceCountDown = buffer[i++];
    }
    if (tsPacket.adaptationFieldInfo.transportPrivateDataFlag) {
        const len = buffer[i++];
        tsPacket.adaptationFieldInfo.transportPrivateData = buffer.subarray(i, i + len);
        i += len;
    }
    if (tsPacket.adaptationFieldInfo.adaptationFieldExtensionFlag) {
        const len = buffer[i++];
        tsPacket.adaptationFieldInfo.extension = buffer.subarray(i, i + len);
        i += len;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/parsePAT.ts":
/*!**********************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parsePAT.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parsePAT)
/* harmony export */ });
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mpegts\\function\\parsePAT.ts";
/*
 * libmedia parse PAT
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




function parsePAT(queue, mpegtsContext) {
    let byte = 0;
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"]((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, queue.slices), true);
    const tableId = bufferReader.readUint8();
    if (tableId !== 0x00) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`parsePAT: table_id ${tableId} is not corresponded to PAT!`, cheap__fileName__0, 40);
    }
    const sectionLength = bufferReader.readUint16() & 0x0fff;
    const transportStreamId = bufferReader.readUint16();
    byte = bufferReader.readUint8();
    const versionNumber = (byte >> 1) & 0x1f;
    const currentNextIndicator = byte & 0x01;
    const sectionNumber = bufferReader.readUint8();
    const lastSectionNumber = bufferReader.readUint8();
    let pat;
    if (currentNextIndicator === 1 && sectionNumber === 0) {
        pat = new _struct__WEBPACK_IMPORTED_MODULE_1__.PAT();
        pat.versionNumber = versionNumber;
    }
    else {
        pat = mpegtsContext.pat;
        if (!pat) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('can not found PAT in mpegts context', cheap__fileName__0, 64);
            return;
        }
    }
    const programBytes = sectionLength - 5 - 4;
    const endPos = Number(BigInt.asIntN(32, bufferReader.getPos())) + programBytes;
    let firstProgramNumber = -1;
    let firstPmtPid = -1;
    // program_number + program_map_PID + crc
    while (bufferReader.getPos() < endPos) {
        const programNumber = bufferReader.readUint16();
        const pid = bufferReader.readUint16() & 0x1fff;
        // network_PID
        if (programNumber === 0) {
            pat.networkPid = pid;
        }
        // program_map_PID
        else {
            pat.program2PmtPid.set(programNumber, pid);
            if (firstProgramNumber === -1) {
                firstProgramNumber = programNumber;
            }
            if (firstPmtPid === -1) {
                firstPmtPid = pid;
            }
        }
    }
    if (currentNextIndicator === 1 && sectionNumber === 0) {
        if (!mpegtsContext.pat) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.info('parsed first PAT', cheap__fileName__0, 100);
        }
        mpegtsContext.pat = pat;
        mpegtsContext.currentProgram = firstProgramNumber;
        mpegtsContext.currentPmtPid = firstPmtPid;
        mpegtsContext.hasPAT = true;
    }
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

/***/ "./src/avformat/formats/mpegts/function/parsePESSlice.ts":
/*!***************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parsePESSlice.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parsePESSlice)
/* harmony export */ });
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/*
 * libmedia parse PES slice
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

function parsePESSlice(queue) {
    let data = new Uint8Array(queue.totalLength);
    for (let i = 0, offset = 0; i < queue.slices.length; i++) {
        let slice = queue.slices[i];
        data.set(slice, offset);
        offset += slice.byteLength;
    }
    const streamId = data[3];
    const pes = new _struct__WEBPACK_IMPORTED_MODULE_0__.PES();
    pes.data = data;
    pes.pid = queue.pid;
    pes.streamId = streamId;
    pes.streamType = queue.streamType;
    pes.pos = queue.pos;
    pes.randomAccessIndicator = queue.randomAccessIndicator;
    return pes;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/parsePMT.ts":
/*!**********************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parsePMT.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parsePMT)
/* harmony export */ });
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mpegts\\function\\parsePMT.ts";
/*
 * libmedia parse PMT
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




function parsePMT(queue, mpegtsContext) {
    let byte = 0;
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"]((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, queue.slices), true);
    const tableId = bufferReader.readUint8();
    if (tableId !== 0x02) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`parse PMT: table_id ${tableId} is not corresponded to PAT!`, cheap__fileName__0, 40);
    }
    const sectionLength = bufferReader.readUint16() & 0x0fff;
    const programNumber = bufferReader.readUint16();
    byte = bufferReader.readUint8();
    const versionNumber = (byte >> 1) & 0x1f;
    const currentNextIndicator = byte & 0x01;
    const sectionNumber = bufferReader.readUint8();
    const lastSectionNumber = bufferReader.readUint8();
    let pmt;
    if (currentNextIndicator === 1 && sectionNumber === 0) {
        pmt = new _struct__WEBPACK_IMPORTED_MODULE_1__.PMT();
        pmt.programNumber = programNumber;
        pmt.versionNumber = versionNumber;
        mpegtsContext.program2Pmt.set(programNumber, pmt);
        mpegtsContext.hasPMT = true;
    }
    else {
        pmt = mpegtsContext.program2Pmt.get(programNumber);
        if (!pmt) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('can not found PMT in mpegts context', cheap__fileName__0, 68);
            return;
        }
    }
    pmt.pcrPid = bufferReader.readUint16() & 0x1fff;
    const programInfoLength = bufferReader.readUint16() & 0x0fff;
    bufferReader.skip(programInfoLength);
    let endPos = Number(BigInt.asIntN(32, bufferReader.getPos())) + (sectionLength - 9 - programInfoLength - 4);
    while (bufferReader.getPos() < endPos) {
        const streamType = bufferReader.readUint8();
        const elementaryPid = bufferReader.readUint16() & 0x1fff;
        const esInfoLength = bufferReader.readUint16() & 0x0fff;
        pmt.pid2StreamType.set(elementaryPid, streamType);
        if (esInfoLength > 0) {
            const esDescriptorList = [];
            const subEndPos = Number(BigInt.asIntN(32, bufferReader.getPos())) + esInfoLength;
            while (bufferReader.getPos() < subEndPos) {
                const esDescriptor = new _struct__WEBPACK_IMPORTED_MODULE_1__.ESDescriptor();
                esDescriptor.tag = bufferReader.readUint8();
                const length = bufferReader.readUint8();
                if (length > 0) {
                    esDescriptor.buffer = bufferReader.readBuffer(length);
                }
                esDescriptorList.push(esDescriptor);
            }
            pmt.pid2ESDescriptor.set(elementaryPid, esDescriptorList);
        }
    }
    if (programNumber === mpegtsContext.currentProgram) {
        if (!mpegtsContext.pmt) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.info('parsed first PMT', cheap__fileName__0, 111);
        }
        mpegtsContext.pmt = pmt;
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/parseSCTE35.ts":
/*!*************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parseSCTE35.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseSCTE35)
/* harmony export */ });
/*
 * libmedia parse SCTE35
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
function parseSCTE35(queue, mpegtsContext) {
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/function/parseSection.ts":
/*!**************************************************************!*\
  !*** ./src/avformat/formats/mpegts/function/parseSection.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseSection)
/* harmony export */ });
/* harmony import */ var _parsePAT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parsePAT */ "./src/avformat/formats/mpegts/function/parsePAT.ts");
/* harmony import */ var _parsePMT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsePMT */ "./src/avformat/formats/mpegts/function/parsePMT.ts");
/* harmony import */ var _parseSCTE35__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseSCTE35 */ "./src/avformat/formats/mpegts/function/parseSCTE35.ts");
/*
 * libmedia parse section
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



function parseSection(pid, queue, mpegtsContext) {
    if (pid === 0x00) {
        (0,_parsePAT__WEBPACK_IMPORTED_MODULE_0__["default"])(queue, mpegtsContext);
    }
    else if (pid === mpegtsContext.currentPmtPid) {
        (0,_parsePMT__WEBPACK_IMPORTED_MODULE_1__["default"])(queue, mpegtsContext);
    }
    else if (mpegtsContext.pmt && mpegtsContext.pmt.pid2StreamType.get(pid) === 134 /* mpegts.TSStreamType.kSCTE35 */) {
        (0,_parseSCTE35__WEBPACK_IMPORTED_MODULE_2__["default"])(queue, mpegtsContext);
    }
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/impegts.ts":
/*!************************************************!*\
  !*** ./src/avformat/formats/mpegts/impegts.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPacketSize: () => (/* binding */ getPacketSize),
/* harmony export */   parserTSPacket: () => (/* binding */ parserTSPacket)
/* harmony export */ });
/* harmony import */ var _mpegts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mpegts */ "./src/avformat/formats/mpegts/mpegts.ts");
/* harmony import */ var _function_analyzeTSLength__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function/analyzeTSLength */ "./src/avformat/formats/mpegts/function/analyzeTSLength.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _struct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./struct */ "./src/avformat/formats/mpegts/struct.ts");
/* harmony import */ var _function_parseAdaptationField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./function/parseAdaptationField */ "./src/avformat/formats/mpegts/function/parseAdaptationField.ts");
/* harmony import */ var common_math_median__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/math/median */ "./src/common/math/median.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mpegts\\impegts.ts";
/*
 * libmedia mpegts decode util
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






// @ts-ignore
async function getPacketSize(ioReader) {
    let buffer;
    try {
        buffer = await ioReader.peekBuffer(_mpegts__WEBPACK_IMPORTED_MODULE_0__.PROBE_PACKET_MAX_BUF);
    }
    catch (error) {
        if (ioReader.error !== -1048576 /* IOError.END */) {
            buffer = await ioReader.peekBuffer(ioReader.remainingLength());
        }
    }
    if (buffer && buffer.length >= _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE) {
        const score = (0,_function_analyzeTSLength__WEBPACK_IMPORTED_MODULE_1__["default"])(buffer, _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE, false);
        const dvhsScore = (0,_function_analyzeTSLength__WEBPACK_IMPORTED_MODULE_1__["default"])(buffer, _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_DVHS_PACKET_SIZE, false);
        const fecScore = (0,_function_analyzeTSLength__WEBPACK_IMPORTED_MODULE_1__["default"])(buffer, _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_FEC_PACKET_SIZE, false);
        let margin = (0,common_math_median__WEBPACK_IMPORTED_MODULE_5__["default"])([score, fecScore, dvhsScore]);
        if (buffer.length < _mpegts__WEBPACK_IMPORTED_MODULE_0__.PROBE_PACKET_MAX_BUF) {
            margin += _mpegts__WEBPACK_IMPORTED_MODULE_0__.PROBE_PACKET_MARGIN;
        }
        let size = _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE;
        if (score > margin) {
            size = _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE;
        }
        else if (dvhsScore > margin) {
            size = _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_DVHS_PACKET_SIZE;
        }
        else if (fecScore > margin) {
            size = _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_FEC_PACKET_SIZE;
        }
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`got ts packet size: ${size}`, cheap__fileName__0, 72);
        return size;
    }
    return 0;
}
// @ts-ignore
async function parserTSPacket(ioReader, mpegtsContext) {
    const pos = ioReader.getPos();
    let byte = 0;
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_DVHS_PACKET_SIZE) {
        // skip ATS field (2-bits copy-control + 30-bits timestamp) for m2ts
        await ioReader.skip(4);
    }
    const syncByte = await ioReader.readUint8();
    if (syncByte !== 0x47) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal(`found syncByte not 0x47, value: ${syncByte.toString(16)}`, cheap__fileName__0, 94);
    }
    const tsPacket = new _struct__WEBPACK_IMPORTED_MODULE_3__.TSPacket();
    tsPacket.pos = pos;
    byte = await ioReader.readUint16();
    tsPacket.payloadUnitStartIndicator = (byte >> 14) & 0x01;
    tsPacket.transportPriority = (byte >> 13) & 0x01;
    tsPacket.pid = byte & 0x1fff;
    byte = await ioReader.readUint8();
    tsPacket.adaptationFieldControl = (byte >> 4) & 0x03;
    tsPacket.continuityCounter = byte & 0x0f;
    let payloadStartIndex = 4;
    if (tsPacket.adaptationFieldControl === 0x02 || tsPacket.adaptationFieldControl === 0x03) {
        const adaptationFieldLength = await ioReader.readUint8();
        if (5 + adaptationFieldLength === _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE) {
            (0,_function_parseAdaptationField__WEBPACK_IMPORTED_MODULE_4__["default"])(await ioReader.readBuffer(adaptationFieldLength), tsPacket);
            if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_FEC_PACKET_SIZE) {
                await ioReader.skip(16);
            }
            return tsPacket;
        }
        else {
            if (adaptationFieldLength > 0) {
                (0,_function_parseAdaptationField__WEBPACK_IMPORTED_MODULE_4__["default"])(await ioReader.readBuffer(adaptationFieldLength), tsPacket);
            }
            payloadStartIndex = 5 + adaptationFieldLength;
        }
    }
    if (tsPacket.adaptationFieldControl === 0x01 || tsPacket.adaptationFieldControl === 0x03) {
        tsPacket.payload = await ioReader.readBuffer(_mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_PACKET_SIZE - payloadStartIndex);
    }
    if (mpegtsContext.tsPacketSize === _mpegts__WEBPACK_IMPORTED_MODULE_0__.TS_FEC_PACKET_SIZE) {
        await ioReader.skip(16);
    }
    return tsPacket;
}


/***/ }),

/***/ "./src/avformat/formats/mpegts/mpegts.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/mpegts/mpegts.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PROBE_PACKET_MARGIN: () => (/* binding */ PROBE_PACKET_MARGIN),
/* harmony export */   PROBE_PACKET_MAX_BUF: () => (/* binding */ PROBE_PACKET_MAX_BUF),
/* harmony export */   StreamType2AVCodecId: () => (/* binding */ StreamType2AVCodecId),
/* harmony export */   TS_DVHS_PACKET_SIZE: () => (/* binding */ TS_DVHS_PACKET_SIZE),
/* harmony export */   TS_FEC_PACKET_SIZE: () => (/* binding */ TS_FEC_PACKET_SIZE),
/* harmony export */   TS_MAX_PACKET_SIZE: () => (/* binding */ TS_MAX_PACKET_SIZE),
/* harmony export */   TS_PACKET_SIZE: () => (/* binding */ TS_PACKET_SIZE)
/* harmony export */ });
/* unused harmony exports NB_PID_MAX, USUAL_SECTION_SIZE, MAX_SECTION_SIZE, MAX_RESYNC_SIZE, MAX_PES_PAYLOAD, MAX_MP4_DESCR_COUNT, REGISTRATION_DESCRIPTOR, ISO_639_LANGUAGE_DESCRIPTOR */
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


/***/ }),

/***/ "./src/common/math/median.ts":
/*!***********************************!*\
  !*** ./src/common/math/median.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ median)
/* harmony export */ });
/**
 * 获取数组中中间的值
 *
 * @param arr
 * @returns
 */
function median(arr) {
    if (arr.length === 0) {
        return 0;
    }
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 === 1) {
        return sortedArr[middleIndex];
    }
    else {
        return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IMpegtsFormat_ts.avplayer.js.map