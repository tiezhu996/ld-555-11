# GGArena 电竞与游戏社区平台

GGArena 是一个纯前端 React + TypeScript 电竞社区平台，支持战队管理、赛事组织、玩家资料、排行榜、主题切换和本地实时消息模拟。所有业务数据通过 IndexedDB 持久化，主题偏好通过 localStorage 保存，实时通信由本地 mock WebSocket 模拟。

## 快速启动

```bash
npm install
npm run dev
```

访问地址：http://localhost:38405

## 技术栈

| 技术 | 用途 |
|---|---|
| React + TypeScript | 页面与类型安全 |
| Vite | 开发服务与构建 |
| React Router | 路由管理 |
| Zustand | 实体状态管理 |
| IndexedDB | 本地数据持久化 |
| Framer Motion | 页面与列表动画 |
| SCSS + CSS 变量 | 明暗主题与电竞视觉 |
| Playwright | 无头浏览器验证 |

## 功能介绍

- 首页：热门赛事轮播、推荐战队、在线玩家数、快速入口和游戏分类。
- 赛事：列表筛选、详情赛程图、参赛队伍、对局结果、创建赛事。
- 战队：战队广场、游戏/段位/搜索筛选、成员列表、赛事历史、加入操作。
- 个人中心：玩家徽章、我的战队、参赛记录缩略赛程图、段位进度、编辑资料。
- 排行榜：战队排名、个人段位排行、赛事积分榜标签页切换。

## 文件结构清单

```text
src/
├── stores/        # teamStore.ts, tournamentStore.ts, playerStore.ts, matchStore.ts, chatStore.ts
├── types/         # team.d.ts, tournament.d.ts, player.d.ts, match.d.ts
├── constants/     # enums.ts, game-configs.ts, rank-configs.ts
├── components/common/  # TeamCard, BracketChart, PlayerBadge, GameTag, EmptyState, ThemeToggle
├── hooks/         # useTeam(), useTournament(), usePlayer(), useWebSocket(), useTheme()
├── pages/         # Home, Tournaments, TournamentDetail, Teams, TeamDetail, Profile, Leaderboard, CreateTournament
├── router/        # index.ts, routes.ts
├── db/            # IndexedDB 封装（team-db.ts, tournament-db.ts, player-db.ts, match-db.ts, index.ts）
├── mock/          # mock-data.ts, websocket.ts, seed.ts
├── styles/        # global.scss, variables.scss, themes/
└── utils/         # format.ts, validation.ts, storage.ts
```

## 枚举使用位置清单

所有枚举唯一来源为 `src/constants/enums.ts`。

| 枚举 | 使用文件位置 |
|---|---|
| GameTitle | `src/types/team.d.ts`, `src/types/tournament.d.ts`, `src/types/player.d.ts`, `src/constants/game-configs.ts`, `src/mock/mock-data.ts`, `src/pages/Home.tsx`, `src/pages/Tournaments.tsx`, `src/pages/CreateTournament.tsx`, `src/pages/Teams.tsx`, `src/pages/Leaderboard.tsx`, `src/components/common/GameTag.tsx` |
| TournamentFormat | `src/types/tournament.d.ts`, `src/mock/mock-data.ts`, `src/pages/CreateTournament.tsx`, `src/components/common/BracketChart.tsx`, `src/utils/format.ts` |
| TournamentStatus | `src/types/tournament.d.ts`, `src/mock/mock-data.ts`, `src/pages/Home.tsx`, `src/pages/Tournaments.tsx`, `src/pages/TournamentDetail.tsx`, `src/pages/CreateTournament.tsx`, `src/utils/format.ts` |
| PlayerRank | `src/types/player.d.ts`, `src/constants/rank-configs.ts`, `src/mock/mock-data.ts`, `src/pages/Teams.tsx`, `src/pages/Leaderboard.tsx`, `src/components/common/PlayerBadge.tsx`, `src/pages/Profile.tsx` |

## 主题说明

主题变量定义在 `src/styles/variables.scss`，`src/styles/themes/dark.scss` 和 `src/styles/themes/light.scss` 声明 color-scheme。`ThemeToggle` 放在全局 Header 中，`useTheme()` 负责读写 `ggarena-theme` localStorage 键并同步 `document.documentElement.dataset.theme`。

## Mock 数据说明

`src/mock/mock-data.ts` 内置至少 10 条玩家、10 条战队、10 条赛事、10 条对局记录。首次进入应用时，`src/mock/seed.ts` 会写入 IndexedDB，之后保留用户在本地的变更。

## WebSocket Mock 说明

`src/mock/websocket.ts` 模拟以下实时场景：

- 玩家在线状态随机切换。
- 进行中赛事比分更新。
- 新赛事创建通知。
- 战队邀请推送。

`useWebSocket()` 将 mock 事件写入 `chatStore.ts`、`playerStore.ts`，全局 Toast 会展示最新通知或友好错误。

## 全局异常处理说明

IndexedDB 与 localStorage 操作统一走 `src/utils/storage.ts`。异步数据操作使用 `withFriendlyError()` 包裹，失败时派发 `ggarena:error` 事件并由 `ToastHost` 展示中文友好提示，页面不暴露底层异常栈。

## License

MIT
