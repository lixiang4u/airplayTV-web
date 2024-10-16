import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import Pipeline, { TaskOptions } from './Pipeline';
import List from 'cheap/std/collection/List';
import { AVPacketPool, AVPacketRef } from 'avutil/struct/avpacket';
import { Mutex } from 'cheap/thread/mutex';
import { AVFrameRef } from 'avutil/struct/avframe';
import WasmAudioEncoder from 'avcodec/wasmcodec/AudioEncoder';
import WebAudioEncoder from 'avcodec/webcodec/AudioEncoder';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import AVFramePoolImpl from 'avutil/implement/AVFramePoolImpl';
import { Rational } from 'avutil/struct/rational';
import { Data } from 'common/types/type';
export interface AudioEncodeTaskOptions extends TaskOptions {
    resource: WebAssemblyResource;
    avpacketList: pointer<List<pointer<AVPacketRef>>>;
    avpacketListMutex: pointer<Mutex>;
    avframeList: pointer<List<pointer<AVFrameRef>>>;
    avframeListMutex: pointer<Mutex>;
}
type SelfTask = AudioEncodeTaskOptions & {
    encoder: WasmAudioEncoder | WebAudioEncoder;
    avpacketCaches: pointer<AVPacketRef>[];
    parameters: pointer<AVCodecParameters>;
    openReject?: (error: Error) => void;
    inputEnd: boolean;
    avframePool: AVFramePoolImpl;
    avpacketPool: AVPacketPool;
    wasmEncoderOptions?: Data;
};
export default class AudioEncodePipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    constructor();
    private createWebcodecEncoder;
    private createTask;
    open(taskId: string, parameters: pointer<AVCodecParameters>, timeBase: Rational, wasmEncoderOptions?: Data): Promise<number>;
    getExtraData(taskId: string): Promise<Uint8Array>;
    resetTask(taskId: string): Promise<void>;
    registerTask(options: AudioEncodeTaskOptions): Promise<number>;
    unregisterTask(taskId: string): Promise<void>;
}
export {};
