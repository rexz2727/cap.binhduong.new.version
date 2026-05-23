export interface FeedbackProcess {
  _id: string;
  pageDescription?: string;
  warningNotice?: string;
  emergencyDesc?: string;
  processSteps?: Array<{ _key: string; title: string; body: string }>;
}
