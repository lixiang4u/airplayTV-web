"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IOggsFormat_ts"],{

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

/***/ "./src/avformat/formats/IOggsFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IOggsFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOggFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _oggs_OggPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oggs/OggPage */ "./src/avformat/formats/oggs/OggPage.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _oggs_opus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oggs/opus */ "./src/avformat/formats/oggs/opus.ts");
/* harmony import */ var _oggs_vorbis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./oggs/vorbis */ "./src/avformat/formats/oggs/vorbis.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/io/IOReaderSync */ "./src/common/io/IOReaderSync.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var cheap_std_buffer_SafeUint8Array__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! cheap/std/buffer/SafeUint8Array */ "./src/cheap/std/buffer/SafeUint8Array.ts");
/* harmony import */ var common_util_bigint__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! common/util/bigint */ "./src/common/util/bigint.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IOggsFormat.ts";



















class IOggFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_8__["default"] {
    type = 3 /* AVFormat.OGGS */;
    headerPagesPayload;
    page;
    curSegIndex;
    curSegStart;
    segCount;
    segIndex;
    currentPts;
    firstPos;
    firstGranulePosition;
    constructor() {
        super();
        this.page = new _oggs_OggPage__WEBPACK_IMPORTED_MODULE_2__.OggPage();
        this.headerPagesPayload = [];
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(false);
        }
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(false);
        }
        this.curSegIndex = -1;
        this.curSegStart = 0;
        this.currentPts = BigInt(0);
        this.segCount = 0;
        this.segIndex = 0;
        this.firstGranulePosition = BigInt(0);
    }
    async estimateTotalBlock(formatContext) {
        let duration = BigInt(0);
        const now = formatContext.ioReader.getPos();
        const pts = this.currentPts;
        const fileSize = await formatContext.ioReader.fileSize();
        await formatContext.ioReader.seek(common_util_bigint__WEBPACK_IMPORTED_MODULE_18__.max(fileSize - BigInt(195072), BigInt(0)));
        await this.syncPage(formatContext);
        while (true) {
            try {
                this.page.reset();
                await this.page.read(formatContext.ioReader);
                duration = this.page.granulePosition;
            }
            catch (error) {
                break;
            }
        }
        await formatContext.ioReader.seek(now);
        this.currentPts = pts;
        return duration;
    }
    async getNextSegment(formatContext) {
        if (this.curSegIndex < 0) {
            if (this.page.granulePosition > BigInt(0)) {
                this.currentPts = this.page.granulePosition;
            }
            this.page.reset();
            await this.page.read(formatContext.ioReader);
            this.curSegIndex = 0;
            this.curSegStart = 0;
            this.segIndex = -1;
            this.segCount = 0;
            for (let i = 0; i < this.page.segmentTable.length; i++) {
                if (this.page.segmentTable[i] !== 255) {
                    this.segCount++;
                }
            }
        }
        let len = 0;
        while (true) {
            const next = this.page.segmentTable[this.curSegIndex++];
            len += next;
            if (next !== 255) {
                break;
            }
        }
        const start = this.curSegStart;
        this.curSegStart += len;
        this.segIndex++;
        if (this.curSegIndex === this.page.segmentTable.length) {
            this.curSegIndex = -1;
        }
        return this.page.payload.subarray(start, start + len);
    }
    async readHeader(formatContext) {
        try {
            let signature = await formatContext.ioReader.peekString(4);
            if (signature !== 'OggS') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('the file format is not oggs', cheap__fileName__0, 167);
                return avutil_error__WEBPACK_IMPORTED_MODULE_6__.DATA_INVALID;
            }
            let payload = await this.getNextSegment(formatContext);
            let ioReader = new common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_12__["default"](payload.length, false);
            ioReader.appendBuffer(payload);
            signature = ioReader.peekString(8);
            if (signature === 'OpusHead') {
                const idPage = new _oggs_opus__WEBPACK_IMPORTED_MODULE_4__.OpusOggsIdPage();
                idPage.read(ioReader);
                const commentPage = new _oggs_opus__WEBPACK_IMPORTED_MODULE_4__.OpusOggsCommentPage();
                payload = await this.getNextSegment(formatContext);
                ioReader = new common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_12__["default"](payload.length, false);
                ioReader.appendBuffer(payload);
                commentPage.read(ioReader);
                this.headerPagesPayload = [
                    idPage,
                    commentPage
                ];
                const stream = formatContext.createStream();
                stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                stream.codecpar.codecId = 86076 /* AVCodecID.AV_CODEC_ID_OPUS */;
                stream.codecpar.sampleRate = idPage.sampleRate;
                stream.codecpar.chLayout.nbChannels = idPage.channels;
                stream.timeBase.den = stream.codecpar.sampleRate;
                stream.timeBase.num = 1;
                stream.privData = {
                    serialNumber: this.page.serialNumber
                };
                if (this.onStreamAdd) {
                    this.onStreamAdd(stream);
                }
                stream.duration = await this.estimateTotalBlock(formatContext);
            }
            else if (signature.slice(1, 7) === 'vorbis') {
                const buffers = [payload];
                const idPage = new _oggs_vorbis__WEBPACK_IMPORTED_MODULE_5__.VorbisOggsIdPage();
                idPage.read(ioReader);
                const commentPage = new _oggs_vorbis__WEBPACK_IMPORTED_MODULE_5__.VorbisOggsCommentPage();
                payload = await this.getNextSegment(formatContext);
                ioReader = new common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_12__["default"](payload.length, false);
                ioReader.appendBuffer(payload);
                commentPage.read(ioReader);
                buffers.push(payload);
                this.headerPagesPayload = [
                    idPage,
                    commentPage
                ];
                const stream = formatContext.createStream();
                stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                stream.codecpar.codecId = 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */;
                stream.codecpar.sampleRate = idPage.sampleRate;
                stream.codecpar.chLayout.nbChannels = idPage.channels;
                stream.timeBase.den = stream.codecpar.sampleRate;
                stream.timeBase.num = 1;
                stream.privData = {
                    serialNumber: this.page.serialNumber
                };
                // setup header
                buffers.push(await this.getNextSegment(formatContext));
                const extradataSize = buffers.reduce((pre, buffer) => {
                    return pre + 2 + buffer.length;
                }, 0);
                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(extradataSize);
                const ioWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_13__["default"](extradataSize, true, new cheap_std_buffer_SafeUint8Array__WEBPACK_IMPORTED_MODULE_17__["default"](data, extradataSize));
                buffers.forEach((buffer) => {
                    ioWriter.writeUint16(buffer.length);
                    ioWriter.writeBuffer(buffer);
                });
                stream.codecpar.extradata = data;
                stream.codecpar.extradataSize = extradataSize;
                if (this.onStreamAdd) {
                    this.onStreamAdd(stream);
                }
                stream.duration = await this.estimateTotalBlock(formatContext);
            }
            this.firstPos = formatContext.ioReader.getPos();
            return 0;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(error.message, cheap__fileName__0, 277);
            return formatContext.ioReader.error;
        }
    }
    async readAVPacket(formatContext, avpacket) {
        if (!this.headerPagesPayload.length) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_6__.FORMAT_NOT_SUPPORT;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, formatContext.ioReader.getPos());
        try {
            const payload = await this.getNextSegment(formatContext);
            let pts = this.currentPts + ((this.page.granulePosition - this.currentPts) / BigInt(Math.floor(this.segCount)) * BigInt(Math.floor(this.segIndex)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, pts);
            if (!this.firstGranulePosition) {
                this.firstGranulePosition = this.page.granulePosition;
            }
            const stream = formatContext.streams.find((stream) => {
                return stream.privData.serialNumber === this.page.serialNumber;
            });
            if (stream) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
                if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                }
            }
            const buffers = [payload];
            while (this.curSegIndex < 0) {
                try {
                    let next = await formatContext.ioReader.peekBuffer(6);
                    // 下一页是同一个 packet
                    if (next[5] & 0x01) {
                        buffers.push(await this.getNextSegment(formatContext));
                    }
                    else {
                        break;
                    }
                }
                catch (error) {
                    break;
                }
            }
            const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_7__["default"])(Uint8Array, buffers);
            const len = buffer.length;
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(len);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.memcpyFromUint8Array)(data, len, buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketData)(avpacket, data, len);
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(error.message, cheap__fileName__0, 343);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncPage(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_14__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        let lastGranulePosition = BigInt(0);
        while (true) {
            try {
                const word = await formatContext.ioReader.peekString(4);
                if (word === 'OggS') {
                    pos = formatContext.ioReader.getPos();
                    this.page.reset();
                    await this.page.read(formatContext.ioReader);
                    lastGranulePosition = this.page.granulePosition;
                    let count = 0;
                    while (true) {
                        if (count === analyzeCount) {
                            break;
                        }
                        const word = await formatContext.ioReader.peekString(4);
                        if (word === 'OggS') {
                            count++;
                            this.page.reset();
                            await this.page.read(formatContext.ioReader);
                        }
                        else {
                            break;
                        }
                    }
                    if (count === analyzeCount) {
                        break;
                    }
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_14__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
            while (true) {
                let next = await formatContext.ioReader.peekBuffer(6);
                // 找 packet 的开始 page
                if (!(next[5] & 0x01)) {
                    break;
                }
                this.page.reset();
                await this.page.read(formatContext.ioReader);
                lastGranulePosition = this.page.granulePosition;
            }
            this.currentPts = lastGranulePosition - this.firstGranulePosition;
            this.curSegIndex = -1;
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_6__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncPage(formatContext);
            }
            return now;
        }
        else {
            const pointPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_16__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_14__.AV_MILLI_TIME_BASE_Q);
            // 头十秒直接回到开始位置
            if (pointPts < BigInt(10000)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.debug(`seek pts is earlier then 10s, seek to first packet pos(${this.firstPos}) directly`, cheap__fileName__0, 435);
                await formatContext.ioReader.seek(this.firstPos);
                this.currentPts = BigInt(0);
                return now;
            }
            return (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_15__["default"])(formatContext, stream, timestamp, this.firstPos, this.readAVPacket.bind(this), this.syncPage.bind(this));
        }
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ }),

