Personal Portfolio Spec: The "Elite AI Architect" Edition
1. 部署与技术架构方案 (Technical Architecture)

    前端 (Frontend) - Vercel:
        框架： Next.js 14+ (App Router)，确保极致的访问速度和 SEO 优化。
        自动化： 利用 Vercel 的 Git 集成实现持续集成/部署（CI/CD），每次提交代码自动构建预览环境。
    后端 (Backend) - Render:
        框架： Python (FastAPI)
        部署： 在 Render 上部署为 Web Service。
        跨域处理： 前端通过环境变量配置后端 API 地址，并开启 CORS。


2. 网页设计规范 (Design Aesthetics: High-End & Tech)
为了体现“高端人才风”与“审美高级感”，设计将遵循高端人才简历展示网页的设计原则。

    视觉基调 (The Vibe):
        配色方案： 浅色中性色。
        质感材质： 大量运用 Glassmorphism (玻璃拟态)。卡片背景带有些许透明度和高斯模糊，边界呈现极细的半透明白色描边。
        字体排版： 标题使用具备科技感的字体，通过字间距加宽提升呼吸感。
    核心视觉组件：
        Hero Section (首屏)： 采用动态粒子背景（象征神经网络）。中心文案突出人物特点，参考简历中的个人综述 (Profile)和核心能力部分
   

3. 细化功能模块与内容映射

    职业经历： 展示各公司经历及其主要项目。鼠标悬停时，节点会像神经元一样亮起。
    教育背景展示：教育背景采用极简图标（圣地亚哥州立大学 与 西安电子科技大学），体现国际化视野与扎实的学术底蕴。
    专利展示：展示简历中5项国家发明专利。
    
4. 面向 Vibe Coding 工具的实现 Prompt
您可以直接将这段指令输入到 AI 工具（如 Cursor 或 Lovable）中：
"Build a Next.js 14 personal website for a Senior AI Expert.

    Frontend: Next.js with Tailwind CSS, Framer Motion, and Shadcn UI.
    Backend: Plan for a Render-hosted API.
    Vibe: 'Elite High-Tech'. Use a dark mode palette (#0A0A0A). Implement a Bento Grid layout for core competencies like 'LLM/RAG', 'Agent Workflow', and 'CV/OCR'.
    Visuals: Add a subtle Framer Motion parallax effect on scrolling. Use glassmorphism cards with fine borders.
    Hero: Centered text 'Jiang Dong | Senior AI Technical Expert & FinTech Leader' with a glowing particle background.
    Experience: Vertical timeline featuring 'China Re (AI Expert)', 'CMG FinTech (Head of Algorithms)', and 'Ping An (Algorithm Engineer)'.
    Specific Data: Highlight '15 years of experience', '5 Patents', and project results like 'Claim efficiency +50%' and 'RAG accuracy 73% -> 91%'.
    Responsiveness: Fully optimized for mobile and desktop."

5. 针对高端职位的“加分项”设计

    AI-Powered Chatbot: 在页面底部集成一个模拟对话框。作为 AI 专家，您可以写一段 Prompt 让 AI 扮演您的“职业数字助手”，基于简历中的事实（如“从 0 到 1 组建 10 人团队”）回答猎头的提问。
    PDF 一键生成： 点击“下载简历”时，不仅提供文档，还可以触发一个精美的全屏打印预览样式，确保高端质感。