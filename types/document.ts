export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED_RT = 'APPROVED_RT',
  REJECTED_RT = 'REJECTED_RT',
  APPROVED_RW = 'APPROVED_RW',
  REJECTED_RW = 'REJECTED_RW',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export enum DocumentType {
  SKCK = 'SKCK',
  KTP = 'KTP',
  KK = 'KK',
  DOMISILI = 'DOMISILI',
}

export interface DocumentRequest {
  id: string;
  type: DocumentType;
  name: string;
  nik: string;
  address: string;
  purpose: string;
  description?: string;
  status: DocumentStatus;
  rtComment?: string;
  rwComment?: string;
  adminComment?: string;
  documentNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  rtId?: string;
  rwId?: string;
  adminId?: string;
}

export interface DocumentNumber {
  id: string;
  number: string;
  type: DocumentType;
  name: string;
  date: Date;
  documentRequestId: string;
  createdAt: Date;
  updatedAt: Date;
}