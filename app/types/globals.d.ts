declare module "gray-matter" {
  interface GrayMatterFile {
    data: { [key: string]: any };
    content: string;
    excerpt?: string;
  }
  function matter(str: string, options?: any): GrayMatterFile;
  namespace matter {
    function stringify(content: string, data: any): string;
  }
  export = matter;
}