'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useEffect } from 'react';

const formSchema = z.object({
  address: z.string().min(1, 'Alamat harus diisi'),
  phone: z.string().min(1, 'Nomor telepon harus diisi'),
  email: z.string().email('Format email tidak valid'),
  vision: z.string().min(1, 'Visi harus diisi'),
  mission: z.string().min(1, 'Misi harus diisi'),
});

interface ProfileFormProps {
  initialValues?: z.infer<typeof formSchema>;
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export default function ProfileForm({
  initialValues,
  className,
  onSubmit,
  isLoading = false,
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      address: '',
      phone: '',
      email: '',
      vision: '',
      mission: '',
    },
  });

  // Update form when initialValues change
  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof typeof initialValues,
          initialValues[key as keyof typeof initialValues]
        );
      });
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-3 ${className}`}
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan alamat desa"
                  type="text"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Alamat ini akan ditampilkan pada catatan kaki website
              </FormDescription>
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
                <Input
                  placeholder="Masukkan nomor telepon desa"
                  type="tel"
                  disabled={isLoading}
                  {...field}
                />
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
                  placeholder="Masukkan surel desa"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan visi desa"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Misi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan misi desa"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </form>
    </Form>
  );
}
