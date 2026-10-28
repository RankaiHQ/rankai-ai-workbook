import { defineConfig } from 'vitepress'

const chapters = [
  ['01-working-with-ai', '1. Let Go, Recognize Risk, Communicate', '1. 放手、风险与沟通'],
  ['02-agent-loops', '2. Let Agents Keep Work Moving', '2. 让 Agent 自主循环']
]
const sidebar = (lang: string) => [
  { text: lang === 'en' ? 'The workbook' : '实践手册', items: [
    { text: lang === 'en' ? 'Overview' : '目录', link: `/${lang}/README` },
    ...chapters.map(([slug, en, zh]) => ({ text: lang === 'en' ? en : zh, link: `/${lang}/${slug}` }))
  ] }
]

export default defineConfig({
  title: 'RankAI AI Workbook',
  description: 'Practical habits for working with AI — a field guide for the RankAI team.',
  base: process.env.SITE_BASE || '/',
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${process.env.SITE_BASE || '/'}favicon.svg` }]],
  locales: {
    root: { label: 'English', lang: 'en', link: '/en/README', themeConfig: { sidebar: sidebar('en') } },
    'zh-CN': { label: '简体中文', lang: 'zh-CN', link: '/zh-CN/README', themeConfig: {
      sidebar: sidebar('zh-CN'), outlineTitle: '本页内容',
      docFooter: { prev: '上一章', next: '下一章' }, lastUpdated: { text: '更新于' }
    } }
  },
  themeConfig: {
    nav: [{ text: 'Read the book', link: '/en/README' }],
    outline: [2, 3],
    search: { provider: 'local', options: { miniSearch: { options: {
      tokenize: (text: string) => Array.from(new Intl.Segmenter('zh', { granularity: 'word' }).segment(text.toLowerCase()))
        .filter(s => s.isWordLike).map(s => s.segment)
    } } } },
    socialLinks: [{ icon: 'github', link: 'https://github.com/RankaiHQ/rankai-ai-workbook' }]
  },
  markdown: {
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        if (tokens[idx].info.trim() === 'mermaid') {
          const source = encodeURIComponent(tokens[idx].content)
          return `<MermaidDiagram source="${source}" />`
        }
        return fence(tokens, idx, options, env, self)
      }
    }
  }
})
