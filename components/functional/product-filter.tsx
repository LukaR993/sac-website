'use client'
import React, { useState } from 'react'

export default function ProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    'All',
    'Wine',
    'Spirits',
    'Beer',
    'Accessories'
  ]

  return (
    <div className="container mx-auto px-4 md:px-0 mb-8 py-8">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D1C21] focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedCategory === category || (category === 'All' && selectedCategory === null)
                ? 'bg-[#7D1C21] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
