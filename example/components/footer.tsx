import { Github, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A minimalist blog inspired by Obsidian, designed for thoughtful
              writing and seamless reading experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
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
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#twitter"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#github"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#email"
                className="p-2 rounded-lg glass-hover inline-flex"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ObsidianBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
