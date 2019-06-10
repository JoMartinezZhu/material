import React, { Fragment } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import * as PropTypes from "prop-types";

import PureComponent from "../components/PureComponent/index";

// 默认的layout
export const defaultLabelColSpan = 6;
const FORM_LAYOUT_MODEL = {
  inline: "inline",
  horizontal: "horizontal"
};
const defaultFormLayout = FORM_LAYOUT_MODEL.horizontal;
const defaultSubmitText = "提交";
const defaultResetText = "重置";

const defaultFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

const FormItem = Form.Item;

// 渲染单个表单项
const renderFormItem = ({ item, formLayout, getFieldDecorator }, keyIdx) => {
  if (Array.isArray(item)) {
    return (
      <Row key={keyIdx}>
        {item.map((childItem, idx) =>
          renderFormItem(
            { item: childItem, formLayout, getFieldDecorator },
            idx
          )
        )}
      </Row>
    );
  }
  const {
    label,
    key,
    placeholder,
    wrapStyle,
    col,
    itemLayout,
    required,
    component,
    options = {},
    rules
  } = item;
  let formItemLayout = null;
  if (formLayout === FORM_LAYOUT_MODEL.horizontal) {
    formItemLayout = itemLayout
      ? { ...itemLayout }
      : { ...defaultFormItemLayout };
  }
  return (
    <Fragment key={key}>
      {col ? (
        <Col span={col}>
          <FormItem key={key} label={label} {...formItemLayout}>
            {getFieldDecorator(key, {
              ...options,
              rules: rules || [{ required, message: `${label}为空` }]
            })(component || <Input placeholder={placeholder} />)}
          </FormItem>
        </Col>
      ) : (
        <FormItem key={key} label={label} {...formItemLayout}>
          {getFieldDecorator(key, {
            ...options,
            rules: rules || [{ required, message: `${label}为空` }]
          })(
            component || (
              <Input style={{ ...wrapStyle }} placeholder={placeholder} />
            )
          )}
        </FormItem>
      )}
    </Fragment>
  );
};

const customRecursionResetField = (form, item) => {
  if (Array.isArray(item)) {
    customRecursionResetField(form, item);
    return;
  }
  const { key, component, initialValue } = item;
  if (component) {
    form.setFieldsValue({ [key]: initialValue });
  }
};

/**
 * @author 朱双杰
 * @email henry.zhushangjie@qq.com
 * @description 根据配置生成表单
 */
class AdvancedForm extends PureComponent {
  handleCommonSubmit(e) {
    e.preventDefault();
    const { onSubmit, onError, form } = this.props;
    if (onSubmit) {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          if (onError) {
            onError();
          }
          return;
        }
        if (onSubmit) {
          onSubmit(values);
        }
      });
    }
  }

  handleCommonReset() {
    const { onReset, form } = this.props;
    form.resetFields();
    // this.handleResetCustomComponent();
    if (onReset) {
      onReset();
    }
  }

  // 对自定义组件的重置,暂时没有用到
  handleResetCustomComponent() {
    const { items, form } = this.props;
    items.forEach(currentItem => {
      customRecursionResetField(form, currentItem);
    });
  }

  renderButtons() {
    const { onSubmit, submitText, resetText } = this.props;
    if (!onSubmit) return;
    return (
      <FormItem>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleCommonReset}>
          {resetText}
        </Button>
      </FormItem>
    );
  }

  render() {
    // items 格式即为 formItems 的表单项
    const {
      items,
      formLayout,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form
        layout={formLayout || defaultFormLayout}
        onSubmit={this.handleCommonSubmit}
      >
        {items.map((item, idx) =>
          renderFormItem({ item, formLayout, getFieldDecorator }, idx)
        )}
        {this.renderButtons()}
      </Form>
    );
  }
}

AdvancedForm.propTypes = {
  items: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  formLayout: PropTypes.string,
  submitText: PropTypes.string,
  resetText: PropTypes.string
};

AdvancedForm.defaultProps = {
  formLayout: defaultFormLayout,
  submitText: defaultSubmitText,
  resetText: defaultResetText
};

export default Form.create()(AdvancedForm);
