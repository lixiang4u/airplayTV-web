export declare const enum AVSampleFormat {
    AV_SAMPLE_FMT_NONE = -1,
    /**
     * unsigned 8 bits
     */
    AV_SAMPLE_FMT_U8 = 0,
    /**
     * signed 16 bits
     */
    AV_SAMPLE_FMT_S16 = 1,
    /**
     * signed 32 bits
     */
    AV_SAMPLE_FMT_S32 = 2,
    /**
     * float
     */
    AV_SAMPLE_FMT_FLT = 3,
    /**
     * double
     */
    AV_SAMPLE_FMT_DBL = 4,
    /**
     * unsigned 8 bits, planar
     */
    AV_SAMPLE_FMT_U8P = 5,
    /**
     * signed 16 bits, planar
     */
    AV_SAMPLE_FMT_S16P = 6,
    /**
     * signed 32 bits, planar
     */
    AV_SAMPLE_FMT_S32P = 7,
    /**
     * float, planar
     */
    AV_SAMPLE_FMT_FLTP = 8,
    /**
     * double, planar
     */
    AV_SAMPLE_FMT_DBLP = 9,
    /**
     * signed 64 bits
     */
    AV_SAMPLE_FMT_S64 = 10,
    /**
     * signed 64 bits, planar
     */
    AV_SAMPLE_FMT_S64P = 11,
    /**
     * Number of sample formats. DO NOT USE if linking dynamically
     */
    AV_SAMPLE_FMT_NB = 12
}
export declare const enum AVChannelOrder {
    /**
     * Only the channel count is specified, without any further information
     * about the channel order.
     */
    AV_CHANNEL_ORDER_UNSPEC = 0,
    /**
     * The native channel order, i.e. the channels are in the same order in
     * which they are defined in the AVChannel enum. This supports up to 63
     * different channels.
     */
    AV_CHANNEL_ORDER_NATIVE = 1,
    /**
     * The channel order does not correspond to any other predefined order and
     * is stored as an explicit map. For example, this could be used to support
     * layouts with 64 or more channels, or with empty/skipped (AV_CHAN_UNUSED)
     * channels at arbitrary positions.
     */
    AV_CHANNEL_ORDER_CUSTOM = 2,
    /**
     * The audio is represented as the decomposition of the sound field into
     * spherical harmonics. Each channel corresponds to a single expansion
     * component. Channels are ordered according to ACN (Ambisonic Channel
     * Number).
     *
     * The channel with the index n in the stream contains the spherical
     * harmonic of degree l and order m given by
     * @code{.unparsed}
     *   l   = floor(sqrt(n)),
     *   m   = n - l * (l + 1).
     * @endcode
     *
     * Conversely given a spherical harmonic of degree l and order m, the
     * corresponding channel index n is given by
     * @code{.unparsed}
     *   n = l * (l + 1) + m.
     * @endcode
     *
     * Normalization is assumed to be SN3D (Schmidt Semi-Normalization)
     * as defined in AmbiX format $ 2.1.
     */
    AV_CHANNEL_ORDER_AMBISONIC = 3,
    /**
     * Number of channel orders, not part of ABI/API
     */
    FF_CHANNEL_ORDER_NB = 4
}
export declare const enum AVChannel {
    AV_CHAN_NONE = -1,
    AV_CHAN_FRONT_LEFT = 0,
    AV_CHAN_FRONT_RIGHT = 1,
    AV_CHAN_FRONT_CENTER = 2,
    AV_CHAN_LOW_FREQUENCY = 3,
    AV_CHAN_BACK_LEFT = 4,
    AV_CHAN_BACK_RIGHT = 5,
    AV_CHAN_FRONT_LEFT_OF_CENTER = 6,
    AV_CHAN_FRONT_RIGHT_OF_CENTER = 7,
    AV_CHAN_BACK_CENTER = 8,
    AV_CHAN_SIDE_LEFT = 9,
    AV_CHAN_SIDE_RIGHT = 10,
    AV_CHAN_TOP_CENTER = 11,
    AV_CHAN_TOP_FRONT_LEFT = 12,
    AV_CHAN_TOP_FRONT_CENTER = 13,
    AV_CHAN_TOP_FRONT_RIGHT = 14,
    AV_CHAN_TOP_BACK_LEFT = 15,
    AV_CHAN_TOP_BACK_CENTER = 16,
    AV_CHAN_TOP_BACK_RIGHT = 17,
    /** Stereo downmix. */
    AV_CHAN_STEREO_LEFT = 29,
    /** See above. */
    AV_CHAN_STEREO_RIGHT = 30,
    AV_CHAN_WIDE_LEFT = 31,
    AV_CHAN_WIDE_RIGHT = 32,
    AV_CHAN_SURROUND_DIRECT_LEFT = 33,
    AV_CHAN_SURROUND_DIRECT_RIGHT = 34,
    AV_CHAN_LOW_FREQUENCY_2 = 35,
    AV_CHAN_TOP_SIDE_LEFT = 36,
    AV_CHAN_TOP_SIDE_RIGHT = 37,
    AV_CHAN_BOTTOM_FRONT_CENTER = 38,
    AV_CHAN_BOTTOM_FRONT_LEFT = 39,
    AV_CHAN_BOTTOM_FRONT_RIGHT = 40,
    /** Channel is empty can be safely skipped. */
    AV_CHAN_UNUSED = 512,
    /** Channel contains data, but its position is unknown. */
    AV_CHAN_UNKNOWN = 768,
    /**
     * Range of channels between AV_CHAN_AMBISONIC_BASE and
     * AV_CHAN_AMBISONIC_END represent Ambisonic components using the ACN system.
     *
     * Given a channel id `<i>` between AV_CHAN_AMBISONIC_BASE and
     * AV_CHAN_AMBISONIC_END (inclusive), the ACN index of the channel `<n>` is
     * `<n> = <i> - AV_CHAN_AMBISONIC_BASE`.
     *
     * @note these values are only used for AV_CHANNEL_ORDER_CUSTOM channel
     * orderings, the AV_CHANNEL_ORDER_AMBISONIC ordering orders the channels
     * implicitly by their position in the stream.
     */
    AV_CHAN_AMBISONIC_BASE = 1024,
    AV_CHAN_AMBISONIC_END = 2047
}
export declare const enum AVAudioServiceType {
    AV_AUDIO_SERVICE_TYPE_MAIN = 0,
    AV_AUDIO_SERVICE_TYPE_EFFECTS = 1,
    AV_AUDIO_SERVICE_TYPE_VISUALLY_IMPAIRED = 2,
    AV_AUDIO_SERVICE_TYPE_HEARING_IMPAIRED = 3,
    AV_AUDIO_SERVICE_TYPE_DIALOGUE = 4,
    AV_AUDIO_SERVICE_TYPE_COMMENTARY = 5,
    AV_AUDIO_SERVICE_TYPE_EMERGENCY = 6,
    AV_AUDIO_SERVICE_TYPE_VOICE_OVER = 7,
    AV_AUDIO_SERVICE_TYPE_KARAOKE = 8,
    AV_AUDIO_SERVICE_TYPE_NB = 9
}
export declare const enum AV_CH_LAYOUT {
    AV_CH_FRONT_LEFT = 1,
    AV_CH_FRONT_RIGHT = 2,
    AV_CH_FRONT_CENTER = 4,
    AV_CH_LOW_FREQUENCY = 8,
    AV_CH_BACK_LEFT = 16,
    AV_CH_BACK_RIGHT = 32,
    AV_CH_FRONT_LEFT_OF_CENTER = 64,
    AV_CH_FRONT_RIGHT_OF_CENTER = 128,
    AV_CH_BACK_CENTER = 256,
    AV_CH_SIDE_LEFT = 512,
    AV_CH_SIDE_RIGHT = 1024,
    AV_CH_TOP_CENTER = 2048,
    AV_CH_TOP_FRONT_LEFT = 4096,
    AV_CH_TOP_FRONT_CENTER = 8192,
    AV_CH_TOP_FRONT_RIGHT = 16384,
    AV_CH_TOP_BACK_LEFT = 32768,
    AV_CH_TOP_BACK_CENTER = 65536,
    AV_CH_TOP_BACK_RIGHT = 131072,
    AV_CH_STEREO_LEFT = 536870912,
    AV_CH_STEREO_RIGHT = 1073741824,
    AV_CH_WIDE_LEFT = -2147483648,
    AV_CH_WIDE_RIGHT = 1,
    AV_CH_SURROUND_DIRECT_LEFT = 2,
    AV_CH_SURROUND_DIRECT_RIGHT = 4,
    AV_CH_LOW_FREQUENCY_2 = 8,
    AV_CH_TOP_SIDE_LEFT = 16,
    AV_CH_TOP_SIDE_RIGHT = 32,
    AV_CH_BOTTOM_FRONT_CENTER = 64,
    AV_CH_BOTTOM_FRONT_LEFT = 128,
    AV_CH_BOTTOM_FRONT_RIGHT = 256,
    AV_CH_LAYOUT_MONO = 4,
    AV_CH_LAYOUT_STEREO = 3,
    AV_CH_LAYOUT_2POINT1 = 11,
    AV_CH_LAYOUT_2_1 = 259,
    AV_CH_LAYOUT_SURROUND = 7,
    AV_CH_LAYOUT_3POINT1 = 15,
    AV_CH_LAYOUT_4POINT0 = 263,
    AV_CH_LAYOUT_4POINT1 = 271,
    AV_CH_LAYOUT_2_2 = 1539,
    AV_CH_LAYOUT_QUAD = 51,
    AV_CH_LAYOUT_5POINT0 = 1543,
    AV_CH_LAYOUT_5POINT1 = 1551,
    AV_CH_LAYOUT_5POINT0_BACK = 55,
    AV_CH_LAYOUT_5POINT1_BACK = 63,
    AV_CH_LAYOUT_6POINT0 = 1799,
    AV_CH_LAYOUT_6POINT0_FRONT = 1731,
    AV_CH_LAYOUT_HEXAGONAL = 311,
    AV_CH_LAYOUT_3POINT1POINT2 = 20495,
    AV_CH_LAYOUT_6POINT1 = 1807,
    AV_CH_LAYOUT_6POINT1_BACK = 319,
    AV_CH_LAYOUT_6POINT1_FRONT = 1739,
    AV_CH_LAYOUT_7POINT0 = 1591,
    AV_CH_LAYOUT_7POINT0_FRONT = 1735,
    AV_CH_LAYOUT_7POINT1 = 1599,
    AV_CH_LAYOUT_7POINT1_WIDE = 1743,
    AV_CH_LAYOUT_7POINT1_WIDE_BACK = 255,
    AV_CH_LAYOUT_5POINT1POINT2_BACK = 20543,
    AV_CH_LAYOUT_OCTAGONAL = 1847,
    AV_CH_LAYOUT_CUBE = 184371,
    AV_CH_LAYOUT_5POINT1POINT4_BACK = 184383,
    AV_CH_LAYOUT_7POINT1POINT2 = 22079,
    AV_CH_LAYOUT_7POINT1POINT4_BACK = 185919,
    AV_CH_LAYOUT_7POINT2POINT3 = 87615,
    AV_CH_LAYOUT_9POINT1POINT4_BACK = 186111,
    AV_CH_LAYOUT_HEXADECAGONAL = -2147223753,
    AV_CH_LAYOUT_STEREO_DOWNMIX = 1610612736,
    AV_CH_LAYOUT_22POINT2 = 262143,
    AV_CH_LAYOUT_7POINT1_TOP_BACK = 20543
}
