import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundType?: 'gradient' | 'image';
  backgroundImage?: string;
  cta?: { label: string; href: string; variant?: 'default' | 'outline' }[];
  showScroll?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  backgroundType = 'gradient',
  backgroundImage,
  cta,
  showScroll = true,
}: HeroProps) {
  const backgroundStyle =
    backgroundType === 'image' && backgroundImage
      ? {
          backgroundImage: `linear-gradient(135deg, rgba(0, 32, 128, 0.8) 0%, rgba(212, 165, 116, 0.6) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          backgroundImage: 'linear-gradient(135deg, #002080 0%, #D4A574 50%, #1F4620 100%)',
        };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={backgroundStyle}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-fluid text-center text-white">
        {subtitle && (
          <div className="animate-fade-in mb-4">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold">
              {subtitle}
            </span>
          </div>
        )}

        <h1
          className="animate-slide-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ animationDelay: '0.1s' }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="animate-slide-up text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            style={{ animationDelay: '0.2s' }}
          >
            {description}
          </p>
        )}

        {cta && cta.length > 0 && (
          <div
            className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-12"
            style={{ animationDelay: '0.3s' }}
          >
            {cta.map((button, index) => (
              <Button
                key={index}
                asChild
                variant={button.variant || 'default'}
                className={`${
                  button.variant === 'outline'
                    ? 'bg-transparent border-2 border-white text-white hover:bg-white/10'
                    : 'bg-gold hover:bg-gold/90 text-primary font-semibold'
                } text-base sm:text-lg px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-gold`}
              >
                <a href={button.href}>{button.label}</a>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      )}
    </div>
  );
}
