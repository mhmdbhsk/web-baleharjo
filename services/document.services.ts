import { DocumentRequest, DocumentNumber, DocumentStatus } from '@/types/document';

interface GetDocumentRequestsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: DocumentStatus;
}

interface DocumentResponse<T> {
  data: T[];
  metadata: {
    totalPages: number;
    totalItems: number;
  };
}

export async function getDocumentRequests({
  page = 1,
  limit = 10,
  search = '',
  status,
}: GetDocumentRequestsParams = {}): Promise<DocumentResponse<DocumentRequest>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    ...(status && { status }),
  });

  const response = await fetch(`/api/documents?${params}`);
  return response.json();
}

export async function getDocumentNumbers({
  page = 1,
  limit = 10,
  search = '',
}: GetDocumentRequestsParams = {}): Promise<DocumentResponse<DocumentNumber>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });

  const response = await fetch(`/api/documents/numbers?${params}`);
  return response.json();
}

export async function createDocumentRequest(data: any) {
  const response = await fetch('/api/documents/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create document request');
  }

  return response.json();
}

export async function reviewDocumentRequest(id: string, data: {
  status: DocumentStatus;
  comment: string;
}) {
  const response = await fetch(`/api/documents/requests/${id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function generateDocument(id: string) {
  const response = await fetch(`/api/documents/requests/${id}/generate`, {
    method: 'POST',
  });
  return response.json();
}