"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import Header from "@/components/header";

// Helper để so sánh ngày
function isToday(dateStr: string) {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function getHourOptions(selectedDate: string) {
  const now = new Date();
  let startHour = 10;
  if (isToday(selectedDate)) {
    // Nếu là hôm nay, lấy giờ hiện tại (làm tròn lên)
    startHour = Math.max(10, now.getHours());
  }
  return Array.from({ length: 24 - startHour }, (_, i) => {
    const hour = i + startHour;
    if (hour > 23) return null;
    return hour.toString().padStart(2, "0");
  }).filter(Boolean);
}

export default function StorePage() {
  const defaultDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replace(/\//g, "/");
  const defaultHour = new Date().getHours().toString().padStart(2, "0");

  const [selectedDate, setSelectedDate] = useState(defaultDate)
  const [selectedHour, setSelectedHour] = useState(defaultHour)
  const [selectedMinute, setSelectedMinute] = useState("00")
  const [showCalendar, setShowCalendar] = useState(false);

  const store = {
    id: '1',
    name: "から好し荻窪北口店（東京都）",
    logo: "https://takeout-dev.skylark.co.jp/media/logo/stores/%E3%81%8B%E3%82%89%E5%A5%BD%E3%81%97.png",
    address: "〒167043 東京都杉並区上荻1丁目6－2",
    phone: "0570-047-608",
    businessHours: {
      weekday: "10:00 ～ 23:30",
      saturday: "10:00 ～ 23:30",
      sunday: "10:00 ～ 23:30",
    },
  }

  const hourOptions = getHourOptions(selectedDate)

  const minuteOptions = ["00", "10", "20", "30", "40", "50"]

  const handleConfirmPickupTime = () => {
    console.log("Pickup time confirmed:", { selectedDate, selectedHour, selectedMinute })
    // Handle pickup time confirmation
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Store Confirmation */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-6">こちらの店舗でよろしいですか？</h1>
        </div>

        {/* Store Card */}
        <Card className="bg-white shadow-none border-0">
          <CardContent className="px-6 py-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <img
                  src={store.logo}
                  alt={store.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{store.name}</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Time Selection */}
        <Card className="bg-white shadow-none border-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">お受け取り日時を選択してください。</h3>

            <div className="space-y-4">
              {/* Date and Time Selection */}
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                {/* Date Input */}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedDate}
                      readOnly
                      onClick={() => setShowCalendar(true)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none cursor-pointer"
                      placeholder="YYYY/MM/DD"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500 pointer-events-none"
                    >
                      <svg width="20" height="20" fill="currentColor"><path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4H6a1 1 0 0 0-1 1v1h10V7a1 1 0 0 0-1-1z"/></svg>
                    </span>
                    {showCalendar && (
                      <div className="absolute z-50 mt-2 left-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate ? new Date(selectedDate) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              const formatted = date.toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                              }).replace(/\//g, "/");
                              setSelectedDate(formatted);
                              setShowCalendar(false);
                            }
                          }}
                          fromDate={new Date()}
                          className="border rounded-md bg-white shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hour Selection */}
                <div className="flex flex-1 items-center gap-2 w-full">
                  <Select value={selectedHour} onValueChange={setSelectedHour}>
                    <SelectTrigger className="w-full !h-12 !text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hourOptions.filter((hour): hour is string => hour !== null).map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">時</span>
                </div>

                {/* Minute Selection */}
                <div className="flex flex-1 items-center gap-2 w-full">
                  <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                    <SelectTrigger className="w-full !h-12 !text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">分</span>
                </div>
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleConfirmPickupTime}
                className="w-full max-w-sm h-[50px] flex items-center justify-center mx-auto mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold cursor-pointer"
              >
                お受け取り日時を確定する
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Details */}
        <Card className="bg-white shadow-sm">
          <CardContent className="px-6 py-0">
            <h3 className="font-bold text-gray-900 mb-4">店舗詳細</h3>

            <div className="space-y-4">
              {/* Address */}
              <div>
                <div className="flex items-start space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">住所</h4>
                    <p className="text-gray-600 text-xs">{store.address}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-start space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">電話番号</h4>
                    <a href={`tel:${store.phone}`} className="text-blue-600 hover:text-blue-800 text-xs underline">
                      {store.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <div className="flex items-start space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">営業時間</h4>
                    <div className="space-y-1 text-gray-900">
                      <p className="text-xs">平日: {store.businessHours.weekday}</p>
                      <p className="text-xs">土曜日: {store.businessHours.saturday}</p>
                      <p className="text-xs">日曜・祝日: {store.businessHours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
