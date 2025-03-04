# Portfolio Customization Guide

This guide provides detailed instructions on how to customize different sections of your portfolio website, including adding or editing content in the Path page and Projects page.

## Table of Contents

- [Overview](#overview)
- [Path Page Customization](#path-page-customization)
  - [Professional Experience](#professional-experience)
  - [Education](#education)
  - [Volunteering](#volunteering)
  - [Miscellaneous](#miscellaneous)
- [Projects Page Customization](#projects-page-customization)
  - [Adding a New Project](#adding-a-new-project)
  - [Adding Tags to Projects](#adding-tags-to-projects)
  - [Customizing Project Media](#customizing-project-media)
  - [Project Details](#project-details)
- [Common Tips](#common-tips)

## Overview

Your portfolio site is built with React, TypeScript, and Tailwind CSS. The main customizable sections are:

1. **Path Page** - Your professional journey including work experience, education, volunteering, etc.
2. **Projects Page** - Showcase of your projects with details, images, tags, and metrics.

## Path Page Customization

The Path page displays your professional journey in different categories. Each category is defined by its own data structure.

### Professional Experience

To add or edit professional experience entries:

1. Open [Path.tsx](file:///c:/Users/edwar/OneDrive/Documents/Cursor/edwardmoktar.github.io/src/pages/Path.tsx) (line 37)
2. Find the `experiences` array:

```typescript
// Professional experience data
const experiences: ExperienceItem[] = [
  {
    title: "Senior Product Operations",
    company: "Telos Labs",
    period: "2022 - Present",
    description: "Leading product operations and automation initiatives for Web3 gaming platforms",
    metrics: [
      { value: "960+ hours", label: "Monthly workflow automation" },
      { value: "80,000+", label: "Active community members" }
    ],
    behindTheScenes: "Orchestrated the integration of multiple blockchain ecosystems...",
    keyLearnings: [
      "Scaling operations in high-growth Web3 environments...",
      "Automation is essential but must be balanced...",
      "Cross-functional collaboration is crucial..."
    ],
    relatedProjects: ["Automated Workflow System", "Community Dashboard", "Token Integration"]
  },
  // More experiences...
];
```

**Adding a New Experience:**
1. Copy the structure of an existing entry
2. Add your new experience with all relevant fields
3. Insert it at the appropriate position in the array (experiences are shown in the order they appear in the array)

**Available Fields:**
- `title` (string, required): Your job title
- `company` (string, required): Company name
- `period` (string, required): Time period (e.g., "2020 - 2022")
- `description` (string, required): Brief job description
- `metrics` (array, optional): Key metrics to highlight
  - `value` (string): The metric value
  - `label` (string): Description of the metric
- `behindTheScenes` (string, optional): Additional context about your role
- `keyLearnings` (array, optional): List of key insights gained
- `relatedProjects` (array, optional): List of related projects
- `link` (string, optional): URL to company or project

### Education

To add or edit education entries:

1. Open [Path.tsx](file:///c:/Users/edwar/OneDrive/Documents/Cursor/edwardmoktar.github.io/src/pages/Path.tsx) (line 92)
2. Find the `educations` array:

```typescript
// Education data
const educations: EducationItem[] = [
  {
    degree: "Computer Science",
    institution: "University of Technology",
    period: "2016 - 2020",
    description: "Specialized in AI and Machine Learning with a focus on practical applications",
    metrics: [
      { value: "3.9", label: "GPA" },
      { value: "15+", label: "Research Projects" },
      { value: "3", label: "Published Papers" }
    ],
    achievements: [
      "Dean's List for Academic Excellence (All semesters)",
      "Best Undergraduate Research Award for AI Ethics Project",
      "Graduate with Highest Honors"
    ],
    courses: [
      "Advanced Machine Learning",
      "Neural Networks", 
      // More courses...
    ]
  },
  // More education entries...
];
```

**Available Fields:**
- `degree` (string, required): Name of degree or program
- `institution` (string, required): School or university name
- `period` (string, required): Time period (e.g., "2016 - 2020")
- `description` (string, required): Description of your studies
- `metrics` (array, required): Notable metrics
- `achievements` (array, optional): List of academic achievements
- `courses` (array, optional): Key courses taken

### Volunteering

To add or edit volunteering entries:

1. Open [Path.tsx](file:///c:/Users/edwar/OneDrive/Documents/Cursor/edwardmoktar.github.io/src/pages/Path.tsx) (line 138)
2. Find the `volunteering` array:

```typescript
// Volunteering data
const volunteering: VolunteeringItem[] = [
  {
    role: "Open Source Contributor",
    organization: "Various Projects",
    period: "2019 - Present",
    description: "Contributing to various open-source projects and mentoring new developers",
    impact: "Helped improve documentation and accessibility features...",
    metrics: [
      { value: "15+", label: "Projects contributed to" },
      { value: "120+", label: "Pull requests merged" },
      { value: "500+", label: "Issues resolved" }
    ],
    highlights: [
      "Maintained documentation for several key library repositories",
      "Developed accessibility plugins for popular frameworks",
      "Mentored junior developers through their first open-source contributions"
    ]
  },
  // More volunteering entries...
];
```

**Available Fields:**
- `role` (string, required): Your volunteer role
- `organization` (string, required): Organization name
- `period` (string, required): Time period
- `description` (string, required): Description of your volunteer work
- `impact` (string, optional): Description of the impact of your work
- `metrics` (array, optional): Key metrics
- `highlights` (array, optional): Key highlights of your work
- `link` (string, optional): URL to organization or project

### Miscellaneous

To add or edit miscellaneous items (hobbies, interests, etc.):

1. Open [Path.tsx](file:///c:/Users/edwar/OneDrive/Documents/Cursor/edwardmoktar.github.io/src/pages/Path.tsx) (line 178)
2. Find the `miscItems` array:

```typescript
// Misc items data
const miscItems: MiscItem[] = [
  {
    title: "Music Production",
    category: "Hobby",
    icon: "🎵",
    description: "Creating electronic music and sound design as a creative outlet",
    metrics: [
      { value: "30+", label: "Tracks produced" },
      { value: "5+", label: "Years experience" },
      { value: "3", label: "Music platforms" }
    ],
    details: [
      "Producing electronic music using Ableton Live and various VST instruments",
      "Sound design and foley recording for personal and collaborative projects"
      // More details...
    ]
  },
  // More misc items...
];
```

**Available Fields:**
- `title` (string, required): Title of the hobby/interest
- `category` (string, required): Category (e.g., "Hobby")
- `icon` (string, required): Emoji or icon
- `description` (string, required): Brief description
- `metrics` (array, optional): Related metrics
- `details` (array, optional): Additional details

## Projects Page Customization

The Projects page showcases your portfolio projects. It includes project cards with hover effects and detailed popups.

### Adding a New Project

To add a new project:

1. Open [Projects.tsx](file:///c:/Users/edwar/OneDrive/Documents/Cursor/edwardmoktar.github.io/src/pages/Projects.tsx) (line 47)
2. Find the `projects` array:

```typescript
// Project data with added keyPoints
const projects: Project[] = [
  {
    id: 1,
    title: "Dune Wizard",
    subtitle: "Web3 Analytics Dashboard",
    description: "Advanced analytics platform for blockchain data visualization and insights",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    media: [
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Dashboard Overview'
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        caption: 'Analytics Interface'
      }
    ],
    icon: "chart",
    categories: ["Web3", "Development", "Data"],
    keyPoints: ["Brand strategy", "Web design", "Content marketing"],
    techStack: ["DuneSQL", "React", "TypeScript", "GraphQL", "Web3.js"],
    problem: "Complex blockchain data was difficult to analyze and visualize for non-technical users",
    solution: "Created an intuitive dashboard with AI-powered query generation and real-time visualizations",
    impact: {
      metrics: [
        { label: "Query Time", before: 120, after: 15 },
        { label: "User Adoption", before: 100, after: 850 },
        { label: "Data Points", before: 1000, after: 5000 }
      ],
      stats: [
        { value: "85%", label: "Reduction in analysis time" },
        { value: "8.5x", label: "Increase in user base" },
        { value: "5x", label: "More data coverage" }
      ]
    },
    url: "https://example.com/dune-wizard"
  },
  // More projects...
];
```

**Adding a New Project:**
1. Copy an existing project structure
2. Update all fields with your new project's information
3. Ensure the `id` is unique
4. Add it to the array (projects are sorted alphabetically by title)

**Required Fields:**
- `id` (number): Unique identifier for the project
- `title` (string): Project title
- `subtitle` (string): Brief subtitle
- `description` (string): Short description
- `image` (string): URL to the main image
- `media` (array): Media items (images, videos, gifs)
- `icon` (string): Icon type (must be one of the defined icons: "chart", "rocket", "game")
- `categories` (array): Categories for filtering
- `keyPoints` (array): Key features or points about the project
- `techStack` (array): Technologies used
- `problem` (string): Problem the project addresses
- `solution` (string): Your solution approach
- `impact` (object): Impact metrics and statistics

**Optional Fields:**
- `url` (string): Link to live project
- `fullDescription` (string): Longer description for the details popup
- `contribution` (string): Your specific contribution
- `technologies` (array): Detailed list of technologies (alternative to techStack)
- `links` (array): Multiple links related to the project
- `timeline` (object): Project timeline information

### Adding Tags to Projects

Tags (categories) are automatically collected from all projects. To add a new tag:

1. Add the tag to a project's `categories` array
2. The tag will automatically appear in the filter section

```typescript
categories: ["Web3", "Development", "Data", "New Tag"],
```

### Customizing Project Media

To add or update media for a project:

1. Find the project in the `projects` array
2. Update the `media` array:

```typescript
media: [
  {
    type: 'image', // can be 'image', 'video', or 'gif'
    url: '/path/to/image.jpg',
    caption: 'Caption for this image'
  },
  // Add more media items...
]
```

### Project Details

The project detail popup displays comprehensive information. Additional fields that can be customized:

```typescript
{
  // Add these optional fields for more detailed information
  fullDescription: "A more detailed description of the project that will appear in the details popup...",
  contribution: "My specific contribution to this project included architecture design, frontend development...",
  links: [
    { text: "GitHub Repository", url: "https://github.com/username/repo" },
    { text: "Documentation", url: "https://docs.project.com" }
  ],
  timeline: {
    duration: "6 months",
    completed: "December 2023"
  }
}
```

## Common Tips

1. **Images**:
   - For project cards: use high-quality images with good contrast
   - For path section: no specific images required, but you can customize icons
   - Image URLs can be external (https://...) or local (/images/...)

2. **Text Content**:
   - Keep descriptions concise for cards
   - Use more detailed descriptions in popups/expanded views
   - Use metrics to highlight quantifiable achievements

3. **Technical Tips**:
   - Always include comma after each array item and property
   - Maintain proper TypeScript syntax
   - Test the site after making changes to ensure everything displays correctly

4. **Updating Categories/Filter Tags**:
   - Add new categories to your projects' `categories` arrays
   - They will automatically appear in the filter section

5. **Icons**:
   - The site uses Lucide icons for most UI elements
   - For projects, you must use one of the predefined icons: "chart", "rocket", or "game"
   - For adding new icon types, you would need to update the `icons` object in Projects.tsx
