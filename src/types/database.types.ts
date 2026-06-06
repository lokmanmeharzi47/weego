export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          available_spots: number
          category: string
          date: string
          description: string
          duration: string | null
          id: string
          image_url: string
          is_nearby: boolean | null
          is_today: boolean | null
          is_trending: boolean | null
          latitude: number
          location: string
          longitude: number
          max_spots: number
          organizer: string
          organizer_role: string | null
          participants_count: number
          price: number
          rating: number
          rating_count: number
          title: string
        }
        Insert: {
          available_spots: number
          category: string
          date: string
          description: string
          duration?: string | null
          id: string
          image_url: string
          is_nearby?: boolean | null
          is_today?: boolean | null
          is_trending?: boolean | null
          latitude: number
          location: string
          longitude: number
          max_spots: number
          organizer: string
          organizer_role?: string | null
          participants_count: number
          price: number
          rating: number
          rating_count: number
          title: string
        }
        Update: {
          available_spots?: number
          category?: string
          date?: string
          description?: string
          duration?: string | null
          id?: string
          image_url?: string
          is_nearby?: boolean | null
          is_today?: boolean | null
          is_trending?: boolean | null
          latitude?: number
          location?: string
          longitude?: number
          max_spots?: number
          organizer?: string
          organizer_role?: string | null
          participants_count?: number
          price?: number
          rating?: number
          rating_count?: number
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          activity_id: string
          activity_image_url: string
          activity_location: string
          activity_title: string
          date: string
          id: number
          points_earned: number
          spots_reserved: number
          status: string | null
          time: string | null
          timestamp: number
          total_price: number
        }
        Insert: {
          activity_id: string
          activity_image_url: string
          activity_location: string
          activity_title: string
          date: string
          id?: number
          points_earned: number
          spots_reserved: number
          status?: string | null
          time?: string | null
          timestamp: number
          total_price: number
        }
        Update: {
          activity_id?: string
          activity_image_url?: string
          activity_location?: string
          activity_title?: string
          date?: string
          id?: number
          points_earned?: number
          spots_reserved?: number
          status?: string | null
          time?: string | null
          timestamp?: number
          total_price?: number
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment_id: number
          content: string
          post_id: number
          timestamp: number
          user_id: string
          user_name: string
        }
        Insert: {
          comment_id?: number
          content: string
          post_id: number
          timestamp: number
          user_id: string
          user_name: string
        }
        Update: {
          comment_id?: number
          content?: string
          post_id?: number
          timestamp?: number
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          activity_id: string
        }
        Insert: {
          activity_id: string
        }
        Update: {
          activity_id?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          like_id: number
          post_id: number
          user_id: string
        }
        Insert: {
          like_id?: number
          post_id: number
          user_id: string
        }
        Update: {
          like_id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: number
          is_read: boolean | null
          message: string
          timestamp_text: string
          title: string
          type: string
        }
        Insert: {
          id?: number
          is_read?: boolean | null
          message: string
          timestamp_text: string
          title: string
          type: string
        }
        Update: {
          id?: number
          is_read?: boolean | null
          message?: string
          timestamp_text?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          age: number
          booking_id: number
          email: string
          full_name: string
          gender: string
          id: number
          phone: string
        }
        Insert: {
          age: number
          booking_id: number
          email: string
          full_name: string
          gender: string
          id?: number
          phone: string
        }
        Update: {
          age?: number
          booking_id?: number
          email?: string
          full_name?: string
          gender?: string
          id?: number
          phone?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          activity_id: string | null
          activity_title: string | null
          content: string
          image_url: string | null
          like_count: number | null
          post_id: number
          rating: number | null
          timestamp: number
          type: string | null
          user_avatar: string
          user_id: string
          user_name: string
        }
        Insert: {
          activity_id?: string | null
          activity_title?: string | null
          content: string
          image_url?: string | null
          like_count?: number | null
          post_id?: number
          rating?: number | null
          timestamp: number
          type?: string | null
          user_avatar: string
          user_id: string
          user_name: string
        }
        Update: {
          activity_id?: string | null
          activity_title?: string | null
          content?: string
          image_url?: string | null
          like_count?: number | null
          post_id?: number
          rating?: number | null
          timestamp?: number
          type?: string | null
          user_avatar?: string
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          activity_id: string
          booking_id: number
          id: number
          rating: number
          review_text: string
          timestamp: number
        }
        Insert: {
          activity_id: string
          booking_id: number
          id?: number
          rating: number
          review_text: string
          timestamp: number
        }
        Update: {
          activity_id?: string
          booking_id?: number
          id?: number
          rating?: number
          review_text?: string
          timestamp?: number
        }
        Relationships: []
      }
      search_history: {
        Row: {
          query: string
          timestamp: number
        }
        Insert: {
          query: string
          timestamp: number
        }
        Update: {
          query?: string
          timestamp?: number
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          birthday: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          last_name: string | null
          phone: string | null
          photo_url: string | null
          rank_tier: string | null
          reward_points: number | null
          total_bookings: number | null
          uid: string
          wilaya: string | null
        }
        Insert: {
          birthday?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          rank_tier?: string | null
          reward_points?: number | null
          total_bookings?: number | null
          uid?: string
          wilaya?: string | null
        }
        Update: {
          birthday?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          last_name?: string | null
          phone?: string | null
          photo_url?: string | null
          rank_tier?: string | null
          reward_points?: number | null
          total_bookings?: number | null
          uid?: string
          wilaya?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
