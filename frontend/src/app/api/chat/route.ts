import { NextRequest } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// 适配 Vercel 生产环境的长耗时设置 (Hobby 版上限 10s, Pro 版支持 300s)
export const maxDuration = 60;

// 内存缓存简历内容，避免每轮对话都进行磁盘 IO
let cachedResume: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.MODEL_SCOPE_API_KEY;
    if (!apiKey) {
      console.error("Missing MODEL_SCOPE_API_KEY in environment variables.");
      return new Response(
        JSON.stringify({ error: "API key not configured. Please check your .env.local file." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api-inference.modelscope.cn/v1",
      timeout: 60000,
    });

    // 读取简历内容（优先从缓存读取）
    if (!cachedResume) {
      const resumePath = path.join(process.cwd(), "src", "data", "resume.md");
      try {
        cachedResume = fs.readFileSync(resumePath, "utf8");
      } catch (e) {
        console.warn("Could not read resume from src/data/resume.md");
        cachedResume = "简历内容暂时无法读取。";
      }
    }

    // 性能优化逻辑：仅在第一轮对话（messages 长度 <= 2）时注入完整简历。
    // 后续对话通过已有的对话历史 (history) 来保持上下文参考，减少每轮发送的 token 数量，提升响应速度。
    const isFirstTurn = !messages || messages.length <= 2;
    
    const systemPrompt = `你现在是蒋栋的"数字分身"（Digital Twin）。你的任务是直接以蒋栋本人的身份（第一人称"我"）回答用户关于简历、职业背景、技术积累和核心能力的问题。

${isFirstTurn ? `以下是我的（蒋栋）详细简历内容（Markdown格式）：\n\n${cachedResume}` : "（简历详细信息已在对话初期提供，请根据之前的对话记录进行后续回答）"}

请遵循以下交互准则：
1. **第一人称回答**：始终使用"我"来指代自己（例如："我在中再寿险负责..."，"我的核心能力包括..."）。
2. **身份锁定**：如果用户问及简历中没有的内容或私人问题，请礼貌地回复："抱歉，关于这一点我目前没有在简历中公开展示，您可以直接通过页面上的联系方式与我本人沟通。"
3. **语气自然**：保持专业、亲切且具有科技感的语气。避免在每一轮对话开头都重复"你好，我是蒋栋"或类似的自我介绍，除非是用户明确询问身份或对话刚开始。直接针对问题核心进行回答，提高沟通效率。
4. **引用成就**：在回答时，适当引用我获得的专利、奖项或主导过的具体项目。
5. **简洁有力**：回答要重点突出，避免冗长，尽量保持自然的对话感。不要表现得像个机器人。`;

    const response: any = await client.chat.completions.create({
      model: "Qwen/Qwen3.5-122B-A10B",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 32768,
      temperature: 0.7,
      top_p: 0.8,
      presence_penalty: 1.5,
      extra_body: {
        "top_k": 20,
        "chat_template_kwargs": { "enable_thinking": false },
      },
    } as any);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
