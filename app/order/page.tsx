"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Minus } from "lucide-react"
import Header from "@/components/header"

interface OrderItem {
  id: string
  name: string
  description: string
  price: number
  taxIncludedPrice: number
  image: string
  quantity: number
  riceOption?: string
}

const paymentOptions = [
  { id: "cash", label: "現金払い" },
  // { id: "credit", label: "クレジット払い" },
]

export default function OrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "梅しそおろし合盛り弁当4個",
      description: "ごはん・ごはん普通",
      price: 824,
      taxIncludedPrice: 890,
      image: "https://takeout-dev.skylark.co.jp/media/catalog/product/k/s/ks82784-1_1.jpg",
      quantity: 2,
      riceOption: "普通",
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [utensils, setUtensils] = useState("required") // "required" or "not_required"
  const [chopsticks, setChopsticks] = useState("required") // "required" or "not_required"
  const [customerInfo, ] = useState({
    username: "st_quavo02",
    firstName: "フリガナ",
    lastName: "フリガナ",
    phone: "01111111111",
    email: "qua.vo*2@supremetech.vn",
  })

  const [selectedPaymentOption, setSelectedPaymentOption] = useState(paymentOptions[0].id)

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setOrderItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = orderItems.reduce((sum, item) => sum + item.taxIncludedPrice * item.quantity, 0)
  const taxRate = 0.08
  const tax = Math.round(subtotal * taxRate)
  const total = subtotal

  const handleConfirmOrder = () => {
    console.log("Order confirmed")
    // Handle order confirmation logic
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-center mb-4">ご注文内容の確認</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">ご注文内容</h2>

                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span className="inline-block text-[#e60012] border border-[#e60012] text-xs px-3 py-1 rounded-full mt-1 cursor-pointer">
                          削除
                        </span>
                      </div>

                      <div className="flex justify-between items-center ml-18 mt-10">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="">税込{item.taxIncludedPrice * item.quantity}円</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>合計数量</span>
                    <span>{totalItems}個</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>ご注文金額</span>
                    <span>税込{total}円</span>
                  </div>
                </div>

                <Button variant="outline" className="w-[300px] h-[45px] flex justify-center items-center mx-auto border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-500 rounded-full cursor-pointer">
                  他の商品を追加する
                </Button>
              </CardContent>
            </Card>

            {/* Coupon Code */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">クーポン番号</h3>
                <div className="flex gap-4 items-center">
                  <Input
                    placeholder="入力してください"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-[45px]"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full cursor-pointer">適用</Button>
                </div>
                <p className="text-xs text-gray-600 mt-2">チラシ等からのクーポン番号を入力できます。</p>
              </CardContent>
            </Card>

            {/* Utensils Selection */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">使い捨てカトラリー</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3 font-semibold">
                    お箸・フォーク・スプーン等 <span className="text-red-500">必須</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    使い捨てカトラリー（フォーク・スプーン等）を有料にて提供させていただいて
                    おります。ご理解とご協力の程よろしくお願いいたします。
                  </p>

                  <div className="flex items-center gap-16">
                    {["required", "not_required"].map((value) => (
                      <label key={value} className="flex items-center space-x-3 cursor-pointer select-none">
                        <input
                          type="radio"
                          name="utensils"
                          value={value}
                          checked={utensils === value}
                          onChange={(e) => setUtensils(e.target.value)}
                          className="hidden peer"
                        />
                        <span className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center peer-checked:border-orange-500">
                          <span className={`w-3 h-3 rounded-full flex items-center justify-center ${utensils === value ? 'border-4 border-orange-500 bg-orange-500' : ''}`}></span>
                        </span>
                        <span className="text-gray-900 text-sm">{value === "required" ? "必要" : "不要"}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 mt-10">お持ちかえり袋(有料)</p>
                  <p className="text-xs text-gray-500 mb-4">1枚につき3円いただきます</p>

                  <div className="flex items-center gap-16">
                    {["required", "not_required"].map((value) => (
                      <label key={value} className="flex items-center space-x-3 cursor-pointer select-none">
                        <input
                          type="radio"
                          name="chopsticks"
                          value={value}
                          checked={chopsticks === value}
                          onChange={(e) => setChopsticks(e.target.value)}
                          className="hidden peer"
                        />
                        <span className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center peer-checked:border-orange-500">
                          <span className={`w-3 h-3 rounded-full flex items-center justify-center ${chopsticks === value ? 'border-4 border-orange-500 bg-orange-500' : ''}`}></span>
                        </span>
                        <span className="text-gray-900 text-sm">{value === "required" ? "必要" : "不要"}</span>
                      </label>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 mt-3">お持ち帰りご希望はありました。ご了承ください。</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">お客様情報</h3>
                  <Link href="/privacy" className="text-blue-600 text-sm underline">
                    プライバシーポリシー
                  </Link>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">お名前</label>
                    <div className="w-full py-2 rounded text-gray-900">{customerInfo.username}</div>
                  </div>

                  <div>
                    <div className="w-full mb-2 py-2 rounded text-gray-900">{customerInfo.firstName}</div>
                    <div className="w-full py-2 rounded text-gray-900">{customerInfo.lastName}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">お電話番号</label>
                    <p className="text-xs text-gray-500 mb-2">*緊急にご連絡させて頂く場合があります。</p>
                    <div className="w-full py-2 rounded text-gray-900">{customerInfo.phone}</div>
                    <Link href="/member-info" className="text-blue-600 text-sm underline">
                      会員情報の電話番号の変更はこちら
                    </Link>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">メールアドレス</label>
                    <div className="w-full py-2 rounded text-gray-900">{customerInfo.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Store & Pickup Info */}
          <div className="space-y-6">
            {/* Store Information */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">お受け取り予定の店舗</h3>
                <div className="flex items-start gap-4">
                  <div className="w-17 h-17 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      <img className="w-17 h-17" src="https://takeout-dev.skylark.co.jp/media/logo/stores/%E3%81%8B%E3%82%89%E5%A5%BD%E3%81%97.png" alt="からあげ牧場北口店" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold">からあげ牧場北口店（東京都）</h4>
                    <p className="text-sm text-gray-600">〒167043</p>
                    <p className="text-sm text-gray-600">東京都杉並区上荻１丁目６－２</p>
                    <p className="text-sm text-gray-600">0570-047-608</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Schedule */}
            <Card className="bg-white py-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">お受け取り予定日時</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>日付</span>
                    <span>2025年06月09日</span>
                  </div>
                  <div className="flex justify-between">
                    <span>時間帯</span>
                    <span>12時50分</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white py-0">
              <CardContent className="p-6 flex flex-col gap-3">
                <h3 className="font-bold mb-4">お支払い方法</h3>
                {paymentOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPaymentOption === option.id}
                      onChange={() => setSelectedPaymentOption(option.id)}
                      className="hidden peer"
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center peer-checked:border-orange-500">
                      <span className={`w-3 h-3 rounded-full flex items-center justify-center ${selectedPaymentOption === option.id ? 'border-4 border-orange-500 bg-orange-500' : ''}`}></span>
                    </span>
                    <span className="text-gray-900 font-medium">{option.label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white py-0 h-[900px]">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">お支払い金額</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>合計数量</span>
                    <span>{totalItems}個</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ご注文金額</span>
                    <span>税込{subtotal}円</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>内税対象額(8%)</span>
                    <span>{subtotal}円</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>内消費税(8%)</span>
                    <span>{tax}円</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>合計</span>
                      <span>税込{total}円</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-600 space-y-2">
                  <p>ご注文後の変更・キャンセル、商品の返品については承っておりません。</p>
                  <p>
                    やむを得ず、ご注文後の変更・キャンセル、商品の返品を行う場合には、ご利用の店舗まで直接お電話にてお問い合わせください。
                  </p>
                  <p>ご利用の店舗の連絡先は「マイメニュー」→「注文履歴」の該当のご注文詳細に記載されております。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex gap-4 justify-center mt-8 max-w-2xl mx-auto">
          <Button variant="outline" className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-500 py-3 h-[45px] w-[320px] rounded-full cursor-pointer">
            商品一覧に戻る
          </Button>
          <Button onClick={handleConfirmOrder} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 h-[45px] w-[320px] rounded-full cursor-pointer">
            注文内容を確定する
          </Button>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 mt-8 text-xs text-gray-500">
          <Link href="/terms">利用規約</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/business-law">特定商取引法に基づく表記</Link>
        </div>

        <div className="text-center mt-4 text-xs text-gray-500">Copyright © SKYLARK GROUP All rights reserved.</div>
      </div>
    </div>
  )
}
