-- Intelligence Hub Tables for Rivalis Law

-- 1. Intelligence Articles Table
CREATE TABLE IF NOT EXISTS intelligence_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES profiles(id),
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'published', -- draft, published, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Intelligence Resources Table
CREATE TABLE IF NOT EXISTS intelligence_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL, -- template, guide, tool, checklist
  slug TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  file_url TEXT,
  preview_url TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Resource Access Tracking (for premium resources)
CREATE TABLE IF NOT EXISTS resource_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES intelligence_resources(id) ON DELETE CASCADE,
  access_type VARCHAR(20), -- purchased, newsletter_subscriber, admin
  payment_id UUID REFERENCES payments(id),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);

-- 4. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  company TEXT,
  status VARCHAR(20) DEFAULT 'active', -- active, unsubscribed, bounced
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Newsroom Items Table
CREATE TABLE IF NOT EXISTS newsroom_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  item_date DATE NOT NULL,
  type VARCHAR(20) NOT NULL, -- press, speaking, quote
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE intelligence_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsroom_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for intelligence_articles (public read, authenticated write)
CREATE POLICY "Anyone can read published articles"
  ON intelligence_articles
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can create articles"
  ON intelligence_articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for intelligence_resources (public read, authenticated write)
CREATE POLICY "Anyone can read free resources"
  ON intelligence_resources
  FOR SELECT
  USING (is_premium = FALSE);

CREATE POLICY "Users with access can read premium resources"
  ON intelligence_resources
  FOR SELECT
  USING (
    is_premium = FALSE 
    OR auth.uid() IN (
      SELECT user_id FROM resource_access WHERE resource_id = intelligence_resources.id
    )
    OR auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM payments 
      WHERE user_id = auth.uid() 
      AND status = 'succeeded'
      AND created_at > NOW() - INTERVAL '30 days'
    )
  );

CREATE POLICY "Authenticated users can create resources"
  ON intelligence_resources
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for resource_access (users can see their own access)
CREATE POLICY "Users can see their own access"
  ON resource_access
  FOR SELECT
  USING (user_id = auth.uid() OR auth.role() = 'authenticated');

CREATE POLICY "System can create access records"
  ON resource_access
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for newsletter_subscribers (public can subscribe, authenticated can manage)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can see their own subscription"
  ON newsletter_subscribers
  FOR SELECT
  USING (email = auth.jwt()->>'email' OR auth.role() = 'authenticated');

-- RLS Policies for newsroom_items (public read)
CREATE POLICY "Anyone can read newsroom items"
  ON newsroom_items
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage newsroom"
  ON newsroom_items
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_articles_category ON intelligence_articles(category);
CREATE INDEX idx_articles_date ON intelligence_articles(date DESC);
CREATE INDEX idx_articles_slug ON intelligence_articles(slug);
CREATE INDEX idx_resources_type ON intelligence_resources(type);
CREATE INDEX idx_resources_premium ON intelligence_resources(is_premium);
CREATE INDEX idx_resource_access_user ON resource_access(user_id);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsroom_date ON newsroom_items(item_date DESC);
