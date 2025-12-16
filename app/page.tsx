import Image from 'next/image';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

async function getFeaturedProducts() {
  await connectDB();
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Discover Amazing Products
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Shop the latest trends and timeless classics. 
                Quality products at unbeatable prices.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-hover transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
            </div>

            {/* Right: Hero Image */}
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src="/hero-image.jpg"
                alt="Hero"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Products
            </h2>
            <p className="text-gray-600 text-lg">
              Check out our newest arrivals
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products available yet</p>
              <Link href="/admin/products/new" className="text-primary hover:underline">
                Add your first product (Admin)
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/shop/${product._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-64">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold text-xl">
                          ${product.price}
                        </span>
                        {product.stock > 0 ? (
                          <span className="text-green-600 text-sm">In Stock</span>
                        ) : (
                          <span className="text-red-600 text-sm">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}