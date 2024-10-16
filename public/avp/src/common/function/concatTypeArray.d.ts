/**
 * @file 合并 TypeArray
 */
import { TypeArrayConstructor } from '../types/type';
export default function concatTypeArray<T extends TypeArrayConstructor>(constructor: T, arrays: InstanceType<T>[]): InstanceType<T>;
