'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DocumentType } from '@/db/schema';

export function DocumentTypeForm() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="type"
      rules={{ required: 'Jenis surat harus dipilih' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Jenis Surat</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis surat" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={DocumentType.LETTER_STATEMENT}>
                Surat Keterangan
              </SelectItem>
              <SelectItem value={DocumentType.BUSINESS_LETTER}>
                Surat Keterangan Usaha
              </SelectItem>
              <SelectItem value={DocumentType.LAND_APPRAISAL}>
                Surat Taksir Harga Tanah
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}