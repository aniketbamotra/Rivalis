# Intelligence Hub Setup Guide

## Overview
The Intelligence Hub is a content management system powered by Hashnode's headless CMS, featuring perspectives (articles), newsroom updates, and resources.

## Prerequisites

1. **Hashnode Account**: Create a free account at [hashnode.com](https://hashnode.com)
2. **Node.js Packages**: Install react-markdown
   ```bash
   npm install react-markdown
   ```

## Hashnode Setup

### Step 1: Create a Publication

1. Go to [Hashnode Dashboard](https://hashnode.com/dashboard)
2. Click "Create a Publication"
3. Fill in publication details:
   - **Name**: Rivalis Intelligence Hub
   - **Domain**: Choose a subdomain (e.g., `rivalis-intelligence.hashnode.dev`)
   - **Description**: Legal insights, regulatory updates, and firm news from Rivalis
4. Click "Create Publication"

### Step 2: Configure Publication Settings

1. In your publication dashboard, go to **Settings**
2. **General Settings**:
   - Enable "Public API access"
   - Copy your Publication ID (you'll need this for environment variables)
3. **Newsletter** (optional):
   - Enable newsletter feature
   - Configure newsletter name and settings
   - This handles all newsletter subscriptions automatically

### Step 3: Get API Key

1. Go to [Hashnode Developer Settings](https://hashnode.com/settings/developer)
2. Click "Generate New Token"
3. Give it a name (e.g., "Rivalis Website")
4. Copy the generated token (you won't see it again!)

### Step 4: Configure Tags

Create the following tags in your publication for content organization:

1. **Content Type Tags**:
   - `perspectives` - For legal insights and analysis articles
   - `newsroom` - For all newsroom content (press, speaking, awards)

2. **Category Tags** (for perspectives):
   - `regulatory` - Regulatory updates and compliance
   - `case-law` - Legal precedents and case analysis
   - `industry` - Industry trends and insights
   - `technology` - Legal technology and innovation

3. **Newsroom Type Tags**:
   - `press-mentions` - Media coverage and press releases
   - `speaking` - Speaking engagements and panels
   - `awards` - Firm and attorney recognitions
   - `publications` - Published articles and papers

## Environment Variables

Create or update `.env.local` in the root directory:

```bash
# Hashnode Configuration
NEXT_PUBLIC_HASHNODE_PUBLICATION_ID=your_publication_id_here
HASHNODE_API_KEY=your_api_token_here

# Existing variables (Supabase, Resend, etc.)
# ...keep all other existing variables
```

**Important**: 
- `NEXT_PUBLIC_HASHNODE_PUBLICATION_ID` is public (used in client-side code)
- `HASHNODE_API_KEY` is private (only used in server components)

## Creating Content

### Writing Perspectives (Articles)

1. Go to your Hashnode publication dashboard
2. Click "Write"
3. Write your article using Hashnode's editor (supports Markdown)
4. Add cover image (recommended: 1600x840px)
5. **Critical**: Add tags:
   - Must include: `perspectives`
   - Add category: `regulatory`, `case-law`, `industry`, or `technology`
6. Set SEO metadata (title, meta description)
7. Publish

### Adding Newsroom Items

1. Click "Write" in your publication
2. Create content for press mentions, speaking, awards, or publications
3. **Critical**: Add tags:
   - Must include: `newsroom`
   - Add type: `press-mentions`, `speaking`, `awards`, or `publications`
4. For external links (press coverage), include the link in the article content
5. Publish

### Content Best Practices

**Perspectives**:
- Title: Clear, descriptive (50-60 characters)
- Brief: Compelling summary (150-160 characters)
- Cover Image: Professional, relevant (1600x840px)
- Content: Use Markdown formatting (headings, lists, quotes)
- Length: 800-2000 words for optimal reading time
- Author: Assign to the correct firm member

**Newsroom**:
- Title: Clear announcement or event name
- Date: Use actual event/publication date
- Include key details in the first paragraph
- Link to external coverage when applicable
- Use appropriate tag (`press-mentions`, `speaking`, etc.)

## Resources Section

Add downloadable resources to the public folder:

```bash
/public/resources/
  ├── guide-to-corporate-governance.pdf
  ├── regulatory-compliance-checklist.pdf
  └── immigration-pathways-overview.pdf
```

Update the resources array in `/app/intelligence-hub/page.tsx` to match your actual PDFs.

## Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Navigate to:
   - Landing: `http://localhost:3000/intelligence-hub`
   - Perspectives: `http://localhost:3000/intelligence-hub/perspectives`
   - Article: `http://localhost:3000/intelligence-hub/perspectives/[slug]`
   - Newsroom: `http://localhost:3000/intelligence-hub/newsroom`
   - Newsroom Item: `http://localhost:3000/intelligence-hub/newsroom/[slug]`

## Adding to Navigation

Update your main navigation component to include Intelligence Hub:

```tsx
<NavigationLink href="/intelligence-hub">Intelligence Hub</NavigationLink>
```

Or add as a dropdown menu:
```tsx
<DropdownMenu label="Insights">
  <DropdownItem href="/intelligence-hub">Intelligence Hub</DropdownItem>
  <DropdownItem href="/intelligence-hub/perspectives">Perspectives</DropdownItem>
  <DropdownItem href="/intelligence-hub/newsroom">Newsroom</DropdownItem>
</DropdownMenu>
```

## Deployment Checklist

Before deploying to production:

- [ ] Hashnode publication created and configured
- [ ] API key generated and added to production environment variables
- [ ] At least 3 perspective articles published with proper tags
- [ ] At least 3 newsroom items published with proper tags
- [ ] Resource PDFs added to `/public/resources/`
- [ ] `react-markdown` installed in package.json
- [ ] Environment variables set in production (Vercel/Netlify)
- [ ] Navigation menu updated to include Intelligence Hub
- [ ] Test all pages in production environment
- [ ] Newsletter feature configured (if using)
- [ ] Custom domain connected to Hashnode (optional)

## Content Management Tips

1. **Consistency**: Publish articles regularly (weekly/bi-weekly)
2. **SEO**: Use descriptive titles, meta descriptions, and alt text for images
3. **Tags**: Always include primary tags (`perspectives` or `newsroom`) plus category tags
4. **Images**: Use high-quality, relevant cover images
5. **Links**: Include relevant internal/external links in article content
6. **Newsletter**: Promote newsletter subscription in articles
7. **Social**: Use Hashnode's built-in social sharing features

## Troubleshooting

### Articles not showing up

1. Check that articles have the correct tags (`perspectives` or `newsroom`)
2. Verify Publication ID in environment variables
3. Check that articles are published (not drafts)
4. Clear Next.js cache: `rm -rf .next`

### Search not working

1. Verify `HASHNODE_API_KEY` is set in environment
2. Check browser console for API errors
3. Ensure publication has "Public API access" enabled

### Images not loading

1. Hashnode serves images via CDN - check network tab for 404s
2. Verify cover images are uploaded in Hashnode dashboard
3. Check image URLs in article metadata

### Build errors

1. Install `react-markdown`: `npm install react-markdown`
2. Check for TypeScript errors: `npm run build`
3. Verify all imports are correct

## Support

- **Hashnode Docs**: [docs.hashnode.com](https://docs.hashnode.com)
- **GraphQL API**: [api.hashnode.com](https://api.hashnode.com)
- **Hashnode Support**: support@hashnode.com

## Architecture Notes

- **Next.js ISR**: Pages revalidate every hour (3600 seconds)
- **Static Generation**: First 20 articles pre-rendered at build time
- **Server Components**: All data fetching happens server-side
- **Client Components**: Only search and filters use client-side interactivity
- **Markdown Rendering**: react-markdown with custom components for styling
