"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avnetwork_ioLoader_DashIOLoader_ts"],{

/***/ "./src/avnetwork/ioLoader/DashIOLoader.ts":
/*!************************************************!*\
  !*** ./src/avnetwork/ioLoader/DashIOLoader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DashIOLoader)
/* harmony export */ });
/* harmony import */ var common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/timer/Sleep */ "./src/common/timer/Sleep.ts");
/* harmony import */ var _IOLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IOLoader */ "./src/avnetwork/ioLoader/IOLoader.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avprotocol_dash_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avprotocol/dash/parser */ "./src/avprotocol/dash/parser.ts");
/* harmony import */ var _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FetchIOLoader */ "./src/avnetwork/ioLoader/FetchIOLoader.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
var cheap__fileName__0 = "src\\avnetwork\\ioLoader\\DashIOLoader.ts";
/*
 * libmedia dash loader
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
class DashIOLoader extends _IOLoader__WEBPACK_IMPORTED_MODULE_1__["default"] {
    info;
    range;
    mediaPlayList;
    fetchMediaPlayListPromise;
    minBuffer;
    audioResource;
    videoResource;
    subtitleResource;
    createResource(type) {
        return {
            type,
            fetchedMap: new Map(),
            fetchedHistoryList: [],
            loader: null,
            segmentIndex: 0,
            currentUri: '',
            selectedIndex: 0,
            segments: [],
            initSegmentPadding: '',
            initedSegment: ''
        };
    }
    async fetchMediaPlayList(resolve) {
        if (!resolve) {
            if (this.fetchMediaPlayListPromise) {
                return;
            }
            this.fetchMediaPlayListPromise = new Promise((r) => {
                resolve = r;
            });
        }
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
            this.mediaPlayList = (0,avprotocol_dash_parser__WEBPACK_IMPORTED_MODULE_4__["default"])(text, this.info.url);
            this.minBuffer = this.mediaPlayList.minBufferTime;
            if (this.options.isLive) {
                const needSegment = this.mediaPlayList.minBufferTime / this.mediaPlayList.maxSegmentDuration;
                const segmentCount = Math.max(this.mediaPlayList.mediaList.audio && this.mediaPlayList.mediaList.audio[0]?.mediaSegments.length || 0, this.mediaPlayList.mediaList.video && this.mediaPlayList.mediaList.video[0]?.mediaSegments.length || 0);
                if (segmentCount < needSegment) {
                    await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"]((needSegment - segmentCount) * this.mediaPlayList.maxSegmentDuration);
                    common_util_logger__WEBPACK_IMPORTED_MODULE_3__.warn(`wait for min buffer time, buffer: ${segmentCount * this.mediaPlayList.maxSegmentDuration}, need: ${needSegment * this.mediaPlayList.maxSegmentDuration}`, cheap__fileName__0, 143);
                    return this.fetchMediaPlayList(resolve);
                }
            }
            if (this.mediaPlayList.type === 'vod') {
                this.options.isLive = false;
            }
            else {
                this.options.isLive = true;
            }
            if (this.mediaPlayList.mediaList.audio.length) {
                const media = this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];
                if (media.file) {
                    this.audioResource.segments = [media.file];
                }
                else {
                    if (this.options.isLive && this.audioResource.initedSegment === media.initSegment) {
                        this.audioResource.segments = media.mediaSegments.map((s) => s.url);
                    }
                    else {
                        this.audioResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                        this.audioResource.initedSegment = media.initSegment;
                    }
                }
            }
            if (this.mediaPlayList.mediaList.video.length) {
                const media = this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];
                if (media.file) {
                    this.videoResource.segments = [media.file];
                }
                else {
                    if (this.options.isLive && this.videoResource.initedSegment === media.initSegment) {
                        this.videoResource.segments = media.mediaSegments.map((s) => s.url);
                    }
                    else {
                        this.videoResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                        this.videoResource.initedSegment = media.initSegment;
                    }
                }
            }
            if (this.mediaPlayList.mediaList.subtitle.length) {
                const media = this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];
                if (media.file) {
                    this.subtitleResource.segments = [media.file];
                }
                else {
                    if (this.options.isLive && this.subtitleResource.initedSegment === media.initSegment) {
                        this.subtitleResource.segments = media.mediaSegments.map((s) => s.url);
                    }
                    else {
                        this.subtitleResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                        this.subtitleResource.initedSegment = media.initSegment;
                    }
                }
            }
            resolve();
            this.fetchMediaPlayListPromise = null;
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
            this.retryCount = 0;
            return this.mediaPlayList;
        }
        catch (error) {
            if (this.retryCount < this.options.retryCount) {
                this.retryCount++;
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`failed fetch mpd file, retry(${this.retryCount}/3)`, cheap__fileName__0, 215);
                await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](this.status === 2 /* IOLoaderStatus.BUFFERING */ ? this.options.retryInterval : 5);
                return this.fetchMediaPlayList(resolve);
            }
            else {
                this.status = 3 /* IOLoaderStatus.ERROR */;
                resolve();
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.fatal(`DashLoader: exception, fetch slice error, error: ${error.message}`, cheap__fileName__0, 223);
            }
        }
    }
    async open(info, range) {
        if (this.status !== 0 /* IOLoaderStatus.IDLE */) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.INVALID_OPERATE;
        }
        this.info = info;
        this.range = range;
        if (!this.range.to) {
            this.range.to = -1;
        }
        this.range.from = Math.max(this.range.from, 0);
        this.videoResource = this.createResource('video');
        this.audioResource = this.createResource('audio');
        this.subtitleResource = this.createResource('subtitle');
        this.status = 1 /* IOLoaderStatus.CONNECTING */;
        this.retryCount = 0;
        await this.fetchMediaPlayList();
        return 0;
    }
    async readResource(buffer, resource) {
        let ret = 0;
        if (resource.loader) {
            ret = await resource.loader.read(buffer);
            if (ret !== -1048576 /* IOError.END */) {
                return ret;
            }
            else {
                if (this.options.isLive) {
                    resource.fetchedMap.set(resource.currentUri, true);
                    if (resource.fetchedHistoryList.length === FETCHED_HISTORY_LIST_MAX) {
                        resource.fetchedMap.delete(resource.fetchedHistoryList.shift());
                    }
                    resource.fetchedHistoryList.push(resource.currentUri);
                }
                else {
                    resource.segmentIndex++;
                    if (resource.segmentIndex >= resource.segments.length) {
                        return -1048576 /* IOError.END */;
                    }
                }
                resource.loader = null;
            }
        }
        if (this.options.isLive) {
            const segments = resource.segments.filter((url) => {
                return !resource.fetchedMap.get(url);
            });
            if (!segments.length) {
                if (this.mediaPlayList.isEnd) {
                    return -1048576 /* IOError.END */;
                }
                const wait = ((this.mediaPlayList.duration || this.mediaPlayList.minimumUpdatePeriod)
                    - ((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__["default"])() - this.mediaPlayList.timestamp) / 1000);
                if (wait > 0) {
                    await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](Math.max(wait, 2));
                }
                if (this.fetchMediaPlayListPromise) {
                    await this.fetchMediaPlayListPromise;
                    if (this.status === 3 /* IOLoaderStatus.ERROR */) {
                        return -1048576 /* IOError.END */;
                    }
                }
                else {
                    await this.fetchMediaPlayList();
                }
                return this.readResource(buffer, resource);
            }
            resource.currentUri = segments[0];
            resource.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            await resource.loader.open({
                url: resource.currentUri
            }, {
                from: 0,
                to: -1
            });
            return resource.loader.read(buffer);
        }
        else {
            resource.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            if (resource.initSegmentPadding) {
                await resource.loader.open({
                    url: resource.initSegmentPadding
                }, {
                    from: 0,
                    to: -1
                });
                resource.initSegmentPadding = null;
                resource.segmentIndex--;
            }
            else {
                await resource.loader.open({
                    url: resource.segments[resource.segmentIndex]
                }, {
                    from: 0,
                    to: -1
                });
            }
            return resource.loader.read(buffer);
        }
    }
    async read(buffer, options) {
        if (options.mediaType === 'audio') {
            return this.readResource(buffer, this.audioResource);
        }
        else if (options.mediaType === 'video') {
            return this.readResource(buffer, this.videoResource);
        }
        else if (options.mediaType === 'subtitle') {
            return this.readResource(buffer, this.subtitleResource);
        }
        return avutil_error__WEBPACK_IMPORTED_MODULE_7__.INVALID_ARGUMENT;
    }
    async seekResource(timestamp, resource) {
        if (resource.loader) {
            await resource.loader.abort();
            resource.loader = null;
        }
        let seekTime = Number(BigInt.asIntN(32, timestamp));
        if (resource.segments) {
            let index = 0;
            const mediaList = resource.type === 'audio'
                ? this.mediaPlayList.mediaList.audio
                : (resource.type === 'video'
                    ? this.mediaPlayList.mediaList.video
                    : this.mediaPlayList.mediaList.subtitle);
            const segmentList = mediaList[resource.selectedIndex].mediaSegments;
            if (segmentList?.length) {
                for (let i = 0; i < segmentList.length; i++) {
                    if (seekTime >= segmentList[i].start * 1000 && seekTime < segmentList[i].end * 1000) {
                        index = i;
                        break;
                    }
                }
            }
            resource.segmentIndex = index + (mediaList[resource.selectedIndex].initSegment ? 1 : 0);
        }
    }
    async seek(timestamp, options) {
        if (options.mediaType === 'audio' && this.audioResource.loader) {
            await this.seekResource(timestamp, this.audioResource);
        }
        if (options.mediaType === 'video' && this.videoResource.loader) {
            await this.seekResource(timestamp, this.videoResource);
        }
        if (options.mediaType === 'subtitle' && this.subtitleResource.loader) {
            await this.seekResource(timestamp, this.subtitleResource);
        }
        if (this.status === 4 /* IOLoaderStatus.COMPLETE */) {
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
        }
        return 0;
    }
    async size() {
        return BigInt(0);
    }
    async abort() {
        if (this.videoResource.loader) {
            await this.videoResource.loader.abort();
            this.videoResource.loader = null;
        }
        if (this.audioResource.loader) {
            await this.audioResource.loader.abort();
            this.audioResource.loader = null;
        }
        if (this.subtitleResource.loader) {
            await this.subtitleResource.loader.abort();
            this.subtitleResource.loader = null;
        }
    }
    async stop() {
        await this.abort();
        this.status = 0 /* IOLoaderStatus.IDLE */;
    }
    getDuration() {
        return this.mediaPlayList.duration;
    }
    hasVideo() {
        return this.mediaPlayList?.mediaList.video.length > 0;
    }
    hasAudio() {
        return this.mediaPlayList?.mediaList.audio.length > 0;
    }
    hasSubtitle() {
        return this.mediaPlayList?.mediaList.subtitle.length > 0;
    }
    getVideoList() {
        if (this.hasVideo()) {
            return {
                list: this.mediaPlayList.mediaList.video.map((media) => {
                    return {
                        width: media.width,
                        height: media.height,
                        frameRate: media.frameRate,
                        codecs: media.codecs
                    };
                }),
                selectedIndex: this.videoResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    getAudioList() {
        if (this.hasAudio()) {
            return {
                list: this.mediaPlayList.mediaList.audio.map((media) => {
                    return {
                        lang: media.lang,
                        codecs: media.codecs
                    };
                }),
                selectedIndex: this.audioResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    getSubtitleList() {
        if (this.hasSubtitle()) {
            return {
                list: this.mediaPlayList.mediaList.subtitle.map((media) => {
                    return {
                        lang: media.lang,
                        codecs: media.codecs
                    };
                }),
                selectedIndex: this.subtitleResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    selectVideo(index) {
        if (index !== this.videoResource.selectedIndex
            && this.hasVideo()
            && index >= 0
            && index < this.mediaPlayList.mediaList.video.length) {
            this.videoResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];
            if (media.file) {
                this.videoResource.segments = [media.file];
            }
            else {
                this.videoResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                this.videoResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    selectAudio(index) {
        if (index !== this.audioResource.selectedIndex
            && this.hasAudio()
            && index >= 0
            && index < this.mediaPlayList.mediaList.audio.length) {
            this.audioResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];
            if (media.file) {
                this.audioResource.segments = [media.file];
            }
            else {
                this.audioResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                this.audioResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    selectSubtitle(index) {
        if (index !== this.subtitleResource.selectedIndex
            && this.hasSubtitle()
            && index >= 0
            && index < this.mediaPlayList.mediaList.subtitle.length) {
            this.subtitleResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];
            if (media.file) {
                this.subtitleResource.segments = [media.file];
            }
            else {
                this.subtitleResource.segments = [media.initSegment].concat(media.mediaSegments.map((s) => s.url));
                this.subtitleResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    getMinBuffer() {
        return this.minBuffer;
    }
}


/***/ }),

/***/ "./src/avprotocol/dash/parser.ts":
/*!***************************************!*\
  !*** ./src/avprotocol/dash/parser.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parser)
/* harmony export */ });
/* harmony import */ var common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/xml2Json */ "./src/common/util/xml2Json.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_function_toString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/toString */ "./src/common/function/toString.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/**
 * from https://github.com/bytedance/xgplayer/blob/main/packages/xgplayer-dash/src/m4s/mpd.js
 * MIT license
 */




function parseMPD(xmlString) {
    if (!xmlString) {
        return null;
    }
    return (0,common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__["default"])(xmlString);
}
function durationConvert(value) {
    let Hours = 0;
    let Minutes = 0;
    let Seconds = 0;
    value = value.slice(value.indexOf('PT') + 2);
    if (value.indexOf('H') > -1 && value.indexOf('M') > -1 && value.indexOf('S') > -1) {
        Hours = parseFloat(value.slice(0, value.indexOf('H')));
        Minutes = parseFloat(value.slice(value.indexOf('H') + 1, value.indexOf('M')));
        Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')));
    }
    else if (value.indexOf('H') < 0 && value.indexOf('M') > 0 && value.indexOf('S') > -1) {
        Minutes = parseFloat(value.slice(0, value.indexOf('M')));
        Seconds = parseFloat(value.slice(value.indexOf('M') + 1, value.indexOf('S')));
    }
    else if (value.indexOf('H') < 0 && value.indexOf('M') < 0 && value.indexOf('S') > -1) {
        Seconds = parseFloat(value.slice(0, value.indexOf('S')));
    }
    return Hours * 3600 + Minutes * 60 + Seconds;
}
function preFixInteger(num, n) {
    return (Array(n).join('0') + num).slice(-n);
}
function parseRational(value) {
    if (!value) {
        return 0;
    }
    if (value.indexOf('/') > -1) {
        const rational = value.split('/');
        return parseFloat(rational[0]) / parseFloat(rational[1]);
    }
    return parseFloat(value);
}
function parser(xml, url) {
    const list = {
        source: xml,
        mediaList: {
            audio: [],
            video: [],
            subtitle: []
        },
        type: 'live',
        isEnd: false,
        duration: 0,
        minBufferTime: 0,
        maxSegmentDuration: 0,
        minimumUpdatePeriod: 0,
        timestamp: (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_3__["default"])()
    };
    const repID = [];
    const result = parseMPD(xml).MPD;
    if (result.type === 'static') {
        list.type = 'vod';
        list.isEnd = true;
    }
    if (result.minBufferTime) {
        list.minBufferTime = durationConvert(result.minBufferTime);
    }
    if (result.maxSegmentDuration) {
        list.maxSegmentDuration = durationConvert(result.maxSegmentDuration);
    }
    if (result.minimumUpdatePeriod) {
        list.minimumUpdatePeriod = durationConvert(result.minimumUpdatePeriod);
    }
    if (result.mediaPresentationDuration) {
        list.duration = durationConvert(result.mediaPresentationDuration);
    }
    let MpdBaseURL = '';
    if (result.BaseURL) {
        MpdBaseURL = result.BaseURL;
    }
    const Period = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(result.Period) ? result.Period[0] : result.Period;
    if (!list.duration && Period && Period.duration) {
        list.duration = durationConvert(Period.duration);
    }
    const AdaptationSet = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(Period.AdaptationSet) ? Period.AdaptationSet : [Period.AdaptationSet];
    AdaptationSet.forEach((asItem, asIndex) => {
        let mimeType = 'video/mp4';
        let codecs = 'avc1.64001E';
        let width = 640;
        let height = 360;
        let maxWidth = 640;
        let maxHeight = 360;
        let frameRate = 25;
        let sar = '1:1';
        let startWithSAP = '1';
        let bandwidth = 588633;
        let adaptationSetBaseUrl = MpdBaseURL;
        let lang = 'und';
        if (asItem.BaseURL) {
            adaptationSetBaseUrl += asItem.BaseURL;
        }
        if (asItem.lang) {
            lang = asItem.lang;
        }
        if (asItem.mimeType) {
            mimeType = asItem.mimeType;
            if (mimeType === 'video/mp4') {
                codecs = asItem.codecs;
                width = parseFloat(asItem.width);
                height = parseFloat(asItem.height);
                if (asItem.maxWidth) {
                    maxWidth = parseFloat(asItem.maxWidth);
                }
                if (asItem.maxHeight) {
                    maxHeight = parseFloat(asItem.maxHeight);
                }
                if (asItem.frameRate) {
                    frameRate = parseRational(asItem.frameRate);
                }
                sar = asItem.sar;
                startWithSAP = asItem.startWithSAP;
                bandwidth = parseFloat(asItem.bandwidth);
            }
            else if (mimeType === 'audio/mp4') {
                codecs = asItem.codecs;
                startWithSAP = asItem.startWithSAP;
                bandwidth = parseFloat(asItem.bandwidth);
            }
        }
        else {
            if (asItem.maxWidth) {
                maxWidth = parseFloat(asItem.maxWidth);
            }
            if (asItem.maxHeight) {
                maxHeight = parseFloat(asItem.maxHeight);
            }
            if (asItem.frameRate) {
                frameRate = parseRational(asItem.frameRate);
            }
        }
        const Representation = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(asItem.Representation) ? asItem.Representation : [asItem.Representation];
        Representation.forEach((rItem, rIndex) => {
            if (repID.indexOf(rItem.id) > -1) {
                rItem.id = (parseInt(repID[repID.length - 1]) + 1).toString();
            }
            repID.push(rItem.id);
            let initSegment = '';
            const mediaSegments = [];
            let timescale = 0;
            let duration = 0;
            let baseURL = url.slice(0, url.lastIndexOf('/') + 1) + adaptationSetBaseUrl;
            if (rItem.mimeType) {
                mimeType = rItem.mimeType;
            }
            if (mimeType === 'video/mp4') {
                if (rItem.codecs) {
                    codecs = rItem.codecs;
                }
                if (rItem.width) {
                    width = parseFloat(rItem.width);
                }
                if (rItem.height) {
                    height = parseFloat(rItem.height);
                }
                if (rItem.maxWidth) {
                    maxWidth = parseFloat(rItem.maxWidth);
                }
                if (rItem.maxHeight) {
                    maxHeight = parseFloat(rItem.maxHeight);
                }
                if (rItem.frameRate) {
                    frameRate = parseFloat(rItem.frameRate);
                }
                if (rItem.sar) {
                    sar = rItem.sar;
                }
                if (rItem.startWithSAP) {
                    startWithSAP = rItem.startWithSAP;
                }
                if (rItem.bandwidth) {
                    bandwidth = parseFloat(rItem.bandwidth);
                }
            }
            else {
                if (rItem.codecs) {
                    codecs = rItem.codecs;
                }
                if (rItem.startWithSAP) {
                    startWithSAP = rItem.startWithSAP;
                }
                if (rItem.bandwidth) {
                    bandwidth = parseFloat(rItem.bandwidth);
                }
            }
            if (rItem.BaseURL) {
                baseURL += rItem.BaseURL;
            }
            let encrypted = false;
            if (asItem.ContentProtection || rItem.ContentProtection) {
                encrypted = true;
            }
            if (rItem.SegmentBase) {
                if (mimeType === 'video/mp4') {
                    list.mediaList.video.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        width,
                        height,
                        maxWidth,
                        maxHeight,
                        frameRate,
                        sar,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted
                    });
                }
                else if (mimeType === 'audio/mp4') {
                    list.mediaList.audio.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted,
                        lang
                    });
                }
                else if (mimeType === 'application/mp4') {
                    list.mediaList.subtitle.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted,
                        lang
                    });
                }
            }
            else {
                let ST;
                if (asItem.SegmentTemplate) {
                    ST = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(asItem.SegmentTemplate) ? asItem.SegmentTemplate[0] : asItem.SegmentTemplate;
                }
                if (rItem.SegmentTemplate) {
                    ST = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(rItem.SegmentTemplate) ? rItem.SegmentTemplate[0] : rItem.SegmentTemplate;
                }
                if (ST) {
                    const start = parseInt(ST.startNumber);
                    initSegment = ST.initialization;
                    timescale = parseFloat(ST.timescale || '1');
                    if (ST.duration && !ST.SegmentTimeline) {
                        duration = parseFloat(ST.duration);
                        let segmentDuration = duration / timescale;
                        const end = start + Math.ceil((list.duration || segmentDuration) / segmentDuration) - 1;
                        for (let i = start; i <= end; i++) {
                            const startTime = segmentDuration * (i - start);
                            let endTime = segmentDuration * (i - start + 1);
                            if (i === end) {
                                segmentDuration = list.duration - segmentDuration * (end - start);
                                endTime = list.duration;
                            }
                            mediaSegments.push({
                                idx: i,
                                start: startTime,
                                end: endTime,
                                url: baseURL + ST.media.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Number(%(\d+)d)?\$/g, (s0, s1, s2) => {
                                    if (s2) {
                                        return preFixInteger(i, +s2);
                                    }
                                    return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(i);
                                }),
                                segmentDuration
                            });
                        }
                    }
                    else if (ST.SegmentTimeline && ST.SegmentTimeline.S) {
                        const S = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(ST.SegmentTimeline.S) ? ST.SegmentTimeline.S : [ST.SegmentTimeline.S];
                        let startTime = 0;
                        let index = start;
                        for (let i = 0; i < S.length; i++) {
                            let d = parseFloat(S[i].d);
                            if (S[i].t) {
                                startTime = parseFloat(S[0].t);
                            }
                            let r = 1;
                            if (S[i].r) {
                                r = parseInt(S[i].r) + 1;
                            }
                            for (let j = 0; j < r; j++) {
                                mediaSegments.push({
                                    idx: index,
                                    start: startTime / timescale,
                                    end: (startTime + d) / timescale,
                                    url: baseURL + ST.media.replace(/\$RepresentationID\$/g, rItem.id)
                                        .replace(/\$Number(%(\d+)d)?\$/g, (s0, s1, s2) => {
                                        if (s2) {
                                            return preFixInteger(index, +s2);
                                        }
                                        return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(index);
                                    })
                                        .replace(/\$Time\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(startTime)),
                                    segmentDuration: d / timescale
                                });
                                index++;
                                startTime += d;
                            }
                        }
                    }
                }
                else if (rItem.SegmentList) {
                    const segmentList = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(rItem.SegmentList.SegmentURL) ? rItem.SegmentList.SegmentURL : [rItem.SegmentList.SegmentURL];
                    let startTime = 0;
                    let duration = parseFloat(rItem.SegmentList.duration);
                    for (let i = 0; i < segmentList.length; i++) {
                        mediaSegments.push({
                            idx: i,
                            start: startTime / timescale,
                            end: (startTime + duration) / timescale,
                            url: baseURL + segmentList[i].media,
                            segmentDuration: duration / timescale
                        });
                        startTime += duration;
                    }
                }
                if (mimeType === 'video/mp4') {
                    list.mediaList.video.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        width,
                        height,
                        maxWidth,
                        maxHeight,
                        frameRate,
                        sar,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted
                    });
                }
                else if (mimeType === 'audio/mp4') {
                    list.mediaList.audio.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted,
                        lang
                    });
                }
                else if (mimeType === 'application/mp4') {
                    list.mediaList.subtitle.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_2__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        encrypted,
                        lang
                    });
                }
            }
        });
    });
    ['video', 'audio'].forEach((mediaType) => {
        list.mediaList[mediaType].sort((a, b) => {
            return a.bandwidth - b.bandwidth;
        });
    });
    return list;
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
//# sourceMappingURL=src_avnetwork_ioLoader_DashIOLoader_ts.avtranscoder.js.map