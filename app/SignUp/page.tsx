"use client";

import { useState, ChangeEvent } from "react";
import { postData } from "../apiServices";
import { apiEndpoints } from "../apiServices/apiEndPoints";
import {
  validateEmail,
  validatePassword,
  debouncedIsValidInput,
  findIndexById,
} from "../Utils";
import { useRouter } from "next/navigation";

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
  emptyValidation?: string;
  validationRegex?: RegExp;
  invalidInput?: string;
  hasError?: boolean;
}

const signUpBEData: Array<configType> = [
  {
    label: "Name",
    type: "text",
    placeHolder: "Enter Name",
    isRequred: true,
    payloadKey: "user_name",
    emptyValidation: "Please Enter Your Name",
    hasError: false,
  },
  {
    label: "Email",
    type: "text",
    placeHolder: "Enter Email",
    isRequred: true,
    validationMessage: "Please enter valid email",
    invalidInput: "Please enter valid email",
    payloadKey: "user_email",
    validationRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    hasError: false,
  },
  {
    label: "Password",
    type: "password",
    placeHolder: "Password",
    payloadKey: "user_pass",
    isRequred: true,
    validationMessage: "Please enter valid email",
    validationRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
    invalidInput:
      "Must be 8+ chars, with 1 uppercase, 1 lowercase, and 1 special character.",
    hasError: false,
  },
];

export default function SignUp() {
  const router = useRouter();
  const [formConfig, setFormConfig] = useState<SignInData>({});
  const [rootFaliure, setRootFaliure] = useState("");
  const [signUpConfig, setSignupConfig] = useState(signUpBEData);

  /*
use case for validation
 - when user is typing,if he has typed invalid,and has pasued for sometime show error message
 - approach
   dont set the state,while user is typing
   just validate it with debounce

   just get the data at the time of submit


  */

  const getCurrentItemFromConfig = (payloadKey) => {
    const configItem = signUpConfig.filter((configItem) => {
      return configItem.payloadKey == payloadKey;
    });

    return configItem[0];
  };

  const onChangeFormField = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // const temp = formConfig;
    // temp[payloadKey as keyof typeof formConfig] = event.target.value;
    const currentConfigItem = getCurrentItemFromConfig(payloadKey);

    debouncedIsValidInput(
      event.target.value,
      currentConfigItem["validationRegex"],
      (result: boolean) => {
        console.log("result at containsValidationError");
        currentConfigItem["hasError"] = !result;
        console.log(currentConfigItem);
        const currentIndex = findIndexById(
          signUpConfig,
          payloadKey,
          "payloadKey"
        );
        const tempSignupCOnfig = signUpConfig;
        tempSignupCOnfig[currentIndex] = currentConfigItem;
        setSignupConfig([...tempSignupCOnfig]);
      }
    );
  };

  const onBlurFormField = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (payloadKey == "user_email") {
    }
  };

  const renderSignInComponents = () => {
    return signUpConfig.map((item) => {
      const { type, placeHolder, payloadKey, label, hasError, invalidInput } =
        item;

      return (
        <div className="pt-4">
          {/* <div className="p-2">{label}</div> */}
          <input
            type={type}
            onChange={(event) => {
              onChangeFormField(payloadKey, event);
            }}
            placeholder={placeHolder}
            className="border-1 border-black"
          />
          {hasError ? <label className="error">{invalidInput}</label> : false}
        </div>
      );
    });
  };

  const renderAPIMessage = () => {
    return <div className="text-red-400 mt-8">{rootFaliure}</div>;
  };

  const validatePayloadData = () => {
    const { user_name, user_email, user_pass } = formConfig;
    if (!validateEmail(user_email)) {
      setRootFaliure("Enter Valid Email");
      return false;
    }
    if (!user_name) {
      setRootFaliure("Please Enter Valid Name");
      return false;
    }
    if (!user_name || !user_email || !user_pass) {
      setRootFaliure("Mandatory Fields Missing");
      return false;
    } else if (!validatePassword(user_pass)) {
      setRootFaliure(
        "Password must containe  one letter,one number and one special character."
      );
    } else {
      return true;
    }
  };

  const onClickSignUp = async () => {
    const { user_name, user_email, user_pass } = formConfig;
    console.log(process.env.NEXT_PUBLIC_API_BASE);

    if (!validatePayloadData()) {
      return;
    }

    const res = await postData(
      {
        user_name: user_name,
        user_email: user_email,
        user_pass: user_pass,
      },
      apiEndpoints["SIGN_UP"]
    );

    if (res && res.success) {
      setRootFaliure("");
      router.push("/home");
    } else {
      setRootFaliure(
        res.message
          ? res.message
          : "Something went wrong,please try again later !"
      );
    }
  };

  const renderSiginBtn = () => {
    return (
      <button
        onClick={onClickSignUp}
        className="border-1 border-black bg-indigo-500 w-48 text-white mt-2"
      >
        Sign Up
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-1/2 rounded-md border-2 border-black flex justify-center items-center flex-col h-80">
        {renderSignInComponents()}
        {renderAPIMessage()}
        {renderSiginBtn()}
      </div>
    </div>
  );
}
