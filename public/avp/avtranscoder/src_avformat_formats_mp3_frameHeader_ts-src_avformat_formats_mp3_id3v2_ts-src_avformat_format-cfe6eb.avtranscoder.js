"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_mp3_frameHeader_ts-src_avformat_formats_mp3_id3v2_ts-src_avformat_format-cfe6eb"],{

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

/***/ "./src/avformat/formats/mp3/id3v2.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/mp3/id3v2.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   write: () => (/* binding */ write)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\mp3\\id3v2.ts";


// @ts-ignore
async function getSize(ioReader, len) {
    let v = 0;
    while (len--) {
        v = (v << 7) + ((await ioReader.readUint8()) & 0x7F);
    }
    return v;
}
function putSize(ioWriter, size) {
    ioWriter.writeUint8(size >> 21 & 0x7f);
    ioWriter.writeUint8(size >> 14 & 0x7f);
    ioWriter.writeUint8(size >> 7 & 0x7f);
    ioWriter.writeUint8(size & 0x7f);
}
function decodeString(encoding, buffer) {
    let label = 'utf-8';
    if (encoding === 0 /* ID3v2Encoding.ISO8859 */) {
        label = 'iso-8859-1';
    }
    else if (encoding === 1 /* ID3v2Encoding.UTF16BOM */) {
        label = 'utf-16';
    }
    else if (encoding === 2 /* ID3v2Encoding.UTF16BE */) {
        label = 'utf-16be';
    }
    const decoder = new TextDecoder(label);
    return decoder.decode(buffer);
}
// @ts-ignore
async function parse(ioReader, len, id3v2, metadata) {
    const isV34 = id3v2.version !== 2;
    const tagHeaderLen = isV34 ? 10 : 6;
    let end = ioReader.getPos() + BigInt(len >>> 0);
    async function error() {
        await ioReader.seek(end);
    }
    if (isV34 && (id3v2.flags & 0x40)) {
        let extLen = await getSize(ioReader, 4);
        if (id3v2.version === 4) {
            // in v2.4 the length includes the length field we just read.
            extLen -= 4;
        }
        if (extLen < 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('invalid extended header length', cheap__fileName__0, 92);
            return await error();
        }
        await ioReader.skip(extLen);
        len -= extLen + 4;
        if (len < 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('extended header too long', cheap__fileName__0, 98);
            await ioReader.seek(end);
            return await error();
        }
    }
    while (len > tagHeaderLen) {
        let type;
        let size;
        if (isV34) {
            type = await ioReader.readString(4);
            size = await ioReader.readUint32();
            if (!size) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('invalid frame size', cheap__fileName__0, 112);
                break;
            }
            // flags
            await ioReader.readUint16();
        }
        else {
            type = await ioReader.readString(3);
            size = await ioReader.readUint24();
        }
        if (type === 'APIC') {
            metadata.poster = await ioReader.readBuffer(size);
        }
        else if (type === 'USLT') {
            const encoding = await ioReader.readUint8();
            const language = await ioReader.readString(3);
            const buffer = await ioReader.readBuffer(size - 4);
            metadata.lyrics = `${language} ${decodeString(encoding, buffer)}`;
        }
        else if (type === 'COMM' || type === 'COM') {
            const encoding = await ioReader.readUint8();
            const language = await ioReader.readString(3);
            const buffer = await ioReader.readBuffer(size - 4);
            metadata.comment = `${language} ${decodeString(encoding, buffer)}`;
        }
        else {
            let content;
            if (type[0] === 'T') {
                const encoding = await ioReader.readUint8();
                const buffer = await ioReader.readBuffer(size - 1);
                content = decodeString(encoding, buffer);
            }
            else {
                // @ts-ignore
                content = await ioReader.readBuffer(size);
            }
            switch (type) {
                case 'TIT2':
                case 'TT2':
                    metadata.title = content;
                    break;
                case 'TPE1':
                case 'TP1':
                    metadata.artist = content;
                    break;
                case 'TPE2':
                case 'TP2':
                    metadata.albumArtist = content;
                    break;
                case 'TPOS':
                    metadata.disc = content;
                    break;
                case 'TCOP':
                    metadata.copyright = content;
                    break;
                case 'TALB':
                case 'TAL':
                    metadata.album = content;
                    break;
                case 'TRCK':
                case 'TRK':
                    metadata.track = content;
                    break;
                case 'TYER':
                case 'TDRL':
                case 'TDRC':
                    metadata.date = content;
                    break;
                case 'COMM':
                case 'COM':
                    metadata.comment = content;
                    break;
                case 'TCON':
                case 'TCO':
                    metadata.genre = content;
                    break;
                case 'TSSE':
                case 'TEN':
                    metadata.encoder = content;
                    break;
                case 'TCOM':
                    metadata.composer = content;
                    break;
                case 'TENC':
                    metadata.encodedBy = content;
                    break;
                case 'TLAN':
                    metadata.language = content;
                    break;
                case 'TPE3':
                case 'TP3':
                    metadata.performer = content;
                    break;
                case 'TPUB':
                    metadata.publisher = content;
                    break;
                case 'TCMP':
                case 'TCP':
                    metadata.compilation = content;
                    break;
                case 'TDEN':
                    metadata.creationTime = content;
                    break;
                case 'TSOA':
                    metadata.albumSort = content;
                    break;
                case 'TSOP':
                    metadata.artistSort = content;
                    break;
                case 'TSOT':
                    metadata.titleSort = content;
                    break;
                case 'TIT1':
                    metadata.grouping = content;
                    break;
                default:
                    metadata[type] = content;
                    break;
            }
        }
        len -= size + tagHeaderLen;
    }
    // footer preset, always 10 bytes, skip over it
    if (id3v2.version == 4 && id3v2.flags & 0x10) {
        end += BigInt(10);
    }
    await ioReader.seek(end);
}
function write(ioWriter, version, padding, metadata) {
    let now = ioWriter.getPos();
    ioWriter.writeString('ID3');
    ioWriter.writeUint8(version);
    ioWriter.writeUint16(0);
    const sizePos = ioWriter.getPos();
    ioWriter.writeUint32(0);
    const enc = 3 /* ID3v2Encoding.UTF8 */;
    function writeText(key, str) {
        const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(str);
        ioWriter.writeString(key);
        ioWriter.writeUint32(buffer.length + 1);
        // flags
        ioWriter.writeUint16(0);
        ioWriter.writeUint8(enc);
        ioWriter.writeBuffer(buffer);
    }
    function writeBuffer(key, buffer) {
        ioWriter.writeString(key);
        ioWriter.writeUint32(buffer.length);
        // flags
        ioWriter.writeUint16(0);
        ioWriter.writeBuffer(buffer);
    }
    if (metadata.poster) {
        writeBuffer('APIC', metadata.poster);
    }
    if (metadata.title) {
        writeText('TIT2', metadata.title);
    }
    if (metadata.artist) {
        writeText('TPE1', metadata.artist);
    }
    if (metadata.albumArtist) {
        writeText('TPE2', metadata.albumArtist);
    }
    if (metadata.disc) {
        writeText('TPOS', metadata.disc);
    }
    if (metadata.copyright) {
        writeText('TCOP', metadata.copyright);
    }
    if (metadata.album) {
        writeText('TALB', metadata.album);
    }
    if (metadata.track) {
        writeText('TRCK', metadata.track);
    }
    if (metadata.date) {
        writeText('TDRC', metadata.date);
    }
    if (metadata.comment) {
        let comment = metadata.comment;
        if (comment[3] === ' ') {
            comment = comment.slice(0, 3) + comment.slice(4);
        }
        writeText('COMM', comment);
    }
    if (metadata.lyrics) {
        let lyrics = metadata.lyrics;
        if (lyrics[3] === ' ') {
            lyrics = lyrics.slice(0, 3) + lyrics.slice(4);
        }
        writeText('USLT', lyrics);
    }
    if (metadata.genre) {
        writeText('TCON', metadata.genre + '');
    }
    if (metadata.encoder) {
        writeText('TSSE', metadata.encoder);
    }
    if (metadata.composer) {
        writeText('TCOM', metadata.composer);
    }
    if (metadata.encodedBy) {
        writeText('TENC', metadata.encodedBy);
    }
    if (metadata.language) {
        writeText('TLAN', metadata.language);
    }
    if (metadata.performer) {
        writeText('TPE3', metadata.performer);
    }
    if (metadata.publisher) {
        writeText('TPUB', metadata.publisher);
    }
    if (metadata.compilation) {
        writeText('TCMP', metadata.compilation);
    }
    if (metadata.creationTime) {
        writeText('TDEN', metadata.creationTime);
    }
    if (metadata.albumSort) {
        writeText('TSOA', metadata.albumSort);
    }
    if (metadata.artistSort) {
        writeText('TSOP', metadata.artistSort);
    }
    if (metadata.titleSort) {
        writeText('TSOT', metadata.titleSort);
    }
    if (metadata.grouping) {
        writeText('TIT1', metadata.grouping);
    }
    if (padding < 10) {
        padding = 10;
    }
    const len = (Number(ioWriter.getPos() - now & 0xffffffffn) >> 0);
    if (padding > 268435455 - len) {
        padding = 268435455 - len;
    }
    ioWriter.writeBuffer(new Uint8Array(padding).fill(0));
    now = ioWriter.getPos();
    ioWriter.seek(sizePos);
    putSize(ioWriter, len);
    ioWriter.seek(now);
}


/***/ }),

/***/ "./src/avformat/formats/mp3/mp3.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/mp3/mp3.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ID3V1_SIZE: () => (/* binding */ ID3V1_SIZE),
/* harmony export */   XING_SIZE: () => (/* binding */ XING_SIZE),
/* harmony export */   XING_TOC_COUNT: () => (/* binding */ XING_TOC_COUNT)
/* harmony export */ });
/*
 * libmedia mp3 utils
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
const XING_TOC_COUNT = 100;
const ID3V1_SIZE = 128;
const XING_SIZE = 156;


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_mp3_frameHeader_ts-src_avformat_formats_mp3_id3v2_ts-src_avformat_format-cfe6eb.avtranscoder.js.map