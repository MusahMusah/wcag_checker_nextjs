export interface IIssue {
  element: string;
  issue: string;
  suggestion: string;
}

export interface IWCAGData {
  accessibility_score: number;
  issues: IIssue[];
}

export interface IWCAGResponse {
  success: boolean;
  message: string;
  data: IWCAGData;
}
