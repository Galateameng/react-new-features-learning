import React, { Component, useEffect } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import FormBuilder from 'antd-form-builder'

const Option = Select.Option;

const formMeta = {
  colon: true,
  columns: 1,
  elements: [
    { key: "userName", label: "用户名", widget: Input },
    { key: "password", label: "密码", widget: Input, type: "password" },
    { key: "birthday", label: "生日", widget: DatePicker }
  ]
};

const Step2 =({form, allValues})=> {

  useEffect(() => {
    form.setFieldsValue(allValues);
  },[])

  return (
    <div>
      <FormBuilder meta={formMeta} form={form} />
    </div>
  );
}

export default Step2;
