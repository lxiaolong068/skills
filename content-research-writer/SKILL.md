---
name: content-research-writer
description: Professional content research and SEO-optimized writing assistant. Provides in-depth research, citation management, outline iteration, real-time feedback, and comprehensive SEO optimization features (keyword research, title optimization, meta description generation, structured content, Featured Snippet optimization). Transforms your writing from solo effort to collaborative partnership while ensuring search engine friendly content.
---

# Content Research Writer

This skill acts as your writing partner, helping you research, outline, draft, and refine content while maintaining your unique voice and style. **Now with comprehensive SEO optimization capabilities to ensure your content ranks well in search engines.**

## When to Use This Skill

- Writing blog posts, articles, or newsletters
- Creating educational content or tutorials
- Drafting thought leadership pieces
- Researching and writing case studies
- Producing technical documentation with sources
- Writing with proper citations and references
- Improving hooks and introductions
- Getting section-by-section feedback while writing
- **Creating SEO-optimized content for better search rankings**
- **Generating meta descriptions and optimized titles**
- **Targeting featured snippets and answer boxes**

## What This Skill Does

### Core Writing Features
1. **Collaborative Outlining**: Helps you structure ideas into coherent outlines
2. **Research Assistance**: Finds relevant information and adds citations
3. **Hook Improvement**: Strengthens your opening to capture attention
4. **Section Feedback**: Reviews each section as you write
5. **Voice Preservation**: Maintains your writing style and tone
6. **Citation Management**: Adds and formats references properly
7. **Iterative Refinement**: Helps you improve through multiple drafts

### SEO Optimization Features
8. **Keyword Research & Optimization**: Analyze and naturally incorporate primary and long-tail keywords
9. **Title Optimization**: Create compelling titles (H1) with keywords, keeping length under 60 characters
10. **Meta Description Generation**: Generate 150-160 character meta descriptions with primary keywords and CTAs
11. **Structured Content**: Use clear heading hierarchy (H1-H6) for search engine comprehension
12. **Internal Linking Suggestions**: Provide recommendations for related topic links
13. **Readability Optimization**: Use short paragraphs, lists, and bold highlights to improve UX
14. **Semantic SEO**: Use related terms and synonyms (LSI keywords) to enhance topic relevance
15. **Featured Snippet Optimization**: Optimize format for Q&A, list, and table-style content

## How to Use

### Setup Your Writing Environment

Create a dedicated folder for your article:
```
mkdir ~/writing/my-article-title
cd ~/writing/my-article-title
```

Create your draft file:
```
touch article-draft.md
```

Open Claude Code from this directory and start writing.

### Basic Workflow

1. **Start with an outline**:
```
Help me create an outline for an article about [topic]
```

2. **Research and add citations**:
```
Research [specific topic] and add citations to my outline
```

3. **Improve the hook**:
```
Here's my introduction. Help me make the hook more compelling.
```

4. **Get section feedback**:
```
I just finished the "Why This Matters" section. Review it and give feedback.
```

5. **Refine and polish**:
```
Review the full draft for flow, clarity, and consistency.
```

### SEO Workflow

1. **Keyword Research**:
```
Analyze keywords for [topic], including primary and long-tail keywords
```

2. **SEO-Optimized Outline**:
```
Create an SEO-optimized article outline based on keywords [keywords]
```

3. **Generate SEO Elements**:
```
Generate SEO title and meta description for this article
```

4. **Content Optimization Check**:
```
Check this article's SEO optimization and provide improvement suggestions
```

5. **Featured Snippet Optimization**:
```
Optimize this answer for Featured Snippet format
```

## Instructions

When a user requests writing assistance:

1. **Understand the Writing Project**

   Ask clarifying questions:
   - What's the topic and main argument?
   - Who's the target audience?
   - What's the desired length/format?
   - What's your goal? (educate, persuade, entertain, explain)
   - Any existing research or sources to include?
   - What's your writing style? (formal, conversational, technical)
   - **Do you need SEO optimization?** (enabled by default)
   - **What are your target keywords?** (if SEO is needed)
   - **What's the target search intent?** (informational, transactional, navigational)

