"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OOggFormat_ts"],{

/***/ "./src/avformat/formats/OOggFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OOggFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OOggFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _ogg_OggPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ogg/OggPage */ "./src/avformat/formats/ogg/OggPage.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _ogg_opus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ogg/opus */ "./src/avformat/formats/ogg/opus.ts");
/* harmony import */ var _ogg_vorbis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ogg/vorbis */ "./src/avformat/formats/ogg/vorbis.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/io/IOReaderSync */ "./src/common/io/IOReaderSync.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
var cheap__fileName__1 = "src\\avformat\\formats\\OOggFormat.ts";

/*
 * libmedia oggs encoder
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











const PAGE_MAX = 65025;
class OOggFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_2__["default"] {
    type = 4 /* AVFormat.OGG */;
    checksumTable;
    headerPagesPayload;
    cacheWriter;
    page;
    constructor() {
        super();
        this.checksumTable = [];
        this.page = new _ogg_OggPage__WEBPACK_IMPORTED_MODULE_3__.OggPage();
        this.headerPagesPayload = [];
    }
    initChecksumTab() {
        for (let i = 0; i < 256; i++) {
            let r = i << 24;
            for (let j = 0; j < 8; j++) {
                r = ((r & 0x80000000) != 0) ? ((r << 1) ^ 0x04c11db7) : (r << 1);
            }
            this.checksumTable[i] = (r & 0xffffffff);
        }
    }
    getChecksum(data) {
        let checksum = 0;
        for (let i = 0; i < data.length; i++) {
            checksum = (checksum << 8) ^ this.checksumTable[((checksum >>> 24) & 0xff) ^ data[i]];
        }
        return checksum >>> 0;
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(false);
        this.initChecksumTab();
        this.cacheWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_1__["default"](PAGE_MAX, false);
        if (this.headerPagesPayload) {
            for (let i = 0; i < this.headerPagesPayload.length; i++) {
                this.headerPagesPayload[i].setCodec(formatContext.getStreamByIndex(this.headerPagesPayload[i].streamIndex).codecpar);
            }
        }
        if (formatContext.streams) {
            formatContext.streams.forEach((stream) => {
                stream.privData = {
                    granulePosition: BigInt(0),
                    pageSequenceLast: 0
                };
            });
        }
        return 0;
    }
    writePage(stream, ioWriter, buffer, headerTypeFlag) {
        let length = buffer.length;
        let realLength = length;
        let offset = 0;
        while (length > 0) {
            const len = Math.min(PAGE_MAX, length);
            const payload = buffer.subarray(offset, offset + len);
            const isLast = offset + len === realLength;
            const isStart = offset === 0;
            this.page.reset();
            this.page.serialNumber = stream.index;
            if (!isLast) {
                this.page.granulePosition = avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT;
            }
            else {
                this.page.granulePosition = stream.privData.granulePosition;
            }
            this.page.pageSequenceNumber = stream.privData.pageSequenceLast;
            this.page.crcCheckSum = 0;
            this.page.headerTypeFlag = headerTypeFlag || 0;
            if (!isStart) {
                // 与前一页属于同一个 packet
                this.page.headerTypeFlag |= 0x01;
            }
            this.page.payload = payload;
            this.cacheWriter.reset();
            this.page.write(this.cacheWriter);
            const crc = this.getChecksum(this.cacheWriter.getBuffer());
            const pointer = this.cacheWriter.getPointer();
            this.cacheWriter.seekInline(22);
            this.cacheWriter.writeUint32(crc);
            this.cacheWriter.seekInline(pointer);
            ioWriter.writeBuffer(this.cacheWriter.getBuffer());
            length -= len;
            offset += len;
        }
        ++stream.privData.pageSequenceLast;
        if (stream.privData.pageSequenceLast > Math.pow(2, 32) - 1) {
            stream.privData.pageSequenceLast = 0;
        }
    }
    writeHeader(formatContext) {
        if (!this.headerPagesPayload.length) {
            const stream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
            if (stream) {
                if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                    const idPage = new _ogg_opus__WEBPACK_IMPORTED_MODULE_7__.OpusOggsIdPage();
                    const commentPage = new _ogg_opus__WEBPACK_IMPORTED_MODULE_7__.OpusOggsCommentPage();
                    idPage.streamIndex = stream.index;
                    idPage.setCodec(stream.codecpar);
                    commentPage.streamIndex = stream.index;
                    this.headerPagesPayload = [
                        idPage,
                        commentPage
                    ];
                }
                else if (stream.codecpar.codecId === 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */) {
                    if (!stream.codecpar.extradataSize) {
                        return avutil_error__WEBPACK_IMPORTED_MODULE_11__.DATA_INVALID;
                    }
                    const idPage = new _ogg_vorbis__WEBPACK_IMPORTED_MODULE_8__.VorbisOggsIdPage();
                    const commentPage = new _ogg_vorbis__WEBPACK_IMPORTED_MODULE_8__.VorbisOggsCommentPage();
                    idPage.setCodec(stream.codecpar);
                    idPage.streamIndex = stream.index;
                    commentPage.streamIndex = stream.index;
                    this.cacheWriter.reset();
                    idPage.write(this.cacheWriter);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 2);
                    this.cacheWriter.reset();
                    commentPage.write(this.cacheWriter);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 0);
                    const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
                    let ioReader = new common_io_IOReaderSync__WEBPACK_IMPORTED_MODULE_10__["default"](extradata.length, true);
                    ioReader.appendBuffer(extradata);
                    if (ioReader.peekUint16() === 30) {
                        for (let i = 0; i < 3; i++) {
                            const len = ioReader.readUint16();
                            if (i === 2) {
                                this.writePage(stream, formatContext.ioWriter, ioReader.readBuffer(len), 0);
                            }
                            else {
                                ioReader.skip(len);
                            }
                        }
                    }
                    else if (ioReader.peekUint8() === 0x02) {
                        ioReader.skip(1);
                        const headerLen = [];
                        for (let i = 0; i < 2; i++) {
                            let len = 0;
                            while (ioReader.peekUint8() === 0xff) {
                                len += 0xff;
                                ioReader.skip(1);
                            }
                            len += ioReader.readUint8();
                            headerLen[i] = len;
                        }
                        ioReader.skip(headerLen[0]);
                        ioReader.skip(headerLen[1]);
                        this.writePage(stream, formatContext.ioWriter, ioReader.readBuffer(ioReader.remainingLength()), 0);
                    }
                    else {
                        return avutil_error__WEBPACK_IMPORTED_MODULE_11__.DATA_INVALID;
                    }
                }
                else if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */) {
                    if (stream.codecpar.extradataSize < 34) {
                        return avutil_error__WEBPACK_IMPORTED_MODULE_11__.DATA_INVALID;
                    }
                    this.cacheWriter.setEndian(true);
                    this.cacheWriter.reset();
                    this.cacheWriter.writeUint8(0x7f);
                    this.cacheWriter.writeString('FLAC');
                    this.cacheWriter.writeUint8(1);
                    this.cacheWriter.writeUint8(0);
                    this.cacheWriter.writeUint16(1);
                    this.cacheWriter.writeString('fLaC');
                    this.cacheWriter.writeUint8(0);
                    this.cacheWriter.writeUint24(34);
                    this.cacheWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.mapUint8Array)(stream.codecpar.extradata, 34));
                    this.cacheWriter.setEndian(false);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 2);
                    const commentPage = new _ogg_OggPage__WEBPACK_IMPORTED_MODULE_3__.OggsCommentPage();
                    commentPage.streamIndex = stream.index;
                    this.cacheWriter.setEndian(true);
                    this.cacheWriter.reset();
                    this.cacheWriter.writeUint8(0x84);
                    this.cacheWriter.writeUint24(0);
                    this.cacheWriter.setEndian(false);
                    commentPage.write(this.cacheWriter);
                    this.cacheWriter.setEndian(true);
                    const pos = this.cacheWriter.getPointer();
                    this.cacheWriter.seekInline(1);
                    this.cacheWriter.writeUint24(pos - 4);
                    this.cacheWriter.setEndian(false);
                    this.cacheWriter.seekInline(pos);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 0);
                }
                else if (stream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                    if (!stream.codecpar.extradataSize) {
                        return avutil_error__WEBPACK_IMPORTED_MODULE_11__.DATA_INVALID;
                    }
                    this.cacheWriter.reset();
                    this.cacheWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_9__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 2);
                    const commentPage = new _ogg_OggPage__WEBPACK_IMPORTED_MODULE_3__.OggsCommentPage();
                    commentPage.streamIndex = stream.index;
                    this.cacheWriter.reset();
                    commentPage.write(this.cacheWriter);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), 0);
                }
            }
        }
        if (this.headerPagesPayload) {
            for (let i = 0; i < this.headerPagesPayload.length; i++) {
                const stream = formatContext.getStreamByIndex(this.headerPagesPayload[i].streamIndex);
                if (stream) {
                    this.cacheWriter.reset();
                    this.headerPagesPayload[i].write(this.cacheWriter);
                    this.writePage(stream, formatContext.ioWriter, this.cacheWriter.getBuffer().slice(), i === 0 ? 2 : 0);
                }
            }
        }
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 318);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 325);
            return;
        }
        this.writePage(stream, formatContext.ioWriter, (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.getAVPacketData)(avpacket), 0);
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            stream.privData.granulePosition += BigInt(stream.codecpar.frameSize >> 0);
        }
        else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            stream.privData.granulePosition++;
        }
        return 0;
    }
    writeTrailer(formatContext) {
        formatContext.ioWriter.flush();
        return 0;
    }
    flush(formatContext) {
        formatContext.ioWriter.flush();
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/ogg/OggPage.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/ogg/OggPage.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OggPage: () => (/* binding */ OggPage),
/* harmony export */   OggsCommentPage: () => (/* binding */ OggsCommentPage)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
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
            const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(this.list[i]);
            ioWriter.writeUint32(buffer.length);
            ioWriter.writeBuffer(buffer);
        }
    }
    addComment(comment) {
        this.list.push(comment);
    }
}
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
     * - 0x04：表示该页为逻辑流的最后一页，eos 标识，如果此位未设置，那表示本页不是最后一页；
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
    pos;
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
        this.pos = BigInt(0);
    }
    async read(ioReader) {
        this.pos = ioReader.getPos();
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
        this.pos = ioWriter.getPos();
        ioWriter.writeString(this.capturePattern);
        ioWriter.writeUint8(this.streamStructureVersion);
        ioWriter.writeUint8(this.headerTypeFlag);
        ioWriter.writeUint64(this.granulePosition);
        ioWriter.writeUint32(this.serialNumber);
        ioWriter.writeUint32(this.pageSequenceNumber);
        ioWriter.writeUint32(this.crcCheckSum);
        if (this.payload) {
            this.numberPageSegments = Math.floor(this.payload.length / 255) + 1;
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
class OggsCommentPage {
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
        this.vendorString = "v0.0.1-18-g41e9e9f";
        this.vendorStringLength = this.vendorString.length;
        this.userCommentListLength = 0;
        this.comments = new UserComment();
    }
    read(ioReader) {
        this.vendorStringLength = ioReader.readUint32();
        this.vendorString = ioReader.readString(this.vendorStringLength);
        this.userCommentListLength = ioReader.readUint32();
        if (this.userCommentListLength) {
            this.comments.read(ioReader, this.userCommentListLength);
        }
    }
    write(ioWriter) {
        const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(this.vendorString);
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

/***/ "./src/avformat/formats/ogg/opus.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/ogg/opus.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OpusOggsCommentPage: () => (/* binding */ OpusOggsCommentPage),
/* harmony export */   OpusOggsIdPage: () => (/* binding */ OpusOggsIdPage)
/* harmony export */ });
/* harmony import */ var _OggPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OggPage */ "./src/avformat/formats/ogg/OggPage.ts");
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
        this.mapping = new Uint8Array(1);
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
        this.channelMappingFamily = codecpar.format;
    }
}
class OpusOggsCommentPage extends _OggPage__WEBPACK_IMPORTED_MODULE_0__.OggsCommentPage {
    constructor() {
        super();
        this.signature = 'OpusTags';
    }
    read(ioReader) {
        this.signature = ioReader.readString(8);
        super.read(ioReader);
    }
    write(ioWriter) {
        ioWriter.writeString(this.signature);
        super.write(ioWriter);
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
}


/***/ }),

