import Link from 'next/link'
import { NavBar } from '@/components/Navbar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="p-4">
        <div>Landing Page</div>
      </div>
    </div>
  );
}
