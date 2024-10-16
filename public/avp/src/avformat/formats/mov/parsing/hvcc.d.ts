import IOReader from 'common/io/IOReader';
import Stream from '../../../AVStream';
import { Atom, MOVContext } from '../type';
export default function read(ioReader: IOReader, stream: Stream, atom: Atom, movContext: MOVContext): Promise<void>;
