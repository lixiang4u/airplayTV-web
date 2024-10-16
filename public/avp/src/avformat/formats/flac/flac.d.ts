export declare const enum MetaDataBlockType {
    STREAMINFO = 0,
    PADDING = 1,
    APPLICATION = 2,
    SEEKTABLE = 3,
    VORBIS_COMMENT = 4,
    CUESHEET = 5,
    PICTURE = 6
}
export declare const enum FlacCHMode {
    INDEPENDENT = 0,
    LEFT_SIDE = 1,
    RIGHT_SIDE = 2,
    MID_SIDE = 3
}
export declare const FLAC_STREAMINFO_SIZE = 34;
export declare const FLAC_MAX_CHANNELS = 8;
export declare const FLAC_MIN_BLOCKSIZE = 16;
export declare const FLAC_MAX_BLOCKSIZE = 65535;
export declare const FLAC_MIN_FRAME_SIZE = 10;
export declare const SampleSizeTable: number[];
export declare const SampleRateTable: number[];
export declare const BlockSizeTable: number[];