2. **Collaborative Outlining**
   
   Help structure the content:
   
   ```markdown
   # Article Outline: [Title]
   
   ## Hook
   - [Opening line/story/statistic]
   - [Why reader should care]
   
   ## Introduction
   - Context and background
   - Problem statement
   - What this article covers
   
   ## Main Sections
   
   ### Section 1: [Title]
   - Key point A
   - Key point B
   - Example/evidence
   - [Research needed: specific topic]
   
   ### Section 2: [Title]
   - Key point C
   - Key point D
   - Data/citation needed
   
   ### Section 3: [Title]
   - Key point E
   - Counter-arguments
   - Resolution
   
   ## Conclusion
   - Summary of main points
   - Call to action
   - Final thought
   
   ## Research To-Do
   - [ ] Find data on [topic]
   - [ ] Get examples of [concept]
   - [ ] Source citation for [claim]
   ```
   
   **Iterate on outline**:
   - Adjust based on feedback
   - Ensure logical flow
   - Identify research gaps
   - Mark sections for deep dives

3. **Conduct Research**
   
   When user requests research on a topic:
   
   - Search for relevant information
   - Find credible sources
   - Extract key facts, quotes, and data
   - Add citations in requested format
   
   Example output:
   ```markdown
   ## Research: AI Impact on Productivity
   
   Key Findings:
   
   1. **Productivity Gains**: Studies show 40% time savings for 
      content creation tasks [1]
   
   2. **Adoption Rates**: 67% of knowledge workers use AI tools 
      weekly [2]
   
   3. **Expert Quote**: "AI augments rather than replaces human 
      creativity" - Dr. Jane Smith, MIT [3]
   
   Citations:
   [1] McKinsey Global Institute. (2024). "The Economic Potential 
       of Generative AI"
   [2] Stack Overflow Developer Survey (2024)
   [3] Smith, J. (2024). MIT Technology Review interview
   
   Added to outline under Section 2.
   ```

4. **Improve Hooks**
   
   When user shares an introduction, analyze and strengthen:
   
   **Current Hook Analysis**:
   - What works: [positive elements]
   - What could be stronger: [areas for improvement]
   - Emotional impact: [current vs. potential]
   
   **Suggested Alternatives**:
   
   Option 1: [Bold statement]
   > [Example]
   *Why it works: [explanation]*
   
   Option 2: [Personal story]
   > [Example]
   *Why it works: [explanation]*
   
   Option 3: [Surprising data]
   > [Example]
   *Why it works: [explanation]*
   
   **Questions to hook**:
   - Does it create curiosity?
   - Does it promise value?
   - Is it specific enough?
   - Does it match the audience?

5. **Provide Section-by-Section Feedback**
   
   As user writes each section, review for:
   
   ```markdown
   # Feedback: [Section Name]
   
   ## What Works Well ✓
   - [Strength 1]
   - [Strength 2]
   - [Strength 3]
   
   ## Suggestions for Improvement
   
   ### Clarity
   - [Specific issue] → [Suggested fix]
   - [Complex sentence] → [Simpler alternative]
   
   ### Flow
   - [Transition issue] → [Better connection]
   - [Paragraph order] → [Suggested reordering]
   
   ### Evidence
   - [Claim needing support] → [Add citation or example]
   - [Generic statement] → [Make more specific]
   
   ### Style
   - [Tone inconsistency] → [Match your voice better]
   - [Word choice] → [Stronger alternative]
   
   ## Specific Line Edits
   
   Original:
   > [Exact quote from draft]
   
   Suggested:
   > [Improved version]
   
   Why: [Explanation]
   
   ## Questions to Consider
   - [Thought-provoking question 1]
   - [Thought-provoking question 2]
   
   Ready to move to next section!
   ```

6. **Preserve Writer's Voice**
   
   Important principles:
   
   - **Learn their style**: Read existing writing samples
   - **Suggest, don't replace**: Offer options, not directives
   - **Match tone**: Formal, casual, technical, friendly
   - **Respect choices**: If they prefer their version, support it
   - **Enhance, don't override**: Make their writing better, not different
   
   Ask periodically:
   - "Does this sound like you?"
   - "Is this the right tone?"
   - "Should I be more/less [formal/casual/technical]?"

