import AVPacket from 'avutil/struct/avpacket';
export declare const enum MpegVideoPictureType {
    I = 1,
    P = 2,
    B = 3
}
export declare function isIDR(avpacket: pointer<AVPacket>): boolean;