/***/ "./src/avformat/formats/oggs/OggPage.ts":
/*!**********************************************!*\
  !*** ./src/avformat/formats/oggs/OggPage.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OggPage: () => (/* binding */ OggPage)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia oggs page parser
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

class OggPage {
    /**
     * 4 bytes 页标识， OggS ASCII 字符
     */
    capturePattern;
    /**
     * 1 bytes 版本 id, 目前为 0
     */
    streamStructureVersion;
    /**
     * 1 bytes 类型标识， 表示该页为逻辑流的第一页
     *
     * - 0x01：本页媒体编码数据与前一页属于同一个逻辑流的同一个 packet，若此位没有设，表示本页是以一个新的 packet 开始的；
     * - 0x02：表示该页为逻辑流的第一页，bos 标识，如果此位未设置，那表示不是第一页；
     * - 0x04：表示该页位逻辑流的最后一页，eos 标识，如果此位未设置，那表示本页不是最后一页；
     */
    headerTypeFlag;
    /**
     * 8 bytes 媒体编码相关的参数信息
     *
     * 对于音频流来说，它存储着到本页为止逻辑流在 PCM 输出中采样码的数目，可以由它来算得时间戳
     * 对于视频流来说，它存储着到本页为止视频帧编码的数目
     * 若此值为 -1，那表示截止到本页，逻辑流的 packet 未结束
     */
    granulePosition;
    /**
     * 4 bytes 当前页中的流的 id，它是区分本页所属逻辑流与其他逻辑流的序号，我们可以通过这个值来划分流
     */
    serialNumber;
    /**
     * 4 bytes 本页在逻辑流的序号
     */
    pageSequenceNumber;
    /**
     * 4 bytes 循环冗余效验码效验， 用来效验每页的有效性
     */
    crcCheckSum;
    /**
     * 1 bytes 给定本页在 segment_table 域中出现的 segment 个数
     */
    numberPageSegments;
    /**
     * segment 长度表
     *
     * 表示着每个 segment 的长度，取值范围是 0~255
     * 由 segment（1 个 segment 就是 1 个字节）可以得到 packet 的值，每个 packet 的大小是以最后一个不等于 255 的 segment 结束的
     */
    segmentTable;
    payload;
    constructor() {
        this.reset();
    }
    reset() {
        this.capturePattern = 'OggS';
        this.streamStructureVersion = 0;
        this.headerTypeFlag = 0;
        this.granulePosition = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
        this.serialNumber = 0;
        this.pageSequenceNumber = 0;
        this.crcCheckSum = 0;
        this.numberPageSegments = 0;
        this.segmentTable = [];
    }
    async read(ioReader) {
        await this.readPageHeader(ioReader);
        const length = this.segmentTable.reduce((prev, len) => {
            return prev + len;
        }, 0);
        if (length) {
            this.payload = await ioReader.readBuffer(length);
        }
    }
    async readPageHeader(ioReader) {
        this.capturePattern = await ioReader.readString(4);
        this.streamStructureVersion = await ioReader.readUint8();
        this.headerTypeFlag = await ioReader.readUint8();
        this.granulePosition = await ioReader.readUint64();
        this.serialNumber = await ioReader.readUint32();
        this.pageSequenceNumber = await ioReader.readUint32();
        this.crcCheckSum = await ioReader.readUint32();
        this.numberPageSegments = await ioReader.readUint8();
        if (this.numberPageSegments) {
            for (let i = 0; i < this.numberPageSegments; i++) {
                const len = await ioReader.readUint8();
                this.segmentTable.push(len);
            }
        }
    }
    write(ioWriter) {
        ioWriter.writeString(this.capturePattern);
        ioWriter.writeUint8(this.streamStructureVersion);
        ioWriter.writeUint8(this.headerTypeFlag);
        ioWriter.writeUint64(this.granulePosition);
        ioWriter.writeUint32(this.serialNumber);
        ioWriter.writeUint32(this.pageSequenceNumber);
        ioWriter.writeUint32(this.crcCheckSum);
        if (this.payload) {
            this.numberPageSegments = Math.ceil(this.payload.length / 255);
            const last = this.payload.length % 255;
            ioWriter.writeUint8(this.numberPageSegments);
            for (let i = 0; i < this.numberPageSegments - 1; i++) {
                ioWriter.writeUint8(255);
            }
            ioWriter.writeUint8(last);
            ioWriter.writeBuffer(this.payload);
        }
        else {
            ioWriter.writeUint8(0);
        }
    }
}


