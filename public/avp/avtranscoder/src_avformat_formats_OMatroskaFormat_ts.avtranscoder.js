"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OMatroskaFormat_ts"],{

/***/ "./src/avformat/formats/OMatroskaFormat.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/OMatroskaFormat.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMatroskaFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./matroska/omatroska */ "./src/avformat/formats/matroska/omatroska.ts");
/* harmony import */ var _matroska_matroska__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./matroska/matroska */ "./src/avformat/formats/matroska/matroska.ts");
/* harmony import */ var avutil_util_crypto__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/crypto */ "./src/avutil/util/crypto.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_pixel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/util/pixel */ "./src/avutil/util/pixel.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_string__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! common/util/string */ "./src/common/util/string.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
var cheap__fileName__6 = "src\\avformat\\formats\\OMatroskaFormat.ts";

















const defaultOMatroskaFormatOptions = {
    isLive: false,
    docType: 'matroska'
};
function formatTimestamp(milliseconds) {
    const hours = milliseconds / BigInt(3600000);
    const remainingMilliseconds = milliseconds % BigInt(3600000);
    const minutes = remainingMilliseconds / BigInt(60000);
    const remainingMillisecondsAfterMinutes = remainingMilliseconds % BigInt(60000);
    const seconds = remainingMillisecondsAfterMinutes / BigInt(1000);
    const ms = remainingMillisecondsAfterMinutes % BigInt(1000);
    return common_util_string__WEBPACK_IMPORTED_MODULE_15__.format('%02d:%02d:%02d.%03d000000\x00\x00', Number(BigInt.asIntN(32, hours)), Number(BigInt.asIntN(32, minutes)), Number(BigInt.asIntN(32, seconds)), Number(BigInt.asIntN(32, ms)));
}
class OMatroskaFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_3__["default"] {
    type = 6 /* AVFormat.MATROSKA */;
    options;
    context;
    random;
    randomView;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_7__.extend({}, defaultOMatroskaFormatOptions, options);
        this.random = new Uint8Array(8);
        this.randomView = new DataView(this.random.buffer);
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(false);
        const context = {
            isLive: this.options.isLive,
            segmentStart: -BigInt(1),
            seekHeadEnd: -BigInt(1),
            header: {
                version: 1,
                readVersion: 1,
                maxIdLength: 4,
                maxSizeLength: 8,
                docType: this.options.docType,
                docTypeVersion: 4,
                docTypeReadVersion: 2
            },
            seekHead: {
                entry: []
            },
            info: {
                muxingApp: "v0.0.1-18-g41e9e9f",
                writingApp: "v0.0.1-18-g41e9e9f",
                timestampScale: 1000000,
                duration: 0,
                segmentUUID: -BigInt(1)
            },
            tracks: {
                entry: []
            },
            attachments: {
                entry: []
            },
            chapters: {
                entry: []
            },
            cues: {
                entry: []
            },
            tags: {
                entry: [
                    {
                        tag: {
                            name: 'ENCODER',
                            string: "v0.0.1-18-g41e9e9f"
                        }
                    }
                ]
            },
            elePositionInfos: [],
            eleCaches: [],
            eleWriter: new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_8__["default"](),
            currentCluster: {
                timeCode: -BigInt(1),
                pos: -BigInt(1)
            },
            hasVideo: false
        };
        if (context.header.docType === 'webm') {
            context.header.docTypeVersion = 2;
            context.header.docTypeReadVersion = 2;
        }
        context.eleWriter.onFlush = (data) => {
            context.eleCaches.push(data.slice());
            return 0;
        };
        avutil_util_crypto__WEBPACK_IMPORTED_MODULE_11__.random(this.random);
        context.info.segmentUUID = this.randomView.getBigUint64(0);
        formatContext.privateData = this.context = context;
        const tag2CodecId = this.context.header.docType === 'webm' ? _matroska_matroska__WEBPACK_IMPORTED_MODULE_10__.WebmTag2CodecId : _matroska_matroska__WEBPACK_IMPORTED_MODULE_10__.MkvTag2CodecId;
        function codecId2Tag(codecpar) {
            let tag = '';
            common_util_object__WEBPACK_IMPORTED_MODULE_7__.each(tag2CodecId, (id, t) => {
                if (id === codecpar.codecId) {
                    tag = t;
                }
            });
            if (codecpar.codecId === 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */
                || codecpar.codecId === 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */) {
                tag = 'A_PCM/FLOAT/IEEE';
            }
            if (codecpar.codecId === 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */
                || codecpar.codecId === 65549 /* AVCodecID.AV_CODEC_ID_PCM_S24BE */
                || codecpar.codecId === 65545 /* AVCodecID.AV_CODEC_ID_PCM_S32BE */) {
                tag = 'A_PCM/INT/BIG';
            }
            if (codecpar.codecId === 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
                || codecpar.codecId === 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */
                || codecpar.codecId === 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */
                || codecpar.codecId === 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */) {
                tag = 'A_PCM/INT/LIT';
            }
            return tag;
        }
        formatContext.streams.forEach((stream) => {
            if (stream.codecpar.codecType === 4 /* AVMediaType.AVMEDIA_TYPE_ATTACHMENT */) {
                avutil_util_crypto__WEBPACK_IMPORTED_MODULE_11__.random(this.random);
                context.attachments.entry.push({
                    uid: this.randomView.getBigUint64(0),
                    name: stream.metadata['name'] || 'unknown',
                    mime: stream.metadata['mime'] || 'unknown',
                    data: {
                        data: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_12__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize),
                        size: BigInt(stream.codecpar.extradataSize >> 0),
                        pos: -BigInt(1)
                    },
                    description: stream.metadata['description'] || 'unknown'
                });
            }
            else {
                const track = {};
                avutil_util_crypto__WEBPACK_IMPORTED_MODULE_11__.random(this.random);
                track.uid = this.randomView.getBigUint64(0);
                track.codecId = codecId2Tag(stream.codecpar);
                track.number = stream.index + 1;
                if (stream.codecpar.extradata) {
                    track.codecPrivate = {
                        data: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_12__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize).slice(),
                        pos: -BigInt(1),
                        size: BigInt(stream.codecpar.extradataSize >> 0)
                    };
                }
                track.language = stream.metadata['language'] || 'und';
                switch (stream.codecpar.codecType) {
                    case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */: {
                        track.type = 2 /* MATROSKATrackType.AUDIO */;
                        track.audio = {
                            channels: stream.codecpar.chLayout.nbChannels,
                            sampleRate: stream.codecpar.sampleRate,
                            bitDepth: stream.codecpar.bitsPerRawSample
                        };
                        break;
                    }
                    case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */: {
                        context.hasVideo = true;
                        track.type = 1 /* MATROSKATrackType.VIDEO */;
                        track.video = {
                            pixelWidth: stream.codecpar.width,
                            pixelHeight: stream.codecpar.height,
                            color: {
                                matrixCoefficients: stream.codecpar.colorSpace,
                                primaries: stream.codecpar.colorPrimaries,
                                transferCharacteristics: stream.codecpar.colorTrc,
                                range: stream.codecpar.colorRange
                            }
                        };
                        const result = (0,avutil_util_pixel__WEBPACK_IMPORTED_MODULE_13__.chromaLocation2Pos)(stream.codecpar.chromaLocation);
                        if (result) {
                            track.video.color.chromaSitingVert = (result.x >>> 7) + 1;
                            track.video.color.chromaSitingHorz = (result.y >>> 7) + 1;
                        }
                        break;
                    }
                    case 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */: {
                        track.type = 17 /* MATROSKATrackType.SUBTITLE */;
                        break;
                    }
                }
                stream.privData = track;
                context.tracks.entry.push(track);
            }
        });
        return 0;
    }
    writeHeader(formatContext) {
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeHeader(formatContext.ioWriter, this.context, this.context.header);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlId(formatContext.ioWriter, 408125543 /* EBMLId.SEGMENT */);
        const now = formatContext.ioWriter.getPos();
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlLengthUnknown(formatContext.ioWriter, 8);
        this.context.elePositionInfos.push({
            pos: now,
            length: 0,
            bytes: 8
        });
        this.context.segmentStart = formatContext.ioWriter.getPos();
        // SeekHead 占位
        formatContext.ioWriter.skip(96);
        this.context.seekHeadEnd = formatContext.ioWriter.getPos();
        return 0;
    }
    writeBlock(stream, avpacket) {
        const track = stream.privData;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlId(this.context.eleWriter, 163 /* EBMLId.SIMPLE_BLOCK */);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlLength(this.context.eleWriter, _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.ebmlLengthSize(track.number) + 2 + 1 + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlNum(this.context.eleWriter, track.number, _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.ebmlLengthSize(track.number));
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_5__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_14__.AV_MILLI_TIME_BASE_Q);
        this.context.eleWriter.writeInt16(Number(BigInt.asIntN(32, pts - this.context.currentCluster.timeCode)));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */ || stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            this.context.eleWriter.writeUint8(0x80);
        }
        else {
            this.context.eleWriter.writeUint8(0x00);
        }
        this.context.eleWriter.writeBuffer((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.getAVPacketData)(avpacket));
    }
    writeCluster(formatContext) {
        if (this.context.currentCluster.pos === -BigInt(1)) {
            return;
        }
        formatContext.ioWriter.flush();
        this.context.eleWriter.flush();
        let block = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_16__["default"])(Uint8Array, this.context.eleCaches);
        if (!block.length) {
            return;
        }
        this.context.eleCaches.length = 0;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlUint(this.context.eleWriter, 231 /* EBMLId.CLUSTER_TIME_CODE */, this.context.currentCluster.timeCode);
        this.context.eleWriter.flush();
        block = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_16__["default"])(Uint8Array, [...this.context.eleCaches, block]);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlId(formatContext.ioWriter, 524531317 /* EBMLId.CLUSTER */);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlLength(formatContext.ioWriter, block.length);
        formatContext.ioWriter.writeBuffer(block);
        formatContext.ioWriter.flush();
        this.context.eleCaches.length = 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__6, 346);
            return 0;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn(`can not found the stream width the avpacket\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__6, 353);
            return;
        }
        const track = stream.privData;
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_5__.avRescaleQ)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), (0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(avpacket + 72, _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_1__.Rational), avutil_constant__WEBPACK_IMPORTED_MODULE_14__.AV_MILLI_TIME_BASE_Q);
        if (!track.maxPts || track.maxPts < pts) {
            track.maxPts = pts;
        }
        if (this.options.isLive
            || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)
                && (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                    || !this.context.hasVideo
                        && (pts - this.context.currentCluster.timeCode > BigInt(5000)))) {
            this.writeCluster(formatContext);
            this.context.currentCluster.timeCode = pts;
            this.context.currentCluster.pos = formatContext.ioWriter.getPos() - this.context.segmentStart;
            this.context.cues.entry.push({
                time: this.context.currentCluster.timeCode,
                pos: [{
                        pos: this.context.currentCluster.pos,
                        track: track.number
                    }]
            });
        }
        this.writeBlock(stream, avpacket);
        return 0;
    }
    writeTrailer(formatContext) {
        this.writeCluster(formatContext);
        formatContext.streams.forEach((stream) => {
            const track = stream.privData;
            if (!this.options.isLive) {
                const duration = track.maxPts;
                if (duration > this.context.info.duration) {
                    this.context.info.duration = Number(BigInt.asIntN(32, duration));
                }
                this.context.tags.entry.push({
                    tag: {
                        name: 'DURATION',
                        string: formatTimestamp(duration)
                    },
                    target: {
                        trackUid: track.uid
                    }
                });
            }
        });
        formatContext.ioWriter.flush();
        this.context.eleWriter.flush();
        this.context.eleCaches.length = 0;
        this.context.eleWriter.reset();
        const now = formatContext.ioWriter.getPos();
        let segmentLength = now - this.context.segmentStart;
        this.context.seekHead.entry.push({
            id: 357149030 /* EBMLId.INFO */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeInfo(this.context.eleWriter, this.context, this.context.info);
        this.context.seekHead.entry.push({
            id: 374648427 /* EBMLId.TRACKS */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeTracks(this.context.eleWriter, this.context, this.context.tracks);
        this.context.seekHead.entry.push({
            id: 307544935 /* EBMLId.TAGS */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeTags(this.context.eleWriter, this.context, this.context.tags);
        this.context.eleWriter.flush();
        const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_16__["default"])(Uint8Array, this.context.eleCaches);
        formatContext.ioWriter.onFlush(buffer, this.context.seekHeadEnd);
        segmentLength += BigInt(Math.floor(buffer.length));
        this.context.cues.entry.forEach((cue) => {
            cue.pos.forEach((item) => {
                item.pos += BigInt(Math.floor(buffer.length));
            });
        });
        if (this.context.cues.entry.length) {
            this.context.seekHead.entry.push({
                id: 475249515 /* EBMLId.CUES */,
                pos: formatContext.ioWriter.getPos() - this.context.segmentStart + BigInt(Math.floor(buffer.length))
            });
            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeCues(formatContext.ioWriter, this.context, this.context.cues);
        }
        if (this.context.attachments.entry.length) {
            this.context.seekHead.entry.push({
                id: 423732329 /* EBMLId.ATTACHMENTS */,
                pos: formatContext.ioWriter.getPos() - this.context.segmentStart + BigInt(Math.floor(buffer.length))
            });
            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeAttachments(formatContext.ioWriter, this.context, this.context.attachments);
        }
        formatContext.ioWriter.flush();
        segmentLength += formatContext.ioWriter.getPos() - now;
        formatContext.ioWriter.seek(this.context.segmentStart);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeSeekHeader(formatContext.ioWriter, this.context, this.context.seekHead);
        const seekHeadLen = formatContext.ioWriter.getPos() - this.context.segmentStart;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlId(formatContext.ioWriter, 236 /* EBMLId.VOID */);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.writeEbmlLength(formatContext.ioWriter, this.context.seekHeadEnd - this.context.segmentStart - seekHeadLen - BigInt(2), 1);
        formatContext.ioWriter.flush();
        this.context.elePositionInfos[0].length = segmentLength;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_9__.updatePositionSize(formatContext.ioWriter, this.context);
        this.context.eleCaches.length = 0;
        return 0;
    }
    flush(formatContext) {
        formatContext.ioWriter.flush();
        this.context.currentCluster.timeCode = -BigInt(1);
        this.context.currentCluster.pos = -BigInt(1);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/matroska/matroska.ts":
/*!***************************************************!*\
  !*** ./src/avformat/formats/matroska/matroska.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MkvTag2CodecId: () => (/* binding */ MkvTag2CodecId),
/* harmony export */   WebmTag2CodecId: () => (/* binding */ WebmTag2CodecId)
/* harmony export */ });
/*
 * libmedia matroska defined
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
const MkvTag2CodecId = {
    'A_AAC': 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    'A_AC3': 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    'A_ALAC': 86032 /* AVCodecID.AV_CODEC_ID_ALAC */,
    'A_DTS': 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    'A_EAC3': 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    'A_FLAC': 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    'A_MLP': 86045 /* AVCodecID.AV_CODEC_ID_MLP */,
    'A_MPEG/L2': 86016 /* AVCodecID.AV_CODEC_ID_MP2 */,
    'A_MPEG/L1': 86058 /* AVCodecID.AV_CODEC_ID_MP1 */,
    'A_MPEG/L3': 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_OPUS/EXPERIMENTAL': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_PCM/FLOAT/IEEE': 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    'A_PCM/INT/BIG': 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    'A_PCM/INT/LIT': 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    'A_QUICKTIME/QDMC': 86066 /* AVCodecID.AV_CODEC_ID_QDMC */,
    'A_QUICKTIME/QDM2': 86035 /* AVCodecID.AV_CODEC_ID_QDM2 */,
    'A_REAL/14_4': 77824 /* AVCodecID.AV_CODEC_ID_RA_144 */,
    'A_REAL/28_8': 77825 /* AVCodecID.AV_CODEC_ID_RA_288 */,
    'A_REAL/ATRC': 86047 /* AVCodecID.AV_CODEC_ID_ATRAC3 */,
    'A_REAL/COOK': 86036 /* AVCodecID.AV_CODEC_ID_COOK */,
    'A_REAL/SIPR': 86057 /* AVCodecID.AV_CODEC_ID_SIPR */,
    'A_TRUEHD': 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */,
    'A_TTA1': 86038 /* AVCodecID.AV_CODEC_ID_TTA */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_WAVPACK4': 86041 /* AVCodecID.AV_CODEC_ID_WAVPACK */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'S_TEXT/UTF8': 94225 /* AVCodecID.AV_CODEC_ID_SUBRIP */,
    'S_TEXT/ASCII': 94210 /* AVCodecID.AV_CODEC_ID_TEXT */,
    'S_TEXT/ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_TEXT/SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_VOBSUB': 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */,
    'S_DVBSUB': 94209 /* AVCodecID.AV_CODEC_ID_DVB_SUBTITLE */,
    'S_HDMV/PGS': 94214 /* AVCodecID.AV_CODEC_ID_HDMV_PGS_SUBTITLE */,
    'S_HDMV/TEXTST': 94231 /* AVCodecID.AV_CODEC_ID_HDMV_TEXT_SUBTITLE */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'V_DIRAC': 116 /* AVCodecID.AV_CODEC_ID_DIRAC */,
    'V_FFV1': 33 /* AVCodecID.AV_CODEC_ID_FFV1 */,
    'V_MJPEG': 7 /* AVCodecID.AV_CODEC_ID_MJPEG */,
    'V_MPEG1': 1 /* AVCodecID.AV_CODEC_ID_MPEG1VIDEO */,
    'V_MPEG2': 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    'V_MPEG4/ISO/ASP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/SP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AVC': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'V_MPEGH/ISO/HEVC': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'V_MPEGH/ISO/VVC': 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    'V_MPEG4/MS/V3': 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    'V_PRORES': 147 /* AVCodecID.AV_CODEC_ID_PRORES */,
    'V_REAL/RV10': 5 /* AVCodecID.AV_CODEC_ID_RV10 */,
    'V_REAL/RV20': 6 /* AVCodecID.AV_CODEC_ID_RV20 */,
    'V_REAL/RV30': 68 /* AVCodecID.AV_CODEC_ID_RV30 */,
    'V_REAL/RV40': 69 /* AVCodecID.AV_CODEC_ID_RV40 */,
    'V_SNOW': 208 /* AVCodecID.AV_CODEC_ID_SNOW */,
    'V_THEORA': 30 /* AVCodecID.AV_CODEC_ID_THEORA */,
    'V_UNCOMPRESSED': 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */,
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */
};
const WebmTag2CodecId = {
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
};


/***/ }),

/***/ "./src/avformat/formats/matroska/omatroska.ts":
/*!****************************************************!*\
  !*** ./src/avformat/formats/matroska/omatroska.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ebmlLengthSize: () => (/* binding */ ebmlLengthSize),
/* harmony export */   updatePositionSize: () => (/* binding */ updatePositionSize),
/* harmony export */   writeAttachments: () => (/* binding */ writeAttachments),
/* harmony export */   writeCues: () => (/* binding */ writeCues),
/* harmony export */   writeEbmlId: () => (/* binding */ writeEbmlId),
/* harmony export */   writeEbmlLength: () => (/* binding */ writeEbmlLength),
/* harmony export */   writeEbmlLengthUnknown: () => (/* binding */ writeEbmlLengthUnknown),
/* harmony export */   writeEbmlNum: () => (/* binding */ writeEbmlNum),
/* harmony export */   writeEbmlUint: () => (/* binding */ writeEbmlUint),
/* harmony export */   writeHeader: () => (/* binding */ writeHeader),
/* harmony export */   writeInfo: () => (/* binding */ writeInfo),
/* harmony export */   writeSeekHeader: () => (/* binding */ writeSeekHeader),
/* harmony export */   writeTags: () => (/* binding */ writeTags),
/* harmony export */   writeTracks: () => (/* binding */ writeTracks)
/* harmony export */ });
/* unused harmony exports ebmlIdSize, ebmlNumSize, writeEbmlUid, writeEbmlFloat, writeEbmlDouble, writeEbmlBuffer, writeEbmlString, writeEbmlVoid, writeEleData, writeSeekHeaderEntry, writeVideoColor, writeVideoTrack, writeAudioTrack, writeTrack, writeTagTag, writeTagTarget, writeTag, writeCuePosition, writeCue, writeChapterAtomDisplay, writeChapterAtom, writeChapter, writeChapters, writeAttachment */
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/*
 * libmedia matroska encoder util
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





function ebmlIdSize(id) {
    return Math.floor((Math.log2(id) + 7) / 8);
}
function ebmlNumSize(value) {
    let bytes = 0;
    do {
        bytes++;
        // @ts-ignore
    } while (value >>= (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? BigInt(7) : 7));
    return bytes;
}
function ebmlLengthSize(value) {
    return common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? ebmlNumSize(value + BigInt(1)) : ebmlNumSize(value + 1);
}
function writeEbmlNum(writer, value, bytes) {
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value)) {
        value |= (BigInt(1) << BigInt(bytes * 7));
        for (let i = bytes - 1; i >= 0; i--) {
            writer.writeUint8(Number((value >> BigInt(i * 8)) & BigInt(0xff)));
        }
    }
    else {
        value |= (1 << bytes * 7);
        for (let i = bytes - 1; i >= 0; i--) {
            writer.writeUint8((value >> (i * 8)) & 0xff);
        }
    }
}
function writeEbmlId(writer, id) {
    let len = ebmlIdSize(id);
    while (len--) {
        writer.writeUint8(id >> (len * 8));
    }
}
function writeEbmlLength(writer, length, bytes = 0) {
    let need = ebmlLengthSize(length);
    if (bytes === 0) {
        bytes = need;
    }
    writeEbmlNum(writer, length, bytes);
}
function writeEbmlLengthUnknown(writer, bytes) {
    writer.writeUint8(0x1ff >> bytes);
    for (let i = 0; i < bytes - 1; i++) {
        writer.writeUint8(0xff);
    }
}
function writeEbmlUid(writer, id, uid) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 8);
    writer.writeUint64(uid);
}
function writeEbmlUint(writer, id, value) {
    let bytes = 1;
    let tmp = value;
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(tmp)) {
        while (tmp >>= BigInt(8)) {
            bytes++;
        }
    }
    else {
        while (tmp >>= 8) {
            bytes++;
        }
    }
    writeEbmlId(writer, id);
    writeEbmlLength(writer, bytes);
    for (let i = bytes - 1; i >= 0; i--) {
        writer.writeUint8(common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? Number(value >> BigInt(i * 8)) : (value >> i * 8));
    }
}
function writeEbmlFloat(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 4);
    writer.writeFloat(value);
}
function writeEbmlDouble(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 8);
    writer.writeDouble(value);
}
function writeEbmlBuffer(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, value.length);
    writer.writeBuffer(value);
}
function writeEbmlString(writer, id, value) {
    const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(value);
    writeEbmlBuffer(writer, id, buffer);
}
function writeEbmlVoid(writer, size) {
    writeEbmlId(writer, 236 /* EBMLId.VOID */);
    if (size < 10) {
        size -= 2;
        writeEbmlLength(writer, size);
    }
    else {
        size -= 9;
        writeEbmlLength(writer, size, 8);
    }
    writer.writeBuffer(new Uint8Array(size).fill(0));
}
function updatePositionSize(ioWriter, context) {
    const pos = ioWriter.getPos();
    const pointer = ioWriter.getPointer();
    const minPos = pos - BigInt(Math.floor(pointer));
    const seeks = [];
    common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(context.elePositionInfos, (item) => {
        if (item.pos < pos && item.pos >= minPos) {
            ioWriter.seekInline(pointer + Number(item.pos - pos));
            writeEbmlLength(ioWriter, item.length, item.bytes);
        }
        else {
            seeks.push(item);
        }
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(seeks, (item) => {
        ioWriter.seek(item.pos);
        writeEbmlLength(ioWriter, item.length, item.bytes);
    });
    if (seeks.length) {
        ioWriter.seek(pos);
    }
    else {
        ioWriter.seekInline(pointer);
    }
    ioWriter.flush();
    context.elePositionInfos = [];
}
function writeEleData(writer, context, id, data) {
    context.eleWriter.flush();
    const oldCache = context.eleCaches;
    context.eleCaches = [];
    data(context.eleWriter);
    context.eleWriter.flush();
    const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, context.eleCaches);
    context.eleCaches = oldCache;
    writeEbmlBuffer(writer, id, buffer);
}
function writeHeader(writer, context, header) {
    writeEleData(writer, context, 440786851 /* EBMLId.HEADER */, (eleWriter) => {
        writeEbmlUint(eleWriter, 17030 /* EBMLId.EBML_VERSION */, header.version);
        writeEbmlUint(eleWriter, 17143 /* EBMLId.EBML_READ_VERSION */, header.readVersion);
        writeEbmlUint(eleWriter, 17138 /* EBMLId.EBML_MAX_ID_LENGTH */, header.maxIdLength);
        writeEbmlUint(eleWriter, 17139 /* EBMLId.EBML_MAX_SIZE_LENGTH */, header.maxSizeLength);
        writeEbmlString(eleWriter, 17026 /* EBMLId.DOCTYPE */, header.docType);
        writeEbmlUint(eleWriter, 17031 /* EBMLId.DOC_TYPE_VERSION */, header.docTypeVersion);
        writeEbmlUint(eleWriter, 17029 /* EBMLId.DOC_TYPE_READ_VERSION */, header.docTypeReadVersion);
    });
}
function writeSeekHeaderEntry(writer, context, entry) {
    writeEleData(writer, context, 19899 /* EBMLId.SEEK_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 21419 /* EBMLId.SEEK_ID */, entry.id);
        writeEbmlUint(eleWriter, 21420 /* EBMLId.SEEK_POSITION */, entry.pos);
    });
}
function writeSeekHeader(writer, context, header) {
    writeEleData(writer, context, 290298740 /* EBMLId.SEEK_HEAD */, (eleWriter) => {
        header.entry.forEach((entry) => {
            writeSeekHeaderEntry(eleWriter, context, entry);
        });
    });
}
function writeInfo(writer, context, info) {
    writeEleData(writer, context, 357149030 /* EBMLId.INFO */, (eleWriter) => {
        writeEbmlUid(eleWriter, 29604 /* EBMLId.SEGMENT_UID */, info.segmentUUID);
        writeEbmlUint(eleWriter, 2807729 /* EBMLId.TIME_CODE_SCALE */, info.timestampScale);
        writeEbmlDouble(eleWriter, 17545 /* EBMLId.DURATION */, info.duration);
        writeEbmlString(eleWriter, 19840 /* EBMLId.MUXING_APP */, info.muxingApp);
        writeEbmlString(eleWriter, 22337 /* EBMLId.WRITING_APP */, info.writingApp);
    });
}
function writeVideoColor(writer, context, color) {
    writeEleData(writer, context, 21936 /* EBMLId.VIDEO_COLOR */, (eleWriter) => {
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'matrixCoefficients')) {
            writeEbmlUint(eleWriter, 21937 /* EBMLId.VIDEO_COLOR_MATRIX_COEFF */, color.matrixCoefficients);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'primaries')) {
            writeEbmlUint(eleWriter, 21947 /* EBMLId.VIDEO_COLOR_PRIMARIES */, color.primaries);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'transferCharacteristics')) {
            writeEbmlUint(eleWriter, 21946 /* EBMLId.VIDEO_COLOR_TRANSFER_CHARACTERISTICS */, color.transferCharacteristics);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'range')) {
            writeEbmlUint(eleWriter, 21945 /* EBMLId.VIDEO_COLOR_RANGE */, color.range);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'chromaSitingVert')) {
            writeEbmlUint(eleWriter, 21944 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_VERT */, color.chromaSitingVert);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'chromaSitingHorz')) {
            writeEbmlUint(eleWriter, 21943 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_HORZ */, color.chromaSitingHorz);
        }
    });
}
function writeVideoTrack(writer, context, video) {
    writeEleData(writer, context, 224 /* EBMLId.TRACK_VIDEO */, (eleWriter) => {
        writeEbmlUint(eleWriter, 176 /* EBMLId.VIDEO_PIXEL_WIDTH */, video.pixelWidth);
        writeEbmlUint(eleWriter, 186 /* EBMLId.VIDEO_PIXEL_HEIGHT */, video.pixelHeight);
        if (video.color) {
            writeVideoColor(eleWriter, context, video.color);
        }
    });
}
function writeAudioTrack(writer, context, audio) {
    writeEleData(writer, context, 225 /* EBMLId.TRACK_AUDIO */, (eleWriter) => {
        writeEbmlDouble(eleWriter, 181 /* EBMLId.AUDIO_SAMPLING_FREQ */, audio.sampleRate);
        if (audio.outSampleRate) {
            writeEbmlDouble(eleWriter, 181 /* EBMLId.AUDIO_SAMPLING_FREQ */, audio.outSampleRate);
        }
        writeEbmlUint(eleWriter, 25188 /* EBMLId.AUDIO_BITDEPTH */, audio.bitDepth);
        writeEbmlUint(eleWriter, 159 /* EBMLId.AUDIO_CHANNELS */, audio.channels);
    });
}
function writeTrack(writer, context, track) {
    writeEleData(writer, context, 174 /* EBMLId.TRACK_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 215 /* EBMLId.TRACK_NUMBER */, track.number);
        writeEbmlUid(eleWriter, 29637 /* EBMLId.TRACK_UID */, track.uid);
        writeEbmlUint(eleWriter, 131 /* EBMLId.TRACK_TYPE */, track.type);
        writeEbmlString(eleWriter, 2274716 /* EBMLId.TRACK_LANGUAGE */, track.language);
        writeEbmlString(eleWriter, 134 /* EBMLId.CODEC_ID */, track.codecId);
        if (track.codecPrivate) {
            writeEbmlBuffer(eleWriter, 25506 /* EBMLId.CODEC_PRIVATE */, track.codecPrivate.data);
        }
        if (track.audio) {
            writeAudioTrack(eleWriter, context, track.audio);
        }
        else if (track.video) {
            writeVideoTrack(eleWriter, context, track.video);
        }
    });
}
function writeTracks(writer, context, tracks) {
    writeEleData(writer, context, 374648427 /* EBMLId.TRACKS */, (eleWriter) => {
        tracks.entry.forEach((track) => {
            writeTrack(eleWriter, context, track);
        });
    });
}
function writeTagTag(writer, context, tag) {
    writeEleData(writer, context, 26568 /* EBMLId.TAG_SIMPLE */, (eleWriter) => {
        if (tag.name) {
            writeEbmlString(eleWriter, 17827 /* EBMLId.TAG_NAME */, tag.name);
        }
        if (tag.string) {
            writeEbmlString(eleWriter, 17543 /* EBMLId.TAG_STRING */, tag.string);
        }
        if (tag.language) {
            writeEbmlString(eleWriter, 17530 /* EBMLId.TAG_LANG */, tag.language);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(tag, 'default')) {
            writeEbmlUint(eleWriter, 17540 /* EBMLId.TAG_DEFAULT */, tag.default);
        }
        if (tag.sub) {
            writeTagTag(eleWriter, context, tag.sub);
        }
    });
}
function writeTagTarget(writer, context, target) {
    writeEleData(writer, context, 25536 /* EBMLId.TAG_TARGETS */, (eleWriter) => {
        if (target.type) {
            writeEbmlString(eleWriter, 25546 /* EBMLId.TAG_TARGETS_TYPE */, target.type);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'typeValue')) {
            writeEbmlUint(eleWriter, 26826 /* EBMLId.TAG_TARGETS_TYPE_VALUE */, target.typeValue);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'trackUid')) {
            writeEbmlUid(eleWriter, 25541 /* EBMLId.TAG_TARGETS_TRACK_UID */, target.trackUid);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'chapterUid')) {
            writeEbmlUid(eleWriter, 25540 /* EBMLId.TAG_TARGETS_CHAPTER_UID */, target.chapterUid);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'attachUid')) {
            writeEbmlUid(eleWriter, 25540 /* EBMLId.TAG_TARGETS_CHAPTER_UID */, target.attachUid);
        }
    });
}
function writeTag(writer, context, tag) {
    writeEleData(writer, context, 29555 /* EBMLId.TAG */, (eleWriter) => {
        if (tag.tag) {
            writeTagTag(eleWriter, context, tag.tag);
        }
        if (tag.target) {
            writeTagTarget(eleWriter, context, tag.target);
        }
    });
}
function writeTags(writer, context, tags) {
    writeEleData(writer, context, 307544935 /* EBMLId.TAGS */, (eleWriter) => {
        tags.entry.forEach((tag) => {
            writeTag(eleWriter, context, tag);
        });
    });
}
function writeCuePosition(writer, context, pos) {
    writeEleData(writer, context, 183 /* EBMLId.CUE_TRACK_POSITION */, (eleWriter) => {
        writeEbmlUint(eleWriter, 247 /* EBMLId.CUE_TRACK */, pos.track);
        writeEbmlUint(eleWriter, 241 /* EBMLId.CUE_CLUSTER_POSITION */, pos.pos);
    });
}
function writeCue(writer, context, cue) {
    writeEleData(writer, context, 187 /* EBMLId.POINT_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 179 /* EBMLId.CUE_TIME */, cue.time);
        cue.pos.forEach((p) => {
            writeCuePosition(eleWriter, context, p);
        });
    });
}
function writeCues(writer, context, cues) {
    writeEleData(writer, context, 475249515 /* EBMLId.CUES */, (eleWriter) => {
        cues.entry.forEach((cue) => {
            writeCue(eleWriter, context, cue);
        });
    });
}
function writeChapterAtomDisplay(writer, context, display) {
    writeEleData(writer, context, 128 /* EBMLId.CHAPTER_DISPLAY */, (eleWriter) => {
        writeEbmlString(eleWriter, 133 /* EBMLId.CHAP_STRING */, display.title);
        writeEbmlString(eleWriter, 17276 /* EBMLId.CHAP_LANG */, display.language);
    });
}
function writeChapterAtom(writer, context, atom) {
    writeEleData(writer, context, 182 /* EBMLId.CHAPTER_ATOM */, (eleWriter) => {
        writeEbmlUint(eleWriter, 145 /* EBMLId.CHAPTER_TIME_START */, atom.start);
        writeEbmlUint(eleWriter, 146 /* EBMLId.CHAPTER_TIME_END */, atom.end);
        writeEbmlUid(eleWriter, 29636 /* EBMLId.CHAPTER_UID */, atom.uid);
        if (atom.display) {
            writeChapterAtomDisplay(eleWriter, context, atom.display);
        }
    });
}
function writeChapter(writer, context, chapter) {
    writeEleData(writer, context, 17849 /* EBMLId.EDITION_ENTRY */, (eleWriter) => {
        common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(chapter.atom, (item) => {
            writeChapterAtom(eleWriter, context, item);
        });
    });
}
function writeChapters(writer, context, chapters) {
    writeEleData(writer, context, 272869232 /* EBMLId.CHAPTERS */, (eleWriter) => {
        chapters.entry.forEach((chapter) => {
            writeChapter(eleWriter, context, chapter);
        });
    });
}
function writeAttachment(writer, context, attachment) {
    writeEbmlId(writer, 24999 /* EBMLId.ATTACHED_FILE */);
    const info = {
        pos: writer.getPos(),
        length: 0,
        bytes: 8
    };
    writeEbmlLength(writer, 0, 8);
    const now = writer.getPos();
    writeEbmlUid(writer, 18094 /* EBMLId.FILE_UID */, attachment.uid);
    writeEbmlString(writer, 18030 /* EBMLId.FILE_NAME */, attachment.name);
    writeEbmlString(writer, 18016 /* EBMLId.FILE_MIMETYPE */, attachment.mime);
    if (attachment.description) {
        writeEbmlString(writer, 18046 /* EBMLId.FILE_DESC */, attachment.description);
    }
    if (attachment.data) {
        writeEbmlBuffer(writer, 18012 /* EBMLId.FILE_DATA */, attachment.data.data);
    }
    info.length = writer.getPos() - now;
    context.elePositionInfos.push(info);
}
function writeAttachments(writer, context, attachments) {
    const old = context.elePositionInfos;
    context.elePositionInfos = [];
    writeEbmlId(writer, 423732329 /* EBMLId.ATTACHMENTS */);
    const info = {
        pos: writer.getPos(),
        length: 0,
        bytes: 8
    };
    writeEbmlLength(writer, 0, 8);
    const now = writer.getPos();
    attachments.entry.forEach((attachment) => {
        writeAttachment(writer, context, attachment);
    });
    info.length = writer.getPos() - now;
    context.elePositionInfos.push(info);
    updatePositionSize(writer, context);
    context.elePositionInfos = old;
}


/***/ }),

/***/ "./src/avutil/util/crypto.ts":
/*!***********************************!*\
  !*** ./src/avutil/util/crypto.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   random: () => (/* binding */ random)
/* harmony export */ });
/*
 * libmedia crypto util
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
function random(buffer) {
    {
        crypto.getRandomValues(buffer);
    }
}


/***/ }),

/***/ "./src/avutil/util/pixel.ts":
/*!**********************************!*\
  !*** ./src/avutil/util/pixel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chromaLocation2Pos: () => (/* binding */ chromaLocation2Pos),
/* harmony export */   pixelFillLinesizes: () => (/* binding */ pixelFillLinesizes),
/* harmony export */   pixelFillPlaneSizes: () => (/* binding */ pixelFillPlaneSizes),
/* harmony export */   pixelFillPointer: () => (/* binding */ pixelFillPointer)
/* harmony export */ });
/* unused harmony exports pixelGetLinesize, pixelAlloc, pixelGetSize */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error */ "./src/avutil/error.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_stack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/stack */ "./src/cheap/stack.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_math_align__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/math/align */ "./src/common/math/align.ts");


/*
 * libmedia video pixel util
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







function chromaLocation2Pos(pos) {
    if (pos <= 0 /* AVChromaLocation.AVCHROMA_LOC_UNSPECIFIED */ || pos >= 7 /* AVChromaLocation.AVCHROMA_LOC_NB */) {
        return;
    }
    return {
        x: (pos & 1) * 128,
        y: ((pos >>> 1) ^ (pos < 4 ? 1 : 0)) * 128
    };
}
function getMaxPixSteps(desc) {
    const maxPixSteps = [0, 0, 0, 0];
    const maxPixStepsComps = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        if (desc.comp[i] && desc.comp[i].step > maxPixSteps[desc.comp[i].plane]) {
            maxPixSteps[desc.comp[i].plane] = desc.comp[i].step;
            maxPixStepsComps[desc.comp[i].plane] = i;
        }
    }
    return {
        maxPixSteps,
        maxPixStepsComps
    };
}
function setSystematicPal(pal, pixfmt) {
    for (let i = 0; i < 256; i++) {
        let r, g, b;
        switch (pixfmt) {
            case 20 /* AVPixelFormat.AV_PIX_FMT_RGB8 */:
                r = (i >> 5) * 36;
                g = ((i >> 2) & 7) * 36;
                b = (i & 3) * 85;
                break;
            case 17 /* AVPixelFormat.AV_PIX_FMT_BGR8 */:
                b = (i >> 6) * 85;
                g = ((i >> 3) & 7) * 36;
                r = (i & 7) * 36;
                break;
            case 22 /* AVPixelFormat.AV_PIX_FMT_RGB4_BYTE */:
                r = (i >> 3) * 255;
                g = ((i >> 1) & 3) * 85;
                b = (i & 1) * 255;
                break;
            case 19 /* AVPixelFormat.AV_PIX_FMT_BGR4_BYTE */:
                b = (i >> 3) * 255;
                g = ((i >> 1) & 3) * 85;
                r = (i & 1) * 255;
                break;
            case 8 /* AVPixelFormat.AV_PIX_FMT_GRAY8 */:
                r = b = g = i;
                break;
            default:
                return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[8](pal + (i * 4), b + (g << 8) + (r << 16) + (-16777216));
    }
    return 0;
}
function pixelGetLinesize_(width, plane, maxStep, maxStepComp, desc) {
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    if (width < 0) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const s = (maxStepComp === 1 || maxStepComp === 2) ? desc.log2ChromaW : 0;
    const shiftedW = ((width + (1 << s) - 1)) >>> s;
    if (shiftedW && maxStep > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / shiftedW) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    let linesize = maxStep * shiftedW;
    if (desc.flags & 4 /* PixelFormatFlags.BIT_STREAM */) {
        linesize = (linesize + 7) >>> 3;
    }
    return linesize;
}
function pixelGetLinesize(pixfmt, width, plane) {
    const desc = _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.PixelFormatDescriptorsMap[pixfmt];
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const { maxPixSteps, maxPixStepsComps } = getMaxPixSteps(desc);
    return pixelGetLinesize_(width, plane, maxPixSteps[plane], maxPixStepsComps[plane], desc);
}
function pixelFillLinesizes(linesizes, pixfmt, width) {
    const desc = _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.PixelFormatDescriptorsMap[pixfmt];
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const { maxPixSteps, maxPixStepsComps } = getMaxPixSteps(desc);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(linesizes, 0, 16);
    let ret = 0;
    for (let i = 0; i < 4; i++) {
        if ((ret = pixelGetLinesize_(width, i, maxPixSteps[i], maxPixStepsComps[i], desc)) < 0) {
            return ret;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes + (i * 4), ret);
    }
}
function pixelFillPlaneSizes(sizes, pixfmt, height, linesizes) {
    const hasPlane = [0, 0, 0, 0];
    const desc = _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.PixelFormatDescriptorsMap[pixfmt];
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(sizes, 0, 16);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / height) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](sizes, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * height);
    if (desc.flags & 2 /* PixelFormatFlags.PALETTE */) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](sizes + 4, 1024);
        return 0;
    }
    for (let i = 0; i < 4; i++) {
        if (desc.comp[i]) {
            hasPlane[desc.comp[i].plane] = 1;
        }
    }
    for (let i = 0; i < 4 && hasPlane[i]; i++) {
        let s = (i === 1 || i === 2) ? desc.log2ChromaH : 0;
        let h = (height + (1 << s) - 1) >> s;
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / h) {
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](sizes + (i * 4), h * cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    return 0;
}
function pixelFillPointer(data, pixfmt, height, ptr, linesizes) {
    const linesizes1 = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(data, 0, 16);
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes1 + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    let ret = pixelFillPlaneSizes(sizes, pixfmt, height, linesizes1);
    if (ret < 0) {
        defer();
        return ret;
    }
    ret = 0;
    for (let i = 0; i < 4; i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4)) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX - ret) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        ret += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4));
    }
    if (!ptr) {
        defer();
        return ret;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](data, ptr);
    for (let i = 1; i < 4 && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4)); i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](data + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](data + (i - 1)) + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i - 1)));
    }
    defer();
    return ret;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}
function pixelAlloc(pointers, linesizes, w, h, pixfmt, align = 1) {
    const desc = _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.PixelFormatDescriptorsMap[pixfmt];
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const linesizes1 = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    let ret = 0;
    if ((ret = pixelFillLinesizes(linesizes, pixfmt, align > 7 ? (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(w, 8) : w)) < 0) {
        defer();
        return ret;
    }
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes + (i * 4), (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)), align));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes1 + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    if ((ret = pixelFillPlaneSizes(sizes, pixfmt, h, linesizes1)) < 0) {
        defer();
        return ret;
    }
    let totalSize = align;
    for (let i = 0; i < 4; i++) {
        if (totalSize > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4))) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        totalSize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4));
    }
    const buf = (0,_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(totalSize);
    if (!buf) {
        defer();
        return _error__WEBPACK_IMPORTED_MODULE_3__.NO_MEMORY;
    }
    if ((ret = pixelFillPointer(pointers, pixfmt, h, buf, linesizes)) < 0) {
        defer();
        return ret;
    }
    if (desc.flags & 2 /* PixelFormatFlags.PALETTE */) {
        if (align < 4) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_7__.avFree)(buf);
            defer();
            return ret;
        }
        setSystematicPal(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4), pixfmt);
    }
    if ((desc.flags & 2 /* PixelFormatFlags.PALETTE */)
        && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4)
        && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) > cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h) {
        /* zero-initialize the padding before the palette */
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h, 0, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h);
    }
    defer();
    return ret;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}
function pixelGetSize(pixfmt, width, height, align) {
    const desc = _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.PixelFormatDescriptorsMap[pixfmt];
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const linesizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const alignedLinesizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    let ret = 0;
    if ((ret = pixelFillLinesizes(linesizes, pixfmt, width)) < 0) {
        defer();
        return ret;
    }
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](alignedLinesizes + (i * 4), (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)), align));
    }
    if ((ret = pixelFillPlaneSizes(sizes, pixfmt, height, alignedLinesizes)) < 0) {
        defer();
        return ret;
    }
    let totalSize = 0;
    for (let i = 0; i < 4; i++) {
        if (totalSize > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4))) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        totalSize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](sizes + (i * 4));
    }
    defer();
    return totalSize;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}


/***/ }),

/***/ "./src/common/math/align.ts":
/*!**********************************!*\
  !*** ./src/common/math/align.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ align)
/* harmony export */ });
function align(value, alignment) {
    return (value + (alignment - 1)) & ~(alignment - 1);
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OMatroskaFormat_ts.avtranscoder.js.map