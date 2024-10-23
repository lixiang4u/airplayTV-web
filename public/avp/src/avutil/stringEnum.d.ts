import { AVFormat } from 'avformat/avformat';
import { AVCodecID, AVMediaType } from './codec';
import { AVColorPrimaries, AVColorRange, AVColorSpace, AVColorTransferCharacteristic, AVPixelFormat } from './pixfmt';
import { AVSampleFormat } from './audiosamplefmt';
import { AVDisposition } from 'avformat/AVStream';
import { IOType } from 'avpipeline/IOPipeline';
export declare const CodecId2MimeType: {
    86017: string;
    86018: string;
    86021: string;
    86028: string;
    86076: string;
    65542: string;
    65543: string;
    225: string;
    27: string;
    173: string;
    196: string;
    139: string;
    167: string;
    12: string;
};
export declare const Ext2Format: Record<string, AVFormat>;
export declare const Ext2IOLoader: Record<string, IOType>;
export declare const VideoCodecString2CodecId: {
    copy: AVCodecID;
    h264: AVCodecID;
    avc: AVCodecID;
    hevc: AVCodecID;
    h265: AVCodecID;
    vvc: AVCodecID;
    h266: AVCodecID;
    av1: AVCodecID;
    vp9: AVCodecID;
    vp8: AVCodecID;
    mpeg4: AVCodecID;
    theora: AVCodecID;
    mpeg2video: AVCodecID;
};
export declare const AudioCodecString2CodecId: {
    copy: AVCodecID;
    aac: AVCodecID;
    ac3: AVCodecID;
    eac3: AVCodecID;
    dca: AVCodecID;
    mp3: AVCodecID;
    opus: AVCodecID;
    flac: AVCodecID;
    speex: AVCodecID;
    vorbis: AVCodecID;
    pcm_alaw: AVCodecID;
    pcm_mulaw: AVCodecID;
};
export declare const SubtitleCodecString2CodecId: {
    webvtt: AVCodecID;
    subrip: AVCodecID;
    ass: AVCodecID;
    ttml: AVCodecID;
    mov_text: AVCodecID;
    hdmv_pgs: AVCodecID;
    hdmv_text: AVCodecID;
    dvd: AVCodecID;
    dvb: AVCodecID;
    eia_608: AVCodecID;
};
export declare const PixfmtString2AVPixelFormat: {
    yuv420p: AVPixelFormat;
    yuv422p: AVPixelFormat;
    yuv444p: AVPixelFormat;
    yuva420p: AVPixelFormat;
    yuva422p: AVPixelFormat;
    yuva444p: AVPixelFormat;
    yuv420p10le: AVPixelFormat;
    yuv422p10le: AVPixelFormat;
    yuv444p10le: AVPixelFormat;
    yuva420p10le: AVPixelFormat;
    yuva422p10le: AVPixelFormat;
    yuva444p10le: AVPixelFormat;
    yuv420p10be: AVPixelFormat;
    yuv422p10be: AVPixelFormat;
    yuv444p10be: AVPixelFormat;
    yuva420p10be: AVPixelFormat;
    yuva422p10be: AVPixelFormat;
    yuva444p10be: AVPixelFormat;
};
export declare const SampleFmtString2SampleFormat: {
    u8: AVSampleFormat;
    'u8-planar': AVSampleFormat;
    s16: AVSampleFormat;
    's16-planar': AVSampleFormat;
    s32: AVSampleFormat;
    's32-planar': AVSampleFormat;
    s64: AVSampleFormat;
    's64-planar': AVSampleFormat;
    float: AVSampleFormat;
    'float-planar': AVSampleFormat;
    double: AVSampleFormat;
    'double-planar': AVSampleFormat;
};
export declare const Format2AVFormat: Record<string, AVFormat>;
export declare const colorRange2AVColorRange: Record<string, AVColorRange>;
export declare const colorSpace2AVColorSpace: Record<string, AVColorSpace>;
export declare const colorPrimaries2AVColorPrimaries: Record<string, AVColorPrimaries>;
export declare const colorTrc2AVColorTransferCharacteristic: Record<string, AVColorTransferCharacteristic>;
export declare const mediaType2AVMediaType: Record<string, AVMediaType>;
export declare const disposition2AVDisposition: Record<string, AVDisposition>;
