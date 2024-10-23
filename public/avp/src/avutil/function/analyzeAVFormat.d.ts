import { AVFormat } from 'avformat/avformat';
import IOReader from 'common/io/IOReader';
export default function analyzeAVFormat(ioReader: IOReader, defaultFormat?: AVFormat): Promise<AVFormat>;