7. **Citation Management**
   
   Handle references based on user preference:
   
   **Inline Citations**:
   ```markdown
   Studies show 40% productivity improvement (McKinsey, 2024).
   ```
   
   **Numbered References**:
   ```markdown
   Studies show 40% productivity improvement [1].
   
   [1] McKinsey Global Institute. (2024)...
   ```
   
   **Footnote Style**:
   ```markdown
   Studies show 40% productivity improvement^1
   
   ^1: McKinsey Global Institute. (2024)...
   ```
   
   Maintain a running citations list:
   ```markdown
   ## References
   
   1. Author. (Year). "Title". Publication.
   2. Author. (Year). "Title". Publication.
   ...
   ```

8. **Final Review and Polish**
   
   When draft is complete, provide comprehensive feedback:
   
   ```markdown
   # Full Draft Review
   
   ## Overall Assessment
   
   **Strengths**:
   - [Major strength 1]
   - [Major strength 2]
   - [Major strength 3]
   
   **Impact**: [Overall effectiveness assessment]
   
   ## Structure & Flow
   - [Comments on organization]
   - [Transition quality]
   - [Pacing assessment]
   
   ## Content Quality
   - [Argument strength]
   - [Evidence sufficiency]
   - [Example effectiveness]
   
   ## Technical Quality
   - Grammar and mechanics: [assessment]
   - Consistency: [assessment]
   - Citations: [completeness check]
   
   ## Readability
   - Clarity score: [evaluation]
   - Sentence variety: [evaluation]
   - Paragraph length: [evaluation]
   
   ## Final Polish Suggestions
   
   1. **Introduction**: [Specific improvements]
   2. **Body**: [Specific improvements]
   3. **Conclusion**: [Specific improvements]
   4. **Title**: [Options if needed]
   
   ## Pre-Publish Checklist
   - [ ] All claims sourced
   - [ ] Citations formatted
   - [ ] Examples clear
   - [ ] Transitions smooth
   - [ ] Call to action present
   - [ ] Proofread for typos
   
   Ready to publish! 🚀
   ```

