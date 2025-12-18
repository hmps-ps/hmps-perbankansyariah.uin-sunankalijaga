import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAboutPageContent } from '@/hooks/use-about-page';
import { getIconComponent } from '@/lib/utils';

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export default function About() {
  const { content, loading, error, fetchPublishedContent } = useAboutPageContent();
  const [heroData, setHeroData] = useState<any>(null);
  const [storyData, setStoryData] = useState<any>(null);
  const [statsData, setStatsData] = useState<StatItem[]>([]);
  const [visionData, setVisionData] = useState<any>(null);
  const [missionData, setMissionData] = useState<any>(null);
  const [valuesData, setValuesData] = useState<any[]>([]);
  const [ctaData, setCtaData] = useState<any>(null);

  // Extract data from database
  useEffect(() => {
    if (content && content.length > 0) {
      content.forEach((item) => {
        if (item.section_type === 'hero' && item.content) {
          setHeroData(item.content);
        } else if (item.section_type === 'story' && item.content) {
          setStoryData(item.content);
        } else if (item.section_type === 'stats' && item.content) {
          // ✅ FIXED: Extract from new 'stats' field (was 'items')
          setStatsData(item.content.stats || item.content.items || []);
        } else if (item.section_type === 'vision' && item.content) {
          setVisionData(item.content);
        } else if (item.section_type === 'mission' && item.content) {
          // ✅ FIXED: Extract from new 'mission' field (was content directly)
          setMissionData(item.content.mission ? { items: item.content.mission } : item.content);
        } else if (item.section_type === 'values' && item.content) {
          // ✅ FIXED: Extract from new 'values' field (was 'items')
          setValuesData(item.content.values || item.content.items || []);
        } else if (item.section_type === 'cta' && item.content) {
          setCtaData(item.content);
        }
      });
    }
  }, [content]);

  // Fetch published content on mount
  useEffect(() => {
    fetchPublishedContent();
  }, []);

  if (error) {
    return (
      <div className="w-full">
        <div className="section bg-white dark:bg-slate-900">
          <div className="container-fluid">
            <div className="flex items-center gap-4 p-6 bg-destructive/10 border border-destructive rounded-lg">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">Error Loading Content</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="section bg-white dark:bg-slate-900">
          <div className="container-fluid">
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      {heroData ? (
        <Hero
          title={heroData.title || 'Tentang HMPS Perbankan Syariah'}
          description={heroData.description || 'Himpunan Mahasiswa Program Studi Perbankan Syariah'}
          showScroll={true}
        />
      ) : (
        <Hero
          title="Tentang HMPS Perbankan Syariah"
          description="Himpunan Mahasiswa Program Studi Perbankan Syariah - Membangun masa depan perbankan yang lebih Islami dan berkelanjutan"
          showScroll={true}
        />
      )}

      {/* Story Section */}
      {storyData && (
        <section className="section bg-white dark:bg-slate-900">
          <div className="container-fluid">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <Badge className="mb-4 bg-gold/20 text-gold hover:bg-gold/30">
                  {storyData.badge || 'Kisah Kami'}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                  {storyData.heading || 'Perjalanan Panjang Dedikasi'}
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  {storyData.paragraph1 || ''}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {storyData.paragraph2 || ''}
                </p>
              </div>
              <div className="animate-slide-down rounded-lg overflow-hidden shadow-large h-96 bg-gradient-to-br from-navy/20 to-gold/20 flex items-center justify-center p-6">
                {storyData?.highlight_number ? (
                  <div className="text-center">
                    <div className="text-9xl font-black animate-shimmer bg-gradient-to-r from-navy via-gold to-navy bg-clip-text text-transparent leading-none">
                      {storyData.highlight_number}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Angka</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {statsData && statsData.length > 0 && (
        <section className="section bg-gradient-navy-gold text-white">
          <div className="container-fluid">
            <h2 className="text-4xl font-bold text-center mb-12">Pencapaian Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat: any, index: number) => (
                <div
                  key={index}
                  className="card-glass bg-white/10 text-center p-8 animate-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4 text-gold">
                    {getIconComponent(stat.icon, 'w-6 h-6')}
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container-fluid">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            Visi & Misi
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            {visionData && (
              <Card className="border-2 border-gold/20 hover:border-gold/40 transition">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-gradient">
                    {visionData.title || 'Visi Kami'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {visionData.content || ''}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Mission */}
            {missionData && (
              <Card className="border-2 border-gold/20 hover:border-gold/40 transition">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-gradient">
                    {missionData.title || 'Misi Kami'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {missionData.items && missionData.items.map((item: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-gold font-bold">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Core Values */}
      {valuesData && valuesData.length > 0 && (
        <section className="section bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="container-fluid">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
              Nilai-Nilai Inti Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuesData.map((value: any, index: number) => (
                <Card
                  key={index}
                  className="border-0 bg-white dark:bg-slate-800 hover:shadow-lg transition animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gold/20 rounded-lg">
                        {getIconComponent(value.icon, 'w-5 h-5 text-gold')}
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