/***/ "./src/avformat/formats/ogg/vorbis.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/ogg/vorbis.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VorbisOggsCommentPage: () => (/* binding */ VorbisOggsCommentPage),
/* harmony export */   VorbisOggsIdPage: () => (/* binding */ VorbisOggsIdPage)
/* harmony export */ });
/* harmony import */ var _OggPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OggPage */ "./src/avformat/formats/ogg/OggPage.ts");
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
    constructor(signature = 'vorbis') {
        this.signature = signature;
        this.version = 0;
        this.channels = 1;
        this.sampleRate = 48000;
        this.bitrateMaximum = 0;
        this.bitrateNominal = 0;
        this.bitrateMinimum = 0;
        this.blocksize0 = 2048;
        this.blocksize1 = 256;
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
class VorbisOggsCommentPage extends _OggPage__WEBPACK_IMPORTED_MODULE_0__.OggsCommentPage {
    /**
     * 8 bits packet_type
     */
    packetType;
    /**
     * 1 bit
     */
    framingFlag;
    constructor(signature = 'vorbis') {
        super();
        this.signature = signature;
        this.packetType = 0x01;
        this.framingFlag = 0x01;
    }
    read(ioReader) {
        this.packetType = ioReader.readUint8();
        this.signature = ioReader.readString(6);
        super.read(ioReader);
        if (this.signature === 'vorbis') {
            this.framingFlag = ioReader.readUint8();
        }
    }
    write(ioWriter) {
        ioWriter.writeUint8(this.packetType);
        ioWriter.writeString(this.signature);
        super.write(ioWriter);
        if (this.signature === 'vorbis') {
            ioWriter.writeUint8(this.framingFlag);
        }
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
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
    /**
     * 读取 8 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取 16 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
        if (this.remainingLength() < 3) {
            this.flush(3);
        }
        const high = this.readUint16();
        const low = this.readUint8();
        return this.littleEndian ? (low << 16 | high) : (high << 8 | low);
    }
    /**
     * 读取 24 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    peekUint24() {
        if (this.remainingLength() < 3) {
            this.flush(3);
        }
        const pointer = this.pointer;
        const pos = this.pos;
        const high = this.readUint16();
        const low = this.readUint8();
        const value = this.littleEndian ? (low << 16 | high) : (high << 8 | low);
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
    /**
     * 读取 32 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取 64 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取 8 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取 16 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    peekInt16() {
        if (this.remainingLength() < 2) {
            this.flush(2);
        }
        return this.data.getInt16(this.pointer, this.littleEndian);
    }
    /**
     * 读取 24 位有符号整数
     *
     * @returns
     */
    readInt24() {
        const value = this.readUint24();
        return (value & 0x800000) ? (value - 0x1000000) : value;
    }
    /**
     * 读取 24 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    peekInt24() {
        const value = this.peekUint24();
        return (value & 0x800000) ? (value - 0x1000000) : value;
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
    /**
     * 读取 32 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取 64 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取单精度浮点数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取双精度浮点数（不会移动读取指针位置）
     *
     * @returns
     */
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
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回（不会移动读取指针位置）
     *
     * @param length 默认 1
     * @returns
     */
    peekHex(length = 1) {
        if (length > this.size) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekHex, length too large', cheap__fileName__0, 412);
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
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekBuffer, length too large', cheap__fileName__0, 505);
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
     * 读取最多 length 字节的数据到指定 buffer，返回已写入的字节长度
     *
     * @param length
     * @param buffer
     * @returns
     */
    readToBuffer(length, buffer) {
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
                try {
                    this.flush();
                }
                catch (error) {
                    if (this.error === -1048576 /* IOError.END */ && index) {
                        return index;
                    }
                    else {
                        throw error;
                    }
                }
                const len = Math.min(this.endPointer - this.pointer, length);
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
            return index;
        }
        else {
            buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
            this.pointer += length;
            this.pos += BigInt(length);
            return length;
        }
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
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
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
    /**
     * 读取一行字符
     */
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
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekLine, out of buffer', cheap__fileName__0, 656);
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
    /**
     * 重新填充剩余缓冲区
     *
     * @param need
     * @returns
     */
    flush(need = 0) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, flush failed because of no flush callback', cheap__fileName__0, 720);
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
        this.error = 0;
    }
    /**
     *
     * seek 到指定位置
     *
     * @param pos
     * @param force false 时可以在目前的缓冲区内 seek，否则丢弃缓冲区内容重新填充指定位置的数据，默认 false
     * @param flush 指定 seek 之后是否马上填充数据，否则只 seek 到目标位置，默认 true
     * @returns
     */
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
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed because of no seek callback', cheap__fileName__0, 790);
        }
        this.pointer = this.endPointer = 0;
        this.pos = pos;
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed', cheap__fileName__0, 799);
        }
        if (flush) {
            this.flush();
        }
    }
    /**
     * 获取缓冲区
     */
    getBuffer() {
        return this.buffer;
    }
    /**
     * 写入数据到缓冲区
     *
     * @param buffer
     */
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
                _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('IOReader, call appendBuffer but the buffer\'s size is lagger then the remaining size', cheap__fileName__0, 838);
            }
        }
    }
    /**
     * 重置 reader
     */
    reset() {
        this.pointer = this.endPointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    /**
     * 设置读取是小端还是大端
     *
     * @param bigEndian
     */
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    /**
     * 获取源总字节长度
     *
     * @returns
     */
    fileSize() {
        if (this.fileSize_) {
            return this.fileSize_;
        }
        if (!this.onSize) {
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('IOReader error, fileSize failed because of no onSize callback', cheap__fileName__0, 871);
            return BigInt(0);
        }
        try {
            this.fileSize_ = this.onSize();
        }
        catch (error) {
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`IOReader error, call fileSize failed: ${error}`, cheap__fileName__0, 878);
            this.fileSize_ = BigInt(0);
        }
        return this.fileSize_;
    }
    /**
     * 获取缓冲区长度
     *
     * @returns
     */
    getBufferSize() {
        return this.size;
    }
    /**
     * 连接到 ioWriter
     *
     * @param ioWriter
     * @param length
     */
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OOggFormat_ts.avtranscoder.js.map