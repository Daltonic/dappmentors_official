import { ProductProp } from "@/utils/interfaces";
import Image from "next/image";

// ProductCard component with thumbnail image
const ProductCard = ({ product }: { product: ProductProp }) => (
  <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent w-full max-w-[380px]">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    ></div>

    <div className="relative z-10">
      {/* Thumbnail Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* Floating Icon */}
        <div
          className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        >
          {product.image}
        </div>

        {/* Product Type Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.type}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
          {product.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">⏱️</span>
            <span className="text-gray-600 dark:text-gray-300">
              {product.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📈</span>
            <span className="text-gray-600 dark:text-gray-300">
              {product.level}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#D2145A] rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {product.price}
          </div>
          {/* Enroll Now Button */}
          {product.type === "Course" && (
            <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Enroll Now
            </button>
          )}

          {product.type === "Bootcamp" && (
            <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Reserve Spot
            </button>
          )}

          {product.type === "eBook" && (
            <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Download eBook
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
