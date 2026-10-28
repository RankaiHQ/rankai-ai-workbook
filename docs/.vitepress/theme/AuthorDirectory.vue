<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as articles } from './articles.data'
const { lang } = useData()
const zh = computed(() => lang.value === 'zh-CN')
const selected = ref('')
const localArticles = computed(() => articles.filter(a => a.locale === (zh.value ? 'zh-CN' : 'en')))
const authors = computed(() => [...new Set(localArticles.value.flatMap(a => a.authors))].sort())
const shown = computed(() => localArticles.value.filter(a => !selected.value || a.authors.includes(selected.value)))
function readFilter() { selected.value = new URLSearchParams(location.search).get('author') || '' }
function select(author) {
  selected.value = author
  const url = new URL(location.href)
  if (author) url.searchParams.set('author', author)
  else url.searchParams.delete('author')
  history.replaceState(null, '', url)
}
onMounted(() => { readFilter(); window.addEventListener('popstate', readFilter) })
onUnmounted(() => window.removeEventListener('popstate', readFilter))
</script>
<template>
  <div class="author-directory">
    <div class="author-filters" :aria-label="zh ? '按作者筛选' : 'Filter by author'">
      <button class="author-tag" :aria-pressed="!selected" @click="select('')">{{ zh ? '全部' : 'All' }} ({{ localArticles.length }})</button>
      <button v-for="author in authors" :key="author" class="author-tag" :aria-pressed="selected === author" @click="select(author)">{{ author }} ({{ localArticles.filter(a => a.authors.includes(author)).length }})</button>
    </div>
    <p v-if="!shown.length">{{ zh ? '没有找到该作者的文章。' : 'No articles found for this author.' }}</p>
    <ul>
      <li v-for="article in shown" :key="article.url">
        <a :href="withBase(article.url)">{{ article.title }}</a>
        <div class="author-labels"><button v-for="author in article.authors" :key="author" class="author-tag" @click="select(author)">{{ author }}</button></div>
      </li>
    </ul>
  </div>
</template>
