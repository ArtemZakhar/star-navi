'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const path = usePathname();

  return (
    <section className="flex justify-center items-center z-10 min-h-36">
      <nav>
        <ul className="flex justify-center items-center gap-12 text-2xl md:text-3xl text-yellow ">
          <li>
            <Link
              className={`hover:[text-shadow:_1px_1px_10px,-1px_-1px_10px_#e2e8f0] ${path !== '/contacts' && '[text-shadow:_1px_1px_10px,-1px_-1px_10px_#e2e8f0]'}`}
              href="/"
            >
              Heroes list
            </Link>
          </li>
          <li>
            <Link
              className={`hover:[text-shadow:_1px_1px_10px,-1px_-1px_10px_#e2e8f0] ${path === '/contacts' && '[text-shadow:_1px_1px_10px,-1px_-1px_10px_#e2e8f0]'}`}
              href="/contacts"
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};
