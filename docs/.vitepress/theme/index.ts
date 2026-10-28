import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MermaidDiagram from './MermaidDiagram.vue'
import ArticleMeta from './ArticleMeta.vue'
import AuthorDirectory from './AuthorDirectory.vue'
import LanguageSwitch from './LanguageSwitch.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(LanguageSwitch),
    'doc-before': () => h(ArticleMeta)
  }),
  enhanceApp({ app }) { app.component('MermaidDiagram', MermaidDiagram); app.component('AuthorDirectory', AuthorDirectory) }
}
