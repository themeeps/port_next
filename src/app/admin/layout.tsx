import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import AdminSidebar from './AdminSidebar';
import { AlertProvider } from './AlertProvider';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <AlertProvider>
      <div className="flex min-h-screen bg-slate-100">
        <AdminSidebar />
        <main className="dashboard-main flex-1 p-8">{children}</main>
      </div>
    </AlertProvider>
  );
}
