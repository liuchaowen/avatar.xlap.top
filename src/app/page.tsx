'use client';

import { useState, useRef, useCallback } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 从背景图中裁剪头像
  // 头像位置：截取图A右下角，中心位置是(946px, 990px)，大小是180px*180px
  const cropAvatar = useCallback((imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 设置canvas为头像大小
      const avatarSize = 180;
      canvas.width = avatarSize;
      canvas.height = avatarSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 计算裁剪区域
      // 中心位置 (946, 990)，大小 180x180
      // 左上角 = 中心 - 一半大小
      const centerX = 946;
      const centerY = 990;
      const cropX = centerX - avatarSize / 2; // 856
      const cropY = centerY - avatarSize / 2; // 900

      // 绘制裁剪区域到canvas
      ctx.drawImage(
        img,
        cropX,        // 源图x起点
        cropY,        // 源图y起点
        avatarSize,   // 源图宽度
        avatarSize,   // 源图高度
        0,            // 目标x
        0,            // 目标y
        avatarSize,   // 目标宽度
        avatarSize    // 目标高度
      );

      // 转换为图片URL
      const avatarUrl = canvas.toDataURL('image/png');
      setAvatarImage(avatarUrl);
    };
    img.src = imageUrl;
  }, []);

  // 生成图片
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入创意描述');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBackgroundImage(null);
    setAvatarImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      // 设置背景图
      setBackgroundImage(data.imageUrl);

      // 裁剪头像
      cropAvatar(data.imageUrl);

    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 下载图片
  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-canvas">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white border-b border-hairline-gray">
        <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-rausch font-bold text-xl">AI</span>
            <span className="text-ink font-semibold text-xl">微信头像</span>
          </div>
        </div>
      </header>

      <div className="page-container">
        {/* Hero 区域 */}
        <section className="text-center mb-12 pt-8">
          <p className="text-lg text-ash-gray max-w-2xl mx-auto mb-6">
            输入一句话创意，自动生成微信朋友圈背景图与联动头像
          </p>
          <div className="flex justify-center gap-3">
            <span className="tag">1:1 比例</span>
            <span className="tag">1080×1080px</span>
            <span className="tag">联动头像</span>
          </div>
        </section>

        {/* 输入区域 */}
        <section className="card-elevated mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            <textarea
              id="prompt"
              className="input-field min-h-[120px]"
              placeholder="例如：一只可爱的橘猫在樱花树下打盹，梦幻风格..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleGenerate();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-caption-medium text-ash-gray">
                按 Ctrl + Enter 快速生成
              </span>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    生成中...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    生成联动图
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 错误提示 */}
        {error && (
          <div className="card border-error mb-8 max-w-2xl mx-auto">
            <p className="text-error text-center text-body-medium">{error}</p>
          </div>
        )}

        {/* 生成结果 */}
        {(backgroundImage || isLoading) && (
          <section className="mb-8">
            <h2 className="text-subsection-heading text-ink mb-8 text-center">
              生成结果
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 背景图 */}
              <div className="card">
                <h3 className="text-subtitle-bold text-ink mb-4 flex items-center gap-3">
                  朋友圈背景图
                </h3>
                <div className="image-container aspect-square relative">
                  {isLoading && !backgroundImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-soft-cloud">
                      <div className="text-center">
                        <div className="animate-pulse">
                          <svg className="h-16 w-16 mx-auto text-ash-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="mt-4 text-caption-medium text-ash-gray">AI 正在创作中...</p>
                      </div>
                    </div>
                  )}
                  {backgroundImage && (
                    <>
                      <img
                        src={backgroundImage}
                        alt="朋友圈背景图"
                        className="w-full h-full object-cover"
                      />
                      {/* 头像位置指示器 */}
                      <div
                        className="absolute border-2 border-canvas border-dashed pointer-events-none"
                        style={{
                          width: '80px',
                          height: '80px',
                          right: '0',
                          bottom: '0',
                          transform: 'translate(0, 0)',
                        }}
                        title="头像截取区域"
                      />
                    </>
                  )}
                </div>
                {backgroundImage && (
                  <p className="text-caption-medium text-ash-gray mt-3 text-center">
                    尺寸：1080 × 1080 px
                  </p>
                )}
                {backgroundImage && (
                  <button
                    onClick={() => downloadImage(backgroundImage, 'background.png')}
                    className="btn-secondary w-full mt-4"
                  >
                    下载背景图
                  </button>
                )}
              </div>

              {/* 头像 */}
              <div className="card">
                <h3 className="text-subtitle-bold text-ink mb-4 flex items-center gap-3">
                  微信头像
                </h3>
                <div className="image-container aspect-square relative flex items-center justify-center bg-soft-cloud">
                  {isLoading && !avatarImage && (
                    <div className="text-center">
                      <div className="animate-pulse">
                        <svg className="h-16 w-16 mx-auto text-ash-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="mt-4 text-caption-medium text-ash-gray">等待裁剪...</p>
                    </div>
                  )}
                  {avatarImage && (
                    <img
                      src={avatarImage}
                      alt="微信头像"
                      className="w-[180px] h-[180px] object-cover rounded-2xl border-4 border-canvas shadow-elevation-1"
                    />
                  )}
                </div>
                {avatarImage && (
                  <p className="text-caption-medium text-ash-gray mt-3 text-center">
                    尺寸：180 × 180 px（从背景图右下角截取）
                  </p>
                )}
                {avatarImage && (
                  <button
                    onClick={() => downloadImage(avatarImage, 'avatar.png')}
                    className="btn-secondary w-full mt-4"
                  >
                    下载头像
                  </button>
                )}
              </div>
            </div>

            {/* 说明 */}
            {backgroundImage && avatarImage && (
              <div className="card mt-6 max-w-4xl mx-auto bg-soft-cloud border-hairline-gray">
                <h4 className="text-subtitle-bold text-ink mb-3">使用说明</h4>
                <ul className="text-caption-medium text-ash-gray space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-ink">•</span>
                    图A为朋友圈背景图，尺寸为 1080×1080 像素
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink">•</span>
                    图B为微信头像，从背景图右下角截取（中心点 946×990）,尺寸为 180×180 像素
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink">•</span>
                    两张图联动使用，头像单独使用也有完整主体
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-ink">•</span>
                    点击按钮可分别下载两张图片
                  </li>
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 隐藏的canvas用于裁剪 */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* 页脚 */}
      <footer className="bg-soft-cloud border-t border-hairline-gray mt-12">
        <div className="max-w-content mx-auto px-6 py-8 text-center">
          <p className="text-caption-medium text-ash-gray">
            Powered by 百炼 AI · avatar.xlap.top
          </p>
        </div>
      </footer>
    </main>
  );
}