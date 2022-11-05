// 操作video_source数据
export function getLocalVideoSource() {
    return (localStorage['video_source'] || '');
}

export function setLocalVideoSource(source) {
    return localStorage['video_source'] = source;
}

// 操作is_cache数据
export function getLocalCache() {
    return (localStorage['is_cache'] || '');
}

export function setLocalCache(value) {
    return localStorage['is_cache'] = value;
}

//操作客户端id
export function getLocalClientId() {
    return (localStorage['tv_id'] || '');
}

export function setLocalClientId(value) {
    return localStorage['tv_id'] = value;
}

const keyPlayHistory = 'video_history_list';

export function getLocalVideoList() {
    return JSON.parse((localStorage[keyPlayHistory] || '{}'));
}

export function getLocalVideoMaxTime(key) {
    let p = localStorage[keyPlayHistory];
    if (!p) {
        return 0;
    }
    p = JSON.parse(p);
    // eslint-disable-next-line no-prototype-builtins
    if (p && p.hasOwnProperty(key)) {
        return p[key]['maxTime'];
    }
    return 0;
}

export function setLocalVideoMaxTime(key, data) {
    data['updated_at'] = new Date().getTime();

    let tmpV = {};
    tmpV[key] = data;

    let p = localStorage[keyPlayHistory];
    if (!p) {
        // 还没设置过
        localStorage[keyPlayHistory] = JSON.stringify(tmpV);
        return true;
    }
    p = JSON.parse(p);
    if (!p) {
        // 错误的jSON？？？
        localStorage[keyPlayHistory] = JSON.stringify(tmpV);
        return true;
    }
    // 只有新的播放时间大于历史最大播放时间才更新
    if (p[key] && data['maxTime'] <= p[key]['maxTime']) {
        return false;
    }
    p = removeExpiredVideoHistory(p);

    p[key] = data;
    localStorage[keyPlayHistory] = JSON.stringify(p);

    return true;
}

function removeExpiredVideoHistory(videoList) {
    let count = 0;
    let expireKey = '';
    let expireTime = new Date().getTime();
    for (const tmpKey in videoList) {
        // eslint-disable-next-line no-prototype-builtins
        if (!videoList.hasOwnProperty(tmpKey)) {
            continue;
        }
        if (videoList[tmpKey]['updated_at'] <= expireTime) {
            count++;
            expireKey = tmpKey;
            expireTime = videoList[tmpKey]['updated_at'];
        }
    }
    if (count > 3) {
        delete videoList[expireKey];
    }
    return videoList;
}
