import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface VulnOpsDataSourceOptions extends DataSourceJsonData {
  apiUrl?: string;
}
export interface VulnOpsSecureJsonData {
  apiKey?: string;
}

export interface Indexable {
  [index: string]: any;
}

export interface ProjectsOptions extends Indexable {
  source?: string;
}

export interface VulnOpsQuery extends Indexable, DataQuery {
  options?: ProjectsOptions;
}
