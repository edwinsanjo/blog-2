import Link from 'next/link';
import { Github, Globe, Linkedin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#242424] border-t border-[#3a3a3a] mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* About */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-[#e8e6e1]">ObsidianBlog</h3>
              <p className="text-[#9a9a9a] leading-relaxed max-w-xs">
                A minimalist blog powered by Obsidian, designed for thoughtful
                writing and seamless reading experiences. Write once, sync everywhere.
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-xs font-bold text-[#9a9a9a] uppercase tracking-widest">
                Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Edwin Sanjo Soji
              </p>
              <p 
                className="text-xs font-medium uppercase tracking-tight text-oklab-gray"
              >
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>

          {/* Social & Feed */}
          <div className="space-y-6">
            <h3 className="font-semibold text-[#e8e6e1] mb-6">Stay Connected</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/edwinsanjosoji"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-hover inline-flex text-[#9a9a9a] hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://blog.crucibles.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-hover inline-flex text-[#9a9a9a] hover:text-primary transition-all"
                aria-label="Personal Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/edwinsanjosoji"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-hover inline-flex text-[#9a9a9a] hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/_edwin.12_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-hover inline-flex text-[#9a9a9a] hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[#9a9a9a] font-medium leading-relaxed ">
              Congratulations. You scrolled. You conquered. <br/>Now, go outside and touch some actual grass.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}