import AVPacket from 'avutil/struct/avpacket';
import AVBSFilter from '../AVBSFilter';
import AVCodecParameters from 'avutil/struct/avcodecparameters';
import { Rational } from 'avutil/struct/rational';
export default class ADTS2RawFilter extends AVBSFilter {
    private streamMuxConfig;
    private caches;
    init(codecpar: pointer<AVCodecParameters>, timeBase: pointer<Rational>): number;
    /**
     *
     * adts 封装转 raw
     *
     * bits
     * - 12  syncword
     * - 1   ID (MPEG 标识位，固定为 1)
     * - 2   Layer ( 固定为 0)
     * - 1   Protection Absent ( 指示是否有 CRC 校验，1 表示没有校验）
     * - 2   Profile
     * - 4   Sampling Frequency Index ( 采样率的索引）
     * - 1   Private Bit ( 保留位，一般设置为 0)
     * - 3   Channel Configuration ( 音频通道数）
     * - 1   Original Copy ( 原始拷贝标志位，一般设置为 0)
     * - 1   Home ( 保留位，一般设置为 0)
     * - 1   Copyright Identification Bit（置 0）
     * - 1   Copyright Identification Start（置 0）
     * - 13  Frame Length ( 帧长度，包括 ADTS 头和音频帧数据的长度）
     * - 11  Buffer Fullness ( 缓冲区满度，可用于音频流的同步）
     * - 2   Number of Raw Data Blocks in Frame ( 帧中原始数据块的数量）
     * - 16  CRC (Protection Absent 控制）
     * - N  raw aac data
     *
     */
    sendAVPacket(avpacket: pointer<AVPacket>): number;
    receiveAVPacket(avpacket: pointer<AVPacket>): number;
}
