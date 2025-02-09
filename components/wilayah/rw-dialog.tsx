'use client';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RW } from '@/db/schema';

interface RWDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: RW | null;
  onSuccess: () => void;
}

export function RWDialog({
  open,
  onOpenChange,
  data,
  onSuccess,
}: RWDialogProps) {
  const form = useForm({
    defaultValues: {
      number: data?.number || '',
      name: data?.name || '',
      userId: data?.userId || '',
    },
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users', 'RW'],
    queryFn: async () => {
      const res = await fetch('/api/users?role=RW');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });

  console.log(users?.data, 'ini users');

  const onSubmit = async (values: any) => {
    try {
      const url = data ? `/api/rw/${data.id}` : '/api/rw';
      const method = data ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to save RW');
      onSuccess();
    } catch (error) {
      console.error('Error saving RW:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Edit RW' : 'Tambah RW'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              rules={{ required: 'Nomor RW harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor RW</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: 01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Nama wilayah harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Wilayah</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nama wilayah RW" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              rules={{ required: 'Ketua RW harus dipilih' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ketua RW</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ketua RW" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingUsers ? (
                        <SelectItem value="" disabled>
                          Loading...
                        </SelectItem>
                      ) : users?.data?.length === 0 ? (
                        <SelectItem value="" disabled>
                          Tidak ada pengguna tersedia
                        </SelectItem>
                      ) : (
                        users?.data?.map((user: any) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
