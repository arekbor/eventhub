export interface EventBody {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date | undefined;
  description: string | null;
}
