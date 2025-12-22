import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
                <li>
                    <Link
                        to="/"
                        className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                        <Home className="w-4 h-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                        {item.href ? (
                            <Link
                                to={item.href}
                                className="text-slate-500 hover:text-blue-400 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-slate-300 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
