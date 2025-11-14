
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { edit, index as indexRoute, update } from '@/routes/products';
import { AlertCircleIcon, MoveLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
};

interface PageProps {
  product: Product;
}

export default function Edit({ product }: PageProps) {

  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);
    put(update(product.id).url, {
      onError: (error) => {
        console.log('Error creating product:', error);
      }
    });
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Edit Product',
      href: edit(product.id).url,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Product" />
      <div className="p-4">
        <Link href={indexRoute().url}>
          <Button
            variant={'outline'}
            className="border-2 border-primary text-primary hover:border-0"
          >
            <MoveLeft />
            Back to Products
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <Card className="items-center bg-background mt-6 w-md max-w-sm md:max-w-2xl lg:max-w-4xl">
            <CardContent className="flex flex-col w-full">
              {/* display errors */}
              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive" className="mb-6 bg-destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Unable to create product.</AlertTitle>
                  <AlertDescription>
                    <p>Please fix these errors and try again.</p>
                    <ul className="list-inside list-disc text-sm">
                      {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>{message}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <form className="space-y-4 self-center w-sm w-max-8/10" onSubmitCapture={handleSubmit} >
                {/* Form fields for creating a product */}
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    type="text" id="name" name="name" placeholder='E.g. iPhone 13' value={data.name}
                    onChange={e => setData('name', e.target.value)} required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description" name="description" placeholder='E.g. Latest Apple iPhone'
                    value={data.description} onChange={e => setData('description', e.target.value)} required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number" id="price" name="price" placeholder='E.g. 999'
                    value={data.price} onChange={e => setData('price', e.target.value)} required
                  />
                </div>
                <Button
                  type="submit"
                  className='w-full'
                  disabled={processing}
                >
                  {processing ? <Spinner /> : 'Create Product'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