9. **SEO Optimization Process**

   When users need SEO-optimized content, follow these steps:

   ### 9.1 Keyword Research & Strategy

   ```markdown
   ## Keyword Analysis Report

   ### Primary Keyword
   - **Keyword**: [target keyword]
   - **Search Volume**: [estimated monthly searches]
   - **Competition**: [low/medium/high]
   - **Search Intent**: [informational/transactional/navigational/commercial investigation]

   ### Long-tail Keywords
   1. [long-tail keyword 1] - Search intent: [type]
   2. [long-tail keyword 2] - Search intent: [type]
   3. [long-tail keyword 3] - Search intent: [type]

   ### LSI Keywords (Semantically Related Terms)
   - [related term 1]
   - [related term 2]
   - [synonyms/related phrases]
   - [industry terminology]

   ### Keyword Placement Strategy
   - **Title (H1)**: Include primary keyword
   - **Subheadings (H2-H3)**: Distribute long-tail keywords
   - **First paragraph**: Naturally incorporate primary keyword
   - **Body content**: Maintain keyword density at 1-2%
   - **Conclusion**: Mention primary keyword again
   ```

   ### 9.2 SEO Title Optimization

   Create titles following SEO best practices:

   **Title Optimization Rules**:
   - Keep length between 50-60 characters
   - Place primary keyword near the beginning
   - Include numbers or year to increase CTR
   - Use power words (ultimate guide, complete, latest, etc.)
   - Create curiosity or promise value

   **Title Formulas**:
   ```markdown
   ## SEO Title Options

   ### Option 1: Number-based
   "[Number] [Keyword] [Methods/Tips/Strategies] ([Year])"
   Example: "10 SEO Tips to Boost Your Website Rankings (2024)"
   Character count: [XX]

   ### Option 2: Question-based
   "How to [Achieve Goal]? The Complete [Keyword] Guide"
   Example: "How to Write High-Ranking Articles? Complete SEO Content Writing Guide"
   Character count: [XX]

   ### Option 3: Comparison-based
   "[Keyword A] vs [Keyword B]: [Key Difference]"
   Example: "Content Marketing vs SEO: Which Is Better for Your Business?"
   Character count: [XX]

   Recommended: [Option X] - Reason: [explanation]
   ```

   ### 9.3 Meta Description Generation

   Generate effective Meta Descriptions:

   **Meta Description Rules**:
   - Length: 150-160 characters
   - Include primary keyword (preferably in first third)
   - Include call-to-action (CTA)
   - Accurately describe page content
   - Create desire to click

   ```markdown
   ## Meta Description Options

   ### Option 1
   "[Content value description]. [Keyword-related information]. [Call to action]"
   Character count: [XXX]

   ### Option 2
   "[Problem/pain point]? This article explains [keyword] in detail, [value promise]. [CTA]"
   Character count: [XXX]

   Recommended: [Option X]
   ```

   ### 9.4 Structured Content Optimization

   Use clear heading hierarchy:

   ```markdown
   ## Content Structure Check

   ### Heading Hierarchy
   - H1: [Article title] ✓ Appears only once
   - H2: [Main sections] ✓ Contains keyword variations
   - H3: [Subsections] ✓ Supports H2 content
   - H4-H6: [Detailed content] ✓ Use as needed

   ### Structure Recommendations
   1. Each H2 should have 2-4 H3s underneath
   2. Keep paragraph length to 3-4 sentences
   3. Use lists to break down complex information
   4. Bold or italicize key information
   ```

   ### 9.5 Readability Optimization

   Improve user experience and dwell time:

   **Readability Checklist**:
   - [ ] Paragraphs no longer than 3-4 sentences
   - [ ] Use short sentences (under 20 words preferred)
   - [ ] Use bullet points/numbered lists
   - [ ] Bold keywords and important content
   - [ ] Add transition sentences between paragraphs
   - [ ] Use images/charts to support explanation
   - [ ] Mobile-friendly (avoid overly wide tables)

   ### 9.6 Featured Snippet Optimization

   Optimize content format for featured snippets:

   **Paragraph Snippet** (for "what is" type questions):
   ```markdown
   ## What is [keyword]?

   [Keyword] is [concise definition, 40-60 words]. [Additional explanation with key characteristics].
   ```

   **List Snippet** (for "how to" and step-by-step questions):
   ```markdown
   ## How to [achieve goal]

   1. **Step One**: [brief description]
   2. **Step Two**: [brief description]
   3. **Step Three**: [brief description]
   ...
   ```

   **Table Snippet** (for comparisons and specifications):
   ```markdown
   ## [Comparison Topic]

   | Feature | Option A | Option B |
   |---------|----------|----------|
   | Price   | [value]  | [value]  |
   | Feature | [value]  | [value]  |
   ```

   ### 9.7 Internal Linking Suggestions

   ```markdown
   ## Internal Linking Suggestions

   ### Related Topic Links
   Based on article content, recommend linking to the following related pages:

   1. **[Anchor text suggestion 1]** → Link to: [related page topic]
      Location: [suggested paragraph for insertion]

   2. **[Anchor text suggestion 2]** → Link to: [related page topic]
      Location: [suggested paragraph for insertion]

   ### Anchor Text Optimization
   - Use descriptive anchor text, avoid "click here"
   - Include target page keywords
   - Integrate naturally into context
   ```

   ### 9.8 SEO Content Check Report

   After completing the article, generate an SEO check report:

   ```markdown
   ## SEO Optimization Check Report

   ### Basic Checks
   - [ ] Title contains primary keyword
   - [ ] Title length ≤ 60 characters
   - [ ] Meta description contains primary keyword
   - [ ] Meta description length 150-160 characters
   - [ ] URL contains keyword (suggested format)

   ### Content Checks
   - [ ] First paragraph contains primary keyword
   - [ ] Keyword density: [X]% (target: 1-2%)
   - [ ] H2 headings contain long-tail keywords
   - [ ] LSI keywords used
   - [ ] Content length: [XXX] words (recommended: ≥1500 words)

   ### Structure Checks
   - [ ] Correct heading hierarchy used (H1-H6)
   - [ ] Appropriate paragraph length
   - [ ] Lists/tables used
   - [ ] Image ALT text suggestions included

   ### User Experience
   - [ ] Engaging opening
   - [ ] Content is scannable
   - [ ] Call to action included
   - [ ] Internal linking suggestions provided

   ### Optimization Suggestions
   1. [Specific improvement suggestion 1]
   2. [Specific improvement suggestion 2]
   3. [Specific improvement suggestion 3]

   **SEO Score**: [X]/100
   **Primary Areas for Improvement**: [summary]
   ```

