"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OOggsFormat_ts"],{

/***/ "./src/avformat/formats/OOggsFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/OOggsFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OOggFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _oggs_OggPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oggs/OggPage */ "./src/avformat/formats/oggs/OggPage.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
var cheap__fileName__1 = "src\\avformat\\formats\\OOggsFormat.ts";

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
    type = 3 /* AVFormat.OGGS */;
    checksumTable;
    headerPagesPayload;
    cacheWriter;
    page;
    constructor() {
        super();
        this.checksumTable = [];
        this.page = new _oggs_OggPage__WEBPACK_IMPORTED_MODULE_3__.OggPage();
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
                this.page.headerTypeFlag != 0x01;
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
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 187);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__1, 194);
            return;
        }
        this.writePage(stream, formatContext.ioWriter, (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_5__.getAVPacketData)(avpacket), 0);
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            stream.privData.granulePosition += BigInt(stream.codecpar.frameSize >>> 0);
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OOggsFormat_ts.avtranscoder.js.map