export interface PredictionResult {
  number: number;
  jobs: string;
  image: string;
}

export interface UserData {
  name: string;
  day: number;
  month: number;
  year: number;
}

export interface JobDetails {
  title: string;
  description: string;
  skills: string[];
  salary: string;
  growth: string;
  image: string;
}