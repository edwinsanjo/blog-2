Prompt to Build Frontend-Only Obsidian Blog App

Objective:
Build a frontend-only Next.js blog app that dynamically fetches content from a local Obsidian vault and displays blogs categorized by folders. The design should be fully dark-themed, heavily inspired by Obsidian, with distinct primary colors per blog.

Tech Stack
Next.js (React-based frontend)
Docker (frontend-only hosting)
No backend; markdown files and index.json are read dynamically
Vault Structure
vault/
│
├─ index.json                # defines all active blogs
├─ assets/                   # root assets for cover images
│   ├─ tech-cover.png
│   └─ finance-cover.png
├─ tech/
│   ├─ assets/               # tech-specific images accessible by blogs
│   │   ├─ blog1.png
│   │   └─ blog2.png
│   ├─ standalone-blog1.md
│   ├─ standalone-blog2.md
│   └─ series1/
│       ├─ blog1.md
│       ├─ blog2.md
│       └─ blog3.md
├─ finance/
│   ├─ assets/
│   │   ├─ blog1.png
│   │   └─ blog2.png
│   ├─ standalone-blog1.md
│   ├─ series1/
│       ├─ blog1.md
│       └─ blog2.md
index.json Example
[
  {
    "name": "Tech Blog",
    "description": "Latest tech tutorials and insights",
    "image": "tech-cover.png",
    "primary": "#1B5E20",          // dark green inspired by Obsidian
    "enabled": true,
    "folder": "tech"
  },
  {
    "name": "Finance Blog",
    "description": "Financial wisdom and investment guides",
    "image": "finance-cover.png",
    "primary": "#4A148C",          // dark purple inspired by Obsidian
    "enabled": true,
    "folder": "finance"
  }
]
Markdown File Examples

1. Standalone Blog (tech/standalone-blog1.md)

---
title: "Understanding AI in 2026"
description: "A concise guide to modern AI trends"
date: "2026-05-09"
tags: ["AI", "Machine Learning"]
banner: "blog1.png"
---

# Introduction

This is the content of the standalone tech blog.  

![Example Image](./assets/blog1.png)

## Key Points

- AI is evolving fast
- Important trends to watch

2. Series Blog (tech/series1/blog1.md)

---
title: "React Advanced Patterns - Part 1"
description: "Deep dive into React component patterns"
date: "2026-05-09"
tags: ["React", "JavaScript"]
series: "React Advanced Patterns"
order: 1
banner: "../assets/blog2.png"
---

# Part 1: Introduction

This is the first blog in the "React Advanced Patterns" series.  

![Series Image](../assets/blog2.png)

## Overview

- Context API
- Custom Hooks

Notes on Markdown Conversion:

Use a Markdown parser like remark or react-markdown to convert .md content to HTML.
Images should resolve relative to the .md file location. For example:
Standalone blog: ./assets/blog1.png
Series blog: ../assets/blog2.png
Dynamic Rendering
On every page load, fetch index.json and markdown files dynamically.
Any new markdown or image updates should reflect immediately on reload, no rebuild needed.
Design & Theme
Fully dark theme inspired by Obsidian’s default theme.
Primary colors from index.json used for buttons, highlights, links, and headers.
Use Obsidian-style font, spacing, and markdown styling.
Blog pages:
Home: List of all blogs in that folder
Blogs: Standalone blogs
Series: Grouped by series header
Tags: Filterable by tags header
Docker Setup

Dockerfile Example:

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Mount the vault to access markdown and assets
VOLUME ["/app/vault"]

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
Mount the vault folder when running the container:
docker run -v /local/path/to/vault:/app/vault -p 3000:3000 your-blog-image
Deliverables
Next.js frontend blog app
Example vault folder with:
Tech and Finance blogs
Series and standalone markdowns
index.json and assets
Dynamic loading of markdown and images
Obsidian-inspired dark theme
Dockerfile for easy deployment
