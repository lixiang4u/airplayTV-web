import IOWriter from 'common/io/IOWriterSync';
import { BoxType } from './boxType';
import { FragmentMode, MovMode } from './mov';
export interface BoxsPositionSizeInfo {
    pos: bigint;
    type: BoxType;
    size: number;
}
export interface Atom {
    type: number;
    size: number;
}
export interface FragmentTrack {
    trackId: number;
    baseDataOffset: bigint;
    defaultSampleDuration: number;
    defaultSampleSize: number;
    defaultSampleFlags: number;
    baseMediaDecodeTime: bigint;
    sampleCount: number;
    dataOffset: number;
    dataOffsetPos: bigint;
    firstSampleFlags: number;
    sampleDurations: number[];
    sampleSizes: number[];
    sampleFlags: number[];
    sampleCompositionTimeOffset: number[];
    baseIsMoof: boolean;
    ioWriter: IOWriter;
    buffers: Uint8Array[];
    streamIndex?: number;
}
export interface Sample {
    dts: bigint;
    pts: bigint;
    pos: bigint;
    size: number;
    duration: number;
    flags: number;
}
export interface EC3Info {
    done: boolean;
    numBlocks: uint8;
    dataRate: uint16;
    ac3BitrateCode: int8;
    numIndSub: uint8;
    substream: {
        fscod: uint8;
        bsid: uint8;
        bsmod: uint8;
        acmod: uint8;
        lfeon: uint8;
        numDepSub: uint8;
        chanLoc: uint8;
    }[];
}
export interface MOVContext {
    isom: boolean;
    timescale: number;
    duration: bigint;
    foundMoov: boolean;
    foundMdat: boolean;
    majorBrand: number;
    minorVersion: number;
    compatibleBrand: number[];
    creationTime: bigint;
    modificationTime: bigint;
    rate: number;
    volume: number;
    matrix: Uint32Array;
    nextTrackId: number;
    fragment: boolean;
    trexs: {
        trackId: number;
        size: number;
        duration: number;
        flags: number;
    }[];
    currentFragment: {
        sequence: number;
        currentTrack: FragmentTrack;
        tracks: FragmentTrack[];
        pos: bigint;
        size: number;
        firstWrote?: boolean;
    };
    boxsPositionInfo: BoxsPositionSizeInfo[];
    holdMoovPos: bigint;
    currentChunk: {
        sampleCount: number;
        streamIndex: number;
        pos: bigint;
    };
    ac3Info?: EC3Info;
    firstMoof?: int64;
}
export interface MOVStreamContext {
    chunkOffsets: bigint[];
    cttsSampleCounts: number[];
    cttsSampleOffsets: number[];
    stscFirstChunk: number[];
    stscSamplesPerChunk: number[];
    stscSampleDescriptionIndex: number[];
    stssSampleNumbersMap: Map<number, boolean>;
    stssSampleNumbers: number[];
    sampleSizes: number[];
    sttsSampleCounts: number[];
    sttsSampleDeltas: number[];
    fragIndexes: {
        pos: bigint;
        time: bigint;
    }[];
    timescale: number;
    duration: bigint;
    trackId: number;
    layer: number;
    alternateGroup: number;
    volume: number;
    matrix: Uint32Array;
    width: number;
    height: number;
    audioCid: number;
    samplesPerFrame: number;
    bytesPerFrame: number;
    currentSample: number;
    sampleEnd: boolean;
    samplesIndex: Sample[];
    lastPts: bigint;
    lastDts: bigint;
    startDts: bigint;
    startCT: number;
    lastDuration: number;
    chunkCount: number;
    firstWrote: boolean;
    lastStscCount: number;
    perStreamGrouping: boolean;
    index: number;
    flags: number;
}
export interface MovFormatOptions {
    fragmentMode?: FragmentMode;
    movMode?: MovMode;
    fragment?: boolean;
    fastOpen?: boolean;
    defaultBaseIsMoof?: boolean;
}
