import { DataSourcePlugin } from '@grafana/data';
import { VulnOpsDataSource } from './datasource';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { VulnOpsDataSourceOptions, VulnOpsQuery } from './types';

export const plugin = new DataSourcePlugin<VulnOpsDataSource, VulnOpsQuery, VulnOpsDataSourceOptions>(VulnOpsDataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
