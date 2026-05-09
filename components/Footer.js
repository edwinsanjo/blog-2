export default function Footer() {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A minimalist blog inspired by Obsidian, designed for thoughtful
              writing and seamless reading experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/archive"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Archive
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#twitter"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="Twitter"
              >
                {/* Twitter SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C5 16 3.5 14 3 12c.7.1 1.4.1 2-.1-2.4-.5-4.2-2.5-4.2-4.9.7.4 1.5.6 2.3.6C.7 6.3.3 3.5 1.7 1.3 4.3 4.5 8.1 6.5 12.3 6.7c-.4-1.8.2-3.6 1.5-4.8 1.8-1.7 4.6-1.5 6.3.3.9-.2 1.8-.5 2.5-1-.3.9-1 1.7-1.8 2.2.8-.1 1.6-.3 2.4-.6Z"/></svg>
              </a>
              <a
                href="#github"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="GitHub"
              >
                {/* Github SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.35-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5-.65 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.5 2-4.5-2-7-2"/></svg>
              </a>
              <a
                href="#email"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="Email"
              >
                {/* Mail SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} AxisWrite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
