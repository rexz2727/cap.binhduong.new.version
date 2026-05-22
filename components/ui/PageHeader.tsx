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
    <div className="page-header">
      <div className="container">
        {breadcrumbs && (
          <nav className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                <span className="sep">›</span>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className="here">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