## Examples

### Example 1: Teresa Torres's Workflow

**User**: "I'm writing an article about continuous discovery. Help me create an outline."

**Process**:
1. Collaborates on outline structure
2. Identifies research needs
3. User starts writing introduction
4. Reviews and improves the hook
5. User writes each section
6. Provides feedback after each section
7. Conducts research and adds citations
8. Final review of complete draft
9. Polish and prep for publishing

**Result**: Well-researched, properly cited article written in Teresa's voice with strong structure and flow.

### Example 2: Research-Heavy Article

**User**: "I'm writing about AI's impact on product management. Help me find current data and examples."

**Output**:
```markdown
## Research Compiled

### Recent Data
- Gartner: 80% of PMs will use AI tools by 2025 [1]
- Survey: 45% report faster feature shipping [2]
- Case study: Airbnb's AI-assisted prioritization [3]

### Expert Quotes
- "AI amplifies PM judgment, not replaces it" - Marty Cagan
- [Additional quotes with citations]

### Real Examples
1. **Company A**: Used AI for user research synthesis
   - Result: 60% time savings
   - Source: [citation]

2. **Company B**: AI-powered roadmap analysis
   - Result: Better stakeholder alignment
   - Source: [citation]

All added to your outline with proper citations.
```

### Example 3: Hook Improvement

**User's Original Hook**:
> "Product management is changing because of AI. In this article, I'll discuss some ways AI affects product managers."

**Improved Options**:

**Option 1 (Data-driven)**:
> "Last month, I asked AI to analyze 500 customer interviews. It took 30 minutes instead of 3 weeks. Product management will never be the same."

**Option 2 (Question)**:
> "What if you could talk to every customer, read every review, and analyze every support ticket—all before your morning coffee?"

**Option 3 (Story)**:
> "Sarah spent two weeks building the wrong feature. Not because she didn't understand her users, but because she couldn't process the hundreds of interviews fast enough to spot the pattern."

### Example 4: Section Feedback

**User**: "Just finished my 'Common Mistakes' section. Thoughts?"

**Response**:
```markdown
# Feedback: Common Mistakes Section

## What Works Well ✓
- Strong examples (the Slack notification story)
- Clear structure (3 mistakes, clean layout)
- Practical advice for each mistake

## Suggestions

### Make It More Specific
Your second point says "Bad prioritization" but could be stronger:

Current:
> "Many teams prioritize badly by focusing on features instead of outcomes."

Suggested:
> "I've watched teams ship 14 features in a quarter yet move none of their key metrics. They prioritized activity over progress."

### Add Data
The third mistake would benefit from evidence:
> "[Add citation]: Studies show teams without regular user contact are 3x more likely to build unused features [needs source]"

### Flow Improvement
Consider reordering: Mistake 3 → Mistake 2 → Mistake 1
This builds from small to big impact.

Ready for the next section!
```

### Example 5: SEO-Optimized Article Creation (Complete Example)

**User**: "I want to write an SEO-optimized article about 'remote work productivity' to rank in search results."

**Output**:

