
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { index as indexRoute } from '@/routes/products';

export default function Create() {

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Create Product',
    href: indexRoute().url,
  },
];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Product" />
      <div className="p-4">
        <Link href={indexRoute().url}>
          <Button variant={'outline'} className="border-2 border-primary text-primary">Back to Products</Button>
        </Link>
      </div>
    </AppLayout>
  );
}
