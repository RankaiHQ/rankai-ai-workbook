<script setup>
// Annotated wireframe of the workbench Artifact from chapter 3: one card per page section, numbered pins, and a legend.
const props = defineProps({ lang: { type: String, default: 'zh' } })
const T = {
  zh: {
    label: '工作台页面示意图',
    title: 'Kaibin 工作台',
    props: [['日期', '10/30 周五'], ['入职', '第 11 天'], ['主线', 'RAN-525 · 第 4/6 步'], ['会议', '14:00 · 明天 10:30'], ['更新', '今天 13:52 · 白天检查']],
    headline: '今天先把 RAN-525 的 review 意见处理完，再看 RAN-531 的方案。',
    toc: ['今天做什么', '我的单', '知识点', '日报与周报', '工时记录', '团队', '给 AI 留言'],
    sections: ['今天做什么', '我的单', '知识点', '日报与周报', '工时记录', '团队在做什么', '给 AI 留言', '后台记录'],
    quads: [['立即做', '重要 · 紧急'], ['计划做', '重要 · 不紧急'], ['快速处理', '紧急 · 不太重要'], ['有空再做', '不紧急 · 不重要']],
    chips: { reply: '回复', code: '代码', draft: '草稿', issue: 'RAN-525', from: '白天检查' },
    group: '进行中',
    issue: { what: '是什么', now: '现在', wait: '等：review' },
    pr: '#412 · CI 通过',
    know: ['前端', '后端 API', '是什么', '和你有关', '可以去看'],
    tabs: ['日报', '周报'],
    draftState: '已放进 Slack 草稿箱',
    report: ['Daily Text Update · Oct 30', '每日更新 · 10 月 30 日'],
    days: ['日', '一', '二', '三', '四', '五', '六'],
    team: ['成员', '在推进', '和我的关系'],
    note: '例如：下午和同事对过 RAN-531，可以开工了',
    noteBtn: '留言',
    log: '定时任务之间交接用，平时不用看',
    legend: [
      '属性栏：日期、入职第几天、主线 issue 和它走到第几步、今明两天的会议、最近一次是哪个任务写入的。下面一句话是晨报写的当天要点。',
      '今天做什么：待办按重要和紧急分四格。回复类的条目带英文草稿和原消息链接，每条都记录来源：哪一次运行建的，或我手动加的。',
      '我的单：分配给我的 issue 按状态分组，状态、优先级、PR 和 CI 来自 Linear 和 GitHub。每张下面一句"是什么"、一句"现在"，以及正在等谁。',
      '知识点：晨报每天挑两三个和手上 issue 有关的技术点，按前端、后端、部署等分层。',
      '日报与周报：每晚的日报中英对照显示，复制和放进 Slack 草稿箱的都是英文原文。',
      '工时记录：每天一张图，可以下载，也可以手动改。',
      '团队在做什么：每个人在推进的事，以及和我手上工作的关系。',
      '给 AI 留言：写任务看不到的事。下一次运行采纳后删除。最后折叠的"后台记录"是任务之间交接用的，平时不看。'
    ]
  },
  en: {
    label: 'Wireframe of the workbench page',
    title: "Kaibin's workbench",
    props: [['Date', 'Fri 10/30'], ['Day', '11'], ['Main line', 'RAN-525 · step 4 of 6'], ['Meetings', '14:00 · tomorrow 10:30'], ['Updated', 'today 13:52 · daytime check']],
    headline: 'Finish the review comments on RAN-525 first, then look at the plan for RAN-531.',
    toc: ['Today', 'My issues', 'Learning', 'Reports', 'Timesheets', 'Team', 'Notes to the AI'],
    sections: ['Today', 'My issues', 'Learning notes', 'Daily and weekly reports', 'Timesheets', 'What the team is doing', 'Notes to the AI', 'Log'],
    quads: [['Do now', 'important · urgent'], ['Plan', 'important · not urgent'], ['Quick replies', 'urgent · less important'], ['When free', 'neither']],
    chips: { reply: 'Reply', code: 'Code', draft: 'Draft', issue: 'RAN-525', from: 'Daytime check' },
    group: 'In progress',
    issue: { what: 'What', now: 'Now', wait: 'Waiting: review' },
    pr: '#412 · CI passed',
    know: ['Frontend', 'Backend API', 'What', 'Why it matters', 'Where to look'],
    tabs: ['Daily', 'Weekly'],
    draftState: 'In Slack drafts',
    report: ['Daily Text Update · Oct 30', '每日更新 · 10 月 30 日'],
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    team: ['Member', 'Working on', 'Relation to me'],
    note: 'e.g. Aligned with a teammate on RAN-531 this afternoon; it can start',
    noteBtn: 'Save',
    log: 'Handoff between runs; not for reading',
    legend: [
      'Properties: the date, which day of my internship, the main-line issue and its step, meetings today and tomorrow, and which task wrote last. The line below is the day\'s headline from the morning brief.',
      'Today: to-dos on a four-quadrant grid. A reply to-do carries an English draft and a link to the original message, and every to-do records its source: which run created it, or me.',
      'My issues: the issues assigned to me, grouped by status. Status, priority, PRs and CI come from Linear and GitHub; under each issue one line on what it is, one on where it stands, and who we are waiting on.',
      'Learning notes: two or three technical points a day, picked by the morning brief for the issues in hand, labeled by layer.',
      'Reports: each evening\'s daily update, English with Chinese beside it; what gets copied or sent to Slack drafts is the English.',
      'Timesheets: one image per day, downloadable and editable by hand.',
      'Team: what each person is pushing on and how it relates to my work.',
      'Notes to the AI: facts the tasks cannot see; the next run folds them in and deletes them. The collapsed log at the bottom is for handoff between runs.'
    ]
  }
}
const t = T[props.lang] || T.zh
const hours = [0, 7.5, 8, 6.5, 8.5, 7, 0]
</script>

