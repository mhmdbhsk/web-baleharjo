'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import { createActionColumn } from '@/components/data-table/columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/sort-header';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PenggunaForm } from '@/components/forms/pengguna-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPengguna,
  deletePengguna,
  getPengguna,
  updatePengguna,
} from '@/services/pengguna.services';
import { User } from '@/db/schema';
import { formatDate } from '@/lib/utils';
import { useCloudinaryUpload } from '@/hooks/use-cloudinary-upload';
import BlurHashImage from '@/components/blurhash-image';
import { PenggunaDto } from '@/types/dto/users.dto';

export default function PenggunaPage() {
  const [selectedPengguna, setSelectedPengguna] = useState<User | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery({
    queryKey: ['users', pageIndex, pageSize, search],
    queryFn: () =>
      getPengguna({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: async (values: PenggunaDto) => {
      return createPengguna({
        name: values.name,
        email: values.email,
        role: values.role,
        password: values.password,
      });
    },
    onSuccess: () => {
      refetch();
      setIsAddOpen(false);
      toast.success('Pengguna berhasil ditambahkan');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Gagal menambahkan pengguna');
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: Partial<PenggunaDto>;
    }) => {
      return updatePengguna(id, values);
    },
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
      toast.success('Pengguna berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui pengguna');
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePengguna(id),
    onSuccess: () => {
      refetch();
      setIsDeleteOpen(false);
      toast.success('Pengguna berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus pengguna');
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jabatan" />
      ),
    },
    createActionColumn<User>({
      onView: (data) => {
        setSelectedPengguna(data);
        setIsViewOpen(true);
      },
      onEdit: (data) => {
        setSelectedPengguna(data);
        setIsEditOpen(true);
      },
      onDelete: (data) => {
        setSelectedPengguna(data);
        setIsDeleteOpen(true);
      },
    }),
  ];

  return (
    <section>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Pengguna
          </h1>
        </div>

        <div>
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Pengguna
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        searchKey="name"
        isLoading={isLoadingData}
        pageCount={data?.metadata?.totalPages || 1}
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        onSearch={setSearch}
        searchValue={search}
      />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Pengguna Baru</DialogTitle>
            <DialogDescription>
              Isi formulir pengguna baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <PenggunaForm
            onSubmit={(values) => create({ ...values, password: 'default123' })}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Pengguna</DialogTitle>
            <DialogDescription>
              Ubah informasi pengguna di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <PenggunaForm
            initialData={selectedPengguna}
            onSubmit={(values) =>
              selectedPengguna?.id &&
              update({ id: selectedPengguna.id, values })
            }
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Nama</h3>
              <p>{selectedPengguna?.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p>{selectedPengguna?.email}</p>
            </div>
            <div>
              <h3 className="font-medium">Role</h3>
              <p>{selectedPengguna?.role}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Pengguna akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedPengguna?.id && del(selectedPengguna.id)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
