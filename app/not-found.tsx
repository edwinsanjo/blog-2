import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 py-12">
      {/* Creative SVG Graph */}
      <div className="relative">
        <svg className="w-72 h-72 mx-auto" viewBox="0 0 200 200">
          {/* Background circles for depth */}
          <circle cx="100" cy="100" r="80" className="fill-none stroke-border" opacity="0.2" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" className="fill-none stroke-border" opacity="0.1" strokeWidth="1" />
          
          {/* Connections */}
          <line x1="100" y1="100" x2="40" y2="60" className="stroke-border" strokeWidth="1.5" />
          <line x1="100" y1="100" x2="160" y2="70" className="stroke-border" strokeWidth="1.5" />
          <line x1="100" y1="100" x2="70" y2="150" className="stroke-border" strokeWidth="1.5" />
          
          {/* Disconnected path to 404 */}
          <line x1="100" y1="100" x2="130" y2="140" className="stroke-primary" opacity="0.7" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* Central Node */}
          <circle cx="100" cy="100" r="12" className="fill-background stroke-primary" strokeWidth="2" />
          <circle cx="100" cy="100" r="6" className="fill-primary" />
          
          {/* Existing Nodes */}
          <circle cx="40" cy="60" r="8" className="fill-secondary stroke-border" />
          <circle cx="160" cy="70" r="8" className="fill-secondary stroke-border" />
          <circle cx="70" cy="150" r="8" className="fill-secondary stroke-border" />
          
          {/* 404 Node */}
          <circle cx="130" cy="140" r="10" className="fill-background stroke-destructive animate-pulse" strokeWidth="2" />
          <circle cx="130" cy="140" r="4" className="fill-destructive" />
          
          {/* Text Labels */}
          <text x="100" y="80" textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-muted-foreground">Index</text>
          <text x="40" y="45" textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-muted-foreground">Tech</text>
          <text x="160" y="55" textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-muted-foreground">Finance</text>
          <text x="130" y="165" textAnchor="middle" fontSize="10" fontFamily="monospace" className="fill-destructive font-bold">Unlinked</text>
        </svg>
        
        {/* Abstract glow */}
        <div className="absolute inset-0 bg-primary/5 blur-[50px] rounded-full -z-10" />
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        <h1 className="text-4xl font-black text-foreground tracking-tight">Unlinked Reference</h1>
        <p className="text-muted-foreground text-sm leading-relaxed text-balance">
          The node you are looking for is not connected to the vault graph. It might have been moved, renamed, or deleted.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-background bg-primary hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Index
        </Link>
        <Link
          href="/tech"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border bg-secondary/50 text-foreground text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
        >
          <Compass className="w-4 h-4" />
          Explore Vault
        </Link>
      </div>
    </div>
  );
}
