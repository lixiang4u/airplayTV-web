export type TrackOptions = {
    mediaBufferMax?: number;
};
export default class Track {
    protected sourceBuffer: SourceBuffer;
    private operatorQueue;
    private updating;
    private lastRemoveTime;
    private paddingCallback;
    protected options: TrackOptions;
    private ending;
    onQuotaExceededError?: () => void;
    onEnded?: () => void;
    constructor(options?: TrackOptions);
    setSourceBuffer(sourceBuffer: SourceBuffer): void;
    changeMimeType(type: string): void;
    enqueue(): void;
    addBuffer(buffer: Uint8Array, callback?: (...args: any[]) => void): void;
    updateTimestampOffset(timestampOffset: number, callback?: (...args: any[]) => void): void;
    removeBuffer(time: number, callback?: (...args: any[]) => void): void;
    removeAllBuffer(callback?: (...args: any[]) => void): void;
    end(): void;
    stop(): void;
    reset(): void;
    isPaused(): number;
    getQueueLength(): number;
    getBufferedTime(): number;
    getBufferedStart(): number;
    getBufferedEnd(): number;
    getSourceBuffer(): SourceBuffer;
    setMediaBufferMax(max: number): void;
    getMediaBufferMax(): number;
    destroy(): void;
}
