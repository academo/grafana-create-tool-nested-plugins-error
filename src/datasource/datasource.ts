import { DataFrame, DataFrameView, DataQueryRequest, DataSourceInstanceSettings, MetricFindValue } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { VulnOpsDataSourceOptions, VulnOpsQuery } from './types';

export class VulnOpsDataSource extends DataSourceWithBackend<VulnOpsQuery, VulnOpsDataSourceOptions> {
  constructor(public instanceSettings: DataSourceInstanceSettings<VulnOpsDataSourceOptions>) {
    super(instanceSettings);
  }

  async metricFindQuery(query: VulnOpsQuery, options: any): Promise<MetricFindValue[]> {
    const request = {
      targets: [
        {
          ...query,
          refId: 'metricFindQuery',
        },
      ],
      range: options.range,
      rangeRaw: options.rangeRaw,
    } as DataQueryRequest;
    try {
      let res = await this.query(request).toPromise();
      if (!res || !res.data || res.data.length < 0) {
        return [];
      }
      const view = new DataFrameView(res.data[0] as DataFrame);
      return view.map((item) => {
        const value = item[query.key || ''] || item[query.field || 'name'];
        return {
          value,
          text: item[query.field || 'name'],
        };
      });
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
}
