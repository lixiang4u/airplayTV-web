"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IAssFormat_ts"],{

/***/ "./src/avformat/formats/IAssFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IAssFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IAssFormat)
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
/* harmony import */ var _ass_iass__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ass/iass */ "./src/avformat/formats/ass/iass.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IAssFormat.ts";











class IAssFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 17 /* AVFormat.ASS */;
    queue;
    index;
    constructor() {
        super();
    }
    init(formatContext) {
        this.queue = [];
    }
    async readHeader(formatContext) {
        const line = await formatContext.ioReader.readLine();
        if (line.trim() !== '[Script Info]') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not ass', cheap__fileName__0, 68);
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        const stream = formatContext.createStream();
        stream.codecpar.codecId = 94230 /* AVCodecID.AV_CODEC_ID_ASS */;
        stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
        stream.timeBase.den = 1000;
        stream.timeBase.num = 1;
        let extradata = line + '\n';
        let hasEvent = false;
        let eventFormats;
        let startIndex = 0;
        let endIndex = 0;
        while (true) {
            const line = await formatContext.ioReader.readLine();
            if (/^;/.test(line)) {
                continue;
            }
            if (line.trim() === '[Events]') {
                hasEvent = true;
            }
            if (/^Format:/.test(line) && hasEvent) {
                extradata += line;
                eventFormats = _ass_iass__WEBPACK_IMPORTED_MODULE_10__.parseEventFormat(line.trim());
                for (let i = 0; i < eventFormats.length; i++) {
                    if (eventFormats[i] === "Start" /* AssEventsFormat.Start */) {
                        startIndex = i;
                    }
                    else if (eventFormats[i] === "End" /* AssEventsFormat.End */) {
                        endIndex = i;
                    }
                }
                break;
            }
            extradata += line + '\n';
        }
        const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_9__.encode(extradata);
        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(buffer.length);
        stream.codecpar.extradataSize = buffer.length;
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(stream.codecpar.extradata, buffer.length, buffer);
        this.index = 0;
        let lastStartTs = BigInt(0);
        try {
            while (true) {
                const pos = formatContext.ioReader.getPos();
                const line = (await formatContext.ioReader.readLine()).trim();
                if (/^;/.test(line) || /^Comment:/.test(line)) {
                    continue;
                }
                const { start: startTs, end: endTs } = _ass_iass__WEBPACK_IMPORTED_MODULE_10__.getEventLineTime(eventFormats, line, startIndex, endIndex);
                stream.nbFrames++;
                stream.duration = endTs;
                const cue = {
                    context: line,
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
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in cues, found index: ${index}, pts: ${this.queue[index].startTs}, pos: ${this.queue[index].pos}`, cheap__fileName__0, 217);
            this.index = Math.max(index - 1, 0);
            while (this.index > 0) {
                if (this.queue[this.index - 1].startTs === this.queue[this.index].startTs) {
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

/***/ "./src/avformat/formats/ass/ass.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/ass/ass.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssEventsFormatList: () => (/* binding */ AssEventsFormatList),
/* harmony export */   AssStylesFormatList: () => (/* binding */ AssStylesFormatList)
/* harmony export */ });
/*
 * libmedia ass defined
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
const AssStylesFormatList = [
    "Name" /* AssStylesFormat.Name */,
    "Fontname" /* AssStylesFormat.FontName */,
    "Fontsize" /* AssStylesFormat.FontSize */,
    "PrimaryColour" /* AssStylesFormat.PrimaryColour */,
    "SecondaryColour" /* AssStylesFormat.SecondaryColour */,
    "OutlineColour" /* AssStylesFormat.OutlineColour */,
    "BackColour" /* AssStylesFormat.BackColour */,
    "Bold" /* AssStylesFormat.Bold */,
    "Italic" /* AssStylesFormat.Italic */,
    "Underline" /* AssStylesFormat.Underline */,
    "StrikeOut" /* AssStylesFormat.StrikeOut */,
    "ScaleX" /* AssStylesFormat.ScaleX */,
    "ScaleY" /* AssStylesFormat.ScaleY */,
    "Spacing" /* AssStylesFormat.Spacing */,
    "Angle" /* AssStylesFormat.Angle */,
    "BorderStyle" /* AssStylesFormat.BorderStyle */,
    "Outline" /* AssStylesFormat.Outline */,
    "Shadow" /* AssStylesFormat.Shadow */,
    "Alignment" /* AssStylesFormat.Alignment */,
    "MarginL" /* AssStylesFormat.MarginL */,
    "MarginR" /* AssStylesFormat.MarginR */,
    "MarginV" /* AssStylesFormat.MarginV */,
    "Encoding" /* AssStylesFormat.Encoding */
];
const AssEventsFormatList = [
    "ReadOrder" /* AssEventsFormat.ReadOrder */,
    "Layer" /* AssEventsFormat.Layer */,
    "Start" /* AssEventsFormat.Start */,
    "End" /* AssEventsFormat.End */,
    "Style" /* AssEventsFormat.Style */,
    "Name" /* AssEventsFormat.Name */,
    "MarginL" /* AssEventsFormat.MarginL */,
    "MarginR" /* AssEventsFormat.MarginR */,
    "MarginV" /* AssEventsFormat.MarginV */,
    "Effect" /* AssEventsFormat.Effect */,
    "Text" /* AssEventsFormat.Text */
];


/***/ }),

/***/ "./src/avformat/formats/ass/iass.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/ass/iass.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEventLineTime: () => (/* binding */ getEventLineTime),
/* harmony export */   parseEvent: () => (/* binding */ parseEvent),
/* harmony export */   parseEventFormat: () => (/* binding */ parseEventFormat)
/* harmony export */ });
/* unused harmony exports parseFormat, parseStyleFormat, parseEventLine, parseDrawing, parseStyle */
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _ass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ass */ "./src/avformat/formats/ass/ass.ts");
/* harmony import */ var common_util_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/time */ "./src/common/util/time.ts");
/* harmony import */ var ass_compiler_src_parser_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ass-compiler/src/parser/effect */ "./node_modules/ass-compiler/src/parser/effect.js");
/* harmony import */ var ass_compiler_src_parser_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ass-compiler/src/parser/text */ "./node_modules/ass-compiler/src/parser/text.js");
var cheap__fileName__0 = "src\\avformat\\formats\\ass\\iass.ts";
/*
 * libmedia ass input util
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





function parseFormat(fields, format) {
    const items = format.match(/Format\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
    const result = [];
    for (let i = 0; i < items.length; i++) {
        const field = fields.find(f => f.toLowerCase() === items[i].toLowerCase());
        if (!field) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`not support ass field(${items[i]})`, cheap__fileName__0, 40);
        }
        result.push(field || items[i]);
    }
    return result;
}
function parseStyleFormat(format) {
    return parseFormat(_ass__WEBPACK_IMPORTED_MODULE_1__.AssStylesFormatList, format);
}
function parseEventFormat(format) {
    return parseFormat(_ass__WEBPACK_IMPORTED_MODULE_1__.AssEventsFormatList, format);
}
function parseEventLine(formats, text) {
    let fields = text.split(',');
    if (fields.length > formats.length) {
        const textField = fields.slice(formats.length - 1).join(',');
        fields = fields.slice(0, formats.length - 1);
        fields.push(textField);
    }
    return fields;
}
function getEventLineTime(formats, event, startIndex, endIndex) {
    const [, , value] = event.match(/^(\w+?)\s*:\s*(.*)/i);
    const fields = parseEventLine(formats, value);
    return {
        start: (0,common_util_time__WEBPACK_IMPORTED_MODULE_2__.hhColonDDColonSSDotMill2Int64)(fields[startIndex]),
        end: (0,common_util_time__WEBPACK_IMPORTED_MODULE_2__.hhColonDDColonSSDotMill2Int64)(fields[endIndex])
    };
}
function parseDrawing(text) {
    if (!text) {
        return [];
    }
    return text
        .toLowerCase()
        // numbers
        .replace(/([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/g, ' $1 ')
        // commands
        .replace(/([mnlbspc])/g, ' $1 ')
        .trim()
        .replace(/\s+/g, ' ')
        .split(/\s(?=[mnlbspc])/)
        .map((cmd) => (cmd.split(' ').filter((x, i) => !(i && Number.isNaN(+x)))));
}
function parseStyle(styleFormat, style) {
    const values = style.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/);
    const result = {};
    for (let i = 0; i < values.length; i++) {
        result[styleFormat[i]] = values[i];
    }
    return result;
}
function parseEvent(formats, event) {
    const [, key, value] = event.match(/^(\w+?)\s*:\s*(.*)/i);
    let type = 0 /* AssEventType.NONE */;
    switch (key) {
        case 'Comment':
            type = 2 /* AssEventType.Comment */;
            break;
        case 'Dialogue':
            type = 1 /* AssEventType.Dialogue */;
            break;
        case 'Command':
            type = 6 /* AssEventType.Command */;
            break;
        case 'Movie':
            type = 5 /* AssEventType.Movie */;
            break;
        case 'Picture':
            type = 3 /* AssEventType.Picture */;
            break;
        case 'Sound':
            type = 4 /* AssEventType.Sound */;
            break;
    }
    const fields = parseEventLine(formats, value);
    const result = {
        type
    };
    for (let i = 0; i < fields.length; i++) {
        result[formats[i]] = fields[i];
        const fmt = formats[i];
        const fld = fields[i].trim();
        switch (fmt) {
            case 'Layer':
            case 'MarginL':
            case 'MarginR':
            case 'MarginV':
                result[fmt] = +fld;
                break;
            case 'Start':
            case 'End':
                result[fmt] = (0,common_util_time__WEBPACK_IMPORTED_MODULE_2__.hhColonDDColonSSDotMill2Int64)(fld);
                break;
            case 'Effect':
                result[fmt] = (0,ass_compiler_src_parser_effect__WEBPACK_IMPORTED_MODULE_3__.parseEffect)(fld);
                break;
            case 'Text':
                result[fmt] = (0,ass_compiler_src_parser_text__WEBPACK_IMPORTED_MODULE_4__.parseText)(fld);
                break;
            default:
                result[fmt] = fld;
        }
    }
    return result;
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


/***/ }),

/***/ "./node_modules/ass-compiler/src/parser/drawing.js":
/*!*********************************************************!*\
  !*** ./node_modules/ass-compiler/src/parser/drawing.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseDrawing: () => (/* binding */ parseDrawing)
/* harmony export */ });
function parseDrawing(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    // numbers
    .replace(/([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/g, ' $1 ')
    // commands
    .replace(/([mnlbspc])/g, ' $1 ')
    .trim()
    .replace(/\s+/g, ' ')
    .split(/\s(?=[mnlbspc])/)
    .map((cmd) => (
      cmd.split(' ')
        .filter((x, i) => !(i && Number.isNaN(x * 1)))
    ));
}


/***/ }),

/***/ "./node_modules/ass-compiler/src/parser/effect.js":
/*!********************************************************!*\
  !*** ./node_modules/ass-compiler/src/parser/effect.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseEffect: () => (/* binding */ parseEffect)
/* harmony export */ });
function parseEffect(text) {
  const param = text
    .toLowerCase()
    .trim()
    .split(/\s*;\s*/);
  if (param[0] === 'banner') {
    return {
      name: param[0],
      delay: param[1] * 1 || 0,
      leftToRight: param[2] * 1 || 0,
      fadeAwayWidth: param[3] * 1 || 0,
    };
  }
  if (/^scroll\s/.test(param[0])) {
    return {
      name: param[0],
      y1: Math.min(param[1] * 1, param[2] * 1),
      y2: Math.max(param[1] * 1, param[2] * 1),
      delay: param[3] * 1 || 0,
      fadeAwayHeight: param[4] * 1 || 0,
    };
  }
  if (text !== '') {
    return { name: text };
  }
  return null;
}


/***/ }),

/***/ "./node_modules/ass-compiler/src/parser/tag.js":
/*!*****************************************************!*\
  !*** ./node_modules/ass-compiler/src/parser/tag.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseTag: () => (/* binding */ parseTag)
/* harmony export */ });
/* harmony import */ var _drawing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing.js */ "./node_modules/ass-compiler/src/parser/drawing.js");


const numTags = [
  'b', 'i', 'u', 's', 'fsp',
  'k', 'K', 'kf', 'ko', 'kt',
  'fe', 'q', 'p', 'pbo', 'a', 'an',
  'fscx', 'fscy', 'fax', 'fay', 'frx', 'fry', 'frz', 'fr',
  'be', 'blur', 'bord', 'xbord', 'ybord', 'shad', 'xshad', 'yshad',
];

const numRegexs = numTags.map((nt) => ({ name: nt, regex: new RegExp(`^${nt}-?\\d`) }));

function parseTag(text) {
  const tag = {};
  for (let i = 0; i < numRegexs.length; i++) {
    const { name, regex } = numRegexs[i];
    if (regex.test(text)) {
      tag[name] = text.slice(name.length) * 1;
      return tag;
    }
  }
  if (/^fn/.test(text)) {
    tag.fn = text.slice(2);
  } else if (/^r/.test(text)) {
    tag.r = text.slice(1);
  } else if (/^fs[\d+-]/.test(text)) {
    tag.fs = text.slice(2);
  } else if (/^\d?c&?H?[0-9a-fA-F]+|^\d?c$/.test(text)) {
    const [, num, color] = text.match(/^(\d?)c&?H?(\w*)/);
    tag[`c${num || 1}`] = color && `000000${color}`.slice(-6);
  } else if (/^\da&?H?[0-9a-fA-F]+/.test(text)) {
    const [, num, alpha] = text.match(/^(\d)a&?H?([0-9a-f]+)/i);
    tag[`a${num}`] = `00${alpha}`.slice(-2);
  } else if (/^alpha&?H?[0-9a-fA-F]+/.test(text)) {
    [, tag.alpha] = text.match(/^alpha&?H?([0-9a-f]+)/i);
    tag.alpha = `00${tag.alpha}`.slice(-2);
  } else if (/^(?:pos|org|move|fad|fade)\([^)]+/.test(text)) {
    const [, key, value] = text.match(/^(\w+)\((.*?)\)?$/);
    tag[key] = value
      .trim()
      .split(/\s*,\s*/)
      .map(Number);
  } else if (/^i?clip\([^)]+/.test(text)) {
    const p = text
      .match(/^i?clip\((.*?)\)?$/)[1]
      .trim()
      .split(/\s*,\s*/);
    tag.clip = {
      inverse: /iclip/.test(text),
      scale: 1,
      drawing: null,
      dots: null,
    };
    if (p.length === 1) {
      tag.clip.drawing = (0,_drawing_js__WEBPACK_IMPORTED_MODULE_0__.parseDrawing)(p[0]);
    }
    if (p.length === 2) {
      tag.clip.scale = p[0] * 1;
      tag.clip.drawing = (0,_drawing_js__WEBPACK_IMPORTED_MODULE_0__.parseDrawing)(p[1]);
    }
    if (p.length === 4) {
      tag.clip.dots = p.map(Number);
    }
  } else if (/^t\(/.test(text)) {
    const p = text
      .match(/^t\((.*?)\)?$/)[1]
      .trim()
      .replace(/\\.*/, (x) => x.replace(/,/g, '\n'))
      .split(/\s*,\s*/);
    if (!p[0]) return tag;
    tag.t = {
      t1: 0,
      t2: 0,
      accel: 1,
      tags: p[p.length - 1]
        .replace(/\n/g, ',')
        .split('\\')
        .slice(1)
        .map(parseTag),
    };
    if (p.length === 2) {
      tag.t.accel = p[0] * 1;
    }
    if (p.length === 3) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
    }
    if (p.length === 4) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
      tag.t.accel = p[2] * 1;
    }
  }

  return tag;
}


/***/ }),

/***/ "./node_modules/ass-compiler/src/parser/tags.js":
/*!******************************************************!*\
  !*** ./node_modules/ass-compiler/src/parser/tags.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseTags: () => (/* binding */ parseTags)
/* harmony export */ });
/* harmony import */ var _tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag.js */ "./node_modules/ass-compiler/src/parser/tag.js");


function parseTags(text) {
  const tags = [];
  let depth = 0;
  let str = '';
  // `\b\c` -> `b\c\`
  // `a\b\c` -> `b\c\`
  const transText = text.split('\\').slice(1).concat('').join('\\');
  for (let i = 0; i < transText.length; i++) {
    const x = transText[i];
    if (x === '(') depth++;
    if (x === ')') depth--;
    if (depth < 0) depth = 0;
    if (!depth && x === '\\') {
      if (str) {
        tags.push(str);
      }
      str = '';
    } else {
      str += x;
    }
  }
  return tags.map(_tag_js__WEBPACK_IMPORTED_MODULE_0__.parseTag);
}


/***/ }),

/***/ "./node_modules/ass-compiler/src/parser/text.js":
/*!******************************************************!*\
  !*** ./node_modules/ass-compiler/src/parser/text.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseText: () => (/* binding */ parseText)
/* harmony export */ });
/* harmony import */ var _drawing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing.js */ "./node_modules/ass-compiler/src/parser/drawing.js");
/* harmony import */ var _tags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tags.js */ "./node_modules/ass-compiler/src/parser/tags.js");



function parseText(text) {
  const pairs = text.split(/{([^{}]*?)}/);
  const parsed = [];
  if (pairs[0].length) {
    parsed.push({ tags: [], text: pairs[0], drawing: [] });
  }
  for (let i = 1; i < pairs.length; i += 2) {
    const tags = (0,_tags_js__WEBPACK_IMPORTED_MODULE_1__.parseTags)(pairs[i]);
    const isDrawing = tags.reduce((v, tag) => (tag.p === undefined ? v : !!tag.p), false);
    parsed.push({
      tags,
      text: isDrawing ? '' : pairs[i + 1],
      drawing: isDrawing ? (0,_drawing_js__WEBPACK_IMPORTED_MODULE_0__.parseDrawing)(pairs[i + 1]) : [],
    });
  }
  return {
    raw: text,
    combined: parsed.map((frag) => frag.text).join(''),
    parsed,
  };
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IAssFormat_ts.avplayer.js.map