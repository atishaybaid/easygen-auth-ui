export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  // Regular expressions for each condition
  const hasLetter = /[a-zA-Z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  // Checking the password against all the conditions
  if (!hasLetter.test(password)) {
    return false;
  }
  if (!hasNumber.test(password)) {
    return false;
  }
  if (!hasSpecialChar.test(password)) {
    return false;
  }

  return true;
};

export const isValidInput = (
  inputValue: string,
  regexString: RegExp,
  clbck: Function = () => {}
) => {
  const regex = new RegExp(regexString);

  var result = regex.test(inputValue);
  clbck(result);
};

/*funtion check behaviour */

export const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

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
export const findIndexById = (
  array: Array<configType> = [],
  id: string | boolean,
  key: string
) => {
  let output = -1;

  for (var i = 0; i < array.length; i++) {
    const currentItem = array[i];
    if (currentItem[key as keyof configType] == id) {
      output = i;
    }
  }

  return output;
};

export const debouncedIsValidInput = debounce(isValidInput, 2000);
