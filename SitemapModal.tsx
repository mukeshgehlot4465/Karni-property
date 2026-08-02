import React from 'react';
import { X, FileCode, CheckCircle2, Copy } from 'lucide-react';
import { COMPANY_DETAILS, PROPERTIES_DATA } from '../data/mockData';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://karnipropertyjodhpur.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/properties</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/areas-we-serve</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/testimonials</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://karnipropertyjodhpur.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${PROPERTIES_DATA.map(
    (p) => `
  <url>
    <loc>https://karnipropertyjodhpur.com/property/${p.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  ).join('')}
</urlset>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlContent);
    alert('XML Sitemap copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block">SEO Infrastructure</span>
              <h3 className="text-base font-bold font-serif">Sitemap.xml Preview</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">XML Sitemap Index (Ready for Search Console)</span>
            <button
              onClick={copyToClipboard}
              className="bg-[#0A192F] text-[#D4AF37] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 text-[11px]"
            >
              <Copy className="w-3.5 h-3.5" /> Copy XML
            </button>
          </div>

          <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[10px] font-mono overflow-x-auto max-h-80 border border-slate-800 leading-tight">
            {xmlContent}
          </pre>

          <p className="text-[11px] text-slate-500">
            This XML structure maps all 10 site routes and dynamic property URLs for Googlebot indexing and SEO crawlability.
          </p>
        </div>

      </div>
    </div>
  );
};
