export interface Analyze {
  metadata: MetaData;
  results: AnalyzeData[];
}

export interface AnalyzeData {
  elevation: number;
  mindate: string;
  maxdate: string;
  name: string;
  datacoverage: number;
  latitude: number;
  longitude: number;
  elevationUnit: string;
  id: string;
}

export interface MetaData {
  resultset: DataResultType;
}

export interface DataResultType {
  offset: number;
  count: number;
  limit: number;
}
