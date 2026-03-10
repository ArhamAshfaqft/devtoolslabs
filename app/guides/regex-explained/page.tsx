import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Regex Explained for Beginners: A Friendly Guide to Regular Expressions | DevToolsLabs',
  description: 'Master the basics of Regular Expressions (Regex). Learn about anchors, character classes, quantifiers, and flags with real-world examples.',
};

export default function RegexGuidePage() {
  return (
    <GuideLayout
      title="Regex Explained for Beginners: A Friendly Guide to Regular Expressions"
      description="Regular Expressions (Regex) can look like a cat walked across a keyboard, but they are incredibly logical once you learn the alphabet. In this guide, we'll break down the most common symbols so you can start writing your own patterns."
      publishDate="March 10, 2026"
      readTime="8 min"
      relatedTools={[
        { name: "Regex Generator", url: "/regex-generator" },
        { name: "Regex Replace Tester", url: "/regex-replace" },
        { name: "Regex Tester", url: "/regex-tester" }
      ]}
    >
      <section>
        <h2>What is Regex?</h2>
        <p>
          A <strong>Regular Expression</strong> is a sequence of characters that forms a search pattern. When you search for data in a text, you can use this search pattern to describe what you are looking for.
        </p>
        <p>
          Think of it as "Find and Replace" on steroids. Instead of searching for a literal word like "apple", you can search for "any word that ends in 'ple' and starts with a vowel".
        </p>
      </section>

      <section>
        <h2>The Basics: Literals and Meta-characters</h2>
        <p>
          The simplest regex is just a literal string. If you search for <code>hello</code>, it will match exactly the text "hello". 
        </p>
        <p>
          The power comes from <strong>meta-characters</strong>. These are characters with special meanings:
        </p>
        <ul>
          <li><code>.</code> (Dot): Matches any single character except newline.</li>
          <li><code>^</code> (Caret): Matches the start of a string.</li>
          <li><code>$</code> (Dollar): Matches the end of a string.</li>
          <li><code>*</code> (Asterisk): Matches 0 or more occurrences of the preceding character.</li>
          <li><code>+</code> (Plus): Matches 1 or more occurrences of the preceding character.</li>
        </ul>
      </section>

      <section>
        <h2>Character Classes: The [ ] Brackets</h2>
        <p>
          Brackets allow you to match a specific set of characters. For example, <code>[aeiou]</code> will match any single vowel.
        </p>
        <p>
          You can also use ranges:
        </p>
        <ul>
          <li><code>[a-z]</code>: Any lowercase letter.</li>
          <li><code>[A-Z]</code>: Any uppercase letter.</li>
          <li><code>[0-9]</code>: Any digit.</li>
        </ul>
      </section>

      <section>
        <h2>Quantifiers: How Many?</h2>
        <p>
          Quantifiers tell Regex how many times a character should appear:
        </p>
        <ul>
          <li><code>?</code>: 0 or 1 time (optional).</li>
          <li><code>{`{n}`}</code>: Exactly n times.</li>
          <li><code>{`{n,}`}</code>: n or more times.</li>
          <li><code>{`{n,m}`}</code>: Between n and m times.</li>
        </ul>
        <pre>{`\\d{3}-\\d{3}-\\d{4}  // Matches a US phone number like 123-456-7890`}</pre>
      </section>

      <section>
        <h2>Common Shorthands</h2>
        <p>
          Developers use these daily to save time:
        </p>
        <ul>
          <li><code>\\d</code>: Any digit (same as <code>[0-9]</code>).</li>
          <li><code>\\w</code>: Any "word character" (letters, numbers, and underscore).</li>
          <li><code>\\s</code>: Any whitespace (spaces, tabs).</li>
          <li><code>\\D</code>: Any NON-digit.</li>
        </ul>
      </section>

      <section>
        <h2>The Common Flags</h2>
        <p>
          Flags change how the whole pattern behaves:
        </p>
        <ul>
          <li><strong>g (Global):</strong> Don't stop at the first match; find all of them.</li>
          <li><strong>i (Case Insensitive):</strong> Ignore whether letters are uppercase or lowercase.</li>
          <li><strong>m (Multiline):</strong> Treat start and end characters (^ and $) as working on every line, not just the whole string.</li>
        </ul>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Regex is a language of its own. It takes practice to read, but once you master these basic building blocks, you'll be able to perform complex data validation and extraction that would take dozens of lines of standard code. 
        </p>
      </section>
    </GuideLayout>
  );
}
