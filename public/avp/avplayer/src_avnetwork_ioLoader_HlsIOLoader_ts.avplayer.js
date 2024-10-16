"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avnetwork_ioLoader_HlsIOLoader_ts"],{

/***/ "./src/avnetwork/bsp/AVBSPipe.ts":
/*!***************************************!*\
  !*** ./src/avnetwork/bsp/AVBSPipe.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVBSPipe)
/* harmony export */ });
/*
 * libmedia AVBSPipe
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
class AVBSPipe {
    onFlush;
}


/***/ }),

/***/ "./src/avnetwork/bsp/aes/AESDecryptPipe.ts":
/*!*************************************************!*\
  !*** ./src/avnetwork/bsp/aes/AESDecryptPipe.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AESDecryptPipe)
/* harmony export */ });
/* harmony import */ var _AVBSPipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AVBSPipe */ "./src/avnetwork/bsp/AVBSPipe.ts");
/* harmony import */ var common_crypto_aes_AESSoftDecryptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/crypto/aes/AESSoftDecryptor */ "./src/common/crypto/aes/AESSoftDecryptor.ts");
/* harmony import */ var common_crypto_aes_AESWebDecryptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/crypto/aes/AESWebDecryptor */ "./src/common/crypto/aes/AESWebDecryptor.ts");
/* harmony import */ var common_timer_Sleep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/timer/Sleep */ "./src/common/timer/Sleep.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avnetwork\\bsp\\aes\\AESDecryptPipe.ts";





const BLOCK_SIZE = 16;
const REMAINING_LENGTH = BLOCK_SIZE * 2;
let AESWebDecryptorSupport = true;
const PaddingBlock = new Uint8Array(BLOCK_SIZE).fill(BLOCK_SIZE);
class AESDecryptPipe extends _AVBSPipe__WEBPACK_IMPORTED_MODULE_0__["default"] {
    buffer;
    aesSoftDecryptor;
    aesWebDecryptor;
    aesTargetDecryptor;
    pointer;
    endPointer;
    size;
    ended;
    iv;
    key;
    constructor(size = 1048576) {
        super();
        this.size = size;
        this.pointer = 0;
        this.endPointer = 0;
        this.ended = false;
        this.buffer = new Uint8Array(size);
        this.aesSoftDecryptor = new common_crypto_aes_AESSoftDecryptor__WEBPACK_IMPORTED_MODULE_1__["default"]();
        if (common_crypto_aes_AESWebDecryptor__WEBPACK_IMPORTED_MODULE_2__["default"].isSupport() && AESWebDecryptorSupport) {
            this.aesWebDecryptor = new common_crypto_aes_AESWebDecryptor__WEBPACK_IMPORTED_MODULE_2__["default"]();
        }
        this.aesTargetDecryptor = this.aesWebDecryptor || this.aesSoftDecryptor;
    }
    remainingLength() {
        return this.endPointer - this.pointer;
    }
    async expandKey(key, iv) {
        this.key = key;
        this.iv = iv;
        if (this.aesWebDecryptor) {
            await this.aesWebDecryptor.expandKey(key);
        }
        this.aesSoftDecryptor.expandKey(key);
    }
    async flush_(buffer) {
        while (true) {
            const len = await this.onFlush(buffer);
            if (len !== -1048575 /* IOError.AGAIN */) {
                return len;
            }
            await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_3__["default"](0);
        }
    }
    async flush() {
        if (this.size - this.remainingLength() <= 0) {
            return;
        }
        if (this.pointer < this.endPointer) {
            if (this.pointer) {
                this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
                this.endPointer = this.endPointer - this.pointer;
            }
        }
        else {
            this.endPointer = 0;
        }
        this.pointer = 0;
        const len = await this.flush_(this.buffer.subarray(this.endPointer));
        if (len < 0) {
            if (len === -1048576 /* IOError.END */) {
                this.ended = true;
                return;
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal(`AESPipe error, flush failed, ret: ${len}`, cheap__fileName__0, 120);
            }
        }
        this.endPointer += len;
    }
    removePadding(array) {
        const outputBytes = array.length;
        const paddingBytes = outputBytes && new DataView(array.buffer).getUint8(outputBytes - 1);
        if (paddingBytes) {
            return array.subarray(0, outputBytes - paddingBytes);
        }
        return array;
    }
    async decrypt(length) {
        let nextBlock;
        let padding = 0;
        if (this.aesTargetDecryptor === this.aesWebDecryptor && !this.ended) {
            nextBlock = this.buffer.subarray(this.pointer + length, this.pointer + length + BLOCK_SIZE).slice();
            // Web Decryptor 需要每次送入的数据是 padding 的，但这里是流式的，所以需要在每次解密的 buffer 后面追加 16 的 padding 的数据
            // 解密完成之后在设置回原来的数据
            this.buffer.set((await this.aesWebDecryptor.encryptPadding(PaddingBlock, this.buffer.subarray(this.pointer + length - BLOCK_SIZE, this.pointer + length))).subarray(0, BLOCK_SIZE), this.pointer + length);
            padding = BLOCK_SIZE;
        }
        try {
            const encryptData = this.buffer.subarray(this.pointer, this.pointer + length + padding);
            const buffer = await this.aesTargetDecryptor.decrypt(encryptData, this.iv);
            this.iv = encryptData.slice(encryptData.length - BLOCK_SIZE - padding, encryptData.length - padding).buffer;
            if (nextBlock) {
                this.buffer.set(nextBlock, this.pointer + length);
            }
            this.pointer += length;
            return new Uint8Array(buffer);
        }
        catch (error) {
            if (this.aesTargetDecryptor = this.aesWebDecryptor) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.warn('web aes decrypt failed, try to use soft decryptor', cheap__fileName__0, 169);
                if (nextBlock) {
                    this.buffer.set(nextBlock, this.pointer + length);
                }
                this.aesTargetDecryptor = this.aesSoftDecryptor;
                AESWebDecryptorSupport = false;
                return this.decrypt(length);
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.fatal('aes decrypt failed', cheap__fileName__0, 179);
            }
        }
    }
    async read(buffer) {
        while (!this.ended && this.remainingLength() < (REMAINING_LENGTH + BLOCK_SIZE)) {
            await this.flush();
        }
        if (this.remainingLength() === 0) {
            return -1048576 /* IOError.END */;
        }
        const length = Math.min(Math.floor((this.remainingLength() - (this.ended ? 0 : REMAINING_LENGTH)) / BLOCK_SIZE) * BLOCK_SIZE, buffer.length);
        let decryptBuffer = await this.decrypt(length);
        if (this.ended && this.aesTargetDecryptor === this.aesSoftDecryptor) {
            decryptBuffer = this.removePadding(decryptBuffer);
        }
        buffer.set(decryptBuffer);
        return decryptBuffer.length;
    }
}


/***/ }),

