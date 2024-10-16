import { MpegtsContext } from './type';
import { TSPacket } from './struct';
import IOReader from 'common/io/IOReader';
export declare function getPacketSize(ioReader: IOReader): Promise<number>;
export declare function parserTSPacket(ioReader: IOReader, mpegtsContext: MpegtsContext): Promise<TSPacket>;
