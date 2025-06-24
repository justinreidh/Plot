import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar'

export default function DocsLayout({ children }) {
  return (
    <ProtectedRoute >
        <div >
            {children}
        </div>
    </ProtectedRoute>
  );
}