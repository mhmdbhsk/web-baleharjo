'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RTDialog } from './rt-dialog';
import { RT } from '@/db/schema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../ui/card';

export function RTManagement() {
  const [open, setOpen] = useState(false);
  const [selectedRT, setSelectedRT] = useState<RT | null>(null);
  const router = useRouter();

  const {
    data: rtList,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rt'],
    queryFn: async () => {
      const res = await fetch('/api/rt');
      if (!res.ok) throw new Error('Failed to fetch RT data');
      return res.json();
    },
  });

  const handleEdit = (rt: RT) => {
    setSelectedRT(rt);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus RT ini?')) {
      try {
        const res = await fetch(`/api/rt/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete RT');

        toast.success('RT berhasil dihapus');
        refetch();
        router.refresh();
      } catch (error) {
        toast.error('Gagal menghapus RT');
        console.error('Error deleting RT:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-2">
        <p className="text-destructive">Gagal memuat data RT</p>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          Coba lagi
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Daftar RT</h2>
          <Button onClick={() => setOpen(true)}>Tambah RT</Button>
        </div>
      </CardHeader>

      <CardContent>
        {rtList?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Belum ada data RT
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor RT</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Ketua RT</TableHead>
                <TableHead>RW</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rtList?.map((rt: any) => (
                <TableRow key={rt.id}>
                  <TableCell>RT {rt.number}</TableCell>
                  <TableCell>{rt.name}</TableCell>
                  <TableCell>{rt.user.name}</TableCell>
                  <TableCell>RW {rt.rw.number}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rt)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(rt.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <RTDialog
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
            if (!open) setSelectedRT(null);
          }}
          data={selectedRT}
          onSuccess={() => {
            setOpen(false);
            setSelectedRT(null);
            refetch();
            router.refresh();
            toast.success(
              selectedRT ? 'RT berhasil diperbarui' : 'RT berhasil ditambahkan'
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
