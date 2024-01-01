export interface PaginatedResponse {
  records: any[];
  total_pages: number;
  total_records: number;
  next?: string;
  previous?: string;
  record_range: number[];
  current_page: number;
}
