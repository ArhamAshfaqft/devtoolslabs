import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CronParserTool from '@/components/tools/CronParserTool';

export const metadata: Metadata = {
  title: 'Cron Job Parser & Explainer (Free Online Tool) | Translate to Text',
  description: 'Instantly translate complex, confusing Linux server cron schedules into easy-to-read human text sentences online in your browser.',
};

export default function CronParserPage() {
  return (
    <ToolLayout
      title="Cron Job Parser & Explainer"
      intro="If you manage Linux servers, CI/CD pipelines, or background Node.js task queues, you are inevitably forced to write crontab schedules. This parser takes complex cron strings (e.g. `*/15 0 1,15 * 1-5`) and translates them into an instantly readable human language description, ensuring your automated tasks trigger exactly when you intend them to."
      toolNode={<CronParserTool />}
      howTo={[
        "Type or paste your raw cron expression consisting of 5 asterisks/numbers into the input box.",
        "The parser instantly processes the math required to translate the syntax.",
        "A large blue human-readable translation (e.g., 'At 22:00, Monday through Friday') will immediately appear.",
        "Click the quick-load example buttons below to learn how wildcards and divisions operate."
      ]}
      examples={[
        {
          input: '0 2 * * 1-5',
          output: 'At 02:00, Monday through Friday'
        },
        {
          input: '*/15 * 1,15 * *',
          output: 'Every 15 minutes, on day 1 and 15 of the month'
        }
      ]}
      useCases={[
        "Validating that a database backup scheduled inside a production Ubuntu crontab is running at 3 AM standard time and not 3 PM.",
        "Verifying the precise syntax required to trigger a GitHub Action workflow daily.",
        "Learning the distinction between commas (lists), hyphens (ranges), and slashes (step values) in cron math."
      ]}
      faqs={[
        {
          question: "What are the 5 parts of a standard cron string?",
          answer: "Reading from left to right, the five fields strictly represent: Minute (0-59), Hour (0-23 in military time), Day of the Month (1-31), Month of the Year (1-12), and Day of the Week (0-6, where 0 is Sunday)."
        },
        {
          question: "What does the asterisk (*) symbol mean?",
          answer: "The asterisk stands for 'first-to-last', representing every possible matching numeric value for that specific field. For instance, an asterisk in the 4th field means the job runs during every single month of the year."
        },
        {
          question: "How do I schedule something to run 'every X minutes'?",
          answer: "You utilize the forward slash division operator (/). To run a script every 15 minutes, you write `*/15` in the very first minute specific field. This translates mathematically to 'run at minute 0, minute 15, minute 30, and minute 45'."
        },
        {
          question: "Why does my cron string throw an 'Invalid syntax' error?",
          answer: "A standard POSIX cron string strictly dictates exactly 5 fields, separated by a single space character. If you provide fewer than five fields, or introduce unexpected alphabetical characters without proper macros, the parser cannot structurally map your schedule."
        },
        {
          question: "Does this parser support advanced 6-part string macros?",
          answer: "While basic Linux crontab structures use 5 parts, highly advanced schedulers (like AWS EventBridge or Quartz) inject a 6th parameter exclusively for the 'Year' constraint. This parser handles standard 5-part representations strictly."
        }
      ]}
      relatedTools={[
        { name: "Regex Replace Tester", url: "/regex-replace" },
        { name: "URL Query Parser", url: "/query-parser" }
      ]}
    />
  );
}
