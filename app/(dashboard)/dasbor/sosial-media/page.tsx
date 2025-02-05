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
  SocialMediaForm,
  SocialMediaFormValues,
} from '@/components/forms/social-media-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createSocialMedia,
  deleteSocialMedia,
  getSocialMedia,
  updateSocialMedia,
} from '@/services/social-media.services';
import { SocialMedia } from '@/db/schema';

export default function SocialMediaPage() {
  const [selectedSocialMedia, setSelectedSocialMedia] =
    useState<SocialMedia | null>(null);
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
    queryKey: ['social-media', pageIndex, pageSize, search],
    queryFn: () =>
      getSocialMedia({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (values: SocialMediaFormValues) => createSocialMedia(values),
    onSuccess: () => {
      refetch();
      setIsAddOpen(false);
      toast.success('Sosial media berhasil ditambahkan');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Gagal menambahkan sosial media');
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: Partial<SocialMediaFormValues>;
    }) => updateSocialMedia(id, values),
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
      toast.success('Sosial media berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui sosial media');
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteSocialMedia(id),
    onSuccess: () => {
      refetch();
      setIsDeleteOpen(false);
      toast.success('Sosial media berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus sosial media');
    },
  });

  const columns: ColumnDef<SocialMedia>[] = [
    {
      accessorKey: 'platform',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Platform" />
      ),
    },
    {
      accessorKey: 'url',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL" />
      ),
    },
    {
      accessorKey: 'icon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon" />
      ),
    },
    createActionColumn<SocialMedia>({
      onView: (data) => {
        setSelectedSocialMedia(data);
        setIsViewOpen(true);
      },
      onEdit: (data) => {
        setSelectedSocialMedia(data);
        setIsEditOpen(true);
      },
      onDelete: (data) => {
        setSelectedSocialMedia(data);
        setIsDeleteOpen(true);
      },
    }),
  ];

  return (
    <section>
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Sosial Media
          </h1>
        </div>

        <div>
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Sosial Media
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        searchKey="platform"
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
            <DialogTitle>Buat Sosial Media Baru</DialogTitle>
            <DialogDescription>
              Isi formulir sosial media baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <SocialMediaForm onSubmit={create} isLoading={isCreating} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Sosial Media</DialogTitle>
            <DialogDescription>
              Ubah informasi sosial media di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <SocialMediaForm
            initialData={selectedSocialMedia}
            onSubmit={(values) =>
              selectedSocialMedia?.id &&
              update({ id: selectedSocialMedia.id, values })
            }
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Sosial Media</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Platform</h3>
              <p>{selectedSocialMedia?.platform}</p>
            </div>
            <div>
              <h3 className="font-medium">URL</h3>
              <p>{selectedSocialMedia?.url}</p>
            </div>
            <div>
              <h3 className="font-medium">Icon</h3>
              <p>{selectedSocialMedia?.icon}</p>
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
              Tindakan ini tidak dapat dibatalkan. Sosial media akan dihapus
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedSocialMedia?.id && del(selectedSocialMedia.id)
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
