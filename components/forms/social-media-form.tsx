'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SocialMedia } from '@/db/schema';

const formSchema = z.object({
  platform: z.string().min(1, 'Platform harus diisi'),
  url: z.string().url('URL tidak valid'),
  icon: z.string().min(1, 'Icon harus diisi'),
});

export type SocialMediaFormValues = z.infer<typeof formSchema>;

interface SocialMediaFormProps {
  initialData?: SocialMedia | null;
  onSubmit: (values: SocialMediaFormValues) => void;
  isLoading?: boolean;
}

export function SocialMediaForm({
  initialData,
  onSubmit,
  isLoading,
}: SocialMediaFormProps) {
  const form = useForm<SocialMediaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: initialData?.platform || '',
      url: initialData?.url || '',
      icon: initialData?.icon || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama platform" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama icon" {...field} />
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
