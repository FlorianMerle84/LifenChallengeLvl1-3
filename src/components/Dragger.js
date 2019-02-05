import React from 'react';
import { Upload, Icon, Form, Progress, Spin } from 'antd';


class Dragger extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    totalBinary: null,
    loading: false
  };

}

  normFile = (e) => {
    console.log('Upload event:', e);
    console.log('file ?', e.file.response);
    if (e.file.status === "done") {
      var ctx = this;
      this.setState({
        loading: true
      })
      fetch('http://hapi.fhir.org/baseDstu3/Binary?_pretty=true&_count=550')
        .then(function(response) {
          console.log('response', response);
          return response.json();
        })
        .then(function(data) {
          console.log('Data', data.entry);
          let binaryCount = 0;
          for (var i = 0; i < data.entry.length; i++) {
            if(data.entry[i].resource.resourceType) {
              binaryCount++;
            }
          }
          ctx.setState({
            loading: false,
            totalBinary: binaryCount
          })
        })
        .catch(function(error) {
          console.log('Request failed', error)
        });

    }

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };

    console.log('stateBinary', this.state.totalBinary);

  const progress =  this.state.totalBinary
    ?  <div id="results">
        <p>Space available on server</p>
        <Progress percent={100 - (this.state.totalBinary / 5)}  />
        <p>There are {this.state.totalBinary} binary on 500 slots available</p>
      </div>
    :null

  const spinner = this.state.loading
    ? <div>
        <Spin size="large" />
      </div>
    :null

    return (
      <div id="dragger">
        <Form >

          <Form.Item
            {...formItemLayout}
            id="dropZone"
          >
            <div id="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="https://fhirtest.uhn.ca/baseDstu3/Binary">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              )}
            </div>
          </Form.Item>

        </Form>

        <div>
            {spinner}
            {progress}
        </div>
      </div>
    );
  }
}

const WrappedDragger = Form.create({ name: 'validate_other' })(Dragger);
export default WrappedDragger;