/***/ "./src/avnetwork/ioLoader/HlsIOLoader.ts":
/*!***********************************************!*\
  !*** ./src/avnetwork/ioLoader/HlsIOLoader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HlsIOLoader)
/* harmony export */ });
/* harmony import */ var common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/timer/Sleep */ "./src/common/timer/Sleep.ts");
/* harmony import */ var _IOLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IOLoader */ "./src/avnetwork/ioLoader/IOLoader.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/url */ "./src/common/util/url.ts");
/* harmony import */ var avprotocol_m3u8_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avprotocol/m3u8/parser */ "./src/avprotocol/m3u8/parser.ts");
/* harmony import */ var _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FetchIOLoader */ "./src/avnetwork/ioLoader/FetchIOLoader.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _bsp_aes_AESDecryptPipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../bsp/aes/AESDecryptPipe */ "./src/avnetwork/bsp/aes/AESDecryptPipe.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__0 = "src\\avnetwork\\ioLoader\\HlsIOLoader.ts";
/*
 * libmedia hls loader
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











const FETCHED_HISTORY_LIST_MAX = 10;
class HlsIOLoader extends _IOLoader__WEBPACK_IMPORTED_MODULE_1__["default"] {
    info;
    range;
    masterPlaylist;
    mediaPlayList;
    mediaPlayListIndex;
    fetchedMap;
    fetchedHistoryList;
    mediaListUrl;
    segmentIndex;
    currentUri;
    loader;
    minBuffer;
    keyMap;
    currentIV;
    currentKey;
    aesDecryptPipe;
    initLoaded;
    async fetchMasterPlayList() {
        const params = {
            method: 'GET',
            headers: {},
            mode: 'cors',
            cache: 'default',
            referrerPolicy: 'no-referrer-when-downgrade'
        };
        if (this.info.headers) {
            common_util_object__WEBPACK_IMPORTED_MODULE_2__.each(this.info.headers, (value, key) => {
                params.headers[key] = value;
            });
        }
        if (this.info.withCredentials) {
            params.credentials = 'include';
        }
        if (this.info.referrerPolicy) {
            params.referrerPolicy = this.info.referrerPolicy;
        }
        try {
            const res = await fetch(this.info.url, params);
            const text = await res.text();
            const playList = (0,avprotocol_m3u8_parser__WEBPACK_IMPORTED_MODULE_4__["default"])(text);
            if (playList.isMasterPlaylist) {
                this.masterPlaylist = playList;
            }
            else {
                this.mediaPlayList = playList;
                if (this.options.isLive && (!this.mediaPlayList.segments || this.mediaPlayList.segments.length < 2)) {
                    let wait = 5;
                    if (this.mediaPlayList.segments?.length) {
                        wait = this.mediaPlayList.segments[0].duration * (2 - this.mediaPlayList.segments.length);
                    }
                    common_util_logger__WEBPACK_IMPORTED_MODULE_7__.warn(`wait for min buffer time, now segments: ${this.mediaPlayList.segments.length}`, cheap__fileName__0, 122);
                    await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](wait);
                    return this.fetchMasterPlayList();
                }
                this.minBuffer = this.mediaPlayList.duration || 0;
                if (this.mediaPlayList.endlist) {
                    this.options.isLive = false;
                }
                this.mediaListUrl = this.info.url;
            }
            return playList;
        }
        catch (error) {
            if (this.retryCount < this.options.retryCount) {
                this.retryCount++;
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`failed fetch m3u8 file, retry(${this.retryCount}/3)`, cheap__fileName__0, 139);
                await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](5);
                return this.fetchMasterPlayList();
            }
            else {
                this.status = 3 /* IOLoaderStatus.ERROR */;
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.fatal('HLSLoader: exception, fetch slice error', cheap__fileName__0, 145);
            }
        }
    }
    async fetchMediaPlayList() {
        let url;
        if (this.masterPlaylist) {
            const currentVariant = this.masterPlaylist.variants[this.mediaPlayListIndex];
            if (!currentVariant) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.fatal('no media playlist', cheap__fileName__0, 157);
            }
            url = currentVariant.uri;
        }
        else {
            url = this.mediaListUrl;
        }
        if (!/^https?/.test(url)) {
            url = common_util_url__WEBPACK_IMPORTED_MODULE_3__.buildAbsoluteURL(this.info.url, url);
        }
        this.mediaListUrl = url;
        const params = {
            method: 'GET',
            headers: {},
            mode: 'cors',
            cache: 'default',
            referrerPolicy: 'no-referrer-when-downgrade'
        };
        if (this.info.headers) {
            common_util_object__WEBPACK_IMPORTED_MODULE_2__.each(this.info.headers, (value, key) => {
                params.headers[key] = value;
            });
        }
        if (this.info.withCredentials) {
            params.credentials = 'include';
        }
        if (this.info.referrerPolicy) {
            params.referrerPolicy = this.info.referrerPolicy;
        }
        try {
            const res = await fetch(url, params);
            const text = await res.text();
            this.mediaPlayList = (0,avprotocol_m3u8_parser__WEBPACK_IMPORTED_MODULE_4__["default"])(text);
            if (this.options.isLive && (!this.mediaPlayList.segments || this.mediaPlayList.segments.length < 2)) {
                let wait = 5;
                if (this.mediaPlayList.segments?.length) {
                    wait = this.mediaPlayList.segments[0].duration * (2 - this.mediaPlayList.segments.length);
                }
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.warn(`wait for min buffer time, now segments: ${this.mediaPlayList.segments.length}`, cheap__fileName__0, 202);
                await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](wait);
                return this.fetchMediaPlayList();
            }
            this.minBuffer = this.mediaPlayList.duration || 0;
            if (this.mediaPlayList.endlist) {
                this.options.isLive = false;
            }
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
            this.retryCount = 0;
            return this.mediaPlayList;
        }
        catch (error) {
            if (this.retryCount < this.options.retryCount) {
                this.retryCount++;
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`failed fetch m3u8 file, retry(${this.retryCount}/3)`, cheap__fileName__0, 221);
                await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](this.options.retryInterval);
                return this.fetchMasterPlayList();
            }
            else {
                this.status = 3 /* IOLoaderStatus.ERROR */;
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.fatal('HLSLoader: exception, fetch slice error', cheap__fileName__0, 227);
            }
        }
    }
    async open(info, range) {
        this.info = info;
        this.range = range;
        if (!this.range.to) {
            this.range.to = -1;
        }
        this.range.from = Math.max(this.range.from, 0);
        this.mediaPlayListIndex = 0;
        this.segmentIndex = 0;
        this.fetchedMap = new Map();
        this.fetchedHistoryList = [];
        this.status = 1 /* IOLoaderStatus.CONNECTING */;
        this.retryCount = 0;
        this.keyMap = new Map();
        await this.fetchMasterPlayList();
        if (!this.mediaPlayList && this.masterPlaylist) {
            await this.fetchMediaPlayList();
        }
        this.initLoaded = true;
        if (this.mediaPlayList.segments.length && this.mediaPlayList.segments[0].map) {
            this.initLoaded = false;
        }
    }
    async checkNeedDecrypt(segment, sequence) {
        if (!segment.key) {
            return;
        }
        const keyUrl = segment.key.uri;
        if (this.keyMap.has(keyUrl)) {
            this.currentKey = this.keyMap.get(keyUrl);
        }
        else {
            this.currentKey = await (await fetch((0,common_util_url__WEBPACK_IMPORTED_MODULE_3__.buildAbsoluteURL)(this.mediaListUrl, keyUrl))).arrayBuffer();
            this.keyMap.set(keyUrl, this.currentKey);
        }
        if (segment.key.iv) {
            this.currentIV = segment.key.iv.buffer;
        }
        else {
            const iv = new Uint8Array(16);
            const dataView = new DataView(iv.buffer);
            dataView.setUint32(12, sequence, false);
            this.currentIV = iv.buffer;
        }
        this.aesDecryptPipe = new _bsp_aes_AESDecryptPipe__WEBPACK_IMPORTED_MODULE_8__["default"]();
        this.aesDecryptPipe.onFlush = async (buffer) => {
            return this.loader.read(buffer);
        };
        await this.aesDecryptPipe.expandKey(this.currentKey, this.currentIV);
    }
    async read(buffer) {
        let ret = 0;
        if (this.loader) {
            ret = this.aesDecryptPipe ? (await this.aesDecryptPipe.read(buffer)) : (await this.loader.read(buffer));
            if (ret !== -1048576 /* IOError.END */) {
                return ret;
            }
            else {
                if (this.initLoaded) {
                    if (this.options.isLive) {
                        this.fetchedMap.set(this.currentUri, true);
                        if (this.fetchedHistoryList.length === FETCHED_HISTORY_LIST_MAX) {
                            this.fetchedMap.delete(this.fetchedHistoryList.shift());
                        }
                        this.fetchedHistoryList.push(this.currentUri);
                        this.segmentIndex++;
                    }
                    else {
                        this.segmentIndex++;
                        if (this.segmentIndex >= this.mediaPlayList.segments.length) {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_7__.info('hls segments ended', cheap__fileName__0, 321);
                            this.status = 4 /* IOLoaderStatus.COMPLETE */;
                            return -1048576 /* IOError.END */;
                        }
                    }
                }
                else {
                    this.initLoaded = true;
                }
                this.loader = null;
            }
        }
        if (this.options.isLive) {
            const segments = this.mediaPlayList.segments.filter((segment) => {
                return !this.fetchedMap.get(segment.uri);
            });
            if (!segments.length) {
                if (this.mediaPlayList.endlist) {
                    this.status = 4 /* IOLoaderStatus.COMPLETE */;
                    return -1048576 /* IOError.END */;
                }
                const wait = (this.minBuffer - ((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__["default"])() - this.mediaPlayList.timestamp) / 1000) / 2;
                if (wait > 0) {
                    await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](wait);
                }
                await this.fetchMediaPlayList();
                return this.read(buffer);
            }
            this.currentUri = segments[0].uri;
            if (this.initLoaded) {
                await this.checkNeedDecrypt(segments[0], this.segmentIndex);
            }
            this.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            const url = (0,common_util_url__WEBPACK_IMPORTED_MODULE_3__.buildAbsoluteURL)(this.mediaListUrl, this.initLoaded ? this.currentUri : segments[0].map.uri);
            const range = {
                from: 0,
                to: -1
            };
            const byteRange = this.initLoaded ? segments[0].byterange : segments[0].map.byterange;
            if (byteRange) {
                range.from = byteRange.offset;
                range.to = byteRange.offset + byteRange.length;
            }
            await this.loader.open({
                url
            }, range);
            return this.aesDecryptPipe ? this.aesDecryptPipe.read(buffer) : this.loader.read(buffer);
        }
        else {
            this.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            let segment = this.mediaPlayList.segments[this.segmentIndex];
            while (!segment.uri) {
                segment = this.mediaPlayList.segments[++this.segmentIndex];
            }
            if (this.initLoaded) {
                await this.checkNeedDecrypt(segment, this.segmentIndex);
            }
            const url = (0,common_util_url__WEBPACK_IMPORTED_MODULE_3__.buildAbsoluteURL)(this.mediaListUrl, this.initLoaded ? segment.uri : segment.map.uri);
            const range = {
                from: 0,
                to: -1
            };
            const byteRange = this.initLoaded ? segment.byterange : segment.map.byterange;
            if (byteRange) {
                range.from = byteRange.offset;
                range.to = byteRange.offset + byteRange.length;
            }
            await this.loader.open({
                url
            }, range);
            return this.aesDecryptPipe ? this.aesDecryptPipe.read(buffer) : this.loader.read(buffer);
        }
    }
    async seek(timestamp) {
        if (this.loader) {
            await this.loader.abort();
            this.loader = null;
        }
        let duration = 0;
        let seekTime = Number(timestamp);
        let index = 0;
        for (let i = 0; i < this.mediaPlayList.segments.length; i++) {
            if (common_util_is__WEBPACK_IMPORTED_MODULE_9__.number(this.mediaPlayList.segments[i].duration)) {
                duration += this.mediaPlayList.segments[i].duration;
                if (duration * 1000 >= seekTime) {
                    index = i;
                    break;
                }
            }
        }
        this.segmentIndex = index;
        if (this.status === 4 /* IOLoaderStatus.COMPLETE */) {
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
        }
    }
    async size() {
        return BigInt(0);
    }
    async abort() {
        if (this.loader) {
            await this.loader.abort();
            this.loader = null;
        }
    }
    async stop() {
        await this.abort();
        this.status = 0 /* IOLoaderStatus.IDLE */;
    }
    getDuration() {
        return this.mediaPlayList.duration;
    }
    getVideoList() {
        return {
            list: this.masterPlaylist?.variants.map((variant) => {
                return {
                    width: variant.resolution?.width ?? 0,
                    height: variant.resolution?.height ?? 0,
                    frameRate: variant.frameRate ?? 0,
                    codecs: variant.codecs
                };
            }) ?? [],
            selectedIndex: 0
        };
    }
    selectVideo(index) {
        this.mediaPlayListIndex = index;
        this.fetchMediaPlayList();
    }
    getMinBuffer() {
        return this.minBuffer;
    }
}


/***/ }),

/***/ "./src/avprotocol/m3u8/parser.ts":
/*!***************************************!*\
  !*** ./src/avprotocol/m3u8/parser.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/avprotocol/m3u8/utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/avprotocol/m3u8/types.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avprotocol\\m3u8\\parser.ts";
/**
 * from https://github.com/kuu/hls-parser/blob/master/parse.ts
 * MIT license
 *
 */



