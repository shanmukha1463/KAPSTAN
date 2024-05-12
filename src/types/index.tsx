export interface eventHistoryMetric {
  id: number;
  event: string;
  status: string;
  version: string;
  timestamp: string;
  applicationId: string;
}

export interface Application {
  id: number;
  name: string;
}
