import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { create, index as indexRoute, destroy as destroyProduct, edit } from '@/routes/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: indexRoute().url,
  },
];

type FlashMessageProps = {
  message?: string;
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}
interface PageProps {
  flash: { message: string; error: string };
  products: Product[];
  [key: string]: unknown;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message }) => {
  const [visible, setVisible] = useState<boolean>(false); // Start as not visible

  useEffect(() => {
    const setupVisibility = async () => {
      let timer: NodeJS.Timeout;

      if (message) {
        // 1. **Crucial Fix:** Set visible to true immediately for the new message
        setVisible(true);

        // 2. Start the timer to hide the message after 10 seconds
        timer = setTimeout(() => {
          setVisible(false);
        }, 10000);
      }

      // Cleanup function: Clear the timeout if the component unmounts or
      // if a new message arrives before the previous one times out.
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    };
    setupVisibility();
  }, [message]); // Rerun this effect whenever 'message' changes

  // Also, hide the component if the message itself is falsy (null or empty string)
  if (!message || !visible) {
    return null; // Return null or an empty fragment/div for better rendering performance
  }

  // Render the message only if 'message' has a value AND 'visible' is true
  return (
    <div className="p-4">
      <Alert className='bg-green-50 p-4 justify-center content-center'>
        <Megaphone />
        <AlertTitle>Notification!</AlertTitle>
        <AlertDescription className="text-sm font-medium text-green-800">
          {message}.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default function Index() {

  const { flash, products } = usePage<PageProps>().props;
  const { processing, delete: destroy } = useForm()

  function handleDelete(id: number, name: string): void {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    // Send a delete request using Inertia
    destroy(destroyProduct(id).url);
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="p-4">
        <Link href={create().url}>
          <Button>Create a Product</Button>
        </Link>
      </div>
      <FlashMessage message={flash.message} />
      {products.length > 0 ? (
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description.substring(0, 60) + "..."}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Link href={edit(product.id).url}>
                      <Button className="bg-warning text-warning-foreground hover:bg-warning/50">Edit</Button>
                    </Link>
                    <Button
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={processing && product.id === product.id}
                    >
                      {processing && product.id === product.id ? <Spinner /> : 'Delete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2)}
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <div className="p-4">No products found.</div>
      )}
    </AppLayout>
  );
}
