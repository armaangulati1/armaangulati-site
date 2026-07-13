import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

import { mdxComponents } from "@/components/mdx/mdx-components";

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual theme: github-light in light mode, github-dark-dimmed under .dark.
  // Emits per-token CSS variables consumed by globals.css.
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  keepBackground: true,
};

// Compile a review-controlled MDX body to a React node. Runs in RSC at build
// time (pages are statically generated). Prose is rendered verbatim.
export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false, // frontmatter already stripped by gray-matter
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });
  return content;
}
