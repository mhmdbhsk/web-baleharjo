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
import { ActivityForm } from '@/components/forms/activity-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
} from '@/services/activity.services';
import { Activity } from '@/db/schema';
import { formatDate } from '@/lib/utils/date';

export default function KegiatanPage() {
  const [selectedKegiatan, setSelectedKegiatan] = useState<Activity | null>(
    null
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (values: ActivityDto) => createActivity(values),
    onSuccess: () => {
      refetch();
      setIsAddOpen(false);
      toast.success('Kegiatan berhasil ditambahkan');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Gagal menambahkan kegiatan');
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: Partial<ActivityDto>;
    }) => updateActivity(id, values),
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
      toast.success('Kegiatan berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui kegiatan');
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: () => {
      refetch();
      setIsDeleteOpen(false);
      toast.success('Kegiatan berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus kegiatan');
    },
  });

  const columns: ColumnDef<Activity>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal" />
      ),
      cell: ({ getValue }) => {
        const date = getValue();
        return date ? formatDate(date as string) : '-';
      },
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
    },
    createActionColumn<Activity>({
      onView: (data) => {
        setSelectedKegiatan(data);
        setIsViewOpen(true);
      },
      onEdit: (data) => {
        setSelectedKegiatan(data);
        setIsEditOpen(true);
      },
      onDelete: (data) => {
        setSelectedKegiatan(data);
        setIsDeleteOpen(true);
      },
    }),
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex w-full justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Kegiatan
          </h1>
        </div>

        <div className="">
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Tambah Kegiatan
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        searchKey="title"
        isLoading={isLoadingData}
      />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Kegiatan Baru</DialogTitle>
            <DialogDescription>
              Isi formulir kegiatan baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <ActivityForm
            onSubmit={(values) =>
              create({
                title: values.title,
                date: values.date,
                description: values.description,
                location: values.location,
                image: null,
                blurhash: null,
              })
            }
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Kegiatan</DialogTitle>
            <DialogDescription>
              Ubah informasi kegiatan di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <ActivityForm
            initialData={selectedKegiatan}
            onSubmit={(values) =>
              selectedKegiatan?.id &&
              update({ id: selectedKegiatan.id, values })
            }
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Kegiatan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Judul</h3>
              <p>{selectedKegiatan?.title}</p>
            </div>
            <div>
              <h3 className="font-medium">Deskripsi</h3>
              <p>{selectedKegiatan?.description}</p>
            </div>
            <div>
              <h3 className="font-medium">Tanggal</h3>
              <p>
                {selectedKegiatan
                  ? formatDate(selectedKegiatan.date)
                  : 'Memuat'}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Lokasi</h3>
              <p>{selectedKegiatan?.location}</p>
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
              Tindakan ini tidak dapat dibatalkan. Kegiatan akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedKegiatan?.id && del(selectedKegiatan.id)}
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
