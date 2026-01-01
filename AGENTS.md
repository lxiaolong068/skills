# Repository Guidelines

## Project Structure & Module Organization
This repo is a collection of self-contained skill directories. Each skill lives at the top level (kebab-case name) and includes a `SKILL.md` file with YAML frontmatter (`name`, `description`) and the instructions the agent follows. The `document-skills/` directory is a grouped set of skills (`docx/`, `pdf/`, `pptx/`, `xlsx/`). Many skills also include `scripts/`, `assets/`, `references/`, or `examples/` subfolders. Keep new skills isolated in their own directory and avoid cross-skill dependencies.

## Build, Test, and Development Commands
There is no repo-wide build or test runner; commands are skill-specific.
- Install Python dependencies when present: `python3 -m pip install -r mcp-builder/scripts/requirements.txt` or `python3 -m pip install -r slack-gif-creator/requirements.txt`.
- Install Node dependencies when present: `cd unsplash-image-filler/scripts && npm install`.
- Run ad-hoc tests directly: `node unsplash-image-filler/scripts/test_path.js` or `python3 document-skills/pdf/scripts/check_bounding_boxes_test.py`.
If a skill has its own workflow, document the exact commands in that skill’s `SKILL.md`.

## Coding Style & Naming Conventions
Use concise Markdown with clear headings. `SKILL.md` files must start with YAML frontmatter containing `name` and `description`. Use kebab-case for skill directories and the `name` field (for example, `internal-comms`). Keep commands in fenced code blocks and reference paths relative to the repo root.

## Testing Guidelines
Tests are lightweight and co-located with scripts. Prefer `*_test.py` or `test_*.js` naming and place them in the relevant skill’s `scripts/` directory. If a change has no tests, state the manual verification steps in your PR.

## Commit & Pull Request Guidelines
Commit messages follow Conventional Commits, typically `feat:` or `fix:` with an optional scope (for example, `feat(unsplash-image-filler): ...`). PRs should summarize the skills touched, note any new assets/scripts, and include the validation performed (commands run or “not run”).

## Security & Configuration Tips
Do not commit secrets. If a skill needs credentials, use environment variables or a local `.env` inside that skill and document required variables in `SKILL.md`.
