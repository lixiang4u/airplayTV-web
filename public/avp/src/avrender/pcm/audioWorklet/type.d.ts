declare abstract class AudioWorkletProcessor {
    protected port: MessagePort;
    abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: {
        averaging: Float32Array;
        output: Float32Array;
    }): boolean;
}
