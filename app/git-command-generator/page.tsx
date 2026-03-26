import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import GitCommandGeneratorTool from '@/components/tools/GitCommandGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Git Command Generator | Interactive Cheatsheet & Builder',
  description: 'Visually generate complex Git commands for rebasing, squashing, undoing commits, and safe pushing. Stop memorizing Git syntax and use our interactive builder.',
  keywords: ['git command generator', 'git cheatsheet online', 'how to undo last commit', 'git rebase generator', 'interactive git commands'],
  alternates: {
    canonical: '/git-command-generator',
  },
  openGraph: {
    title: 'Git Command Generator | Interactive Cheatsheet & Builder',
    description: 'Visually generate complex Git commands for rebasing, squashing, undoing commits, and safe pushing. Stop memorizing Git syntax and use our interactive builder.',
    url: 'https://devtoolslabs.com/git-command-generator',
  },
};

export default function GitCommandGeneratorPage() {
  return (
    <ToolLayout
      title="Git Command Generator"
      intro="Git is wildly powerful, but memorizing exactly how to undo a commit, drop a stash, or safely force-push can be nerve-wracking. A simple typo can wipe out hours of work. Our **Interactive Git Command Generator** removes the risk. Select exactly what you want to achieve in plain English, and the tool will generate the exact, safe terminal command along with a detailed breakdown of what every flag does."
      toolNode={<GitCommandGeneratorTool />}
      howTo={[
        "Select an operation category from the tabs on the left (e.g., 'Undo & Reset', 'Branching').",
        "Choose the specific scenario you want to achieve from the list.",
        "Read the plain English description to ensure this command does exactly what you expect.",
        "Copy the generated terminal command.",
        "Review the 'Command Breakdown' below to learn exactly what flags like `--force-with-lease` or `--soft` are doing."
      ]}
      examples={[
        {
          input: "Undo the last commit (keep files)",
          output: "git reset --soft HEAD~1"
        },
        {
          input: "Force push safely (abort if team updated)",
          output: "git push --force-with-lease"
        }
      ]}
      useCases={[
        "Undoing a premature commit without losing the code changes you just wrote.",
        "Cleaning up local branches that have already been deleted from the remote server.",
        "Generating beautiful visual command-line graphs of your project's history.",
        "Safely force-pushing a rebased branch without accidentally overwriting a coworker's commits."
      ]}
      faqs={[
        {
          question: "What is the difference between git reset --soft and --hard?",
          answer: "`--soft` moves the commit pointer back but keeps all your changed files exactly as they are in your editor. `--hard` moves the pointer back AND deletes all changes you made to tracked files, resetting them strictly to the previous state. Always use `--soft` unless you explicitly want to throw away your code."
        },
        {
          question: "Why should I use --force-with-lease instead of --force?",
          answer: "`--force` blindly overwrites the remote server branch. If a coworker pushed code 5 minutes ago, `--force` will delete their work. `--force-with-lease` checks the server first; if the server has commits you haven't fetched yet, it will safely abort the push."
        },
        {
          question: "How do I exit Vim if git commit --amend opens it?",
          answer: "If Git forces you into the Vim text editor and you are stuck, type `:q!` and press Enter to quit without saving, or type `:wq` and press Enter to save your new commit message and exit."
        },
        {
          question: "Does git restore delete new files?",
          answer: "No. `git restore .` only resets changes to files that Git is already tracking. If you created a brand new file (untracked), `restore` will leave it alone. To delete untracked files, you need `git clean -fd`."
        }
      ]}
      relatedTools={[
        { name: "Crontab GUI Builder", url: "/crontab-builder" },
        { name: "Cron Explainer", url: "/cron-parser" },
        { name: "cURL to Fetch", url: "/curl-to-fetch" }
      ]}
    />
  );
}


