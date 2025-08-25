// Shared types for Case Search API
// These types align with the backend assessment requirements

export interface CaseSearchRequest {
  state: string;
  commission: string;
  searchValue: string;
}

export interface CaseResult {
  case_number: string;
  case_stage: string;
  filing_date: string;
  complainant: string;
  complainant_advocate: string;
  respondent: string;
  respondent_advocate: string;
  document_link: string;
}

export interface State {
  id: string;
  name: string;
}

export interface Commission {
  id: string;
  name: string;
  state_id: string;
}

export interface CaseSearchResponse {
  cases: CaseResult[];
  total_count: number;
  search_params: CaseSearchRequest;
}

export interface StatesResponse {
  states: State[];
}

export interface CommissionsResponse {
  commissions: Commission[];
  state_id: string;
}

// Search endpoint types
export type SearchEndpoints =
  | "by-case-number"
  | "by-complainant"
  | "by-respondent"
  | "by-complainant-advocate"
  | "by-respondent-advocate"
  | "by-industry-type"
  | "by-judge";

export const SEARCH_ENDPOINTS: Record<SearchEndpoints, string> = {
  "by-case-number": "/api/cases/by-case-number",
  "by-complainant": "/api/cases/by-complainant",
  "by-respondent": "/api/cases/by-respondent",
  "by-complainant-advocate": "/api/cases/by-complainant-advocate",
  "by-respondent-advocate": "/api/cases/by-respondent-advocate",
  "by-industry-type": "/api/cases/by-industry-type",
  "by-judge": "/api/cases/by-judge",
};

export const METADATA_ENDPOINTS = {
  states: "/api/states",
  commissions: (stateId: string) => `/api/commissions/${stateId}`,
};
