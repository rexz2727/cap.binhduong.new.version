import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  description?: string;
}

export default function PageHeader({ title, breadcrumbs, description }: PageHeaderProps) {
  return (
    <div className="bg-gray-50 border-b py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {breadcrumbs && (
          <nav className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Link href="/" className="hover:text-police-red">Trang chủ</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-police-red">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-800">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-police-navy">{title}</h1>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>
    </div>
  );
}
