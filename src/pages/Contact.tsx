import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { useFooter } from "@/contexts/FooterContext";
import Hero from "@/components/Hero";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { footerData, loading: footerLoading } = useFooter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("contacts")
      .insert([formData]);

    setLoading(false);

    if (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      console.error(error);
    } else {
      toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  useEffect(() => {
    // Data sudah di-fetch dari Context (FooterProvider)
    // Tidak perlu fetch lagi di sini
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        title="Hubungi Kami"
        description="Punya pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi kami"
        showScroll={false}
      />

      {/* Content Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft">
            <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
              Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-12 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-12 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm sm:text-base">Pesan</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tulis pesan Anda di sini..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="resize-none text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 sm:h-12 text-sm sm:text-base"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft">
              <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Alamat</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm break-words">
                      {footerData?.address ? (
                        <span dangerouslySetInnerHTML={{ __html: footerData.address.replace(/\n/g, "<br />") }} />
                      ) : (
                        <>
                          Menghubungkan ke lokasi...<br />
                          Silahkan tunggu sebentar
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Email</h3>
                    <a
                      href={`mailto:${footerData?.email ?? "hmps@university.ac.id"}`}
                      className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors break-all"
                    >
                      {footerData?.email ?? "hmps@university.ac.id"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Telepon</h3>
                    <a
                      href={`tel:${(footerData?.phone ?? "+62 812-3456-7890").replace(/\s/g,"")}`}
                      className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors break-all"
                    >
                      {footerData?.phone ?? "+62 812-3456-7890"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-soft h-64 sm:h-80 lg:h-96">
              {footerData?.maps_embed_url ? (
                <iframe
                  key={footerData.maps_embed_url}
                  src={footerData.maps_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Memuat peta lokasi...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
