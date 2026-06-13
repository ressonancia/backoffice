export interface AppClient {
  id: number;
  user_id: number;
  app_name: string;
  app_language_choice: string;
  app_id: string;
  app_key: string;
  app_secret: string;
  created_at: string;
  updated_at: string;
  current_connections?: number;
  messages_sent_month?: number;
}