function unquote(str) {
    return _utils__WEBPACK_IMPORTED_MODULE_0__.trim(str, '"');
}
function getTagCategory(tagName) {
    switch (tagName) {
        case 'EXTM3U':
        case 'EXT-X-VERSION':
            return 'Basic';
        case 'EXTINF':
        case 'EXT-X-BYTERANGE':
        case 'EXT-X-DISCONTINUITY':
        case 'EXT-X-PREFETCH-DISCONTINUITY':
        case 'EXT-X-KEY':
        case 'EXT-X-MAP':
        case 'EXT-X-PROGRAM-DATE-TIME':
        case 'EXT-X-DATERANGE':
        case 'EXT-X-CUE-OUT':
        case 'EXT-X-CUE-IN':
        case 'EXT-X-CUE-OUT-CONT':
        case 'EXT-X-CUE':
        case 'EXT-OATCLS-SCTE35':
        case 'EXT-X-ASSET':
        case 'EXT-X-SCTE35':
        case 'EXT-X-PART':
        case 'EXT-X-PRELOAD-HINT':
            return 'Segment';
        case 'EXT-X-TARGETDURATION':
        case 'EXT-X-MEDIA-SEQUENCE':
        case 'EXT-X-DISCONTINUITY-SEQUENCE':
        case 'EXT-X-ENDLIST':
        case 'EXT-X-PLAYLIST-TYPE':
        case 'EXT-X-I-FRAMES-ONLY':
        case 'EXT-X-SERVER-CONTROL':
        case 'EXT-X-PART-INF':
        case 'EXT-X-PREFETCH':
        case 'EXT-X-RENDITION-REPORT':
        case 'EXT-X-SKIP':
            return 'MediaPlaylist';
        case 'EXT-X-MEDIA':
        case 'EXT-X-STREAM-INF':
        case 'EXT-X-I-FRAME-STREAM-INF':
        case 'EXT-X-SESSION-DATA':
        case 'EXT-X-SESSION-KEY':
            return 'MasterPlaylist';
        case 'EXT-X-INDEPENDENT-SEGMENTS':
        case 'EXT-X-START':
            return 'MediaorMasterPlaylist';
        default:
            return 'Unknown';
    }
}
function parseEXTINF(param) {
    const pair = _utils__WEBPACK_IMPORTED_MODULE_0__.splitAt(param, ',');
    return { duration: _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(pair[0]), title: decodeURIComponent(escape(pair[1])) };
}
function parseBYTERANGE(param) {
    const pair = _utils__WEBPACK_IMPORTED_MODULE_0__.splitAt(param, '@');
    return { length: _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(pair[0]), offset: pair[1] ? _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(pair[1]) : -1 };
}
function parseResolution(str) {
    const pair = _utils__WEBPACK_IMPORTED_MODULE_0__.splitAt(str, 'x');
    return { width: _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(pair[0]), height: _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(pair[1]) };
}
function parseAllowedCpc(str) {
    const message = 'ALLOWED-CPC: Each entry must consit of KEYFORMAT and Content Protection Configuration';
    const list = str.split(',');
    if (list.length === 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(message, cheap__fileName__0, 102);
    }
    const allowedCpcList = [];
    for (const item of list) {
        const [format, cpcText] = _utils__WEBPACK_IMPORTED_MODULE_0__.splitAt(item, ':');
        if (!format || !cpcText) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(message, cheap__fileName__0, 108);
            continue;
        }
        allowedCpcList.push({ format, cpcList: cpcText.split('/') });
    }
    return allowedCpcList;
}
function parseIV(str) {
    const iv = _utils__WEBPACK_IMPORTED_MODULE_0__.hexToByteSequence(str);
    if (iv.length !== 16) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('IV must be a 128-bit unsigned integer', cheap__fileName__0, 119);
    }
    return iv;
}
function parseUserAttribute(str) {
    if (str.startsWith('"')) {
        return unquote(str);
    }
    if (str.startsWith('0x') || str.startsWith('0X')) {
        return _utils__WEBPACK_IMPORTED_MODULE_0__.hexToByteSequence(str);
    }
    return _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(str);
}
function setCompatibleVersionOfKey(params, attributes) {
    if (attributes['IV'] && params.compatibleVersion < 2) {
        params.compatibleVersion = 2;
    }
    if ((attributes['KEYFORMAT'] || attributes['KEYFORMATVERSIONS']) && params.compatibleVersion < 5) {
        params.compatibleVersion = 5;
    }
}
function parseAttributeList(param) {
    const attributes = {};
    for (const item of _utils__WEBPACK_IMPORTED_MODULE_0__.splitByCommaWithPreservingQuotes(param)) {
        const [key, value] = _utils__WEBPACK_IMPORTED_MODULE_0__.splitAt(item, '=');
        const val = unquote(value);
        switch (key) {
            case 'URI':
                attributes[key] = val;
                break;
            case 'START-DATE':
            case 'END-DATE':
                attributes[key] = new Date(val);
                break;
            case 'IV':
                attributes[key] = parseIV(val);
                break;
            case 'BYTERANGE':
                attributes[key] = parseBYTERANGE(val);
                break;
            case 'RESOLUTION':
                attributes[key] = parseResolution(val);
                break;
            case 'ALLOWED-CPC':
                attributes[key] = parseAllowedCpc(val);
                break;
            case 'END-ON-NEXT':
            case 'DEFAULT':
            case 'AUTOSELECT':
            case 'FORCED':
            case 'PRECISE':
            case 'CAN-BLOCK-RELOAD':
            case 'INDEPENDENT':
            case 'GAP':
                attributes[key] = val === 'YES';
                break;
            case 'DURATION':
            case 'PLANNED-DURATION':
            case 'BANDWIDTH':
            case 'AVERAGE-BANDWIDTH':
            case 'FRAME-RATE':
            case 'TIME-OFFSET':
            case 'CAN-SKIP-UNTIL':
            case 'HOLD-BACK':
            case 'PART-HOLD-BACK':
            case 'PART-TARGET':
            case 'BYTERANGE-START':
            case 'BYTERANGE-LENGTH':
            case 'LAST-MSN':
            case 'LAST-PART':
            case 'SKIPPED-SEGMENTS':
            case 'SCORE':
            case 'PROGRAM-ID':
                attributes[key] = _utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(val);
                break;
            default:
                if (key.startsWith('SCTE35-')) {
                    attributes[key] = _utils__WEBPACK_IMPORTED_MODULE_0__.hexToByteSequence(val);
                }
                else if (key.startsWith('X-')) {
                    attributes[key] = parseUserAttribute(value);
                }
                else {
                    if (key === 'VIDEO-RANGE' && val !== 'SDR' && val !== 'HLG' && val !== 'PQ') {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal(`VIDEO-RANGE: unknown value "${val}"`, cheap__fileName__0, 206);
                    }
                    attributes[key] = val;
                }
        }
    }
    return attributes;
}
function parseTagParam(name, param) {
    switch (name) {
        case 'EXTM3U':
        case 'EXT-X-DISCONTINUITY':
        case 'EXT-X-ENDLIST':
        case 'EXT-X-I-FRAMES-ONLY':
        case 'EXT-X-INDEPENDENT-SEGMENTS':
        case 'EXT-X-CUE-IN':
            return [null, null];
        case 'EXT-X-VERSION':
        case 'EXT-X-TARGETDURATION':
        case 'EXT-X-MEDIA-SEQUENCE':
        case 'EXT-X-DISCONTINUITY-SEQUENCE':
            return [_utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(param), null];
        case 'EXT-X-CUE-OUT':
            // For backwards compatibility: attributes list is optional,
            // if only a number is found, use it as the duration
            if (!Number.isNaN(Number(param))) {
                return [_utils__WEBPACK_IMPORTED_MODULE_0__.toNumber(param), null];
            }
            // If attributes are found, parse them out (i.e. DURATION)
            return [null, parseAttributeList(param)];
        case 'EXT-X-KEY':
        case 'EXT-X-MAP':
        case 'EXT-X-DATERANGE':
        case 'EXT-X-MEDIA':
        case 'EXT-X-STREAM-INF':
        case 'EXT-X-I-FRAME-STREAM-INF':
        case 'EXT-X-SESSION-DATA':
        case 'EXT-X-SESSION-KEY':
        case 'EXT-X-START':
        case 'EXT-X-SERVER-CONTROL':
        case 'EXT-X-PART-INF':
        case 'EXT-X-PART':
        case 'EXT-X-PRELOAD-HINT':
        case 'EXT-X-RENDITION-REPORT':
        case 'EXT-X-SKIP':
            return [null, parseAttributeList(param)];
        case 'EXTINF':
            return [parseEXTINF(param), null];
        case 'EXT-X-BYTERANGE':
            return [parseBYTERANGE(param), null];
        case 'EXT-X-PROGRAM-DATE-TIME':
            return [new Date(param), null];
        case 'EXT-X-PLAYLIST-TYPE':
            // <EVENT|VOD>
            return [param, null];
        default:
            // Unknown tag
            return [param, null];
    }
}
function splitTag(line) {
    const index = line.indexOf(':');
    if (index === -1) {
        return [line.slice(1).trim(), null];
    }
    return [line.slice(1, index).trim(), line.slice(index + 1).trim()];
}
function parseRendition({ attributes }) {
    const rendition = new _types__WEBPACK_IMPORTED_MODULE_1__.Rendition({
        type: attributes['TYPE'],
        uri: attributes['URI'],
        groupId: attributes['GROUP-ID'],
        language: attributes['LANGUAGE'],
        assocLanguage: attributes['ASSOC-LANGUAGE'],
        name: attributes['NAME'],
        isDefault: attributes['DEFAULT'],
        autoselect: attributes['AUTOSELECT'],
        forced: attributes['FORCED'],
        instreamId: attributes['INSTREAM-ID'],
        characteristics: attributes['CHARACTERISTICS'],
        channels: attributes['CHANNELS']
    });
    return rendition;
}
function checkRedundantRendition(renditions, rendition) {
    let defaultFound = false;
    for (const item of renditions) {
        if (item.name === rendition.name) {
            return 'All EXT-X-MEDIA tags in the same Group MUST have different NAME attributes.';
        }
        if (item.isDefault) {
            defaultFound = true;
        }
    }
    if (defaultFound && rendition.isDefault) {
        return 'EXT-X-MEDIA A Group MUST NOT have more than one member with a DEFAULT attribute of YES.';
    }
    return '';
}
function addRendition(variant, line, type) {
    const rendition = parseRendition(line);
    const renditions = variant[_utils__WEBPACK_IMPORTED_MODULE_0__.camelify(type)];
    const errorMessage = checkRedundantRendition(renditions, rendition);
    if (errorMessage) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal(errorMessage, cheap__fileName__0, 315);
    }
    renditions.push(rendition);
    if (rendition.isDefault) {
        variant.currentRenditions[_utils__WEBPACK_IMPORTED_MODULE_0__.camelify(type)] = renditions.length - 1;
    }
}
function matchTypes(attrs, variant, params) {
    for (const type of ['AUDIO', 'VIDEO', 'SUBTITLES', 'CLOSED-CAPTIONS']) {
        if (type === 'CLOSED-CAPTIONS' && attrs[type] === 'NONE') {
            params.isClosedCaptionsNone = true;
            variant.closedCaptions = [];
        }
        else if (attrs[type] && !variant[_utils__WEBPACK_IMPORTED_MODULE_0__.camelify(type)].some((item) => item.groupId === attrs[type])) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal(`${type} attribute MUST match the value of the GROUP-ID attribute of an EXT-X-MEDIA tag whose TYPE attribute is ${type}.`, cheap__fileName__0, 330);
        }
    }
}
function parseVariant(lines, variantAttrs, uri, iFrameOnly, params) {
    const variant = new _types__WEBPACK_IMPORTED_MODULE_1__.Variant({
        uri,
        bandwidth: variantAttrs['BANDWIDTH'],
        averageBandwidth: variantAttrs['AVERAGE-BANDWIDTH'],
        score: variantAttrs['SCORE'],
        codecs: variantAttrs['CODECS'],
        resolution: variantAttrs['RESOLUTION'],
        frameRate: variantAttrs['FRAME-RATE'],
        hdcpLevel: variantAttrs['HDCP-LEVEL'],
        allowedCpc: variantAttrs['ALLOWED-CPC'],
        videoRange: variantAttrs['VIDEO-RANGE'],
        stableVariantId: variantAttrs['STABLE-VARIANT-ID'],
        programId: variantAttrs['PROGRAM-ID']
    });
    for (const line of lines) {
        if (line.name === 'EXT-X-MEDIA') {
            const renditionAttrs = line.attributes;
            const renditionType = renditionAttrs['TYPE'];
            if (!renditionType || !renditionAttrs['GROUP-ID']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-MEDIA TYPE attribute is REQUIRED.', cheap__fileName__0, 355);
            }
            if (variantAttrs[renditionType] === renditionAttrs['GROUP-ID']) {
                addRendition(variant, line, renditionType);
                if (renditionType === 'CLOSED-CAPTIONS') {
                    for (const { instreamId } of variant.closedCaptions) {
                        if (instreamId && instreamId.startsWith('SERVICE') && params.compatibleVersion < 7) {
                            params.compatibleVersion = 7;
                            break;
                        }
                    }
                }
            }
        }
    }
    matchTypes(variantAttrs, variant, params);
    variant.isIFrameOnly = iFrameOnly;
    return variant;
}
function sameKey(key1, key2) {
    if (key1.method !== key2.method) {
        return false;
    }
    if (key1.uri !== key2.uri) {
        return false;
    }
    if (key1.iv) {
        if (!key2.iv) {
            return false;
        }
        if (key1.iv.length !== key2.iv.length) {
            return false;
        }
        for (let i = 0; i < key1.iv.length; i++) {
            if (key1.iv[i] !== key2.iv[i]) {
                return false;
            }
        }
    }
    else if (key2.iv) {
        return false;
    }
    if (key1.format !== key2.format) {
        return false;
    }
    if (key1.formatVersion !== key2.formatVersion) {
        return false;
    }
    return true;
}
function parseMasterPlaylist(lines, params) {
    const playlist = new _types__WEBPACK_IMPORTED_MODULE_1__.MasterPlaylist();
    let variantIsScored = false;
    for (const [index, { name, value, attributes }] of lines.entries()) {
        if (name === 'EXT-X-VERSION') {
            playlist.version = value;
        }
        else if (name === 'EXT-X-STREAM-INF') {
            const uri = lines[index + 1];
            if (typeof uri !== 'string' || uri.startsWith('#EXT')) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-STREAM-INF must be followed by a URI line', cheap__fileName__0, 417);
            }
            const variant = parseVariant(lines, attributes, uri, false, params);
            if (variant) {
                if (typeof variant.score === 'number') {
                    variantIsScored = true;
                    if (variant.score < 0) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('SCORE attribute on EXT-X-STREAM-INF must be positive decimal-floating-point number.', cheap__fileName__0, 424);
                    }
                }
                playlist.variants.push(variant);
            }
        }
        else if (name === 'EXT-X-I-FRAME-STREAM-INF') {
            const variant = parseVariant(lines, attributes, attributes.URI, true, params);
            if (variant) {
                playlist.variants.push(variant);
            }
        }
        else if (name === 'EXT-X-SESSION-DATA') {
            const sessionData = new _types__WEBPACK_IMPORTED_MODULE_1__.SessionData({
                id: attributes['DATA-ID'],
                value: attributes['VALUE'],
                uri: attributes['URI'],
                language: attributes['LANGUAGE']
            });
            if (playlist.sessionDataList.some((item) => item.id === sessionData.id && item.language === sessionData.language)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A Playlist MUST NOT contain more than one EXT-X-SESSION-DATA tag with the same DATA-ID attribute and the same LANGUAGE attribute.', cheap__fileName__0, 444);
            }
            playlist.sessionDataList.push(sessionData);
        }
        else if (name === 'EXT-X-SESSION-KEY') {
            if (attributes['METHOD'] === 'NONE') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-SESSION-KEY: The value of the METHOD attribute MUST NOT be NONE', cheap__fileName__0, 450);
            }
            const sessionKey = new _types__WEBPACK_IMPORTED_MODULE_1__.Key({
                method: attributes['METHOD'],
                uri: attributes['URI'],
                iv: attributes['IV'],
                format: attributes['KEYFORMAT'],
                formatVersion: attributes['KEYFORMATVERSIONS']
            });
            if (playlist.sessionKeyList.some((item) => sameKey(item, sessionKey))) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A Master Playlist MUST NOT contain more than one EXT-X-SESSION-KEY tag with the same METHOD, URI, IV, KEYFORMAT, and KEYFORMATVERSIONS attribute values.', cheap__fileName__0, 460);
            }
            setCompatibleVersionOfKey(params, attributes);
            playlist.sessionKeyList.push(sessionKey);
        }
        else if (name === 'EXT-X-INDEPENDENT-SEGMENTS') {
            if (playlist.independentSegments) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-INDEPENDENT-SEGMENTS tag MUST NOT appear more than once in a Playlist', cheap__fileName__0, 467);
            }
            playlist.independentSegments = true;
        }
        else if (name === 'EXT-X-START') {
            if (playlist.start) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-START tag MUST NOT appear more than once in a Playlist', cheap__fileName__0, 473);
            }
            if (typeof attributes['TIME-OFFSET'] !== 'number') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-START: TIME-OFFSET attribute is REQUIRED', cheap__fileName__0, 476);
            }
            playlist.start = { offset: attributes['TIME-OFFSET'], precise: attributes['PRECISE'] || false };
        }
    }
    if (variantIsScored) {
        for (const variant of playlist.variants) {
            if (typeof variant.score !== 'number') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If any Variant Stream contains the SCORE attribute, then all Variant Streams in the Master Playlist SHOULD have a SCORE attribute', cheap__fileName__0, 484);
            }
        }
    }
    if (params.isClosedCaptionsNone) {
        for (const variant of playlist.variants) {
            if (variant.closedCaptions.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If there is a variant with CLOSED-CAPTIONS attribute of NONE, all EXT-X-STREAM-INF tags MUST have this attribute with a value of NONE', cheap__fileName__0, 491);
            }
        }
    }
    return playlist;
}
function parseSegment(lines, uri, start, end, mediaSequenceNumber, discontinuitySequence, params) {
    const segment = new _types__WEBPACK_IMPORTED_MODULE_1__.Segment({ uri, mediaSequenceNumber, discontinuitySequence });
    let mapHint = false;
    let partHint = false;
    for (let i = start; i <= end; i++) {
        const { name, value, attributes } = lines[i];
        if (name === 'EXTINF') {
            if (!Number.isInteger(value.duration) && params.compatibleVersion < 3) {
                params.compatibleVersion = 3;
            }
            if (Math.round(value.duration) > params.targetDuration) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXTINF duration, when rounded to the nearest integer, MUST be less than or equal to the target duration', cheap__fileName__0, 517);
            }
            segment.duration = value.duration;
            segment.title = value.title;
        }
        else if (name === 'EXT-X-BYTERANGE') {
            if (params.compatibleVersion < 4) {
                params.compatibleVersion = 4;
            }
            segment.byterange = value;
        }
        else if (name === 'EXT-X-DISCONTINUITY') {
            if (segment.parts.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-DISCONTINUITY must appear before the first EXT-X-PART tag of the Parent Segment.', cheap__fileName__0, 530);
            }
            segment.discontinuity = true;
        }
        else if (name === 'EXT-X-KEY') {
            if (segment.parts.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-KEY must appear before the first EXT-X-PART tag of the Parent Segment.', cheap__fileName__0, 536);
            }
            if (attributes['METHOD'] !== 'NONE') {
                setCompatibleVersionOfKey(params, attributes);
                segment.key = new _types__WEBPACK_IMPORTED_MODULE_1__.Key({
                    method: attributes['METHOD'],
                    uri: attributes['URI'],
                    iv: attributes['IV'],
                    format: attributes['KEYFORMAT'],
                    formatVersion: attributes['KEYFORMATVERSIONS']
                });
            }
        }
        else if (name === 'EXT-X-MAP') {
            if (segment.parts.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-MAP must appear before the first EXT-X-PART tag of the Parent Segment.', cheap__fileName__0, 552);
            }
            if (params.compatibleVersion < 5) {
                params.compatibleVersion = 5;
            }
            params.hasMap = true;
            segment.map = new _types__WEBPACK_IMPORTED_MODULE_1__.MediaInitializationSection({
                uri: attributes['URI'],
                byterange: attributes['BYTERANGE']
            });
        }
        else if (name === 'EXT-X-PROGRAM-DATE-TIME') {
            segment.programDateTime = value;
        }
        else if (name === 'EXT-X-DATERANGE') {
            const attrs = {};
            for (const key of Object.keys(attributes)) {
                if (key.startsWith('SCTE35-') || key.startsWith('X-')) {
                    attrs[key] = attributes[key];
                }
            }
            segment.dateRange = new _types__WEBPACK_IMPORTED_MODULE_1__.DateRange({
                id: attributes['ID'],
                classId: attributes['CLASS'],
                start: attributes['START-DATE'],
                end: attributes['END-DATE'],
                duration: attributes['DURATION'],
                plannedDuration: attributes['PLANNED-DURATION'],
                endOnNext: attributes['END-ON-NEXT'],
                attributes: attrs
            });
        }
        else if (name === 'EXT-X-CUE-OUT') {
            segment.markers.push(new _types__WEBPACK_IMPORTED_MODULE_1__.SpliceInfo({
                type: 'OUT',
                duration: (attributes && attributes.DURATION) || value
            }));
        }
        else if (name === 'EXT-X-CUE-IN') {
            segment.markers.push(new _types__WEBPACK_IMPORTED_MODULE_1__.SpliceInfo({
                type: 'IN'
            }));
        }
        else if (name === 'EXT-X-CUE-OUT-CONT' ||
            name === 'EXT-X-CUE' ||
            name === 'EXT-OATCLS-SCTE35' ||
            name === 'EXT-X-ASSET' ||
            name === 'EXT-X-SCTE35') {
            segment.markers.push(new _types__WEBPACK_IMPORTED_MODULE_1__.SpliceInfo({
                type: 'RAW',
                tagName: name,
                value
            }));
        }
        else if (name === 'EXT-X-PRELOAD-HINT' && !attributes['TYPE']) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PRELOAD-HINT: TYPE attribute is mandatory', cheap__fileName__0, 609);
        }
        else if (name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'PART' && partHint) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('Servers should not add more than one EXT-X-PRELOAD-HINT tag with the same TYPE attribute to a Playlist.', cheap__fileName__0, 612);
        }
        else if ((name === 'EXT-X-PART' || name === 'EXT-X-PRELOAD-HINT') && !attributes['URI']) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PART / EXT-X-PRELOAD-HINT: URI attribute is mandatory', cheap__fileName__0, 615);
        }
        else if (name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'MAP') {
            if (mapHint) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('Servers should not add more than one EXT-X-PRELOAD-HINT tag with the same TYPE attribute to a Playlist.', cheap__fileName__0, 619);
            }
            mapHint = true;
            params.hasMap = true;
            segment.map = new _types__WEBPACK_IMPORTED_MODULE_1__.MediaInitializationSection({
                hint: true,
                uri: attributes['URI'],
                byterange: { length: attributes['BYTERANGE-LENGTH'], offset: attributes['BYTERANGE-START'] || 0 }
            });
        }
        else if (name === 'EXT-X-PART' || (name === 'EXT-X-PRELOAD-HINT' && attributes['TYPE'] === 'PART')) {
            if (name === 'EXT-X-PART' && !attributes['DURATION']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PART: DURATION attribute is mandatory', cheap__fileName__0, 631);
            }
            if (name === 'EXT-X-PRELOAD-HINT') {
                partHint = true;
            }
            const partialSegment = new _types__WEBPACK_IMPORTED_MODULE_1__.PartialSegment({
                hint: (name === 'EXT-X-PRELOAD-HINT'),
                uri: attributes['URI'],
                byterange: (name === 'EXT-X-PART' ? attributes['BYTERANGE'] : { length: attributes['BYTERANGE-LENGTH'], offset: attributes['BYTERANGE-START'] || 0 }),
                duration: attributes['DURATION'],
                independent: attributes['INDEPENDENT'],
                gap: attributes['GAP']
            });
            segment.parts.push(partialSegment);
        }
    }
    return segment;
}
function parsePrefetchSegment(lines, uri, start, end, mediaSequenceNumber, discontinuitySequence, params) {
    const segment = new _types__WEBPACK_IMPORTED_MODULE_1__.PrefetchSegment({ uri, mediaSequenceNumber, discontinuitySequence });
    for (let i = start; i <= end; i++) {
        const { name, attributes } = lines[i];
        if (name === 'EXTINF') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A prefetch segment must not be advertised with an EXTINF tag.', cheap__fileName__0, 663);
        }
        else if (name === 'EXT-X-DISCONTINUITY') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A prefetch segment must not be advertised with an EXT-X-DISCONTINUITY tag.', cheap__fileName__0, 666);
        }
        else if (name === 'EXT-X-PREFETCH-DISCONTINUITY') {
            segment.discontinuity = true;
        }
        else if (name === 'EXT-X-KEY') {
            if (attributes['METHOD'] !== 'NONE') {
                setCompatibleVersionOfKey(params, attributes);
                segment.key = new _types__WEBPACK_IMPORTED_MODULE_1__.Key({
                    method: attributes['METHOD'],
                    uri: attributes['URI'],
                    iv: attributes['IV'],
                    format: attributes['KEYFORMAT'],
                    formatVersion: attributes['KEYFORMATVERSIONS']
                });
            }
        }
        else if (name === 'EXT-X-MAP') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('Prefetch segments must not be advertised with an EXT-X-MAP tag.', cheap__fileName__0, 684);
        }
    }
    return segment;
}
function parseMediaPlaylist(lines, params) {
    const playlist = new _types__WEBPACK_IMPORTED_MODULE_1__.MediaPlaylist();
    let segmentStart = -1;
    let mediaSequence = 0;
    let discontinuityFound = false;
    let prefetchFound = false;
    let discontinuitySequence = 0;
    let currentKey = null;
    let currentMap = null;
    let containsParts = false;
    for (const [index, line] of lines.entries()) {
        const { name, value, attributes, category } = line;
        if (category === 'Segment') {
            if (segmentStart === -1) {
                segmentStart = index;
            }
            if (name === 'EXT-X-DISCONTINUITY') {
                discontinuityFound = true;
            }
            continue;
        }
        if (name === 'EXT-X-VERSION') {
            if (playlist.version === undefined) {
                playlist.version = value;
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A Playlist file MUST NOT contain more than one EXT-X-VERSION tag.', cheap__fileName__0, 716);
            }
        }
        else if (name === 'EXT-X-TARGETDURATION') {
            playlist.targetDuration = params.targetDuration = value;
        }
        else if (name === 'EXT-X-MEDIA-SEQUENCE') {
            if (playlist.segments.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The EXT-X-MEDIA-SEQUENCE tag MUST appear before the first Media Segment in the Playlist.', cheap__fileName__0, 724);
            }
            playlist.mediaSequenceBase = mediaSequence = value;
        }
        else if (name === 'EXT-X-DISCONTINUITY-SEQUENCE') {
            if (playlist.segments.length > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The EXT-X-DISCONTINUITY-SEQUENCE tag MUST appear before the first Media Segment in the Playlist.', cheap__fileName__0, 730);
            }
            if (discontinuityFound) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The EXT-X-DISCONTINUITY-SEQUENCE tag MUST appear before any EXT-X-DISCONTINUITY tag.', cheap__fileName__0, 733);
            }
            playlist.discontinuitySequenceBase = discontinuitySequence = value;
        }
        else if (name === 'EXT-X-ENDLIST') {
            playlist.endlist = true;
        }
        else if (name === 'EXT-X-PLAYLIST-TYPE') {
            playlist.playlistType = value;
        }
        else if (name === 'EXT-X-I-FRAMES-ONLY') {
            if (params.compatibleVersion < 4) {
                params.compatibleVersion = 4;
            }
            playlist.isIFrame = true;
        }
        else if (name === 'EXT-X-INDEPENDENT-SEGMENTS') {
            if (playlist.independentSegments) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-INDEPENDENT-SEGMENTS tag MUST NOT appear more than once in a Playlist', cheap__fileName__0, 751);
            }
            playlist.independentSegments = true;
        }
        else if (name === 'EXT-X-START') {
            if (playlist.start) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-START tag MUST NOT appear more than once in a Playlist', cheap__fileName__0, 757);
            }
            if (typeof attributes['TIME-OFFSET'] !== 'number') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-START: TIME-OFFSET attribute is REQUIRED', cheap__fileName__0, 760);
            }
            playlist.start = { offset: attributes['TIME-OFFSET'], precise: attributes['PRECISE'] || false };
        }
        else if (name === 'EXT-X-SERVER-CONTROL') {
            if (!attributes['CAN-BLOCK-RELOAD']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-SERVER-CONTROL: CAN-BLOCK-RELOAD=YES is mandatory for Low-Latency HLS', cheap__fileName__0, 766);
            }
            playlist.lowLatencyCompatibility = {
                canBlockReload: attributes['CAN-BLOCK-RELOAD'],
                canSkipUntil: attributes['CAN-SKIP-UNTIL'],
                holdBack: attributes['HOLD-BACK'],
                partHoldBack: attributes['PART-HOLD-BACK']
            };
        }
        else if (name === 'EXT-X-PART-INF') {
            if (!attributes['PART-TARGET']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PART-INF: PART-TARGET attribute is mandatory', cheap__fileName__0, 777);
            }
            playlist.partTargetDuration = attributes['PART-TARGET'];
        }
        else if (name === 'EXT-X-RENDITION-REPORT') {
            if (!attributes['URI']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-RENDITION-REPORT: URI attribute is mandatory', cheap__fileName__0, 783);
            }
            if (attributes['URI'].search(/^[a-z]+:/) === 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-RENDITION-REPORT: URI must be relative to the playlist uri', cheap__fileName__0, 786);
            }
            playlist.renditionReports.push(new _types__WEBPACK_IMPORTED_MODULE_1__.RenditionReport({
                uri: attributes['URI'],
                lastMSN: attributes['LAST-MSN'],
                lastPart: attributes['LAST-PART']
            }));
        }
        else if (name === 'EXT-X-SKIP') {
            if (!attributes['SKIPPED-SEGMENTS']) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-SKIP: SKIPPED-SEGMENTS attribute is mandatory', cheap__fileName__0, 796);
            }
            if (params.compatibleVersion < 9) {
                params.compatibleVersion = 9;
            }
            playlist.skip = attributes['SKIPPED-SEGMENTS'];
            mediaSequence += playlist.skip;
        }
        else if (name === 'EXT-X-PREFETCH') {
            const segment = parsePrefetchSegment(lines, value, segmentStart === -1 ? index : segmentStart, index - 1, mediaSequence++, discontinuitySequence, params);
            if (segment) {
                if (segment.discontinuity) {
                    segment.discontinuitySequence++;
                    discontinuitySequence = segment.discontinuitySequence;
                }
                if (segment.key) {
                    currentKey = segment.key;
                }
                else {
                    segment.key = currentKey;
                }
                playlist.prefetchSegments.push(segment);
            }
            prefetchFound = true;
            segmentStart = -1;
        }
        else if (typeof line === 'string') {
            // uri
            if (segmentStart === -1) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('A URI line is not preceded by any segment tags', cheap__fileName__0, 833);
            }
            if (!playlist.targetDuration) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The EXT-X-TARGETDURATION tag is REQUIRED', cheap__fileName__0, 836);
            }
            if (prefetchFound) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('These segments must appear after all complete segments.', cheap__fileName__0, 839);
            }
            const segment = parseSegment(lines, line, segmentStart, index - 1, mediaSequence++, discontinuitySequence, params);
            if (segment) {
                [discontinuitySequence, currentKey, currentMap] = addSegment(playlist, segment, discontinuitySequence, currentKey, currentMap);
                if (!containsParts && segment.parts.length > 0) {
                    containsParts = true;
                }
            }
            segmentStart = -1;
        }
    }
    if (segmentStart !== -1) {
        const segment = parseSegment(lines, '', segmentStart, lines.length - 1, mediaSequence++, discontinuitySequence, params);
        if (segment) {
            const { parts } = segment;
            if (parts.length > 0 && !playlist.endlist && !parts[parts.length - 1]?.hint) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If the Playlist contains EXT-X-PART tags and does not contain an EXT-X-ENDLIST tag, the Playlist must contain an EXT-X-PRELOAD-HINT tag with a TYPE=PART attribute', cheap__fileName__0, 856);
            }
            // @ts-expect-error TODO check if this is not a bug the third argument should be a discontinuitySequence
            addSegment(playlist, segment, currentKey, currentMap);
            if (!containsParts && segment.parts.length > 0) {
                containsParts = true;
            }
        }
    }
    checkDateRange(playlist.segments);
    if (playlist.lowLatencyCompatibility) {
        checkLowLatencyCompatibility(playlist, containsParts);
    }
    playlist.duration = playlist.segments.reduce((total, segment) => {
        return typeof segment.duration === 'number' ? total + segment.duration : total;
    }, 0);
    return playlist;
}
function addSegment(playlist, segment, discontinuitySequence, currentKey, currentMap) {
    const { discontinuity, key, map, byterange, uri } = segment;
    if (discontinuity) {
        segment.discontinuitySequence = discontinuitySequence + 1;
    }
    if (!key) {
        segment.key = currentKey;
    }
    if (!map) {
        segment.map = currentMap;
    }
    if (byterange && byterange.offset === -1) {
        const { segments } = playlist;
        if (segments.length > 0) {
            const prevSegment = segments[segments.length - 1];
            if (prevSegment.byterange && prevSegment.uri === uri) {
                byterange.offset = prevSegment.byterange.offset + prevSegment.byterange.length;
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If offset of EXT-X-BYTERANGE is not present, a previous Media Segment MUST be a sub-range of the same media resource', cheap__fileName__0, 900);
            }
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If offset of EXT-X-BYTERANGE is not present, a previous Media Segment MUST appear in the Playlist file', cheap__fileName__0, 904);
        }
    }
    playlist.segments.push(segment);
    return [segment.discontinuitySequence, segment.key, segment.map];
}
function checkDateRange(segments) {
    const earliestDates = new Map();
    const rangeList = new Map();
    let hasDateRange = false;
    let hasProgramDateTime = false;
    for (let i = segments.length - 1; i >= 0; i--) {
        const { programDateTime, dateRange } = segments[i];
        if (programDateTime) {
            hasProgramDateTime = true;
        }
        if (dateRange && dateRange.start) {
            hasDateRange = true;
            if (dateRange.endOnNext && (dateRange.end || dateRange.duration)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('An EXT-X-DATERANGE tag with an END-ON-NEXT=YES attribute MUST NOT contain DURATION or END-DATE attributes.', cheap__fileName__0, 924);
            }
            const start = dateRange.start.getTime();
            const duration = dateRange.duration || 0;
            if (dateRange.end && dateRange.duration) {
                if ((start + duration * 1000) !== dateRange.end.getTime()) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('END-DATE MUST be equal to the value of the START-DATE attribute plus the value of the DURATION', cheap__fileName__0, 930);
                }
            }
            if (dateRange.endOnNext) {
                dateRange.end = earliestDates.get(dateRange.classId);
            }
            earliestDates.set(dateRange.classId, dateRange.start);
            const end = dateRange.end ? dateRange.end.getTime() : dateRange.start.getTime() + (dateRange.duration || 0) * 1000;
            const range = rangeList.get(dateRange.classId);
            if (range) {
                for (const entry of range) {
                    if ((entry.start <= start && entry.end > start) || (entry.start >= start && entry.start < end)) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('DATERANGE tags with the same CLASS should not overlap', cheap__fileName__0, 942);
                    }
                }
                range.push({ start, end });
            }
            else if (dateRange.classId) {
                rangeList.set(dateRange.classId, [{ start, end }]);
            }
        }
    }
    if (hasDateRange && !hasProgramDateTime) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('If a Playlist contains an EXT-X-DATERANGE tag, it MUST also contain at least one EXT-X-PROGRAM-DATE-TIME tag.', cheap__fileName__0, 953);
    }
}
function checkLowLatencyCompatibility({ lowLatencyCompatibility, targetDuration, partTargetDuration, segments, renditionReports }, containsParts) {
    const { canSkipUntil, holdBack, partHoldBack } = lowLatencyCompatibility;
    if (canSkipUntil < targetDuration * 6) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The Skip Boundary must be at least six times the EXT-X-TARGETDURATION.', cheap__fileName__0, 960);
    }
    // Its value is a floating-point number of seconds and .
    if (holdBack < targetDuration * 3) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('HOLD-BACK must be at least three times the EXT-X-TARGETDURATION.', cheap__fileName__0, 964);
    }
    if (containsParts) {
        if (partTargetDuration === undefined) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PART-INF is required if a Playlist contains one or more EXT-X-PART tags', cheap__fileName__0, 968);
        }
        if (partHoldBack === undefined) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('EXT-X-PART: PART-HOLD-BACK attribute is mandatory', cheap__fileName__0, 971);
        }
        if (partHoldBack < partTargetDuration) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('PART-HOLD-BACK must be at least PART-TARGET', cheap__fileName__0, 974);
        }
        for (const [segmentIndex, { parts }] of segments.entries()) {
            if (parts.length > 0 && segmentIndex < segments.length - 3) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('Remove EXT-X-PART tags from the Playlist after they are greater than three target durations from the end of the Playlist.', cheap__fileName__0, 978);
            }
            for (const [partIndex, { duration }] of parts.entries()) {
                if (duration === undefined) {
                    continue;
                }
                if (duration > partTargetDuration) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('PART-TARGET is the maximum duration of any Partial Segment', cheap__fileName__0, 985);
                }
                if (partIndex < parts.length - 1 && duration < partTargetDuration * 0.85) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('All Partial Segments except the last part of a segment must have a duration of at least 85% of PART-TARGET', cheap__fileName__0, 988);
                }
            }
        }
    }
    for (const report of renditionReports) {
        const lastSegment = segments[segments.length - 1];
        if (report.lastMSN === null || report.lastMSN === undefined) {
            report.lastMSN = lastSegment.mediaSequenceNumber;
        }
        if ((report.lastPart === null || report.lastPart === undefined) && lastSegment.parts.length > 0) {
            report.lastPart = lastSegment.parts.length - 1;
        }
    }
}
function CHECKTAGCATEGORY(category, params) {
    if (category === 'Segment' || category === 'MediaPlaylist') {
        if (params.isMasterPlaylist === undefined) {
            params.isMasterPlaylist = false;
            return;
        }
        if (params.isMasterPlaylist) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The file contains both media and master playlist tags.', cheap__fileName__0, 1011);
        }
        return;
    }
    if (category === 'MasterPlaylist') {
        if (params.isMasterPlaylist === undefined) {
            params.isMasterPlaylist = true;
            return;
        }
        if (params.isMasterPlaylist === false) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The file contains both media and master playlist tags.', cheap__fileName__0, 1021);
        }
    }
}
function parseTag(line, params) {
    const [name, param] = splitTag(line);
    const category = getTagCategory(name);
    CHECKTAGCATEGORY(category, params);
    if (category === 'Unknown') {
        return null;
    }
    if (category === 'MediaPlaylist' && name !== 'EXT-X-RENDITION-REPORT' && name !== 'EXT-X-PREFETCH') {
        if (params.hash[name]) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('There MUST NOT be more than one Media Playlist tag of each type in any Media Playlist', cheap__fileName__0, 1042);
        }
        params.hash[name] = true;
    }
    const [value, attributes] = parseTagParam(name, param);
    return { name, category, value, attributes };
}
function lexicalParse(text, params) {
    const lines = [];
    for (const l of text.split('\n')) {
        const line = l.trim();
        if (!line) {
            continue;
        }
        if (line.startsWith('#')) {
            if (line.startsWith('#EXT')) {
                // tag
                const tag = parseTag(line, params);
                if (tag) {
                    lines.push(tag);
                }
            }
            // comment
            continue;
        }
        // uri
        lines.push(line);
    }
    if (lines.length === 0 || lines[0].name !== 'EXTM3U') {
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal('The EXTM3U tag MUST be the first line.', cheap__fileName__0, 1074);
    }
    return lines;
}
function semanticParse(lines, params) {
    let playlist;
    if (params.isMasterPlaylist) {
        playlist = parseMasterPlaylist(lines, params);
    }
    else {
        playlist = parseMediaPlaylist(lines, params);
        if (!playlist.isIFrame && params.hasMap && params.compatibleVersion < 6) {
            params.compatibleVersion = 6;
        }
    }
    if (params.compatibleVersion > 1) {
        if (!playlist.version || playlist.version < params.compatibleVersion) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.fatal(`EXT-X-VERSION needs to be ${params.compatibleVersion} or higher.`, cheap__fileName__0, 1092);
        }
    }
    return playlist;
}
function parse(text) {
    const params = {
        version: undefined,
        isMasterPlaylist: undefined,
        hasMap: false,
        targetDuration: 0,
        compatibleVersion: 1,
        isClosedCaptionsNone: false,
        hash: {}
    };
    const lines = lexicalParse(text, params);
    const playlist = semanticParse(lines, params);
    playlist.source = text;
    return playlist;
}


