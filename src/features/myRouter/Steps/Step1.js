import React, { Component, useEffect } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import FormBuilder from 'antd-form-builder'
const Option = Select.Option;

const formMeta = {
  colon: true,
  columns: 1,
  elements: [{ key: "email", label: "Email", widget: Input }]
};


const Step1 =({form, allValues})=> {
  useEffect(() => {
    form.setFieldsValue(allValues);
  },[])

  return (
    <div>
      <FormBuilder meta={formMeta} form={form} />
    </div>
  );
}

export default Step1;

