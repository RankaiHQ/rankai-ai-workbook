<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'
const props = defineProps({ source: { type: String, required: true } })
const { isDark } = useData()
const svg = ref('')
const error = ref('')
let revision = 0
async function render() {
  const current = ++revision
  try {
    const { default: mermaid } = await import('mermaid')
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: isDark.value ? 'dark' : 'neutral' })
    const result = await mermaid.render(`diagram-${crypto.randomUUID()}`, decodeURIComponent(props.source))
    if (current === revision) { svg.value = result.svg; error.value = '' }
  } catch (e) { if (current === revision) error.value = String(e) }
}
onMounted(render)
watch([() => props.source, isDark], render)
</script>

<template>
  <figure class="workbook-diagram" aria-label="Workflow diagram">
    <div v-if="svg && !error" v-html="svg" />
    <pre v-else>{{ decodeURIComponent(source) }}</pre>
    <figcaption v-if="error" role="alert">Diagram could not render: {{ error }}</figcaption>
  </figure>
</template>
