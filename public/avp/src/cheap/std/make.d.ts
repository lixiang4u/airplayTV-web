import { Data } from 'common/types/type';
import { SetOmitFunctions } from 'common/types/advanced';
/**
 * 创建一个 struct 实例
 *
 * @param target
 * @returns
 */
export default function make<T>(struct: new (init?: Data) => T, init?: Partial<SetOmitFunctions<T>>): T;
