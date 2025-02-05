import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function BlogPage() {
  return (
    <section>
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

      {/* <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4 flex justify-between">
            <div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                By {post.authorName} on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Link href={`/dasbor/berita/${post.id}`}>
                <Button size="sm" variant="outline">
                  <Pencil className="w-2 h-2" />
                  Ubah
                </Button>
              </Link>
              <Link href={`/dasbor/berita/${post.id}`}>
                <Button size="sm" variant="outline" color="red">
                  <Trash className="w-2 h-2" />
                  Hapus
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul> */}
    </section>
  );
}
