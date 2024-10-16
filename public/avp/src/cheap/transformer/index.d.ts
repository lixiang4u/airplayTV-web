import ts from 'typescript';
import { TransformerOptions } from './type';
export default function (program: ts.Program, options?: TransformerOptions): ts.TransformerFactory<ts.SourceFile>;
