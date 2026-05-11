import fs from 'fs';
import path from 'path';
import type { BlogMeta, Frontmatter, Post, PostWithBlog } from '../types/blog';

const vaultPath = path.join(process.cwd(), 'vault');

export function getBlogs(): BlogMeta[] {
  const indexPath = path.join(vaultPath, 'index.json');
  const jsonContent = fs.readFileSync(indexPath, 'utf8');
  const data = JSON.parse(jsonContent);
  if (Array.isArray(data)) {
    return data;
  }
  return (data.blogs || []) as BlogMeta[];
}

// A simple frontmatter parser
function parseFrontmatter(fileContent: string): { data: Frontmatter; content: string } {
  const match = /^---\r?\n([\s\S]+?)\r?\n---/.exec(fileContent);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatter = match[1];
  const content = fileContent.slice(match[0].length);

  const data: Frontmatter = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key) {
      const value = valueParts.join(':').trim();
      // Simple parsing for strings, arrays, numbers, and booleans
      if (value === 'true') {
        data[key.trim()] = true;
      } else if (value === 'false') {
        data[key.trim()] = false;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(item => item.trim().replace(/[\"']/g, ''));
      } else if (!isNaN(Number(value)) && value.trim() !== '') {
        data[key.trim()] = Number(value);
      } else {
        data[key.trim()] = value.replace(/^[\"']|[\"']$/g, '');
      }
    }
  });

  return { data, content };
}

export function getPosts(folder: string): Post[] {
  const blogPath = path.join(vaultPath, folder);
  const dirents = fs.readdirSync(blogPath, { withFileTypes: true });

  const posts = dirents.flatMap(dirent => {
    const fullPath = path.join(blogPath, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name === 'assets') return [] as Post[];
      // Handle series
      const seriesFiles = fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
      return seriesFiles.map(seriesFile => {
        const seriesFilePath = path.join(fullPath, seriesFile);
        const fileContent = fs.readFileSync(seriesFilePath, 'utf8');
        const { data, content } = parseFrontmatter(fileContent);
        const slug = seriesFile.replace(/\.md$/, '');
        const relativePath = path.relative(vaultPath, seriesFilePath);
        return { slug, frontmatter: data, content, series: dirent.name, filePath: relativePath } as Post;
      });
    } else if (dirent.name.endsWith('.md')) {
      // Handle standalone posts
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = parseFrontmatter(fileContent);
      const slug = dirent.name.replace(/\.md$/, '');
      const relativePath = path.relative(vaultPath, fullPath);
      return [{ slug, frontmatter: data, content, filePath: relativePath }] as Post[];
    }
    return [] as Post[];
  });

  const isProd = process.env.NODE_ENV === 'production';
  return posts.filter(post => {
    if (isProd && post.frontmatter.draft) {
      return false;
    }
    return true;
  });
}

export function getPost(folder: string, slug: string[]): Post | undefined {
  const posts = getPosts(folder);
  if (slug.length === 1) {
    // Standalone post
    return posts.find(post => !post.series && post.slug === slug[0]);
  } else if (slug.length === 2) {
    // Series post
    const [seriesName, postSlug] = slug;
    return posts.find(post => post.series === seriesName && post.slug === postSlug);
  }
  return undefined;
}

export function getTags(): string[] {
  const blogs = getBlogs();
  const allPosts = blogs.flatMap(blog => getPosts(blog.folder));
  const allTags = allPosts.flatMap(post => post.frontmatter.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
}

export function getPostsByTag(tag: string): PostWithBlog[] {
  const blogs = getBlogs();
  const allPosts = blogs.flatMap(blog => {
    const posts = getPosts(blog.folder);
    return posts.map(p => ({ ...p, blog })) as PostWithBlog[];
  });
  return allPosts.filter(post => (post.frontmatter.tags || []).includes(tag));
}
