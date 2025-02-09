'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DocumentType } from '@/db/schema';
import { DocumentTypeForm } from './steps/document-type-form';
import { LetterStatementForm } from './steps/letter-statement-form';
import { BusinessLetterForm } from './steps/business-letter-form';
import { LandAppraisalForm } from './steps/land-appraisal-form';
import { AreaSelectionForm } from './steps/area-selection-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Steps } from '@/components/ui/steps';
import { createDocumentRequest } from '@/services/document.services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const steps = [
  { title: 'Jenis Surat', description: 'Pilih jenis surat yang akan diajukan' },
  { title: 'Pilih RT/RW', description: 'Pilih RT dan RW yang terkait' },
  { title: 'Formulir', description: 'Isi formulir sesuai jenis surat' },
  { title: 'Konfirmasi', description: 'Periksa kembali data yang diisi' },
];

export function DocumentRequestStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const { watch } = methods;
  const documentType = watch('type');
  const router = useRouter();

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (data: any) => {
    try {
      await createDocumentRequest(data);
      toast.success('Permohonan berhasil diajukan');
      router.push('/dasbor/surat');
    } catch (error) {
      toast.error('Gagal mengajukan permohonan');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DocumentTypeForm />;
      case 1:
        return <AreaSelectionForm />;
      case 2:
        switch (documentType) {
          case DocumentType.LETTER_STATEMENT:
            return <LetterStatementForm />;
          case DocumentType.BUSINESS_LETTER:
            return <BusinessLetterForm />;
          case DocumentType.LAND_APPRAISAL:
            return <LandAppraisalForm />;
          default:
            return null;
        }
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Konfirmasi Data</h3>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
              {JSON.stringify(methods.getValues(), null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Surat</CardTitle>
          <CardDescription>
            Silakan isi formulir permohonan surat sesuai dengan kebutuhan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className="space-y-6">
              <Steps
                steps={steps}
                activeStep={activeStep}
                onStepClick={(step) => {
                  if (step < activeStep) {
                    setActiveStep(step);
                  }
                }}
              />

              <div className="mt-8">{renderStepContent(activeStep)}</div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Kembali
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button type="submit">Ajukan Permohonan</Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Lanjut
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
