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
