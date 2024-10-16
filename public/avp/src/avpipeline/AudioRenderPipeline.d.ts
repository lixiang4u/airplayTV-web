import Pipeline, { TaskOptions } from './Pipeline';
import IPCPort from 'common/network/IPCPort';
import { AVFrameRef } from 'avutil/struct/avframe';
import List from 'cheap/std/collection/List';
import { Mutex } from 'cheap/thread/mutex';
import AVFramePoolImpl from 'avutil/implement/AVFramePoolImpl';
import Resampler from 'audioresample/Resampler';
import { AVSampleFormat } from 'avutil/audiosamplefmt';
import AVPCMBuffer, { AVPCMBufferRef } from 'avutil/struct/avpcmbuffer';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import StretchPitcher from 'audiostretchpitch/StretchPitcher';
import { Rational } from 'avutil/struct/rational';
import { Timeout } from 'common/types/type';
import { JitterBuffer } from './struct/jitter';
export interface AudioRenderTaskOptions extends TaskOptions {
    playSampleRate: int32;
    playFormat: AVSampleFormat;
    playChannels: int32;
    resamplerResource: WebAssemblyResource;
    stretchpitcherResource: WebAssemblyResource;
    timeBase: Rational;
    startPTS: int64;
    avframeList: pointer<List<pointer<AVFrameRef>>>;
    avframeListMutex: pointer<Mutex>;
    enableJitterBuffer: boolean;
    jitterBuffer: pointer<JitterBuffer>;
}
type SelfTask = AudioRenderTaskOptions & {
    leftIPCPort: IPCPort;
    rightIPCPort: IPCPort;
    controlIPCPort: IPCPort;
    resampler: Resampler;
    stretchpitcher: Map<int32, StretchPitcher>;
    outPCMBuffer: AVPCMBuffer;
    waitPCMBuffer: pointer<AVPCMBufferRef>;
    waitPCMBufferPos: int32;
    waitAVFrame: pointer<AVFrameRef>;
    frameEnded: boolean;
    stretchpitcherEnded: boolean;
    playRate: double;
    playTempo: double;
    playPitch: double;
    useStretchpitcher: boolean;
    firstPlayed: boolean;
    lastNotifyPTS: int64;
    currentPTS: int64;
    seeking: boolean;
    pausing: boolean;
    seekSync: () => void;
    receivePCMSync: () => void;
    paddingAVFrame: pointer<AVFrameRef>;
    fakePlayStartTimestamp: number;
    fakePlaySamples: int64;
    fakePlayTimer: Timeout;
    fakePlay: boolean;
    lastRenderTimestamp: number;
    avframePool: AVFramePoolImpl;
};
export default class AudioRenderPipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    private avPCMBufferPool;
    private avPCMBufferList;
    private avPCMBufferListMutex;
    constructor();
    private createTask;
    private checkUseStretchpitcher;
    setPlayRate(taskId: string, rate: double): void;
    setPlayTempo(taskId: string, tempo: double): Promise<void>;
    setPlayPitch(taskId: string, pitch: double): void;
    beforeSeek(taskId: string): Promise<void>;
    syncSeekTime(taskId: string, timestamp: int64, maxQueueLength?: number): Promise<void>;
    afterSeek(taskId: string, timestamp: int64): Promise<void>;
    restart(taskId: string): Promise<void>;
    private fakePlayNext;
    fakePlay(taskId: string): Promise<void>;
    pause(taskId: string): Promise<void>;
    unpause(taskId: string): Promise<void>;
    registerTask(options: AudioRenderTaskOptions): Promise<number>;
    unregisterTask(taskId: string): Promise<void>;
    clear(): Promise<void>;
}
export {};
