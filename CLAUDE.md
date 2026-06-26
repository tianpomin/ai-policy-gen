@AGENTS.md

## 部署经验（Cloudflare Pages）

### 正确部署命令
```bash
cd /d/project/partwork/ai-policy-gen
NODE_TLS_REJECT_UNAUTHORIZED=0 \
HTTPS_PROXY=http://127.0.0.1:7890 \
HTTP_PROXY=http://127.0.0.1:7890 \
CLOUDFLARE_API_TOKEN=<token> \
npx wrangler pages deploy out --project-name ai-policy-gen --branch main
```

### 踩坑记录

1. **wrangler login 后台跑会超时**：OAuth 回调需要浏览器交互，后台进程拿不到授权码。改用 `CLOUDFLARE_API_TOKEN` 环境变量跳过登录。

2. **wrangler 的 undici fetch 不走系统代理**：设 `HTTPS_PROXY`/`HTTP_PROXY` 虽然被检测到，但 undici 的 SSL 握手仍然失败（Clash 做了 TLS 检查）。需要同时加 `NODE_TLS_REJECT_UNAUTHORIZED=0` 才通。

3. **Cloudflare 控制台"Connect to Git"建的是 Workers 项目**：新版 Cloudflare 把 Pages 和 Workers 合并了，在 Workers & Pages 里用 Git 连接会生成带 `npx wrangler deploy` 的 deploy command，与 `output: 'export'` 不兼容（后者输出 `out/`，不生成 `.next/standalone/`）。解决方案：用 API 单独建 Pages 项目（`POST /pages/projects`），再用 `wrangler pages deploy out` 直接上传静态文件。

4. **`--branch main` 必须指定**：不加的话 wrangler 默认推到 `master` 分支，生产域名（绑定 `main`）不更新，显示 "Nothing is here yet"。

### 建 Pages 项目（首次）
```bash
curl -s -k --proxy http://127.0.0.1:7890 \
  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/pages/projects" \
  -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{"name":"ai-policy-gen","production_branch":"main"}'
```
Account ID: `e966d2734c051cbe92b4d0aeba3b4695`
