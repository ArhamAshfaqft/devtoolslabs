import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Advanced React Design Patterns & JSX Best Practices | DevToolsLabs',
  description: 'Master the transition from HTML to React. Learn JSX best practices, attribute mapping, inline style handling, and advanced architecture patterns for modern web apps.',
};

export default function ReactJsxGuidePage() {
  return (
    <GuideLayout
      title="Advanced React Design Patterns & JSX Best Practices"
      description="Modern web development shifted from vanilla HTML to JSX-driven components. This guide covers the essential patterns for migrating legacy sites and writing high-performance, clean React code."
      publishDate="March 15, 2026"
      readTime="8 min"
      relatedTools={[
        { name: "HTML to JSX Converter", url: "/html-to-jsx" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "CSS Minifier", url: "/css-minifier" }
      ]}
    >
      <section>
        <h2>Why JSX? Moving Beyond Vanilla HTML</h2>
        <p>
          In traditional web development, HTML, CSS, and JavaScript lived in separate silos. **JSX (JavaScript XML)** changed this by allowing you to write your UI structure directly within your logic. While at first it looks like "HTML in JavaScript," it is actually a powerful syntax extension that compiles down to <code>React.createElement</code> calls.
        </p>
        <p>
          The primary benefit? **Declarative UI.** Instead of navigating the DOM manually, you describe what the UI should look like based on the current state.
        </p>
      </section>

      <section>
        <h2>1. The Attribute Mapping Rulebook</h2>
        <p>
          Because JSX is closer to JavaScript than HTML, it uses <strong>camelCase</strong> for almost all attributes. If you're coming from vanilla HTML, there are two "Big Ones" you must change immediately:
        </p>
        <ul>
          <li><strong><code>class</code> → <code>className</code></strong>: Since 'class' is a reserved keyword in JS for creating class objects, React uses <code>className</code> for CSS styles.</li>
          <li><strong><code>for</code> → <code>htmlFor</code></strong>: 'for' is reserved for loops. Use <code>htmlFor</code> to link labels to input IDs.</li>
        </ul>
        <pre>{`<label htmlFor="user-email">Email:</label>\n<input type="email" className="input-primary" id="user-email" />`}</pre>
      </section>

      <section>
        <h2>2. Handling Inline Styles as Objects</h2>
        <p>
          In HTML, styles are strings (<code>style="color: red"</code>). In JSX, they are <strong>JavaScript Objects</strong>. This means you use double curly braces: one for the JS expression and one for the object literal itself.
        </p>
        <p>
            Properties are also camelCased (e.g., <code>background-color</code> becomes <code>backgroundColor</code>).
        </p>
        <blockquote>
          <strong>Pro Tip:</strong> Only use inline styles for dynamic values (like positioning based on mouse movements). For static styles, always prefer standard CSS classes or Tailwind utility classes for better performance.
        </blockquote>
      </section>

      <section>
        <h2>3. Fragments: Preventing "Div Soup"</h2>
        <p>
          React components must return a single root element. Developers often wrap everything in a <code>&lt;div&gt;</code>, which can break CSS layouts (like Flexbox) and bloat the DOM.
        </p>
        <p>
          Enter <strong>Fragments</strong>. They allow you to group list items without adding extra nodes to the DOM.
        </p>
        <pre>{`return (\n  <>\n    <h1>Title</h1>\n    <p>Subtitle</p>\n  </>\n);`}</pre>
      </section>

      <section>
        <h2>4. The Self-Closing Tag Strictness</h2>
        <p>
          In HTML, you can leave tags like <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, and <code>&lt;input&gt;</code> open. In JSX, this is a syntax error. <strong>Every tag must be closed.</strong>
        </p>
        <p>
            Always add a trailing slash to void elements: <code>&lt;img src="..." /&gt;</code>.
        </p>
      </section>

      <section>
        <h2>5. Conditional Rendering Best Practices</h2>
        <p>
          Since JSX is JavaScript, you can use logical operators to show or hide UI elements.
        </p>
        <ul>
          <li><strong>Logical AND (<code>&&</code>)</strong>: Use for "If this, then that" logic.</li>
          <li><strong>Ternary Operator (<code>? :</code>)</strong>: Use for "If this, then A, else B" logic.</li>
        </ul>
        <p>
            <em>Avoid</em> complex nested ternaries; instead, extract them into small, descriptive helper functions within your component.
        </p>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Migrating to React isn't just about changing syntax—it's about thinking in components. By mastering these JSX basics, avoid common pitfalls like illegal attributes and unclosed tags, you ensure your codebase remains efficient, readable, and production-ready.
        </p>
      </section>
    </GuideLayout>
  );
}
