import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import ChmodCalculatorTool from '@/components/tools/ChmodCalculatorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chmod Calculator | Linux File Permissions Generator (755, 644)',
  description: 'Visually calculate Linux UNIX file permissions. Convert Read, Write, and Execute checkboxes into octal values, symbolic strings, and ready-to-copy chmod terminal commands.',
  keywords: ['chmod calculator', 'linux permissions generator', 'file permission calculator', '755 permission', '644 permission', 'chmod command generator'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/chmod-calculator',
  },
};

export default function ChmodCalculatorPage() {
  return (
    <ToolLayout
      title="Chmod Permissions Calculator"
      intro="Managing Linux server file permissions via the command line can be error-prone if you don't perfectly memorize the Read (4) + Write (2) + Execute (1) octal mathematics. The Chmod Calculator is an interactive, visual utility for sysadmins and developers to safely construct permissions. Check the boxes corresponding to what the Owner, Group, and Public users should be allowed to do, and grab the exact `chmod` terminal command instantly."
      toolNode={<ChmodCalculatorTool />}
      howTo={[
        "Select the 'Read', 'Write', or 'Execute' checkboxes under the 'Owner' column to set the file owner's permissions.",
        "Repeat the process for the 'Group' (users in the same system group) and 'Public' (everyone else on the system).",
        "The tool will instantly calculate the 3-digit Octal Notation (e.g., 755).",
        "It will also generate the Symbolic Notation (e.g., -rwxr-xr-x) which is what you see when you run `ls -la` in the terminal.",
        "Click the 'Copy' button on the Linux Command bar to quickly run the modification on your server."
      ]}
      examples={[
        {
          input: "Standard Web Server Directory (Owner: All, Group/Public: Read/Execute)",
          output: "chmod 755 /var/www/html\nSymbolic: -rwxr-xr-x"
        },
        {
          input: "Private SSH Key (Owner: Read/Write, Group/Public: Nothing)",
          output: "chmod 600 ~/.ssh/id_rsa\nSymbolic: -rw-------"
        }
      ]}
      useCases={[
        "Securing SSH keys by deploying the strict `600` integer permission to prevent critical warning errors from the ssh daemon.",
        "Configuring web application directories correctly (`755` for folders, `644` for flat files) to prevent unauthorized hacking access.",
        "Making a standalone shell script executable (`chmod 744 script.sh`) so the owner can run it from the command line."
      ]}
      faqs={[
        {
          question: "How is the Octal number calculated mathematically?",
          answer: "It is a simple addition of powers of 2 for each permission tier. Read = 4, Write = 2, Execute = 1. If an Owner has Read and Execute, you add 4 + 1 to get '5' for the first digit. A full 7 means `4 + 2 + 1` (All permissions)."
        },
        {
          question: "What does the 777 permission mean?",
          answer: "`777` grants complete Read, Write, and Execute control to every single user on the server system. It is notoriously dangerous and is highly discouraged in production environments, as any compromised user can alter or delete the file."
        },
        {
          question: "What is the difference between chmod and chown?",
          answer: "`chmod` (Change Mode) alters *what* actions can be performed on a file (reading, writing, executing). `chown` (Change Owner) alters *who* internally owns the file. Modifying chmod rules without holding ownership requires `sudo` privileges."
        },
        {
          question: "Can I type the Octal number directly?",
          answer: "Yes, our interactive tool runs in both directions! If you paste '644' directly into the Octal Notation input box, the checkboxes above will instantly update to visually reflect those permissions."
        }
      ]}
      relatedTools={[
        { name: "SSH URL Encoder", url: "/url-encoder" },
        { name: "Git Command Generator", url: "/git-command-generator" },
        { name: "Cron Expression Hub", url: "/crontab-builder" }
      ]}
    />
  );
}
