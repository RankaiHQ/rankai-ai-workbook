<script setup>
// Schematic of the Herdr screen while a worker, its reviewer and the explorer run on one issue; numbered pins and a legend.
const props = defineProps({ lang: { type: String, default: 'zh' } })
const T = {
  zh: {
    label: 'Herdr 界面示意：左侧是 spaces 和 agents 列表，右侧是 tab 栏和三个面板',
    spaces: 'spaces', agents: 'agents', grouped: 'grouped', newItem: 'new', menu: 'menu',
    worker: ['› Codex 第二轮的意见已处理，开始截图', '● Bash  node shots.mjs', '● 60 张截图写入 shots/，开始录屏', '✻ Recording… (esc to interrupt)'],
    status: 'RAN-525 · review 2/3 · visual 4/9',
    stepsTitle: 'steps.md · visual RAN-525',
    steps: ['✓ 1 打开 /en/ 首页', '✓ 2 切到中文', '✓ 3 打开第三章', '→ 4 侧边栏滚到第四章', '  5 手机视图 375×812'],
    reviewer: 'codex · reviewer',
    ask: 'Run git diff origin/staging?',
    options: '› Yes, run it    Always    No',
    legend: [
      'spaces：workspace 列表，第二行是所在的 branch。前面的圆点是这个 workspace 里所有 agent 的汇总状态，红点表示有 agent 在等人。lead 的 rankai-hq 和每个 issue 的 worktree 各占一行。',
      'agents：所有 agent，第一行是"workspace · tab 编号"，第二行是类型。平时主要看这一栏。',
      'tab 栏：只显示当前 workspace 的 tab。1 放 worker 和 reviewer，visual 是 explorer 的 tab。',
      '当前面板：带色边框，键盘输入只进这里。底部状态行是 skill 写的：阶段、review 轮次、visual n/N。',
      '步骤面板：步骤清单的文件一改就重画，✓ 已到达，→ 正在做。',
      'blocked 的 reviewer：Codex 在等我批准命令，spaces 和 agents 里同步显示红点。'
    ]
  },
  en: {
    label: 'Herdr screen: spaces and agents on the left, the tab bar and three panes on the right',
    spaces: 'spaces', agents: 'agents', grouped: 'grouped', newItem: 'new', menu: 'menu',
    worker: ['› Round-two review comments handled, taking screenshots', '● Bash  node shots.mjs', '● 60 screenshots written to shots/, starting the recording', '✻ Recording… (esc to interrupt)'],
    status: 'RAN-525 · review 2/3 · visual 4/9',
    stepsTitle: 'steps.md · visual RAN-525',
    steps: ['✓ 1 open the /en/ home page', '✓ 2 switch to Chinese', '✓ 3 open chapter 3', '→ 4 scroll the sidebar to chapter 4', '  5 mobile view 375×812'],
    reviewer: 'codex · reviewer',
    ask: 'Run git diff origin/staging?',
    options: '› Yes, run it    Always    No',
    legend: [
      'spaces: the workspaces, with the branch on the second line. The dot is the combined state of the agents inside; red means one of them is waiting for a person. The lead\'s rankai-hq and each issue worktree get a row.',
      'agents: every agent, with "workspace · tab number" on the first line and the type on the second. This is the column I actually watch.',
      'Tab bar: only the current workspace\'s tabs. Tab 1 holds the worker and the reviewer; visual is the explorer\'s tab.',
      'Current pane: colored border, keyboard input goes only here. The status line at the bottom is written by the skill: the stage, the review round, visual n/N.',
      'Steps pane: redrawn whenever the steps file changes; ✓ reached, → in progress.',
      'A blocked reviewer: Codex is waiting for me to approve a command, shown as a red dot in spaces and agents at the same time.'
    ]
  }
}
const t = T[props.lang] || T.zh
</script>

