import Link from 'next/link';

interface CategoryTool {
  badge: string;
  description: string;
  href: string;
  title: string;
}

interface CategoryHubProps {
  intro: string;
  title: string;
  tools: CategoryTool[];
}

export default function CategoryHub({ intro, title, tools }: CategoryHubProps) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <header className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">{title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed">{intro}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="min-w-10 h-10 px-2 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 text-xs font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
                {tool.badge}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{tool.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{tool.description}</p>
            <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800">
              Open {tool.href.startsWith('/guides/') ? 'guide' : 'tool'} <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
