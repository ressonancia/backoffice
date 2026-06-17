export interface AppClient {
  app_name: string;
  app_app: string;
  app_language: string;
  user_email: string | null;
  app_current_connections: number;
  messages_sent_at_month: number;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
