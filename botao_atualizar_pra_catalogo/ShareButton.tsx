import React, { useState } from 'react';

interface ShareButtonProps {
  vehicleId: string;
  vehicleName: string;
  variant?: 'floating' | 'full';
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  vehicleId,
  vehicleName,
  variant = 'floating',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const shareUrl = `${window.location.origin}?v=${vehicleId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: vehicleName,
          text: `Confira este veículo no catálogo: ${vehicleName}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Compartilhamento cancelado pelo usuário.');
          return;
        }
        console.log('Navigator share falhou, tentando copiar:', err);
      }
    }

    // Fallback to Clipboard Copy
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      alert('Não foi possível copiar o link automaticamente. Copie a URL do seu navegador.');
    }
  };

  if (variant === 'floating') {
    const positionClass = className.includes('absolute') || className.includes('fixed') ? '' : 'relative';
    return (
      <div className={`${positionClass} ${className}`}>
        <button
          onClick={handleShare}
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gold flex items-center justify-center hover:bg-gold hover:text-black active:scale-95 transition-all shadow-md cursor-pointer"
          title="Compartilhar veículo"
        >
          <span className="material-symbols-outlined text-sm select-none">
            {copied ? 'check' : 'share'}
          </span>
        </button>
        
        {/* Tooltip toast */}
        <span
          className={`absolute bottom-9 right-0 bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap transition-all duration-300 z-50 ${
            copied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
          }`}
        >
          Link copiado!
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleShare}
      className={`w-full py-3 transition-all rounded-xl flex items-center justify-center gap-2 border hover:-translate-y-0.5 active:scale-95 text-sm font-bold uppercase tracking-wider cursor-pointer ${
        copied
          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
          : 'bg-white/5 hover:bg-gold hover:text-black text-white border-white/10 hover:border-gold/20'
      } ${className}`}
    >
      <span className="material-symbols-outlined text-lg select-none">
        {copied ? 'check' : 'share'}
      </span>
      <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
    </button>
  );
};

export default ShareButton;
