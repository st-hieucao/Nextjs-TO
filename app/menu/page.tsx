import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header';
import menu from '@/data/menu.json';
import Link from 'next/link';

interface MenuItem {
  id: string;
  name: string;
  url: string;
  holidayType: string | null;
  sellDateStart: string;
  sellDateEnd: string;
  dailyStartTime: string;
  dailyEndTime: string;
  isOrderStop: boolean;
  imageHtml: string;
  priceHtml: string;
  detailsHtml: string;
  reservationCode: string | null;
  always_front_visible: boolean;
}

interface Tab {
  id: string;
  name: string;
  products: MenuItem[];
  sellDateEnd: string | null;
}

export default function MenuPage() {
  const tabs: Tab[] = menu.information.menus
    .map((item) => ({
      id: item.id,
      name: item.name,
      products: item.products || [],
      sellDateEnd: item.sellDateEnd,
    }))
    .filter((item) => item.products.length > 0);

  return (
    <div className='min-h-screen bg-gray-50 pb-16'>
      <Header />
      {/* Menu Categories */}
      <div className='sticky top-16 bg-white z-10 border-b'>
        <div className='max-w-6xl mx-auto'>
          <Tabs defaultValue={tabs[0]?.id} className='w-full gap-0'>
            <TabsList className='w-fit h-auto flex justify-between items-center overflow-x-auto mx-auto bg-white gap-4'>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className='py-4 text-gray-600 data-[state=active]:text-orange-500 data-[state=active]:border-b data-[state=active]:border-b-orange-500 rounded-none !shadow-none cursor-pointer'
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Menu Items Grid */}
            <div className='bg-gray-50 py-4'>
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className='m-0'>
                  {tab.products.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4'>
                      {tab.products.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className='max-w-6xl mx-auto px-4'>
                      <p className='text-center py-8 text-gray-500'>
                        メニュー情報はありません
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Link href={`/product/${item.id}`}>
      <Card className='overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-shadow py-0'>
        <div className='relative'>
          <div className='aspect-square relative'>
            <div dangerouslySetInnerHTML={{ __html: item.imageHtml }} />
          </div>
        </div>

        <CardContent className='p-3'>
          <h3 className='font-medium text-sm mb-2 line-clamp-2 h-10'>
            {item.name}
          </h3>
          <div className='flex justify-end'>
            <div dangerouslySetInnerHTML={{ __html: item.priceHtml }} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
