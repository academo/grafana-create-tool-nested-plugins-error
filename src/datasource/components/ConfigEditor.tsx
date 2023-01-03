import React, { PureComponent } from 'react';
import { onUpdateDatasourceJsonDataOption, DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { Input, InlineFormLabel, LegacyForms } from '@grafana/ui';
import { VulnOpsDataSourceOptions, VulnOpsSecureJsonData } from '../types';

export type ConfigEditorProps = DataSourcePluginOptionsEditorProps<VulnOpsDataSourceOptions, VulnOpsSecureJsonData>;

export class ConfigEditor extends PureComponent<ConfigEditorProps> {
  onSettingReset = (prop: string) => (event: any) => {
    this.onSettingUpdate(prop, false)({ target: { value: undefined } });
  };

  onSettingUpdate =
    (prop: string, set = true) =>
    (event: any) => {
      const { onOptionsChange, options } = this.props;
      onOptionsChange({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          [prop]: event.target.value,
        },
        secureJsonFields: {
          ...options.secureJsonFields,
          [prop]: set,
        },
      });
    };

  render() {
    const {
      options: { jsonData, secureJsonData, secureJsonFields },
    } = this.props;
    const secureSettings = (secureJsonData || {}) as VulnOpsSecureJsonData;
    return (
      <>
        <div className="gf-form-group">
          <h3 className="page-heading">Service Account Access</h3>
          <div className="gf-form">
            <LegacyForms.SecretFormField
              label="Access Token"
              inputWidth={27}
              labelWidth={10}
              onChange={this.onSettingUpdate('accessToken', false)}
              onBlur={this.onSettingUpdate('accessToken')}
              value={secureSettings.apiKey || ''}
              placeholder="Github Personal Access Token"
              onReset={this.onSettingReset('accessToken')}
              isConfigured={secureJsonFields!['accessToken']}
            />
          </div>
        </div>
        <div className="gf-form-group">
          <h3 className="page-heading">Vulnerability obs backend</h3>
          <div className="gf-form">
            <InlineFormLabel className="width-10">API URL</InlineFormLabel>
            <Input
              className="width-27"
              value={jsonData.apiUrl}
              placeholder="URL of GitHub Enterprise"
              summary="URL for GitHub Enterprise, such as https://github.company.com, leave blank if using github.com"
              onChange={onUpdateDatasourceJsonDataOption(this.props, 'apiUrl')}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ConfigEditor;
