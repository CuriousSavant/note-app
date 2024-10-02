export interface PropsNote {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createAt: Date | string;
  pin: boolean;
}