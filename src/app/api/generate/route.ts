import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
  prompt: string;
}

interface DashScopeResponse {
  output?: {
    results?: Array<{
      url?: string;
      b64_image?: string;
    }>;
    choices?: Array<{
      message: {
        content: Array<{
          image?: string;
        }>;
      };
    }>;
  };
  code?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: '请输入创意描述' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.DASHSCOPE_BASE_URL;
    const apiKey = process.env.DASHSCOPE_API_KEY;
    const model = process.env.DASHSCOPE_MODEL || 'qwen-image-2.0-pro';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API配置缺失，请检查环境变量 DASHSCOPE_API_KEY' },
        { status: 500 }
      );
    }

    // 使用 DashScope API 端点
    const apiUrl = `${baseUrl}/services/aigc/multimodal-generation/generation`;
    
    console.log('Calling API:', apiUrl);
    console.log('Model:', model);
    console.log('Prompt:', prompt);

    // 调用阿里云 DashScope API 生成图片
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        input: {
          messages: [
            {
              role: 'user',
              content: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        parameters: {
          negative_prompt: '低分辨率，低画质，肢体畸形，手指畸形，画面过饱和，蜡像感，人脸无细节，过度光滑，画面具有AI感。构图混乱。文字模糊，扭曲。',
          prompt_extend: true,
          watermark: false,
          size: '1080*1080'
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json(
        { error: `图片生成失败: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: DashScopeResponse = await response.json();
    
    // 打印完整响应用于调试
    console.log('API Response:', JSON.stringify(data, null, 2));

    // 检查是否有错误
    if (data.code || data.message) {
      console.error('API returned error:', data);
      return NextResponse.json(
        { error: `图片生成失败: ${data.message || '未知错误'}` },
        { status: 500 }
      );
    }
    console.log(data)
    
    // 支持两种响应格式：
    // 1. output.results[0].url (旧格式)
    // 2. output.choices[0].message.content[0].image (新格式)
    let imageUrl: string | null = null;
    
    // 尝试新格式 (choices)
    if (data.output?.choices && data.output.choices.length > 0) {
      const content = data.output.choices[0].message?.content;
      if (content && content.length > 0 && content[0].image) {
        imageUrl = content[0].image;
        console.log('Using new format (choices):', imageUrl);
      }
    }
    // 尝试旧格式 (results)
    else if (data.output?.results && data.output.results.length > 0) {
      const result = data.output.results[0];
      imageUrl = result.url || (result.b64_image ? `data:image/png;base64,${result.b64_image}` : null);
      console.log('Using old format (results):', imageUrl);
    }

    if (!imageUrl) {
      console.error('No image URL found in output:', data);
      return NextResponse.json(
        { error: '未能生成图片，请重试', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: '服务器内部错误，请稍后重试' },
      { status: 500 }
    );
  }
}