/***/ }),

/***/ "./src/avprotocol/m3u8/types.ts":
/*!**************************************!*\
  !*** ./src/avprotocol/m3u8/types.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateRange: () => (/* binding */ DateRange),
/* harmony export */   Key: () => (/* binding */ Key),
/* harmony export */   MasterPlaylist: () => (/* binding */ MasterPlaylist),
/* harmony export */   MediaInitializationSection: () => (/* binding */ MediaInitializationSection),
/* harmony export */   MediaPlaylist: () => (/* binding */ MediaPlaylist),
/* harmony export */   PartialSegment: () => (/* binding */ PartialSegment),
/* harmony export */   PrefetchSegment: () => (/* binding */ PrefetchSegment),
/* harmony export */   Rendition: () => (/* binding */ Rendition),
/* harmony export */   RenditionReport: () => (/* binding */ RenditionReport),
/* harmony export */   Segment: () => (/* binding */ Segment),
/* harmony export */   SessionData: () => (/* binding */ SessionData),
/* harmony export */   SpliceInfo: () => (/* binding */ SpliceInfo),
/* harmony export */   Variant: () => (/* binding */ Variant)
/* harmony export */ });
/* unused harmony export Playlist */
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/**
 * from https://github.com/kuu/hls-parser/blob/master/types.ts
 * MIT license
 */

