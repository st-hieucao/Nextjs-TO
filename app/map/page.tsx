// https://skylark-map-stg-5cepxdh22a-an.a.run.app/gusto/?takeout&coupon&forward=takeout&iframe&c=%E3%83%86%E3%82%A4%E3%82%AF%E3%82%A2%E3%82%A6%E3%83%88%E5%8F%AF

import Header from "@/components/header"

export default function MapPage() {
  return (
    <div className="w-full h-full">
      <Header />

      <div className="w-screen h-screen">
        <iframe className="w-full h-full" src="https://skylark-map-stg-5cepxdh22a-an.a.run.app/gusto/?takeout&coupon&forward=takeout&iframe&c=%E3%83%86%E3%82%A4%E3%82%AF%E3%82%A2%E3%82%A6%E3%83%88%E5%8F%AF" />
      </div>
    </div>
  )
}