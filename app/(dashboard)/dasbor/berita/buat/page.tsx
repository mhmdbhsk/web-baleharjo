'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SettingsProvider } from '@/components/editor/settings';
import { PlateEditor as CustomEditor } from '@/components/editor/plate-editor';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSlug } from '@/lib/utils';
import axios from 'axios';

const formSchema = z.object({
  title: z.string().nonempty('Judul wajib diisi'),
  slug: z.string().nonempty('Slug wajib diisi'),
  content: z.string().nonempty('Konten wajib diisi'),
});

export default function CreateBlogPost() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.title || !values.content || !values.slug) {
      return;
    }

    try {
      const result = await axios
        .post('/api/blog', values)
        .then((res) => res.data);
      toast.success(result);
      router.push('/dasbor/berita');
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan berita');
    }
  };

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     console.log(values);
  //     toast(
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     );
  //   } catch (error) {
  //     console.error('Form submission error', error);
  //     toast.error('Failed to submit the form. Please try again.');
  //   }
  // }

  return (
    <section className="p-4 lg:p-8">
      <div>
        <Link href="/dasbor/berita" passHref>
          <Button variant="outline" className="text-sm flex w-max items-center">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>
      </div>
      <div className="flex w-full justify-between items-center my-4">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
          Tambah Berita Baru
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan judul berita"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Slug akan terisi otomatis dari judul"
                    type="text"
                    {...field}
                    value={
                      form.watch('title')
                        ? generateSlug(form.watch('title'))
                        : ''
                    }
                  />
                </FormControl>

                <FormDescription>
                  Slug akan digunakan untuk membuat URL berita
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className="h-screen w-full border rounded-lg"
            data-registry="plate"
          >
            <SettingsProvider>
              <CustomEditor
                content={form.watch('content')}
                setContent={(value) => form.setValue('content', value)}
              />
            </SettingsProvider>
          </div>

          <Button type="submit" className="mt-4">
            Publish
          </Button>
        </form>
      </Form>
    </section>
  );
}
