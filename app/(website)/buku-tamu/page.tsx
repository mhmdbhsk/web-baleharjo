'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createGuestBook } from '@/services/guest-book.services';

export default function GuestBookPage() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      purpose: '',
    },
  });

  async function onSubmit(data: any) {
    try {
      await createGuestBook(data);
      toast.success('Buku tamu berhasil ditambahkan');
      form.reset();
    } catch (error) {
      toast.error('Gagal menambahkan buku tamu');
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">Buku </span>
            Tamu
          </h1>
          <p className="text-gray-600 mt-2">
            Silakan isi buku tamu untuk merekam kunjungan Anda
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tujuan Kunjungan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan tujuan kunjungan"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
