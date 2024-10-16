export default class List<T> {
    length: uint32;
    private head;
    private tail;
    private createNode;
    private getItem;
    push<args = [T]>(item: T): void;
    push<args = [T, true]>(item: pointer<T>): void;
    pop<args = [T]>(): T;
    shift<args = [T]>(): T;
    unshift<args = [T]>(item: T): void;
    unshift<args = [T, true]>(item: pointer<T>): void;
    forEach<args = [T]>(callback: (item: T, index?: uint32) => boolean | void): void;
    find<args = [T]>(callback: (item: T, index?: uint32) => boolean): T;
    indexOf<args = [T]>(index: uint32): T;
    clear<args = [T]>(callback?: (item: T) => void): void;
}
