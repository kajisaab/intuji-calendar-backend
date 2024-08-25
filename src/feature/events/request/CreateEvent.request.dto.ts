export interface CreateEventRequestDto {
  summary: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}
