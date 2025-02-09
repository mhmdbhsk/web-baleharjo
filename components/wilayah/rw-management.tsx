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
import { RWDialog } from './rw-dialog';
import { RW } from '@/db/schema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../ui/card';

export function RWManagement() {
  const [open, setOpen] = useState(false);
  const [selectedRW, setSelectedRW] = useState<RW | null>(null);
  const router = useRouter();

  const {
    data: rwList,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rw'],
    queryFn: async () => {
      const res = await fetch('/api/rw');
      if (!res.ok) throw new Error('Failed to fetch RW data');
      return res.json();
    },
  });

  const handleEdit = (rw: RW) => {
    setSelectedRW(rw);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus RW ini?')) {
      try {
        const res = await fetch(`/api/rw/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete RW');

        toast.success('RW berhasil dihapus');
        refetch();
        router.refresh();
      } catch (error) {
        toast.error('Gagal menghapus RW');
        console.error('Error deleting RW:', error);
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
        <p className="text-destructive">Gagal memuat data RW</p>
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
          <h2 className="text-lg font-medium">Daftar RW</h2>
          <Button onClick={() => setOpen(true)}>Tambah RW</Button>
        </div>
      </CardHeader>

      <CardContent>
        {rwList?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Belum ada data RW
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nomor RW</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Ketua RW</TableHead>
                <TableHead>Jumlah RT</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rwList?.map((rw: any) => (
                <TableRow key={rw.id}>
                  <TableCell>RW {rw.number}</TableCell>
                  <TableCell>{rw.name}</TableCell>
                  <TableCell>{rw.user.name}</TableCell>
                  <TableCell>{rw.rts?.length || 0}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rw)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(rw.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <RWDialog
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
            if (!open) setSelectedRW(null);
          }}
          data={selectedRW}
          onSuccess={() => {
            setOpen(false);
            setSelectedRW(null);
            refetch();
            router.refresh();
            toast.success(
              selectedRW ? 'RW berhasil diperbarui' : 'RW berhasil ditambahkan'
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
