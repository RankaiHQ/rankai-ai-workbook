<script setup>
// Schematic of the Herdr screen while one issue is in review: the sidebar with spaces and grouped agents, and the worker's tab with its review and shell panes; numbered pins and a legend.
const props = defineProps({ lang: { type: String, default: 'zh' } })
const T = {
  zh: {
    label: 'Herdr 界面示意：左侧是 spaces 和按项目分组的 agents 列表，右侧是 tab 栏和三个 pane',
    spaces: 'spaces', agents: 'agents', grouped: 'groups', newItem: 'new', menu: 'menu',
    stages: { review: '审查中', gate: '待推送', scout: '调研中' }, ask: '等你回答',
    worker: ['› 第 1 轮的两条 finding 已修复', '● Bash  review-round.sh review 2', '✻ Waiting for round 2…'],
    reviewTitle: '== 14:26:10 review round 2',
    review: ['14:26:19 codex: 核对两处修复', '14:26:31 $ git diff origin/staging'],
    verdict: '14:32:42 verdict: ship',
    shell: ['$ npm run check', '# push 之前的完整检查'],
    legend: [
      'spaces：workspace 列表，第二行是所在的 branch。lead 的 rankai-hq、每个 issue 的 worktree 和每个 scout 各占一行。',
      'agents：所有 agent，按项目分组，组与组之间有一条分隔线。worker 的条目依次显示所处阶段、九段进度条和 PR 编号，有问题等我回答时多一行提示。平时主要看这一栏。',
      'tab 栏：只显示当前 workspace 的 tab。视觉检查进行时多一个 visual tab，里面是步骤清单。',
      '当前 pane：带色边框，键盘输入只进这里。图中是 worker。',
      'review pane：只在 review 进行时出现，逐行显示 Codex 这一轮运行的命令，最后是结论。Codex 以只读方式运行，这里没有需要我批准的操作。',
      'shell pane：worker 把耗时的命令放在这里运行，例如完整检查和等待 CI，它自己的 pane 不会被占住。'
    ]
  },
  en: {
    label: 'Herdr screen: spaces and agents grouped by project on the left, the tab bar and three panes on the right',
    spaces: 'spaces', agents: 'agents', grouped: 'groups', newItem: 'new', menu: 'menu',
    stages: { review: 'reviewing', gate: 'push gate', scout: 'scouting' }, ask: 'needs you',
    worker: ['› Round 1: both findings fixed', '● Bash  review-round.sh review 2', '✻ Waiting for round 2…'],
    reviewTitle: '== 14:26:10 review round 2',
    review: ['14:26:19 codex: checking both fixes', '14:26:31 $ git diff origin/staging'],
    verdict: '14:32:42 verdict: ship',
    shell: ['$ npm run check', '# the full check before a push'],
    legend: [
      'spaces: the workspaces, with the branch on the second line. The lead\'s rankai-hq, each issue worktree, and each scout get a row.',
      'agents: every agent, grouped by project, with a line between groups. A worker\'s entry shows its stage, a bar across the nine stages, and its PR number, plus one more line when it has a question for me. This is the column I actually watch.',
      'Tab bar: only the current workspace\'s tabs. A visual check adds a tab named visual, which holds the steps list.',
      'Current pane: colored border, keyboard input goes only here. In this picture it is the worker.',
      'Review pane: present only during a review. It lists each command Codex runs in this round, then the verdict. Codex runs read-only, so there is nothing here for me to approve.',
      'Shell pane: the worker runs long commands here, such as the full check and the wait for CI, so its own pane is never blocked.'
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
          <div class="hs-item sel"><span class="dot working"></span><span class="nm">ran-525</span><span class="sub">kaibin/ran-525-…</span></div>
          <div class="hs-item"><span class="dot done"></span><span class="nm">ran-531</span><span class="sub">kaibin/ran-531-…</span></div>
          <div class="hs-item"><span class="dot working"></span><span class="nm">scout-dns</span></div>
          <div class="hs-actions"><span>{{ t.newItem }}</span><span>{{ t.menu }}</span></div>
          <div class="hs-h"><span>{{ t.agents }}</span><span class="dim">{{ t.grouped }}</span><span class="pin">2</span></div>
          <div class="hs-item"><span class="ring"></span><span class="nm">rankai-hq</span></div>
          <div class="hs-item sel"><span class="dot working"></span><span class="nm">ran-525 <i class="st review">{{ t.stages.review }}</i></span><span class="sub bar">▰▰▰▰▱▱▱▱▱ 4/9</span></div>
          <div class="hs-item"><span class="dot done"></span><span class="nm">ran-531 <i class="st gate">{{ t.stages.gate }}</i></span><span class="sub bar">▰▰▰▰▰▱▱▱▱ 5/9</span><span class="sub ask">{{ t.ask }}</span></div>
          <div class="hs-item"><span class="dot working"></span><span class="nm">scout-dns <i class="st">{{ t.stages.scout }}</i></span><span class="sub sep">────────────────</span></div>
          <div class="hs-item"><span class="ring"></span><span class="nm">ai-workbook</span></div>
        </div>
        <div class="hs-main">
          <div class="hs-tabs"><b class="on">1</b><span class="plus">+</span><span class="pin">3</span></div>
          <div class="hs-grid">
            <div class="hs-pane big focus"><span class="pin corner">4</span>
              <div class="grow"><div v-for="(l, i) in t.worker" :key="i" :class="{ dim: i === 1, warn: i === 2 }">{{ l }}</div></div>
              <div class="dim">›&nbsp;▌</div>
            </div>
            <div class="hs-pane"><span class="pin corner">5</span>
              <div class="dim">{{ t.reviewTitle }}</div>
              <div v-for="(l, i) in t.review" :key="i" :class="{ dim: i > 0 }">{{ l }}</div>
              <div class="ok">{{ t.verdict }}</div>
            </div>
            <div class="hs-pane"><span class="pin corner">6</span>
              <div>{{ t.shell[0] }}</div>
              <div class="dim">{{ t.shell[1] }}</div>
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
.hs-mock { --tbg: #151a25; --tfg: #d5dae6; --tdim: #7d8598; --tline: rgba(255,255,255,.1); --tchrome: #1d2330; --working: #e3b341; --blocked: #ff6f78; --done: #4fcf8b; --idle: #8b93a4; --gate: #fab387; --review: #89dceb;
  min-width: 556px; background: var(--tbg); color: var(--tfg); border-radius: 10px; font-family: var(--vp-font-family-mono); font-size: 11.5px; line-height: 1.5; display: grid; grid-template-columns: 172px minmax(0, 1fr); border: 1px solid var(--tline); overflow: hidden; }
.pin { display: inline-grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; background: var(--vp-c-brand-1); color: var(--vp-c-bg); font-size: 10.5px; font-weight: 700; font-family: var(--vp-font-family-base); flex: none; line-height: 1; }
.hs-mock .pin { color: #fff; background: #2d6cdf; }
.pin.corner { position: absolute; top: 5px; right: 6px; }
.hs-side { border-right: 1px solid var(--tline); background: var(--tchrome); padding: 8px 0 8px; min-width: 0; }
.hs-h { display: flex; align-items: center; gap: 8px; padding: 2px 10px 5px; color: var(--tdim); font-size: 10.5px; } .hs-h .pin { margin-left: auto; }
.hs-item { padding: 2px 10px; display: grid; grid-template-columns: 11px minmax(0, 1fr); column-gap: 7px; align-items: center; }
.hs-item.sel { background: rgba(255,255,255,.07); }
.nm { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .sub { grid-column: 2; color: var(--tdim); font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.st { font-style: normal; color: var(--tdim); } .st.review { color: var(--review); } .st.gate { color: var(--gate); font-weight: 700; }
.sub.bar { letter-spacing: -.02em; } .sub.ask { color: var(--gate); font-weight: 700; } .sub.sep { margin-top: 3px; text-overflow: clip; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; } .ring { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid var(--idle); display: inline-block; box-sizing: border-box; }
.dot.working { background: var(--working); box-shadow: 0 0 0 3px rgba(227,179,65,.25); } .dot.blocked { background: var(--blocked); } .dot.done { background: var(--done); }
.hs-item .dot, .hs-item .ring { align-self: start; margin-top: 5px; }
.hs-actions { display: flex; justify-content: space-between; padding: 6px 10px 8px; color: var(--tdim); font-size: 10.5px; border-bottom: 1px solid var(--tline); margin-bottom: 6px; }
.hs-main { display: grid; grid-template-rows: auto minmax(0, 1fr); min-width: 0; }
.hs-tabs { display: flex; align-items: center; gap: 4px; padding: 5px 8px; border-bottom: 1px solid var(--tline); }
.hs-tabs b { font-weight: 400; padding: 0 12px; color: var(--tdim); border-radius: 3px; background: rgba(255,255,255,.04); } .hs-tabs b.on { color: #fff; background: #2d6cdf; }
.hs-tabs .plus { color: var(--tdim); padding: 0 6px; } .hs-tabs .pin { margin-left: auto; }
.hs-grid { display: grid; grid-template-columns: 1fr 1.2fr; grid-template-rows: 1.5fr 1fr; min-height: 230px; gap: 6px; padding: 6px; }
.hs-pane { border: 1px solid var(--tline); padding: 8px 10px; position: relative; min-width: 0; overflow: hidden; display: flex; flex-direction: column; white-space: pre-wrap; }
.hs-pane > div:first-of-type { padding-right: 20px; } .hs-pane.big { grid-row: 1 / 3; } .hs-pane.focus { border-color: #2d6cdf; } .grow { flex: 1; }
.dim { color: var(--tdim); } .warn { color: var(--working); } .ok { color: var(--done); }
.hs-legend { margin: 14px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 13px; line-height: 1.6; }
.hs-legend li { display: flex; gap: 8px; align-items: flex-start; margin: 0; } .hs-legend .pin { margin-top: 3px; }
@media (max-width: 560px) { .hs-legend { grid-template-columns: 1fr; } }
</style>
