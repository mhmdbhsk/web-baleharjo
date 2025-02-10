'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile.services';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlurHashImage from '@/components/blurhash-image';
import { Building2, History, Map, Target } from 'lucide-react';
import ReactFlow, { Background, Controls, Edge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const sections = [
    {
      id: 'sejarah',
      name: 'Sejarah',
      icon: History,
    },
    {
      id: 'struktur',
      name: 'Struktur Pemerintahan',
      icon: Building2,
    },
    {
      id: 'visi-misi',
      name: 'Visi & Misi',
      icon: Target,
    },
    {
      id: 'geografis',
      name: 'Kondisi Geografis',
      icon: Map,
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-orange-500">Profil </span>
            Desa
          </h1>
          <p className="text-gray-600">Mengenal lebih dekat Desa Baleharjo</p>
        </div>

        <div className="mb-12">
          <BlurHashImage
            alt="Kantor Desa Baleharjo"
            blurhash="LVJRXCrn~qV?off,RPtRXBNgIVkD"
            src="/hero.webp"
            rounded
            aspectRatio="wide"
          />
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="sejarah" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center gap-2 py-4"
                  >
                    <Icon className="h-4 w-4" />
                    {section.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="sejarah" className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Sejarah Desa</h2>
              <p>{profile?.data?.history || 'Belum ada data sejarah'}</p>
            </TabsContent>

            <TabsContent value="struktur">
              <h2 className="text-2xl font-semibold mb-6">
                Struktur Pemerintahan Desa
              </h2>
              {/* {profile?.data?.structure && (
                <OrganizationChart data={profile.data.structure} />
              )} */}
              <BlurHashImage
                alt="Struktur Pemerintahan Desa"
                blurhash="LCR{x%.7-;jF?GR+W=My-@oexuoI"
                src="/struktur-organisasi.png"
                rounded
              />
            </TabsContent>

            <TabsContent value="visi-misi" className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Visi</h2>
                <p className="text-gray-600">
                  {profile?.data?.vision || 'Belum ada data visi'}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Misi</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {profile?.data?.mission || 'Belum ada data misi'}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="geografis" className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Kondisi Geografis</h2>
              <div className="rounded border">
                <BlurHashImage
                  alt="Persebaran potensi desa"
                  blurhash="LUN,[400~q.8ofj[RjWB%MxuMyM{"
                  src="/persebaran.webp"
                  rounded
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Lokasi</h3>
                  <p className="text-gray-600">{profile?.data?.address}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Batas Wilayah:</h4>
                    <ul className="space-y-1 text-gray-600">
                      {/* @ts-ignore */}
                      <li>Utara: {profile?.data?.boundaries?.north}</li>
                      {/* @ts-ignore */}
                      <li>Selatan: {profile?.data?.boundaries?.south}</li>
                      {/* @ts-ignore */}
                      <li>Timur: {profile?.data?.boundaries?.east}</li>
                      {/* @ts-ignore */}
                      <li>Barat: {profile?.data?.boundaries?.west}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Luas Wilayah</h3>
                  <p className="text-gray-600">{profile?.data?.area} km²</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Topografi:</h4>
                    <p className="text-gray-600">{profile?.data?.topography}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function OrganizationChart({ data }: { data: any[] }) {
  const nodes = data.map((staff) => ({
    id: staff.id,
    position: { x: 0, y: 0 }, // positions will be calculated dynamically
    data: {
      label: (
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center min-w-[200px]">
          <p className="font-semibold">{staff.position}</p>
          <p className="text-sm text-gray-600">{staff.name}</p>
        </div>
      ),
    },
  }));

  const edges = data
    .map((staff) => {
      if (!staff.parentId) return null;
      return {
        id: `${staff.parentId}-${staff.id}`,
        source: staff.parentId,
        target: staff.id,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#FF8A65' },
      };
    })
    .filter(Boolean);

  // Calculate node positions based on hierarchy
  const positionNodes = () => {
    const levels: { [key: string]: any[] } = {};
    const levelWidth = 250;
    const levelHeight = 100;

    // Group nodes by level
    data.forEach((staff) => {
      const level = getLevel(staff.id, data);
      if (!levels[level]) levels[level] = [];
      levels[level].push(staff.id);
    });

    // Position nodes
    Object.entries(levels).forEach(([level, nodeIds], levelIndex) => {
      const totalWidth = (nodeIds.length - 1) * levelWidth;
      nodeIds.forEach((id, index) => {
        const node = nodes.find((n) => n.id === id);
        if (node) {
          node.position = {
            x: -totalWidth / 2 + index * levelWidth,
            y: Number(level) * levelHeight,
          };
        }
      });
    });

    return nodes;
  };

  const getLevel = (id: string, data: any[], level = 0): number => {
    const node = data.find((n) => n.id === id);
    if (!node?.parentId) return level;
    return getLevel(node.parentId, data, level + 1);
  };

  return (
    <div className="h-[600px] bg-gray-50 rounded-lg">
      <ReactFlow
        nodes={positionNodes()}
        // @ts-ignore
        edges={edges.filter((edge): edge is Edge => edge !== null)}
        fitView
        className="bg-gray-50"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// export default function ProfilePage() {
//   const {
//     data: profile,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['profile'],
//     queryFn: getProfile,
//   });

//   const sections = [
//     {
//       id: 'sejarah',
//       name: 'Sejarah',
//       icon: History,
//     },
//     {
//       id: 'struktur',
//       name: 'Struktur Pemerintahan',
//       icon: Building2,
//     },
//     {
//       id: 'visi-misi',
//       name: 'Visi & Misi',
//       icon: Target,
//     },
//     {
//       id: 'geografis',
//       name: 'Kondisi Geografis',
//       icon: Map,
//     },
//   ];

//   return (
//     <div className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col mb-8">
//           <h1 className="text-3xl font-bold mb-2">
//             <span className="text-orange-500">Profil </span>
//             Desa
//           </h1>
//           <p className="text-gray-600">Mengenal lebih dekat Desa Baleharjo</p>
//         </div>

//         <div className="mb-12">
//           <BlurHashImage
//             alt="Kantor Desa Baleharjo"
//             blurhash="LVJRXCrn~qV?off,RPtRXBNgIVkD"
//             src="/hero.webp"
//             rounded
//             aspectRatio="wide"
//           />
//         </div>

//         {isLoading ? (
//           <div className="space-y-8">
//             <Skeleton className="h-[200px] w-full rounded-lg" />
//             <div className="grid md:grid-cols-2 gap-8">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="space-y-4">
//                   <Skeleton className="h-8 w-1/2" />
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-4 w-2/3" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <Tabs defaultValue="sejarah" className="space-y-8">
//             <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {sections.map((section) => {
//                 const Icon = section.icon;
//                 return (
//                   <TabsTrigger
//                     key={section.id}
//                     value={section.id}
//                     className="flex items-center gap-2 py-4"
//                   >
//                     <Icon className="h-4 w-4" />
//                     {section.name}
//                   </TabsTrigger>
//                 );
//               })}
//             </TabsList>

//             <TabsContent value="sejarah" className="prose max-w-none">
//               <h2 className="text-2xl font-semibold mb-4">Sejarah Desa</h2>
//               <p>{profile?.data?.history || 'Belum ada data sejarah'}</p>
//             </TabsContent>

//             <TabsContent value="struktur">
//               <h2 className="text-2xl font-semibold mb-6">
//                 Struktur Pemerintahan Desa
//               </h2>
//               <div className="grid md:grid-cols-3 gap-6">
//                 {profile?.data?.structure?.map((staff: any) => (
//                   <div
//                     key={staff.id}
//                     className="bg-white p-6 rounded-lg shadow-sm"
//                   >
//                     <h3 className="font-semibold text-lg">{staff.name}</h3>
//                     <p className="text-orange-500">{staff.position}</p>
//                   </div>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="visi-misi" className="space-y-8">
//               <div>
//                 <h2 className="text-2xl font-semibold mb-4">Visi</h2>
//                 <p className="text-gray-600">
//                   {profile?.data?.vision || 'Belum ada data visi'}
//                 </p>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold mb-4">Misi</h2>
//                 <ul className="list-disc list-inside space-y-2 text-gray-600">
//                   {profile?.data?.missions?.map(
//                     (mission: string, index: number) => (
//                       <li key={index}>{mission}</li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             </TabsContent>

//             <TabsContent value="geografis" className="prose max-w-none">
//               <h2 className="text-2xl font-semibold mb-4">Kondisi Geografis</h2>
//               <BlurHashImage
//                 alt="Persebaran potensi desa"
//                 blurhash="LUN,[400~q.8ofj[RjWB%MxuMyM{"
//                 src="/persebaran.webp"
//                 rounded
//               />
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-lg font-medium mb-2">Lokasi</h3>
//                   <p className="text-gray-600">{profile?.data?.address}</p>
//                   <div className="mt-4">
//                     <h4 className="font-medium mb-2">Batas Wilayah:</h4>
//                     <ul className="space-y-1 text-gray-600">
//                       <li>Utara: {profile?.data?.boundaries?.north}</li>
//                       <li>Selatan: {profile?.data?.boundaries?.south}</li>
//                       <li>Timur: {profile?.data?.boundaries?.east}</li>
//                       <li>Barat: {profile?.data?.boundaries?.west}</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium mb-2">Luas Wilayah</h3>
//                   <p className="text-gray-600">{profile?.data?.area} km²</p>
//                   <div className="mt-4">
//                     <h4 className="font-medium mb-2">Topografi:</h4>
//                     <p className="text-gray-600">{profile?.data?.topography}</p>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         )}
//       </div>
//     </div>
//   );
// }
