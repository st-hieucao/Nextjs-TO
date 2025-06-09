import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import brand from '@/data/brand.json';
import Banner from '@/components/banner';
import Header from '@/components/header';
import Footer from '@/components/footer';
import DeliveryArea from '@/components/delivery-area';
import Link from 'next/link';

export default function HomePage() {
  const restaurants = brand.list.map((brand) => ({
    id: brand.id,
    name: brand.name,
    logo: brand.image.small_logo_url,
  }));

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <Banner />

      <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <h2 className='text-xl font-bold text-gray-900 mb-8'>
          注文するブランドを選ぶ
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className='bg-[#f2f2f2] shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className=''>
                <div className='flex flex-col items-center space-y-4'>
                  {/* Restaurant Logo */}
                  <Link
                    href={`/brand/${restaurant.id}`}
                    className='w-20 h-20 bg-white rounded-full border-[0.5px] border-[#b2b2b2] flex items-center justify-center'
                  >
                    <Image
                      src={restaurant.logo || '/placeholder.svg'}
                      alt={restaurant.name}
                      width={64}
                      height={64}
                      className='rounded-full bg-[#f2f2f2]'
                    />
                  </Link>

                  {/* Action Buttons */}
                  <div className='flex space-x-2 w-full'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1 text-orange-500 border-orange-500 h-[38px] rounded-4xl cursor-pointer'
                    >
                      注文する
                    </Button>
                  </div>

                  <div className='w-full'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full text-[#e15b67] border-[#e15b67] h-[38px] rounded-4xl cursor-pointer'
                    >
                      メニューを見る
                    </Button>
                  </div>

                  {/* Underline */}
                  <div className='w-full h-[0.5px] bg-[#b2b2b2]'></div>

                  {/* Store Info */}
                  <div className='w-full'>
                    <div className='flex justify-between items-center text-sm text-gray-600 mb-2'>
                      <span className='font-bold'>おなくの店舗</span>
                      <span>--</span>
                    </div>
                    <p className='text-xs font-bold text-red-500 mb-3'>
                      店舗情報取得できません。
                    </p>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='w-full bg-[rgb(255,255,255)] border border-[#999] rounded-4xl cursor-pointer'
                      disabled
                    >
                      この店舗で注文
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <DeliveryArea />

      <Footer />
    </div>
  );
}
