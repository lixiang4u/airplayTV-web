export declare function printChar(stream: uint32, curr: char): void;
export declare function writeAsciiToMemory(str: string, buffer: pointer<char>, doNotAddNull?: boolean): void;
export declare function environ_get(environ: pointer<uint32>, environBuf: pointer<uint8>): number;
export declare function environ_sizes_get(penvironCount: pointer<uint32>, penvironBufSize: pointer<uint32>): number;
export declare function fd_fdstat_get(fd: uint32, pBuf: pointer<void>): number;
export declare function fd_read(fd: uint32, iov: pointer<uint32>, iovCnt: uint32, pNum: pointer<uint32>): number;
export declare function fd_seek(fd: uint32, offsetLow: uint32, offsetHigh: uint32, whence: pointer<uint32>, newOffset: uint32): number;
export declare function fd_write(fd: uint32, iov: pointer<uint32>, iovCnt: uint32, pNum: pointer<uint32>): number;
export declare function fd_close(fd: uint32): number;
export declare function abort(what?: string): void;
export declare function clock_time_get(id: uint32, precision: int32, timeOut: pointer<uint64>): 0 | 28;
export declare function clock_res_get(id: uint32, resOut: pointer<uint64>): 0 | 28;
export declare function random_get(pointer: pointer<uint8>, size: size): number;