/***/ }),

/***/ "./src/avformat/formats/oggs/opus.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/oggs/opus.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OpusOggsCommentPage: () => (/* binding */ OpusOggsCommentPage),
/* harmony export */   OpusOggsIdPage: () => (/* binding */ OpusOggsIdPage)
/* harmony export */ });
/*
 * libmedia oggs opus page parser
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
class ChannelMapping {
    /**
     * 1 bytes, unsigned ogg packet 里面编码了多少路 stream
     *
     */
    streamCount;
    /**
     * 1 bytes, unsigned 标识有多少路流是双声声道，必须小于 streamCount
     * opus 要支持超过 2 个声道是使用单声道流和双声道流组合而成
     * 一个 opus 流只能是单声道或双声道
     *
     */
    coupledStreamCount;
    /**
     * C bytes, C 为总输出声道数 coupledStreamCount + streamCount
     */
    mapping;
    constructor() {
        this.streamCount = 1;
        this.coupledStreamCount = 0;
        this.mapping = null;
    }
    read(ioReader) {
        this.streamCount = ioReader.readUint8();
        this.coupledStreamCount = ioReader.readUint8();
        this.mapping = ioReader.readBuffer(this.streamCount + this.coupledStreamCount);
    }
    write(ioWriter) {
        ioWriter.writeUint8(this.streamCount);
        ioWriter.writeUint8(this.coupledStreamCount);
        ioWriter.writeBuffer(this.mapping);
    }
}
class OpusOggsIdPage {
    streamIndex;
    /**
     * 8 bytes Magic Signature: OpusHead
     */
    signature;
    /**
     * 1 bytes unsigned, 对应值 0x01
     */
    version;
    /**
     * 1 bytes unsigned, 声道数， 它可能和编码声道数不一致， 它可能被修改成 packet-by-packet, 对应值 0x01
     */
    channels;
    /**
     * 2 bytes unsigned, 这是要从开始播放时的解码器输出， 从页面的颗粒位置减去以计算其 PCM 样本位置。
     */
    preSkip;
    /**
     * 4 bytes unsigned, 原始输入采样率
     */
    sampleRate;
    /**
     * 2 bytes signed, 这是解码时要应用的增益， 20 * log10 缩放解码器输出以实现所需的播放音量
     */
    outputGain;
    /**
     * 1 bytes unsigned, 指示输出渠道的顺序和语音含义。该八位位组的每个当前指定的值表示一个映射系列，它定义了一组允许的通道数，以及每个允许的通道数的通道名称的有序集合
     */
    channelMappingFamily;
    /**
     * 可选， 当 Channel Mapping Family 为 0 时被省略。
     */
    channelMappingTable;
    constructor() {
        this.signature = 'OpusHead';
        this.version = 0x01;
        this.channels = 1;
        this.preSkip = 0;
        this.sampleRate = 48000;
        this.outputGain = 0;
        this.channelMappingFamily = 0;
        this.channelMappingTable = new ChannelMapping();
    }
    read(ioReader) {
        this.signature = ioReader.readString(8);
        this.version = ioReader.readUint8();
        this.channels = ioReader.readUint8();
        this.preSkip = ioReader.readUint16();
        this.sampleRate = ioReader.readUint32();
        this.outputGain = ioReader.readInt16();
        this.channelMappingFamily = ioReader.readUint8();
        if (this.channelMappingFamily !== 0) {
            this.channelMappingTable.read(ioReader);
        }
    }
    write(ioWriter) {
        ioWriter.writeString(this.signature);
        ioWriter.writeUint8(this.version);
        ioWriter.writeUint8(this.channels);
        ioWriter.writeUint16(this.preSkip);
        ioWriter.writeUint32(this.sampleRate);
        ioWriter.writeInt16(this.outputGain);
        ioWriter.writeUint8(this.channelMappingFamily);
        if (this.channelMappingFamily !== 0) {
            this.channelMappingTable.write(ioWriter);
        }
    }
    setCodec(codecpar) {
        this.sampleRate = codecpar.sampleRate;
        this.channels = codecpar.chLayout.nbChannels;
    }
}
class UserComment {
    list;
    constructor() {
        this.list = [];
    }
    read(ioReader, count) {
        for (let i = 0; i < count; i++) {
            const length = ioReader.readUint32();
            this.list.push(ioReader.readString(length));
        }
    }
    write(ioWriter) {
        for (let i = 0; i < this.list.length; i++) {
            const buffer = ioWriter.encodeString(this.list[i]);
            ioWriter.writeUint32(buffer.length);
            ioWriter.writeBuffer(buffer);
        }
    }
    addComment(comment) {
        this.list.push(comment);
    }
}
class OpusOggsCommentPage {
    streamIndex;
    /**
     * 8 bytes Magic Signature: OpusTags
     */
    signature;
    /**
     * 4 bytes unsigned
     */
    vendorStringLength;
    /**
     * 长度由 Vendor String Length 指定， utf-8 编码
     */
    vendorString;
    /**
     * 4 bytes unsigned, 该字段指示用户提供的注释数。它可能表示用户提供的评论为零，在这种情况下数据包中没有其他字段。
     * 一定不要表示评论太多，以至于评论字符串长度将需要比其余的可用数据更多的数据数据包
     */
    userCommentListLength;
    comments;
    constructor() {
        this.signature = 'OpusTags';
        this.vendorString = "libmedia.0.0.1";
        this.vendorStringLength = this.vendorString.length;
        this.userCommentListLength = 0;
        this.comments = new UserComment();
    }
    read(ioReader) {
        this.signature = ioReader.readString(8);
        this.vendorStringLength = ioReader.readUint32();
        this.vendorString = ioReader.readString(this.vendorStringLength);
        this.userCommentListLength = ioReader.readUint32();
        if (this.userCommentListLength) {
            this.comments.read(ioReader, this.userCommentListLength);
        }
    }
    write(ioWriter) {
        ioWriter.writeString(this.signature);
        const buffer = ioWriter.encodeString(this.vendorString);
        ioWriter.writeUint32(buffer.length);
        ioWriter.writeBuffer(buffer);
        ioWriter.writeUint32(this.comments.list.length);
        this.comments.write(ioWriter);
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
}


/***/ }),

