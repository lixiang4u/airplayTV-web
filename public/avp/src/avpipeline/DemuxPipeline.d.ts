import { Data } from 'common/types/type';
import Pipeline, { TaskOptions } from './Pipeline';
import IPCPort from 'common/network/IPCPort';
import { RpcMessage } from 'common/network/IPCPort';
import { AVFormatContextInterface, AVIFormatContext } from 'avformat/AVFormatContext';
import IOReader from 'common/io/IOReader';
import { AVFormat } from 'avformat/avformat';
import List from 'cheap/std/collection/List';
import { AVPacketPool, AVPacketRef } from 'avutil/struct/avpacket';
import { Mutex } from 'cheap/thread/mutex';
import LoopTask from 'common/timer/LoopTask';
export declare const STREAM_INDEX_ALL = -1;
export interface DemuxTaskOptions extends TaskOptions {
    format?: AVFormat;
    bufferLength?: number;
    isLive?: boolean;
    ioloaderOptions?: Data;
    mainTaskId?: string;
    avpacketList: pointer<List<pointer<AVPacketRef>>>;
    avpacketListMutex: pointer<Mutex>;
    flags?: int32;
}
type SelfTask = DemuxTaskOptions & {
    leftIPCPort: IPCPort;
    rightIPCPorts: Map<number, IPCPort & {
        streamIndex?: number;
    }>;
    controlIPCPort: IPCPort;
    formatContext: AVIFormatContext;
    ioReader: IOReader;
    buffer: pointer<uint8>;
    cacheAVPackets: Map<number, pointer<AVPacketRef>[]>;
    cacheRequests: Map<number, RpcMessage>;
    streamIndexFlush: Map<number, boolean>;
    realFormat: AVFormat;
    demuxEnded: boolean;
    loop: LoopTask;
    gopCounter: int32;
    lastKeyFramePts: int64;
    lastAudioDts: int64;
    lastVideoDts: int64;
    avpacketPool: AVPacketPool;
};
export default class DemuxPipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    constructor();
    private createTask;
    openStream(taskId: string, maxProbeDuration?: int32): Promise<number>;
    getFormat(taskId: string): Promise<AVFormat>;
    analyzeStreams(taskId: string): Promise<AVFormatContextInterface>;
    private replyAVPacket;
    connectStreamTask(taskId: string, streamIndex: number, port: MessagePort): Promise<void>;
    changeConnectStream(taskId: string, newStreamIndex: number, oldStreamIndex: number, force?: boolean): Promise<void>;
    startDemux(taskId: string, isLive: boolean, minQueueLength: int32): Promise<void>;
    seek(taskId: string, timestamp: int64, flags: int32, streamIndex?: int32): Promise<int64>;
    /**
     * 裁剪 avpacket 队列大小
     *
     * @param taskId
     * @param max （毫秒）
     */
    croppingAVPacketQueue(taskId: string, max: int64): Promise<void>;
    registerTask(options: DemuxTaskOptions): Promise<number>;
    unregisterTask(taskId: string): Promise<void>;
}
export {};
