KeyNav UI Kit

A small, production-style React application demonstrating accessible keyboard navigation patterns and focus management techniques commonly used in modern web apps.

The project is designed as an interactive playground to showcase how components behave when used with a keyboard and assistive technologies, emphasizing usability, accessibility, and real-world UX patterns.

✨ Features
🔹 Keyboard-First Interaction

Full tab navigation across the interface

Visible focus indicators

Logical tab order

Skip-to-content link

🔹 Accessible Components

Dropdown Menu

Enter / Space to open

Arrow key navigation

Typeahead support

Escape to close

ARIA Tabs

ArrowLeft / ArrowRight navigation

Home / End shortcuts

Proper roles and relationships

Modal Dialog

Focus trap

Escape to close

Focus restoration

🔹 Focus Playground

A section with inputs, links, and buttons to test keyboard navigation behavior and focus styles in a controlled environment.

🔹 Accessibility Tooling

ESLint with jsx-a11y rules to enforce accessible patterns

Semantic HTML and ARIA attributes

🧠 Purpose

This project was built to:

Practice implementing WAI-ARIA patterns

Demonstrate focus management techniques

Explore keyboard interaction design

Serve as a portfolio piece highlighting accessibility skills

🛠 Tech Stack

React

Vite

Tailwind CSS

JavaScript (ES6+)

ESLint + jsx-a11y

🚀 Getting Started
1. Clone the repository
git clone <your-repo-url>
cd keynav-ui-kit

2. Install dependencies
npm install

3. Start the development server
npm run dev

How to Use

Try navigating the app without using a mouse:

Press Tab to move between elements

Use Enter / Space to activate controls

Use Arrow keys inside dropdowns and tabs

Press Esc to close menus and dialogs

This project is intentionally designed to be explored using keyboard navigation.

🧪 Accessibility Considerations

The implementation focuses on:

Proper ARIA roles and states

Focus trapping for overlays

Restoring focus after closing dialogs

Avoiding keyboard traps

Clear visual focus indicators

Semantic HTML where possible

📚 Learning Outcomes

While building this project, the following concepts were explored:

Roving tab index

Focus management

Menu button pattern

Dialog accessibility

Keyboard event handling

Component-level accessibility testing

📌 Future Improvements

Potential enhancements include:

Automated keyboard interaction tests

Additional components (combobox, command palette)

Accessibility score integration

Design system extraction

📄 License

This project is for educational and portfolio purposes.