/***/ "./src/avformat/formats/oggs/vorbis.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/oggs/vorbis.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VorbisOggsCommentPage: () => (/* binding */ VorbisOggsCommentPage),
/* harmony export */   VorbisOggsIdPage: () => (/* binding */ VorbisOggsIdPage)
/* harmony export */ });
/*
 * libmedia oggs vorbis page parser
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
class VorbisOggsIdPage {
    streamIndex;
    /**
     * 8 bits packet_type
     */
    packetType;
    /**
     * 6 bytes Magic Signature: vorbis
     */
    signature;
    /**
     * 4 bytes unsigned, 对应值 0x01
     */
    version;
    /**
     * 1 bytes unsigned, 声道数
     */
    channels;
    /**
     * 4 bytes unsigned, 原始输入采样率
     */
    sampleRate;
    /**
     * 4 bytes
     */
    bitrateMaximum;
    /**
     * 4 bytes
     */
    bitrateNominal;
    /**
     * 4 bytes
     */
    bitrateMinimum;
    /**
     * 4 bits
     */
    blocksize0;
    /**
     * 4 bits
     */
    blocksize1;
    /**
     * 1 bit
     */
    framingFlag;
    constructor() {
        this.signature = 'vorbis';
        this.version = 0;
        this.channels = 1;
        this.sampleRate = 48000;
        this.bitrateMaximum = 0;
        this.bitrateNominal = 0;
        this.bitrateMinimum = 0;
    }
    read(ioReader) {
        this.packetType = ioReader.readUint8();
        this.signature = ioReader.readString(6);
        this.version = ioReader.readUint32();
        this.channels = ioReader.readUint8();
        this.sampleRate = ioReader.readInt32();
        this.bitrateMaximum = ioReader.readInt32();
        this.bitrateNominal = ioReader.readInt32();
        this.bitrateMinimum = ioReader.readInt32();
        const block = ioReader.readUint8() & 0xff;
        this.blocksize0 = Math.pow(2, block >>> 4);
        this.blocksize1 = Math.pow(2, block & 0x0f);
        this.framingFlag = ioReader.readUint8();
    }
    write(ioWriter) {
        ioWriter.writeUint8(0x01);
        ioWriter.writeString(this.signature);
        ioWriter.writeUint32(this.version);
        ioWriter.writeUint8(this.channels);
        ioWriter.writeInt32(this.sampleRate);
        ioWriter.writeInt32(this.bitrateMaximum);
        ioWriter.writeInt32(this.bitrateNominal);
        ioWriter.writeInt32(this.bitrateMinimum);
        ioWriter.writeUint8((Math.log2(this.blocksize0) << 4) | Math.log2(this.blocksize1));
        ioWriter.writeUint8(0x01);
    }
    setCodec(codecpar) {
        this.sampleRate = codecpar.sampleRate;
        this.channels = codecpar.chLayout.nbChannels;
    }
}
class UserComment {
    list;
    constructor() {
        this.list = [];
    }
    read(ioReader, count) {
        for (let i = 0; i < count; i++) {
            const length = ioReader.readUint32();
            this.list.push(ioReader.readString(length));
        }
    }
    write(ioWriter) {
        for (let i = 0; i < this.list.length; i++) {
            const buffer = ioWriter.encodeString(this.list[i]);
            ioWriter.writeUint32(buffer.length);
            ioWriter.writeBuffer(buffer);
        }
    }
    addComment(comment) {
        this.list.push(comment);
    }
}
class VorbisOggsCommentPage {
    streamIndex;
    /**
     * 8 bits packet_type
     */
    packetType;
    /**
     * 8 bytes Magic Signature: OpusTags
     */
    signature;
    /**
     * 4 bytes unsigned
     */
    vendorStringLength;
    /**
     * 长度由 Vendor String Length 指定， utf-8 编码
     */
    vendorString;
    /**
     * 4 bytes unsigned, 该字段指示用户提供的注释数。它可能表示用户提供的评论为零，在这种情况下数据包中没有其他字段。
     * 一定不要表示评论太多，以至于评论字符串长度将需要比其余的可用数据更多的数据数据包
     */
    userCommentListLength;
    comments;
    /**
     * 1 bit
     */
    framingFlag;
    constructor() {
        this.signature = 'vorbis';
        this.vendorString = "libmedia.0.0.1";
        this.vendorStringLength = this.vendorString.length;
        this.userCommentListLength = 0;
        this.comments = new UserComment();
    }
    read(ioReader) {
        this.packetType = ioReader.readUint8();
        this.signature = ioReader.readString(6);
        this.vendorStringLength = ioReader.readUint32();
        this.vendorString = ioReader.readString(this.vendorStringLength);
        this.userCommentListLength = ioReader.readUint32();
        if (this.userCommentListLength) {
            this.comments.read(ioReader, this.userCommentListLength);
        }
        this.framingFlag = ioReader.readUint8();
    }
    write(ioWriter) {
        ioWriter.writeString(this.signature);
        const buffer = ioWriter.encodeString(this.vendorString);
        ioWriter.writeUint32(buffer.length);
        ioWriter.writeBuffer(buffer);
        ioWriter.writeUint32(this.comments.list.length);
        this.comments.write(ioWriter);
        ioWriter.writeUint8(0x01);
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
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
        bytes += st.codecpar.bitRate * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(duration, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q) / BigInt(8000);
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
    // 最大到结尾往前 5 秒
    const max = fileSize - (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(5000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
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
            break;
        }
    }
    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(avpacket);
    if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`finally seek to pos ${pos}`, cheap__fileName__0, 124);
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

/***/ "./src/common/io/IOReaderSync.ts":
/*!***************************************!*\
  !*** ./src/common/io/IOReaderSync.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOReaderSync)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
var cheap__fileName__0 = "src\\common\\io\\IOReaderSync.ts";
/**
 * 读字节流工具
 */


class IOReaderSync {
    data;
    buffer;
    pointer;
    endPointer;
    pos;
    size;
    littleEndian;
    fileSize_;
    error;
    onFlush;
    onSeek;
    onSize;
    flags;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pos = BigInt(0);
        this.pointer = 0;
        this.error = 0;
        this.endPointer = 0;
        this.littleEndian = !bigEndian;
        this.flags = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.size = Math.max(size, 102400);
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 读取 8 位无符号整数
     *
     * @returns
     */
    readUint8() {
        if (this.remainingLength() < 1) {
            this.flush(1);
        }
        const value = this.data.getUint8(this.pointer);
        this.pointer++;
        this.pos++;
        return value;
    }
    peekUint8() {
        if (this.remainingLength() < 1) {
            this.flush(1);
        }
        return this.data.getUint8(this.pointer);
    }
    /**
     * 读取 16 位无符号整数
     *
     * @returns
     */
    readUint16() {
        if (this.remainingLength() < 2) {
            this.flush(2);
        }
        const value = this.data.getUint16(this.pointer, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
        return value;
    }
    peekUint16() {
        if (this.remainingLength() < 2) {
            this.flush(2);
        }
        return this.data.getUint16(this.pointer, this.littleEndian);
    }
    /**
     * 读取 24 位无符号整数
     *
     * @returns
     */
    readUint24() {
        const high = this.readUint16();
        const low = this.readUint8();
        return high << 8 | low;
    }
    peekUint24() {
        if (this.remainingLength() < 3) {
            this.flush(3);
        }
        const pointer = this.pointer;
        const pos = this.pos;
        const high = this.readUint16();
        const low = this.readUint8();
        const value = high << 8 | low;
        this.pointer = pointer;
        this.pos = pos;
        return value;
    }
    /**
     * 读取 32 位无符号整数
     *
     * @returns
     */
    readUint32() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        const value = this.data.getUint32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    peekUint32() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        return this.data.getUint32(this.pointer, this.littleEndian);
    }
    /**
     * 读取 64 位无符号整数
     *
     * @returns
     */
    readUint64() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        const value = this.data.getBigUint64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    peekUint64() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        return this.data.getBigUint64(this.pointer, this.littleEndian);
    }
    /**
     * 读取 8 位有符号整数
     *
     * @returns
     */
    readInt8() {
        if (this.remainingLength() < 1) {
            this.flush(1);
        }
        const value = this.data.getInt8(this.pointer);
        this.pointer++;
        this.pos++;
        return value;
    }
    peekInt8() {
        if (this.remainingLength() < 1) {
            this.flush(1);
        }
        return this.data.getInt8(this.pointer);
    }
    /**
     * 读取 16 位有符号整数
     *
     * @returns
     */
    readInt16() {
        if (this.remainingLength() < 2) {
            this.flush(2);
        }
        const value = this.data.getInt16(this.pointer, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
        return value;
    }
    peekInt16() {
        if (this.remainingLength() < 2) {
            this.flush(2);
        }
        return this.data.getInt16(this.pointer, this.littleEndian);
    }
    /**
     * 读取 32 位有符号整数
     *
     * @returns
     */
    readInt32() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        const value = this.data.getInt32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    peekInt32() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        return this.data.getInt32(this.pointer, this.littleEndian);
    }
    /**
     * 读取 64 位有符号整数
     *
     * @returns
     */
    readInt64() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        const value = this.data.getBigInt64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    peekInt64() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        return this.data.getBigInt64(this.pointer, this.littleEndian);
    }
    /**
     * 读取单精度浮点数
     *
     * @returns
     */
    readFloat() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        const value = this.data.getFloat32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    peekFloat() {
        if (this.remainingLength() < 4) {
            this.flush(4);
        }
        return this.data.getFloat32(this.pointer, this.littleEndian);
    }
    /**
     * 读取双精度浮点数
     *
     * @returns
     */
    readDouble() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        const value = this.data.getFloat64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    peekDouble() {
        if (this.remainingLength() < 8) {
            this.flush(8);
        }
        return this.data.getFloat64(this.pointer, this.littleEndian);
    }
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回
     *
     * @param length 默认 1
     * @returns
     */
    readHex(length = 1) {
        let hexStr = '';
        for (let i = 0; i < length; i++) {
            const hex = this.readUint8().toString(16);
            hexStr += (hex.length === 1 ? '0' + hex : hex);
        }
        return hexStr;
    }
    peekHex(length = 1) {
        if (length > this.size) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekHex, length too large', cheap__fileName__0, 341);
        }
        if (this.remainingLength() < length) {
            this.flush(length);
        }
        const pointer = this.pointer;
        const pos = this.pos;
        let hexStr = '';
        for (let i = 0; i < length; i++) {
            const hex = this.readUint8().toString(16);
            hexStr += (hex.length === 1 ? '0' + hex : hex);
        }
        this.pointer = pointer;
        this.pos = pos;
        return hexStr;
    }
    readBuffer(length, buffer) {
        if (!length) {
            return new Uint8Array(0);
        }
        if (!buffer) {
            buffer = new Uint8Array(length);
        }
        if (this.remainingLength() < length) {
            let index = 0;
            if (this.remainingLength() > 0) {
                const len = this.remainingLength();
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
            while (length > 0) {
                this.flush();
                const len = Math.min(this.endPointer - this.pointer, length);
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
        }
        else {
            buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
            this.pointer += length;
            this.pos += BigInt(length);
        }
        return buffer;
    }
    peekBuffer(length, buffer) {
        if (!length) {
            return new Uint8Array(0);
        }
        if (length > this.size) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekBuffer, length too large', cheap__fileName__0, 425);
        }
        if (this.remainingLength() < length) {
            this.flush(length);
        }
        if (!buffer) {
            buffer = new Uint8Array(length);
        }
        buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
        return buffer;
    }
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
    readString(length = 1) {
        const buffer = this.readBuffer(length);
        return _util_text__WEBPACK_IMPORTED_MODULE_1__.decode(buffer);
    }
    peekString(length = 1) {
        const buffer = this.peekBuffer(length);
        return _util_text__WEBPACK_IMPORTED_MODULE_1__.decode(buffer);
    }
    /**
     * 读取一行字符
     */
    readLine() {
        let str = '';
        while (true) {
            let got = false;
            for (let i = this.pointer; i < this.endPointer; i++) {
                if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                    if (i !== this.pointer) {
                        str += this.readString(i - this.pointer);
                    }
                    got = true;
                    break;
                }
            }
            if (!got) {
                str += this.readString(this.remainingLength());
                this.flush();
            }
            else {
                break;
            }
        }
        let next = this.peekUint8();
        if (next === 0x0a || next === 0x0d) {
            this.pointer++;
            if (next === 0x0d) {
                next = this.peekUint8();
                // \r\n
                if (next === 0x0a) {
                    this.pointer++;
                }
            }
        }
        return str;
    }
    peekLine() {
        if (this.remainingLength() < this.size) {
            this.flush();
        }
        let str = '';
        let got = false;
        for (let i = this.pointer; i < this.endPointer; i++) {
            if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                str += this.peekString(i - this.pointer);
                got = true;
                break;
            }
        }
        if (!got) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekLine, out of buffer', cheap__fileName__0, 516);
        }
        return str;
    }
    /**
     * 获取当前读取指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    /**
     * 获取已读字节偏移
     *
     * @returns
     */
    getPos() {
        return this.pos;
    }
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    skip(length) {
        const backup = length;
        while (this.remainingLength() < length) {
            length -= this.remainingLength();
            this.pointer = this.endPointer;
            this.flush();
        }
        if (this.remainingLength() >= length) {
            this.pointer += length;
        }
        this.pos += BigInt(backup);
    }
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength() {
        return this.endPointer - this.pointer;
    }
    flush(need = 0) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, flush failed because of no flush callback', cheap__fileName__0, 574);
        }
        if (this.size - this.remainingLength() <= 0) {
            return;
        }
        need = Math.min(need, this.size);
        if (this.pointer < this.endPointer) {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            this.endPointer = this.endPointer - this.pointer;
        }
        else {
            this.endPointer = 0;
        }
        this.pointer = 0;
        if (need) {
            while (this.remainingLength() < need) {
                const len = this.onFlush(this.buffer.subarray(this.endPointer));
                if (len < 0) {
                    this.error = len;
                    throw new Error(`IOReader error, flush ${len === -1048576 /* IOError.END */ ? 'ended' : 'failed'}, ret: ${len}`);
                }
                this.endPointer += len;
            }
        }
        else {
            const len = this.onFlush(this.buffer.subarray(this.endPointer));
            if (len < 0) {
                this.error = len;
                throw new Error(`IOReader error, flush ${len === -1048576 /* IOError.END */ ? 'ended' : 'failed'}, ret: ${len}`);
            }
            this.endPointer += len;
        }
    }
    seek(pos, force = false, flush = true) {
        if (!force) {
            const len = Number(pos - this.pos);
            // 可以往回 seek
            if (len < 0 && Math.abs(len) < this.pointer) {
                this.pointer += len;
                this.pos = pos;
                return;
            }
            // 可以直接往后 seek
            else if (len > 0 && this.pointer + len < this.endPointer) {
                this.pointer += len;
                this.pos = pos;
                return;
            }
            else if (len === 0) {
                return;
            }
        }
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed because of no seek callback', cheap__fileName__0, 634);
        }
        this.pointer = this.endPointer = 0;
        this.pos = pos;
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed', cheap__fileName__0, 643);
        }
        if (flush) {
            this.flush();
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
                _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('IOReader, call appendBuffer but the buffer\'s size is lagger then the remaining size', cheap__fileName__0, 674);
            }
        }
    }
    reset() {
        this.pointer = this.endPointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    fileSize() {
        if (this.fileSize_) {
            return this.fileSize_;
        }
        if (!this.onSize) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, fileSize failed because of no onSize callback', cheap__fileName__0, 695);
        }
        this.fileSize_ = this.onSize();
        return this.fileSize_;
    }
    getBufferSize() {
        return this.size;
    }
    pipe(ioWriter, length) {
        if (length) {
            if (this.remainingLength() < length) {
                if (this.remainingLength() > 0) {
                    const len = this.remainingLength();
                    ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                    this.pointer += len;
                    this.pos += BigInt(len);
                    length -= len;
                }
                while (length > 0) {
                    this.flush();
                    const len = Math.min(this.endPointer - this.pointer, length);
                    ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                    this.pointer += len;
                    this.pos += BigInt(len);
                    length -= len;
                }
            }
            else {
                ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + length));
                this.pointer += length;
                this.pos += BigInt(length);
            }
        }
        else {
            if (this.remainingLength() > 0) {
                const len = this.remainingLength();
                ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                this.pointer += len;
                this.pos += BigInt(len);
            }
            while (this.onFlush(this.buffer.subarray(0)) > 0) {
                const len = this.remainingLength();
                ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                this.pointer += len;
                this.pos += BigInt(len);
            }
        }
    }
}


