"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_ITtmlFormat_ts"],{

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

/***/ "./src/avformat/formats/ITtmlFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/ITtmlFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ITtmlFormat)
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
/* harmony import */ var _ttml_ittml__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ttml/ittml */ "./src/avformat/formats/ttml/ittml.ts");
var cheap__fileName__12 = "src\\avformat\\formats\\ITtmlFormat.ts";











class ITtmlFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 18 /* AVFormat.TTML */;
    queue;
    index;
    constructor() {
        super();
    }
    init(formatContext) {
        this.queue = [];
    }
    async readHeader(formatContext) {
        const stream = formatContext.createStream();
        stream.codecpar.codecId = 94232 /* AVCodecID.AV_CODEC_ID_TTML */;
        stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
        stream.timeBase.den = 1000;
        stream.timeBase.num = 1;
        let xml = '';
        if (formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */) {
            const fileSize = await formatContext.ioReader.fileSize();
            xml = await formatContext.ioReader.readString((Number(fileSize & 0xffffffffn) >> 0));
        }
        else {
            try {
                xml += await formatContext.ioReader.readLine() + '\n';
            }
            catch (e) { }
        }
        if (common_util_text__WEBPACK_IMPORTED_MODULE_9__) {
            const result = _ttml_ittml__WEBPACK_IMPORTED_MODULE_10__.parse(xml);
            this.queue = result.queue;
            if (result.head) {
                const header = JSON.stringify(result.head);
                const data = common_util_text__WEBPACK_IMPORTED_MODULE_9__.encode(header);
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(data.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(stream.codecpar.extradata, data.length, data);
                stream.codecpar.extradataSize = data.length;
            }
        }
        this.index = 0;
        return 0;
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
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, cue.pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cue.pts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, cue.duration);
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
            if (item.pts > timestamp) {
                return -1;
            }
            return 1;
        });
        if (index >= 0) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in cues, found index: ${index}, pts: ${this.queue[index].pts}`, cheap__fileName__12, 143);
            this.index = Math.max(index - 1, 0);
            while (this.index > 0) {
                if (this.queue[this.index - 1].pts === this.queue[this.index].pts) {
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

/***/ "./src/avformat/formats/ttml/ittml.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/ttml/ittml.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/xml2Json */ "./src/common/util/xml2Json.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/time */ "./src/common/util/time.ts");




function parse(text) {
    const xml = (0,common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__["default"])(text, {
        aloneValueName: 'context'
    });
    if (!xml.tt) {
        return {
            queue: [],
            head: {}
        };
    }
    const queue = [];
    function formatContext(list) {
        let context = '';
        common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(list, ((c) => {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(c)) {
                context += c;
            }
            else {
                if (c.context) {
                    context += `<${c.tagName}>${c.context}</${c.tagName}>`;
                }
                else {
                    context += `<${c.tagName}/>`;
                }
            }
        }));
        return context;
    }
    function add(p, start, end) {
        const pts = (0,common_util_time__WEBPACK_IMPORTED_MODULE_3__.hhColonDDColonSSDotMill2Int64)(start || p.begin);
        let context = p.context || '';
        let region = p.region || 'Default';
        if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(context)) {
            context = formatContext(context);
        }
        if (p.span?.context) {
            if (p.span.region) {
                region = p.span.region;
            }
            if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(p.span.context)) {
                context += p.span.context;
            }
            else {
                context += formatContext(p.span.context);
            }
        }
        queue.push({
            context,
            pts,
            region: region,
            duration: p.dur ? (0,common_util_time__WEBPACK_IMPORTED_MODULE_3__.hhColonDDColonSSDotMill2Int64)(p.dur) : ((0,common_util_time__WEBPACK_IMPORTED_MODULE_3__.hhColonDDColonSSDotMill2Int64)(end || p.end) - pts),
        });
    }
    function praseP(p, start, end) {
        if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(p)) {
            common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(p, (_) => {
                add(_, start, end);
            });
        }
        else {
            add(p, start, end);
        }
    }
    if (xml.tt.body) {
        if (xml.tt.body.div) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(xml.tt.body.div)) {
                common_util_array__WEBPACK_IMPORTED_MODULE_2__.each(xml.tt.body.div, (div) => {
                    if (div.p) {
                        praseP(div.p, div.begin, div.end);
                    }
                });
            }
            else {
                if (xml.tt.body.div.p) {
                    praseP(xml.tt.body.div.p, xml.tt.body.div.begin, xml.tt.body.end);
                }
            }
        }
    }
    return {
        queue,
        head: xml.tt.head || {}
    };
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

/***/ "./src/common/util/xml2Json.ts":
/*!*************************************!*\
  !*** ./src/common/util/xml2Json.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ xml2Json)
/* harmony export */ });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/common/util/array.ts");

const defaultOptions = {
    aloneValueName: '_@attribute'
};
const splitChar = [' ', '/', '"', '\'', '<', '>'];
function xml2Json(xmlStr, options = defaultOptions) {
    // remove commented lines
    xmlStr = xmlStr.replace(/<!--[\s\S]*?-->/g, '');
    // replace special characters
    xmlStr = xmlStr.replace(/[\n\t\r]/g, '');
    // replace leading spaces and tabs between elements
    xmlStr = xmlStr.replace(/>[ \t]+</g, '><');
    // delete docType tags
    xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, '');
    const stack = [];
    let pos = 0;
    function addData(key, value) {
        const item = stack[stack.length - 1];
        if (!item) {
            return;
        }
        if (key !== options.aloneValueName && item.obj[options.aloneValueName] != null) {
            item.obj[options.aloneValueName] = [item.obj[options.aloneValueName], {
                    tagName: key,
                    ...value
                }];
            return;
        }
        if (item.obj[key] == null) {
            item.obj[key] = value;
        }
        else if (Array.isArray(item.obj[key])) {
            item.obj[key].push(value);
        }
        else {
            item.obj[key] = [item.obj[key], value];
        }
    }
    function gotoToken(token) {
        while (pos < xmlStr.length) {
            if (xmlStr[pos] === token) {
                return true;
            }
            pos++;
        }
        return false;
    }
    function readIdentity() {
        skipSpace();
        let key = '';
        while (pos < xmlStr.length) {
            if (_array__WEBPACK_IMPORTED_MODULE_0__.has(splitChar, xmlStr[pos])) {
                break;
            }
            key += xmlStr[pos];
            pos++;
        }
        return key;
    }
    function skipSpace() {
        while (pos < xmlStr.length) {
            if (!/\s|\r|\n/.test(xmlStr[pos])) {
                break;
            }
            pos++;
        }
    }
    const emptyEndReg = /\s/;
    const singleQuotation = /'/;
    const doubleQuotation = /"/;
    function readAttrValue() {
        if (pos >= xmlStr.length) {
            return true;
        }
        skipSpace();
        // 默认属性值结束符为空格
        let end = emptyEndReg;
        if (xmlStr[pos] === '"' || xmlStr[pos] == '\'') {
            // 属性值是引号开始则结束符也是引号
            end = xmlStr[pos] === '"' ? doubleQuotation : singleQuotation;
            pos++;
        }
        let value = '';
        while (pos < xmlStr.length) {
            if (end.test(xmlStr[pos])) {
                pos++;
                break;
            }
            value += xmlStr[pos];
            pos++;
        }
        return value;
    }
    function readAttr() {
        while (true) {
            skipSpace();
            // 判断标签属性结束
            if (xmlStr[pos] === '>' || xmlStr[pos] === '/') {
                break;
            }
            let key = readIdentity();
            if (!key) {
                break;
            }
            if (key[key.length - 1] === '=') {
                key = key.substring(0, key.length - 1);
            }
            else {
                gotoToken('=');
                pos++;
            }
            const value = readAttrValue();
            addData(key, value);
        }
    }
    // innerText 当前位置到 < 之前
    function readText() {
        skipSpace();
        let text = '';
        while (pos < xmlStr.length) {
            if (xmlStr[pos] === '<') {
                break;
            }
            text += xmlStr[pos];
            pos++;
        }
        return text;
    }
    function pop() {
        // 处理 </> 跳出当前 tag
        // 若是 <xx 则是子标签，进入下一次处理 
        while (xmlStr[pos] === '<') {
            const now = pos;
            pos++;
            skipSpace();
            if (xmlStr[pos] === '/') {
                pos++;
                const tag = readIdentity();
                if (tag === stack[stack.length - 1].tag) {
                    if (stack.length > 1) {
                        const item = stack.pop();
                        addData(item.tag, item.obj);
                    }
                    gotoToken('>');
                    pos++;
                    skipSpace();
                }
                else {
                    stack.pop();
                    gotoToken('>');
                    pos++;
                    skipSpace();
                }
            }
            else {
                pos = now;
                break;
            }
        }
    }
    function readTag() {
        if (pos >= xmlStr.length) {
            return;
        }
        let start = pos;
        skipSpace();
        // innerText 的后面部分，中间被标签分割出现这种情况，将其加入 context 中
        if (xmlStr[pos] !== '<') {
            pos = start;
            addData(options.aloneValueName, readText());
            pop();
            return readTag();
        }
        let has = gotoToken('<');
        if (!has) {
            return;
        }
        start = pos;
        pos++;
        const tag = readIdentity();
        stack.push({
            obj: {},
            tag,
            start
        });
        readAttr();
        skipSpace();
        // 自闭合 tag
        if (xmlStr[pos] === '/') {
            pos++;
            if (stack.length > 1) {
                const item = stack.pop();
                addData(item.tag, item.obj);
            }
            gotoToken('>');
            pos++;
            pop();
            return readTag();
        }
        has = gotoToken('>');
        if (!has) {
            return;
        }
        pos++;
        skipSpace();
        // 检查有 innerText 内容
        if (xmlStr[pos] !== '<') {
            addData(options.aloneValueName, readText());
            skipSpace();
        }
        pop();
        readTag();
    }
    readTag();
    return {
        [stack[0].tag]: stack[0].obj
    };
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_ITtmlFormat_ts.avtranscoder.js.map