class Rendition {
    type;
    uri;
    groupId;
    language;
    assocLanguage;
    name;
    isDefault;
    autoselect;
    forced;
    instreamId;
    characteristics;
    channels;
    constructor({ 
    // required
    type, 
    // required if type='SUBTITLES'
    uri, 
    // required
    groupId, language, assocLanguage, 
    // required
    name, isDefault, autoselect, forced, 
    // required if type=CLOSED-CAPTIONS
    instreamId, characteristics, channels }) {
        this.type = type;
        this.uri = uri;
        this.groupId = groupId;
        this.language = language;
        this.assocLanguage = assocLanguage;
        this.name = name;
        this.isDefault = isDefault;
        this.autoselect = autoselect;
        this.forced = forced;
        this.instreamId = instreamId;
        this.characteristics = characteristics;
        this.channels = channels;
    }
}
class Variant {
    uri;
    isIFrameOnly;
    bandwidth;
    averageBandwidth;
    score;
    codecs;
    resolution;
    frameRate;
    hdcpLevel;
    allowedCpc;
    videoRange;
    stableVariantId;
    programId;
    audio;
    video;
    subtitles;
    closedCaptions;
    currentRenditions;
    constructor({ 
    // required
    uri, isIFrameOnly = false, 
    // required
    bandwidth, averageBandwidth, score, 
    // required?
    codecs, resolution, frameRate, hdcpLevel, allowedCpc, videoRange, stableVariantId, programId, audio = [], video = [], subtitles = [], closedCaptions = [], currentRenditions = { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 } }) {
        this.uri = uri;
        this.isIFrameOnly = isIFrameOnly;
        this.bandwidth = bandwidth;
        this.averageBandwidth = averageBandwidth;
        this.score = score;
        this.codecs = codecs;
        this.resolution = resolution;
        this.frameRate = frameRate;
        this.hdcpLevel = hdcpLevel;
        this.allowedCpc = allowedCpc;
        this.videoRange = videoRange;
        this.stableVariantId = stableVariantId;
        this.programId = programId;
        this.audio = audio;
        this.video = video;
        this.subtitles = subtitles;
        this.closedCaptions = closedCaptions;
        this.currentRenditions = currentRenditions;
    }
}
class SessionData {
    id;
    value;
    uri;
    language;
    constructor({ 
    // required
    id, value, uri, language }) {
        this.id = id;
        this.value = value;
        this.uri = uri;
        this.language = language;
    }
}
class Key {
    method;
    uri;
    iv;
    format;
    formatVersion;
    constructor({ 
    // required
    method, 
    // required unless method=NONE
    uri, iv, format, formatVersion }) {
        this.method = method;
        this.uri = uri;
        this.iv = iv;
        this.format = format;
        this.formatVersion = formatVersion;
    }
}
class MediaInitializationSection {
    hint;
    uri;
    mimeType;
    byterange;
    constructor({ hint = false, 
    // required
    uri, mimeType, byterange }) {
        this.hint = hint;
        this.uri = uri;
        this.mimeType = mimeType;
        this.byterange = byterange;
    }
}
class DateRange {
    id;
    classId;
    start;
    end;
    duration;
    plannedDuration;
    endOnNext;
    attributes;
    constructor({ 
    // required
    id, 
    // required if endOnNext is true
    classId, start, end, duration, plannedDuration, endOnNext, attributes = {} }) {
        this.id = id;
        this.classId = classId;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.plannedDuration = plannedDuration;
        this.endOnNext = endOnNext;
        this.attributes = attributes;
    }
}
class SpliceInfo {
    type;
    duration;
    tagName;
    value;
    constructor({ 
    // required
    type, 
    // required if the type is 'OUT'
    duration, 
    // required if the type is 'RAW'
    tagName, value }) {
        this.type = type;
        this.duration = duration;
        this.tagName = tagName;
        this.value = value;
    }
}
class Data {
    type;
    constructor(type) {
        this.type = type;
    }
}
class Playlist extends Data {
    isMasterPlaylist;
    uri;
    version;
    independentSegments;
    start;
    source;
    constructor({ 
    // required
    isMasterPlaylist, uri, version, independentSegments = false, start, source }) {
        super('playlist');
        this.isMasterPlaylist = isMasterPlaylist;
        this.uri = uri;
        this.version = version;
        this.independentSegments = independentSegments;
        this.start = start;
        this.source = source;
    }
}
class MasterPlaylist extends Playlist {
    variants;
    currentVariant;
    sessionDataList;
    sessionKeyList;
    constructor(params = {}) {
        super({ ...params, isMasterPlaylist: true });
        const { variants = [], currentVariant, sessionDataList = [], sessionKeyList = [] } = params;
        this.variants = variants;
        this.currentVariant = currentVariant;
        this.sessionDataList = sessionDataList;
        this.sessionKeyList = sessionKeyList;
    }
}
class MediaPlaylist extends Playlist {
    targetDuration;
    mediaSequenceBase;
    discontinuitySequenceBase;
    endlist;
    playlistType;
    isIFrame;
    segments;
    prefetchSegments;
    lowLatencyCompatibility;
    partTargetDuration;
    renditionReports;
    skip;
    hash;
    duration;
    timestamp;
    constructor(params = {}) {
        super({ ...params, isMasterPlaylist: false });
        const { targetDuration, mediaSequenceBase = 0, discontinuitySequenceBase = 0, endlist = false, playlistType, isIFrame, segments = [], prefetchSegments = [], lowLatencyCompatibility, partTargetDuration, renditionReports = [], skip = 0, hash, duration = 0 } = params;
        this.targetDuration = targetDuration;
        this.mediaSequenceBase = mediaSequenceBase;
        this.discontinuitySequenceBase = discontinuitySequenceBase;
        this.endlist = endlist;
        this.playlistType = playlistType;
        this.isIFrame = isIFrame;
        this.segments = segments;
        this.prefetchSegments = prefetchSegments;
        this.lowLatencyCompatibility = lowLatencyCompatibility;
        this.partTargetDuration = partTargetDuration;
        this.renditionReports = renditionReports;
        this.skip = skip;
        this.hash = hash;
        this.duration = duration;
        this.timestamp = (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_0__["default"])();
    }
}
class Segment extends Data {
    uri;
    mimeType;
    data;
    duration;
    title;
    byterange;
    discontinuity;
    mediaSequenceNumber;
    discontinuitySequence;
    key;
    map;
    programDateTime;
    dateRange;
    markers;
    parts;
    constructor({ uri, mimeType, data, duration, title, byterange, discontinuity, mediaSequenceNumber = 0, discontinuitySequence = 0, key, map, programDateTime, dateRange, markers = [], parts = [] }) {
        super('segment');
        this.uri = uri;
        this.mimeType = mimeType;
        this.data = data;
        this.duration = duration;
        this.title = title;
        this.byterange = byterange;
        this.discontinuity = discontinuity;
        this.mediaSequenceNumber = mediaSequenceNumber;
        this.discontinuitySequence = discontinuitySequence;
        this.key = key;
        this.map = map;
        this.programDateTime = programDateTime;
        this.dateRange = dateRange;
        this.markers = markers;
        this.parts = parts;
    }
}
class PartialSegment extends Data {
    hint;
    uri;
    duration;
    independent;
    byterange;
    gap;
    constructor({ hint = false, 
    // required
    uri, duration, independent, byterange, gap }) {
        super('part');
        this.hint = hint;
        this.uri = uri;
        this.duration = duration;
        this.independent = independent;
        this.duration = duration;
        this.byterange = byterange;
        this.gap = gap;
    }
}
class PrefetchSegment extends Data {
    uri;
    discontinuity;
    mediaSequenceNumber;
    discontinuitySequence;
    key;
    constructor({ 
    // required
    uri, discontinuity, mediaSequenceNumber = 0, discontinuitySequence = 0, key }) {
        super('prefetch');
        this.uri = uri;
        this.discontinuity = discontinuity;
        this.mediaSequenceNumber = mediaSequenceNumber;
        this.discontinuitySequence = discontinuitySequence;
        this.key = key;
    }
}
class RenditionReport {
    uri;
    lastMSN;
    lastPart;
    constructor({ 
    // required
    uri, lastMSN, lastPart }) {
        this.uri = uri;
        this.lastMSN = lastMSN;
        this.lastPart = lastPart;
    }
}



