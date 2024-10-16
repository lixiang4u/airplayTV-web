import { PAT, PES, PMT, TSPacket, TSSliceQueue } from './struct';
import AVBSFilter from '../../bsf/AVBSFilter';
export type PID = number;
export interface MpegtsContext {
    currentProgram: number;
    currentPmtPid: number;
    tsPacketSize: number;
    hasPAT: boolean;
    hasPMT: boolean;
    tsSliceQueueMap: Map<PID, TSSliceQueue>;
    pat: PAT;
    pmt: PMT;
    program2Pmt: Map<number, PMT>;
    ioEnd: boolean;
    startPid: number;
    delay: bigint;
}
export interface MpegtsStreamContext {
    pid: number;
    filter: AVBSFilter;
    tsPacket: TSPacket;
    pes: PES;
    continuityCounter: number;
    pesSlices: {
        total: number;
        buffers: Uint8Array[];
    };
    latm: boolean;
}
