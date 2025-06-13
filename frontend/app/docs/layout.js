import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar'

export default function DocsLayout({ children }) {
  return (
    //<ProtectedRoute >
        <div className='flex flew-row'>
            <Sidebar />
            {children}
        </div>
    //</ProtectedRoute>
  );
}