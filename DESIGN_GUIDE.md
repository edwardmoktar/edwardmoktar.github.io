# Portfolio Design Guide

This document outlines the complete color scheme and design tokens used in the portfolio website for both light and dark modes. Use this guide to ensure consistency across all components and new additions.

## Color Palette

### Light Mode

#### Primary Colors
- **Primary Brown:** `#594126` / `hsl(20, 25%, 33%)` 
  - Usage: Primary buttons, headings, and emphasis elements
  - Tailwind: `bg-primary`, `text-[#594126]`, `border-primary`

#### Secondary Colors
- **Secondary Brown:** `#8C6D4F` / Lighter brown variant
  - Usage: Secondary buttons, icons, accents
  - Tailwind: Customized via `text-[#8C6D4F]`
- **Accent Gold/Yellow:** `#F0C040` 
  - Usage: Highlights, special accents, active states
  - Tailwind: Customized via `text-[#f0c040]`

#### Background Colors
- **Page Background:** `#F6F3EE` / `hsl(34, 20%, 96%)`
  - Usage: Main page background
  - Tailwind: `bg-[#F6F3EE]`, `bg-background`
- **Card Background:** `hsl(34, 33%, 99%)` / Slightly lighter than page
  - Usage: Cards, containers, sections
  - Tailwind: `bg-card`
- **Secondary Background:** `#f8f7f5` / Very light beige
  - Usage: Secondary sections, highlighted areas
  - Tailwind: Custom via `bg-[#f8f7f5]`
- **Muted Background:** `hsl(34, 33%, 90%)` / Subtle beige
  - Usage: Subtler interface elements
  - Tailwind: `bg-muted`

#### Text Colors
- **Primary Text:** `hsl(20, 25%, 33%)` / Dark brown
  - Usage: Main text
  - Tailwind: `text-foreground`
- **Muted Text:** `hsl(20, 25%, 45%)` / Lighter brown
  - Usage: Secondary text, captions, less important information
  - Tailwind: `text-muted-foreground`
- **Gray Text:** `text-gray-700`
  - Usage: Tertiary information

#### Border Colors
- **Border:** `hsl(34, 20%, 96%)` / Same as background
  - Usage: Dividers, outlines, separators
  - Tailwind: `border-border`, `border-[#F6F3EE]`
- **Button/Card Border:** `rgba(140, 109, 79, 0.2)` / Semi-transparent brown
  - Usage: Subtle borders on interactive elements

#### Hover/Active Colors
- **Link Hover:** `#4d78cc` / Blue
  - Usage: Interactive elements when hovered
- **Button Hover:** Opacity changes or slightly darker versions of base colors
  - Usage: Buttons when hovered

#### Shadow/Effect Colors
- **Card Shadow:** `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`
  - Usage: Subtle elevation for cards and containers
- **Button Shadow:** `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
  - Usage: Emphasis for buttons and interactive elements

### Dark Mode

#### Primary Colors
- **Primary Light Blue:** `hsl(210, 40%, 98%)` / Almost white blue
  - Usage: Primary buttons, headings, and emphasis elements
  - Tailwind: `dark:bg-primary`, `dark:text-primary`

#### Secondary Colors
- **Accent Gold/Yellow:** `#F0C040` 
  - Usage: Highlights, active elements, special emphasis
  - Tailwind: `dark:text-[#f0c040]`
- **Secondary Blue:** `#4d78cc` / Brighter blue
  - Usage: Secondary emphasis, icons, accents
  - Tailwind: Custom via `dark:text-[#4d78cc]`

#### Background Colors
- **Page Background:** `#020817` / `hsl(225, 60%, 8%)`
  - Usage: Main page background
  - Tailwind: `dark:bg-[#020817]`, `dark:bg-background`
- **Card Background:** `hsl(224, 76%, 12%)` / Slightly lighter navy
  - Usage: Cards, containers, elevated sections
  - Tailwind: `dark:bg-card`
- **Secondary Background:** `#1A1F2C` / Navy blue
  - Usage: Secondary sections, form elements
  - Tailwind: Custom via `dark:bg-[#1A1F2C]`
- **Tertiary Background:** `#232731` / Medium navy
  - Usage: Tertiary sections, hover states
  - Tailwind: Custom via `dark:bg-[#232731]`
- **Accent Background:** `#1d2d3d` / Blue-gray
  - Usage: Special sections, callouts
  - Tailwind: Custom via `dark:bg-[#1d2d3d]`

#### Text Colors
- **Primary Text:** `hsl(210, 40%, 98%)` / Light blue-white
  - Usage: Main text
  - Tailwind: `dark:text-foreground`
- **Muted Text:** `hsl(215, 20.2%, 65.1%)` / Gray-blue
  - Usage: Secondary text, captions
  - Tailwind: `dark:text-muted-foreground`
