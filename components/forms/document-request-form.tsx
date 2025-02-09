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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  type: z.string().min(1, 'Jenis surat harus diisi'),
  name: z.string().min(1, 'Nama harus diisi'),
  nik: z.string().min(16, 'NIK harus 16 digit').max(16),
  address: z.string().min(1, 'Alamat harus diisi'),
  purpose: z.string().min(1, 'Tujuan harus diisi'),
  description: z.string().optional(),
});

export type DocumentRequestFormValues = z.infer<typeof formSchema>;

interface DocumentRequestFormProps {
  onSubmit: (values: DocumentRequestFormValues) => void;
  isLoading?: boolean;
}

export function DocumentRequestForm({
  onSubmit,
  isLoading,
}: DocumentRequestFormProps) {
  const form = useForm<DocumentRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      name: '',
      nik: '',
      address: '',
      purpose: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Surat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis surat" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SKCK">Surat Pengantar SKCK</SelectItem>
                  <SelectItem value="KTP">Surat Pengantar KTP</SelectItem>
                  <SelectItem value="KK">Surat Pengantar KK</SelectItem>
                  <SelectItem value="DOMISILI">
                    Surat Keterangan Domisili
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan NIK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan alamat" {...field} rows={3} />
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
              <FormLabel>Tujuan</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan tujuan pembuatan surat"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan Tambahan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan keterangan tambahan (opsional)"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Ajukan Permohonan'}
        </Button>
      </form>
    </Form>
  );
}
