import Pipeline, { TaskOptions } from './Pipeline';
import IPCPort from 'common/network/IPCPort';
import List from 'cheap/std/collection/List';
import { AVFrameRef } from 'avutil/struct/avframe';
import { Mutex } from 'cheap/thread/mutex';
import { WebAssemblyResource } from 'cheap/webassembly/compiler';
import AVFramePoolImpl from 'avutil/implement/AVFramePoolImpl';
import { AVPacketPool, AVPacketRef } from 'avutil/struct/avpacket';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { AVCodecID } from 'avutil/codec';
import WasmVideoEncoder from 'avcodec/wasmcodec/VideoEncoder';
import WebVideoEncoder from 'avcodec/webcodec/VideoEncoder';
import { Rational } from 'avutil/struct/rational';
import { Data } from 'common/types/type';
export interface VideoEncodeTaskOptions extends TaskOptions {
    resource: WebAssemblyResource;
    enableHardware: boolean;
    avpacketList: pointer<List<pointer<AVPacketRef>>>;
    avpacketListMutex: pointer<Mutex>;
    avframeList: pointer<List<pointer<AVFrameRef>>>;
    avframeListMutex: pointer<Mutex>;
    gop: int32;
}
type SelfTask = VideoEncodeTaskOptions & {
    leftIPCPort: IPCPort;
    rightIPCPort: IPCPort;
    softwareEncoder: WasmVideoEncoder | WebVideoEncoder;
    softwareEncoderOpened: boolean;
    hardwareEncoder?: WebVideoEncoder;
    targetEncoder: WasmVideoEncoder | WebVideoEncoder;
    avpacketCaches: pointer<AVPacketRef>[];
    inputEnd: boolean;
    encodeEnd: boolean;
    openReject?: (error: Error) => void;
    parameters: pointer<AVCodecParameters>;
    timeBase: Rational;
    encoderReady: Promise<void>;
    avframePool: AVFramePoolImpl;
    avpacketPool: AVPacketPool;
    gopCounter: int32;
    firstEncoded: boolean;
    wasmEncoderOptions?: Data;
};
export interface VideoEncodeTaskInfo {
    codecId: AVCodecID;
    width: int32;
    height: int32;
    framerate: float;
    hardware: boolean;
}
export default class VideoEncodePipeline extends Pipeline {
    tasks: Map<string, SelfTask>;
    constructor();
    private createWebcodecEncoder;
    private createTask;
    private openSoftwareEncoder;
    open(taskId: string, parameters: pointer<AVCodecParameters>, timeBase: Rational, wasmEncoderOptions?: Data): Promise<number>;
    resetTask(taskId: string): Promise<void>;
    getExtraData(taskId: string): Promise<Uint8Array>;
    getColorSpace(taskId: string): Promise<{
        colorSpace: int32;
        colorPrimaries: int32;
        colorTrc: int32;
    } | {
        colorSpace: import("../avutil/pixfmt").AVColorSpace;
        colorPrimaries: import("../avutil/pixfmt").AVColorPrimaries;
        colorTrc: import("../avutil/pixfmt").AVColorTransferCharacteristic;
    }>;
    registerTask(options: VideoEncodeTaskOptions): Promise<number>;
    unregisterTask(taskId: string): Promise<void>;
    getTasksInfo(): Promise<VideoEncodeTaskInfo[]>;
}
export {};
