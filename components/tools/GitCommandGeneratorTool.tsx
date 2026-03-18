"use client";

import React, { useState } from 'react';

type GitCategory = 'Undo & Reset' | 'Branching' | 'Stashing' | 'History' | 'Sync & Push';

interface GitScenario {
  title: string;
  description: string;
  command: string;
  flags: { name: string; description: string }[];
}

const GIT_DATA: Record<GitCategory, GitScenario[]> = {
  'Undo & Reset': [
    {
      title: 'Undo the last commit (keep files)',
      description: 'Undoes the last commit but keeps all your changed files staged and ready in your working directory.',
      command: 'git reset --soft HEAD~1',
      flags: [
        { name: '--soft', description: 'Leaves the working directory and index (staging area) untouched.' },
        { name: 'HEAD~1', description: 'Moves the current branch pointer backward by 1 commit.' }
      ]
    },
    {
      title: 'Nuke last commit (lose files)',
      description: 'DANGEROUS: Completely deletes your last commit AND wipes out all file changes you made.',
      command: 'git reset --hard HEAD~1',
      flags: [
        { name: '--hard', description: 'Resets the index and working tree. Any changes to tracked files are discarded.' }
      ]
    },
    {
      title: 'Discard all uncommitted local changes',
      description: 'Wipes out any modifications you have made to tracked files since your last commit.',
      command: 'git restore .',
      flags: [
        { name: '.', description: 'Targets all files in the current directory and subdirectories.' }
      ]
    },
    {
      title: 'Change the last commit message',
      description: 'Opens your editor to let you fix a typo in the most recent commit message.',
      command: 'git commit --amend',
      flags: [
        { name: '--amend', description: 'Replaces the tip of the current branch by creating a new commit.' }
      ]
    }
  ],
  'Branching': [
    {
      title: 'Create and switch to a new branch',
      description: 'The fastest way to spin up a new feature branch and move into it immediately.',
      command: 'git checkout -b <branch-name>',
      flags: [
        { name: '-b', description: 'Creates the branch before passing it to checkout.' }
      ]
    },
    {
      title: 'Delete a local branch safely',
      description: 'Deletes a branch, but only if it has already been fully merged directly upstream.',
      command: 'git branch -d <branch-name>',
      flags: [
        { name: '-d', description: 'Safe delete. Fails if the branch has unmerged changes.' }
      ]
    },
    {
      title: 'Force delete a local branch',
      description: 'DANGEROUS: Deletes a branch immediately, even if it contains unmerged work.',
      command: 'git branch -D <branch-name>',
      flags: [
        { name: '-D', description: 'Shortcut for --delete --force.' }
      ]
    },
    {
      title: 'Rename current branch',
      description: 'Changes the name of the branch you are currently on.',
      command: 'git branch -m <new-name>',
      flags: [
        { name: '-m', description: 'Move/rename a branch.' }
      ]
    }
  ],
  'Stashing': [
    {
      title: 'Stash all current changes',
      description: 'Saves your uncommitted changes in a temporary stack so you can switch branches cleanly.',
      command: 'git stash save "message describing work"',
      flags: [
        { name: 'save', description: 'Saves the stash with an optional descriptive message.' }
      ]
    },
    {
      title: 'Apply last stash and keep it',
      description: 'Applies the most recent stash to your working directory but leaves the stash saved in the history.',
      command: 'git stash apply',
      flags: []
    },
    {
      title: 'Apply last stash and delete it',
      description: 'Applies the most recent stash, and if successful, removes it from your stash list.',
      command: 'git stash pop',
      flags: []
    },
    {
      title: 'Stash ignoring untracked files',
      description: 'Stashes only tracked files, leaving newly created (untracked) files in your working directory.',
      command: 'git stash -u',
      flags: [
        { name: '-u', description: '--include-untracked. Stashes all files, even those not added to git yet.' }
      ]
    }
  ],
  'History': [
    {
      title: 'View beautiful graph log',
      description: 'Shows a highly readable, compact, colorized visual graph of your branch history.',
      command: 'git log --graph --oneline --all --decorate',
      flags: [
        { name: '--graph', description: 'Draws a text-based graphical representation.' },
        { name: '--oneline', description: 'Condenses each commit to a single line.' },
        { name: '--all', description: 'Shows all branches, not just the current one.' }
      ]
    },
    {
      title: 'Search commits by text',
      description: 'Searches the entire commit history for a specific word or phrase in the commit messages.',
      command: 'git log --grep="<search-term>"',
      flags: [
        { name: '--grep', description: 'Limits the commits output to ones with messages that match the specified pattern.' }
      ]
    },
    {
      title: 'Search commits by author',
      description: 'Filters the history to only show commits made by a specific person.',
      command: 'git log --author="<name-or-email>"',
      flags: [
        { name: '--author', description: 'Limits the commits output to ones with author matching the pattern.' }
      ]
    }
  ],
  'Sync & Push': [
    {
      title: 'Force push safely',
      description: 'Overwrites the remote branch, but safely aborts if a teammate has pushed new commits you do not have.',
      command: 'git push --force-with-lease',
      flags: [
        { name: '--force-with-lease', description: 'A safer version of --force. It checks that your local tracking branch matches the remote before overwriting.' }
      ]
    },
    {
      title: 'Fetch and prune dead branches',
      description: 'Fetches the latest updates from the remote and deletes any local tracking branches that no longer exist on the server.',
      command: 'git fetch --prune',
      flags: [
        { name: '--prune', description: 'Removes local references to remote branches that have been deleted downstream.' }
      ]
    },
    {
      title: 'Push a new local branch to remote',
      description: 'Pushes your newly created branch to the server and sets it to track future pushes automatically.',
      command: 'git push -u origin <branch-name>',
      flags: [
        { name: '-u', description: '--set-upstream. Adds origin as the default upstream remote for this branch.' }
      ]
    }
  ]
};

