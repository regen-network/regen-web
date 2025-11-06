import { Loading as CircularProgress } from 'web-components/src/components/loading/Loading';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  );
}
