import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { SEOHead } from '../components/SEOHead';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Jodhpur Real Estate Insights & Rental Blog | Karni Property"
        description="Expert articles on Jodhpur property trends 2026, Rajasthan rent agreement rules, e-stamping, and commercial office hubs in Sardarpura and Pal Road."
      />

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 text-center space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
          Market Intelligence & Legal Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif">
          Jodhpur Real Estate Blog
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Stay informed on rental yield trends, Rajasthan e-stamping procedures, and prime commercial developments in Jodhpur.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 bg-slate-800 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0A192F] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-[#0A192F] text-base font-serif leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">By {post.author}</span>
              <button
                onClick={() => setSelectedPost(post)}
                className="text-xs font-bold text-[#0A192F] hover:text-[#D4AF37] flex items-center gap-1"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE READING MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-10 bg-[#0A192F] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                  {selectedPost.category}
                </span>
                <h3 className="text-lg font-bold font-serif line-clamp-1">{selectedPost.title}</h3>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl" />

              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="font-bold text-[#0A192F]">Author: {selectedPost.author}</span>
                <span>{selectedPost.date} • {selectedPost.readTime}</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
