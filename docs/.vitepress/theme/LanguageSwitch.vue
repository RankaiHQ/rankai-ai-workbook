<script setup>
import { computed, onMounted } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
const { page } = useData()
const router = useRouter()
const chinese = computed(() => page.value.relativePath.startsWith('zh-CN/'))
const target = computed(() => {
  const filename = page.value.relativePath.split('/').pop()
  const isIndex = filename === 'index.md' || filename === 'README.md'
  if (chinese.value) return withBase(isIndex ? '/' : `/en/${filename.replace(/\.md$/, '.html')}`)
  return withBase(`/zh-CN/${isIndex ? 'README.html' : filename.replace(/\.md$/, '.html')}`)
})
function remember() {
  try { localStorage.setItem('workbook-language', chinese.value ? 'en' : 'zh-CN') } catch {}
}
onMounted(() => {
  try {
    if (page.value.relativePath === 'index.md' && localStorage.getItem('workbook-language') === 'zh-CN') router.go(withBase('/zh-CN/README.html'))
  } catch {}
})
</script>
<template>
  <nav class="workbook-language" aria-label="Language">
    <span :lang="chinese ? 'zh-CN' : 'en'">{{ chinese ? '中文' : 'EN' }}</span>
    <span aria-hidden="true">/</span>
    <a :href="target" :lang="chinese ? 'en' : 'zh-CN'" @click="remember">{{ chinese ? 'EN' : '中文' }}</a>
  </nav>
</template>
