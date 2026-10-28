import { createContentLoader } from 'vitepress'
export default createContentLoader(['en/*.md', 'zh-CN/*.md'], {
  includeSrc: true,
  transform(pages) {
    return pages.filter(p => Array.isArray(p.frontmatter.authors) && p.frontmatter.authors.length).map(p => ({
      url: p.url,
      title: p.frontmatter.title || p.src?.match(/^# (.+)$/m)?.[1] || p.url,
      authors: p.frontmatter.authors,
      locale: p.url.startsWith('/zh-CN/') ? 'zh-CN' : 'en'
    })).sort((a,b) => a.url.localeCompare(b.url))
  }
})
