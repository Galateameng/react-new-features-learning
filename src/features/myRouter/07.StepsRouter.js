import React, { useState } from "react";
import _ from "lodash";
import { HashRouter, Route, Link, Routes, useParams } from "react-router-dom";
import { Button, Steps, Form, Modal } from "antd";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

import FormBuilder from 'antd-form-builder'


const StepsRouter = () => {
  const [state, setState] = useState({allValues: {}})
  const [form] = Form.useForm();
  const forceUpdate = FormBuilder.useForceUpdate();



  const pushUrl = (path) => {
    window.history.pushState(null, "", `/#${path}`);
    forceUpdate();
  }

  const handleNext = () => {
    setState({
      allValues: {
        ...state.allValues,
        ...form.getFieldsValue(),
      },
    });
    const currentStep = getCurrentStep();
    if (currentStep < getSteps().length - 1) {
      pushUrl(getSteps()[currentStep + 1].path);
    } else {
      Modal.success({
        title: "提交成功",
      });
    }
  };
  const handleBack = () => {
    console.log("form values: ", form.getFieldsValue());
    setState({
      allValues: {
        ...state.allValues,
        ...form.getFieldsValue(),
      },
    });
    const currentStep = getCurrentStep();
    if (currentStep > 0) {
      pushUrl(getSteps()[currentStep - 1].path);
    }
  };

  const getCurrentStep = () => {
    const currentPath = document.location.hash.replace(/^#/, "");
    return _.findIndex(getSteps(), { path: currentPath });
  }

  const getSteps = () => {
    return [
      { title: "验证邮件", path: "/wizard/step/1", component: Step1 },
      { title: "账号信息", path: "/wizard/step/2", component: Step2 },
      { title: "完成", path: "/wizard/step/3", component: Step3 },
    ];
  }
  const renderComponent = () => {
    const StepComponent = getSteps()[getCurrentStep()].component;
    return (
      <StepComponent form={form} allValues={state.allValues} />
    );
  };

  if (!/^#\/wizard\/step/.test(document.location.hash)) {
    return (
      <Button type="primary" onClick={() => pushUrl("/wizard/step/1")}>
        创建账号
      </Button>
    );
  }

  return (
    <Form form={form}>
      <div style={{ width: "600px" }}>
        <h1>创建账号</h1>
        <Steps current={getCurrentStep()}>
          {getSteps().map(step => <Steps.Step key={step.title} title={step.title} />)}
        </Steps>

        <div className="step-container" style={{ margin: "40px 0" }}>
          <Routes>
            <Route
              path="/wizard/step/:stepId"
              element={renderComponent()}
            />
          </Routes>
        </div>
        <div>
          <Button
            disabled={getCurrentStep() === 0}
            onClick={handleBack}
            style={{ marginRight: "20px" }}
          >
            上一步
          </Button>

          <Button onClick={handleNext} type="primary">
            {getCurrentStep() === getSteps().length - 1
              ? "完成"
              : "下一步"}
          </Button>
        </div>
      </div>
    </Form>
  );

}

export default function StepsRouterWrapper () {
  return <HashRouter>
      <StepsRouter />
    </HashRouter>
};
