import { CTypeEnum, CTypeEnum2Type } from './typedef';
type CTypeEnumWrite = {
    [key in CTypeEnum]: (pointer: pointer<void>, value: CTypeEnum2Type<key>) => void;
};
export declare const CTypeEnumWrite: CTypeEnumWrite;
export declare function override(funcs: Partial<CTypeEnumWrite>): void;
export {};
