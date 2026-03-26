import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CrontabGuiBuilderTool from '@/components/tools/CrontabGuiBuilderTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crontab GUI Builder | Interactive Cron Expression Generator',
  description: 'Generate, parse, and understand complex Linux cron schedule expressions instantly. Built for DevOps and backend engineers using plain English translations.',
  keywords: ['crontab gui builder', 'cron expression generator', 'cron scheduler online', 'linux cron format parser', 'cron syntax explainer'],
  alternates: {
    canonical: '/crontab-builder',
  },
  openGraph: {
    title: 'Crontab GUI Builder | Interactive Cron Expression Generator',
    description: 'Generate, parse, and understand complex Linux cron schedule expressions instantly. Built for DevOps and backend engineers using plain English translations.',
    url: 'https://devtoolslabs.com/crontab-builder',
  },
};

export default function CrontabGuiBuilderPage() {
  return (
    <ToolLayout
      title="Crontab GUI Builder"
      intro="Linux cron expressions are the industry standard for scheduling background tasks, but their syntax (like `0 0 * * 1-5`) is notoriously difficult to read. Our interactive Crontab GUI Builder solves this by translating standard 5-part cron syntax into plain English instantly. Use the visual matrix to break down complex schedules, edit specific time units, and verify your server automation tasks without risk."
      toolNode={<CrontabGuiBuilderTool />}
      howTo={[
        "Type or paste an existing cron expression into the text input.",
        "Alternatively, use the interactive grid to modify individual components (Minute, Hour, Day).",
        "Hover over any time unit in the grid to highlight its position in the final expression.",
        "Read the plain English translation that generates instantly below the code.",
        "Click one of the Quick Presets to instantly load common automation schedules."
      ]}
      examples={[
        {
          input: "0 0 * * 1-5",
          output: "At 12:00 AM, Monday through Friday"
        },
        {
          input: "*/15 9-17 * * *",
          output: "Every 15 minutes, between 09:00 AM and 05:59 PM"
        }
      ]}
      useCases={[
        "Scheduling database backups to run at midnight using serverless functions.",
        "Debugging why a scheduled email campaign or report isn't firing when expected.",
        "Configuring CI/CD pipeline triggers (like GitHub Actions scheduled workflows).",
        "Translating legacy bash scripts into readable documentation for junior developers."
      ]}
      faqs={[
        {
          question: "What is the standard cron format?",
          answer: "A standard cron expression consists of 5 fields separated by spaces: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12 or JAN-DEC), and Day of Week (0-6 starting Sunday)."
        },
        {
          question: "Does this tool support 6-part cron expressions (with seconds)?",
          answer: "Not currently. This tool is strictly optimized for the standard UNIX/Linux 5-part crontab format, which is the most widely supported standard across cloud providers and Linux distros."
        },
        {
          question: "What does the asterisk (*) mean?",
          answer: "The asterisk is a wildcard that means 'every'. For example, an asterisk in the minute field means the task will run at every single minute."
        },
        {
          question: "What does the slash (/) mean?",
          answer: "The slash specifies step values. For instance, `*/15` in the minute field means 'every 15 minutes' (at 0, 15, 30, and 45)."
        },
        {
          question: "What does the hyphen (-) mean?",
          answer: "The hyphen defines a range. For example, `1-5` in the Day of Week field restricts execution to Monday (1) through Friday (5)."
        },
        {
          question: "Is data sent to your servers to calculate this?",
          answer: "No. The English translation and syntax validation are built on robust AST logic that runs entirely within your browser locally."
        }
      ]}
      relatedTools={[
        { name: "Cron Parser & Explainer", url: "/cron-parser" },
        { name: "DevOps YAML Suite", url: "/yaml-to-json" },
        { name: "Unix Timestamp Converter", url: "/timestamp-converter" }
      ]}
    />
  );
}