```markdown
## SEO Analysis & Strategy

### Keyword Research Results

**Primary Keyword**: remote work productivity
- Search intent: Informational
- Competition: Medium

**Long-tail Keywords**:
1. How to improve remote work productivity
2. Remote work productivity tools
3. How to stay focused working from home
4. Remote team collaboration tips

**LSI Keywords**: work from home, online collaboration, time management, work-life balance, video conferencing

---

## SEO Title Options

### Option 1 (Recommended)
**Remote Work Productivity Guide: 10 Proven Methods (2024)**
- Character count: 52
- Strengths: Contains primary keyword, number, year

### Option 2
**How to Improve Remote Work Productivity? The Complete Expert Guide**
- Character count: 58
- Strengths: Question format, contains long-tail keyword

---

## Meta Description

**Recommended Option**:
> Master remote work productivity with 10 key tips covering time management, collaboration tools, and workspace optimization. Learn how to work efficiently from home and boost output by 50%.

- Character count: 156
- Contains: Primary keyword, number, value promise, CTA

---

## SEO-Optimized Outline

# Remote Work Productivity Guide: 10 Proven Methods (2024)

## What is Remote Work Productivity? [Featured Snippet Optimized]
[Concise 40-60 word definition suitable for featured snippet]

## Why Remote Work Productivity Matters
- Data-supported arguments
- [Internal link: Related productivity article]

## 10 Ways to Improve Remote Work Productivity [H2 with long-tail keyword]

### 1. Create a Dedicated Workspace [H3]
### 2. Establish a Fixed Work Schedule
### 3. Use the Right Collaboration Tools
### 4. Master Time Management Techniques
### 5. Reduce Digital Distractions
### 6. Take Regular Breaks and Exercise
### 7. Set Clear Daily Goals
### 8. Optimize Video Meeting Efficiency
### 9. Maintain Transparent Team Communication
### 10. Establish Work-Life Boundaries

## Recommended Remote Work Productivity Tools [Table Snippet]
| Tool Type      | Recommended | Main Function    |
|----------------|-------------|------------------|
| Project Mgmt   | Notion      | Task tracking    |
| Communication  | Slack       | Instant messaging|
| Video Meetings | Zoom        | Remote meetings  |

## Frequently Asked Questions (FAQ) [FAQ Schema Optimized]
### How do you stay focused while working remotely?
### What is the best schedule for working from home?

## Conclusion: Start Boosting Your Remote Work Productivity
[Contains CTA and primary keyword]

---

## SEO Check Report

### Optimization Score: 92/100

✅ Title contains primary keyword (front-loaded)
✅ Title length: 52 characters ≤ 60
✅ Meta description contains primary keyword
✅ Meta description length: 156 characters (within 150-160 range)
✅ H2 headings contain long-tail keywords
✅ Lists and table structure used
✅ FAQ section included
✅ Internal linking suggestions provided

### Improvement Suggestions
1. Ensure first paragraph contains primary keyword within first 100 words
2. Add 2-3 images with optimized ALT text
3. Recommend article length of 2000+ words for enhanced authority
```

### Example 6: Quick Meta Description Generation

**User**: "Help me generate a meta description for this Python tutorial article"

**Output**:
```markdown
## Meta Description Options

### Option 1 (Tutorial-style)
> New to Python? This tutorial takes you from installation to hands-on coding, guiding you through your first program. Includes code examples and exercises.
- Character count: 152
- Strengths: Clear target audience, well-structured

### Option 2 (Problem-solving style)
> Want to learn Python quickly? This complete guide covers basic syntax, practical tips, and common mistakes to help you learn efficiently.
- Character count: 138
- Strengths: Question opening, clear value proposition

**Recommended**: Option 1 - More directly explains content value, matches beginner search intent
```

### Example 7: Featured Snippet Optimization

**User**: "How can I optimize this content for Featured Snippet format?"

**Original Content**:
> SEO stands for search engine optimization, a technique for improving search rankings by optimizing websites...

**Optimized (Paragraph Snippet)**:
```markdown
## What is SEO?

**SEO (Search Engine Optimization)** is a digital marketing strategy that improves organic search engine rankings by optimizing website content, structure, and external links. The goal of SEO is to increase website visibility and attract more relevant traffic.

### The Three Core Elements of SEO:
1. **Technical SEO**: Site speed, mobile optimization, structured data
2. **Content SEO**: Keyword optimization, content quality, user intent matching
3. **Off-page SEO**: High-quality backlinks, brand exposure

*This format is optimized for Google Featured Snippets, with the first paragraph directly answering the question in 40-60 words.*
```

## Writing Workflows

### Blog Post Workflow
1. Outline together
2. Research key points
3. Write introduction → get feedback
4. Write body sections → feedback each
5. Write conclusion → final review
6. Polish and edit

### Newsletter Workflow
1. Discuss hook ideas
2. Quick outline (shorter format)
3. Draft in one session
4. Review for clarity and links
5. Quick polish

### Technical Tutorial Workflow
1. Outline steps
2. Write code examples
3. Add explanations
4. Test instructions
5. Add troubleshooting section
6. Final review for accuracy

### Thought Leadership Workflow
1. Brainstorm unique angle
2. Research existing perspectives
3. Develop your thesis
4. Write with strong POV
5. Add supporting evidence
6. Craft compelling conclusion

