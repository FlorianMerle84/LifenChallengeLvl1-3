import React from 'react';
import { Upload, Icon, Form, Progress, Spin, notification, Alert } from 'antd';

const openNotification = (fileName) => {
notification.open({
  message: 'Upload successful',
  description: `${fileName} has been uploaded successfuly`,
  icon: <Icon type="check-circle" style={{ color: '#399E5A' }} />,
});
};

class Dragger extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    totalBinary: null,
    loading: false
  };
}

  normFile = (e) => {
    this.setState({
      loading: false,
      totalBinary: null
    })
    console.log('Upload event:', e);
    if (e.file.status === "done") {
      openNotification(e.file.name);
      var ctx = this;
      this.setState({
        loading: true
      })

      fetch(' http://hapi.fhir.org/baseDstu3/Binary?_summary=count')
        .then(function(response) {
          console.log('response', response);
          return response.json();
        })
        .then(function(data) {
          console.log('Data', data.total);
          let binaryCount = 0;

          ctx.setState({
            loading: false,
            totalBinary: data.total
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

    let resultMessage = `There are ${this.state.totalBinary} Binary on the server`;
    const binaryInServer =  this.state.totalBinary
      ?
      <Alert
        message={resultMessage}
        type="success"
        closable
      />
      :null

    const spinner = this.state.loading
      ? <div id="spinner">
          <p>Please wait for server response about available space</p>
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
            {binaryInServer}
        </div>
        
      </div>
    );
  }
}

const WrappedDragger = Form.create({ name: 'validate_other' })(Dragger);
export default WrappedDragger;
