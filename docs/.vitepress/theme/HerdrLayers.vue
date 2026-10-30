<script setup>
// The four Herdr layers from chapter 4, nested as boxes: session, workspace, tab, panes.
const props = defineProps({ lang: { type: String, default: 'zh' } })
const T = {
  zh: {
    label: 'Herdr 的四层结构',
    session: ['session', '后台 server。关掉终端窗口，agent 仍在运行；再执行 herdr 就接回来'],
    workspace: ['workspace', '每个目录一个。lead 在 rankai-hq；每个 issue 的 worktree 各一个，例如 ran-525'],
    tab: ['tab', '同一个 workspace 里的不同布局：1 放 agent，2 放 dev server，visual 给 explorer'],
    panes: [['claude', 'worker'], ['codex', 'reviewer，只读'], ['steps.md', '步骤面板，文件一改就重画']],
    caption: 'agent 不是单独的一层，而是在某个 pane 里运行、被 Herdr 识别出的进程。退出 claude，这个 pane 就变回普通终端。'
  },
  en: {
    label: 'The four layers of Herdr',
    session: ['session', 'The background server. Close the terminal window and the agents keep running; run herdr again to reconnect'],
    workspace: ['workspace', 'One per directory: the lead in rankai-hq, and one per issue worktree, such as ran-525'],
    tab: ['tab', 'Different layouts inside one workspace: 1 for the agents, 2 for the dev server, visual for the explorer'],
    panes: [['claude', 'worker'], ['codex', 'reviewer, read-only'], ['steps.md', 'steps pane, redrawn on every change']],
    caption: 'An agent is not a layer of its own: it is a process running in some pane that Herdr recognizes. Quit claude and that pane is a plain terminal again.'
  }
}
const t = T[props.lang] || T.zh
</script>

<template>
  <figure class="hl-figure" :aria-label="t.label">
    <div class="hl-layer l1">
      <div class="hl-h"><code>{{ t.session[0] }}</code><span>{{ t.session[1] }}</span></div>
      <div class="hl-layer l2">
        <div class="hl-h"><code>{{ t.workspace[0] }}</code><span>{{ t.workspace[1] }}</span></div>
        <div class="hl-layer l3">
          <div class="hl-h"><code>{{ t.tab[0] }}</code><span>{{ t.tab[1] }}</span></div>
          <div class="hl-panes">
            <div class="hl-pane" v-for="[c, d] in t.panes" :key="c"><b>pane</b><code>{{ c }}</code><span>{{ d }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <figcaption>{{ t.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.hl-figure { margin: 1.8rem 0; padding: 1.2rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); font-size: 13px; line-height: 1.5; color: var(--vp-c-text-1); }
.hl-layer { border: 1.5px solid var(--vp-c-divider); border-radius: 10px; padding: 10px 12px 12px; }
.l1 { background: var(--vp-c-bg); } .l2 { background: var(--vp-c-bg-soft); } .l3 { background: var(--vp-c-bg); }
.hl-h { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; margin-bottom: 8px; }
.hl-h code, .hl-pane code { font-family: var(--vp-font-family-mono); font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: none; padding: 0; }
.hl-h span { color: var(--vp-c-text-2); font-size: 12.5px; }
.hl-panes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.hl-pane { border: 1px solid var(--vp-c-divider); border-radius: 7px; padding: 7px 10px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.hl-pane b { font-size: 11px; color: var(--vp-c-text-3); font-weight: 600; letter-spacing: .04em; }
.hl-pane span { color: var(--vp-c-text-2); font-size: 12px; }
figcaption { margin-top: 10px; color: var(--vp-c-text-2); font-size: 12.5px; line-height: 1.6; }
@media (max-width: 560px) { .hl-panes { grid-template-columns: 1fr; } .hl-layer { padding: 8px 8px 10px; } }
</style>
