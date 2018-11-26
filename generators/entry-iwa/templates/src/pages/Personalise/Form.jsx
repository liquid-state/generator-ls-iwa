import React from 'react';
import { Form } from 'antd';
import { Radio } from '@liquid-state/ui-kit';
import { PinnedToBottom, NavButton } from '@project/common';

export default Form.create()(({
  form: { getFieldDecorator, validateFieldsAndScroll },
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <strong>I am a:</strong>
      <Form.Item>
        {getFieldDecorator('role', {
          rules: [
            {
              required: true,
              message: 'Please answer this question to continue',
            },
          ],
        })(
          <Radio.Group>
            <Radio value="doctor">Doctor</Radio>
            <Radio value="pathologist">Pathologist</Radio>
            <Radio value="nurse">Nurse</Radio>
            <Radio value="other">Other healthcare professional</Radio>
            <Radio value="none">None of the above</Radio>
          </Radio.Group>,
        )}
      </Form.Item>
      <strong>I use testing services provided by The Doctors Laboratory:</strong>
      <Form.Item>
        {getFieldDecorator('usesTdl', {
          rules: [
            {
              required: true,
              message: 'Please answer this question to continue',
            },
          ],
        })(
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>,
        )}
      </Form.Item>
      <PinnedToBottom>
        <NavButton stretched type="primary" htmlType="submit">Next</NavButton>
      </PinnedToBottom>
    </Form>
  );
});
