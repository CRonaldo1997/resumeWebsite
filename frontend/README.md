# 蒋栋个人简历网站 (Jiang Dong's Professional Resume)

这是一个基于 Next.js 构建的高端个人简历网站，集成了 AI 数字分身（Chatbot）功能，旨在展示蒋栋在 AI 技术（NLP/CV）与金融科技领域的深厚背景。

## ✨ 特性

- **高端视觉设计**：采用现代 UI/UX 设计语言，支持响应式布局与深色模式（Dark Mode）。
- **AI 数字分身**：集成基于大语言模型（LLM）的智能聊天机器人，能够以第一人称代入蒋栋的身份回答简历相关问题。
- **中英双语支持**：完整的一键切换中英文内容。
- **性能优化**：
  - 采用流式响应（Streaming）提升 AI 对话体验。
  - 智能上下文压缩，减少 Token 消耗。
  - 简历内容内存缓存，优化磁盘 I/O。
- **SEO 友好**：针对搜索引擎进行了深度优化，包含完整的 Meta 标签与 OpenGraph 支持。

## 🛠️ 技术栈

- **框架**: [Next.js](https://nextjs.org/) (App Router)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **字体**: [Geist](https://vercel.com/font)
- **AI 模型**: 通义千问 (Qwen) via ModelScope API
- **语言**: TypeScript

## 🚀 快速开始

1. **安装依赖**:
   ```bash
   cd frontend
   npm install
   ```

2. **配置环境变量**:
   创建 `.env.local` 并填入您的 API 密钥：
   ```bash
   MODEL_SCOPE_API_KEY=your_actual_api_key
   ```

3. **运行开发服务器**:
   ```bash
   npm run dev
   ```

## 🌐 部署 (Vercel)

1. 将代码推送到 GitHub 仓库。
2. 在 [Vercel](https://vercel.com/new) 中导入该项目。
3. 在 Vercel 项目设置中添加环境变量 `MODEL_SCOPE_API_KEY`。
4. 点击部署即可。

---

© 2026 蒋栋. 保留所有权利。
