import { Button } from '@/components/ui/button';
import { getAllBlogPosts } from '@/lib/db/actions/blog';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="p-4 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
          Berita
        </h1>

        <Link href="/dasbor/berita/buat" className="flex gap-2 items-center">
          <Button size="sm">
            <Plus className="w-5 h-5" />
            Tambah Berita
          </Button>
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4 flex justify-between">
            <div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                By {post.authorName} on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <Link href={`/dasbor/berita/${post.id}`}>
                <Button className="text-sm" size="sm" variant="ghost">
                  Ubah
                </Button>
                <Button
                  className="text-sm"
                  size="sm"
                  variant="ghost"
                  color="red"
                >
                  Hapus
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
