/* eslint-disable comma-dangle */
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
      <strong>Do you like pizza?</strong>
      <Form.Item>
        {getFieldDecorator('likePizza', {
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
          </Radio.Group>
        )}
      </Form.Item>
      <strong>My favourite topping is</strong>
      <Form.Item>
        {getFieldDecorator('topping', {
          rules: [
            {
              required: true,
              message: 'Please answer this question to continue',
            },
          ],
        })(
          <Radio.Group>
            <Radio value="ham">Ham</Radio>
            <Radio value="pepperoni">Pepperoni</Radio>
            <Radio value="capsicum">Capsicum</Radio>
            <Radio value="anchovies">Anchovies</Radio>
            <Radio value="pinapple">Pineapple</Radio>
            <Radio value="none">None of the above</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <PinnedToBottom>
        <NavButton stretched type="primary" htmlType="submit">Next</NavButton>
      </PinnedToBottom>
    </Form>
  );
});