export default function GitCommandGeneratorTool() {
  const categories = Object.keys(GIT_DATA) as GitCategory[];
  const [activeCategory, setActiveCategory] = useState<GitCategory>('Undo & Reset');
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);

  const activeScenario = GIT_DATA[activeCategory][activeScenarioIndex];

  const handleCategoryChange = (cat: GitCategory) => {
    setActiveCategory(cat);
    setActiveScenarioIndex(0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeScenario.command);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
      
      {/* Left Sidebar: Categories and Scenarios */}
      <div className="w-full lg:w-1/3 space-y-6">
        {/* Category Selector */}
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scenario List */}
        <div className="flex flex-col gap-2">
          {GIT_DATA[activeCategory].map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScenarioIndex(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                activeScenarioIndex === idx
                  ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-500'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <h4 className={`font-bold text-sm ${activeScenarioIndex === idx ? 'text-blue-900' : 'text-gray-800'}`}>
                {scenario.title}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Command Display */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-xl flex-grow flex flex-col">
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white leading-tight pr-4">
              {activeScenario.title}
            </h3>
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
              Copy
            </button>
          </div>

          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            {activeScenario.description}
          </p>

          <div className="bg-black/50 border border-gray-800 p-6 rounded-xl relative group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl opacity-50"></div>
             <p className="font-mono text-lg text-green-400 font-medium">
               <span className="text-gray-600 select-none mr-3">$</span>
               {activeScenario.command}
             </p>
          </div>

          {activeScenario.flags.length > 0 && (
             <div className="mt-8">
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Command Breakdown</h4>
               <ul className="space-y-3">
                 {activeScenario.flags.map((flag, idx) => (
                    <li key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-l-2 border-gray-800 pl-4 py-1">
                      <code className="text-blue-400 font-mono text-sm font-bold bg-blue-900/20 px-1.5 py-0.5 rounded flex-shrink-0 block w-max">
                        {flag.name}
                      </code>
                      <span className="text-gray-400 text-sm leading-relaxed block">
                        {flag.description}
                      </span>
                    </li>
                 ))}
               </ul>
             </div>
          )}

        </div>
      </div>

    </div>
  );
}
