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

export function BusinessLetterForm() {
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
        name="nik"
        rules={{ required: 'NIK harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIK</FormLabel>
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
        name="phoneNumber"
        rules={{ required: 'Nomor HP harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor HP</FormLabel>
            <FormControl>
              <Input {...field} type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="business"
        rules={{ required: 'Usaha harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usaha</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="businessAddress"
        rules={{ required: 'Alamat usaha harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alamat Usaha</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mothersName"
        rules={{ required: 'Nama ibu kandung harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Ibu Kandung</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}