/***/ }),

/***/ "./src/common/io/IOWriterSync.ts":
/*!***************************************!*\
  !*** ./src/common/io/IOWriterSync.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOWriterSync)
/* harmony export */ });
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 写字节流工具
 */

class IOWriterSync {
    data;
    buffer;
    pointer;
    pos;
    size;
    littleEndian;
    error;
    onFlush;
    onSeek;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.size = size;
        this.littleEndian = !bigEndian;
        this.error = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setUint8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setUint16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        if (this.remainingLength() < 3) {
            this.flush();
        }
        const high = (value & 0xff0000) >> 16;
        const middle = (value & 0x00ff00) >> 8;
        const low = value & 0x0000ff;
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
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setUint32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigUint64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setInt8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setInt16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setInt32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigInt64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setFloat32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setFloat64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    getPos() {
        return this.pos;
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        if (!buffer.length) {
            return;
        }
        let length = buffer.length;
        if (this.remainingLength() < length) {
            let index = 0;
            while (length > 0) {
                this.flush();
                const len = Math.min(this.size, length);
                this.buffer.set(buffer.subarray(index, index + len), this.pointer);
                this.pointer += len;
                this.pos += BigInt(len);
                index += len;
                length -= len;
            }
        }
        else {
            this.buffer.set(buffer, this.pointer);
            this.pointer += length;
            this.pos += BigInt(length);
        }
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    encodeString(str) {
        return _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
    }
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    flushToPos(pos) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer), pos);
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    seek(pos) {
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, seek failed because of no seek callback');
        }
        this.flush();
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            throw Error('IOWriter error, seek failed');
        }
        this.pos = pos;
    }
    seekInline(pos) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, Math.min(this.size, pos));
        this.pos += BigInt(this.pointer - pointer);
    }
    skip(length) {
        const pointer = this.pointer;
        this.pointer = Math.min(this.size, this.pointer + length);
        this.pos += BigInt(this.pointer - pointer);
    }
    back(length) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, this.pointer - length);
        this.pos += BigInt(this.pointer - pointer);
    }
    getBuffer() {
        return this.buffer.subarray(0, this.pointer);
    }
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    reset() {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    getBufferSize() {
        return this.size;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IOggsFormat_ts.avtranscoder.js.map