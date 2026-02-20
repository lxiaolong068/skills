# 配图生成提示词模板

## 通用配色方案
- 主色调：深蓝色 (#0066CC) - 科技感、专业性
- 辅助色：紫色系 - AI、创新、未来
- 强调色：红色 (#FF6B6B) - 警示、重要信息
- 温暖色：橙色、金色 - 希望、成长、人性

## 封面图模板

### 人机协作主题
```
A modern, professional illustration showing AI and human collaboration in [specific context]. In the center, a glowing AI hologram (represented by a brain with circuit patterns in blue and purple) is working alongside a professional [role] at a desk with laptop, charts, and [relevant materials]. The background shows floating digital elements like graphs, [specific icons], and data visualizations. The style is clean, corporate, and optimistic with a color palette of deep blue (#0066CC), purple, and white. The composition conveys partnership and innovation, not replacement. Photorealistic digital art style with soft lighting.
```

### 科技概念主题
```
A futuristic, high-tech illustration representing [concept]. Show [main visual element] in the center with [surrounding elements]. Use glowing neon effects in blue and purple. Include visual metaphors like [specific metaphors]. The style is modern, sleek, and tech-forward with a dark background and bright accents. Cinematic lighting with depth of field.
```

## 流程图模板

### 对比流程图
```
A clear infographic-style diagram showing the evolution from [old method] to [new method]. On the left side, show [old method description] in muted gray color. An arrow points to the right side showing [new method description] in vibrant blue and purple. Include visual elements like [specific icons]. The style is clean, modern infographic design with icons and clear visual hierarchy. Use blue (#0066CC) as the primary color.
```

### 多步骤流程图
```
A detailed flowchart showing [process name]. At the top, show [starting point]. Below, [number] parallel branches represent [sub-processes]: 1) [process 1] (with [icons]), 2) [process 2] (with [icons]), 3) [process 3] (with [icons]), 4) [process 4] (with [icons]). Each branch has specific task icons. At the bottom, all branches converge into [final output]. Use a clean, corporate style with blue (#0066CC) and purple color scheme, clear arrows showing workflow, and professional icons. The layout should be [vertical/horizontal] with clear hierarchy.
```

## 对比图模板

### 左右对比
```
A side-by-side comparison infographic showing '[Option A] vs [Option B]'. Left side: [description of A], labeled '[label A]', shown in gray tones. Right side: [description of B], labeled '[label B]', shown in vibrant blue and purple. Use arrows, icons, and clear labels. The style is professional business infographic with clean lines, modern typography, and a blue color scheme. Include visual metaphors like [specific metaphors].
```

### 上下对比
```
A before-and-after comparison showing [transformation]. Top section: [before state] with [visual elements] in muted colors. Bottom section: [after state] with [visual elements] in vibrant blue and purple. Connect with a large downward arrow or transformation symbol. Use clear labels in Chinese: '[before label]' and '[after label]'. Professional infographic style with clean design.
```

## 概念图模板

### 螺旋/漏斗图
```
A conceptual visualization of the '[concept name]'. Show a downward spiral or vortex in [colors]. At the top of the spiral, show [starting elements]. As the spiral descends, show [progression elements]. At the center of the spiral, show [end state] with [symbols]. Include visual elements like [specific elements]. The style is dramatic but professional, using a color palette of [colors]. Include subtle text labels in Chinese: '[label 1]', '[label 2]', '[label 3]'. The overall mood is [mood description].
```

### 网络/连接图
```
A network diagram showing [system/concept]. In the center, place [central element]. Surrounding it, show [connected elements] with connecting lines and nodes. Use different colors to represent different types of connections: [color 1] for [type 1], [color 2] for [type 2]. Include icons for each node. The style is clean, technical, and modern with a [light/dark] background.
```

## 协作图模板

### 人与AI协作
```
A professional illustration showing harmonious collaboration between humans and AI in [context]. In the center, show a professional [role] (diverse, confident) and a translucent AI hologram working together at a modern workspace. The human is [human action], while the AI hologram displays [AI action]. Around them, show floating icons representing: [capability 1] ([icon]), [capability 2] ([icon]), [capability 3] ([icon]). Use a balanced composition that emphasizes partnership, not replacement. Color palette: blue (#0066CC), purple, and warm [accent color] accents. The style is modern, optimistic, and professional with soft lighting and a clean background.
```

## 能力/竞争力图模板

### 三要素图
```
An infographic showing the three [elements] of [subject] in the AI era. Create three distinct sections arranged [horizontally/in a triangle]: 1) [Element 1] - represented by [visual metaphor] and [icons]; 2) [Element 2] - represented by [visual metaphor] and [icons]; 3) [Element 3] - represented by [visual metaphor] and [icons]. Each section should have Chinese labels: '[中文标签1]', '[中文标签2]', '[中文标签3]'. Use a clean, modern infographic style with blue (#0066CC) and purple color scheme, clear icons, and professional typography.
```

## 愿景/未来图模板

### 通往未来
```
An inspiring, optimistic illustration representing the future of [subject]. Show a pathway or bridge leading toward a bright, glowing horizon. On the path, show silhouettes of professionals walking confidently forward, with AI assistants (represented as glowing, friendly holographic companions) beside them. The horizon shows [future vision description]. Include visual metaphors: rising sun (new beginning), upward arrows (growth), interconnected networks (collaboration), and [specific metaphors]. The overall mood is hopeful, empowering, and forward-looking. Color palette: warm sunrise colors (orange, gold) blending with cool tech colors (blue, purple). The style is inspirational and cinematic with dramatic lighting and a sense of movement toward the future.
```

## 数据可视化图模板

### 趋势图
```
A clean, professional data visualization showing [trend description]. Display [type of chart: line/bar/pie] with clear data points. Use blue (#0066CC) for [data series 1] and red (#FF6B6B) for [data series 2]. Include axis labels in Chinese, a legend, and key data points highlighted. The style is corporate and professional with a white or light gray background. Add subtle grid lines for readability.
```

## 使用提示

### 尺寸选择
- 横版图片：aspect_ratio = "landscape" (适合大多数配图)
- 竖版图片：aspect_ratio = "portrait" (适合流程图)
- 方形图片：aspect_ratio = "square" (适合社交媒体)

### 中文标注
在提示词中直接使用中文标注，如：
- 标签：'传统AI聊天', 'Claude Cowork智能体'
- 文字：'按人头收费', 'AI自动化', '收入下降'

### 风格一致性
- 同一篇文章的所有配图应使用相同的配色方案
- 保持视觉风格的一致性（现代、专业、科技感）
- 使用相似的图标和设计元素

### 批量生成
使用 `generate_image` 工具一次生成多张图片（最多5张），提高效率。
