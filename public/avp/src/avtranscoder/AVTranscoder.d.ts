import { AVCodecID, AVMediaType } from 'avutil/codec';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import IOReader from 'common/io/IOReader';
import { AudioCodecString2CodecId, Format2AVFormat, PixfmtString2AVPixelFormat, SampleFmtString2SampleFormat, VideoCodecString2CodecId } from 'avutil/stringEnum';
import IOWriterSync from 'common/io/IOWriterSync';
import Emitter from 'common/event/Emitter';
import { ControllerObserver } from './Controller';
import { Data } from 'common/types/type';
export interface AVTranscoderOptions {
    getWasm: (type: 'decoder' | 'resampler' | 'scaler' | 'encoder', codec?: AVCodecID, mediaType?: AVMediaType) => string | ArrayBuffer | WebAssemblyResource;
    enableHardware?: boolean;
    onprogress?: (taskId: string, progress: number) => void;
}
export interface TaskOptions {
    input: {
        file: string | File | IOReader;
        format?: keyof (typeof Format2AVFormat);
        protocol?: 'hls' | 'dash';
    };
    start?: number;
    duration?: number;
    nbFrame?: number;
    output: {
        file: FileSystemFileHandle | IOWriterSync;
        format?: keyof (typeof Format2AVFormat);
        formatOptions?: Data;
        video?: {
            /**
             * 输出编码类型
             */
            codec?: keyof (typeof VideoCodecString2CodecId);
            /**
             * 是否不输出
             */
            disable?: boolean;
            /**
             * 输出宽度
             */
            width?: number;
            /**
             * 输出高度
             */
            height?: number;
            /**
             * 输出帧率
             */
            framerate?: number;
            /**
             * 输出码率
             */
            bitrate?: number;
            /**
             * 输出视频高宽比
             */
            aspect?: {
                den: number;
                num: number;
            };
            /**
             * 输出像素格式
             */
            pixfmt?: keyof (typeof PixfmtString2AVPixelFormat);
            /**
             * 输出关键帧间隔(毫秒)
             */
            keyFrameInterval?: number;
            profile?: number;
            level?: number;
            delay?: number;
        };
        audio?: {
            /**
             * 输出编码类型
             */
            codec?: keyof (typeof AudioCodecString2CodecId);
            /**
             * 是否不输出
             */
            disable?: boolean;
            /**
             * 输出声道数
             */
            channels?: number;
            /**
             * 输出采样率
             */
            sampleRate?: number;
            /**
             * 输出码率
             */
            bitrate?: number;
            /**
             * 输出采样格式
             */
            sampleFmt?: keyof (typeof SampleFmtString2SampleFormat);
            profile?: number;
        };
    };
}
export default class AVTranscoder extends Emitter implements ControllerObserver {
    static Resource: Map<string, WebAssemblyResource>;
    private level;
    private DemuxThreadReady;
    private AudioThreadReady;
    private VideoThreadReady;
    private MuxThreadReady;
    private IOThread;
    private DemuxerThread;
    private MuxThread;
    private AudioDecoderThread;
    private AudioFilterThread;
    private AudioEncoderThread;
    private VideoDecoderThread;
    private VideoFilterThread;
    private VideoEncoderThread;
    private GlobalData;
    private tasks;
    private options;
    private reportTimer;
    constructor(options: AVTranscoderOptions);
    private getResource;
    private report;
    private startDemuxPipeline;
    private startVideoPipeline;
    private startAudioPipeline;
    private startMuxPipeline;
    private isHls;
    private isDash;
    ready(): Promise<void>;
    private copyAVStreamInterface;
    private setTaskInput;
    private setTaskOutput;
    private analyzeInputStreams;
    private handleAudioStream;
    private handleVideoStream;
    private handleCopyStream;
    private clearTask;
    addTask(taskOptions: TaskOptions): Promise<string>;
    startTask(taskId: string): Promise<void>;
    pauseTask(taskId: string): Promise<void>;
    unpauseTask(taskId: string): Promise<void>;
    cancelTask(taskId: string): Promise<void>;
    destroy(): Promise<void>;
    setLogLevel(level: number): void;
    onGetDecoderResource(mediaType: AVMediaType, codecId: AVCodecID): Promise<WebAssemblyResource>;
}
