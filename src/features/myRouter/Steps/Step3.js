import React, { Component } from "react";

const Step3 =({ allValues})=> {

  const { email, userName, birthday } = allValues;

  return (
    <div className="wizard-finish-step">
      <ul>
        <li>
          <label>Email:</label>
          <span>{email}</span>
        </li>
        <li>
          <label>用户名:</label>
          <span>{userName}</span>
        </li>
        <li>
          <label>生日:</label>
          <span>{birthday ? birthday.format("M月D日") : ""}</span>
        </li>
      </ul>
    </div>
  );
}

export default Step3;
