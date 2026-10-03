import LocalAssembliesPage from './AssemblyDirectory';
import { sanityFetch } from '@/src/sanity/client';
import { directoryQuery, type DirectoryAssembly, type DirectoryDistrict } from '@/src/sanity/queries';

export default async function AssembliesPage({
  searchParams,
}: {
  searchParams: Promise<{ district?: string | string[] }>;
}) {
  const { district } = await searchParams;
  const { assemblies, districts } = await sanityFetch<{
    assemblies: DirectoryAssembly[];
    districts: DirectoryDistrict[];
  }>(directoryQuery);

  const selectedDistrict =
    typeof district === 'string' && districts.some((d) => d.name === district)
      ? district
      : 'All Districts';

  return (
    <LocalAssembliesPage
      initialDistrict={selectedDistrict}
      assemblies={assemblies}
      districtList={districts}
    />
  );
}
