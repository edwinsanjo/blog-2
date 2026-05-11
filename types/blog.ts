export interface BlogMeta {
  folder: string;
  name: string;
  description: string;
  primary: string;
  image: string;
}

export interface Frontmatter {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  banner?: string;
  series?: string;
  order?: number;
  readingTime?: string | number;
  draft?: boolean;
  [key: string]: unknown;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  series?: string;
  filePath: string;
}

export interface PostWithBlog extends Post {
  blog: BlogMeta;
}
