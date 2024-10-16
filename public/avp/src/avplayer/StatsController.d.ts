import Stats from 'avpipeline/struct/stats';
export default class StatsController {
    private stats;
    private timer;
    private videoFrameRenderCount;
    private videoFrameDecodeCount;
    private audioFrameRenderCount;
    private audioFrameDecodeCount;
    private videoPacketBytes;
    private audioPacketBytes;
    private bufferReceiveBytes;
    constructor(stats: pointer<Stats>);
    private reset;
    start(): void;
    stop(): void;
    private onTimer;
}
