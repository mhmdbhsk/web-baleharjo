'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>('');
  const router = useRouter();
  const id = (await params).id;
  // const post = await getBlogPostById(id);

  const handleSave = async () => {
    router.push('/dasbor/blog');
  };

  if (!title) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
        Edit Post
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Post Title"
        />
      </div>

      {/* <PlateEditor content={content} setContent={setContent} /> */}

      <div className="mt-4">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </section>
  );
}
