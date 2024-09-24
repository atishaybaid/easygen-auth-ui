"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";

interface SignInData {
  [key: string]: string;
}

interface configType {
  label: string;
  type: string;
  placeHolder: string;
  isRequred: boolean;
  validationMessage?: string;
  payloadKey: string;
}
export default function Login() {
  const [formConfig, setFormConfig] = useState<SignInData>({});

  const signUpConfig: Array<configType> = [
    {
      label: "Email",
      type: "text",
      placeHolder: "Enter Email",
      isRequred: true,
      validationMessage: "Please enter valid email",
      payloadKey: "user_email",
    },
    {
      label: "Name",
      type: "text",
      placeHolder: "Enter Name",
      isRequred: false,
      payloadKey: "user_name",
    },
    {
      label: "Password",
      type: "password",
      placeHolder: "Password",
      isRequred: false,
      payloadKey: "user_pass",
    },
  ];

  const onChangeFormField = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const temp = formConfig;
    temp[payloadKey as keyof typeof formConfig] = event.target.value;

    setFormConfig({ ...temp });
  };

  const renderSignInComponents = () => {
    return signUpConfig.map((item) => {
      const { type, placeHolder, payloadKey } = item;

      return (
        <div className="">
          <input
            type={type}
            onChange={(event) => {
              onChangeFormField(payloadKey, event);
            }}
            placeholder={placeHolder}
          />
        </div>
      );
    });
  };

  const onClickLogin = () => {
    console.log("formConfig");
    console.log(formConfig);
  };

  const renderSiginBtn = () => {
    return <button onClick={onClickLogin}>Login</button>;
  };

  return (
    <div className="">
      {renderSignInComponents()}
      {renderSiginBtn()}
    </div>
  );
}
