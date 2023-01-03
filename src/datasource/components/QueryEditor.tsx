import React, { PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { VulnOpsDataSource } from '../datasource';
import { VulnOpsDataSourceOptions, VulnOpsQuery } from '../types';

type Props = QueryEditorProps<VulnOpsDataSource, VulnOpsQuery, VulnOpsDataSourceOptions>;

interface State {
  source?: string;
}

export class QueryEditor extends PureComponent<Props, State> {
  render() {
    return <div className="gf-form"></div>;
  }
}
