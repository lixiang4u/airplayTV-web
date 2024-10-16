"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OMp3Format_ts"],{

/***/ "./src/avformat/formats/OMp3Format.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OMp3Format.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMp3Format)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_bigint__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/bigint */ "./src/common/util/bigint.ts");
/* harmony import */ var _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mp3/frameHeader */ "./src/avformat/formats/mp3/frameHeader.ts");
/* harmony import */ var _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mp3/mp3 */ "./src/avformat/formats/mp3/mp3.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var _mp3_id3v2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mp3/id3v2 */ "./src/avformat/formats/mp3/id3v2.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\OMp3Format.ts";















const XING_NUM_BAGS = 400;
const defaultMp3FormatOptions = {
    id3v2Version: 4,
    hasID3v1: false,
    hasXing: true
};
class OMp3Format extends _OFormat__WEBPACK_IMPORTED_MODULE_1__["default"] {
    type = 11 /* AVFormat.MP3 */;
    options;
    context;
    xingWriter;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_13__.extend({}, defaultMp3FormatOptions, options);
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(true);
        this.context = {
            size: 0,
            frames: 0,
            seen: 0,
            want: 1,
            bag: [],
            pos: 0,
            initialBitrate: 0,
            hasVariableBitrate: false,
            padding: 0,
            delay: 0,
            frameHeader: new _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__.FrameHeader(),
            xingOffset: -1,
            xingFrameSize: 0,
            xingFrameOffset: BigInt(0),
            xingFramePos: BigInt(0),
            audioSize: 0,
            id3SizePos: BigInt(0)
        };
        this.xingWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_9__["default"](new Uint8Array(5000));
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
        });
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('can not found stream with mp3 codec', cheap__fileName__0, 125);
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        return 0;
    }
    writeXingTag(formatContext) {
        if (!this.options.hasXing) {
            return;
        }
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
        });
        let rateIdx = -1;
        let channels = 0;
        let bitrateIdx = -1;
        let bestBitrateIdx = -1;
        let bestBitrateError = BigInt(avutil_constant__WEBPACK_IMPORTED_MODULE_5__.INT32_MAX >>> 0);
        let ver = 0;
        let bytesNeeded = 0;
        const freqTab = [44100, 48000, 32000];
        for (let i = 0; i < freqTab.length; i++) {
            const freq = freqTab[i];
            if (stream.codecpar.sampleRate === freq) {
                // MPEG 1
                ver = 0x3;
            }
            else if (stream.codecpar.sampleRate === freq / 2) {
                // MPEG 2
                ver = 0x2;
            }
            else if (stream.codecpar.sampleRate === freq / 4) {
                // MPEG 2.5
                ver = 0x0;
            }
            else {
                continue;
            }
            rateIdx = i;
        }
        if (rateIdx === freqTab.length) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('unsupported sample rate, not writing Xing header.', cheap__fileName__0, 171);
            return;
        }
        switch (stream.codecpar.chLayout.nbChannels) {
            case 1:
                // MPA_MONO
                channels = 3;
                break;
            case 2:
                // MPA_STEREO
                channels = 0;
                break;
            default:
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('unsupported number of channels, not writing Xing header.', cheap__fileName__0, 185);
                return;
        }
        // sync
        let header = -16777216;
        // sync/audio-version/layer 3/no crc*/
        header |= (224 | ver << 3 | 2 | 0x1) << 16;
        header |= (rateIdx << 2) << 8;
        header |= channels << 6;
        for (bitrateIdx = 1; bitrateIdx < 15; bitrateIdx++) {
            let bitRate = BigInt(Math.floor(1000 * _codecs_mp3__WEBPACK_IMPORTED_MODULE_4__.getBitRateByVersionLayerIndex(ver, 2, bitrateIdx)));
            let error = common_util_bigint__WEBPACK_IMPORTED_MODULE_6__.abs(bitRate - stream.codecpar.bitRate);
            if (error < bestBitrateError) {
                bestBitrateError = error;
                bestBitrateIdx = bitrateIdx;
            }
        }
        for (bitrateIdx = bestBitrateIdx;; bitrateIdx++) {
            let mask = bitrateIdx << (12);
            if (15 == bitrateIdx) {
                return;
            }
            header |= mask;
            _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__.parse(this.context.frameHeader, header);
            const xingOffsetTable = [[0, 9, 17], [0, 0, 0], [0, 9, 17], [0, 17, 32]];
            this.context.xingOffset = xingOffsetTable[this.context.frameHeader.version][stream.codecpar.chLayout.nbChannels] + 4;
            bytesNeeded = this.context.xingOffset + _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.XING_SIZE;
            if (bytesNeeded <= _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__.getFrameLength(this.context.frameHeader, stream.codecpar.sampleRate)) {
                break;
            }
            header &= ~mask;
        }
        this.xingWriter.writeUint32(header);
        this.xingWriter.writeBuffer(new Uint8Array(this.context.xingOffset - 4).fill(0));
        this.xingWriter.writeString('Xing');
        // frames / size / TOC / vbr scale
        this.xingWriter.writeUint32(15);
        this.context.size = _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__.getFrameLength(this.context.frameHeader, stream.codecpar.sampleRate);
        this.context.want = 1;
        this.context.seen = 0;
        this.context.pos = 0;
        // frames
        this.xingWriter.writeUint32(0);
        // size
        this.xingWriter.writeUint32(0);
        for (let i = 0; i < _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.XING_TOC_COUNT; i++) {
            this.xingWriter.writeUint8((255 * i / _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.XING_TOC_COUNT) >>> 0);
        }
        // vbr quality
        // we write it, because some (broken) tools always expect it to be present
        this.xingWriter.writeUint32(0);
        const metadata = stream.metadata;
        if (metadata?.encoder) {
            const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_12__.encode(metadata.encoder);
            this.xingWriter.writeBuffer(buffer.subarray(0, 9));
        }
        else {
            this.xingWriter.writeString('Lavf');
            this.xingWriter.writeBuffer(new Uint8Array(5).fill(0));
        }
        // tag revision 0 / unknown vbr method
        this.xingWriter.writeUint8(0);
        // unknown lowpass filter value
        this.xingWriter.writeUint8(0);
        // empty replaygain fields
        this.xingWriter.writeBuffer(new Uint8Array(8).fill(0));
        // unknown encoding flags
        this.xingWriter.writeUint8(0);
        // unknown abr/minimal bitrate
        this.xingWriter.writeUint8(0);
        // empty encoder delay/padding
        this.xingWriter.writeUint24(0);
        // misc
        this.xingWriter.writeUint8(0);
        // mp3gain
        this.xingWriter.writeUint8(0);
        // preset
        this.xingWriter.writeUint16(0);
        // music length
        this.xingWriter.writeUint32(0);
        // music crc
        this.xingWriter.writeUint16(0);
        // tag crc
        this.xingWriter.writeUint16(0);
        this.xingWriter.writeBuffer(new Uint8Array(this.context.size - bytesNeeded).fill(0));
        this.context.xingFrameSize = this.xingWriter.getPos();
        this.context.xingFrameOffset = formatContext.ioWriter.getPos();
        formatContext.ioWriter.writeBuffer(this.xingWriter.getWroteBuffer());
        this.context.audioSize = this.context.xingFrameSize;
    }
    xingAddFrame(avpacket) {
        this.context.frames++;
        this.context.seen++;
        this.context.size += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        if (this.context.want === this.context.seen) {
            this.context.bag[this.context.pos] = this.context.size;
            if (++this.context.pos === XING_NUM_BAGS) {
                /* shrink table to half size by throwing away each second bag. */
                for (let i = 1; i < XING_NUM_BAGS; i += 2) {
                    this.context.bag[i >> 1] = this.context.bag[i];
                }
                /* double wanted amount per bag. */
                this.context.want *= 2;
                /* adjust current position to half of table size. */
                this.context.pos = XING_NUM_BAGS >> 1;
            }
            this.context.seen = 0;
        }
    }
    updateXing(formatContext) {
        if (this.context.hasVariableBitrate) {
            this.xingWriter.seek(this.context.xingOffset);
            this.xingWriter.writeString('Info');
        }
        this.xingWriter.seek(this.context.xingOffset + 8);
        this.xingWriter.writeUint32(this.context.frames);
        this.xingWriter.writeUint32(this.context.size);
        this.xingWriter.seek(this.context.xingFrameSize);
        const toc = this.xingWriter.getWroteBuffer().subarray(this.context.xingOffset + 16);
        toc[0] = 0;
        for (let i = 1; i < _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.XING_TOC_COUNT; i++) {
            let j = (i * this.context.pos / _mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.XING_TOC_COUNT) >>> 0;
            const seekPoint = (256 * this.context.bag[j] / this.context.size) >>> 0;
            toc[i] = Math.min(seekPoint, 255);
        }
        const now = formatContext.ioWriter.getPos();
        formatContext.ioWriter.seek(this.context.xingFrameOffset);
        formatContext.ioWriter.writeBuffer(this.xingWriter.getWroteBuffer());
        formatContext.ioWriter.seek(now);
    }
    writeHeader(formatContext) {
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
        });
        if (this.options.id3v2Version) {
            _mp3_id3v2__WEBPACK_IMPORTED_MODULE_10__.write(formatContext.ioWriter, this.options.id3v2Version, formatContext.metadataHeaderPadding, stream.metadata);
        }
        if (this.options.hasXing) {
            this.writeXingTag(formatContext);
        }
        return 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 368);
            return;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 375);
            return;
        }
        if (stream.codecpar.codecId !== 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`packet\'s codecId is not mp3: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 380);
            return;
        }
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28) > 4) {
            _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_7__.parse(this.context.frameHeader, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[8](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24)));
            const bitRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_4__.getBitRateByVersionLayerIndex(this.context.frameHeader.version, this.context.frameHeader.layer, this.context.frameHeader.bitrateIndex);
            if (!this.context.initialBitrate) {
                this.context.initialBitrate = bitRate;
            }
            else if (bitRate !== this.context.initialBitrate) {
                this.context.hasVariableBitrate = true;
            }
            this.xingAddFrame(avpacket);
            formatContext.ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_11__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        }
        return 0;
    }
    writeTrailer(formatContext) {
        if (this.options.hasID3v1) {
            const stream = formatContext.streams.find((stream) => {
                return stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
            });
            const metadata = stream.metadata;
            const id1Buffer = new Uint8Array(_mp3_mp3__WEBPACK_IMPORTED_MODULE_8__.ID3V1_SIZE);
            const id1Writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_9__["default"](id1Buffer);
            id1Writer.writeString('TAG');
            function writeText(str) {
                const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_12__.encode(str);
                id1Writer.writeBuffer(buffer.subarray(0, 30));
                if (buffer.length < 30) {
                    id1Writer.skip(30 - buffer.length);
                }
            }
            if (metadata.title) {
                writeText(metadata.title);
            }
            else {
                id1Writer.skip(30);
            }
            if (metadata.artist) {
                writeText(metadata.artist);
            }
            else {
                id1Writer.skip(30);
            }
            if (metadata.album) {
                writeText(metadata.album);
            }
            else {
                id1Writer.skip(30);
            }
            id1Buffer[127] = 0xff;
            if (metadata.genre) {
                id1Buffer[127] = +metadata.genre;
            }
            formatContext.ioWriter.writeBuffer(id1Buffer);
        }
        if (this.options.hasXing) {
            this.updateXing(formatContext);
        }
        formatContext.ioWriter.flush();
        return 0;
    }
    flush(formatContext) {
        formatContext.ioWriter.flush();
        return 0;
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


/***/ }),

/***/ "./src/common/util/bigint.ts":
/*!***********************************!*\
  !*** ./src/common/util/bigint.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abs: () => (/* binding */ abs),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min)
/* harmony export */ });
function abs(a) {
    return a > 0 ? a : -a;
}
function max(a, b) {
    return a > b ? a : b;
}
function min(a, b) {
    return a > b ? b : a;
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OMp3Format_ts.avtranscoder.js.map