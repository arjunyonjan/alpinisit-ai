declare module 'gray-matter' {
  interface GrayMatterFile {
    data: Record<string, any>;
    content: string;
    excerpt?: string;
  }
  
  function matter(str: string, options?: any): GrayMatterFile;
  
  namespace matter {
    function stringify(content: string, data: Record<string, any>): string;
  }
  
  export = matter;
}