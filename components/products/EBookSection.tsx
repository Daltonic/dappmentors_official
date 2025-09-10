"use client";

import { Product } from "@/utils/interfaces";
import Link from "next/link";

interface EBooksSectionProps {
  products: Product[];
}

const EBooksSection = ({ products }: EBooksSectionProps) => {
  const ebooks = products;

  return (
    <section className="py-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-white mb-6">
            Expert Web3 eBooks
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Master Web3 concepts with our expertly written eBooks, packed with
            actionable insights and practical guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {"📘"}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    ${ebook.price}
                  </div>
                  <div className="text-white/70 text-sm">
                    ★ {ebook.rating || "4.5/5"}
                  </div>
                </div>
              </div>

              <Link href={`/products/${ebook.slug}`} title={ebook.title}>
                <h3 className="text-2xl font-bold text-white transition-colors duration-300 line-clamp-2 mb-4">
                  {ebook.title}
                </h3>
              </Link>

              <p className="text-white/80 mb-6 leading-relaxed">
                {ebook.description}
              </p>

              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {"200+ pages"}
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  {"PDF & ePub"}
                </span>
              </div>

              {ebook.features && ebook.features.length > 0 && (
                <div className="space-y-2 mb-8">
                  {ebook.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-white/70 text-sm">
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full bg-white text-[#D2145A] py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                Download eBook
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EBooksSection;
