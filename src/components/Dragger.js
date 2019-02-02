import React, { Component } from 'react';
import { Upload, Icon, message, Select, Form, Button } from 'antd';


const { Option } = Select;



class Dragger extends React.Component {

  normFile = (e) => {
    console.log('Upload event:', e);
    console.log('file ?', e.file.response);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form >

        <Form.Item
          {...formItemLayout}
          id="dropZone"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="https://jsonplaceholder.typicode.com/todos/1">
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
    );
  }
}

const WrappedDragger = Form.create({ name: 'validate_other' })(Dragger);
export default WrappedDragger;
