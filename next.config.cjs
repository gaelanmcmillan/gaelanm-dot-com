
const { remarkCodeHike } = require("@code-hike/mdx");
const nextMDX = requre("@next/mdx");
const rehypeKatex = require("rehype-katex");
const theme = require("shiki/themes/solarized-dark.json");

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
    rehypePlugins: [[rehypeKatex]],
  },
});

export default withMDX({
  // Support MDX files as pages:
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  images: {
    loader: "akamai",
    path: "",
  },
});

// module.exports = nextConfig