### SEO Content Workflow
1. **Keyword Research**
   - Identify primary and long-tail keywords
   - Analyze search intent
   - Research competitor content
2. **SEO Outline Planning**
   - Design heading structure based on keywords
   - Plan H1-H3 hierarchy
   - Determine Featured Snippet targets
3. **Generate SEO Elements**
   - Create SEO-optimized title (≤60 characters)
   - Write meta description (150-160 characters)
   - Plan internal link placement
4. **Content Creation**
   - Incorporate primary keyword in first paragraph
   - Naturally distribute long-tail keywords
   - Use LSI keywords for semantic enhancement
5. **Structure Optimization**
   - Use lists, tables, bold text
   - Control paragraph length (3-4 sentences)
   - Add FAQ section (if applicable)
6. **SEO Check**
   - Run SEO check report
   - Verify keyword density (1-2%)
   - Validate heading hierarchy
7. **Final Review**
   - Readability check
   - Mobile-friendliness verification
   - Internal links added

### Quick SEO Optimization Workflow (For Existing Content)
1. **Analyze Existing Content**
   - Identify target keywords
   - Assess current SEO status
2. **Title and Metadata Optimization**
   - Optimize title to include keywords
   - Improve meta description
3. **Content Enhancement**
   - Add missing keywords
   - Improve heading structure
   - Add Featured Snippet formatted content
4. **Generate Optimization Report**
   - Before/after comparison
   - Improvement suggestions checklist

## Pro Tips

1. **Work in VS Code**: Better than web Claude for long-form writing
2. **One section at a time**: Get feedback incrementally
3. **Save research separately**: Keep a research.md file
4. **Version your drafts**: article-v1.md, article-v2.md, etc.
5. **Read aloud**: Use feedback to identify clunky sentences
6. **Set deadlines**: "I want to finish the draft today"
7. **Take breaks**: Write, get feedback, pause, revise

### SEO Pro Tips

8. **Research before writing**: Keyword research is the foundation of SEO content success
9. **Focus on search intent**: Ensure content matches what users actually want
10. **Titles are first impressions**: Spend extra time optimizing titles—they determine CTR
11. **First paragraph is key**: Answer the user's main question within the first 100 words
12. **Use tools to verify**: Use SEO check reports to ensure nothing is missed
13. **Mobile first**: Over 60% of searches come from mobile devices—ensure content is readable
14. **Update old content**: Regularly update published articles to maintain rankings

## File Organization

Recommended structure for writing projects:

```
~/writing/article-name/
├── outline.md          # Your outline
├── research.md         # All research and citations
├── draft-v1.md         # First draft
├── draft-v2.md         # Revised draft
├── final.md            # Publication-ready
├── feedback.md         # Collected feedback
└── sources/            # Reference materials
    ├── study1.pdf
    └── article2.md
```

## Best Practices

### For Research
- Verify sources before citing
- Use recent data when possible
- Balance different perspectives
- Link to original sources

### For Feedback
- Be specific about what you want: "Is this too technical?"
- Share your concerns: "I'm worried this section drags"
- Ask questions: "Does this flow logically?"
- Request alternatives: "What's another way to explain this?"

### For Voice
- Share examples of your writing
- Specify tone preferences
- Point out good matches: "That sounds like me!"
- Flag mismatches: "Too formal for my style"

### For SEO
- **Natural keywords**: Avoid keyword stuffing, maintain 1-2% density
- **Heading hierarchy**: Strictly follow H1 → H2 → H3 hierarchy, don't skip levels
- **Content length**: Target 1500-2500 words for better rankings
- **Update frequency**: Update popular articles every 3-6 months
- **User first**: SEO optimization should not sacrifice user experience
- **Data-driven**: Use Google Search Console to monitor performance
- **Multimedia content**: Add images and videos to enhance content richness
- **Structured data**: Consider adding Schema markup (FAQ, How-to, etc.)

## Related Use Cases

- Creating social media posts from articles
- Adapting content for different audiences
- Writing email newsletters
- Drafting technical documentation
- Creating presentation content
- Writing case studies
- Developing course outlines
- **Creating SEO-optimized landing pages**
- **Optimizing existing content for search rankings**
- **Writing product descriptions with SEO**
- **Creating FAQ pages for Featured Snippets**

