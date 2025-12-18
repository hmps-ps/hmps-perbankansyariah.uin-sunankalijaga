// ============================================
// FILE: src/pages/Home.tsx
// DESKRIPSI: Halaman Beranda Website
// ============================================
// EDIT HERO SECTION DI baris 50-100
// EDIT DATA DIVISI DI divisions array (baris 25-75)
// EDIT BERITA TERKINI DI bagian latestNews (baris 150+)
// ============================================

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ArrowRight, Users, Lightbulb, Megaphone, UserCog, Monitor, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase, News, Division } from "@/lib/supabase";
import { useFooter } from "@/contexts/FooterContext";

const Home = () => {
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { footerData: footerSettings } = useFooter();

  // === DATA DIVISI DEFAULT ===
  const defaultDivisions = [
    {
      id: "1",
      name: "BPH",
      slug: "bph",
      description: "Badan Pengurus Harian - Mengkoordinasikan seluruh kegiatan organisasi",
      icon: "Users",
    },
    {
      id: "2",
      name: "LITBANG", 
      slug: "litbang",
      description: "Penelitian dan Pengembangan - Kajian ilmiah ekonomi syariah",
      icon: "Lightbulb",
    },
    {
      id: "3",
      name: "HUMAS",
      slug: "humas",
      description: "Hubungan Masyarakat - Komunikasi internal dan eksternal",
      icon: "Megaphone",
    },
    {
      id: "4",
      name: "PSDM",
      slug: "psdm",
      description: "Pengembangan SDM - Meningkatkan kapasitas anggota",
      icon: "UserCog",
    },
    {
      id: "5",
      name: "MIT",
      slug: "mit",
      description: "Media dan IT - Pengelolaan media dan teknologi",
      icon: "Monitor",
    },
    {
      id: "6",
      name: "ENTRE",
      slug: "entre",
      description: "Entrepreneurship - Pengembangan wirausaha syariah",
      icon: "Briefcase",
    },
  ];

  // === FUNGSI UNTUK MENDAPATKAN ICON ===
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Users: <Users className="h-8 w-8" />,
      Lightbulb: <Lightbulb className="h-8 w-8" />,
      Megaphone: <Megaphone className="h-8 w-8" />,
      UserCog: <UserCog className="h-8 w-8" />,
      Monitor: <Monitor className="h-8 w-8" />,
      Briefcase: <Briefcase className="h-8 w-8" />,
    };
    return icons[iconName] || <Users className="h-8 w-8" />;
  };

  useEffect(() => {
    fetchLatestNews();
    fetchDivisions();
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data } = await supabase
      .from("about_page_content")
      .select("content")
      .eq("section_type", "story")
      .maybeSingle();
    if (data && data.content && (data.content as any).logo_url) {
      setLogoUrl((data.content as any).logo_url);
    }
  };

  const fetchLatestNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    
    if (data) setLatestNews(data);
  };

  const fetchDivisions = async () => {
    const { data } = await supabase
      .from("divisions")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (data && data.length > 0) {
      setDivisions(data);
    } else {
      // Gunakan data default jika tidak ada di database
      setDivisions(defaultDivisions as Division[]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ============================================ */}
      {/* NEW HERO SECTION WITH GRADIENT */}
      {/* ============================================ */}
      <Hero
        title="HMPS Perbankan Syariah"
        description={footerSettings?.org_description ?? "Membangun generasi ekonom Islam yang berintegritas, profesional, dan berwawasan global."}
      />

      {/* ============================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================ */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Tentang Kami
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                HMPS Perbankan Syariah adalah himpunan mahasiswa yang berkomitmen untuk mengembangkan ilmu pengetahuan di bidang perbankan syariah dan ekonomi Islam.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {footerSettings?.org_description ?? `Kami aktif dalam berbagai kegiatan akademik, penelitian, pelatihan, dan pengabdian masyarakat untuk berkontribusi pada perkembangan industri perbankan syariah di Indonesia.`}
              </p>
            </div>
            <div className="animate-slide-down rounded-lg overflow-hidden shadow-large h-96 bg-gradient-to-br from-navy/20 to-gold/20 flex items-center justify-center p-6">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : null
              }
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DIVISI SECTION - KARTU DIVISI ORGANISASI */}
      {/* ============================================ */}
      <section className="section bg-slate-50 dark:bg-slate-800">
        <div className="container-fluid">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Divisi Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enam divisi yang saling mendukung untuk mencapai visi organisasi
            </p>
          </div>

          {/* === GRID KARTU DIVISI === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((division, index) => (
              <Link
                key={division.id}
                to={`/divisi/${division.slug}`}
                className="animate-slide-up group card-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {getIcon(division.icon)}
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {division.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {division.description}
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all duration-300">
                  Selengkapnya <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BERITA TERKINI SECTION */}
      {/* ============================================ */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container-fluid">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-3">
                Berita Terkini
              </h2>
              <p className="text-lg text-muted-foreground">
                Informasi dan artikel terbaru dari HMPS Perbankan Syariah
              </p>
            </div>
            <Link to="/news" className="hidden md:block">
              <Button variant="outline" className="gap-2">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* === GRID BERITA === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestNews.map((news, index) => (
              <Link
                key={news.id}
                to={`/news/${news.slug}`}
                className="animate-slide-up card-hover overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {news.image_url && (
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      Berita
                    </span>
                    {news.created_at && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(news.created_at).toLocaleDateString('id-ID')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {news.content}
                  </p>
                  <div className="flex items-center text-primary font-semibold">
                    Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/news" className="block md:hidden">
            <Button className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold gap-2">
              Lihat Semua Berita <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>


    </div>
  );
};

export default Home;
