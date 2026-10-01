# Claude skills supplied with linway

Prepared 1 October 2026. Five relevant skills were copied from the existing local Claude installation into `.claude/skills/`. The copies are ordinary project files: they do not depend on symlinks to the original user's home directory. No Claude settings, credentials, conversation history, memory, or account connections were copied.

Claude Code supports project skills in `.claude/skills/<skill-name>/SKILL.md`. Open Claude Code at the **linway project root**, read `docs/CLAUDE.md`, and use `docs/NEXT-WAVE-PROMPT.md` for the current redesign task. `docs/CLAUDE-PROMPT.md` is the historical initial-build brief. For current invocation and discovery behavior, consult [Claude Code's skills documentation](https://code.claude.com/docs/en/skills).

## Selection

| Skill | Files copied | Purpose in linway | When to use |
| --- | ---: | --- | --- |
| [frontend-design](../.claude/skills/frontend-design/SKILL.md) | 2 | Distinctive typography, composition, visual hierarchy, and careful implementation. | During the website build, within linway's documented visual direction. |
| [apple-design](../.claude/skills/apple-design/SKILL.md) | 1 | Responsive feedback, interruptible interactions, comfortable typography, and reduced motion. | For interaction details that actually appear in the design. This does not require an Apple visual theme, translucent surfaces, or complex gestures. |
| [emil-design-eng](../.claude/skills/emil-design-eng/SKILL.md) | 1 | Restraint in animation, purposeful transitions, polished buttons and small interface details. | With a concrete implementation or review task. The skill's greeting-only instruction applies when invoked without a specific question. |
| [vercel-react-best-practices](../.claude/skills/vercel-react-best-practices/SKILL.md) | 76 | React performance reference with its full rule collection. | Only if React components/islands are introduced. The proposed Astro + Markdown site does not need React merely because this skill is available. Ignore Next.js-only rules outside a Next.js application. |
| [web-design-guidelines](../.claude/skills/web-design-guidelines/SKILL.md) | 1 | Final review of accessibility, interaction behavior, and interface details. | Review explicitly named implementation files after they exist. |

The project brief and the user's instructions govern implementation. These skills provide supporting craft guidance; do not combine every visual suggestion into the site or change the selected framework to satisfy a conditional example.

## Provenance and integrity

The installed source paths were `~/.claude/skills/<skill-name>`, each resolving to `~/.agents/skills/<skill-name>`. All **81 source files** were copied without modifying their bytes. The total source size is **296,169 bytes**. Source directories were copied in full, including `frontend-design/LICENSE.txt`, Vercel's `metadata.json`, `README.md`, compiled `AGENTS.md`, and the complete `rules/` directory. License declarations remain as supplied upstream; no additional license grants are implied.

[SOURCES.json](../.claude/skills/SOURCES.json) records each original file's relative path, size, and SHA-256 hash. It is a provenance manifest, not another skill. Verification compared every copied file with its source and confirmed that the project copies contain no symlinks.

## Tool and portability notes

- `frontend-design`, `apple-design`, and `emil-design-eng` are Markdown guidance. Their example libraries and APIs are suggestions, not installed dependencies.
- `web-design-guidelines` instructs Claude to use `WebFetch` to obtain the current [Vercel interface guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) before each review. The copied skill does not contain those remote rules. If network access or a suitable fetch tool is unavailable, report that limitation; do not claim a current-guidelines review was completed.
- `vercel-react-best-practices` can be read locally. Some short relative links in its compiled `AGENTS.md` point to rule filenames without the `rules/` prefix; the corresponding documents are preserved in `rules/`. These pre-existing source links were left intact to preserve the original files. Read individual `rules/*.md` files when following those links.
- The Vercel README's `pnpm build` commands describe maintaining the upstream skill package. They are not linway build commands, and this skill copy does not provide that package's build tooling.
- Some React guidance targets APIs newer than the React 18 dependency in `MyCV/`. Verify the actual target framework and version before using examples. `MyCV/` is a separate reference project, not the linway implementation target.
- Copying a skill does not connect browser extensions, enable MCP servers, install frameworks, or grant access to accounts.

## Deliberately omitted

| Available source skill/group | Reason omitted |
| --- | --- |
| `industrial-brutalist-ui` | Its mechanical/terminal aesthetic is not the proposed editorial CV/blog direction. |
| `redesign-existing-projects` | The planned site is new work under `site/`. `MyCV/` belongs to an existing Achimari streaming site and should remain intact. |
| `graphify` | Repository graph tooling is unnecessary for this small content-first site. |
| `find-skills` | Discovery/install guidance does not improve the delivered website implementation. Relevant skills are already present locally. |
| Synced `built-in-browser`, `chrome-browser`, and `computer-use` | Tied to specific Claude desktop/extension tools and their access flows. The project should use whichever browser tooling is actually available in the implementation session. |
| Synced `docs`, `docx`, `pdf`, `pptx`, `xlsx`, and `google-workspace` | Document and account workflows are outside the website implementation scope. Use the prepared content audit and local source files; add a format skill later only if a separate document task requires it. |
| Synced `deep-research`, `skill-creator`, `import-memory`, and `morning` | Research orchestration, skill authoring, personal memory, and daily briefs are unrelated to this build. |
| `.trash/` | Removed skills are not a source for active project configuration. |

## Existing `MyCV/` project: reuse boundary

A read-only inspection found an independent Git repository, clean on `main...origin/main` at the time of inspection. Its package is `achimari-site`, with React 18, Vite 5, TypeScript 5, Tailwind 3, and Framer Motion 11. `App.tsx` renders an interactive `Room`, and `src/data/site.ts` contains Achimari's Russian streaming biography, social accounts, scenes, and schedule. It includes video backgrounds, music/audio code, and Achimari portrait and social-preview assets.

Those assets and personal details are not Lina's website content. No MyCV files, dependencies, Git metadata, or environment files were changed or copied into the skill setup. Its layout and build setup may be inspected as technical reference, but linway should use its own content and implementation directory. No application tests were run: this task only copied and verified skill/document files.
