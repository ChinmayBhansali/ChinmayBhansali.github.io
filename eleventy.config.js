import markdownItAnchor from "markdown-it-anchor";

export default function (eleventyConfig) {
  // ---- Markdown: add ids to headings so the "ON THIS PAGE" TOC can anchor to them
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, {
      level: [2],
      slugify: (s) =>
        s
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-"),
    });
  });

  // ---- Collections (a page is added by dropping one .md file in the folder)
  const bySlugDate = (a, b) => (b.data.date || 0) - (a.data.date || 0);

  eleventyConfig.addCollection("work", (api) =>
    api
      .getFilteredByGlob("src/work/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
      .sort(bySlugDate)
  );

  eleventyConfig.addCollection("garden", (api) =>
    api
      .getFilteredByGlob("src/garden/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
      .sort((a, b) => String(b.data.planted).localeCompare(String(a.data.planted)))
  );

  eleventyConfig.addCollection("essays", (api) =>
    api
      .getFilteredByGlob("src/essays/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
      .sort(bySlugDate)
  );

  // ---- Filters
  // "2026-04" or a Date -> "APR 2026" (mono metadata style)
  eleventyConfig.addFilter("monoDate", (value) => {
    if (!value) return "";
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if (value instanceof Date) {
      return `${months[value.getUTCMonth()]} ${value.getUTCFullYear()}`;
    }
    const [y, m] = String(value).split("-");
    return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y;
  });

  // Extract h2 headings from rendered content -> [{id, text}] for the sidebar TOC
  eleventyConfig.addFilter("toc", (content) => {
    if (!content) return [];
    const matches = [...content.matchAll(/<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g)];
    return matches.map((m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") }));
  });

  // Map related slugs (frontmatter) to garden note pages
  eleventyConfig.addFilter("notesBySlug", (garden, slugs) => {
    if (!slugs) return [];
    return slugs
      .map((slug) => garden.find((n) => n.fileSlug === slug))
      .filter(Boolean);
  });

  // Pages whose source links to this page's URL -> "linked from:" backlinks
  eleventyConfig.addFilter("backlinks", (all, url) => {
    if (!url) return [];
    return all.filter(
      (p) => p.url !== url && p.rawInput && p.rawInput.includes(url)
    );
  });

  // The project published after this one (wraps around) -> "next: <project> →"
  eleventyConfig.addFilter("nextIn", (collection, url) => {
    if (!collection || collection.length < 2) return null;
    const i = collection.findIndex((p) => p.url === url);
    if (i === -1) return null;
    return collection[(i + 1) % collection.length];
  });

  // ---- Static files
  eleventyConfig.addPassthroughCopy("src/assets");
  // Page images live next to their .md file (work/<slug>/*)
  eleventyConfig.addPassthroughCopy("src/work/**/*.{png,jpg,jpeg,gif,webp,svg,pdf}");
  eleventyConfig.addPassthroughCopy("src/garden/**/*.{png,jpg,jpeg,gif,webp,svg}");
  eleventyConfig.addPassthroughCopy("src/essays/**/*.{png,jpg,jpeg,gif,webp,svg}");
  eleventyConfig.addPassthroughCopy("src/about/**/*.{png,jpg,jpeg,gif,webp}");
  // The CV is read straight from the data archive: replacing data/CV.pdf updates the site.
  eleventyConfig.addPassthroughCopy({ "data/CV.pdf": "cv.pdf" });
  // Also serve it at the old site's /data/CV.pdf path so printed/linked CVs never break
  // (a second passthrough from the same source would overwrite the first, so copy after build).
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const { cp, mkdir } = await import("node:fs/promises");
    await mkdir(`${dir.output}/data`, { recursive: true });
    await cp("data/CV.pdf", `${dir.output}/data/CV.pdf`);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
