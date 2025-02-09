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

export function LandAppraisalForm() {
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
        name="no"
        rules={{ required: 'Nomor harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="certificate"
        rules={{ required: 'Sertifikat harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sertifikat</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="noC"
        rules={{ required: 'No. C harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. C</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="noPersil"
        rules={{ required: 'No. Persil harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. Persil</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="area"
        rules={{ required: 'Luas harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Luas</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="builtOn"
        rules={{ required: 'Berdiri diatasnya berupa harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Berdiri diatasnya berupa</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="boundaryNorth"
          rules={{ required: 'Batas Utara harus diisi' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batas Utara</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="boundarySouth"
          rules={{ required: 'Batas Selatan harus diisi' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batas Selatan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="boundaryEast"
          rules={{ required: 'Batas Timur harus diisi' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batas Timur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="boundaryWest"
          rules={{ required: 'Batas Barat harus diisi' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batas Barat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="sinceDate"
        rules={{ required: 'Sejak tanggal harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sejak Tanggal</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
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
        name="usedFor"
        rules={{ required: 'Dipergunakan untuk harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dipergunakan untuk</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="appraisalPrice"
        rules={{ required: 'Harga taksiran harus diisi' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Harga Taksiran</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}