/***/ }),

/***/ "./src/avprotocol/m3u8/utils.ts":
/*!**************************************!*\
  !*** ./src/avprotocol/m3u8/utils.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelify: () => (/* binding */ camelify),
/* harmony export */   hexToByteSequence: () => (/* binding */ hexToByteSequence),
/* harmony export */   splitAt: () => (/* binding */ splitAt),
/* harmony export */   splitByCommaWithPreservingQuotes: () => (/* binding */ splitByCommaWithPreservingQuotes),
/* harmony export */   toNumber: () => (/* binding */ toNumber),
/* harmony export */   trim: () => (/* binding */ trim)
/* harmony export */ });
/**
 * from https://github.com/kuu/hls-parser/blob/master/utils.ts
 * MIT license
 */
function toNumber(str, radix = 10) {
    if (typeof str === 'number') {
        return str;
    }
    const num = radix === 10 ? Number.parseFloat(str) : Number.parseInt(str, radix);
    if (Number.isNaN(num)) {
        return 0;
    }
    return num;
}
function hexToByteSequence(str) {
    if (str.startsWith('0x') || str.startsWith('0X')) {
        str = str.slice(2);
    }
    const numArray = [];
    for (let i = 0; i < str.length; i += 2) {
        numArray.push(toNumber(str.slice(i, i + 2), 16));
    }
    return new Uint8Array(numArray);
}
function splitAt(str, delimiter, index = 0) {
    let lastDelimiterPos = -1;
    for (let i = 0, j = 0; i < str.length; i++) {
        if (str[i] === delimiter) {
            if (j++ === index) {
                return [str.slice(0, i), str.slice(i + 1)];
            }
            lastDelimiterPos = i;
        }
    }
    if (lastDelimiterPos !== -1) {
        return [str.slice(0, lastDelimiterPos), str.slice(lastDelimiterPos + 1)];
    }
    return [str];
}
function trim(str, char = ' ') {
    if (!str) {
        return str;
    }
    str = str.trim();
    if (char === ' ') {
        return str;
    }
    if (str.startsWith(char)) {
        str = str.slice(1);
    }
    if (str.endsWith(char)) {
        str = str.slice(0, -1);
    }
    return str;
}
function splitByCommaWithPreservingQuotes(str) {
    const list = [];
    let doParse = true;
    let start = 0;
    const prevQuotes = [];
    for (let i = 0; i < str.length; i++) {
        const curr = str[i];
        if (doParse && curr === ',') {
            list.push(str.slice(start, i).trim());
            start = i + 1;
            continue;
        }
        if (curr === '"' || curr === '\'') {
            if (doParse) {
                prevQuotes.push(curr);
                doParse = false;
            }
            else if (curr === prevQuotes[prevQuotes.length - 1]) {
                prevQuotes.pop();
                doParse = true;
            }
            else {
                prevQuotes.push(curr);
            }
        }
    }
    list.push(str.slice(start).trim());
    return list;
}
function camelify(str) {
    const array = [];
    let nextUpper = false;
    for (const ch of str) {
        if (ch === '-' || ch === '_') {
            nextUpper = true;
            continue;
        }
        if (nextUpper) {
            array.push(ch.toUpperCase());
            nextUpper = false;
            continue;
        }
        array.push(ch.toLowerCase());
    }
    return array.join('');
}