<template>
  <figure class="wb-figure" :aria-label="t.label">
    <div class="wb-page">
      <div class="wb-cover" aria-hidden="true"></div>
      <div class="wb-head">
        <span class="wb-icon" aria-hidden="true">K</span>
        <div class="wb-title">{{ t.title }}</div>
      </div>
      <dl class="wb-props"><span class="pin">1</span>
        <template v-for="[k, v] in t.props" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
      </dl>
      <div class="wb-toc"><span v-for="x in t.toc" :key="x">{{ x }}</span></div>
      <div class="wb-callout"><span class="wb-ci">!</span><span>{{ t.headline }}</span></div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">2</span><b>{{ t.sections[0] }}</b></div>
        <div class="wb-quad">
          <div v-for="([n, s], i) in t.quads" :key="n" :class="['wb-q', 'q' + (i + 1)]">
            <div class="wb-qh"><i></i><b>{{ n }}</b><span>{{ s }}</span></div>
            <div class="wb-item" v-if="i < 3"><span class="wb-chk"></span><div><span class="ph" :style="{ width: ['82%', '64%', '70%'][i] }"></span>
              <div class="wb-meta"><span class="tag" :class="i === 0 ? 'orange' : 'blue'">{{ i === 0 ? t.chips.reply : t.chips.code }}</span><span class="key">{{ t.chips.issue }}</span><span class="dim">{{ t.chips.from }}</span><span v-if="i === 0" class="lnk">{{ t.chips.draft }}</span></div></div></div>
            <div class="wb-item" v-if="i === 1"><span class="wb-chk"></span><div><span class="ph" style="width:48%"></span></div></div>
          </div>
        </div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">3</span><b>{{ t.sections[1] }}</b></div>
        <div class="wb-list">
          <div class="wb-group"><svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 3.2a3.8 3.8 0 0 1 0 7.6z" fill="currentColor"/></svg>{{ t.group }} <span class="dim">2</span></div>
          <div class="wb-row" v-for="r in 2" :key="r">
            <span class="key">{{ r === 1 ? 'RAN-525' : 'RAN-531' }}</span><span class="ph" :style="{ width: r === 1 ? '58%' : '44%' }"></span>
            <span class="wb-right"><span v-if="r === 1" class="tag accent">★</span><span class="pr" v-if="r === 1">{{ t.pr }}</span></span>
            <div class="wb-desc"><span class="dim">{{ t.issue.what }}</span><span class="ph" style="width:70%"></span></div>
            <div class="wb-desc"><span class="dim">{{ t.issue.now }}</span><span class="ph" style="width:52%"></span><span v-if="r === 1" class="tag orange">{{ t.issue.wait }}</span></div>
          </div>
        </div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">4</span><b>{{ t.sections[2] }}</b></div>
        <div class="wb-cards">
          <div class="wb-card" v-for="c in 2" :key="c">
            <span class="tag" :class="c === 1 ? 'pink' : 'blue'">{{ c === 1 ? t.know[0] : t.know[1] }}</span>
            <span class="ph strong" :style="{ width: c === 1 ? '76%' : '60%' }"></span>
            <div class="wb-kv" v-for="k in 3" :key="k"><span class="dim">{{ t.know[k + 1] }}</span><span class="ph" :style="{ width: [80, 65, 50][k - 1] + '%' }"></span></div>
          </div>
        </div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">5</span><b>{{ t.sections[3] }}</b></div>
        <div class="wb-tabs"><span class="on">{{ t.tabs[0] }}</span><span>{{ t.tabs[1] }}</span><span class="tag green" style="margin-left:auto">{{ t.draftState }}</span></div>
        <div class="wb-bi"><div class="en">{{ t.report[0] }}</div><div class="zh">{{ t.report[1] }}</div><span class="ph" style="width:88%"></span><span class="ph zh" style="width:70%"></span><span class="ph" style="width:76%"></span><span class="ph zh" style="width:58%"></span></div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">6</span><b>{{ t.sections[4] }}</b></div>
        <div class="wb-week">
          <div v-for="(h, i) in hours" :key="i" :class="['wb-day', { on: i === 5, none: !h }]"><span class="wd">{{ t.days[i] }}</span><span class="bar"><i :style="{ height: (h / 9 * 100) + '%' }"></i></span><b>{{ h ? h + 'h' : '–' }}</b></div>
        </div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">7</span><b>{{ t.sections[5] }}</b></div>
        <div class="wb-table">
          <div class="wb-tr th"><span v-for="h in t.team" :key="h">{{ h }}</span></div>
          <div class="wb-tr" v-for="r in 3" :key="r"><span class="ph" style="width:60%"></span><span class="ph" :style="{ width: [85, 70, 78][r - 1] + '%' }"></span><span class="ph" :style="{ width: [50, 30, 64][r - 1] + '%' }"></span></div>
        </div>
      </div>

      <div class="wb-sec">
        <div class="wb-sh"><span class="pin">8</span><b>{{ t.sections[6] }}</b></div>
        <div class="wb-note"><div class="wb-ta">{{ t.note }}</div><span class="wb-btn">{{ t.noteBtn }}</span></div>
      </div>

      <div class="wb-sec wb-log"><div class="wb-sh"><b class="dim">{{ t.sections[7] }}</b><span class="dim">{{ t.log }}</span><span class="dim" style="margin-left:auto">▸</span></div></div>
    </div>

    <ol class="wb-legend">
      <li v-for="(x, i) in t.legend" :key="i"><span class="pin">{{ i + 1 }}</span><span>{{ x }}</span></li>
    </ol>
  </figure>
