<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
const { page, frontmatter, lang } = useData()
const zh = computed(() => lang.value === 'zh-CN')
const authors = computed(() => frontmatter.value.authors || [])
const date = computed(() => page.value.lastUpdated ? new Date(page.value.lastUpdated) : null)
const formatted = computed(() => date.value ? new Intl.DateTimeFormat(zh.value ? 'zh-CN' : 'en-GB', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
}).format(date.value) : '')
</script>
<template>
  <div v-if="authors.length" class="article-meta">
    <div class="author-labels">
      <span>{{ zh ? '作者' : 'Authors' }}</span>
      <a v-for="author in authors" :key="author" class="author-tag" :href="withBase(`/${zh ? 'zh-CN' : 'en'}/authors.html?author=${encodeURIComponent(author)}`)">{{ author }}</a>
    </div>
    <span v-if="date">{{ zh ? '最近编辑' : 'Last edited' }} · <time :datetime="date.toISOString()">{{ formatted }} (UTC+8)</time></span>
    <span v-else>{{ zh ? '提交到 Git 后显示编辑时间' : 'Edit time appears after the first Git commit' }}</span>
  </div>
</template>
