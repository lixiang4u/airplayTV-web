import { AudioWorkletNodeObserver } from './audioWorklet/base/AudioWorkletNodeBase';
import { Data } from 'common/types/type';
export default class AudioSourceBufferNode {
    private context;
    private observer;
    private options;
    private pullIPC;
    private buffer;
    private channels;
    private ended;
    private float32;
    private buffered;
    private pause;
    private startTime;
    private dest;
    private queue;
    private firstRendered;
    constructor(context: AudioContext, observer: AudioWorkletNodeObserver, options?: AudioWorkletNodeOptions);
    request(method: string, params?: Data, transfer?: any[]): Promise<void>;
    private allocBuffer;
    private freeBuffer;
    private pull;
    private buffering;
    connect(dest: AudioNode): void;
    disconnect(): void;
    private process;
}
