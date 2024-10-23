import { AVOFormatContext } from 'avformat/AVFormatContext';
import Pipeline, { TaskOptions } from 'avpipeline/Pipeline';
import IPCPort from 'common/network/IPCPort';
import OFormat from 'avformat/formats/OFormat';
import IOWriter from 'common/io/IOWriterSync';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { Rational } from 'avutil/struct/rational';
import LoopTask from 'common/timer/LoopTask';
import Track from 'avrender/track/Track';
import { AVPacketPool, AVPacketRef } from 'avutil/struct/avpacket';
import List from 'cheap/std/collection/List';
import { Mutex } from 'cheap/thread/mutex';
import SeekableWriteBuffer from 'common/io/SeekableWriteBuffer';
import { AVCodecParametersSerialize } from 'avutil/util/serialize';
export interface MSETaskOptions extends TaskOptions {
    isLive: boolean;
    avpacketList: pointer<List<pointer<AVPacketRef>>>;
    avpacketListMutex: pointer<Mutex>;
    enableJitterBuffer: boolean;
}
interface PullQueue {
    queue: pointer<AVPacketRef>[];
    index: int32;
    frameCount: int64;
    lastPTS: int64;
    lastDTS: int64;
    diff: int64;
    ended: boolean;
    useSampleRateTimeBase: boolean;
}
interface MSEResource {
    type: 'audio' | 'video';
    codecpar: pointer<AVCodecParameters>;
    oformatContext: AVOFormatContext;
    oformat: OFormat;
    ioWriter: IOWriter;
    bufferQueue: SeekableWriteBuffer;
    track: Track;
    streamIndex: int32;
    pullIPC: IPCPort;
    loop: LoopTask;
    startTimestamp: int64;
    frontPacket: pointer<AVPacketRef>;
    backPacket: pointer<AVPacketRef>;
    frontBuffered: boolean;
    packetEnded: boolean;
    ended: boolean;
    seekSync: () => void;
    startPTS: int64;
    pullQueue: PullQueue;
    enableRawMpeg: boolean;
    timestampOffsetUpdated: boolean;
}
type SelfTask = MSETaskOptions & {
    mediaSource: MediaSource;
    controlIPCPort: IPCPort;
    audio: MSEResource;
    video: MSEResource;
    pauseTimestamp: number;
    playRate: int64;
    targetRate: int64;
    seeking: boolean;
    pausing: boolean;
    cacheDuration: int64;
    currentTime: double;
    currentTimeNTP: int32;
    avpacketPool: AVPacketPool;
};
export default class MSEPipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    constructor();
    private syncToKeyframe;
    private getSourceOpenHandler;
    private getMimeType;
    private createSourceBuffer;
    private mixExtradata;
    private pullAVPacketInternal;
    private pullAVPacket;
    private writeAVPacket;
    private swap;
    private createLoop;
    private startMux;
    private resetResource;
    addStream(taskId: string, streamIndex: int32, parameters: pointer<AVCodecParameters> | AVCodecParametersSerialize, timeBase: Rational, startPTS: int64, pullIPCPort: MessagePort): Promise<void>;
    reAddStream(taskId: string, streamIndex: int32, parameters: pointer<AVCodecParameters> | AVCodecParametersSerialize, timeBase: Rational, startPTS: int64): Promise<void>;
    pause(taskId: string): Promise<void>;
    unpause(taskId: string): Promise<void>;
    beforeSeek(taskId: string): Promise<void>;
    afterSeek(taskId: string, timestamp: int64): Promise<number>;
    setPlayRate(taskId: string, rate: double): Promise<void>;
    restart(taskId: string): Promise<void>;
    setCurrentTime(taskId: string, time: number): Promise<void>;
    getMediaSource(taskId: string): Promise<MediaSource>;
    private createTask;
    registerTask(options: MSETaskOptions): Promise<number>;
    unregisterTask(id: string): Promise<void>;
}
export {};
