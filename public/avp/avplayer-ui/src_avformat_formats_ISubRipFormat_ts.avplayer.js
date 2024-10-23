"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_ISubRipFormat_ts"],{

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

/***/ "./src/avformat/formats/ISubRipFormat.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/ISubRipFormat.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IWebVttFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var common_util_time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/util/time */ "./src/common/util/time.ts");
var cheap__fileName__12 = "src\\avformat\\formats\\ISubRipFormat.ts";











class IWebVttFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 17 /* AVFormat.SUBRIP */;
    queue;
    index;
    constructor() {
        super();
    }
    init(formatContext) {
        this.queue = [];
    }
    async readChunk(formatContext) {
        let chunk = '';
        const pos = formatContext.ioReader.getPos();
        while (true) {
            const line = await formatContext.ioReader.readLine();
            if (line === '') {
                break;
            }
            chunk += line + '\n';
        }
        return { chunk: chunk.trim(), pos };
    }
    async readHeader(formatContext) {
        const stream = formatContext.createStream();
        stream.codecpar.codecId = 94225 /* AVCodecID.AV_CODEC_ID_SUBRIP */;
        stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
        stream.timeBase.den = 1000;
        stream.timeBase.num = 1;
        this.index = 0;
        let lastStartTs = BigInt(0);
        try {
            while (true) {
                const { chunk, pos } = await this.readChunk(formatContext);
                if (chunk === '') {
                    continue;
                }
                const lines = chunk.split('\n');
                let identifier = lines.shift().trim();
                let times = lines.shift().split(/--?>/);
                const startTs = (0,common_util_time__WEBPACK_IMPORTED_MODULE_10__.hhColonDDColonSSCommaMill2Int64)(times[0]);
                const endTs = (0,common_util_time__WEBPACK_IMPORTED_MODULE_10__.hhColonDDColonSSCommaMill2Int64)(times[1]);
                if (endTs <= startTs) {
                    continue;
                }
                const context = lines.join('\n').trim();
                if (!context) {
                    continue;
                }
                stream.nbFrames++;
                stream.duration = endTs;
                const cue = {
                    identifier,
                    context,
                    startTs,
                    endTs,
                    pos
                };
                if (startTs >= lastStartTs) {
                    this.queue.push(cue);
                    lastStartTs = startTs;
                }
                else {
                    common_util_array__WEBPACK_IMPORTED_MODULE_8__.sortInsert(this.queue, cue, (a) => {
                        if (a.startTs < cue.startTs) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                }
            }
        }
        catch (error) {
            return 0;
        }
    }
    async readAVPacket(formatContext, avpacket) {
        if (!this.queue.length) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        if (this.index >= this.queue.length) {
            return -1048576 /* IOError.END */;
        }
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
        });
        const cue = this.queue[this.index++];
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, cue.startTs), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cue.startTs);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, cue.endTs - cue.startTs);
        if (cue.identifier) {
            const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_9__.encode(cue.identifier);
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, buffer.length, buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketSideData)(avpacket, 16 /* AVPacketSideDataType.AV_PKT_DATA_WEBVTT_IDENTIFIER */, data, buffer.length);
        }
        const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_9__.encode(cue.context);
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(buffer.length);
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, buffer.length, buffer);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, buffer.length);
        return 0;
    }
    async seek(formatContext, stream, timestamp, flags) {
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
        }
        if (timestamp <= BigInt(0)) {
            this.index = 0;
            return BigInt(0);
        }
        const index = common_util_array__WEBPACK_IMPORTED_MODULE_8__.binarySearch(this.queue, (item) => {
            if (item.startTs > timestamp) {
                return -1;
            }
            return 1;
        });
        if (index >= 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in cues, found index: ${index}, pts: ${this.queue[index].startTs}, pos: ${this.queue[index].pos}`, cheap__fileName__12, 201);
            this.index = Math.max(index - 1, 0);
            while (this.index > 0) {
                if (this.queue[this.index - 1].startTs === this.queue[this.index].startTs
                    || this.queue[this.index - 1].endTs > timestamp) {
                    this.index--;
                }
                else {
                    break;
                }
            }
            return BigInt(0);
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID);
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ }),

/***/ "./src/common/util/time.ts":
/*!*********************************!*\
  !*** ./src/common/util/time.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hhColonDDColonSSCommaMill2Int64: () => (/* binding */ hhColonDDColonSSCommaMill2Int64),
/* harmony export */   hhColonDDColonSSDotMill2Int64: () => (/* binding */ hhColonDDColonSSDotMill2Int64)
/* harmony export */ });
function hhColonDDColonSSDotMill2Int64(time) {
    time = time.trim();
    if (!time) {
        return -BigInt(1);
    }
    let list = time.split(':');
    let ts = BigInt(0);
    if (list.length === 3) {
        ts += BigInt(+(list.shift().trim())) * BigInt(3600000);
    }
    ts += BigInt(+(list.shift().trim())) * BigInt(60000);
    list = list.shift().trim().split('.');
    ts += BigInt(+(list.shift().trim())) * BigInt(1000);
    ts += BigInt(+(list.shift().trim()));
    return ts;
}
function hhColonDDColonSSCommaMill2Int64(time) {
    time = time.trim();
    if (!time) {
        return -BigInt(1);
    }
    let list = time.split(':');
    let ts = BigInt(0);
    if (list.length === 3) {
        ts += BigInt(+(list.shift().trim())) * BigInt(3600000);
    }
    ts += BigInt(+(list.shift().trim())) * BigInt(60000);
    list = list.shift().trim().split(',');
    ts += BigInt(+(list.shift().trim())) * BigInt(1000);
    ts += BigInt(+(list.shift().trim()));
    return ts;
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_ISubRipFormat_ts.avplayer.js.map