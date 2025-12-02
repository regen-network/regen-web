import { MemberOnBoarding } from 'components/organisms/MemberOnBoarding/MemberOnBoarding';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  console.log('params:', params);
  return <MemberOnBoarding />;
}
