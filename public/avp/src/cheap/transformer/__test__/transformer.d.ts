export declare const projectPath: string;
export declare const distPath: string;
export declare function check(source: string, target: string, options: {
    input: string;
    output?: string;
    defined?: Record<string, any>;
    include?: string[];
}): void;
