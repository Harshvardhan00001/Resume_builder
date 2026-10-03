declare module "mammoth" {
  export interface RawTextResult {
    value: string;
    messages: any[];
  }
  export function extractRawText(options: {
    arrayBuffer?: ArrayBuffer;
    buffer?: any;
    path?: string;
  }): Promise<RawTextResult>;
}
