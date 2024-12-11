export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
          role: 'USER' | 'ADMIN'
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
          role?: 'USER' | 'ADMIN'
        }
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          platform: 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN'
          account_name: string
          access_token: string
          refresh_token: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'LINKEDIN'
          account_name: string
          access_token: string
          refresh_token?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          social_account_id: string
          content: string
          media_urls: string[]
          scheduled_for: string | null
          published_at: string | null
          status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          social_account_id: string
          content: string
          media_urls?: string[]
          scheduled_for?: string | null
          published_at?: string | null
          status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