/***/ }),

/***/ "./src/common/crypto/aes/AESSoftDecryptor.ts":
/*!***************************************************!*\
  !*** ./src/common/crypto/aes/AESSoftDecryptor.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AESSoftDecryptor)
/* harmony export */ });
// from https://github.com/video-dev/hls.js/blob/master/src/crypt/aes-decryptor.ts
// Apache License
class AESSoftDecryptor {
    rcon = [
        0x0, 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36,
    ];
    subMix = [
        new Uint32Array(256),
        new Uint32Array(256),
        new Uint32Array(256),
        new Uint32Array(256)
    ];
    invSubMix = [
        new Uint32Array(256),
        new Uint32Array(256),
        new Uint32Array(256),
        new Uint32Array(256)
    ];
    sBox = new Uint32Array(256);
    invSBox = new Uint32Array(256);
    key = new Uint32Array(0);
    ksRows = 0;
    keySize = 0;
    keySchedule;
    invKeySchedule;
    constructor(mode = 0 /* AesMode.CBC */) {
        this.initTable();
    }
    // Using view.getUint32() also swaps the byte order.
    uint8ArrayToUint32Array_(arrayBuffer) {
        const view = new DataView(arrayBuffer);
        const newArray = new Uint32Array(4);
        for (let i = 0; i < 4; i++) {
            newArray[i] = view.getUint32(i * 4);
        }
        return newArray;
    }
    initTable() {
        const sBox = this.sBox;
        const invSBox = this.invSBox;
        const subMix = this.subMix;
        const subMix0 = subMix[0];
        const subMix1 = subMix[1];
        const subMix2 = subMix[2];
        const subMix3 = subMix[3];
        const invSubMix = this.invSubMix;
        const invSubMix0 = invSubMix[0];
        const invSubMix1 = invSubMix[1];
        const invSubMix2 = invSubMix[2];
        const invSubMix3 = invSubMix[3];
        const d = new Uint32Array(256);
        let x = 0;
        let xi = 0;
        let i = 0;
        for (i = 0; i < 256; i++) {
            if (i < 128) {
                d[i] = i << 1;
            }
            else {
                d[i] = (i << 1) ^ 0x11b;
            }
        }
        for (i = 0; i < 256; i++) {
            let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
            sBox[x] = sx;
            invSBox[sx] = x;
            // Compute multiplication
            const x2 = d[x];
            const x4 = d[x2];
            const x8 = d[x4];
            // Compute sub/invSub bytes, mix columns tables
            let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
            subMix0[x] = (t << 24) | (t >>> 8);
            subMix1[x] = (t << 16) | (t >>> 16);
            subMix2[x] = (t << 8) | (t >>> 24);
            subMix3[x] = t;
            // Compute inv sub bytes, inv mix columns tables
            t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
            invSubMix0[sx] = (t << 24) | (t >>> 8);
            invSubMix1[sx] = (t << 16) | (t >>> 16);
            invSubMix2[sx] = (t << 8) | (t >>> 24);
            invSubMix3[sx] = t;
            // Compute next counter
            if (!x) {
                x = xi = 1;
            }
            else {
                x = x2 ^ d[d[d[x8 ^ x2]]];
                xi ^= d[d[xi]];
            }
        }
    }
    async expandKey(keyBuffer) {
        const key = this.uint8ArrayToUint32Array_(keyBuffer);
        if (this.key) {
            let sameKey = true;
            let offset = 0;
            while (offset < key.length && sameKey) {
                sameKey = key[offset] === this.key[offset];
                offset++;
            }
            if (sameKey) {
                return;
            }
        }
        this.key = key;
        const keySize = (this.keySize = this.key.length);
        if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
            throw new Error('Invalid aes key size=' + keySize);
        }
        const ksRows = (this.ksRows = (keySize + 6 + 1) * 4);
        let ksRow;
        let invKsRow;
        const keySchedule = (this.keySchedule = new Uint32Array(ksRows));
        const invKeySchedule = (this.invKeySchedule = new Uint32Array(ksRows));
        const sbox = this.sBox;
        const rcon = this.rcon;
        const invSubMix = this.invSubMix;
        const invSubMix0 = invSubMix[0];
        const invSubMix1 = invSubMix[1];
        const invSubMix2 = invSubMix[2];
        const invSubMix3 = invSubMix[3];
        let prev;
        let t;
        for (ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
                prev = keySchedule[ksRow] = key[ksRow];
                continue;
            }
            t = prev;
            if (ksRow % keySize === 0) {
                // Rot word
                t = (t << 8) | (t >>> 24);
                // Sub word
                t = (sbox[t >>> 24] << 24) |
                    (sbox[(t >>> 16) & 0xff] << 16) |
                    (sbox[(t >>> 8) & 0xff] << 8) |
                    sbox[t & 0xff];
                // Mix Rcon
                t ^= rcon[(ksRow / keySize) | 0] << 24;
            }
            else if (keySize > 6 && ksRow % keySize === 4) {
                // Sub word
                t = (sbox[t >>> 24] << 24) |
                    (sbox[(t >>> 16) & 0xff] << 16) |
                    (sbox[(t >>> 8) & 0xff] << 8) |
                    sbox[t & 0xff];
            }
            keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0;
        }
        for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            ksRow = ksRows - invKsRow;
            if (invKsRow & 3) {
                t = keySchedule[ksRow];
            }
            else {
                t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
            }
            else {
                invKeySchedule[invKsRow] = invSubMix0[sbox[t >>> 24]] ^
                    invSubMix1[sbox[(t >>> 16) & 0xff]] ^
                    invSubMix2[sbox[(t >>> 8) & 0xff]] ^
                    invSubMix3[sbox[t & 0xff]];
            }
            invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0;
        }
    }
    // Adding this as a method greatly improves performance.
    networkToHostOrderSwap(word) {
        return ((word << 24) |
            ((word & 0xff00) << 8) |
            ((word & 0xff0000) >> 8) |
            (word >>> 24));
    }
    async decrypt(inputArrayBuffer, aesIV) {
        const nRounds = this.keySize + 6;
        const invKeySchedule = this.invKeySchedule;
        const invSBOX = this.invSBox;
        const invSubMix = this.invSubMix;
        const invSubMix0 = invSubMix[0];
        const invSubMix1 = invSubMix[1];
        const invSubMix2 = invSubMix[2];
        const invSubMix3 = invSubMix[3];
        const initVector = this.uint8ArrayToUint32Array_(aesIV);
        let initVector0 = initVector[0];
        let initVector1 = initVector[1];
        let initVector2 = initVector[2];
        let initVector3 = initVector[3];
        const inputInt32 = new Int32Array(inputArrayBuffer.buffer)
            .subarray(inputArrayBuffer.byteOffset >>> 2, (inputArrayBuffer.byteOffset >>> 2) + (inputArrayBuffer.length >>> 2));
        const outputInt32 = new Int32Array(inputInt32.length);
        let t0, t1, t2, t3;
        let s0, s1, s2, s3;
        let inputWords0, inputWords1, inputWords2, inputWords3;
        let ksRow, i;
        const swapWord = this.networkToHostOrderSwap;
        let offset = 0;
        while (offset < inputInt32.length) {
            inputWords0 = swapWord(inputInt32[offset]);
            inputWords1 = swapWord(inputInt32[offset + 1]);
            inputWords2 = swapWord(inputInt32[offset + 2]);
            inputWords3 = swapWord(inputInt32[offset + 3]);
            s0 = inputWords0 ^ invKeySchedule[0];
            s1 = inputWords3 ^ invKeySchedule[1];
            s2 = inputWords2 ^ invKeySchedule[2];
            s3 = inputWords1 ^ invKeySchedule[3];
            ksRow = 4;
            // Iterate through the rounds of decryption
            for (i = 1; i < nRounds; i++) {
                t0 = invSubMix0[s0 >>> 24] ^
                    invSubMix1[(s1 >> 16) & 0xff] ^
                    invSubMix2[(s2 >> 8) & 0xff] ^
                    invSubMix3[s3 & 0xff] ^
                    invKeySchedule[ksRow];
                t1 = invSubMix0[s1 >>> 24] ^
                    invSubMix1[(s2 >> 16) & 0xff] ^
                    invSubMix2[(s3 >> 8) & 0xff] ^
                    invSubMix3[s0 & 0xff] ^
                    invKeySchedule[ksRow + 1];
                t2 = invSubMix0[s2 >>> 24] ^
                    invSubMix1[(s3 >> 16) & 0xff] ^
                    invSubMix2[(s0 >> 8) & 0xff] ^
                    invSubMix3[s1 & 0xff] ^
                    invKeySchedule[ksRow + 2];
                t3 = invSubMix0[s3 >>> 24] ^
                    invSubMix1[(s0 >> 16) & 0xff] ^
                    invSubMix2[(s1 >> 8) & 0xff] ^
                    invSubMix3[s2 & 0xff] ^
                    invKeySchedule[ksRow + 3];
                // Update state
                s0 = t0;
                s1 = t1;
                s2 = t2;
                s3 = t3;
                ksRow = ksRow + 4;
            }
            // Shift rows, sub bytes, add round key
            t0 = (invSBOX[s0 >>> 24] << 24) ^
                (invSBOX[(s1 >> 16) & 0xff] << 16) ^
                (invSBOX[(s2 >> 8) & 0xff] << 8) ^
                invSBOX[s3 & 0xff] ^
                invKeySchedule[ksRow];
            t1 = (invSBOX[s1 >>> 24] << 24) ^
                (invSBOX[(s2 >> 16) & 0xff] << 16) ^
                (invSBOX[(s3 >> 8) & 0xff] << 8) ^
                invSBOX[s0 & 0xff] ^
                invKeySchedule[ksRow + 1];
            t2 = (invSBOX[s2 >>> 24] << 24) ^
                (invSBOX[(s3 >> 16) & 0xff] << 16) ^
                (invSBOX[(s0 >> 8) & 0xff] << 8) ^
                invSBOX[s1 & 0xff] ^
                invKeySchedule[ksRow + 2];
            t3 = (invSBOX[s3 >>> 24] << 24) ^
                (invSBOX[(s0 >> 16) & 0xff] << 16) ^
                (invSBOX[(s1 >> 8) & 0xff] << 8) ^
                invSBOX[s2 & 0xff] ^
                invKeySchedule[ksRow + 3];
            // Write
            outputInt32[offset] = swapWord(t0 ^ initVector0);
            outputInt32[offset + 1] = swapWord(t3 ^ initVector1);
            outputInt32[offset + 2] = swapWord(t2 ^ initVector2);
            outputInt32[offset + 3] = swapWord(t1 ^ initVector3);
            // reset initVector to last 4 unsigned int
            initVector0 = inputWords0;
            initVector1 = inputWords1;
            initVector2 = inputWords2;
            initVector3 = inputWords3;
            offset = offset + 4;
        }
        return outputInt32.buffer;
    }
}


