/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Name of the person contacting
      - `email` (text) - Email address of the sender
      - `message` (text) - The message content
      - `created_at` (timestamptz) - Timestamp when the message was sent
      - `read` (boolean) - Whether the message has been read

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for inserting messages (anyone can submit)
    - No read policy for public users (admin only in future)

  3. Notes
    - This table stores contact form submissions
    - Messages are write-only for public users
    - Future: Add admin authentication and read policies
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
