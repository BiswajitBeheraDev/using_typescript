// app/store/page.tsx
import ProductCard from "@/Components/Organism/productcard"
import products from "../../../prisma/data/dummydata"
import Slider from "@/Components/molecules/slider"

export default function StorePage() {
  return (
    <div>
      <Slider/>
    <div className="max-w-7xl mx-auto px-4 my-10">
      <h1 className="text-2xl font-bold mb-6">My Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </div>
  )
}
