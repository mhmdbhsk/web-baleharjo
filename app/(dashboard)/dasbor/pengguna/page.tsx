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
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface Pengguna {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default async function PenggunaPage() {
  const [selectedPengguna, setSelectedPengguna] = useState<Pengguna | null>(
    null
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { data, error, isError } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: getAllActivities,
  // });

  // console.log(data, 'ini data');

  const columns: ColumnDef<Pengguna>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
    },
    createActionColumn<Pengguna>({
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

  const handleAdd = async (values: any) => {
    try {
      setIsLoading(true);

      // await createActivity(values);

      toast.success('Pengguna berhasil ditambahkan');

      setIsAddOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: any) => {
    try {
      setIsLoading(true);
      // Add your API call here
      console.log('Editing:', values);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      // Add your API call here
      console.log('Deleting:', selectedPengguna?.id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex w-full justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Pengguna
          </h1>
        </div>

        <div className="">
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengguna
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={[]} searchKey="title" />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Pengguna Baru</DialogTitle>
            <DialogDescription>
              Isi formulir kegiatan baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          {/* <PenggunaForm onSubmit={handleAdd} isLoading={isLoading} /> */}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Pengguna</DialogTitle>
            <DialogDescription>
              Ubah informasi kegiatan di bawah ini.
            </DialogDescription>
          </DialogHeader>
          {/* <PenggunaForm
            initialData={selectedPengguna}
            onSubmit={handleEdit}
            isLoading={isLoading}
          /> */}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pengguna Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Title</h3>
              <p>{selectedPengguna?.title}</p>
            </div>
            <div>
              <h3 className="font-medium">Description</h3>
              <p>{selectedPengguna?.description}</p>
            </div>
            <div>
              <h3 className="font-medium">Date</h3>
              <p>{selectedPengguna?.date}</p>
            </div>
            <div>
              <h3 className="font-medium">Location</h3>
              <p>{selectedPengguna?.location}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              kegiatan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
