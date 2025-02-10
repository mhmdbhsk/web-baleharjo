'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile, updateProfile } from '@/services/profile.services';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  history: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
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

export default function ProfilePage() {
  const { toast } = useToast();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: '',
      description: '',
      history: '',
      vision: '',
      mission: '',
      address: '',
      phone: '',
      email: '',
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

  const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Profil berhasil diperbarui',
      });
    },
    onError: () => {
      toast({
        title: 'Gagal',
        description: 'Profil gagal diperbarui',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    updateProfileMutation(values);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Profil Desa</h3>
        <p className="text-sm text-muted-foreground">
          Kelola informasi profil desa yang ditampilkan di website
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                          <Input placeholder="Desa Baleharjo" {...field} />
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
                            <Input placeholder="0274-xxxxxx" {...field} />
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
                          <Textarea placeholder="Alamat desa..." {...field} />
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
                            <Input type="number" step="0.01" {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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
                              <Input {...field} />
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

          <Button type="submit" disabled={isUpdating}>
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Perubahan
          </Button>
        </form>
      </Form>
    </div>
  );
}
