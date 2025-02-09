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
import { RT } from '@/db/schema';

interface RTDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: RT | null;
  onSuccess: () => void;
}

export function RTDialog({
  open,
  onOpenChange,
  data,
  onSuccess,
}: RTDialogProps) {
  const form = useForm({
    defaultValues: {
      number: data?.number || '',
      name: data?.name || '',
      userId: data?.userId || '',
      rwId: data?.rwId || '',
    },
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users', 'RT'],
    queryFn: async () => {
      const res = await fetch('/api/users?role=RT');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });

  const { data: rwList, isLoading: isLoadingRW } = useQuery({
    queryKey: ['rw'],
    queryFn: async () => {
      const res = await fetch('/api/rw');
      if (!res.ok) throw new Error('Failed to fetch RW list');
      return res.json();
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const url = data ? `/api/rt/${data.id}` : '/api/rt';
      const method = data ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to save RT');
      onSuccess();
    } catch (error) {
      console.error('Error saving RT:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Edit RT' : 'Tambah RT'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              rules={{ required: 'Nomor RT harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor RT</FormLabel>
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
                    <Input {...field} placeholder="Nama wilayah RT" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rwId"
              rules={{ required: 'RW harus dipilih' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih RW" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingRW ? (
                        <SelectItem value="" disabled>
                          Loading...
                        </SelectItem>
                      ) : rwList?.length === 0 ? (
                        <SelectItem value="" disabled>
                          Tidak ada RW tersedia
                        </SelectItem>
                      ) : (
                        rwList?.map((rw: any) => (
                          <SelectItem key={rw.id} value={rw.id}>
                            RW {rw.number} - {rw.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              rules={{ required: 'Ketua RT harus dipilih' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ketua RT</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ketua RT" />
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