/***/ }),

/***/ "./src/common/crypto/aes/AESWebDecryptor.ts":
/*!**************************************************!*\
  !*** ./src/common/crypto/aes/AESWebDecryptor.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AESSoftDecryptor)
/* harmony export */ });
class AESSoftDecryptor {
    subtle;
    key;
    mode;
    keyBuffer;
    constructor(mode = 0 /* AesMode.CBC */) {
        this.mode = mode;
        this.subtle = crypto.subtle || crypto.webkitSubtle;
    }
    getSubtleAlgoName() {
        switch (this.mode) {
            case 0 /* AesMode.CBC */:
                return 'AES-CBC';
            case 1 /* AesMode.CTR */:
                return 'AES-CTR';
        }
    }
    async expandKey(key) {
        let keyBuffer = new Uint8Array(key);
        if (this.keyBuffer) {
            let sameKey = true;
            let offset = 0;
            while (offset < keyBuffer.length && sameKey) {
                sameKey = keyBuffer[offset] === this.keyBuffer[offset];
                offset++;
            }
            if (sameKey) {
                return;
            }
        }
        this.keyBuffer = keyBuffer;
        this.key = await this.subtle.importKey('raw', key, {
            name: this.getSubtleAlgoName()
        }, false, ['encrypt', 'decrypt']);
    }
    async encryptPadding(padding, iv) {
        return new Uint8Array(await crypto.subtle.encrypt({
            name: 'AES-CBC',
            iv,
        }, this.key, padding));
    }
    async decrypt(input, iv) {
        switch (this.mode) {
            case 0 /* AesMode.CBC */:
                return this.subtle.decrypt({
                    name: 'AES-CBC',
                    iv
                }, this.key, input);
            case 1 /* AesMode.CTR */:
                return this.subtle.decrypt({
                    name: 'AES-CTR',
                    counter: iv,
                    length: 64
                }, this.key, input);
        }
    }
    static isSupport() {
        const subtle = crypto.subtle || crypto.webkitSubtle;
        return typeof subtle === 'object';
    }
}


/***/ }),

/***/ "./src/common/function/split.ts":
/*!**************************************!*\
  !*** ./src/common/function/split.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ split)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _util_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/array */ "./src/common/util/array.ts");
/**
 * @file 拆解字符串，并 trim 每个部分
 */


/**
 * 拆解字符串，并 trim 每个部分
 *
 * @param str 字符串
 * @param sep 分隔符
 */
function split(str, sep) {
    const result = [];
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.number(str)) {
        str = str + '';
    }
    if (str && _util_is__WEBPACK_IMPORTED_MODULE_0__.string(str)) {
        _util_array__WEBPACK_IMPORTED_MODULE_1__.each(str.split(sep), (part, index) => {
            part = part.trim();
            if (part) {
                result.push(part);
            }
        });
    }
    return result;
}


/***/ }),

/***/ "./src/common/util/url.ts":
/*!********************************!*\
  !*** ./src/common/util/url.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildAbsoluteURL: () => (/* binding */ buildAbsoluteURL),
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* unused harmony exports parseQuery, stringifyQuery, mixin, normalizePath */
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _function_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/split */ "./src/common/function/split.ts");
/* harmony import */ var _util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/array */ "./src/common/util/array.ts");
/* harmony import */ var _util_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/object */ "./src/common/util/object.ts");
/**
 * @file url 操作
 */




/**
 * 把查询字符串解析成对象
 * @param queryStr
 */
function parseQuery(queryStr, separator = '&') {
    const result = {};
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.string(queryStr) && queryStr.indexOf('=') >= 0) {
        let firstChar = queryStr.charAt(0);
        let startIndex = (firstChar === '?' || firstChar === '#') ? 1 : 0;
        if (startIndex > 0) {
            queryStr = queryStr.substr(startIndex);
        }
        _util_array__WEBPACK_IMPORTED_MODULE_2__.each((0,_function_split__WEBPACK_IMPORTED_MODULE_1__["default"])(queryStr, separator), (item) => {
            let terms = item.split('=');
            if (terms.length === 2) {
                let key = terms[0]?.trim();
                if (key) {
                    result[key] = decodeURIComponent(terms[1]);
                }
            }
        });
    }
    return result;
}
/**
 * 把对象序列化成查询字符串
 *
 * @param query
 * @return
 */
function stringifyQuery(query, separator = '&') {
    const result = [];
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject(query)) {
        _util_object__WEBPACK_IMPORTED_MODULE_3__.each(query, (value, key) => {
            result.push(key + '=' + encodeURIComponent(_util_is__WEBPACK_IMPORTED_MODULE_0__.object(value) ? JSON.stringify(value) : value));
        });
    }
    return result.join(separator);
}
/**
 * 解析 url，返回格式遵循 location 属性的命名
 *
 * @param url 如果不传，使用当前地址
 */
function parse(url) {
    const key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
    const parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    const result = {};
    const m = parser.exec(url);
    let i = 14;
    while (i--) {
        result[key[i]] = m[i] ?? '';
    }
    return {
        protocol: result.protocol,
        file: result.file,
        host: result.host,
        port: result.port,
        user: result.user,
        password: result.password,
        origin: `${result.protocol}://${result.authority}`,
        pathname: result.path,
        search: `?${result.query}`,
        hash: result.anchor ? `#${result.anchor}` : ''
    };
}
/**
 * 把参数混入一个 url
 *
 * @param query
 * @param url
 * @param applyHash
 */
function mixin(query, applyHash, url) {
    if (url == null) {
        url = document.URL;
    }
    let scheme = parse(url);
    let params = parseQuery(applyHash ? scheme.hash : scheme.search);
    _util_object__WEBPACK_IMPORTED_MODULE_3__.extend(params, query);
    let paramStr = _util_object__WEBPACK_IMPORTED_MODULE_3__.param(params);
    url = scheme.origin + scheme.pathname;
    if (applyHash) {
        url += scheme.search;
    }
    else if (paramStr) {
        url += '?' + paramStr;
    }
    if (!applyHash) {
        url += scheme.hash;
    }
    else if (paramStr) {
        url += '#' + paramStr;
    }
    return url;
}
const SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
const SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;
const FIRST_SEGMENT_REGEX = /^(?=([^\/?#]*))\1([^]*)$/;
const URL_REGEX = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;
function buildURLFromParts(parts) {
    return (parts.scheme +
        parts.netLoc +
        parts.path +
        parts.params +
        parts.query +
        parts.fragment);
}
function parseURL(url) {
    const parts = URL_REGEX.exec(url);
    if (!parts) {
        return null;
    }
    return {
        scheme: parts[1] || '',
        netLoc: parts[2] || '',
        path: parts[3] || '',
        params: parts[4] || '',
        query: parts[5] || '',
        fragment: parts[6] || ''
    };
}
function normalizePath(path) {
    // The following operations are
    // then applied, in order, to the new path:
    // 6a) All occurrences of "./", where "." is a complete path
    // segment, are removed.
    // 6b) If the path ends with "." as a complete path segment,
    // that "." is removed.
    path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
    // 6c) All occurrences of "<segment>/../", where <segment> is a
    // complete path segment not equal to "..", are removed.
    // Removal of these path segments is performed iteratively,
    // removing the leftmost matching pattern on each iteration,
    // until no matching pattern remains.
    // 6d) If the path ends with "<segment>/..", where <segment> is a
    // complete path segment not equal to "..", that
    // "<segment>/.." is removed.
    while (path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length) { }
    return path.split('').reverse().join('');
}
/**
 * from https://github.com/tjenkinson/url-toolkit
 *
 */
function buildAbsoluteURL(baseURL, relativeURL, opts) {
    opts = opts || {};
    // remove any remaining space and CRLF
    baseURL = baseURL.trim();
    relativeURL = relativeURL.trim();
    if (!relativeURL) {
        // 2a) If the embedded URL is entirely empty, it inherits the
        // entire base URL (i.e., is set equal to the base URL)
        // and we are done.
        if (!opts.alwaysNormalize) {
            return baseURL;
        }
        let basePartsForNormalize = parseURL(baseURL);
        if (!basePartsForNormalize) {
            throw new Error('Error trying to parse base URL.');
        }
        basePartsForNormalize.path = normalizePath(basePartsForNormalize.path);
        return buildURLFromParts(basePartsForNormalize);
    }
    let relativeParts = parseURL(relativeURL);
    if (!relativeParts) {
        throw new Error('Error trying to parse relative URL.');
    }
    if (relativeParts.scheme) {
        // 2b) If the embedded URL starts with a scheme name, it is
        // interpreted as an absolute URL and we are done.
        if (!opts.alwaysNormalize) {
            return relativeURL;
        }
        relativeParts.path = normalizePath(relativeParts.path);
        return buildURLFromParts(relativeParts);
    }
    let baseParts = parseURL(baseURL);
    if (!baseParts) {
        throw new Error('Error trying to parse base URL.');
    }
    if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
        // If netLoc missing and path doesn't start with '/', assume everything before the first '/' is the netLoc
        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
        let pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
        baseParts.netLoc = pathParts[1];
        baseParts.path = pathParts[2];
    }
    if (baseParts.netLoc && !baseParts.path) {
        baseParts.path = '/';
    }
    const builtParts = {
        // 2c) Otherwise, the embedded URL inherits the scheme of
        // the base URL.
        scheme: baseParts.scheme,
        netLoc: relativeParts.netLoc,
        path: null,
        params: relativeParts.params,
        query: relativeParts.query,
        fragment: relativeParts.fragment,
    };
    if (!relativeParts.netLoc) {
        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
        // (if any) of the base URL.
        builtParts.netLoc = baseParts.netLoc;
        // 4) If the embedded URL path is preceded by a slash "/", the
        // path is not relative and we skip to Step 7.
        if (relativeParts.path[0] !== '/') {
            if (!relativeParts.path) {
                // 5) If the embedded URL path is empty (and not preceded by a
                // slash), then the embedded URL inherits the base URL path
                builtParts.path = baseParts.path;
                // 5a) if the embedded URL's <params> is non-empty, we skip to
                // step 7; otherwise, it inherits the <params> of the base
                // URL (if any) and
                if (!relativeParts.params) {
                    builtParts.params = baseParts.params;
                    // 5b) if the embedded URL's <query> is non-empty, we skip to
                    // step 7; otherwise, it inherits the <query> of the base
                    // URL (if any) and we skip to step 7.
                    if (!relativeParts.query) {
                        builtParts.query = baseParts.query;
                    }
                }
            }
            else {
                // 6) The last segment of the base URL's path (anything
                // following the rightmost slash "/", or the entire path if no
                // slash is present) is removed and the embedded URL's path is
                // appended in its place.
                let baseURLPath = baseParts.path;
                let newPath = baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
                    relativeParts.path;
                builtParts.path = normalizePath(newPath);
            }
        }
    }
    if (builtParts.path === null) {
        builtParts.path = opts.alwaysNormalize
            ? normalizePath(relativeParts.path)
            : relativeParts.path;
    }
    return buildURLFromParts(builtParts);
}


/***/ })

}]);
//# sourceMappingURL=src_avnetwork_ioLoader_HlsIOLoader_ts.avplayer.js.map