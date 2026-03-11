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
    "layout.mobileNav": "Mobile navigation",

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
    "sidebar.noCompanies": "No companies",
    "sidebar.manageCompanies": "Manage Companies",
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

    // Auth
    "auth.signInTitle": "Sign in to Paperclip",
    "auth.createTitle": "Create your Paperclip account",
    "auth.createDesc": "Create an account for this instance. Email confirmation is not required in v1.",
    "auth.createAccount": "Create Account",
    "auth.switch.createOne": "Create one",
    "auth.switch.signIn": "Sign in",
    "auth.field.name": "Name",
    "auth.field.email": "Email",
    "auth.field.password": "Password",
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
    "approvals.error.approveFailed": "Failed to approve",
    "approvals.error.rejectFailed": "Failed to reject",
    "approvals.selectCompany": "Select a company to view approvals.",

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
    "runs.startedAt": "Started {time}",
    "runs.finishedAt": "Finished {time}",
    "runs.error.generic": "Run exited with an error.",
    
    // Generic
    "common.addDescriptionPlaceholder": "Add a description...",
    "common.before": "Before",
    "common.after": "After",
    "common.id": "ID",
    "common.back": "Back",
    "common.close": "Close",
    "common.created": "Created",
    "common.updated": "Updated",
    "common.name": "Name",
    "common.role": "Role",
    "common.icon": "Icon",
    "common.copied": "Copied!",
    "actions.copy": "Copy",
    "actions.show": "Show",
    "actions.hide": "Hide",
    "actions.revoke": "Revoke",
    "common.disabled": "Disabled",
    "common.for": "For",
    "common.model": "Model",
    "common.in": "in",
    "common.title": "Title",
    "common.none": "None",
    "common.scrollToBottom": "Scroll to bottom",
    "common.ok": "OK",
    "common.choose": "Choose",
    
    // Breadcrumb
    "breadcrumb.label": "Breadcrumb",
    "breadcrumb.more": "More",
    
    // Path modal
    "pathModal.title": "Specify path manually",
    "pathModal.description.start": "Copy the absolute path (e.g.",
    "pathModal.description.end": ") into the input.",
    "pathModal.platform.mac": "macOS",
    "pathModal.platform.windows": "Windows",
    "pathModal.platform.linux": "Linux",
    "pathModal.mac.step1": "Find the folder in Finder.",
    "pathModal.mac.step2": "Hold Option and right‑click the folder.",
    "pathModal.mac.step3": "Click 'Copy as Pathname'.",
    "pathModal.mac.step4": "Paste into the path input.",
    "pathModal.mac.tip": "Or open Terminal, cd into the folder and run pwd.",
    "pathModal.windows.step1": "Open File Explorer and go to the folder.",
    "pathModal.windows.step2": "Click the address bar to show the full path.",
    "pathModal.windows.step3": "Copy the path and paste it here.",
    "pathModal.windows.tip": "Or hold Shift and right‑click, then select 'Copy as path'.",
    "pathModal.linux.step1": "Open a terminal and cd to the folder.",
    "pathModal.linux.step2": "Run pwd to print the full path.",
    "pathModal.linux.step3": "Copy the output and paste it here.",
    "pathModal.linux.tip": "In many file managers, Ctrl+L shows the full path.",
    "pathModal.terminal.title": "Terminal fallback (macOS/Linux)",
    
    // Goals
    "goals.none": "No goals.",
    
    // Invite
    "invite.installTo": "Install to {path}",
    
    // Projects errors
    "projects.error.createFailed": "Failed to create project.",
    
    // Markdown
    "markdown.mermaidFailed": "Failed to render Mermaid diagram.",
    "markdown.mermaidUnable": "Unable to render Mermaid diagram:",
    "markdown.mermaidRendering": "Rendering Mermaid diagram...",
    
    // Approval detail extras
    "approvalDetail.seeFullRequest": "See full request",
    "approvalDetail.requestRevision": "Request revision",
    "approvalDetail.markResubmitted": "Mark resubmitted",
    "approvalDetail.linkedIssues.note": "Linked issues remain open until the requesting agent follows up and closes them.",
    
    // Settings invite snippet
    "settings.invites.noCandidates.short": "- (No candidate URLs available yet.)",
    "settings.invites.noCandidates.help": "No candidate URLs are available. Ask your user to configure a reachable hostname in Paperclip, then retry.\nSuggested steps:\n- choose a hostname that resolves to the Paperclip host from your runtime\n- run: pnpm paperclipai allowed-hostname <host>\n- restart Paperclip\n- verify with: curl -fsS http://<host>:3100/api/health\n- regenerate this invite snippet",
    "settings.invites.reachabilityNote": "If none are reachable, ask your user to add a reachable hostname in Paperclip, restart, and retry.\nSuggested command:\n- pnpm paperclipai allowed-hostname <host>\nThen verify with: curl -fsS <base-url>/api/health",

    // Org chart controls
    "org.zoomIn": "Zoom in",
    "org.zoomOut": "Zoom out",
    "org.fitTitle": "Fit to screen",
    "org.fitLabel": "Fit",

    // Goal detail
    "goals.noSubGoals": "No sub-goals.",
    "goals.noLinkedProjects": "No linked projects.",
    "goals.subGoals": "Sub-Goals",
    "goals.addSubGoal": "Sub Goal",

    // Issue detail tabs & labels
    "issueDetail.tabs.comments": "Comments",
    "issueDetail.tabs.subissues": "Sub-issues",
    "issueDetail.tabs.activity": "Activity",
    "issueDetail.costSummary": "Cost Summary",
    "issueDetail.tokens.label": "Tokens {count}",
    "issueDetail.tokens.detail.withCache": "(in {in}, out {out}, cached {cached})",
    "issueDetail.tokens.detail.noCache": "(in {in}, out {out})",
    "issueDetail.linkedApprovals": "Linked Approvals",
    
    

    // Issues list UX
    "issues.searchPlaceholder": "Search issues...",
    "issues.filterButton": "Filter",
    "issues.filtersButton.count": "Filters: {count}",
    "issues.view.list": "List view",
    "issues.view.board": "Board view",
    "issues.labels": "Labels",
    "issues.sort": "Sort",
    "issues.group": "Group",

    // Comments common
    "comments.addPlaceholder": "Add a comment...",
    "comments.post": "Post comment",
    "comments.posting": "Posting…",
    "comments.none": "No comments or runs yet.",
    "comments.header": "Comments & Runs",

    // Agents search
    "agents.searchPlaceholder": "Search agents...",
    
    // Comments utils
    "comments.copyAsMarkdown": "Copy as markdown",
    "comments.attachImage": "Attach image",
    // Icons
    "icons.searchPlaceholder": "Search icons...",
    "icons.noMatch": "No icons match",

    // Adapter config extras
    "agentConfig.promptTemplate.placeholder": "You are agent {{ agent.name }}. Your role is {{ agent.role }}...",
    "agentConfig.bootstrapPrompt.label": "Bootstrap prompt (first run)",
    "agentConfig.bootstrapPrompt.placeholder": "Optional initial setup prompt for the first run",
    "agentConfig.extraArgs.label": "Extra args (comma-separated)",
    "agentConfig.extraArgs.placeholder": "e.g. --verbose, --foo=bar",
    "agentConfig.envVars.label": "Environment variables",
    "agentConfig.error.loadModelsFailed": "Failed to load adapter models.",
    "agentConfig.codex.minimalWarning": "Codex may reject `minimal` thinking when search is enabled.",

    // Identities
    "identity.system": "System",
    "identity.board": "Board",
    "identity.me": "Me",
    "identity.meBoard": "Me (Board)",
    "identity.unknown": "Unknown",

    // Issue activity simple labels
    "issue.created": "created the issue",
    "issue.updated": "updated the issue",
    "issue.checked_out": "checked out the issue",
    "issue.released": "released the issue",
    "issue.comment_added": "added a comment",
    "issue.attachment_added": "added an attachment",
    "issue.attachment_removed": "removed an attachment",
    "issue.deleted": "deleted the issue",
    "agent.created": "created an agent",
    "agent.updated": "updated the agent",
    "agent.paused": "paused the agent",
    "agent.resumed": "resumed the agent",
    "agent.terminated": "terminated the agent",
    "heartbeat.invoked": "invoked a heartbeat",
    "heartbeat.cancelled": "cancelled a heartbeat",
    "approval.created": "requested approval",
    "approval.approved": "approved",
    "approval.rejected": "rejected",

    // Issue activity composed messages
    "issueAction.status.fromTo": "changed the status from {from} to {to}",
    "issueAction.status.to": "changed the status to {to}",
    "issueAction.priority.fromTo": "changed the priority from {from} to {to}",
    "issueAction.priority.to": "changed the priority to {to}",
    "issueAction.assigned": "assigned the issue",
    "issueAction.unassigned": "unassigned the issue",
    "issueAction.titleUpdated": "updated the title",
    "issueAction.descriptionUpdated": "updated the description",

    // Issue detail
    "issueDetail.attachments": "Attachments",
    "issueDetail.uploading": "Uploading...",
    "issueDetail.uploadImage": "Upload image",
    "issues.noProject": "No project",
    "issues.noAttachments": "No attachments yet.",
    "issues.noSubIssues": "No sub-issues.",
    "issues.noActivity": "No activity yet.",
    "issues.noCostData": "No cost data yet.",
    "issues.filters": "Filters",
    "issues.status": "Status",
    "issues.priority": "Priority",
    "issues.assignee": "Assignee",
    "issues.created": "Created",
    "issues.quickFilters": "Quick filters",
    "issues.none": "No issues",

    // Agent detail
    "agentDetail.noAssignedIssues": "No assigned issues.",
    "agentDetail.recentIssues": "Recent Issues",
    "agentDetail.moreIssues": "more issues",
    "agentDetail.liveRun": "Live Run",
    "agentDetail.latestRun": "Latest Run",
    "agentDetail.viewDetails": "View details",
    "agentDetail.noConfigRevisions": "No configuration revisions yet.",
    "agentDetail.noRuns": "No runs yet.",
    "agentDetail.permissions": "Permissions",
    "agentDetail.invocation": "Invocation",
    "agentDetail.prompt": "Prompt",
    "agentDetail.context": "Context",
    "agentDetail.environment": "Environment",
    "agentDetail.apiKeys.namePlaceholder": "Key name (e.g. production)",
    "agentDetail.noLogEvents": "No log events.",
    "agentDetail.commandNotes": "Command notes",
    "agentDetail.command": "Command",
    "runs.loadingLogs": "Loading run logs...",
    "agentDetail.noPersistedTranscript": "No persisted transcript for this run.",
    "agentDetail.create": "Create",
    "agentDetail.apiKeys.createTitle": "Create API Key",
    "agentDetail.apiKeys.none": "No active API keys.",
    "agentDetail.restore": "Restore",
    "agentDetail.changed": "Changed:",
    "agentDetail.noTrackedChanges": "no tracked changes",
    "agentDetail.apiKeys.header": "API Keys",
    "agentDetail.config.title": "Configuration",
    "agentDetail.config.manage": "Manage",
    "agentDetail.config.details": "Agent Details",
    "agentDetail.config.adapter": "Adapter",
    "agentDetail.config.heartbeat": "Heartbeat",
    "agentDetail.config.every": "Every {interval}",
    "agentDetail.config.notConfigured": "Not configured",
    "agentDetail.config.lastHeartbeat": "Last heartbeat",
    "agentDetail.config.never": "Never",
    "agentDetail.config.reportsTo": "Reports to",
    "agentDetail.config.nobodyTop": "Nobody (top-level)",
    "agentDetail.config.directReports": "Direct reports",
    "agentDetail.assignTask": "Assign Task",
    "agentDetail.resume": "Resume",
    "agentDetail.pause": "Pause",
    "agentDetail.live": "Live",
    "agentDetail.capabilities": "Capabilities",
    "agentDetail.promptTemplate": "Prompt Template",
    "agentDetail.tokens.input": "Input tokens",
    "agentDetail.tokens.output": "Output tokens",
    "agentDetail.tokens.cached": "Cached tokens",
    "agentDetail.tokens.totalCost": "Total cost",
    "agentDetail.table.date": "Date",
    "agentDetail.table.run": "Run",
    "agentDetail.table.input": "Input",
    "agentDetail.table.output": "Output",
    "agentDetail.table.cost": "Cost",
    "agentDetail.menu.configure": "Configure Agent",
    "agentDetail.menu.copyId": "Copy Agent ID",
    "agentDetail.menu.resetSessions": "Reset Sessions",
    "agentDetail.menu.terminate": "Terminate",
    "agentDetail.issuesTouched": "Issues Touched",
    "agentDetail.stderr": "stderr",
    "agentDetail.stdout": "stdout",
    "agentDetail.stderrExcerpt": "stderr excerpt",
    "agentDetail.stdoutExcerpt": "stdout excerpt",
    "agentDetail.failureDetails": "Failure details",
    "agentDetail.adapterResultJson": "adapter result JSON",
    "agentDetail.events": "Events",
    "agentDetail.backToRuns": "Back to runs",
    "agentDetail.clearSessions.confirm": "Clear session for {count} issue(s) touched by this run?",
    "agentDetail.clearSessions.clearing": "clearing session...",
    "agentDetail.clearSessions.clearForIssues": "clear session for these issues",
    "agentDetail.clearSessions.failed": "Failed to clear sessions",

    // Command palette
    "command.searchPlaceholder": "Search issues, agents, projects...",
    "command.actions": "Actions",
    "command.createIssue": "Create new issue",
    "command.createAgent": "Create new agent",
    
    // Onboarding
    "onboarding.nameCompany": "Name your company",
    "onboarding.createFirstAgent": "Create your first agent",
    "onboarding.manualDebug": "Manual debug",
    "onboarding.giveItSomething": "Give it something to do",
    "onboarding.readyToLaunch": "Ready to launch",
    "onboarding.stepOf": "Step {current} of {total}",
    "onboarding.nameCompany.help": "This is the organization your agents will work for.",
    "onboarding.company.placeholder": "Acme Corp",
    "onboarding.companyGoal.placeholder": "What is this company trying to achieve?",
    "onboarding.agent.placeholder": "CEO",
    "onboarding.claudeFailedApiKey": "Claude failed while",
    "onboarding.respondWithHello": "Respond with hello.",
    "onboarding.command.placeholder": "e.g. node, python",
    "onboarding.args.placeholder": "e.g. script.js, --flag",
    "onboarding.task.title.placeholder": "e.g. Research competitor pricing",
    "onboarding.task.desc.placeholder": "Add more detail about what the agent should do...",
    "onboarding.summary.company": "Company",
    "onboarding.summary.task": "Task",

    // Adapter config placeholders (Process)
    "process.args.placeholder": "e.g. script.js, --flag",

    // Projects workspaces (properties)
    "projects.workspaces": "Workspaces",
    "projects.workspaces.helpAria": "Workspaces help",
    "projects.workspaces.help": "Workspaces give your agents hints about where the work is",
    "projects.workspaces.none": "No workspace configured.",

    // Adapter config placeholders (OpenClaw Gateway)
    "openclaw.url.placeholder": "ws://127.0.0.1:18789",
    "openclaw.paperclipApiUrl.placeholder": "https://paperclip.example",
    "openclaw.session.fixed": "Fixed",
    "openclaw.session.issue": "Per issue",
    "openclaw.session.run": "Per run",
    "openclaw.sessionKey.placeholder": "paperclip",
    "openclaw.token.placeholder": "OpenClaw gateway token",
    "openclaw.role.placeholder": "operator",
    "openclaw.scopes.placeholder": "operator.admin",
    "openclaw.waitTimeout.placeholder": "120000",

    // Common UI
    "common.properties": "Properties",
    "common.showProperties": "Show properties",

    // Projects (New Project dialog)
    "projects.newProject": "New project",
    "projects.name.placeholder": "Project name",
    "projects.workspace.where": "Where will work be done on this project?",
    "projects.workspace.hint": "Add local folder and/or GitHub repo workspace hints.",
    "projects.workspace.local": "A local folder",
    "projects.workspace.local.hint": "Use a full path on this machine.",
    "projects.workspace.repo": "A github repo",
    "projects.workspace.repo.hint": "Paste a GitHub URL.",
    "projects.workspace.both": "Both",
    "projects.workspace.both.hint": "Configure local + repo hints.",
    "projects.workspace.local.fullPath": "Local folder (full path)",
    "projects.workspace.local.placeholder": "/absolute/path/to/workspace",
    "projects.workspace.repo.url": "GitHub repo URL",
    "projects.workspace.repo.url.placeholder": "https://github.com/org/repo",
    "projects.workspace.local.errorFullPath": "Local folder must be a full absolute path.",
    "projects.workspace.repo.errorUrl": "Repo workspace must use a valid GitHub repo URL.",
    "projects.workspace.clearLocalFromWorkspace": "Clear local folder from this workspace?",
    "projects.workspace.deleteLocalFolder": "Delete this workspace local folder?",
    "projects.workspace.clearRepoFromWorkspace": "Clear GitHub repo from this workspace?",
    "projects.workspace.deleteWorkspaceRepo": "Delete this workspace repo?",
    "projects.workspace.deleteLocal": "Delete local folder",
    "projects.workspace.deleteRepo": "Delete workspace repo",
    "projects.workspace.addLocal": "Add workspace local folder",
    "projects.workspace.addRepo": "Add workspace repo",
    "projects.workspace.error.save": "Failed to save workspace.",
    "projects.workspace.error.delete": "Failed to delete workspace.",
    "projects.workspace.error.update": "Failed to update workspace.",

    // Design guide
    "design.defaultSize": "Default size",
    "design.selectStatus": "Select status",
    "design.currentValue": "Current value",
    "design.bodySingleLine": "Body text (single-line)",
    "design.descriptionMultiline": "Description (multiline, auto-sizing)",
    "design.input.default": "Default input",
    "design.input.disabled": "Disabled input",
    "design.textarea.write": "Write something...",
    "design.filterByAgent": "Filter by agent name",
    "design.commandPlaceholder": "Type a command or search...",
    "design.enterName": "Enter a name",
    "design.describe": "Describe...",
    "design.leaveComment": "Leave a comment...",
    
    // Status labels
    "status.backlog": "Backlog",
    "status.todo": "Todo",
    "status.in_progress": "In Progress",
    "status.in_review": "In Review",
    "status.done": "Done",
    "status.blocked": "Blocked",
    "status.cancelled": "Cancelled",
    

    // Issue detail (more)
    "issueDetail.hideIssue": "Hide this Issue",
    "issueDetail.deleteAttachment": "Delete attachment",
    "agentDetail.runHeartbeat": "Run Heartbeat",

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
    "settings.invites.errorFailed": "Failed to create invite",
    "settings.danger.title": "Danger Zone",
    "settings.danger.archive.desc": "Archive this company to hide it from the sidebar. This persists in the database.",
    "settings.danger.archive.confirm": "Archive company \"{name}\"? It will be hidden from the sidebar.",
    "settings.danger.archive.archiving": "Archiving...",
    "settings.danger.archive.already": "Already archived",
    "settings.danger.archive.button": "Archive company",
    "settings.danger.archive.failed": "Failed to archive company",

    // Board claim (additional)
    "board.claimUnavailable.title": "Claim challenge unavailable",
    "board.claimUnavailable.desc": "Challenge is invalid or expired.",
    "board.claimUnavailable.short": "Claim challenge unavailable.",

    // Invite Landing
    "invite.invalidToken": "Invalid invite token.",
    "invite.loading": "Loading invite...",
    "invite.notAvailable.title": "Invite not available",
    "invite.notAvailable.desc": "This invite may be expired, revoked, or already used.",
    "invite.bootstrapComplete.title": "Bootstrap complete",
    "invite.bootstrapComplete.desc": "The first instance admin is now configured. You can continue to the board.",
    "invite.joinSubmitted.title": "Join request submitted",
    "invite.joinSubmitted.desc": "Your request is pending admin approval. You will not have access until approved.",
    "invite.joinSubmitted.claimSecret": "One-time claim secret (save now)",
    "invite.joinSubmitted.skillBootstrap": "Paperclip skill bootstrap",
    "invite.joinSubmitted.textInstructions": "Agent-readable onboarding text",
    "invite.joinSubmitted.diagnostics": "Connectivity diagnostics",
    "invite.bootstrapTitle": "Bootstrap your Paperclip instance",
    "invite.joinTitle": "Join this Paperclip company",
    "invite.expires": "Invite expires {time}.",
    "invite.joinAs": "Join as {type}",
    "invite.type.human": "human",
    "invite.type.agent": "agent",
    "invite.agentName": "Agent name",

    // Common misc
    "common.comingSoon": "Coming soon",

    // Board claim
    "board.invalidUrl": "Invalid board claim URL.",
    "board.loading": "Loading claim challenge...",
    "board.claimed.title": "Board ownership claimed",
    "board.claimed.desc": "This instance is now linked to your authenticated user.",
    "board.open": "Open board",
    "board.signInRequired": "Sign in required",
    "board.signInPrompt": "Sign in or create an account, then return to this page to claim Board ownership.",
    "board.claim.title": "Claim Board ownership",
    "board.claim.desc": "This will promote your user to instance admin and migrate company ownership access from local trusted mode.",
    "board.claim.claiming": "Claiming…",
    "board.claim.button": "Claim ownership",
    "board.claim.failed": "Failed to claim board ownership",

    // Invite landing
    "invite.adapterType": "Adapter type",
    "invite.capabilities": "Capabilities (optional)",
    "invite.signInFirst": "Sign in or create an account before submitting a human join request.",
    "invite.submitting": "Submitting…",
    "invite.acceptBootstrap": "Accept bootstrap invite",
    "invite.submitJoin": "Submit join request",
    "invite.openBoard": "Open board",
    "invite.error.acceptFailed": "Failed to accept invite",
    // AgentConfig
    "agentConfig.unsavedChanges": "Unsaved changes",
    "agentConfig.identity": "Identity",
    "agentConfig.title": "Title",
    "agentConfig.capabilities.placeholder": "Describe what this agent can do...",
    "agentConfig.adapter": "Adapter",
    "agentConfig.adapterType": "Adapter type",
    "agentConfig.testing": "Testing...",
    "agentConfig.testEnv": "Test environment",
    "agentConfig.cwd": "Working directory",
    "agentConfig.cwd.placeholder": "/path/to/project",
    "agentConfig.timeoutSec": "Timeout (sec)",
    "agentConfig.graceSec": "Interrupt grace period (sec)",
    "agentConfig.runPolicy.title": "Run Policy",
    "agentConfig.runPolicy.heartbeat": "Heartbeat on interval",
    "agentConfig.runPolicy.sec": "sec",
    "agentConfig.runPolicy.every": "Run heartbeat every",
    "agentConfig.runPolicy.advanced": "Advanced Run Policy",
    "agentConfig.runPolicy.wakeOnDemand": "Wake on demand",
    "agentConfig.runPolicy.cooldownSec": "Cooldown (sec)",
    "agentConfig.runPolicy.maxConcurrentRuns": "Max concurrent runs",
    "agentConfig.envTest.failed": "Environment test failed",
    "agentConfig.envTest.passed": "Passed",
    "agentConfig.envTest.warnings": "Warnings",
    "agentConfig.envTest.failedShort": "Failed",
    "agentConfig.envTest.hint": "Hint",
    "agentConfig.env.plain": "Plain",
    "agentConfig.env.secret": "Secret",
    "agentConfig.env.selectSecret": "Select secret...",
    "agentConfig.model.default": "Default",
    "agentConfig.model.selectRequired": "Select model (required)",
    "agentConfig.model.select": "Select model",
    "agentConfig.model.search": "Search models...",
    "agentConfig.model.none": "No models found.",
    "agentConfig.thinkingEffort": "Thinking effort",
    "agentConfig.thinkingEffort.auto": "Auto",
    "agentConfig.permsAndConfig": "Permissions & Configuration",
    "newAgent.error.noOpenCodeModels": "No OpenCode models discovered. Run `opencode models` and authenticate providers.",
    "newAgent.error.modelUnavailable": "Configured OpenCode model is unavailable: {id}",
    "newIssue.useProjectWorkspace": "Use project workspace",
    // Approval detail
    "approvalDetail.notFound": "Approval not found.",
    "approvalDetail.confirmed": "Approval confirmed",
    "approvalDetail.confirmed.desc": "Requesting agent was notified to review this approval and linked issues.",
    "approvalDetail.requestedBy": "Requested by",
    "approvalDetail.linkedIssues": "Linked Issues",
    "approvalDetail.deleteDisapprovedConfirm": "Delete this disapproved agent? This cannot be undone.",
    "approvalDetail.error.revisionFailed": "Revision request failed",
    "approvalDetail.error.resubmitFailed": "Resubmit failed",
    "approvalDetail.error.commentFailed": "Comment failed",
    "approvalDetail.error.deleteFailed": "Delete failed",
    "approvalDetail.decisionNote": "Decision note",
    // Project detail
    "projectDetail.status": "Status",
    "projectDetail.targetDate": "Target Date",
    "projectDetail.lead": "Lead",
    "projectDetail.goals": "Goals",
    "projectDetail.none": "None",
    "projectDetail.allGoalsLinked": "All goals linked.",
    "projectDetail.addGoal": "Goal",
    "projectDetail.removeGoal": "Remove goal {title}",
    "projectDetail.changeColor": "Change project color",
    // Agent config / common
    "common.save": "Save",
    "actions.createAgent": "Create agent",
    "actions.creating": "Creating…",
    

    // New agent
    "newAgent.title": "New Agent",
    "newAgent.subtitle": "Advanced agent configuration",
    "newAgent.name.placeholder": "Agent name",
    "newAgent.title.placeholder": "Title (e.g. VP of Engineering)",
    "newAgent.reportsTo": "Reports to",
    "newAgent.reportsToNone": "Reports to: N/A (CEO)",
    "newAgent.reportsToEllipsis": "Reports to...",
    "newAgent.thisWillBeCeo": "This will be the CEO",
    
    // Adapter labels
    "adapterLabel.claude_local": "Claude (local)",
    "adapterLabel.codex_local": "Codex (local)",
    "adapterLabel.opencode_local": "OpenCode (local)",
    "adapterLabel.openclaw_gateway": "OpenClaw Gateway",
    "adapterLabel.cursor": "Cursor (local)",
    "adapterLabel.process": "Process",
    "adapterLabel.http": "HTTP",
    "newAgent.error.createFailed": "Failed to create agent",
    "newAgent.error.modelRequired": "OpenCode requires an explicit model in provider/model format.",
    "newAgent.error.loadModelsFailed": "Failed to load OpenCode models.",
    "newAgent.error.modelsLoading": "OpenCode models are still loading. Please wait and try again.",
    // Onboarding cwd hint
    "onboarding.cwd.hint": "Create a new folder for agent memory and organization, then paste the absolute path here.",
    // Agent permissions
    "agentDetail.permissions.canCreateAgents": "Can create new agents",
    // Command palette
    "command.createProject": "Create new project",
    "command.pages": "Pages",

    // Issue properties
    "issueProperties.labels": "Labels",
    "issueProperties.project": "Project",
    "issueProperties.parent": "Parent",
    "issueProperties.depth": "Depth",
    "issueProperties.started": "Started",
    "issueProperties.completed": "Completed",
    "issueProperties.noLabels": "No labels",
    "issueProperties.searchLabels": "Search labels...",
    "issueProperties.newLabel": "New label",
    "issueProperties.creating": "Creating…",
    "issueProperties.createLabel": "Create label",
    "issueProperties.unassigned": "Unassigned",
    "issueProperties.noAssignee": "No assignee",
    "issueProperties.searchAssignees": "Search assignees...",
    "issueProperties.searchProjects": "Search projects...",
    "issueProperties.deleteLabel": "Delete {name}",
    "issueProperties.assignToSelf": "Assign to me",
    "issueProperties.assignToRequester": "Assign to requester",
    "issueProperties.assignTo": "Assign to {name}",

    
  },
  zh: {
    "common.loading": "加载中...",
    "layout.skip": "跳转到主要内容",
    "layout.documentation": "文档",
    "layout.switchToLight": "切换到亮色模式",
    "layout.switchToDark": "切换到暗色模式",
    "layout.switchLanguage": "切换语言",
    "layout.mobileNav": "移动导航",

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
    "sidebar.noCompanies": "暂无公司",
    "sidebar.manageCompanies": "管理公司",
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
    
    // Actions (common)
    "actions.createAgent": "创建智能体",
    "actions.creating": "正在创建…",

    // Auth
    "auth.signInTitle": "登录 Paperclip",
    "auth.createTitle": "创建你的 Paperclip 账户",
    "auth.createDesc": "为此实例创建账户。V1 不需要邮箱验证。",
    "auth.createAccount": "创建账户",
    "auth.switch.createOne": "去创建",
    "auth.switch.signIn": "去登录",
    "auth.field.name": "姓名",
    "auth.field.email": "邮箱",
    "auth.field.password": "密码",
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

    // Board claim (additional)
    "board.claimUnavailable.title": "领取挑战不可用",
    "board.claimUnavailable.desc": "挑战无效或已过期。",
    "board.claimUnavailable.short": "领取挑战不可用。",
    "board.invalidUrl": "无效的看板领取链接。",
    "board.loading": "正在加载领取挑战...",
    "board.claimed.title": "已领取看板所有权",
    "board.claimed.desc": "此实例已关联到你当前登录的用户。",
    "board.open": "打开看板",
    "board.signInRequired": "需要登录",
    "board.signInPrompt": "请先登录或创建账户，然后返回此页领取看板所有权。",
    "board.claim.title": "领取看板所有权",
    "board.claim.desc": "这将把你的用户提升为实例管理员，并将公司所有权从本地信任模式迁移过来。",
    "board.claim.claiming": "正在领取...",
    "board.claim.button": "领取所有权",
    "board.claim.failed": "领取看板所有权失败",
    // AgentConfig
    "agentConfig.unsavedChanges": "未保存的更改",
    "agentConfig.identity": "身份",
    "agentConfig.title": "头衔",
    "agentConfig.capabilities.placeholder": "描述该智能体能做什么...",
    "agentConfig.adapter": "适配器",
    "agentConfig.adapterType": "适配器类型",
    "agentConfig.testing": "正在测试...",
    "agentConfig.testEnv": "测试环境",
    "agentConfig.cwd": "工作目录",
    "agentConfig.cwd.placeholder": "/path/to/project",
    "agentConfig.timeoutSec": "超时（秒）",
    "agentConfig.graceSec": "中断宽限（秒）",
    "agentConfig.runPolicy.title": "运行策略",
    "agentConfig.runPolicy.heartbeat": "按间隔心跳",
    "agentConfig.runPolicy.sec": "秒",
    "agentConfig.runPolicy.every": "心跳间隔",
    "agentConfig.runPolicy.advanced": "高级运行策略",
    "agentConfig.runPolicy.wakeOnDemand": "按需唤醒",
    "agentConfig.runPolicy.cooldownSec": "冷却（秒）",
    "agentConfig.runPolicy.maxConcurrentRuns": "最大并发运行数",
    "agentConfig.envTest.failed": "环境测试失败",
    "agentConfig.envTest.passed": "通过",
    "agentConfig.envTest.warnings": "警告",
    "agentConfig.envTest.failedShort": "失败",
    "agentConfig.envTest.hint": "提示",
    "agentConfig.env.plain": "明文",
    "agentConfig.env.secret": "密钥",
    "agentConfig.env.selectSecret": "选择密钥...",
    "agentConfig.model.default": "默认",
    "agentConfig.model.selectRequired": "选择模型（必填）",
    "agentConfig.model.select": "选择模型",
    "agentConfig.model.search": "搜索模型...",
    "agentConfig.model.none": "未找到模型。",
    "agentConfig.thinkingEffort": "思考强度",
    "agentConfig.thinkingEffort.auto": "自动",
    "newAgent.error.noOpenCodeModels": "未发现 OpenCode 模型。请运行 `opencode models` 并完成供应商认证。",
    "newAgent.error.modelUnavailable": "配置的 OpenCode 模型不可用：{id}",

    // Approval detail
    "approvalDetail.notFound": "未找到审批。",
    "approvalDetail.confirmed": "审批已确认",
    "approvalDetail.confirmed.desc": "已通知请求方查看此审批及关联问题。",
    "approvalDetail.requestedBy": "请求方",
    "approvalDetail.linkedIssues": "关联问题",
    "approvalDetail.reviewLinkedIssues": "查看关联问题",
    "approvalDetail.reviewLinkedIssue": "查看关联问题",
    "approvalDetail.openHiredAgent": "打开已入职的智能体",
    "approvalDetail.back": "返回审批列表",
    "approvalDetail.deleteDisapprovedConfirm": "删除该被拒绝的智能体？该操作无法撤销。",
    "approvalDetail.error.revisionFailed": "请求复审失败",
    "approvalDetail.error.resubmitFailed": "重新提交失败",
    "approvalDetail.error.commentFailed": "评论失败",
    "approvalDetail.error.deleteFailed": "删除失败",

    // Project detail
    "projectDetail.status": "状态",
    "projectDetail.targetDate": "目标日期",
    "projectDetail.lead": "负责人",
    "projectDetail.goals": "目标",
    "projectDetail.none": "无",
    "projectDetail.allGoalsLinked": "全部目标已关联。",
    "projectDetail.addGoal": "目标",
    "projectDetail.removeGoal": "移除目标 {title}",
    "projectDetail.changeColor": "更改项目颜色",

    // Agent config / common
    "common.save": "保存",
    "common.saving": "正在保存...",

    // Path modal
    "pathModal.title": "如何获取完整路径",
    "pathModal.description.start": "请粘贴绝对路径（例如",
    "pathModal.description.end": "）到输入框。",
    "pathModal.platform.mac": "macOS",
    "pathModal.platform.windows": "Windows",
    "pathModal.platform.linux": "Linux",
    "pathModal.mac.step1": "打开 Finder 并进入目标文件夹。",
    "pathModal.mac.step2": "右键（或按住 Control 并点击）该文件夹。",
    "pathModal.mac.step3": "按住 Option（⌥）键，'复制' 变为 '复制为路径名'。",
    "pathModal.mac.step4": "点击 '复制为路径名'，然后粘贴到此处。",
    "pathModal.mac.tip": "也可以打开终端，输入 cd 后将文件夹拖入终端并回车，再输入 pwd 查看完整路径。",
    "pathModal.windows.step1": "打开文件资源管理器并进入目标文件夹。",
    "pathModal.windows.step2": "点击顶部地址栏，完整路径会显示。",
    "pathModal.windows.step3": "复制该路径并粘贴到此处。",
    "pathModal.windows.tip": "或者按住 Shift 并右键该文件夹，选择 '复制为路径'。",
    "pathModal.linux.step1": "打开终端并使用 cd 进入目录。",
    "pathModal.linux.step2": "运行 pwd 输出完整路径。",
    "pathModal.linux.step3": "复制输出并粘贴到此处。",
    "pathModal.linux.tip": "多数文件管理器中，按 Ctrl+L 可在地址栏显示完整路径。",
    "pathModal.choose": "选择",

    // Invite Landing
    "invite.invalidToken": "无效的邀请码。",
    "invite.loading": "正在加载邀请…",
    "settings.invites.errorFailed": "创建邀请失败",
    "invite.error.acceptFailed": "接受邀请失败",
    "invite.notAvailable.title": "邀请不可用",
    "invite.notAvailable.desc": "该邀请可能已过期、被撤销或已被使用。",
    "invite.bootstrapComplete.title": "引导完成",
    "invite.bootstrapComplete.desc": "已配置首位实例管理员。你可以继续进入看板。",
    "invite.joinSubmitted.title": "加入请求已提交",
    "invite.joinSubmitted.desc": "你的请求待管理员审批，通过前无法访问。",
    "invite.joinSubmitted.claimSecret": "一次性领取密钥（请立即保存）",
    "invite.joinSubmitted.skillBootstrap": "Paperclip 技能引导",
    "invite.joinSubmitted.textInstructions": "面向智能体的入职文本",
    "invite.joinSubmitted.diagnostics": "连接诊断",
    "invite.bootstrapTitle": "初始化你的 Paperclip 实例",
    "invite.joinTitle": "加入该 Paperclip 公司",
    "invite.expires": "邀请将于 {time} 过期。",
    "invite.joinAs": "以 {type} 加入",
    "invite.type.human": "人类",
    "invite.type.agent": "智能体",
    "invite.agentName": "智能体名称",

    // Common misc
    "common.comingSoon": "即将推出",
    "common.addDescriptionPlaceholder": "添加描述...",
    "common.before": "之前",
    "common.after": "之后",
    "common.id": "ID",
    "common.back": "返回",
    "common.close": "关闭",
    "common.created": "创建时间",
    "common.updated": "更新时间",
    "common.name": "名称",
    "common.copied": "已复制！",
    "actions.copy": "复制",
    "actions.show": "显示",
    "actions.hide": "隐藏",
    "actions.revoke": "撤销",
    "common.disabled": "已禁用",
    "common.for": "用于",
    "common.model": "模型",
    "common.in": "于",
    "common.role": "角色",
    "common.icon": "图标",
    "common.title": "标题",
    "common.none": "无",
    "common.scrollToBottom": "滚动到底部",
    "common.ok": "确定",
    "common.choose": "选择",

    // Breadcrumb
    "breadcrumb.label": "面包屑导航",
    "breadcrumb.more": "更多",

    // Path modal
    "pathModal.terminal.title": "终端方法（macOS/Linux）",

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
    "issues.searchPlaceholder": "搜索问题...",
    "issues.filterButton": "筛选",
    "issues.filtersButton.count": "筛选：{count}",
    "issues.view.list": "列表视图",
    "issues.view.board": "看板视图",
    "issues.labels": "标签",
    "issues.sort": "排序",
    "issues.group": "分组",
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
    "agents.searchPlaceholder": "搜索智能体...",
    
    // Comments common
    "comments.addPlaceholder": "写点什么...",
    "comments.post": "发表评论",
    "comments.posting": "正在发表…",
    "comments.none": "暂无评论或运行。",
    "comments.header": "评论与运行",
    
    // Comments utils
    "comments.copyAsMarkdown": "复制为 Markdown",
    "comments.attachImage": "附加图片",
    // Icons
    "icons.searchPlaceholder": "搜索图标...",
    "icons.noMatch": "没有匹配的图标",

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
    "runs.startedAt": "开始于 {time}",
    "runs.finishedAt": "完成于 {time}",

    // Org chart controls
    "org.zoomIn": "放大",
    "org.zoomOut": "缩小",
    "org.fitTitle": "适配屏幕",
    "org.fitLabel": "适配",

    // Goal detail
    "goals.noSubGoals": "暂无子目标。",
    "goals.noLinkedProjects": "暂无关联项目。",
    "goals.subGoals": "子目标",
    "goals.addSubGoal": "新增子目标",

    // Issue detail tabs & labels
    "issueDetail.tabs.comments": "评论",
    "issueDetail.tabs.subissues": "子问题",
    "issueDetail.tabs.activity": "活动",
    "issueDetail.costSummary": "成本汇总",
    "issueDetail.tokens.label": "Tokens {count}",
    "issueDetail.tokens.detail.withCache": "(入 {in}，出 {out}，缓存 {cached})",
    "issueDetail.tokens.detail.noCache": "(入 {in}，出 {out})",
    "issueDetail.linkedApprovals": "关联审批",

    // Identities
    "identity.system": "系统",
    "identity.board": "看板",
    "identity.me": "我",
    "identity.meBoard": "我（看板）",
    "identity.unknown": "未知",

    // Issue activity simple labels
    "issue.created": "创建了问题",
    "issue.updated": "更新了问题",
    "issue.checked_out": "签出了问题",
    "issue.released": "释放了问题",
    "issue.comment_added": "添加了评论",
    "issue.attachment_added": "添加了附件",
    "issue.attachment_removed": "移除了附件",
    "issue.deleted": "删除了问题",
    "agent.created": "创建了智能体",
    "agent.updated": "更新了智能体",
    "agent.paused": "暂停了智能体",
    "agent.resumed": "恢复了智能体",
    "agent.terminated": "终止了智能体",
    "heartbeat.invoked": "触发了心跳",
    "heartbeat.cancelled": "取消了心跳",
    "approval.created": "发起了审批请求",
    "approval.approved": "通过了审批",
    "approval.rejected": "拒绝了审批",

    // Issue activity composed messages
    "issueAction.status.fromTo": "将状态从 {from} 改为 {to}",
    "issueAction.status.to": "将状态改为 {to}",
    "issueAction.priority.fromTo": "将优先级从 {from} 改为 {to}",
    "issueAction.priority.to": "将优先级改为 {to}",
    "issueAction.assigned": "分配了该问题",
    "issueAction.unassigned": "取消了该问题的分配",
    "issueAction.titleUpdated": "更新了标题",
    "issueAction.descriptionUpdated": "更新了描述",

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
    "agentDetail.permissions": "权限",
    "agentDetail.invocation": "调用",
    "agentDetail.prompt": "提示",
    "agentDetail.context": "上下文",
    "agentDetail.environment": "环境",
    "agentDetail.apiKeys.namePlaceholder": "密钥名称（例如 production）",
    "agentDetail.noLogEvents": "暂无日志事件。",
    "agentDetail.noPersistedTranscript": "该运行没有持久化的对话记录。",
    "agentDetail.create": "创建",
    "agentDetail.apiKeys.createTitle": "创建 API Key",
    "agentDetail.apiKeys.none": "暂无有效的 API Key。",
    "agentDetail.restore": "回滚",
    "agentDetail.changed": "变更：",
    "agentDetail.noTrackedChanges": "无追踪到的变更",
    "agentDetail.apiKeys.header": "API Key",
    "agentDetail.config.title": "配置",
    "agentDetail.config.manage": "管理",
    "agentDetail.config.details": "智能体详情",
    "agentDetail.config.adapter": "适配器",
    "agentDetail.config.heartbeat": "心跳",
    "agentDetail.config.every": "每 {interval}",
    "agentDetail.config.notConfigured": "未配置",
    "agentDetail.config.lastHeartbeat": "上次心跳",
    "agentDetail.config.never": "从未",
    "agentDetail.config.reportsTo": "汇报对象",
    "agentDetail.config.nobodyTop": "无（顶级）",
    "agentDetail.config.directReports": "直系下属",
    "agentDetail.menu.configure": "配置智能体",
    "agentDetail.menu.copyId": "复制智能体 ID",
    "agentDetail.menu.resetSessions": "重置会话",
    "agentDetail.menu.terminate": "终止",
    "agentDetail.stderrExcerpt": "stderr 片段",
    "agentDetail.stdoutExcerpt": "stdout 片段",

    // Command palette
    "command.searchPlaceholder": "搜索问题、智能体、项目…",
    "command.actions": "操作",
    "command.createIssue": "新建问题",
    "command.createAgent": "新建智能体",

    // Onboarding
    "onboarding.nameCompany": "为公司命名",
    "onboarding.createFirstAgent": "创建你的第一个智能体",
    "onboarding.manualDebug": "手动调试",
    "onboarding.giveItSomething": "给它安排一项任务",
    "onboarding.readyToLaunch": "准备就绪",
    "onboarding.stepOf": "第 {current} 步 / 共 {total} 步",
    "onboarding.nameCompany.help": "这是你的智能体将为之工作的组织。",
    "onboarding.company.placeholder": "某某公司",
    "onboarding.companyGoal.placeholder": "这家公司想要达成什么目标？",
    "onboarding.agent.placeholder": "CEO",
    "onboarding.claudeFailedApiKey": "在设置了",
    "onboarding.respondWithHello": "回复 hello。",
    "onboarding.command.placeholder": "例如 node、python",
    "onboarding.args.placeholder": "例如 script.js、--flag",
    "onboarding.task.title.placeholder": "例如 调研竞争对手定价",
    "onboarding.task.desc.placeholder": "补充智能体应执行的详细说明...",
    "onboarding.summary.company": "公司",
    "onboarding.summary.task": "任务",
    
    // Adapter config placeholders (Process)
    "process.args.placeholder": "例如 script.js, --flag",

    

    // Adapter config placeholders (OpenClaw Gateway)
    "openclaw.url.placeholder": "ws://127.0.0.1:18789",
    "openclaw.paperclipApiUrl.placeholder": "https://paperclip.example",
    "openclaw.session.fixed": "固定",
    "openclaw.session.issue": "按问题",
    "openclaw.session.run": "按运行",
    "openclaw.sessionKey.placeholder": "paperclip",
    "openclaw.token.placeholder": "OpenClaw 网关令牌",
    "openclaw.role.placeholder": "operator",
    "openclaw.scopes.placeholder": "operator.admin",
    "openclaw.waitTimeout.placeholder": "120000",

    // Common UI
    "common.properties": "属性",
    "common.showProperties": "显示属性",

    // Projects (New Project dialog)
    "projects.newProject": "新建项目",
    "projects.name.placeholder": "项目名称",
    "projects.workspace.where": "此项目的工作在哪里进行？",
    "projects.workspace.hint": "可添加本地文件夹或 GitHub 仓库作为工作区提示。",
    "projects.workspace.local": "本地文件夹",
    "projects.workspace.local.hint": "在本机使用完整的绝对路径。",
    "projects.workspace.repo": "GitHub 仓库",
    "projects.workspace.repo.hint": "粘贴一个 GitHub URL。",
    "projects.workspace.both": "两者",
    "projects.workspace.both.hint": "同时配置本地与仓库提示。",
    "projects.workspace.local.fullPath": "本地文件夹（绝对路径）",
    
    // Goals
    "goals.none": "暂无目标。",
    
    // Invite
    "invite.installTo": "安装到 {path}",
    
    // Projects errors
    "projects.error.createFailed": "创建项目失败。",
    
    // Markdown
    "markdown.mermaidFailed": "渲染 Mermaid 图失败。",
    "markdown.mermaidUnable": "无法渲染 Mermaid 图：",
    "markdown.mermaidRendering": "正在渲染 Mermaid 图...",
    
    // Approval detail extras
    "approvalDetail.seeFullRequest": "查看完整请求",
    "approvalDetail.requestRevision": "请求复审",
    "approvalDetail.markResubmitted": "标记为已重新提交",
    "approvalDetail.linkedIssues.note": "在请求方跟进并关闭之前，关联问题会保持打开。",
    
    // Settings invite snippet
    "settings.invites.noCandidates.short": "-（尚无可用候选 URL）",
    "settings.invites.noCandidates.help": "当前没有候选 URL。请让用户在 Paperclip 中配置一个可达的主机名后重试。\n建议步骤：\n- 选择一个在运行环境中可解析到 Paperclip 主机的主机名\n- 运行：pnpm paperclipai allowed-hostname <host>\n- 重启 Paperclip\n- 验证：curl -fsS http://<host>:3100/api/health\n- 重新生成此邀请片段",
    "settings.invites.reachabilityNote": "若上述主机名均不可达，请让用户在 Paperclip 中添加可达的主机名，重启并重试。\n建议命令：\n- pnpm paperclipai allowed-hostname <host>\n然后验证：curl -fsS <base-url>/api/health",
    "projects.workspace.local.placeholder": "/absolute/path/to/workspace",
    "projects.workspace.repo.url": "GitHub 仓库 URL",
    "projects.workspace.repo.url.placeholder": "https://github.com/org/repo",
    "projects.workspace.local.errorFullPath": "本地文件夹必须是完整的绝对路径。",
    "projects.workspace.repo.errorUrl": "仓库工作区必须是有效的 GitHub 仓库 URL。",
    "projects.workspace.clearLocalFromWorkspace": "从此工作区清除本地文件夹？",
    "projects.workspace.deleteLocalFolder": "删除此工作区的本地文件夹？",
    "projects.workspace.clearRepoFromWorkspace": "从此工作区清除 GitHub 仓库？",
    "projects.workspace.deleteWorkspaceRepo": "删除此工作区的仓库？",
    "projects.workspace.deleteLocal": "删除本地文件夹",
    "projects.workspace.deleteRepo": "删除仓库工作区",
    "projects.workspace.addLocal": "添加本地工作区",
    "projects.workspace.addRepo": "添加仓库工作区",
    "projects.workspace.error.save": "保存工作区失败。",
    "projects.workspace.error.delete": "删除工作区失败。",
    "projects.workspace.error.update": "更新工作区失败。",

    // Design guide
    "design.defaultSize": "默认尺寸",
    "design.selectStatus": "选择状态",
    "design.currentValue": "当前值",
    
    "design.input.default": "默认输入",
    "design.input.disabled": "禁用输入",
    "design.textarea.write": "写点什么...",
    "design.filterByAgent": "按智能体名称筛选",
    "design.commandPlaceholder": "输入命令或搜索...",
    "design.enterName": "输入名称",
    "design.describe": "描述...",
    
    
    // Status labels
    "status.backlog": "待规划",
    "status.todo": "待办",
    "status.in_progress": "进行中",
    "status.in_review": "评审中",
    "status.done": "已完成",
    "status.blocked": "阻塞",
    "status.cancelled": "已取消",
    "design.bodySingleLine": "正文（单行）",
    "design.descriptionMultiline": "描述（多行，自适应）",

    // Issues filters
    "issues.filters": "筛选",
    "issues.status": "状态",
    "issues.priority": "优先级",
    "issues.assignee": "负责人",
    "issues.created": "创建时间",
    "issues.none": "暂无问题",
    
    
    // Issue detail (more)
    "issueDetail.hideIssue": "隐藏此问题",
    "issueDetail.deleteAttachment": "删除附件",
    "agentDetail.runHeartbeat": "触发心跳",

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

    // Adapter labels
    "adapterLabel.claude_local": "Claude（本地）",
    "adapterLabel.codex_local": "Codex（本地）",
    "adapterLabel.opencode_local": "OpenCode（本地）",
    "adapterLabel.openclaw_gateway": "OpenClaw 网关",
    "adapterLabel.cursor": "Cursor（本地）",
    "adapterLabel.process": "进程",
    "adapterLabel.http": "HTTP",

    // New agent
    "newAgent.title": "新建智能体",
    "newAgent.subtitle": "高级智能体配置",
    "newAgent.name.placeholder": "智能体名称",
    "newAgent.title.placeholder": "头衔（例如 技术副总裁）",
    "newAgent.reportsTo": "汇报对象",
    "newAgent.reportsToNone": "汇报对象：无（CEO）",
    "newAgent.reportsToEllipsis": "汇报对象...",
    "newAgent.thisWillBeCeo": "这将成为 CEO",
    "newAgent.noManager": "无上级",
    "newAgent.noModels": "暂无可用模型",
    "newAgent.error.createFailed": "创建智能体失败",
    "newAgent.error.modelRequired": "OpenCode 需要以 provider/model 格式显式选择模型。",
    "newAgent.error.loadModelsFailed": "加载 OpenCode 模型失败。",
    "newAgent.error.modelsLoading": "OpenCode 模型仍在加载，请稍后重试。",
    // Onboarding cwd hint
    "onboarding.cwd.hint": "建议为智能体创建单独的工作文件夹以保存记忆和保持组织有序，然后在此粘贴该文件夹的绝对路径。",
    // Agent permissions
    "agentDetail.permissions.canCreateAgents": "可创建新智能体",
    
    // Adapter config extras
    "agentConfig.promptTemplate.placeholder": "你是智能体 {{ agent.name }}，你的角色是 {{ agent.role }}...",
    "agentConfig.bootstrapPrompt.label": "引导提示（首次运行）",
    "agentConfig.bootstrapPrompt.placeholder": "首次运行时的可选初始化提示",
    "agentConfig.extraArgs.label": "额外参数（逗号分隔）",
    "agentConfig.extraArgs.placeholder": "例如 --verbose, --foo=bar",
    "agentConfig.envVars.label": "环境变量",
    "agentConfig.error.loadModelsFailed": "加载适配器模型失败。",
    "agentConfig.codex.minimalWarning": "启用搜索时，Codex 可能拒绝 minimal 思考模式。",
    // Command palette
    "command.createProject": "创建新项目",
    "command.pages": "页面",

    // Issue properties
    "issueProperties.labels": "标签",
    "issueProperties.project": "项目",
    "issueProperties.parent": "父问题",
    "issueProperties.depth": "深度",
    "issueProperties.started": "开始时间",
    "issueProperties.completed": "完成时间",
    "issueProperties.noLabels": "暂无标签",
    "issueProperties.searchLabels": "搜索标签...",
    "issueProperties.newLabel": "新建标签",
    "issueProperties.creating": "正在创建…",
    "issueProperties.createLabel": "创建标签",
    "issueProperties.unassigned": "未指派",
    "issueProperties.noAssignee": "暂无负责人",
    "issueProperties.searchAssignees": "搜索负责人...",
    "issueProperties.searchProjects": "搜索项目...",
    "issueProperties.deleteLabel": "删除 {name}",
    "issueProperties.assignToSelf": "指派给我",
    "issueProperties.assignToRequester": "指派给请求人",
    "issueProperties.assignTo": "指派给 {name}",

    // Projects workspaces (properties)
    "projects.workspaces": "工作区",
    "projects.workspaces.helpAria": "工作区帮助",
    "projects.workspaces.help": "工作区为智能体提供工作位置的提示",
    "projects.workspaces.none": "尚未配置工作区。",
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
