'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function LetterStatementForm() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        rules={{ required: 'Nama harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Lengkap</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="placeDateOfBirth"
        rules={{ required: 'Tempat tanggal lahir harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tempat, Tanggal Lahir</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="kkNumber"
        rules={{ required: 'Nomor KK harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor KK</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="ktpNumber"
        rules={{ required: 'Nomor KTP harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor KTP</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nationality"
        rules={{ required: 'Kebangsaan harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kebangsaan</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="religion"
        rules={{ required: 'Agama harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agama</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="occupation"
        rules={{ required: 'Pekerjaan harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pekerjaan</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address"
        rules={{ required: 'Alamat harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alamat</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="maritalStatus"
        rules={{ required: 'Status perkawinan harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status Perkawinan</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="letterPurpose"
        rules={{ required: 'Maksud surat harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maksud Surat</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keterangan Lain</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