<template>
  <figure class="hs-figure" :aria-label="t.label">
    <div class="hs-wrap" role="img" :aria-label="t.label">
      <div class="hs-mock">
        <div class="hs-side">
          <div class="hs-h"><span>{{ t.spaces }}</span><span class="pin">1</span></div>
          <div class="hs-item"><span class="ring"></span><span class="nm">rankai-hq</span><span class="sub">staging</span></div>
          <div class="hs-item sel"><span class="dot blocked"></span><span class="nm">ran-525</span><span class="sub">kaibin/ran-525-…</span></div>
          <div class="hs-item"><span class="dot done"></span><span class="nm">ran-531</span><span class="sub">kaibin/ran-531-…</span></div>
          <div class="hs-actions"><span>{{ t.newItem }}</span><span>{{ t.menu }}</span></div>
          <div class="hs-h"><span>{{ t.agents }}</span><span class="dim">{{ t.grouped }}</span><span class="pin">2</span></div>
          <div class="hs-item"><span class="ring"></span><span class="nm">rankai-hq · 1</span><span class="sub">claude</span></div>
          <div class="hs-item sel"><span class="dot working"></span><span class="nm">ran-525 · 1</span><span class="sub">claude</span></div>
          <div class="hs-item"><span class="dot blocked"></span><span class="nm">ran-525 · 1</span><span class="sub">codex</span></div>
          <div class="hs-item"><span class="dot working"></span><span class="nm">ran-525 · visual</span><span class="sub">claude</span></div>
          <div class="hs-item"><span class="dot done"></span><span class="nm">ran-531 · 1</span><span class="sub">claude</span></div>
        </div>
        <div class="hs-main">
          <div class="hs-tabs"><b class="on">1</b><b>2</b><b>visual</b><span class="plus">+</span><span class="pin">3</span></div>
          <div class="hs-grid">
            <div class="hs-pane big focus"><span class="pin corner">4</span>
              <div class="grow"><div v-for="(l, i) in t.worker" :key="i" :class="{ dim: i === 1, warn: i === 3 }">{{ l }}</div></div>
              <div class="dim">›&nbsp;▌</div>
              <div class="hs-status">{{ t.status }} | ctx [####------] 41%</div>
            </div>
            <div class="hs-pane"><span class="pin corner">5</span>
              <div class="dim">{{ t.stepsTitle }}</div>
              <div v-for="(s, i) in t.steps" :key="i" :class="{ ok: i < 3, acc: i === 3, dim: i === 4 }">{{ s }}</div>
            </div>
            <div class="hs-pane"><span class="pin corner">6</span>
              <div>{{ t.reviewer }}</div>
              <div class="warn" style="margin-top:4px">{{ t.ask }}</div>
              <div class="hs-box">{{ t.options }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ol class="hs-legend">
      <li v-for="(x, i) in t.legend" :key="i"><span class="pin">{{ i + 1 }}</span><span>{{ x }}</span></li>
    </ol>
  </figure>
</template>

<style scoped>
.hs-figure { margin: 1.8rem 0; padding: 1.2rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.hs-wrap { overflow-x: auto; border-radius: 10px; }
.hs-mock { --tbg: #151a25; --tfg: #d5dae6; --tdim: #7d8598; --tline: rgba(255,255,255,.1); --tchrome: #1d2330; --working: #e3b341; --blocked: #ff6f78; --done: #4fcf8b; --idle: #8b93a4;
  min-width: 556px; background: var(--tbg); color: var(--tfg); border-radius: 10px; font-family: var(--vp-font-family-mono); font-size: 11.5px; line-height: 1.5; display: grid; grid-template-columns: 160px minmax(0, 1fr); border: 1px solid var(--tline); overflow: hidden; }
.pin { display: inline-grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; background: var(--vp-c-brand-1); color: var(--vp-c-bg); font-size: 10.5px; font-weight: 700; font-family: var(--vp-font-family-base); flex: none; line-height: 1; }
.hs-mock .pin { color: #fff; background: #2d6cdf; }
.pin.corner { position: absolute; top: 5px; right: 6px; }
.hs-side { border-right: 1px solid var(--tline); background: var(--tchrome); padding: 8px 0 8px; min-width: 0; }
.hs-h { display: flex; align-items: center; gap: 8px; padding: 2px 10px 5px; color: var(--tdim); font-size: 10.5px; } .hs-h .pin { margin-left: auto; }
.hs-item { padding: 2px 10px; display: grid; grid-template-columns: 11px minmax(0, 1fr); column-gap: 7px; align-items: center; }
.hs-item.sel { background: rgba(255,255,255,.07); }
.nm { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .sub { grid-column: 2; color: var(--tdim); font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; } .ring { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--idle); display: inline-block; box-sizing: border-box; }
.dot.working { background: var(--working); box-shadow: 0 0 0 3px rgba(227,179,65,.25); } .dot.blocked { background: var(--blocked); } .dot.done { background: var(--done); }
.hs-actions { display: flex; justify-content: space-between; padding: 6px 10px 8px; color: var(--tdim); font-size: 10.5px; border-bottom: 1px solid var(--tline); margin-bottom: 6px; }
.hs-main { display: grid; grid-template-rows: auto minmax(0, 1fr); min-width: 0; }
.hs-tabs { display: flex; align-items: center; gap: 4px; padding: 5px 8px; border-bottom: 1px solid var(--tline); }
.hs-tabs b { font-weight: 400; padding: 0 12px; color: var(--tdim); border-radius: 3px; background: rgba(255,255,255,.04); } .hs-tabs b.on { color: #fff; background: #2d6cdf; }
.hs-tabs .plus { color: var(--tdim); padding: 0 6px; } .hs-tabs .pin { margin-left: auto; }
.hs-grid { display: grid; grid-template-columns: 1.25fr 1fr; grid-template-rows: 1fr 1fr; min-height: 230px; gap: 6px; padding: 6px; }
.hs-pane { border: 1px solid var(--tline); padding: 8px 28px 8px 10px; position: relative; min-width: 0; overflow: hidden; display: flex; flex-direction: column; white-space: pre-wrap; }
.hs-pane.big { grid-row: 1 / 3; } .hs-pane.focus { border-color: #2d6cdf; } .grow { flex: 1; }
.hs-status { border-top: 1px solid var(--tline); margin-top: 8px; padding-top: 5px; color: var(--tdim); font-size: 10.5px; }
.dim { color: var(--tdim); } .warn { color: var(--working); } .ok { color: var(--done); } .acc { color: #8fb4ff; }
.hs-box { border: 1px solid var(--blocked); border-radius: 5px; padding: 3px 8px; margin-top: 6px; }
.hs-legend { margin: 14px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 13px; line-height: 1.6; }
.hs-legend li { display: flex; gap: 8px; align-items: flex-start; } .hs-legend .pin { margin-top: 3px; }
@media (max-width: 560px) { .hs-legend { grid-template-columns: 1fr; } }
</style>
