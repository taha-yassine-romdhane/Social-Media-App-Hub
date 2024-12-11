-- Create post_analytics table
CREATE TABLE IF NOT EXISTS post_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    platform VARCHAR NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    reach_count INTEGER DEFAULT 0,
    engagement_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_post_analytics_created_at ON post_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_post_analytics_platform ON post_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_post_analytics_post_id ON post_analytics(post_id);

-- Add engagement_count column to posts table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'posts' AND column_name = 'engagement_count') THEN
        ALTER TABLE posts ADD COLUMN engagement_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create function to update engagement_count
CREATE OR REPLACE FUNCTION update_post_engagement_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts
    SET engagement_count = (
        SELECT COALESCE(SUM(likes_count + comments_count + shares_count), 0)
        FROM post_analytics
        WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update engagement_count
DROP TRIGGER IF EXISTS update_post_engagement_trigger ON post_analytics;
CREATE TRIGGER update_post_engagement_trigger
AFTER INSERT OR UPDATE OR DELETE ON post_analytics
FOR EACH ROW
EXECUTE FUNCTION update_post_engagement_count();
