"use client";

import { useState, ChangeEvent } from "react";
import { postData } from "../apiServices";
import { apiEndpoints } from "../apiServices/apiEndPoints";
import {
  validateEmail,
  validatePassword,
  debouncedIsValidInputOnType,
  debouncedIsValidInputOnBlur,
  findIndexById,
  generatePayloadData,
} from "../Utils";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

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
  value: string;
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
    validationRegex: /^[a-zA-Z0-9_]{3,20}$/,
    invalidInput: "Name length should be between 3 and 20 characters",
    value: "",
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
    value: "",
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
    value: "",
  },
];

export default function SignUp() {
  const router = useRouter();
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

  const getCurrentItemFromConfig = (payloadKey: string) => {
    const configItem = signUpConfig.filter((configItem) => {
      return configItem.payloadKey == payloadKey;
    });

    return configItem[0];
  };

  const validateInput = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>,
    eventType: string
  ) => {
    const currentConfigItem = getCurrentItemFromConfig(payloadKey);
    const validationFunc =
      eventType == "type"
        ? debouncedIsValidInputOnType
        : debouncedIsValidInputOnBlur;
    validationFunc(
      event.target.value,
      currentConfigItem["validationRegex"],
      (result: boolean) => {
        console.log("result at containsValidationError");
        currentConfigItem["hasError"] = !result;
        currentConfigItem["value"] = event.target.value;
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

  const onChangeFormField = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // const currentConfigItem = getCurrentItemFromConfig(payloadKey);
    // debouncedIsValidInput(
    //   event.target.value,
    //   currentConfigItem["validationRegex"],
    //   (result: boolean) => {
    //     console.log("result at containsValidationError");
    //     currentConfigItem["hasError"] = !result;
    //     currentConfigItem["value"] = event.target.value;
    //     console.log(currentConfigItem);
    //     const currentIndex = findIndexById(
    //       signUpConfig,
    //       payloadKey,
    //       "payloadKey"
    //     );
    //     const tempSignupCOnfig = signUpConfig;
    //     tempSignupCOnfig[currentIndex] = currentConfigItem;
    //     setSignupConfig([...tempSignupCOnfig]);
    //   }
    // );
    validateInput(payloadKey, event, "type");
  };

  const onBlurFormField = (
    payloadKey: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    validateInput(payloadKey, event, "blur");
  };

  const renderSignInComponents = () => {
    return signUpConfig.map((item) => {
      const { type, placeHolder, payloadKey, label, hasError, invalidInput } =
        item;

      return (
        <div className="pt-4 flex flex-col">
          {/* <div className="p-2">{label}</div> */}
          <input
            type={type}
            onChange={(event) => {
              onChangeFormField(payloadKey, event);
            }}
            onBlur={(event) => {
              onBlurFormField(payloadKey, event);
            }}
            placeholder={placeHolder}
            className="border-1 border-black"
          />
          {hasError ? (
            <label className="error text-red-400  text-sm">
              {invalidInput}
            </label>
          ) : (
            false
          )}
        </div>
      );
    });
  };

  const renderAPIMessage = () => {
    return <div className="text-red-400 mt-8">{rootFaliure}</div>;
  };

  const onClickSignUp = async () => {
    console.log("onClickSignUp called");
    const { user_name, user_email, user_pass } =
      generatePayloadData(signUpConfig);
    const secreteKey = process.env.NEXT_PUBLIC_CRYPTO_SECRETE_KEY;

    var encrypedPass = CryptoJS.AES.encrypt(user_pass, secreteKey);
    console.log("hassed password");
    console.log(encrypedPass.toString());
    console.log(process.env.NEXT_PUBLIC_API_BASE);

    const res = await postData(
      {
        user_name: user_name,
        user_email: user_email,
        user_pass: encrypedPass.toString(),
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
