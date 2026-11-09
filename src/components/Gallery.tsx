import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { schoolConfig, GalleryItem } from '../config/schoolConfig';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Classrooms',
    'Learning Activities',
    'Campus',
    'Student Projects',
  ];

  const filteredItems = activeFilter === 'All'
    ? schoolConfig.gallery
    : schoolConfig.gallery.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightboxImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200 mb-3">
            Campus Life & Memories
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            School Moments & Activities
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Glimpses into our dynamic classrooms, science practicals, quiet study spaces, and student milestones in Lahore.
          </p>
        </div>

        {/* Filter Tabs / Segmented Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === category
                  ? 'bg-[#0f244a] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-xl cursor-pointer transition-all duration-300 aspect-4/3"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {item.category}
                </span>
                <p className="text-sm font-bold text-white line-clamp-1">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Sample Photos Notice */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          *Royalty-free educational photographs used as temporary demo previews. Administration can upload authentic school function and campus images anytime.
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={prevLightboxImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={nextLightboxImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image and Caption */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-center text-white mt-4 max-w-lg">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                {filteredItems[lightboxIndex].category} · Image {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
