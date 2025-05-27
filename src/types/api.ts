export interface TimeData {
  date: string;
  time: string;
  iso: string;
  timestamp: number;
  timezone: string;
  timezoneOffset: number;
}

export interface ApiResponse {
  success: boolean;
  data?: TimeData;
  error?: string;
  message?: string;
}