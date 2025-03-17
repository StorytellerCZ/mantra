# Mantra AI Editor Rules

This directory contains rule sets for AI-powered code editors like Cursor, GitHub Copilot, and other LLM-based coding assistants. These rules help the AI understand the Mantra architecture and provide better suggestions and completions when working on Mantra applications.

## Available Rule Sets

- [cursor-react.md](./cursor-react.md) - Rules for Cursor AI when working with Mantra + React
- [cursor-solid.md](./cursor-solid.md) - Rules for Cursor AI when working with Mantra + Solid.js
- [windsurf-react.md](./windsurf-react.md) - Rules for Windsurf agentic IDE when working with Mantra + React
- [windsurf-solid.md](./windsurf-solid.md) - Rules for Windsurf agentic IDE when working with Mantra + Solid.js
- [copilot-hints.md](./copilot-hints.md) - Hints and patterns for GitHub Copilot when working with Mantra
- [chatgpt-claude-prompts.md](./chatgpt-claude-prompts.md) - Effective prompts for ChatGPT, Claude, and other conversational AI assistants

## How to Use

### For Cursor AI

1. Open your Mantra project in Cursor
2. Copy the content of the appropriate rules file (React or Solid)
3. Use the `/rules` command in Cursor to paste the rules
4. Cursor will now use these rules to provide better suggestions for your Mantra project

Alternatively, you can create a `.cursor/rules.md` file in your project root and paste the rules there. Cursor will automatically load these rules when you open the project.

### For Windsurf

1. Open your Mantra project in Windsurf
2. Copy the content of the appropriate rules file (`windsurf-react.md` or `windsurf-solid.md`)
3. Use the AI Flow panel to instruct Cascade to use these rules
4. Windsurf's Cascade will now use these rules to provide better assistance for your Mantra project

### For GitHub Copilot

1. Keep the `copilot-hints.md` file open in a split view while working on your Mantra project
2. Copy relevant sections into your code as comments when starting new files
3. Use the examples as templates for your own components, containers, and actions
4. Reference the patterns and guidelines when asking Copilot to generate code

### For ChatGPT, Claude, and Other Conversational AI

1. Refer to `chatgpt-claude-prompts.md` for effective prompts when asking for help
2. Copy and customize the prompts based on your specific needs
3. Include relevant context and code snippets in your prompts

### For Other AI Editors

While these rules are formatted specifically for certain AI tools, the concepts and patterns can be adapted for other AI-powered editors. You can:

1. Extract the key principles and patterns from these rules
2. Format them according to your AI editor's requirements
3. Load them into your editor

## Customizing Rules

Feel free to customize these rules to match your specific project requirements. You might want to:

- Add rules specific to your project's architecture
- Modify existing rules to match your team's coding style
- Add examples from your own codebase
- Include references to your internal documentation

## Contributing

If you have improvements or additions to these rules, please submit a pull request or open an issue in the Mantra repository.

## References

- [Mantra Specification](https://github.com/StorytellerCZ/mantra)
- [Cursor AI Documentation](https://cursor.sh/docs/rules)
- [FlowRouter Documentation](https://github.com/zodern/flow-router-extra)
- [Meteor Documentation](https://docs.meteor.com/)
- [React Documentation](https://react.dev/)
- [Solid.js Documentation](https://www.solidjs.com/docs/latest/)
