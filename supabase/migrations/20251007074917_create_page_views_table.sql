/*
  # Create page views analytics table

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key) - Unique identifier for each view
      - `page` (text) - Page path that was viewed
      - `referrer` (text) - Referrer URL
      - `user_agent` (text) - Browser user agent
      - `created_at` (timestamptz) - Timestamp of the view

  2. Security
    - Enable RLS on `page_views` table
    - Add policy for inserting page views (anyone can track)
    - No read policy for public users (analytics only)

  3. Notes
    - This table tracks page view analytics
    - Lightweight analytics without personal data
    - Future: Add dashboard for viewing analytics
*/

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
