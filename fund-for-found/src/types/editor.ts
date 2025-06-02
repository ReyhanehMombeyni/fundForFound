export interface HeaderBlock {
    id?: string;
    type: "header";
    data: {
      text: string;
      level: number;
    };
  }
  
  export interface ParagraphBlock {
    id?: string;
    type: "paragraph";
    data: {
      text: string;
    };
  }
  
  export interface ListBlock {
    id?: string;
    type: "list";
    data: {
      style: "ordered" | "unordered";
      items: string[];
    };
  }
  
  // اگر ابزار دیگه‌ای استفاده می‌کنی، مشابه بالا اضافه کن.
  
  export type EditorBlockData = HeaderBlock | ParagraphBlock | ListBlock;
  
  export interface EditorJsData {
    time?: number;
    blocks: EditorBlockData[];
    version?: string;
  }
  