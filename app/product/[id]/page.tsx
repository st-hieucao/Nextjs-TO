"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, X } from "lucide-react"
import Header from "@/components/header"
import { useRouter } from "next/navigation"


interface Product {
  id: string
  name: string
  description: string
  price: number
  taxIncludedPrice: number
  image: string
  allergenInfo: string
  category: string
  ingredients: string[]
  nutritionInfo: {
    calories: number
    protein: number
    fat: number
    carbs: number
    salt: number
  }
}

interface RiceOption {
  id: string
  label: string
  extraPrice: number
  extraTaxIncludedPrice: number
}

export default function ProductPage() {
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false)
  const [selectedRiceOption, setSelectedRiceOption] = useState("normal")
  const [modalQuantity, setModalQuantity] = useState(1)

  // Sample product data - in real app this would come from API
  const product: Product = {
    id: "123",
    name: "梅しそおろし合盛り弁当4個",
    description: "梅しそおろしから揚げともちもち揚げの両方が楽しめます。",
    price: 824,
    taxIncludedPrice: 890,
    image: "https://takeout-dev.skylark.co.jp/media/catalog/product/k/s/ks82784-1_1.jpg",
    allergenInfo: "アレルギー及び栄養・主要食材の原産地情報はこちら",
    category: "bento",
    ingredients: ["鶏肉", "米", "梅", "しそ", "大根おろし", "小麦粉", "卵", "パン粉"],
    nutritionInfo: {
      calories: 650,
      protein: 28.5,
      fat: 18.2,
      carbs: 89.4,
      salt: 3.2,
    },
  }

  const riceOptions: RiceOption[] = [
    { id: "normal", label: "ごはん普通", extraPrice: 0, extraTaxIncludedPrice: 0 },
    { id: "large", label: "ごはん大盛り", extraPrice: 0, extraTaxIncludedPrice: 0 },
    { id: "small", label: "ごはん少なめ", extraPrice: 0, extraTaxIncludedPrice: 0 },
  ]

  const selectedRice = riceOptions.find((option) => option.id === selectedRiceOption)
  const totalPrice = product.price + (selectedRice?.extraPrice || 0)
  const totalTaxIncludedPrice = product.taxIncludedPrice + (selectedRice?.extraTaxIncludedPrice || 0)

  const handleAddToCart = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setModalQuantity(1)
    setSelectedRiceOption("normal")
  }

  const handleConfirmAddToCart = () => {
    console.log(`Added ${modalQuantity} of ${product.name} to cart with rice option: ${selectedRiceOption}`)
    setShowModal(false)
    router.push("/order")
    // Handle actual add to cart logic here
  }

  const incrementModalQuantity = () => {
    if (modalQuantity < 9) {
      setModalQuantity((prev) => prev + 1)
    }
  }

  const decrementModalQuantity = () => {
    setModalQuantity((prev) => Math.max(1, prev - 1))
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-16">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-6">梅しそおろし合盛り弁当4個</h1>
        </div>

        <div className="flex flex-col gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover flex mx-auto" />
            </div>

            {/* Product Info */}
            <div className="px-6 py-6">
              {/* Product Title and Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Allergen Information */}
              <div>
                <Link href="/allergen-info" className="text-blue-600 hover:text-blue-800 underline text-sm">
                  {product.allergenInfo}
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Product List Button */}
          <div className="flex justify-center items-center mx-auto mb-30 w-[360px] h-[44px] rounded-full overflow-hidden border-1 text-orange-500 border-orange-500 mt-4">
            <Link href="/menu" className="w-full h-full">
              <Button variant="outline" className="w-full h-full cursor-pointer hover:bg-white hover:text-orange-500">
                商品一覧に戻る
              </Button>
            </Link>
          </div>

          {/* Price and Actions */}
          <Card className="bg-white shadow-sm fixed bottom-0 right-0 w-full z-50 rounded-none border-t border-gray-200 py-2">
            <CardContent className="py-4 px-[50px] flex justify-end items-center">
              <div className="flex flex-col justify-end gap-4">
                <div className="text-right min-w-[120px]">
                  <div className="text-3xl font-bold text-gray-900">{product.price}円</div>
                  <div className="text-sm text-gray-600">(税込{product.taxIncludedPrice}円)</div>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 text-base font-bold cursor-pointer"
                  >
                    カートに追加
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-500 px-8 py-2 text-base font-bold cursor-pointer"
                  >
                    レジに進む
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className="bg-white rounded-lg w-full max-w-[400px] mx-4 relative">
            {/* Close Button */}
            <button onClick={handleModalClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6 pt-12">
              {/* Rice Options */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">
                  ごはん <span className="text-red-500 text-xs font-bold">*必須</span>
                </h3>

                <div className="space-y-3">
                  {riceOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rice"
                        value={option.id}
                        checked={selectedRiceOption === option.id}
                        onChange={(e) => setSelectedRiceOption(e.target.value)}
                        className="hidden peer"
                      />
                      <span className="w-5 h-5 rounded-full border-1 border-orange-400 flex items-center justify-center peer-checked:border-orange-500">
                        <span className={`w-3 h-3 rounded-full ${selectedRiceOption === option.id ? 'bg-orange-500' : ''}`}></span>
                      </span>
                      <span className="text-gray-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">数量</h3>
                <p className="text-gray-500 text-sm mb-4">最大注文可能数：9個</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={decrementModalQuantity}
                      disabled={modalQuantity <= 1}
                      className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <span className="text-xl font-bold min-w-[2rem] text-center">{modalQuantity}</span>

                    <button
                      onClick={incrementModalQuantity}
                      disabled={modalQuantity >= 9}
                      className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{totalPrice * modalQuantity}円</div>
                    <div className="text-sm text-gray-600">(税込{totalTaxIncludedPrice * modalQuantity}円)</div>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleConfirmAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full text-base font-bold h-[44px] cursor-pointer"
              >
                入力を完了する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
