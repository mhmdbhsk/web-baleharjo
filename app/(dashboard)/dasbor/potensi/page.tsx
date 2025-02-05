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
import {
  PotentialForm,
  PotentialFormValues,
} from '@/components/forms/potential-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPotential,
  deletePotential,
  getPotentials,
  updatePotential,
} from '@/services/potential.services';
import { Potential } from '@/db/schema';
import { useCloudinaryUpload } from '@/hooks/use-cloudinary-upload';
import BlurHashImage from '@/components/blurhash-image';

export default function PotensiPage() {
  const [selectedPotensi, setSelectedPotensi] = useState<Potential | null>(
    null
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { uploadImage, isLoading, error } = useCloudinaryUpload();

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery({
    queryKey: ['potentials', pageIndex, pageSize, search],
    queryFn: () =>
      getPotentials({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: async (values: PotentialFormValues) => {
      const { url, blurhash } = await uploadImage(values.image as File);

      return createPotential({
        title: values.title,
        description: values.description,
        category: values.category,
        image: url,
        blurhash: blurhash,
      });
    },
    onSuccess: () => {
      refetch();
      setIsAddOpen(false);
      toast.success('Potensi berhasil ditambahkan');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Gagal menambahkan potensi');
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: Partial<PotentialFormValues> & { image?: File };
    }) => {
      const { url, blurhash } = await uploadImage(values.image as File);

      return updatePotential(id, {
        ...values,
        image: url,
        blurhash: blurhash,
      });
    },
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
      toast.success('Potensi berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui potensi');
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePotential(id),
    onSuccess: () => {
      refetch();
      setIsDeleteOpen(false);
      toast.success('Potensi berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus potensi');
    },
  });

  const columns: ColumnDef<Potential>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama Potensi" />
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kategori" />
      ),
    },
    createActionColumn<Potential>({
      onView: (data) => {
        setSelectedPotensi(data);
        setIsViewOpen(true);
      },
      onEdit: (data) => {
        setSelectedPotensi(data);
        setIsEditOpen(true);
      },
      onDelete: (data) => {
        setSelectedPotensi(data);
        setIsDeleteOpen(true);
      },
    }),
  ];

  return (
    <section>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Potensi Daerah
          </h1>
        </div>

        <div>
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Potensi
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        searchKey="title"
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
            <DialogTitle>Buat Potensi Baru</DialogTitle>
            <DialogDescription>
              Isi formulir potensi baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <PotentialForm onSubmit={create} isLoading={isCreating} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Potensi</DialogTitle>
            <DialogDescription>
              Ubah informasi potensi di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <PotentialForm
            initialData={selectedPotensi}
            onSubmit={(values) =>
              selectedPotensi?.id && update({ id: selectedPotensi.id, values })
            }
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Potensi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPotensi?.image && (
              <BlurHashImage
                src={selectedPotensi.image}
                alt={selectedPotensi.title}
                blurhash={selectedPotensi.blurhash || ''}
                rounded
              />
            )}
            <div>
              <h3 className="font-medium">Judul</h3>
              <p>{selectedPotensi?.title}</p>
            </div>
            <div>
              <h3 className="font-medium">Kategori</h3>
              <p>{selectedPotensi?.category}</p>
            </div>
            <div>
              <h3 className="font-medium">Deskripsi</h3>
              <p>{selectedPotensi?.description}</p>
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
              Tindakan ini tidak dapat dibatalkan. Potensi akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <s></s>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedPotensi?.id && del(selectedPotensi.id)}
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
