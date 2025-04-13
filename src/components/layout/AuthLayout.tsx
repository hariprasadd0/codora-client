import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

export default function AuthLayout() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <Outlet />
      <Toaster
        richColors
        position="top-center"
      />
    </section>
  );
}
