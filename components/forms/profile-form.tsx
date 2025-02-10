'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  history: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')),
  logo: z.string().optional(),
  blurhash: z.string().optional(),
  area: z.string().optional(),
  topography: z.string().optional(),
  boundaries: z
    .object({
      north: z.string(),
      south: z.string(),
      east: z.string(),
      west: z.string(),
    })
    .optional(),
});

interface ProfileFormProps {
  initialValues?: z.infer<typeof formSchema>;
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading?: boolean;
}

export default function ProfileForm({
  initialValues,
  className,
  onSubmit,
  isLoading = false,
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      history: '',
      vision: '',
      mission: '',
      address: '',
      phone: '',
      email: '',
      logo: '',
      blurhash: '',
      area: '',
      topography: '',
      boundaries: {
        north: '',
        south: '',
        east: '',
        west: '',
      },
    },
  });

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof typeof initialValues,
          initialValues[key as keyof typeof initialValues]
        );
      });
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
      >
        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Umum</TabsTrigger>
            <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
            <TabsTrigger value="visi-misi">Visi & Misi</TabsTrigger>
            <TabsTrigger value="geografis">Geografis</TabsTrigger>
          </TabsList>

          <TabsContent value="umum">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Umum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Desa Baleharjo"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deskripsi singkat tentang desa"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0274-xxxxxx"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="desa@baleharjo.desa.id"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo Desa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan foto yang akan digunakan"
                          type="file"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sejarah">
            <Card>
              <CardHeader>
                <CardTitle>Sejarah Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="history"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Sejarah desa..."
                          className="min-h-[300px]"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visi-misi">
            <Card>
              <CardHeader>
                <CardTitle>Visi & Misi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="vision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Visi desa..."
                          className="min-h-[100px]"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Misi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Misi desa..."
                          className="min-h-[200px]"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geografis">
            <Card>
              <CardHeader>
                <CardTitle>Kondisi Geografis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Lengkap</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Alamat desa..."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Luas Wilayah (km²)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="topography"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topografi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dataran tinggi/rendah"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Batas Wilayah</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="boundaries.north"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Utara</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="boundaries.south"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selatan</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="boundaries.east"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timur</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="boundaries.west"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barat</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </form>
    </Form>
  );
}
