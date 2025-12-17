export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-primary hover:underline"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {product.images && product.images[0] && (
                <div className="relative h-48">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-lg">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}