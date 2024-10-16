import Pipeline, { TaskOptions } from './Pipeline';
import List from 'cheap/std/collection/List';
import { AVFrameRef } from 'avutil/struct/avframe';
import { Mutex } from 'cheap/thread/mutex';
import WasmAudioDecoder from 'avcodec/wasmcodec/AudioDecoder';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import AVFramePoolImpl from 'avutil/implement/AVFramePoolImpl';
import { AVPacketPool, AVPacketRef } from 'avutil/struct/avpacket';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { Rational } from 'avutil/struct/rational';
import WebAudioDecoder from 'avcodec/webcodec/AudioDecoder';
import { Data } from 'common/types/type';
export interface AudioDecodeTaskOptions extends TaskOptions {
    resource: WebAssemblyResource;
    avpacketList: pointer<List<pointer<AVPacketRef>>>;
    avpacketListMutex: pointer<Mutex>;
    avframeList: pointer<List<pointer<AVFrameRef>>>;
    avframeListMutex: pointer<Mutex>;
    timeBase: Rational;
}
type SelfTask = AudioDecodeTaskOptions & {
    decoder: WasmAudioDecoder | WebAudioDecoder;
    frameCaches: pointer<AVFrameRef>[];
    inputEnd: boolean;
    parameters: pointer<AVCodecParameters>;
    openReject: (ret: number) => void;
    lastDecodeTimestamp: number;
    avframePool: AVFramePoolImpl;
    avpacketPool: AVPacketPool;
    wasmDecoderOptions?: Data;
};
export default class AudioDecodePipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    constructor();
    private createWebcodecDecoder;
    private createWasmcodecDecoder;
    private createTask;
    open(taskId: string, parameters: pointer<AVCodecParameters>, wasmDecoderOptions?: Data): Promise<number>;
    reopenDecoder(taskId: string, parameters: pointer<AVCodecParameters>, resource?: WebAssemblyResource, wasmDecoderOptions?: Data): Promise<number>;
    resetTask(taskId: string): Promise<void>;
    registerTask(options: AudioDecodeTaskOptions): Promise<number>;
    unregisterTask(taskId: string): Promise<void>;
}
export {};
