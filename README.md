# 蒋栋 (Jiang Dong) - AI技术专家个人分身网站

这是一个基于 **Next.js 16**、**Tailwind CSS** 和 **Framer Motion** 构建的高端个人简历门户。网站集成了由 **Qwen 27B** 大模型驱动的“数字分身”聊天助手，能够以第一人称回答关于博主职业生涯的任何问题。

## ✨ 核心特性

- 🤖 **数字分身 (AI Avatar)**：集成 ModelScope 推理引擎，实现高效的大模型交互。
- 🎭 **精美动效**：基于 Framer Motion 实现的粒子背景、平滑入场动画及交互式悬浮效果。
- 🌓 **双色主题**：支持深色/浅色模式切换，适配不同阅读习惯。
- 🌍 **中英双语**：全站内容支持一键语言切换。
- 📱 **响应式设计**：完美适配手机、平板及桌面端显示。
- 📊 **SEO 优化**：预置完整的元数据、Robots.txt 和动态站点地图。

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS + OKLCH 颜色系统
- **动画**: Framer Motion
- **图标**: Lucide React
- **大模型**: ModelScope (Qwen/Qwen3.5-27B)

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd resume-system/frontend
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
在 `frontend` 目录下创建 `.env.local` 文件并填入 API Key：
```env
MODEL_SCOPE_API_KEY=your_modelscope_key
```

### 4. 启动开发服务器
```bash
npm run dev
```

## 📦 部署 (Vercel)

1. 将项目推送到 GitHub。
2. 在 Vercel 中导入项目。
3. 在 Vercel 的 `Environment Variables` 中设置 `MODEL_SCOPE_API_KEY`。
4. 部署成功！

---