- **Gray Text:** `text-gray-300`
  - Usage: Tertiary information

#### Border Colors
- **Border:** `hsl(225, 60%, 8%)` / Same as background
  - Usage: Dividers, outlines, separators
  - Tailwind: `dark:border-border`, `dark:border-[#020817]`
- **Accent Border:** `rgba(240, 192, 64, 0.3)` / Semi-transparent gold
  - Usage: Highlighting borders, active states

#### Hover/Active Colors
- **Link Hover:** `text-blue-300` / Lighter blue
  - Usage: Interactive elements when hovered
- **Button Hover:** `#20304f` / Lighter navy
  - Usage: Buttons when hovered

#### Shadow/Effect Colors
- **Card Shadow:** `0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)`
  - Usage: Subtle elevation for cards and containers
- **Button Shadow:** `0 8px 16px rgba(0, 0, 0, 0.4)`
  - Usage: Emphasis for buttons
- **Glow Effect:** `0 0 8px rgba(93, 136, 220, 0.3)`
  - Usage: Subtle glow for interactive elements
- **Text Shadow:** `0 0 10px rgba(240, 192, 64, 0.3)`
  - Usage: Emphasis for special text

## Special Effects

### Light Mode
- **Card Hover Transition:** Scale increase + shadow enhancement
- **Button Hover:** Background lightening + shadow enhancement

### Dark Mode
- **Card Hover Transition:** Scale increase + glow effect
- **Button Hover:** Background lightening + shadow enhancement
- **Active Element Glow:** Subtle blue or gold glow
- **Glitch Effect:** For certain headings

## CSS Variables Reference

```css
/* Light Mode */
:root {
  --background: 34 20% 96%;  /* #F6F3EE */
  --foreground: 20 25% 33%;  /* Dark brown text */
  --card: 34 33% 99%;
  --card-foreground: 20 25% 33%;
  --primary: 20 25% 33%;     /* Dark brown */
  --primary-foreground: 34 20% 96%;  /* #F6F3EE */
  --muted: 34 33% 90%;
  --muted-foreground: 20 25% 45%;
  --border: 34 20% 96%;      /* Light border based on #F6F3EE */
}

/* Dark Mode */
.dark {
  --background: 225 60% 8%;  /* #020817 - dark blue color */
  --foreground: 210 40% 98%; /* Light text */
  --card: 224 76% 12%;       /* Slightly lighter blue for cards */
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 225 60% 8%; /* Dark blue background */
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 225 60% 8%;      /* Border matches background in dark mode */
}
```

## Usage Guidelines

### Component-Specific Colors

#### Navbar
- Light mode: `bg-[#F6F3EE]/80` with backdrop blur
- Dark mode: `dark:bg-[#020817]/80` with backdrop blur

#### Cards
- Light mode: Soft shadow, `bg-card` background
- Dark mode: Stronger shadow, `dark:bg-card` background

#### Buttons
- Primary Buttons:
  - Light: `bg-primary text-primary-foreground`
  - Dark: `dark:bg-primary dark:text-primary-foreground`
- Secondary Buttons:
  - Light: `bg-muted text-muted-foreground`
  - Dark: `dark:bg-muted dark:text-muted-foreground`

#### Text Hierarchy
- Main Headings:
  - Light: `text-[#594126]` (brown)
  - Dark: `dark:text-white`
- Subheadings:
  - Light: `text-muted-foreground` (lighter brown)
  - Dark: `dark:text-muted-foreground` (gray-blue)
- Body Text:
  - Light: `text-foreground` (dark brown)
  - Dark: `dark:text-foreground` (light blue-white)
- Muted Text:
  - Light: `text-muted-foreground` 
  - Dark: `dark:text-muted-foreground`

### Interactive Elements

- Links:
  - Light: `text-blue-600`
  - Dark: `dark:text-blue-400`
  - Hover: Slightly brighter shade
- Buttons: See button section above
- Form Inputs:
  - Light: `bg-background border-input`
  - Dark: `dark:bg-background dark:border-input`
  - Focus: Ring effect using `ring-2 ring-ring ring-offset-2`

## Accessibility Considerations

- Text on colored backgrounds maintains a minimum contrast ratio of 4.5:1
- Interactive elements have clear hover and focus states
- Dark mode enhances readability in low-light environments

## Animation & Transition Guidelines

- Consistent transition timing: `transition-all duration-300 ease-in-out`
- Hover state transitions: Subtle scale (1.02-1.05) and shadow enhancements
- Page transitions: Controlled via Layout component

## Implementation Notes

- Colors are implemented through Tailwind utility classes
- Background colors are explicitly set to #F6F3EE for light mode and #020817 for dark mode
- Some components use inline styles for specific effects
- CSS variables provide a base for themeable elements
