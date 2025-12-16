import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

async function getAllProducts() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-gray-600 text-lg">
            Browse our complete collection ({products.length} products)
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-6">
              Our shop is currently empty. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/shop/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-72">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Category */}
                    <div className="mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-xl">
                        ${product.price}
                      </span>
                      {product.stock > 0 ? (
                        <span className="text-green-600 text-sm font-medium">
                          {product.stock} in stock
                        </span>
                      ) : (
                        <span className="text-red-600 text-sm font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Sizes/Colors if available */}
                    {(product.sizes?.length > 0 || product.colors?.length > 0) && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        {product.sizes?.length > 0 && (
                          <div className="text-xs text-gray-500 mb-1">
                            Sizes: {product.sizes.join(', ')}
                          </div>
                        )}
                        {product.colors?.length > 0 && (
                          <div className="text-xs text-gray-500">
                            Colors: {product.colors.join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}