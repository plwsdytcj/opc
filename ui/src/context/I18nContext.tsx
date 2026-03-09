import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "en" | "zh";

type Dict = Record<string, string>;

const resources: Record<Language, Dict> = {
  en: {
    "common.loading": "Loading...",
    "layout.skip": "Skip to Main Content",
    "layout.documentation": "Documentation",
    "layout.switchToLight": "Switch to light mode",
    "layout.switchToDark": "Switch to dark mode",
    "layout.switchLanguage": "Switch language",

    // Navigation & sections
    "nav.dashboard": "Dashboard",
    "nav.inbox": "Inbox",
    "nav.issues": "Issues",
    "nav.goals": "Goals",
    "nav.projects": "Projects",
    "nav.agents": "Agents",
    "nav.org": "Org",
    "nav.costs": "Costs",
    "nav.activity": "Activity",
    "nav.settings": "Settings",
    "nav.companies": "Companies",
    "nav.approvals": "Approvals",
    "nav.myIssues": "My Issues",
    "sections.work": "Work",
    "sections.company": "Company",

    // Sidebar / actions / labels
    "sidebar.selectCompany": "Select company",
    "actions.newIssue": "New Issue",
    "actions.newProject": "New project",
    "actions.newGoal": "New goal",
    "actions.newAgent": "New agent",
    "companyRail.addCompany": "Add company",
    "labels.live": "live",
    "labels.liveCount": "live ({count})",

    // App wizard
    "app.bootstrap.title": "Instance setup required",
    "app.bootstrap.text": "No instance admin exists yet. Run this command in your Paperclip environment to generate the first admin invite URL:",
    "app.nocompany.title": "Create your first company",
    "app.nocompany.text": "Get started by creating a company.",
    "app.nocompany.newCompany": "New Company",

    // Companies page
    "companies.loading": "Loading companies...",
    "companies.rename": "Rename",
    "companies.deleteCompany": "Delete Company",
    "companies.deleteConfirm": "Delete this company and all its data? This cannot be undone.",

    // Generic actions
    "actions.cancel": "Cancel",
    "actions.delete": "Delete",
    "actions.deleting": "Deleting…",

    // Generic labels
    "labels.agent": "agent",
    "labels.agents": "agents",
    "labels.issue": "issue",
    "labels.issues": "issues",
    "labels.unlimitedBudget": "Unlimited budget",
    "labels.created": "Created {time}",
    "common.noResults": "No results found.",

    // Settings (Company)
    "settings.title": "Company Settings",
    "settings.sections.general": "General",
    "settings.sections.appearance": "Appearance",
    "settings.sections.hiring": "Hiring",
    "settings.sections.invites": "Invites",
    "settings.general.companyName": "Company name",
    "settings.general.companyName.hint": "The display name for your company.",
    "settings.general.description": "Description",
    "settings.general.description.hint": "Optional description shown in the company profile.",
    "settings.general.description.placeholder": "Optional company description",
    "settings.appearance.brandColor": "Brand color",
    "settings.appearance.brandColor.hint": "Sets the hue for the company icon. Leave empty for auto-generated color.",
    "settings.appearance.auto": "Auto",
    "settings.appearance.clear": "Clear",
    "settings.save.saving": "Saving...",
    "settings.save.saveChanges": "Save changes",
    "settings.save.saved": "Saved",
    "settings.save.failed": "Failed to save",
    "settings.hiring.requireApproval.label": "Require board approval for new hires",
    "settings.hiring.requireApproval.hint": "New agent hires stay pending until approved by board.",
    "settings.invites.generate": "Generate OpenClaw Invite Prompt",
    "settings.invites.generating": "Generating...",
    "settings.invites.promptTitle": "OpenClaw Invite Prompt",
    "settings.invites.copied": "Copied!",
    "settings.invites.dismiss": "Dismiss",
    "settings.invites.generateDesc": "Generate an OpenClaw agent invite snippet.",
    "settings.invites.hint": "Creates a short-lived OpenClaw agent invite and renders a copy-ready prompt.",
    "settings.invites.copySnippet": "Copy snippet",
    "settings.invites.copiedSnippet": "Copied snippet",
    "settings.danger.title": "Danger Zone",
    "settings.danger.archive.desc": "Archive this company to hide it from the sidebar. This persists in the database.",
    "settings.danger.archive.confirm": "Archive company \"{name}\"? It will be hidden from the sidebar.",
    "settings.danger.archive.archiving": "Archiving...",
    "settings.danger.archive.already": "Already archived",
    "settings.danger.archive.button": "Archive company",
    "settings.danger.archive.failed": "Failed to archive company",

    // Activity page
    "activity.selectCompany": "Select a company to view activity.",
    "activity.filter.placeholder": "Filter by type",
    "activity.filter.all": "All types",
    "activity.none": "No activity yet.",

    // Costs page
    "costs.selectCompany": "Select a company to view costs.",
    "costs.preset.mtd": "Month to Date",
    "costs.preset.7d": "Last 7 Days",
    "costs.preset.30d": "Last 30 Days",
    "costs.preset.ytd": "Year to Date",
    "costs.preset.all": "All Time",
    "costs.preset.custom": "Custom",

    // Issues page
    "issues.selectCompany": "Select a company to view issues.",
    "myIssues.selectCompany": "Select a company to view your issues.",
    "myIssues.empty": "No issues assigned to you.",

    // Approvals page
    "approvals.pending": "Pending",
    "approvals.all": "All",
    "approvals.nonePending": "No pending approvals.",
    "approvals.none": "No approvals yet.",

    // Agents page
    "agents.selectCompany": "Select a company to view agents.",
    "agents.tabs.all": "All",
    "agents.tabs.active": "Active",
    "agents.tabs.paused": "Paused",
    "agents.tabs.error": "Error",
    "agents.filters": "Filters",
    "agents.showTerminated": "Show terminated",
    "agents.emptyCreate": "Create your first agent to get started.",
    "agents.noMatch": "No agents match the selected filter.",
    "agents.noHierarchy": "No organizational hierarchy defined.",
    "agents.noRecentRuns": "No recent agent runs.",

    // Dashboard
    "dashboard.empty.noCompany.message": "Welcome to Paperclip. Set up your first company and agent to get started.",
    "dashboard.empty.noCompany.action": "Get Started",
    "dashboard.empty.noSelection.message": "Create or select a company to view the dashboard.",
    "dashboard.noAgents.message": "You have no agents.",
    "dashboard.noAgents.action": "Create one here",
    "dashboard.metric.agentsEnabled": "Agents Enabled",
    "dashboard.metric.agentsEnabled.desc": "{running} running, {paused} paused, {error} errors",
    "dashboard.metric.tasksInProgress": "Tasks In Progress",
    "dashboard.metric.tasksInProgress.desc": "{open} open, {blocked} blocked",
    "dashboard.metric.monthSpend": "Month Spend",
    "dashboard.metric.monthSpend.descBudget": "{percent}% of {budget} budget",
    "dashboard.metric.pendingApprovals": "Pending Approvals",
    "dashboard.metric.pendingApprovals.desc": "{count} stale tasks",
    "dashboard.chart.runActivity": "Run Activity",
    "dashboard.chart.issuesByPriority": "Issues by Priority",
    "dashboard.chart.issuesByStatus": "Issues by Status",
    "dashboard.chart.successRate": "Success Rate",
    "dashboard.chart.last14days": "Last 14 days",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.recentTasks": "Recent Tasks",
    "dashboard.recentTasks.none": "No tasks yet.",

    // Inbox
    "inbox.selectCompany": "Select a company to view inbox.",
    "inbox.tabs.new": "New",
    "inbox.tabs.all": "All",
    "inbox.filter.category": "Category",
    "inbox.filter.allCategories": "All categories",
    "inbox.filter.myRecentIssues": "My recent issues",
    "inbox.filter.joinRequests": "Join requests",
    "inbox.filter.approvals": "Approvals",
    "inbox.filter.failedRuns": "Failed runs",
    "inbox.filter.alerts": "Alerts",
    "inbox.filter.staleWork": "Stale work",
    "inbox.filter.approvalStatus.placeholder": "Approval status",
    "inbox.filter.approvalStatus.all": "All approval statuses",
    "inbox.filter.approvalStatus.needsAction": "Needs action",
    "inbox.filter.approvalStatus.resolved": "Resolved",
    "inbox.updated": "updated {time}",
    "inbox.commented": "commented {time}",
    "inbox.actions.dismiss": "Dismiss",
    "inbox.actions.openRun": "Open run",
    "inbox.actions.retry": "Retry",
    "inbox.actions.retrying": "Retrying…",
    "inbox.actions.approve": "Approve",
    "inbox.actions.reject": "Reject",
    "inbox.error.retryFailed": "Failed to retry run",
    "inbox.failedRun.subtitle": "{source} run failed {time}",
    "inbox.errorCode": "Error code: {code}",
    "inbox.noLinkedIssue": "No linked issue",
    "inbox.agent": "Agent",
    "inbox.markAsRead": "Mark as read",
    "inbox.empty.new": "No issues you're involved in yet.",
    "inbox.empty.all": "No inbox items match these filters.",
    "inbox.section.approvals.actionable": "Approvals Needing Action",
    "inbox.section.approvals.all": "Approvals",
    "inbox.section.joinRequests": "Join Requests",
    "inbox.section.failedRuns": "Failed Runs",
    "inbox.section.alerts": "Alerts",
    "inbox.section.staleWork": "Stale Work",
    "inbox.joinRequest.human": "Human join request",
    "inbox.joinRequest.agent": "Agent join request{suffix}",
    "inbox.joinRequest.agent.nameSuffix": ": {name}",
    "inbox.joinRequest.requestedFromIp": "requested {time} from IP {ip}",
    "inbox.joinRequest.email": "email: {email}",
    "inbox.joinRequest.adapter": "adapter: {adapter}",
    "inbox.alerts.agentErrors.one": "agent has errors",
    "inbox.alerts.agentErrors.many": "agents have errors",
    "inbox.alerts.budget": "Budget at {percent}% utilization this month",
    "inbox.source.scheduled": "Scheduled",
    "inbox.source.assignment": "Assignment",
    "inbox.source.manual": "Manual",
    "inbox.source.automation": "Automation",

    // Runs / Live widgets
    "runs.label": "Run",
    "runs.stopping": "Stopping…",
    "runs.stop": "Stop",
    "runs.recentUpdates": "Recent run updates",
    "runs.waitingOutput": "Waiting for run output...",

    // Org chart controls
    "org.zoomIn": "Zoom in",
    "org.zoomOut": "Zoom out",
    "org.fitTitle": "Fit to screen",
    "org.fitLabel": "Fit",

    // Goal detail
    "goals.noSubGoals": "No sub-goals.",
    "goals.noLinkedProjects": "No linked projects.",

    // Issue detail
    "issueDetail.attachments": "Attachments",
    "issueDetail.uploading": "Uploading...",
    "issueDetail.uploadImage": "Upload image",
    "issues.noProject": "No project",
    "issues.noAttachments": "No attachments yet.",
    "issues.noSubIssues": "No sub-issues.",
    "issues.noActivity": "No activity yet.",
    "issues.noCostData": "No cost data yet.",

    // Agent detail
    "agentDetail.noAssignedIssues": "No assigned issues.",
    "agentDetail.recentIssues": "Recent Issues",
    "agentDetail.moreIssues": "more issues",
    "agentDetail.liveRun": "Live Run",
    "agentDetail.latestRun": "Latest Run",
    "agentDetail.viewDetails": "View details",
    "agentDetail.noConfigRevisions": "No configuration revisions yet.",
    "agentDetail.noRuns": "No runs yet.",
    "agentDetail.noLogEvents": "No log events.",
    "agentDetail.noPersistedTranscript": "No persisted transcript for this run.",
    "agentDetail.create": "Create",
    "agentDetail.apiKeys.createTitle": "Create API Key",
    "agentDetail.apiKeys.none": "No active API keys.",
    "agentDetail.restore": "Restore",
    "agentDetail.changed": "Changed:",
    "agentDetail.noTrackedChanges": "no tracked changes",
    "agentDetail.apiKeys.header": "API Keys",

    // Costs
    "costs.utilized": "{percent}% utilized",
    "costs.range.to": "to",
    "costs.byAgent": "By Agent",
    "costs.byAgent.none": "No cost events yet.",
    "costs.tokensInOut": "in {in} / out {out} tok",
    "costs.apiRuns": "api runs: {count}",
    "costs.subscriptionRuns": "subscription runs: {count} ({in} in / {out} out tok)",
    "costs.byProject": "By Project",
    "costs.byProject.none": "No project-attributed run costs yet.",
    "costs.unattributed": "Unattributed",
  },
  zh: {
    "common.loading": "加载中...",
    "layout.skip": "跳转到主要内容",
    "layout.documentation": "文档",
    "layout.switchToLight": "切换到亮色模式",
    "layout.switchToDark": "切换到暗色模式",
    "layout.switchLanguage": "切换语言",

    // Navigation & sections
    "nav.dashboard": "仪表盘",
    "nav.inbox": "收件箱",
    "nav.issues": "问题",
    "nav.goals": "目标",
    "nav.projects": "项目",
    "nav.agents": "智能体",
    "nav.org": "组织",
    "nav.costs": "成本",
    "nav.activity": "活动",
    "nav.settings": "设置",
    "nav.companies": "公司",
    "nav.approvals": "审批",
    "nav.myIssues": "我的问题",
    "sections.work": "工作",
    "sections.company": "公司",

    // Sidebar / actions / labels
    "sidebar.selectCompany": "选择公司",
    "actions.newIssue": "新建问题",
    "actions.newProject": "新建项目",
    "actions.newGoal": "新建目标",
    "actions.newAgent": "新建智能体",
    "companyRail.addCompany": "添加公司",
    "labels.live": "在线",
    "labels.liveCount": "在线（{count}）",

    // App wizard
    "app.bootstrap.title": "需要实例初始化",
    "app.bootstrap.text": "当前没有实例管理员。在 Paperclip 环境中运行以下命令以生成首个管理员邀请链接：",
    "app.nocompany.title": "创建你的第一个公司",
    "app.nocompany.text": "从创建公司开始使用。",
    "app.nocompany.newCompany": "新建公司",

    // Companies page
    "companies.loading": "正在加载公司...",
    "companies.rename": "重命名",
    "companies.deleteCompany": "删除公司",
    "companies.deleteConfirm": "删除该公司及其全部数据？该操作不可撤销。",

    // Generic actions
    "actions.cancel": "取消",
    "actions.delete": "删除",
    "actions.deleting": "正在删除…",

    // Generic labels
    "labels.agent": "名智能体",
    "labels.agents": "名智能体",
    "labels.issue": "个问题",
    "labels.issues": "个问题",
    "labels.unlimitedBudget": "不限预算",
    "labels.created": "创建于{time}",
    "common.noResults": "未找到结果。",

    // Settings (Company)
    "settings.title": "公司设置",
    "settings.sections.general": "通用",
    "settings.sections.appearance": "外观",
    "settings.sections.hiring": "招聘",
    "settings.sections.invites": "邀请",
    "settings.general.companyName": "公司名称",
    "settings.general.companyName.hint": "公司对外显示名称。",
    "settings.general.description": "描述",
    "settings.general.description.hint": "公司资料页显示的可选描述。",
    "settings.general.description.placeholder": "可选的公司描述",
    "settings.appearance.brandColor": "品牌色",
    "settings.appearance.brandColor.hint": "用于公司图标的色相。留空则自动生成。",
    "settings.appearance.auto": "自动",
    "settings.appearance.clear": "清除",
    "settings.save.saving": "正在保存...",
    "settings.save.saveChanges": "保存更改",
    "settings.save.saved": "已保存",
    "settings.save.failed": "保存失败",
    "settings.hiring.requireApproval.label": "新招聘需董事会批准",
    "settings.hiring.requireApproval.hint": "新入职的智能体将保持待批准状态，直到通过董事会审批。",
    "settings.invites.generate": "生成 OpenClaw 邀请片段",
    "settings.invites.generating": "正在生成...",
    "settings.invites.promptTitle": "OpenClaw 邀请片段",
    "settings.invites.copied": "已复制！",
    "settings.invites.dismiss": "忽略",
    "settings.invites.generateDesc": "生成一段 OpenClaw 智能体加入邀请片段。",
    "settings.invites.hint": "创建一个短时有效的 OpenClaw 邀请并输出可复制的提示。",
    "settings.invites.copySnippet": "复制片段",
    "settings.invites.copiedSnippet": "已复制片段",
    "settings.danger.title": "危险区域",
    "settings.danger.archive.desc": "归档公司以在侧栏隐藏。此操作会持久化到数据库。",
    "settings.danger.archive.confirm": "确定要归档公司 \"{name}\"？它将被隐藏在侧栏中。",
    "settings.danger.archive.archiving": "正在归档...",
    "settings.danger.archive.already": "已归档",
    "settings.danger.archive.button": "归档公司",
    "settings.danger.archive.failed": "归档公司失败",

    // Activity page
    "activity.selectCompany": "请选择公司以查看活动。",
    "activity.filter.placeholder": "按类型筛选",
    "activity.filter.all": "全部类型",
    "activity.none": "暂无活动。",

    // Costs page
    "costs.selectCompany": "请选择公司以查看成本。",
    "costs.preset.mtd": "本月至今",
    "costs.preset.7d": "最近 7 天",
    "costs.preset.30d": "最近 30 天",
    "costs.preset.ytd": "今年至今",
    "costs.preset.all": "全部时间",
    "costs.preset.custom": "自定义",

    // Issues page
    "issues.selectCompany": "请选择公司以查看问题。",
    "myIssues.selectCompany": "请选择公司以查看你的问题。",
    "myIssues.empty": "暂无分配给你的问题。",

    // Approvals page
    "approvals.pending": "待审批",
    "approvals.all": "全部",
    "approvals.nonePending": "暂无待审批项。",
    "approvals.none": "暂无审批记录。",

    // Agents page
    "agents.selectCompany": "请选择公司以查看智能体。",
    "agents.tabs.all": "全部",
    "agents.tabs.active": "活跃",
    "agents.tabs.paused": "已暂停",
    "agents.tabs.error": "错误",
    "agents.filters": "筛选",
    "agents.showTerminated": "显示已终止",
    "agents.emptyCreate": "创建你的第一个智能体以开始使用。",
    "agents.noMatch": "没有符合当前筛选条件的智能体。",
    "agents.noHierarchy": "尚未定义组织结构。",
    "agents.noRecentRuns": "暂无近期运行。",

    // Dashboard
    "dashboard.empty.noCompany.message": "欢迎使用 Paperclip。请先创建公司与智能体开始使用。",
    "dashboard.empty.noCompany.action": "开始使用",
    "dashboard.empty.noSelection.message": "创建或选择一个公司以查看仪表盘。",
    "dashboard.noAgents.message": "当前没有智能体。",
    "dashboard.noAgents.action": "去创建",
    "dashboard.metric.agentsEnabled": "已启用智能体",
    "dashboard.metric.agentsEnabled.desc": "{running} 运行中，{paused} 暂停，{error} 错误",
    "dashboard.metric.tasksInProgress": "进行中的任务",
    "dashboard.metric.tasksInProgress.desc": "{open} 打开，{blocked} 阻塞",
    "dashboard.metric.monthSpend": "本月花费",
    "dashboard.metric.monthSpend.descBudget": "已用 {percent}% / 预算 {budget}",
    "dashboard.metric.pendingApprovals": "待审批",
    "dashboard.metric.pendingApprovals.desc": "{count} 个过期任务",
    "dashboard.chart.runActivity": "运行活动",
    "dashboard.chart.issuesByPriority": "按优先级的问题",
    "dashboard.chart.issuesByStatus": "按状态的问题",
    "dashboard.chart.successRate": "成功率",
    "dashboard.chart.last14days": "过去 14 天",
    "dashboard.recentActivity": "近期活动",
    "dashboard.recentTasks": "近期任务",
    "dashboard.recentTasks.none": "暂无任务。",

    // Inbox
    "inbox.selectCompany": "请选择公司以查看收件箱。",
    "inbox.tabs.new": "最新",
    "inbox.tabs.all": "全部",
    "inbox.filter.category": "类别",
    "inbox.filter.allCategories": "全部类别",
    "inbox.filter.myRecentIssues": "我近期的问题",
    "inbox.filter.joinRequests": "加入请求",
    "inbox.filter.approvals": "审批",
    "inbox.filter.failedRuns": "失败的运行",
    "inbox.filter.alerts": "告警",
    "inbox.filter.staleWork": "陈旧工作",
    "inbox.filter.approvalStatus.placeholder": "审批状态",
    "inbox.filter.approvalStatus.all": "全部审批状态",
    "inbox.filter.approvalStatus.needsAction": "需要处理",
    "inbox.filter.approvalStatus.resolved": "已解决",
    "inbox.updated": "更新于{time}",
    "inbox.commented": "评论于{time}",
    "inbox.actions.dismiss": "忽略",
    "inbox.actions.openRun": "打开运行",
    "inbox.actions.retry": "重试",
    "inbox.actions.retrying": "正在重试…",
    "inbox.actions.approve": "通过",
    "inbox.actions.reject": "拒绝",
    "inbox.error.retryFailed": "重试运行失败",
    "inbox.failedRun.subtitle": "{source} 运行失败，{time}",
    "inbox.errorCode": "错误码：{code}",
    "inbox.noLinkedIssue": "未关联问题",
    "inbox.agent": "智能体",
    "inbox.markAsRead": "标记为已读",
    "inbox.empty.new": "你尚未参与任何问题。",
    "inbox.empty.all": "没有符合筛选条件的收件箱条目。",
    "inbox.section.approvals.actionable": "需要处理的审批",
    "inbox.section.approvals.all": "审批",
    "inbox.section.joinRequests": "加入请求",
    "inbox.section.failedRuns": "失败的运行",
    "inbox.section.alerts": "告警",
    "inbox.section.staleWork": "陈旧工作",
    "inbox.joinRequest.human": "人工加入请求",
    "inbox.joinRequest.agent": "智能体加入请求{suffix}",
    "inbox.joinRequest.agent.nameSuffix": "：{name}",
    "inbox.joinRequest.requestedFromIp": "{time} 提交，自 IP {ip}",
    "inbox.joinRequest.email": "邮箱：{email}",
    "inbox.joinRequest.adapter": "适配器：{adapter}",
    "inbox.alerts.agentErrors.one": "名智能体发生错误",
    "inbox.alerts.agentErrors.many": "名智能体发生错误",
    "inbox.alerts.budget": "本月预算使用率 {percent}%",
    "inbox.source.scheduled": "定时",
    "inbox.source.assignment": "指派",
    "inbox.source.manual": "手动",
    "inbox.source.automation": "自动化",

    // Runs / Live widgets
    "runs.label": "运行",
    "runs.stopping": "正在停止…",
    "runs.stop": "停止",
    "runs.recentUpdates": "近期运行更新",
    "runs.waitingOutput": "等待运行输出...",

    // Org chart controls
    "org.zoomIn": "放大",
    "org.zoomOut": "缩小",
    "org.fitTitle": "适配屏幕",
    "org.fitLabel": "适配",

    // Goal detail
    "goals.noSubGoals": "暂无子目标。",
    "goals.noLinkedProjects": "暂无关联项目。",

    // Issue detail
    "issues.noProject": "无项目",
    "issues.noAttachments": "暂无附件。",
    "issues.noSubIssues": "暂无子问题。",
    "issues.noActivity": "暂无活动。",
    "issues.noCostData": "暂无成本数据。",

    // Agent detail
    "agentDetail.noAssignedIssues": "暂无分配的问题。",
    "agentDetail.recentIssues": "近期问题",
    "agentDetail.moreIssues": "个更多问题",
    "agentDetail.liveRun": "实时运行",
    "agentDetail.latestRun": "最新运行",
    "agentDetail.viewDetails": "查看详情",
    "agentDetail.noConfigRevisions": "暂无配置修订。",
    "agentDetail.noRuns": "暂无运行记录。",
    "agentDetail.noLogEvents": "暂无日志事件。",
    "agentDetail.noPersistedTranscript": "该运行没有持久化的对话记录。",
    "agentDetail.create": "创建",
    "agentDetail.apiKeys.createTitle": "创建 API Key",
    "agentDetail.apiKeys.none": "暂无有效的 API Key。",
    "agentDetail.restore": "回滚",
    "agentDetail.changed": "变更：",
    "agentDetail.noTrackedChanges": "无追踪到的变更",
    "agentDetail.apiKeys.header": "API Key",

    // Costs
    "costs.utilized": "已使用 {percent}%",
    "costs.range.to": "至",
    "costs.byAgent": "按智能体",
    "costs.byAgent.none": "暂无成本记录。",
    "costs.tokensInOut": "入 {in} / 出 {out} 词元",
    "costs.apiRuns": "API 运行：{count}",
    "costs.subscriptionRuns": "订阅运行：{count}（{in} 入 / {out} 出 词元）",
    "costs.byProject": "按项目",
    "costs.byProject.none": "暂无项目归属的运行成本。",
    "costs.unattributed": "未归属",
  },
};

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string; // e.g., en-US / zh-CN
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "paperclip.lang";

function detectInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    // ignore
  }
  const nav = typeof navigator !== "undefined" ? navigator.language : "en";
  return nav.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => detectInitialLanguage());

  const setLanguage = useCallback((lang: Language) => setLang(lang), []);
  const toggleLanguage = useCallback(() => setLang((l) => (l === "en" ? "zh" : "en")), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "zh" ? "zh-CN" : "en-US";
    }
  }, [language]);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    const table = resources[language] ?? resources.en;
    let template = table[key] ?? resources.en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        template = template.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return template;
  }, [language]);

  const locale = language === "zh" ? "zh-CN" : "en-US";

  const value = useMemo<I18nContextValue>(() => ({ language, setLanguage, toggleLanguage, t, locale }), [language, setLanguage, toggleLanguage, t, locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
