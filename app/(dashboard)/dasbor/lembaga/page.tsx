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
  InstitutionalForm,
  InstitutionalFormValues,
} from '@/components/forms/institutional-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createInstitutional,
  deleteInstitutional,
  getInstitutionals,
  updateInstitutional,
} from '@/services/institutional.services';

import { useCloudinaryUpload } from '@/hooks/use-cloudinary-upload';
import BlurHashImage from '@/components/blurhash-image';
import { InstitutionalDto } from '@/types/institutional';

export default function InstitutionalPage() {
  const [selectedInstitutional, setSelectedInstitutional] =
    useState<InstitutionalDto | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const { uploadImage } = useCloudinaryUpload();

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery({
    queryKey: ['institutionals', pageIndex, pageSize, search],
    queryFn: () =>
      getInstitutionals({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: async (values: InstitutionalFormValues) => {
      const { url, blurhash } = await uploadImage(values.logo as File);

      return createInstitutional({
        name: values.name,
        description: values.description,
        logo: url,
        blurhash: blurhash,
      });
    },
    onSuccess: () => {
      refetch();
      setIsAddOpen(false);
      toast.success('Lembaga berhasil ditambahkan');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Gagal menambahkan lembaga');
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: Partial<InstitutionalFormValues>;
    }) => {
      const { url, blurhash } = await uploadImage(values.logo as File);

      return updateInstitutional(id, {
        ...values,
        logo: url,
        blurhash: blurhash,
      });
    },
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
      toast.success('Lembaga berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui lembaga');
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteInstitutional(id),
    onSuccess: () => {
      refetch();
      setIsDeleteOpen(false);
      toast.success('Lembaga berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus lembaga');
    },
  });

  const columns: ColumnDef<InstitutionalDto>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    createActionColumn<InstitutionalDto>({
      onView: (data) => {
        setSelectedInstitutional(data);
        setIsViewOpen(true);
      },
      onEdit: (data) => {
        setSelectedInstitutional(data);
        setIsEditOpen(true);
      },
      onDelete: (data) => {
        setSelectedInstitutional(data);
        setIsDeleteOpen(true);
      },
    }),
  ];

  return (
    <section>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Lembaga
          </h1>
        </div>

        <div>
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Lembaga
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
            <DialogTitle>Buat Lembaga Baru</DialogTitle>
            <DialogDescription>
              Isi formulir lembaga baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <InstitutionalForm onSubmit={create} isLoading={isCreating} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Lembaga</DialogTitle>
            <DialogDescription>
              Ubah informasi lembaga di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <InstitutionalForm
            initialData={
              selectedInstitutional
                ? {
                    id: selectedInstitutional.id,
                    name: selectedInstitutional.name,
                    description: selectedInstitutional.description,
                    logo: undefined,
                  }
                : null
            }
            onSubmit={(values) =>
              selectedInstitutional?.id &&
              update({ id: selectedInstitutional.id, values })
            }
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Lembaga</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedInstitutional?.logo && (
              <BlurHashImage
                src={selectedInstitutional.logo}
                alt={selectedInstitutional.name}
                blurhash={selectedInstitutional.blurhash || ''}
                rounded
              />
            )}
            <div>
              <h3 className="font-medium">Nama</h3>
              <p>{selectedInstitutional?.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Deskripsi</h3>
              <p>{selectedInstitutional?.description}</p>
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
              Tindakan ini tidak dapat dibatalkan. Lembaga akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedInstitutional?.id && del(selectedInstitutional.id)
              }
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
