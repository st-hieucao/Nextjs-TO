import Banner from '@/components/banner';
import DeliveryArea from '@/components/delivery-area';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Brand() {
  return (
    <div>
      <Header />
      <Banner />
      <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          テイクアウトの注文
        </h2>

        <div className='space-y-4'>
          {/* Pre-order notification */}
          <Card className='bg-orange-500 text-white border-0 shadow-sm py-0 h-16 flex justify-center cursor-pointer'>
            <div className='flex items-center p-4'>
              <div className='bg-white bg-opacity-20 rounded-full mr-4 p-1'>
                <img
                  className='h-8 w-8'
                  src='https://takeout-dev.skylark.co.jp/media/icon/brand/brand_reservation.png'
                  alt='事前予約'
                />
              </div>
              <span className='text-white font-medium'>
                【事前予約】自家製ローストチキンセット　他
              </span>
            </div>
          </Card>

          {/* Order button */}
          <Card className='bg-orange-500 text-white border-0 shadow-sm transition-colors cursor-pointer py-0 h-16 flex justify-center'>
            <div className='flex items-center p-4'>
              <div className='bg-white bg-opacity-20 rounded-full mr-4 p-1'>
                <img
                  className='h-8 w-8'
                  src='https://takeout-dev.skylark.co.jp/static/version1748509872/frontend/DigitalFree/skylark_pc/ja_JP/images/brand/order.png'
                  alt='注文する'
                />
              </div>
              <span className='text-white font-medium text-lg'>注文する</span>
            </div>
          </Card>

          {/* Action buttons */}
          <div className='flex gap-4'>
            <Card className='bg-gray-100 border-0 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer py-0 h-16 flex-1 justify-center'>
              <Link href={`/menu`}>
                <div className='flex items-center p-4'>
                  <div className='bg-white bg-opacity-20 rounded-full mr-4 p-1'>
                    <img
                      className='h-8 w-8'
                      src='https://takeout-dev.skylark.co.jp/static/version1748509872/frontend/DigitalFree/skylark_pc/ja_JP/images/brand/view.png'
                      alt='メニューを見る'
                    />
                  </div>
                  <span className='text-gray-900 font-medium'>
                    メニューを見る
                  </span>
                </div>
              </Link>
            </Card>

            <Card className='bg-gray-100 border-0 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer py-0 h-16 flex-1 justify-center'>
              <div className='flex items-center p-4'>
                <div className='bg-white bg-opacity-20 rounded-full mr-4 p-1'>
                  <img
                    className='h-8 w-8'
                    src='https://takeout-dev.skylark.co.jp/static/version1748509872/frontend/DigitalFree/skylark_pc/ja_JP/images/brand/coupon.png'
                    alt='クーポンを使う'
                  />
                </div>
                <span className='text-gray-900 font-medium'>
                  クーポンを使う
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <DeliveryArea />
      <Footer />
    </div>
  );
}