</template>

<style scoped>
.wb-figure { margin: 1.8rem 0; padding: 1.2rem; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); font-size: 12px; line-height: 1.45; color: var(--vp-c-text-1); }
.wb-page { background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 16px 18px 12px; max-width: 640px; margin: 0 auto; }
.pin { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; background: var(--vp-c-brand-1); color: var(--vp-c-bg); font-size: 11px; font-weight: 700; flex: none; line-height: 1; }
.ph { display: inline-block; height: 7px; border-radius: 4px; background: var(--vp-c-divider); vertical-align: middle; max-width: 100%; }
.ph.strong { height: 9px; background: var(--vp-c-text-3); opacity: .55; }
.dim { color: var(--vp-c-text-3); }
.tag { display: inline-block; font-size: 10.5px; line-height: 1.5; padding: 0 5px; border-radius: 4px; background: var(--vp-c-default-soft); color: var(--vp-c-text-2); white-space: nowrap; }
.tag.blue { background: var(--vp-c-indigo-soft); color: var(--vp-c-indigo-1); } .tag.orange { background: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }
.tag.green { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); } .tag.pink { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); } .tag.accent { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.key { font-family: var(--vp-font-family-mono); font-size: 10.5px; border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0 4px; color: var(--vp-c-text-2); white-space: nowrap; }
.pr { font-family: var(--vp-font-family-mono); font-size: 10.5px; border: 1px solid var(--vp-c-green-1); color: var(--vp-c-green-1); border-radius: 4px; padding: 0 5px; white-space: nowrap; }
.lnk { color: var(--vp-c-brand-1); }
.wb-cover { height: 5px; border-radius: 3px; background: linear-gradient(90deg, #d9434a, #c98a1c 30%, #3f9f73 55%, #3a72e0 78%, #5e6ad2); opacity: .7; margin-bottom: 12px; }
.wb-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.wb-icon { width: 30px; height: 30px; border-radius: 8px; background: #5e6ad2; color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 15px; }
.wb-title { font-size: 18px; font-weight: 700; }
.wb-props { display: grid; grid-template-columns: 54px 1fr; gap: 1px 10px; margin: 0 0 8px; position: relative; padding-right: 26px; }
.wb-props .pin { position: absolute; right: 0; top: 0; }
.wb-props dt { color: var(--vp-c-text-3); } .wb-props dd { margin: 0; }
.wb-toc { display: flex; flex-wrap: wrap; gap: 2px 10px; border-top: 1px solid var(--vp-c-divider); border-bottom: 1px solid var(--vp-c-divider); padding: 4px 0; color: var(--vp-c-text-3); font-size: 11px; }
.wb-callout { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px; padding: 7px 10px; border-radius: 6px; background: var(--vp-c-yellow-soft); border: 1px solid var(--vp-c-divider); }
.wb-ci { flex: none; width: 16px; height: 16px; border-radius: 4px; background: var(--vp-c-yellow-1); color: var(--vp-c-bg); display: grid; place-items: center; font-weight: 700; font-size: 11px; margin-top: 1px; }
.wb-sec { margin-top: 16px; }
.wb-sh { display: flex; align-items: center; gap: 7px; margin-bottom: 6px; font-size: 13px; }
.wb-quad { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.wb-q { border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; min-width: 0; }
.wb-qh { display: flex; align-items: center; gap: 5px; padding: 4px 8px; border-bottom: 1px solid var(--vp-c-divider); font-size: 11px; }
.wb-qh i { width: 8px; height: 8px; border-radius: 2px; } .wb-qh span { color: var(--vp-c-text-3); font-size: 10px; }
.q1 .wb-qh { background: var(--vp-c-red-soft); } .q1 i { background: var(--vp-c-red-1); }
.q2 .wb-qh { background: var(--vp-c-indigo-soft); } .q2 i { background: var(--vp-c-indigo-1); }
.q3 .wb-qh { background: var(--vp-c-yellow-soft); } .q3 i { background: var(--vp-c-yellow-1); }
.q4 .wb-qh { background: var(--vp-c-default-soft); } .q4 i { background: var(--vp-c-text-3); }
.wb-item { display: flex; gap: 6px; padding: 6px 8px; align-items: flex-start; } .wb-item > div { flex: 1; min-width: 0; }
.wb-chk { flex: none; width: 11px; height: 11px; border: 1.5px solid var(--vp-c-text-3); border-radius: 3px; margin-top: 1px; }
.wb-meta { display: flex; flex-wrap: wrap; gap: 3px 5px; margin-top: 4px; align-items: center; font-size: 10.5px; }
.wb-list { border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.wb-group { display: flex; align-items: center; gap: 5px; padding: 4px 10px; background: var(--vp-c-bg-soft); font-size: 11px; font-weight: 600; color: var(--vp-c-yellow-1); }
.wb-group .dim { font-weight: 400; }
.wb-row { display: grid; grid-template-columns: auto 1fr auto; gap: 3px 8px; padding: 7px 10px; border-top: 1px solid var(--vp-c-divider); align-items: center; }
.wb-right { display: flex; gap: 5px; align-items: center; } .wb-desc { grid-column: 1 / 4; display: flex; gap: 6px; align-items: center; }
.wb-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.wb-card { border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
.wb-kv { display: grid; grid-template-columns: 52px 1fr; gap: 6px; align-items: center; width: 100%; }
.wb-tabs { display: flex; gap: 10px; align-items: center; border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 4px; margin-bottom: 6px; color: var(--vp-c-text-3); }
.wb-tabs .on { color: var(--vp-c-text-1); border-bottom: 2px solid var(--vp-c-brand-1); margin-bottom: -5px; padding-bottom: 3px; }
.wb-bi { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
.wb-bi .en { font-weight: 600; } .wb-bi .zh { color: var(--vp-c-text-3); border-left: 2px solid var(--vp-c-divider); padding-left: 6px; }
.wb-bi .ph.zh { margin-left: 8px; opacity: .6; }
.wb-week { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.wb-day { border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 5px 2px; display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 10.5px; color: var(--vp-c-text-3); }
.wb-day.on { border-color: var(--vp-c-brand-1); box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); } .wb-day.on .wd { color: var(--vp-c-brand-1); font-weight: 600; }
.wb-day .bar { height: 30px; width: 10px; background: var(--vp-c-default-soft); border-radius: 3px; display: flex; align-items: flex-end; overflow: hidden; }
.wb-day .bar i { display: block; width: 100%; background: var(--vp-c-brand-1); border-radius: 3px; }
.wb-day b { color: var(--vp-c-text-1); } .wb-day.none b { color: var(--vp-c-text-3); font-weight: 400; }
.wb-table { border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.wb-tr { display: grid; grid-template-columns: 1fr 1.6fr 1.2fr; gap: 10px; padding: 6px 10px; border-top: 1px solid var(--vp-c-divider); align-items: center; }
.wb-tr.th { border-top: 0; background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); font-size: 11px; }
.wb-note { display: flex; gap: 8px; align-items: flex-end; }
.wb-ta { flex: 1; min-height: 40px; border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 6px 8px; color: var(--vp-c-text-3); font-size: 11px; }
.wb-btn { background: var(--vp-c-brand-1); color: var(--vp-c-bg); border-radius: 5px; padding: 3px 10px; font-size: 11px; font-weight: 600; }
.wb-log .wb-sh { margin: 0; font-size: 12px; border-top: 1px solid var(--vp-c-divider); padding-top: 8px; }
.wb-legend { margin: 14px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; font-size: 13px; line-height: 1.6; }
.wb-legend li { display: flex; gap: 8px; align-items: flex-start; } .wb-legend .pin { margin-top: 3px; }
@media (max-width: 560px) { .wb-quad, .wb-cards, .wb-legend { grid-template-columns: 1fr; } .wb-page { padding: 12px; } .wb-tr { grid-template-columns: 1fr; gap: 4px; } }
</style>
