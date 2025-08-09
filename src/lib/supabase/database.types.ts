export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      all_products: {
        Row: {
          affiliate_url: string | null
          category: string
          collections: Json | null
          created_at: string | null
          currency: string
          description: string
          dimensions: string | null
          embedding: string | null
          features: string | null
          id: string
          image_url: string | null
          locale: string | null
          name: string
          price: number
          rating: number | null
          review_count: number | null
          semantic_keywords: string | null
          slug: string
          sub_category: string | null
        }
        Insert: {
          affiliate_url?: string | null
          category: string
          collections?: Json | null
          created_at?: string | null
          currency?: string
          description: string
          dimensions?: string | null
          embedding?: string | null
          features?: string | null
          id?: string
          image_url?: string | null
          locale?: string | null
          name: string
          price: number
          rating?: number | null
          review_count?: number | null
          semantic_keywords?: string | null
          slug: string
          sub_category?: string | null
        }
        Update: {
          affiliate_url?: string | null
          category?: string
          collections?: Json | null
          created_at?: string | null
          currency?: string
          description?: string
          dimensions?: string | null
          embedding?: string | null
          features?: string | null
          id?: string
          image_url?: string | null
          locale?: string | null
          name?: string
          price?: number
          rating?: number | null
          review_count?: number | null
          semantic_keywords?: string | null
          slug?: string
          sub_category?: string | null
        }
        Relationships: []
      }
      blocked_ips: {
        Row: {
          created_at: string
          id: string
          ip_address: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
      chat: {
        Row: {
          cards: Json | null
          createdat: string
          id: string
          locale: string
          mode: string | null
          question: string | null
          reader_id: string | null
          title: string
          type: string | null
          userid: string
          visibility: string
        }
        Insert: {
          cards?: Json | null
          createdat?: string
          id?: string
          locale?: string
          mode?: string | null
          question?: string | null
          reader_id?: string | null
          title: string
          type?: string | null
          userid: string
          visibility?: string
        }
        Update: {
          cards?: Json | null
          createdat?: string
          id?: string
          locale?: string
          mode?: string | null
          question?: string | null
          reader_id?: string | null
          title?: string
          type?: string | null
          userid?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      divination_events: {
        Row: {
          astrological_event: string
          created_at: string | null
          date: number
          geomagnetic_activity: string
          id: number
          mercury_retrograde: string
          moon_phase: string
          solar_activity: string
          zodiac_season: string
        }
        Insert: {
          astrological_event?: string
          created_at?: string | null
          date: number
          geomagnetic_activity?: string
          id?: number
          mercury_retrograde?: string
          moon_phase?: string
          solar_activity?: string
          zodiac_season?: string
        }
        Update: {
          astrological_event?: string
          created_at?: string | null
          date?: number
          geomagnetic_activity?: string
          id?: number
          mercury_retrograde?: string
          moon_phase?: string
          solar_activity?: string
          zodiac_season?: string
        }
        Relationships: []
      }
      message: {
        Row: {
          chatid: string
          content: Json
          createdat: string
          id: string
          role: string
          updatedat: string
        }
        Insert: {
          chatid: string
          content?: Json
          createdat?: string
          id?: string
          role: string
          updatedat?: string
        }
        Update: {
          chatid?: string
          content?: Json
          createdat?: string
          id?: string
          role?: string
          updatedat?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat"
            columns: ["chatid"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_chatid_fkey"
            columns: ["chatid"]
            isOneToOne: false
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      shopify_orders_sync: {
        Row: {
          created_at: string | null
          currency: string
          financial_status: string | null
          fulfillment_status: string | null
          id: string
          order_number: string
          order_summary: Json | null
          processed_at: string | null
          shopify_customer_id: string | null
          shopify_order_id: string
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          financial_status?: string | null
          fulfillment_status?: string | null
          id?: string
          order_number: string
          order_summary?: Json | null
          processed_at?: string | null
          shopify_customer_id?: string | null
          shopify_order_id: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          financial_status?: string | null
          fulfillment_status?: string | null
          id?: string
          order_number?: string
          order_summary?: Json | null
          processed_at?: string | null
          shopify_customer_id?: string | null
          shopify_order_id?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          credits: number
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          credits?: number
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          credits?: number
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      tarot_feedback: {
        Row: {
          content: string
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string | null
          id: string
          last_used: string | null
          mode: string
          remaining_uses: number
          total_uses: number
          type: string
          updated_at: string | null
          userid: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_used?: string | null
          mode: string
          remaining_uses?: number
          total_uses?: number
          type: string
          updated_at?: string | null
          userid: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_used?: string | null
          mode?: string
          remaining_uses?: number
          total_uses?: number
          type?: string
          updated_at?: string | null
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchase_stats: {
        Row: {
          created_at: string | null
          currency: string | null
          first_order_at: string | null
          id: string
          last_order_at: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_shopify_customers: {
        Row: {
          created_at: string | null
          id: string
          shopify_customer_email: string
          shopify_customer_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          shopify_customer_email: string
          shopify_customer_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          shopify_customer_email?: string
          shopify_customer_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sources: {
        Row: {
          answer: string | null
          created_at: string | null
          finished_questionnaire: boolean | null
          id: string
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          finished_questionnaire?: boolean | null
          id: string
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          finished_questionnaire?: boolean | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          bio: string | null
          birthday: string | null
          country: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          nickname: string | null
          payment_method: Json | null
          signup_ip: string | null
          zodiac_sign: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          bio?: string | null
          birthday?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          nickname?: string | null
          payment_method?: Json | null
          signup_ip?: string | null
          zodiac_sign?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          bio?: string | null
          birthday?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          nickname?: string | null
          payment_method?: Json | null
          signup_ip?: string | null
          zodiac_sign?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_finished_questionnaire: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      reset_user_credits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_user_source_answer: {
        Args: {
          p_user_id: string
          p_answer: string
          p_finished_questionnaire: boolean
        }
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      gender_enum: "male" | "female" | "unspecified" | "other"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
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
    Enums: {
      gender_enum: ["male", "female", "unspecified", "other"],
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
        "paused",
      ],
    },
  },
} as const
