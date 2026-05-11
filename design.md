# Design System Documentation

This document outlines the design system, aesthetics, and implementation details of the web application. The design focuses on a premium, dark-themed experience with minimalist aesthetics and dynamic accents.

## Core Aesthetics

The design is centered around a **Premium Dark Theme** with high-contrast typography and subtle glassmorphic elements. The goal was to create a clean, non-distracting environment that feels state-of-the-art and visually engaging.

### Key Principles:
-   **Minimalism**: Unnecessary borders and elements were removed to reduce cognitive load.
-   **Contrast**: High-contrast text on dark backgrounds ensures readability.
-   **Dynamic Accents**: Use of dynamic brand colors to provide visual identity without overwhelming the content.

## Color Palette

The color palette is strictly curated to maintain a consistent dark vibe while allowing for dynamic brand accents.

### Base Colors:
-   **App Background**: `#1e1e1e` (Rich, deep dark gray).
-   **Surface/Card Background**: `#292929` (Slightly lighter dark gray for elevation).
-   **Card Hover Background**: `#2C2C2C` (Subtle lift on interaction).
-   **Tag/Pill Background**: `#404040` (Dark gray for contrast with text).

### Typography Colors:
-   **Primary Text**: `#e8e6e1` (Off-white, reducing harshness of pure white while maintaining high contrast).
-   **Muted Text**: `#9a9a9a` (Soft gray for descriptions, metadata, and dates).
-   **Tag Text**: `#9A9A9A` (Muted gray for pill labels).

### Dynamic Accents:
The application supports dynamic primary colors defined per section/blog. These colors are used for:
-   Header icons.
-   Section indicator lines.
-   Hover states on titles and interactive elements (e.g., arrows).
-   Active button states.

## Typography

Typography is clean and functional, relying on system font stacks or modern sans-serif fonts.

-   **Headings**: Bold, prominent (`text-2xl` for section items, `text-4xl` for main titles) with tight leading.
-   **Body/Descriptions**: Smaller (`text-sm`) with relaxed leading for readability.
-   **Metadata**: Monospace or small uppercase text for dates and counters, using muted colors.

## Layouts and Components

### Cards (Grid Items)
Cards are the primary way information is presented. They feature:
-   No borders (borderless design).
-   Rich paddings (`p-7` or `p-8`).
-   Subtle box shadows on hover with negative translate effect (`-translate-y-1`).
-   An interactive arrow element that changes opacity and slides slightly on hover.

### Lists
Lists are used for sequential items (like series steps). They feature:
-   Order numbers in circles with 10% opacity of the brand color.
-   Clean vertical separation.
-   Responsive hiding of secondary details (like dates and tags) on smaller screens.

### Navigation and Header
-   Sticky header with `backdrop-blur-md` and 40% white opacity in light mode (or 5% in dark).
-   Rounded bottom corners for a "floating" feel.
-   Interactive mobile menu drawer with rich dark background (`#1A1A1A`/95) and strong blur effects.

## Implementation Details

-   **Tailwind CSS**: Used for all styling, leveraging arbitrary values for exact color matching.
-   **CSS Variables**: Used to pass dynamic brand colors from parent containers to deeply nested children (e.g., `--primary-color`).
-   **Interaction Handling**: Combined Tailwind `group-hover` utilities with lightweight JavaScript event handlers where CSS variable opacity resolution required precise control.
