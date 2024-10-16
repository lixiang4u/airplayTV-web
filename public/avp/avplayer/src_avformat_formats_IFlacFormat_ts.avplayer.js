"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IFlacFormat_ts"],{

/***/ "./src/avformat/formats/IFlacFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IFlacFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFlacFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _flac_iflac__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flac/iflac */ "./src/avformat/formats/flac/iflac.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IFlacFormat.ts";















const PACKET_SIZE = 1024;
class IFlacFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 14 /* AVFormat.FLAC */;
    context;
    constructor() {
        super();
    }
    init(formatContext) {
        formatContext.ioReader.setEndian(true);
        this.context = {
            streamInfo: {
                minimumBlockSize: 0,
                maximumBlockSize: 0,
                minimumFrameSize: 0,
                maximumFrameSize: 0,
                sampleRate: 0,
                channels: 0,
                bitPerSample: 0,
                samples: BigInt(0),
                md5: ''
            },
            frameInfo: {
                sampleRate: 0,
                channels: 0,
                bps: 0,
                blocksize: 0,
                chMode: 0,
                frameOrSampleNum: BigInt(0),
                isVarSize: 0
            },
            seekPoints: [],
            cueSheet: {
                catalogNumber: '',
                leadInSamples: BigInt(0),
                compactDisc: false,
                tracks: []
            },
            picture: {
                type: 0,
                mimeType: '',
                description: '',
                width: 0,
                height: 0,
                colorDepth: 0,
                indexedColor: 0,
                data: null
            },
            cacheBuffer: null,
            cachePos: BigInt(0),
            bitReader: new common_io_BitReader__WEBPACK_IMPORTED_MODULE_9__["default"](16),
            fileSize: BigInt(0),
            firstFramePos: BigInt(0),
            isVarSize: -1
        };
    }
    async readHeader(formatContext) {
        const signature = await formatContext.ioReader.readString(4);
        if (signature !== 'fLaC') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not flac', cheap__fileName__0, 116);
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        this.context.fileSize = await formatContext.ioReader.fileSize();
        const stream = formatContext.createStream();
        stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        stream.codecpar.codecId = 86028 /* AVCodecID.AV_CODEC_ID_FLAC */;
        while (true) {
            const blockHeader = await formatContext.ioReader.readUint8();
            const blockLen = await formatContext.ioReader.readUint24();
            const blockType = blockHeader & (~0x80);
            if (blockType === 0 /* MetaDataBlockType.STREAMINFO */) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(blockLen);
                stream.codecpar.extradataSize = blockLen;
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(stream.codecpar.extradata, blockLen, await formatContext.ioReader.peekBuffer(blockLen));
                this.context.streamInfo.minimumBlockSize = await formatContext.ioReader.readUint16();
                this.context.streamInfo.maximumBlockSize = await formatContext.ioReader.readUint16();
                this.context.streamInfo.minimumFrameSize = await formatContext.ioReader.readUint24();
                this.context.streamInfo.maximumFrameSize = await formatContext.ioReader.readUint24();
                const sampleRate = await formatContext.ioReader.readUint24();
                stream.codecpar.sampleRate = (sampleRate >> 4);
                stream.codecpar.chLayout.nbChannels = ((sampleRate & 0x0f) >>> 1) + 1;
                this.context.streamInfo.sampleRate = stream.codecpar.sampleRate;
                this.context.streamInfo.channels = stream.codecpar.chLayout.nbChannels;
                const bitPerSample = await formatContext.ioReader.readUint8();
                stream.codecpar.bitsPerRawSample = (((sampleRate & 0x01) << 4) | ((bitPerSample & 0xf0) >>> 4)) + 1;
                this.context.streamInfo.bitPerSample = stream.codecpar.bitsPerRawSample;
                const samplesLow = await formatContext.ioReader.readUint32();
                const samples = (BigInt(Math.floor(bitPerSample & 0x0f)) << BigInt(32)) | BigInt(Math.floor(samplesLow));
                this.context.streamInfo.samples = samples;
                stream.timeBase.den = stream.codecpar.sampleRate;
                stream.timeBase.num = 1;
                stream.duration = samples;
                stream.startTime = BigInt(0);
                this.context.streamInfo.md5 = await formatContext.ioReader.readString(16);
            }
            else if (blockType === 2 /* MetaDataBlockType.APPLICATION */) {
                const stream = formatContext.createStream();
                stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
                stream.codecpar.codecTag = await formatContext.ioReader.readUint32();
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(blockLen - 4);
                stream.codecpar.extradataSize = blockLen - 4;
                await formatContext.ioReader.readBuffer(blockLen - 4, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (blockType === 3 /* MetaDataBlockType.SEEKTABLE */) {
                for (let i = 0; i < blockLen / 18; i++) {
                    const pts = await formatContext.ioReader.readUint64();
                    const pos = await formatContext.ioReader.readUint64();
                    const samples = await formatContext.ioReader.readUint16();
                    this.context.seekPoints.push({
                        pts,
                        pos,
                        samples
                    });
                }
            }
            else if (blockType === 4 /* MetaDataBlockType.VORBIS_COMMENT */) {
                formatContext.ioReader.setEndian(false);
                const vendorStringLength = await formatContext.ioReader.readUint32();
                const vendorString = await formatContext.ioReader.readString(vendorStringLength);
                const userCommentListLength = await formatContext.ioReader.readUint32();
                const comments = [];
                for (let i = 0; i < userCommentListLength; i++) {
                    const length = await formatContext.ioReader.readUint32();
                    comments.push(await formatContext.ioReader.readString(length));
                }
                stream.metadata['vendor'] = vendorString;
                stream.metadata['comments'] = comments;
                formatContext.ioReader.setEndian(true);
            }
            else if (blockType === 5 /* MetaDataBlockType.CUESHEET */) {
                this.context.cueSheet.catalogNumber = await formatContext.ioReader.readString(128);
                this.context.cueSheet.leadInSamples = await formatContext.ioReader.readUint64();
                this.context.cueSheet.compactDisc = !!((await formatContext.ioReader.readUint8()) >>> 7);
                await formatContext.ioReader.skip(258);
                const trackCount = await formatContext.ioReader.readUint8();
                for (let i = 0; i < trackCount; i++) {
                    const offset = await formatContext.ioReader.readUint64();
                    const number = await formatContext.ioReader.readUint8();
                    const isrc = await formatContext.ioReader.readBuffer(12);
                    const flags = await formatContext.ioReader.readUint8();
                    await formatContext.ioReader.skip(13);
                    const pointCount = await formatContext.ioReader.readUint8();
                    const points = [];
                    for (let j = 0; j < pointCount; j++) {
                        points.push({
                            offset: await formatContext.ioReader.readUint64(),
                            point: await formatContext.ioReader.readUint8()
                        });
                        await formatContext.ioReader.skip(3);
                    }
                    this.context.cueSheet.tracks.push({
                        offset,
                        number,
                        isrc,
                        type: flags >>> 7,
                        preEmphasisFlag: (flags >>> 6) & 0x01,
                        points
                    });
                }
            }
            else if (blockType === 6 /* MetaDataBlockType.PICTURE */) {
                this.context.picture.type = await formatContext.ioReader.readUint32();
                let len = await formatContext.ioReader.readUint32();
                this.context.picture.mimeType = await formatContext.ioReader.readString(len);
                len = await formatContext.ioReader.readUint32();
                this.context.picture.description = await formatContext.ioReader.readString(len);
                this.context.picture.width = await formatContext.ioReader.readUint32();
                this.context.picture.height = await formatContext.ioReader.readUint32();
                this.context.picture.colorDepth = await formatContext.ioReader.readUint32();
                this.context.picture.indexedColor = await formatContext.ioReader.readUint32();
                len = await formatContext.ioReader.readUint32();
                this.context.picture.data = await formatContext.ioReader.readBuffer(len);
            }
            else {
                await formatContext.ioReader.skip(blockLen);
            }
            if (blockHeader & 0x80) {
                break;
            }
        }
        this.context.firstFramePos = formatContext.ioReader.getPos();
        stream.privData = this.context;
        return 0;
    }
    async getNextFrame(formatContext) {
        const buffers = [];
        while (true) {
            if (formatContext.ioReader.getPos() === this.context.fileSize) {
                if (this.context.cacheBuffer) {
                    buffers.push(this.context.cacheBuffer);
                    this.context.cacheBuffer = null;
                }
                break;
            }
            if (!this.context.cacheBuffer) {
                this.context.cachePos = formatContext.ioReader.getPos();
                this.context.cacheBuffer = await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, (Number(this.context.fileSize - formatContext.ioReader.getPos() & 0xffffffffn) >> 0)));
            }
            else if (this.context.cacheBuffer.length < 17) {
                this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                    this.context.cacheBuffer,
                    await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, (Number(this.context.fileSize - formatContext.ioReader.getPos() & 0xffffffffn) >> 0)))
                ]);
            }
            let i = buffers.length ? 0 : 2;
            // 根据规范 isVarSize 是不能变的，但发现某些文件中间的某一帧变了，这里将强行指定到第一个帧的值来判断
            const sync = this.context.isVarSize < 0 ? [0xf8, 0xf9] : (this.context.isVarSize ? [0xf9] : [0xf8]);
            for (; i < this.context.cacheBuffer.length - 2; i++) {
                if (this.context.cacheBuffer[i] === 0xff && common_util_array__WEBPACK_IMPORTED_MODULE_13__.has(sync, this.context.cacheBuffer[i + 1])) {
                    if (i) {
                        buffers.push(this.context.cacheBuffer.subarray(0, i));
                        this.context.cacheBuffer = this.context.cacheBuffer.subarray(i);
                        this.context.cachePos += BigInt(Math.floor(i));
                    }
                    break;
                }
            }
            if (i === this.context.cacheBuffer.length - 2) {
                if (formatContext.ioReader.getPos() === this.context.fileSize) {
                    buffers.push(this.context.cacheBuffer);
                    this.context.cachePos += BigInt(Math.floor(this.context.cacheBuffer.length));
                    this.context.cacheBuffer = null;
                }
                else {
                    buffers.push(this.context.cacheBuffer.subarray(0, i));
                    this.context.cachePos += BigInt(Math.floor(i));
                    this.context.cacheBuffer = this.context.cacheBuffer.subarray(i);
                }
                continue;
            }
            if (this.context.cacheBuffer.length < 16) {
                this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                    this.context.cacheBuffer,
                    await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, (Number(this.context.fileSize - formatContext.ioReader.getPos() & 0xffffffffn) >> 0)))
                ]);
            }
            this.context.bitReader.clear();
            this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0, 16));
            if ((0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, {}, true) < 0) {
                buffers.push(this.context.cacheBuffer.subarray(0, 2));
                this.context.cachePos += BigInt(2);
                this.context.cacheBuffer = this.context.cacheBuffer.subarray(2);
            }
            else {
                break;
            }
        }
        if (buffers.length === 1) {
            return buffers[0];
        }
        return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, buffers);
    }
    async readAVPacket(formatContext, avpacket) {
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        });
        try {
            let now = formatContext.ioReader.getPos();
            if (now === this.context.fileSize) {
                return -1048576 /* IOError.END */;
            }
            this.context.bitReader.clear();
            if (this.context.cacheBuffer) {
                now = this.context.cachePos;
                if (this.context.cacheBuffer.length < 16) {
                    this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                        this.context.cacheBuffer,
                        await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, (Number(this.context.fileSize - formatContext.ioReader.getPos() & 0xffffffffn) >> 0)))
                    ]);
                }
                this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0, 16));
            }
            else {
                this.context.bitReader.appendBuffer(await formatContext.ioReader.peekBuffer(16));
            }
            if ((0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, this.context.frameInfo) < 0) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            const nextFrame = await this.getNextFrame(formatContext);
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(nextFrame.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, nextFrame.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, now);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, this.context.frameInfo.isVarSize
                ? this.context.frameInfo.frameOrSampleNum
                : this.context.frameInfo.frameOrSampleNum * BigInt(this.context.frameInfo.blocksize >>> 0)), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, this.context.frameInfo.isVarSize
                ? this.context.frameInfo.frameOrSampleNum
                : this.context.frameInfo.frameOrSampleNum * BigInt(this.context.frameInfo.blocksize >>> 0));
            if (this.context.isVarSize < 0) {
                this.context.isVarSize = this.context.frameInfo.isVarSize;
            }
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(error.message, cheap__fileName__0, 405);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncFrame(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
        while (true) {
            try {
                const word = await formatContext.ioReader.peekUint16();
                if (word === 0xfff9 || word === 0xfff8) {
                    pos = formatContext.ioReader.getPos();
                    this.context.bitReader.clear();
                    this.context.bitReader.appendBuffer(await formatContext.ioReader.peekBuffer(16));
                    if (!(0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, {}, true)) {
                        break;
                    }
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        const context = stream.privData;
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncFrame(formatContext);
            }
            return now;
        }
        if (stream && stream.sampleIndexes.length) {
            let index = common_util_array__WEBPACK_IMPORTED_MODULE_13__.binarySearch(stream.sampleIndexes, (item) => {
                if (item.pts > timestamp) {
                    return -1;
                }
                return 1;
            });
            if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_14__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_MILLI_TIME_BASE_Q) < BigInt(5000)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 472);
                await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                context.cacheBuffer = null;
                return now;
            }
        }
        if (context.seekPoints.length) {
            for (let i = 0; i < context.seekPoints.length; i++) {
                const cue = context.seekPoints[i];
                if (cue.pts >= timestamp) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in seekPoints, found index: ${i}, pts: ${cue.pts}, pos: ${cue.pos + context.firstFramePos}`, cheap__fileName__0, 483);
                    await formatContext.ioReader.seek(cue.pos + context.firstFramePos);
                    context.cacheBuffer = null;
                    return now;
                }
            }
        }
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 491);
        const ret = await (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_12__["default"])(formatContext, stream, timestamp, context.firstFramePos, this.readAVPacket.bind(this), this.syncFrame.bind(this));
        if (ret > 0) {
            context.cacheBuffer = null;
        }
        return ret;
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
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

/***/ "./src/avformat/formats/flac/flac.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/flac/flac.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockSizeTable: () => (/* binding */ BlockSizeTable),
/* harmony export */   FLAC_MAX_CHANNELS: () => (/* binding */ FLAC_MAX_CHANNELS),
/* harmony export */   SampleRateTable: () => (/* binding */ SampleRateTable),
/* harmony export */   SampleSizeTable: () => (/* binding */ SampleSizeTable)
/* harmony export */ });
/* unused harmony exports FLAC_STREAMINFO_SIZE, FLAC_MIN_BLOCKSIZE, FLAC_MAX_BLOCKSIZE, FLAC_MIN_FRAME_SIZE */
/*
 * libmedia flac defined
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
const FLAC_STREAMINFO_SIZE = 34;
const FLAC_MAX_CHANNELS = 8;
const FLAC_MIN_BLOCKSIZE = 16;
const FLAC_MAX_BLOCKSIZE = 65535;
const FLAC_MIN_FRAME_SIZE = 10;
const SampleSizeTable = [0, 8, 12, 0, 16, 20, 24, 32];
const SampleRateTable = [
    0, 88200, 176400, 192000, 8000, 16000, 22050,
    24000, 32000, 44100, 48000, 96000,
    0, 0, 0, 0
];
const BlockSizeTable = [
    0, 192,
    576,
    1152,
    2304,
    4608,
    0, 0,
    256,
    512,
    1024,
    2048,
    4096,
    8192,
    16384,
    32768
];


/***/ }),

/***/ "./src/avformat/formats/flac/iflac.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/flac/iflac.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeFrameHeader: () => (/* binding */ decodeFrameHeader)
/* harmony export */ });
/* unused harmony export getUtf8 */
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _flac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flac */ "./src/avformat/formats/flac/flac.ts");
/* harmony import */ var avutil_function_crc8__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/function/crc8 */ "./src/avutil/function/crc8.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\flac\\iflac.ts";




function getUtf8(reader) {
    let value = BigInt(Math.floor(reader.readU(8)));
    let top = (value & BigInt(128)) >> BigInt(1);
    if ((value & BigInt(0xc0)) === BigInt(0x80) || value >= BigInt(0xfe)) {
        return -BigInt(1);
    }
    while (value & top) {
        const tmp = BigInt(Math.floor(reader.readU(8))) - BigInt(128);
        if (tmp >> BigInt(6)) {
            return -BigInt(1);
        }
        value = (value << BigInt(6)) + tmp;
        top <<= BigInt(5);
    }
    value &= (top << BigInt(1)) - BigInt(1);
    return value;
}
function decodeFrameHeader(bitReader, info, check = false) {
    const start = bitReader.getPos();
    if ((bitReader.readU(15) & 0x7fff) != 0x7ffc) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('invalid sync code', cheap__fileName__0, 57);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.isVarSize = bitReader.readU1();
    const bsCode = bitReader.readU(4);
    const srCode = bitReader.readU(4);
    info.chMode = bitReader.readU(4);
    if (info.chMode < _flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS) {
        info.channels = info.chMode + 1;
        info.chMode = 0 /* FlacCHMode.INDEPENDENT */;
    }
    else if (info.chMode < _flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS + 3 /* FlacCHMode.MID_SIDE */) {
        info.channels = 2;
        info.chMode -= _flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS - 1;
    }
    else {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`invalid channel mode: ${info.chMode}`, cheap__fileName__0, 76);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    const bpsCode = bitReader.readU(3);
    if (bpsCode === 3) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`invalid sample size code: ${bpsCode}`, cheap__fileName__0, 82);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.bps = _flac__WEBPACK_IMPORTED_MODULE_2__.SampleSizeTable[bpsCode];
    if (bitReader.readU1()) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('broken stream, invalid padding', cheap__fileName__0, 88);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.frameOrSampleNum = getUtf8(bitReader);
    if (info.frameOrSampleNum < 0) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('sample/frame number invalid', cheap__fileName__0, 95);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    if (bsCode === 0) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('reserved blocksize code: 0', cheap__fileName__0, 100);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    else if (bsCode === 6) {
        info.blocksize = bitReader.readU(8) + 1;
    }
    else if (bsCode === 7) {
        info.blocksize = bitReader.readU(16) + 1;
    }
    else {
        info.blocksize = _flac__WEBPACK_IMPORTED_MODULE_2__.BlockSizeTable[bsCode];
    }
    if (srCode < 12) {
        info.sampleRate = _flac__WEBPACK_IMPORTED_MODULE_2__.SampleRateTable[srCode];
    }
    else if (srCode === 12) {
        info.sampleRate = bitReader.readU(8) * 1000;
    }
    else if (srCode === 13) {
        info.sampleRate = bitReader.readU(16);
    }
    else if (srCode === 14) {
        info.sampleRate = bitReader.readU(16) * 10;
    }
    else {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`illegal sample rate code ${srCode}`, cheap__fileName__0, 126);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    const crc = (0,avutil_function_crc8__WEBPACK_IMPORTED_MODULE_3__["default"])(bitReader.getBuffer().subarray(start, bitReader.getPos()));
    if (crc !== bitReader.readU(8)) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('header crc mismatch', cheap__fileName__0, 133);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    return 0;
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

/***/ "./src/avutil/function/crc8.ts":
/*!*************************************!*\
  !*** ./src/avutil/function/crc8.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ crc8)
/* harmony export */ });
/*
 * libmedia crc8
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
function crc8(data, crc = 0x00) {
    const polynomial = 0x07;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ polynomial;
            }
            else {
                crc <<= 1;
            }
        }
    }
    return crc & 0xFF;
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IFlacFormat_ts.avplayer.js.map