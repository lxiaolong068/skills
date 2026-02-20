---
name: youtube-to-wechat-article
description: Create WeChat Official Account articles from YouTube videos with detailed content, network research, fact-checking, review & expansion, and custom illustrations. Supports style analysis of reference articles to extract writing patterns and apply them to new content. After writing, performs systematic content review and expansion to boost information density, readability, and narrative depth. Use for converting video content to articles, creating social media content from videos, generating illustrated articles with layout guidance, and adopting specific author styles.
---

# YouTube to WeChat Article Creator

Convert YouTube videos (or other video content) into high-quality WeChat Official Account articles with detailed research, fact-checking, and custom illustrations.

## Core Capabilities

1. Analyze reference articles to extract writing style and techniques
2. Extract and understand video content
3. Enrich content with network research
4. Write in authentic WeChat Official Account style (with optional style migration)
5. **Review and expand content** for richer information density and higher readability
6. Cross-validate facts and data
7. Generate custom illustrations
8. Provide layout and publishing guidance

## Workflow

### Phase 0: Analyze Reference Article (Optional)

If user provides reference articles, analyze them to extract writing style and techniques:

- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/style-extraction-guide.md`
- Use `/home/ubuntu/skills/youtube-to-wechat-article/references/style-analysis-template.md` to systematically analyze each reference article
- Extract key style characteristics: title patterns, opening techniques, paragraph structure, language style, data presentation, and conclusion methods
- Identify author's personal brand elements and interaction patterns
- Create a style guide summary for later application
- Document findings in a style profile file

**When to use this phase:**
- User explicitly provides reference articles or WeChat Official Account links
- User requests to adopt a specific author's writing style
- User wants to maintain consistency with existing content

**Output from this phase:**
- Style analysis document with extracted characteristics
- Style guide for title, opening, structure, language, and conclusion
- Personal brand elements and interaction patterns

### Phase 1: Understand Video Content

Access the YouTube video URL and extract core content:
- Use `browser` tool to navigate to the video
- Extract video summary and key points
- Identify main themes, arguments, and data points
- Save key information to research notes

### Phase 2: Network Research

Enrich content with authoritative information:
- Use `search` tool to find related information
- Access multiple authoritative sources using `browser`
- Gather specific data, cases, and expert opinions
- Save findings to research notes file

**Research priorities:**
- Official data and statistics
- Real-world cases and examples
- Expert opinions and analysis
- Industry reports and trends

### Phase 3: Write Article

Create article following WeChat Official Account style:
- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/wechat-style-guide.md`
- Use `/home/ubuntu/skills/youtube-to-wechat-article/templates/article-template.md` as structure reference
- If style analysis was completed in Phase 0, apply the extracted style characteristics to maintain consistency with reference articles
- Integrate video content with research findings
- Use specific cases and data for support
- Avoid machine-writing traces

**Writing principles:**
- Detailed and information-rich (5000-8000 characters)
- Natural, conversational tone
- Clear structure with visual hierarchy
- Data-driven with credible sources
- Engaging opening and inspiring conclusion
- If style migration is applied, ensure consistency with reference article's style while maintaining originality

### Phase 3.5: Review & Expand Content

Systematically review the draft and expand thin sections to reach target depth and readability:

- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/review-and-expand-guide.md`
- Run the **5-dimension review checklist** (structure, content density, readability, language style, accuracy)
- Annotate all problem areas before rewriting
- Apply targeted expansion techniques based on identified gaps

**Review dimensions:**
- **Structure**: strong hook, clear heading hierarchy, smooth transitions, actionable ending
- **Content density**: every claim backed by data/cases, "why" explained not just "what"
- **Readability**: paragraph length ≤5 sentences, rhythm variation, bold key points
- **Language style**: conversational tone, first-person voice, emotional investment, no template phrases
- **Accuracy**: all numbers sourced, names correct, no internal contradictions

**Expansion priorities (highest ROI first):**
1. Opening hook — most critical for reader retention
2. Thinnest sections — fewest words relative to importance
3. Core argument paragraphs — add data interpretation layer
4. Closing call-to-action — boost interaction (comment/share)
5. Transition sentences — improve overall flow

**Expansion techniques to apply:**
- BAB framework (Before-After-Bridge) for solution introductions
- Analogies to make complex concepts immediately clear
- Data interpretation layer: not just numbers, but what they mean
- Scene-based micro-stories for emotional resonance
- Q&A pacing (pose reader's likely question, then answer)
- Expert/authority quotes for credibility
- Contrast amplification for before/after comparisons
- Power sentences (bold core insight, then 2-3 sentences expanding it)
- Cliffhanger chapter endings to drive continued reading

**Target word count:** Initial drafts are typically 3000-4000 characters. Expand to **5000-8000 characters** before proceeding.

---

### Phase 4: Cross-Validate Content

Verify accuracy of key facts and data:
- Use `search` tool to cross-check key claims
- Access original sources using `browser`
- Verify statistics and case studies
- Document verification results

**Validation focus:**
- Key statistics and numbers
- Company names and product details
- Expert quotes and attributions
- Timeline and event sequences

### Phase 5: Acquire Illustrations

Acquire 6-8 illustrations for the article. **Web images are strongly preferred; AI generation is the last resort.**

**Step 1: Search for Images from the Web (Always First)**
- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/image-search-guide.md`
- Use `search` tool with `type="image"` to find relevant images for ALL planned illustrations
- Search with multiple keyword variants (Chinese + English) for each image slot
- Evaluate results by quality, relevance, and copyright (prefer CC0/Unsplash/Pexels)
- Download suitable images and copy to working directory
- Target: obtain as many of the 6-8 required images from the web as possible

