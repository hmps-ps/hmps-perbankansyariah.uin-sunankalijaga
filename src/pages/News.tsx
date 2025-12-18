import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, News as NewsType } from "@/lib/supabase";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";

// Helper function untuk menghitung read time
const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Helper function untuk mendapatkan category (simple logic)
const getCategory = (title: string): string => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("acara") || titleLower.includes("kegiatan")) return "Acara";
  if (titleLower.includes("pengumuman")) return "Pengumuman";
  if (titleLower.includes("berita")) return "Berita";
  return "Kegiatan";
};

// Helper function untuk warna badge category
const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Acara":
      return "bg-blue-500";
    case "Pengumuman":
      return "bg-orange-500";
    case "Berita":
      return "bg-green-500";
    case "Kegiatan":
      return "bg-purple-500";
    default:
      return "bg-primary";
  }
};

const News = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setNews(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        title="Berita & Kegiatan"
        description="Informasi terkini seputar kegiatan dan program HMPS Perbankan Syariah"
        showScroll={false}
      />

      {/* Content Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container-fluid">
          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-base sm:text-lg">Belum ada berita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {news.map((item) => {
                const category = getCategory(item.title);
                const readTime = calculateReadTime(item.content);
                const categoryColor = getCategoryColor(category);

                return (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30"
                  >
                    {/* Image Container dengan 4:5 Ratio */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/400x500/000080/D4AF37?text=HMPS';
                        }}
                      />
                      
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 ${categoryColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md`}>
                        {category}
                      </div>

                      {/* Date Badge on Image */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-white text-sm font-medium">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 space-y-3">
                      {/* Meta Info: Date & Read Time */}
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="text-muted-foreground/50">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{readTime} min read</span>
                        </div>
                      </div>

                      {/* Title dengan Gradient */}
                      <h2 className="text-lg sm:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h2>

                      {/* Preview Text */}
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {item.content.substring(0, 120)}...
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold pt-2 group-hover:gap-3 transition-all duration-300">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
