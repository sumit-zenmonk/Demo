export interface SurveyQuestion {
  uuid: string;
  survey_uuid: string;
  question: string;
  question_type: string;
  created_at: string;
  updated_at: string;
}

export interface Survey {
  uuid: string;
  creator_uuid: string;
  title: string;
  description: string;
  target_program: string;
  start_date: string;
  end_date: string;
  questions: SurveyQuestion[];
  created_at: string;
  updated_at: string;
}

export interface ResponseEntry {
  uuid: string;
  response_uuid: string;
  question_uuid: string;
  answer: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ResponseStudent {
  uuid: string;
  name: string;
  email: string;
  program: string;
}

export interface SurveyResponse {
  uuid: string;
  student_uuid: string;
  survey_uuid: string;
  student: ResponseStudent;
  entries: ResponseEntry[];
  created_at: string;
  updated_at: string;
}

export interface UniversityState {
  surveys: Survey[];
  responses: SurveyResponse[];
  total_survey: number;
  total_response: number;
  loading: boolean;
  error: string | null;
  status: "pending" | "succeed" | "rejected";
}