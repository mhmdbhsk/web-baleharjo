'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import { createActionColumn } from '@/components/data-table/columns';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/sort-header';
import { use, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentRequestForm } from '@/components/forms/document-request-form';
import { DocumentReviewForm } from '@/components/forms/document-review-form';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DocumentRequest,
  DocumentNumber,
  DocumentStatus,
} from '@/types/document';
import {
  getDocumentRequests,
  getDocumentNumbers,
  createDocumentRequest,
  reviewDocumentRequest,
  generateDocument,
} from '@/services/document.services';
import { useUser } from '@/lib/auth';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function DocumentRequestPage() {
  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRequest | null>(null);
  const [activeTab, setActiveTab] = useState('requests');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const {
    data: requests,
    isLoading: isLoadingRequests,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: ['document-requests', pageIndex, pageSize, search],
    queryFn: () =>
      getDocumentRequests({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { data: numbers, isLoading: isLoadingNumbers } = useQuery({
    queryKey: ['document-numbers', pageIndex, pageSize, search],
    queryFn: () =>
      getDocumentNumbers({
        page: pageIndex + 1,
        limit: pageSize,
        search,
      }),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createDocumentRequest,
    onSuccess: () => {
      refetchRequests();
      setIsAddOpen(false);
      toast.success('Permohonan berhasil diajukan');
    },
    onError: () => {
      toast.error('Gagal mengajukan permohonan');
    },
  });

  const { mutate: review, isPending: isReviewing } = useMutation({
    mutationFn: ({
      id,
      ...data
    }: {
      id: string;
      status: DocumentStatus;
      comment: string;
    }) => reviewDocumentRequest(id, data),
    onSuccess: () => {
      refetchRequests();
      setIsReviewOpen(false);
      toast.success('Permohonan berhasil diperbarui');
    },
    onError: () => {
      toast.error('Gagal memperbarui permohonan');
    },
  });

  const { mutate: generate, isPending: isGenerating } = useMutation({
    mutationFn: generateDocument,
    onSuccess: () => {
      refetchRequests();
      toast.success('Surat berhasil dibuat');
    },
    onError: () => {
      toast.error('Gagal membuat surat');
    },
  });

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.PENDING:
        return <Badge>Menunggu RT</Badge>;
      case DocumentStatus.APPROVED_RT:
        return <Badge variant="outline">Menunggu RW</Badge>;
      case DocumentStatus.REJECTED_RT:
        return <Badge variant="destructive">Ditolak RT</Badge>;
      case DocumentStatus.APPROVED_RW:
        return <Badge variant="outline">Menunggu Admin</Badge>;
      case DocumentStatus.REJECTED_RW:
        return <Badge variant="destructive">Ditolak RW</Badge>;
      case DocumentStatus.COMPLETED:
        return <Badge variant="default">Selesai</Badge>;
      case DocumentStatus.REJECTED:
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return null;
    }
  };

  const requestColumns: ColumnDef<DocumentRequest>[] = [
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jenis Surat" />
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => getStatusBadge(row.getValue('status')),
    },
    createActionColumn<DocumentRequest>({
      onView: (data) => {
        setSelectedDocument(data);
        setIsReviewOpen(true);
      },
    }),
  ];

  const numberColumns: ColumnDef<DocumentNumber>[] = [
    {
      accessorKey: 'number',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nomor Surat" />
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jenis Surat" />
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tanggal" />
      ),
      cell: ({ row }) =>
        new Date(row.getValue('createdAt')).toLocaleDateString('id-ID'),
    },
  ];

  const canReview = (document: DocumentRequest) => {
    if (!user) return false;

    if (
      user?.role &&
      user?.role === 'RT' &&
      document?.status === DocumentStatus.PENDING
    ) {
      return true;
    }

    if (
      user?.role &&
      user?.role === 'RW' &&
      document?.status === DocumentStatus.APPROVED_RT
    ) {
      return true;
    }

    if (
      user?.role &&
      user?.role === 'ADMIN' &&
      document?.status === DocumentStatus.APPROVED_RW
    ) {
      return true;
    }

    return false;
  };

  return (
    <section className="space-y-6">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
            Persuratan
          </h1>
        </div>

        <div>
          <Button size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Buat Permohonan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests">Permohonan</TabsTrigger>
          <TabsTrigger value="numbers">Penomoran</TabsTrigger>
        </TabsList>
        <TabsContent value="requests" className="mt-4">
          <DataTable
            columns={requestColumns}
            data={requests?.data || []}
            searchKey="name"
            isLoading={isLoadingRequests}
            pageCount={requests?.metadata?.totalPages || 1}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
            onSearch={setSearch}
            searchValue={search}
          />
        </TabsContent>
        <TabsContent value="numbers" className="mt-4">
          <DataTable
            columns={numberColumns}
            data={numbers?.data || []}
            searchKey="name"
            isLoading={isLoadingNumbers}
            pageCount={numbers?.metadata?.totalPages || 1}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onPageSizeChange={setPageSize}
            onSearch={setSearch}
            searchValue={search}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Permohonan Surat</DialogTitle>
            <DialogDescription>
              Isi formulir permohonan surat di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <DocumentRequestForm
            onSubmit={(values) => create(values as DocumentRequest)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Permohonan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Jenis Surat</h3>
              <p>{selectedDocument?.type}</p>
            </div>
            <div>
              <h3 className="font-medium">Nama</h3>
              <p>{selectedDocument?.name}</p>
            </div>
            <div>
              <h3 className="font-medium">NIK</h3>
              <p>{selectedDocument?.nik}</p>
            </div>
            <div>
              <h3 className="font-medium">Alamat</h3>
              <p>{selectedDocument?.address}</p>
            </div>
            <div>
              <h3 className="font-medium">Tujuan</h3>
              <p>{selectedDocument?.purpose}</p>
            </div>
            {selectedDocument?.description && (
              <div>
                <h3 className="font-medium">Keterangan Tambahan</h3>
                <p>{selectedDocument.description}</p>
              </div>
            )}
            {selectedDocument?.rtComment && (
              <div>
                <h3 className="font-medium">Komentar RT</h3>
                <p>{selectedDocument.rtComment}</p>
              </div>
            )}
            {selectedDocument?.rwComment && (
              <div>
                <h3 className="font-medium">Komentar RW</h3>
                <p>{selectedDocument.rwComment}</p>
              </div>
            )}
            {selectedDocument?.adminComment && (
              <div>
                <h3 className="font-medium">Komentar Admin</h3>
                <p>{selectedDocument.adminComment}</p>
              </div>
            )}
            {canReview(selectedDocument!) && (
              <DocumentReviewForm
                onSubmit={(values) =>
                  selectedDocument?.id &&
                  review({
                    id: selectedDocument.id,
                    status: values.status as DocumentStatus,
                    comment: values.comment,
                  })
                }
                isLoading={isReviewing}
              />
            )}
            {user?.role &&
              user?.role === 'ADMIN' &&
              selectedDocument?.status === DocumentStatus.APPROVED_RW && (
                <Button
                  onClick={() =>
                    selectedDocument?.id && generate(selectedDocument.id)
                  }
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Membuat Surat...' : 'Buat Surat'}
                </Button>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
