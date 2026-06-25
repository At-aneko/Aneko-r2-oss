# Aneko - r2 oss

基于 Cloudflare Workers 的轻量级 R2 对象存储文件管理界面。

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS
- **后端**：Cloudflare Workers
- **存储**：Cloudflare R2
- **验证**：Cloudflare Turnstile

## 项目结构

```
├── frontend/          # React 前端源码
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── store/         # Zustand 状态管理
│   │   ├── utils/         # 工具函数和 API 封装
│   │   └── types/         # TypeScript 类型定义
│   └── public/            # 静态资源
└── worker/            # Cloudflare Worker 后端
    └── src/
        ├── index.ts       # 入口 + 路由
        └── services/      # R2 操作 + Turnstile 验证
```

## 部署（Cloudflare 面板）

### 1. 构建前端

```bash
cd frontend
npm install
npm run build
```

### 2. 创建 Worker

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → 创建
2. 选择 "创建 Worker"
3. 将 `worker/src/index.ts` 和 `worker/src/services/` 下的代码粘贴到在线编辑器
4. 点击 "部署"

### 3. 绑定 R2 存储桶

进入 Worker 设置 → R2 存储桶绑定：
- 变量名：`R2_BUCKET`
- 选择你的 R2 存储桶

### 4. 设置密钥

进入 Worker 设置 → Variables → 添加：
- `ACCESS_CODE`（加密）→ 你的管理员访问码
- `TURNSTILE_SECRET_KEY`（加密）→ 你的 Turnstile 密钥

### 5. 上传前端静态资源

1. 进入 Worker 设置 → 静态资源
2. 上传 `frontend/dist/` 目录下的所有文件
3. 重新部署

### 6. 配置前端

部署前修改 `frontend/src/hooks/useTurnstile.ts` 中的 `TURNSTILE_SITE_KEY` 为你的 Turnstile 站点密钥，然后重新构建前端。