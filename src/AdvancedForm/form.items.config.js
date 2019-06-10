import React from "react";
import { Input, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const formItemHorizontalLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 }
  }
};
const formHorizontalLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};

const selectExample = (
  <Select>
    <Option value="option1">option1</Option>
    <Option value="option2">option2</Option>
    <Option value="option3">option3</Option>
  </Select>
);

export default [
  {
    label: "Input1",
    key: "Input1",
    itemLayout: { ...formItemHorizontalLayout },
    required: true
  },
  {
    label: "TextArea",
    key: "TextArea",
    itemLayout: { ...formItemHorizontalLayout },
    component: <TextArea />
  },
  [
    {
      label: "Select",
      key: "Select1",
      itemLayout: { ...formHorizontalLayout },
      col: 8,
      required: true,
      component: selectExample
    },
    {
      label: "Select",
      key: "Select2",
      itemLayout: { ...formHorizontalLayout },
      col: 8,
      required: true,
      component: selectExample
    },
    {
      label: "Select",
      key: "Select3",
      col: 8,
      itemLayout: { ...formHorizontalLayout },
      required: true,
      component: selectExample
    }
  ]
];
