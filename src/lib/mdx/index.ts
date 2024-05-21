import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx-remote';

export const rootDirectoryPosts = path.join(process.cwd(), 'src/app/new-post');

export const getPostBySlug = async (slug: string, rootDirectory: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,

    components: {
      ...components,
    },

    options: { parseFrontmatter: true },
  });

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPostsMeta = async (rootDirectory: string) => {
  const files = fs.readdirSync(rootDirectory);

  let posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file, rootDirectory);
    posts.push(meta);
  }

  return posts;
};