**Step 2: Generate Images with AI (Last Resort Only)**
- Only generate images for slots where no suitable web image was found after thorough searching
- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/image-prompts.md`
- Use `generate_image` tool in batches (max 5 per call)
- Ensure AI-generated images are visually consistent with any downloaded web images

**Decision Rule for Each Image Slot:**
1. Define the image topic and purpose
2. Search the web with at least 2-3 keyword variants
3. If a high-quality, relevant, copyright-safe image is found → use it
4. Only if no suitable image exists after exhaustive search → generate with AI

**Preferred web image sources**: real products, actual people, existing brands, published data charts, real-world scenes, software screenshots
**Use AI only for**: abstract concepts with no real-world equivalent, custom information diagrams requiring specific data/layout, highly stylized illustrations matching exact brand requirements

**Illustration types:**
- Cover image (landscape, 1080×600px equivalent)
- Workflow diagrams (landscape or portrait)
- Comparison infographics (landscape)
- Concept illustrations (landscape)
- Collaboration scenes (landscape)
- Future vision images (landscape)

**Visual guidelines:**
- Unified color scheme: blue (#0066CC), purple, red (#FF6B6B)
- Modern, professional, tech-forward style
- Include Chinese labels where appropriate
- Maintain consistent visual language

### Phase 6: Provide Layout Guidance

Create comprehensive layout and publishing guide:
- Read `/home/ubuntu/skills/youtube-to-wechat-article/references/layout-guide.md`
- Generate image usage instructions
- Provide typography and spacing recommendations
- Suggest publishing time and promotion copy

## Output Deliverables

Deliver all files to user via `message` tool with `result` type:

1. **Article file** (Markdown format)
   - Full article content
   - Structured with clear hierarchy
   - 5000-8000 characters

2. **Illustration files** (6-8 JPG images)
   - High resolution (2752×1536px or 1536×2752px)
   - Consistent visual style
   - Ready for compression and use

3. **Image usage guide** (Markdown format)
   - Image list with descriptions
   - Placement recommendations
   - Size and compression guidelines

4. **Layout guide** (Markdown format)
   - Typography specifications
   - Color scheme
   - Spacing and formatting rules
   - Publishing checklist

## Quality Standards

### Content Quality
- Information-rich with specific data and cases
- Natural writing without machine-generated traces
- Accurate facts verified through multiple sources
- Engaging narrative with emotional resonance

### Visual Quality
- Professional, modern illustration style
- Consistent color scheme and visual language
- Clear information hierarchy in diagrams
- Mobile-friendly image sizes

### Completeness
- All 7 phases completed in sequence (Phase 0 optional)
- Phase 3.5 review checklist passed before proceeding to Phase 4
- Article reaches 5000-8000 characters after expansion
- All deliverables provided
- Ready for immediate publishing

## Style Analysis Best Practices

### When to Analyze Reference Articles

Perform Phase 0 style analysis when:
- User provides 1-3 reference articles from the same author or account
- User explicitly requests to adopt a specific writing style
- User wants to maintain brand voice consistency
- User seeks to learn from successful content patterns

### Style Extraction Quality

- Analyze multiple articles to identify consistent patterns (not one-off choices)
- Focus on extractable patterns: title types, opening methods, paragraph length, language choices, data presentation
- Distinguish between universal best practices and author-specific habits
- Document both what to do and what to avoid based on reference articles
- Create actionable style guidelines for the writing phase

### Style Application Quality

- Apply extracted style consistently throughout the new article
- Maintain originality while adopting style patterns
- Ensure style choices align with video content and research findings
- Use style as a framework, not a constraint
- Balance style consistency with content authenticity

## Best Practices

### Research Depth
- Access at least 5-8 authoritative sources
- Include both Chinese and English sources when relevant
- Prioritize official data and industry reports
- Document all sources for verification

### Writing Style
- Use first-person perspective for relatability
- Include rhetorical questions for engagement
- Vary sentence length and structure
- Express genuine opinions and emotions

### Illustration Strategy
- **Always search the web first** for every image slot — maximise web image usage
- Try at least 2-3 keyword variants (English + Chinese) before giving up on a web image
- AI generation is the **last resort** — only when no suitable web image can be found
- Ensure copyright compliance: prefer CC0 sources (Unsplash, Pexels, Pixabay)
- Place images at natural break points in the article
- Use diagrams for complex concepts, real-world scenes for emotional connection

### Layout Optimization
- Mobile-first design approach
- Clear visual hierarchy
- Adequate white space
- Consistent formatting throughout

## Common Pitfalls to Avoid

- Relying solely on video content without research
- Using overly formal or mechanical language
- **Skipping Phase 3.5 review** — this is how thin, low-readability drafts get published
- **Expanding without a plan** — always annotate problem areas first, then rewrite systematically
- **Only adding length without adding value** — every new sentence must increase information density or improve reading experience
- Generating illustrations one by one (inefficient)
- Skipping fact-checking phase
- Providing incomplete layout guidance
- Using inconsistent visual styles

## Adaptation Notes

This skill can be adapted for:
- Other video platforms (Bilibili, TikTok, etc.)
- Other social media formats (Zhihu, Xiaohongshu)
- Different content sources (podcasts, webinars)
- Different article styles (technical, lifestyle, etc.)
- Style analysis for other content creators or brands

Adjust the style guide and templates as needed for different platforms or audiences. The style analysis framework (Phase 0) can be applied to any written content to extract and document writing patterns.
