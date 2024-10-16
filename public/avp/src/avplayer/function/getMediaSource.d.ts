export default function getMediaSource(): {
    new (): MediaSource;
    prototype: MediaSource;
    isTypeSupported(type: string): boolean;
} | {
    new (): ManagedMediaSource;
    prototype: ManagedMediaSource;
    isTypeSupported(type: string): boolean;
};
