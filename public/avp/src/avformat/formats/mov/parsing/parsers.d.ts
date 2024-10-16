import IOReader from 'common/io/IOReader';
import Stream from '../../../AVStream';
import { Atom, MOVContext } from '../type';
declare const parsers: Partial<Record<number, (ioReader: IOReader, stream: Stream, atom: Atom, movContext: MOVContext) => Promise<void>>>;
export default parsers;
