import { DocumentRequestStepper } from '@/components/forms/document-request-stepper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buat Surat - Desa Baleharjo',
  description: 'Formulir pembuatan surat di Desa Baleharjo',
};

export default function CreateLetterPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Buat Surat</h1>
        <p className="text-muted-foreground">
          Silakan isi formulir untuk mengajukan permohonan surat
        </p>
      </div>
      <DocumentRequestStepper />
    </div>
  );
}
