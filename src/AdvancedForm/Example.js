import React from "react";
import moment from "moment";
import { Button } from "antd";

import PureComponent from "../components/PureComponent/index";

import AdvancedForm, { defaultLabelColSpan } from "./AdvancedForm";
// formItems即为表单的配置项
import formItemsConfig from "./form.items.config";

// 模拟发请求（在做修改操作时，表单需要先填充已有数据，这里写了个假的获取详情接口）
const requestDetail = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        Input: "Input",
        password: "password",
        Select: "option2",
        RadioGroup: "radio2",
        RadioButtonGroup: "radio2",
        CheckboxGroup: ["checkbox2"],
        DatePicker: "2018-05-15T13:36:27.132Z",
        RangePicker: ["2018-04-15T13:36:27.132Z", "2018-05-15T13:36:27.132Z"],
        Switch: true
      });
    }, 1500);
  });
};

/* eslint-disable */
export default class Example extends PureComponent {
  constructor(props) {
    super(props);

    /*
            // React16 使用 
            this.formRef = React.createRef();
         */
  }

  getDetail = () => {
    requestDetail().then(res => {
      res.DatePicker = moment(res.DatePicker);
      res.RangePicker = res.RangePicker.map(d => moment(d));
      /*
                // React16 使用 
                this.formRef.current.setFieldsValue(res);
            */
    });
  };

  onClickSubmit = () => {
    /*
            // React16 使用 
            this.formRef.current.validateFieldsAndScroll((err, values) => {
                console.log(values);
                if (err) {
                    return;
                }
                console.log('校验通过');
            });
        */
    // React15&16
    this.formRef.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      console.log("values", values);
    });
  };

  formRefFun = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button style={{ margin: 24 }} type="primary" onClick={this.getDetail}>
          模拟请求数据然后设置表单值
        </Button>

        {/* <AdvancedForm ref={this.formRef} items={formItemsConfig} /> */}
        <AdvancedForm
          wrappedComponentRef={this.formRefFun}
          items={formItemsConfig}
        />
        <Button
          style={{ marginLeft: `${(defaultLabelColSpan / 24) * 100}%` }}
          type="primary"
          onClick={this.onClickSubmit}
        >
          提交
        </Button>
      </div>
    );
  }
}
