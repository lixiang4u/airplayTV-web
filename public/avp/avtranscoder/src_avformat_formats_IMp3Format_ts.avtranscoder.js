"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IMp3Format_ts"],{

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

/***/ "./src/avformat/formats/IMp3Format.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IMp3Format.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMp3Format)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _mp3_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mp3/mp3 */ "./src/avformat/formats/mp3/mp3.ts");
/* harmony import */ var common_util_bigint__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! common/util/bigint */ "./src/common/util/bigint.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _mp3_id3v2__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mp3/id3v2 */ "./src/avformat/formats/mp3/id3v2.ts");
/* harmony import */ var _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mp3/frameHeader */ "./src/avformat/formats/mp3/frameHeader.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IMp3Format.ts";





















class IMp3Format extends _IFormat__WEBPACK_IMPORTED_MODULE_7__["default"] {
    type = 11 /* AVFormat.MP3 */;
    context;
    constructor() {
        super();
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
        this.context = {
            firstFramePos: avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT,
            isVBR: false,
            hasID3v1: false,
            id3v2: {
                version: avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE,
                revision: avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE,
                flags: avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE
            },
            fileSize: BigInt(0)
        };
    }
    async readHeader(formatContext) {
        const stream = formatContext.createStream();
        stream.codecpar.codecId = 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
        stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        stream.startTime = BigInt(0);
        stream.firstDTS = BigInt(0);
        const mp3Context = {
            frameHeader: new _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.FrameHeader(),
            nbFrame: BigInt(0),
            tocIndexes: [],
            nextDTS: BigInt(0),
            frameLength: 0
        };
        stream.privData = mp3Context;
        const metadata = stream.metadata = {};
        const fileSize = await formatContext.ioReader.fileSize();
        if (formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */) {
            if (fileSize > _mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.ID3V1_SIZE) {
                await formatContext.ioReader.seek(fileSize - BigInt(_mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.ID3V1_SIZE));
                const isID3V1 = (await formatContext.ioReader.readString(3)) === 'TAG';
                if (isID3V1) {
                    let buffer = await formatContext.ioReader.readBuffer(30);
                    metadata.title = common_util_text__WEBPACK_IMPORTED_MODULE_11__.decode(buffer).replace(/\s/g, '');
                    buffer = await formatContext.ioReader.readBuffer(30);
                    metadata.artist = common_util_text__WEBPACK_IMPORTED_MODULE_11__.decode(buffer).replace(/\s/g, '');
                    buffer = await formatContext.ioReader.readBuffer(30);
                    metadata.album = common_util_text__WEBPACK_IMPORTED_MODULE_11__.decode(buffer).replace(/\s/g, '');
                    buffer = await formatContext.ioReader.readBuffer(4);
                    metadata.date = common_util_text__WEBPACK_IMPORTED_MODULE_11__.decode(buffer).replace(/\s/g, '');
                    buffer = await formatContext.ioReader.readBuffer(30);
                    metadata.comment = common_util_text__WEBPACK_IMPORTED_MODULE_11__.decode(buffer).replace(/\s/g, '');
                    if (buffer[28] === 0 && buffer[29] !== 0) {
                        metadata.track = buffer[29] + '';
                    }
                    metadata.genre = await formatContext.ioReader.readUint8();
                    this.context.hasID3v1 = true;
                }
            }
        }
        await formatContext.ioReader.seek(BigInt(0));
        const hasID3 = (await formatContext.ioReader.peekString(3)) === 'ID3';
        if (hasID3) {
            await formatContext.ioReader.skip(3);
            this.context.id3v2.version = await formatContext.ioReader.readUint8();
            this.context.id3v2.revision = await formatContext.ioReader.readUint8();
            this.context.id3v2.flags = await formatContext.ioReader.readUint8();
            const len = (((await formatContext.ioReader.readUint8()) & 0x7F) << 21)
                | (((await formatContext.ioReader.readUint8()) & 0x7F) << 14)
                | (((await formatContext.ioReader.readUint8()) & 0x7F) << 7)
                | ((await formatContext.ioReader.readUint8()) & 0x7F);
            await _mp3_id3v2__WEBPACK_IMPORTED_MODULE_17__.parse(formatContext.ioReader, len, this.context.id3v2, metadata);
        }
        this.context.firstFramePos = formatContext.ioReader.getPos();
        while (true) {
            const word = await formatContext.ioReader.peekUint16();
            if ((word & 0xffe0) === 0xffe0) {
                break;
            }
            await formatContext.ioReader.skip(1);
        }
        if (this.context.firstFramePos !== formatContext.ioReader.getPos()) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`skipping ${formatContext.ioReader.getPos() - this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`, cheap__fileName__0, 170);
            this.context.firstFramePos = formatContext.ioReader.getPos();
        }
        stream.codecpar.extradataSize = 4;
        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(stream.codecpar.extradataSize);
        await formatContext.ioReader.peekBuffer(stream.codecpar.extradataSize, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
        _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.parse(mp3Context.frameHeader, await formatContext.ioReader.readUint32());
        stream.codecpar.profile = _codecs_mp3__WEBPACK_IMPORTED_MODULE_12__.getProfileByLayer(mp3Context.frameHeader.layer);
        stream.codecpar.frameSize = _codecs_mp3__WEBPACK_IMPORTED_MODULE_12__.getFrameSizeByVersionLayer(mp3Context.frameHeader.version, mp3Context.frameHeader.layer);
        stream.codecpar.sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_12__.getSampleRateByVersionIndex(mp3Context.frameHeader.version, mp3Context.frameHeader.samplingFrequency);
        stream.timeBase.num = 1;
        stream.timeBase.den = stream.codecpar.sampleRate;
        const channels = mp3Context.frameHeader.mode === 3 ? 1 : 2;
        stream.codecpar.chLayout.nbChannels = channels;
        const bitRate = BigInt(Math.floor(_codecs_mp3__WEBPACK_IMPORTED_MODULE_12__.getBitRateByVersionLayerIndex(mp3Context.frameHeader.version, mp3Context.frameHeader.layer, mp3Context.frameHeader.bitrateIndex)));
        const frameLength = _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate);
        const pos = formatContext.ioReader.getPos();
        const xingOffsetTable = [[0, 9, 17], [0, 0, 0], [0, 9, 17], [0, 17, 32]];
        await formatContext.ioReader.skip(xingOffsetTable[mp3Context.frameHeader.version][stream.codecpar.chLayout.nbChannels]);
        const tag = await formatContext.ioReader.readString(4);
        if (tag === 'Xing' || tag === 'Info') {
            this.context.isVBR = true;
            const flags = await formatContext.ioReader.readUint32();
            if (flags & 1 /* XingFlag.FRAMES */) {
                mp3Context.nbFrame = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
            }
            if (flags & 2 /* XingFlag.SIZE */) {
                this.context.fileSize = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
            }
            const fSize = fileSize >= pos ? fileSize - pos : BigInt(0);
            if (fSize && this.context.fileSize) {
                const min = common_util_bigint__WEBPACK_IMPORTED_MODULE_15__.min(fSize, this.context.fileSize);
                const delta = common_util_bigint__WEBPACK_IMPORTED_MODULE_15__.max(fSize, this.context.fileSize) - min;
                if (fSize > this.context.fileSize && delta > min >> BigInt(4)) {
                    mp3Context.nbFrame = BigInt(0);
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn('invalid concatenated file detected - using bitrate for duration', cheap__fileName__0, 223);
                }
                else if (delta > min >> BigInt(4)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn('filesize and duration do not match (growing file?)', cheap__fileName__0, 226);
                }
            }
            stream.duration = (mp3Context.nbFrame * BigInt(stream.codecpar.frameSize >>> 0));
            if (flags & 4 /* XingFlag.TOC */) {
                for (let i = 0; i < _mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.XING_TOC_COUNT; i++) {
                    const b = await formatContext.ioReader.readUint8();
                    const pos = this.context.fileSize * BigInt(Math.floor(b)) / BigInt(256);
                    const dts = stream.duration / BigInt(_mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.XING_TOC_COUNT) * BigInt(Math.floor(i));
                    const sample = {
                        dts,
                        pos,
                    };
                    mp3Context.tocIndexes.push(sample);
                }
            }
            if (flags & 8 /* XingFlag.QSCALE */) {
                await formatContext.ioReader.skip(4);
            }
            metadata.encoder = await formatContext.ioReader.readString(9);
            this.context.firstFramePos += BigInt(Math.floor(frameLength));
        }
        else {
            await formatContext.ioReader.seek(pos);
            const tag = await formatContext.ioReader.readString(4);
            if (tag === 'VBRI') {
                // check tag version
                if ((await formatContext.ioReader.readUint16()) === 1) {
                    // skip delay and quality
                    await formatContext.ioReader.skip(4);
                    this.context.fileSize = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                    mp3Context.nbFrame = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                    stream.duration = (mp3Context.nbFrame * BigInt(stream.codecpar.frameSize >>> 0));
                }
                this.context.firstFramePos += BigInt(Math.floor(frameLength));
            }
            else {
                this.context.isVBR = false;
                stream.codecpar.bitRate = bitRate * BigInt(1000);
                mp3Context.nbFrame = (fileSize - this.context.firstFramePos - BigInt(_mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.ID3V1_SIZE)) / BigInt(Math.floor(frameLength));
                stream.duration = (mp3Context.nbFrame * BigInt(stream.codecpar.frameSize >>> 0));
                mp3Context.frameLength = frameLength;
                this.context.fileSize = fileSize;
            }
        }
        await formatContext.ioReader.seek(this.context.firstFramePos);
        while (true) {
            const word = await formatContext.ioReader.peekUint16();
            if ((word & 0xffe0) === 0xffe0) {
                break;
            }
            await formatContext.ioReader.skip(1);
        }
        if (this.context.firstFramePos !== formatContext.ioReader.getPos()) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_6__.warn(`skipping ${formatContext.ioReader.getPos() - this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`, cheap__fileName__0, 286);
            this.context.firstFramePos = formatContext.ioReader.getPos();
        }
        if (mp3Context.tocIndexes.length) {
            for (let i = 0; i < _mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.XING_TOC_COUNT; i++) {
                mp3Context.tocIndexes[i].pos += this.context.firstFramePos;
            }
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        const stream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        const mp3Context = stream.privData;
        const pos = formatContext.ioReader.getPos();
        if (this.context.hasID3v1 && (pos >= this.context.fileSize - BigInt(_mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.ID3V1_SIZE))) {
            return -1048576 /* IOError.END */;
        }
        try {
            _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.parse(mp3Context.frameHeader, await formatContext.ioReader.peekUint32());
            let frameLength = this.context.isVBR ? _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate) : mp3Context.frameLength;
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 28, frameLength);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 56, pos);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(avpacket + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 48, BigInt(stream.codecpar.frameSize >>> 0));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, mp3Context.nextDTS), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 8, mp3Context.nextDTS);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            mp3Context.nextDTS += BigInt(stream.codecpar.frameSize >>> 0);
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(frameLength);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, frameLength);
            await formatContext.ioReader.readBuffer(frameLength, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(data, frameLength));
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.error(error.message, cheap__fileName__0, 333);
            }
            return formatContext.ioReader.error;
        }
    }
    async syncToFrame(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        const stream = formatContext.getStreamByMediaType(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        const mp3Context = stream.privData;
        while (true) {
            try {
                const word = await formatContext.ioReader.peekUint16();
                if ((word & 0xffe0) === 0xffe0) {
                    pos = formatContext.ioReader.getPos();
                    _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.parse(mp3Context.frameHeader, await formatContext.ioReader.peekUint32());
                    let frameLength = this.context.isVBR
                        ? _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate)
                        : mp3Context.frameLength;
                    if (frameLength > 512000) {
                        await formatContext.ioReader.skip(1);
                        continue;
                    }
                    await formatContext.ioReader.skip(frameLength);
                    let count = 0;
                    while (count <= analyzeCount) {
                        const word = await formatContext.ioReader.peekUint16();
                        if ((word & 0xffe0) === 0xffe0) {
                            _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.parse(mp3Context.frameHeader, await formatContext.ioReader.peekUint32());
                            let frameLength = this.context.isVBR
                                ? _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate)
                                : mp3Context.frameLength;
                            await formatContext.ioReader.skip(frameLength);
                            count++;
                        }
                        else {
                            break;
                        }
                    }
                    if (count < analyzeCount) {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        pos = avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT;
                    }
                    else {
                        break;
                    }
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_10__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        const mp3Context = stream.privData;
        if (stream.sampleIndexes.length) {
            let index = common_util_array__WEBPACK_IMPORTED_MODULE_16__.binarySearch(stream.sampleIndexes, (item) => {
                if (item.pts > timestamp) {
                    return -1;
                }
                return 1;
            });
            if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_10__.AV_MILLI_TIME_BASE_Q) < BigInt(10000)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 416);
                await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                mp3Context.nextDTS = stream.sampleIndexes[index - 1].dts;
                return now;
            }
        }
        if (timestamp === BigInt(0)) {
            await formatContext.ioReader.seek(this.context.firstFramePos);
            return now;
        }
        if (this.context.isVBR) {
            if (mp3Context.tocIndexes.length) {
                const sample = mp3Context.tocIndexes[(Number(timestamp / (stream.duration / BigInt(_mp3_mp3__WEBPACK_IMPORTED_MODULE_14__.XING_TOC_COUNT)) & 0xffffffffn) >> 0)];
                if (sample) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.debug(`seek in xing toc indexes, pts: ${sample.dts}, pos: ${sample.pos}`, cheap__fileName__0, 432);
                    await formatContext.ioReader.seek(sample.pos);
                    mp3Context.nextDTS = sample.dts;
                }
                else {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_6__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 437);
                    const frameLength = _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate);
                    const frame = timestamp / BigInt(stream.codecpar.frameSize >>> 0);
                    const pos = frame * BigInt(Math.floor(frameLength)) + this.context.firstFramePos;
                    mp3Context.nextDTS = frame * BigInt(stream.codecpar.frameSize >>> 0);
                    await formatContext.ioReader.seek(pos);
                }
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_6__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 446);
                const frameLength = _mp3_frameHeader__WEBPACK_IMPORTED_MODULE_18__.getFrameLength(mp3Context.frameHeader, stream.codecpar.sampleRate);
                const frame = timestamp / BigInt(stream.codecpar.frameSize >>> 0);
                const pos = frame * BigInt(Math.floor(frameLength)) + this.context.firstFramePos;
                mp3Context.nextDTS = frame * BigInt(stream.codecpar.frameSize >>> 0);
                await formatContext.ioReader.seek(pos);
            }
        }
        else {
            const frame = timestamp / BigInt(stream.codecpar.frameSize >>> 0);
            const pos = frame * BigInt(mp3Context.frameLength >>> 0) + this.context.firstFramePos;
            mp3Context.nextDTS = frame * BigInt(stream.codecpar.frameSize >>> 0);
            await formatContext.ioReader.seek(pos);
        }
        await this.syncToFrame(formatContext);
        return now;
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
//# sourceMappingURL=src_avformat_formats_IMp3Format_ts.avtranscoder.js.map