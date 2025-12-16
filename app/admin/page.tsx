import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to Admin Panel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/products/new"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold mb-2">Add Product</h3>
          <p className="text-gray-600">Create a new product listing</p>
        </Link>
        
        <Link
          href="/admin/products"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold mb-2">View Products</h3>
          <p className="text-gray-600">Manage existing products</p>
        </Link>
      </div>
    </div>
  );
}