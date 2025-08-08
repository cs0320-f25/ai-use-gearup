Source code for counter and typing mini-projects: https://www.geeksforgeeks.org/typescript/typescript-projects/

# Title

## Getting Started

Setup guide for CoPilot, etc

## Learning the Interface

### Chat, Agentic, Edit

Three different modes, explain the difference, show how to switch between them.

### The Context Window

Brief tutorial of how context works and adding files to the context.

### Right Click Commands

- Explain
- Fix
- Review and comment (this one's really cool!)
- Generate docs
- Generate tests
- Add selection to chat
- Add file to chat

## Using the Interface

For generating docs, tests, debugging, and optimizing, you can do them both by right clicking or by using commands like /doc, /tests, etc. Show how to do both.

### Generating Documentation & Tests

### Fix a bug

### Optimize Code

### Add new functionality

Make the counter go below zero, or have randomized sentences for the tests.

## Building Something New

Learning goals go here! Prompt driven development and stuff.

**Important**: Make sure you're in Agentic mode for this section.

### Step 1: Define the Problem

Start by creating a clear prompt to provide Copilot with a basic understanding of what you want to implement. Make sure to specify:

- The end goal
- The language/infastructure
- The output/input format

For example, if we were building a command line application:
"I want to build a command-line TODO application using Python that allows users to record tasks. Users should be able to edit tasks using commands like 'add', 'delete', and 'complete', and see a summary of tasks."

For our web app, the following should work:
"I want to build a TODO web application using HTML and TypeScript that will allow me to track tasks."

Copilot may begin to code directly after you suggest this. You may need to cut it short to prevent it from continuing.

### Step 2: Clarify the Design

If we were to allow Copilot to dive into implementation, it's likely that the end result won't align with our vision. So next, it's best to clarify the design with the tool you're using. This is a helpful step in any implementation process, even when you're not using AI, as it may reveal gaps in your knowledge.

"Before we begin implementation, let's start clarifying the design. Create a file in the todo directory named docs/design-qs.md. Begin asking me one question at a time about the design of this application. Record my answers in this file."

As Copilot asks you questions, feel free to answer however you please. Cut it short when you feel that it has enough information to begin implemenation, or when the questions get too granular for your liking.
P.S. If you begin getting asked questions you don't understand or questions which seem completely unnecessary, that's probably a sign to move on to the next step

### Optional Step

If you'd like, you may ask Copilot to generate a design summary document based on your conversation for you to read over and edit before continuing.

### Step 4: Create a Prompt Plan

Before beginning with implementation, it's helpful to create a prompt plan. This allows you to break the implementation up into testable steps, allowing you to stay organized and confirm correctness as Copilot develops. TODO: say something here about how if you give an AI agent too much to do at once it totally freaks out so a prompt plan helps with that issue.

NOTE FOR TIM: You can modify this based on what we prioritize as a course! The below one is catered to test-driven development

The prompt plan should include:

- Constraints on scope or complexity (e.g. number of steps)
- The clear end goal with any features it should support
- Emphasis on tests and documentation
- An explanation of how the steps should be logically connected
- Instructions on where to put the result

"Based on the generated [file path] design document, create a prompt plan to guide a LLM to build a simple TODO web application using Typescript, HTML, and CSS. Please keep the plan incremental and focused, avoid unnecessary complexity, anything that would delay getting to a functional product, or too many steps (ideally 4 steps maximum). Make sure each step logically builds upon the previous one. The TODO web application should support adding, updating, and marking tasks as complete. The plan should break the development of this application into small, testable steps. Emphasize writing tests and adding documentation while coding. Write the prompt plan to docs/todo-prompt-plan.md, and for each step, include Goal, Prompt, and optioanl notes."

### Step 5: Build it!

Before you begin, make sure you docs folder is added to Copilot's context window! Then, feed the prompt plan to Copilot step by step. Between steps, read over the code for any quality issues, make sure it compiles, check for errors, and run tests. It will be much easier to debug between each step than at the end of implemenation.

### Optional Step 6: Refine the CSS

If you're building a program that requires CSS, your LLM may struggle to make it look nice. Here's a workaround.

Find a inspiration website. I used [Todoist](https://www.todoist.com/task-management). Screenshot it's page, then paste that screenshot into an AI agent that will read images for free. Copilot should work for this, but ChatGPT and Microsoft Copilot will accomplish it for free as well. Provide it with the following prompt:

"Create a JSON design system that extracts all the visual data from the provided image. Include the style structure and give me autonomy to decide anything else that helps replicate this design perfectly."

If using copilot, I recommend you add "Place the result in design.json".

Then, provide your LLM with this json file and ask it to strictly follow it when implementing the prompt plan.

## References

- [Geeks for Geeks: Top 15 TypeScript Projects With Source Code](https://www.markdownguide.org/basic-syntax/#links)
- [Beyond “Make It Pretty”: How to Prompt AI for Truly Beautiful Website Designs](https://medium.com/@rijuldahiya/beyond-make-it-pretty-how-to-prompt-ai-for-truly-beautiful-website-designs-74ec4c4b859e)
