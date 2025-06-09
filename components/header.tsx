import { User } from 'lucide-react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Menu className='h-6 w-6 text-gray-600 mr-4' />
            <Link href='/'>
              <img
                className='w-25 h-7 cursor-pointer'
                src='https://takeout-dev.skylark.co.jp/media/logo/stores/2/TO__2E_01___ol-_3_.png'
                alt='ロゴ'
              />
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <User className='h-6 w-6 text-gray-600' />
          </div>
        </div>
      </div>
    </header>
  );
}
