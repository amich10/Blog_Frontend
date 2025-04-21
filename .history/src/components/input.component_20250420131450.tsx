import { Input, Select } from "antd";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import * as Yup from "yup"

interface IInputProps {
  type?: string;
  name: string;
  control: any;
  classes?: string | null;
  errorMsg?: string | null;
  options?: Array<{ label: string; value: string }>;
  placeholder?:string 
}
export const TextInputController = (props: Readonly<IInputProps>) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => {
          return (
            <>
              <Input
                {...field}
                type={props.type}
                placeholder={props?.placeholder}
                className={`${props.classes}`}
                status={props.errorMsg ? "error" : ""}
              />
              <span className="text-sm text-red-500 italic">
                {props?.errorMsg}
              </span>
            </>
          );
        }}
      />
    </>
  );
};

export const PasswordInputController = (props: Readonly<IInputProps>) => {
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => {
          return (
            <>
              <Input.Password
                {...field}
                placeholder={props.placeholder}
                className={`${props.classes}`}
                status={props.errorMsg ? "error" : ""}
              />
              <span className="text-sm text-red-500 italic">
                {props?.errorMsg}
              </span>
            </>
          );
        }}
      />
    </>
  );
};

interface IInputLabel {
  htmlFor: string;
  children: ReactNode;
  classses?: string | null;
}

export const InputLabel = (props: Readonly<IInputLabel>) => {
  return (
    <>
      <label htmlFor={props.htmlFor} className={`${props.classses}`}>
        {props.children}
      </label>
    </>
  );
};




interface ISeclectProps {
  name:string,
  control:any,
  options:Array<{label:string,value:string}>
  errorMsg?:string | null
  classes?: string | null
  placeholder?:string

}
export const SelectInputController = (props:Readonly<ISeclectProps>) =>{
  return (
    <>
    <Controller
      name={props.name}
      control={props.control}
      render={({field}) =>{
        return (
          <>
          <Select 
            {...field}
            options={props.options}
            status={props.errorMsg ? "error" : ''}
            className={"props.classes"}
            style={{ width: '100%' }} //ant design donot use className
            placeholder={props.placeholder}
          />
          <span className="text-sm italic text-red-700">{props.errorMsg}</span>
          </>
        )
      }}
    />
    </>
  )
}



interface ITextAreaProps{
  name:string,
  control:any,
  errorMsg?:string | null,
  classes?:string | null
  autoSize?: { minRows: number; maxRows: number };
  placeholder?:string
}
export const TextAreaController = (props:Readonly<ITextAreaProps>) =>{
  return(
    <>
    <Controller 
      name={props.name}
      control={props.control}
      render={({field}) =>{
        return(
          <>
          <Input.TextArea 
            {...field}
            className={`${props?.classes}`}
            status={props.errorMsg ? "error" : ''}
            autoSize={props.autoSize}
            placeholder={props.placeholder}
          />
          </>
        )
      }}

    />
    </>
  )
}


export const RegisterDTO = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .required("Full name is required"),

    username: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username cannot exceed 50 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*>-])[a-zA-Z\d!@#$%^&*>-]{8,25}$/,
        "Password must be 8-25 characters, include at least one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    role: Yup.string()
      .matches(/^(author|user)$/, "Role must be either 'author' or 'user'")
      .required("Role is required"),

    gender: Yup.string()
      .matches(
        /^(male|female|other)$/,
        "Gender must be 'male', 'female', or 'other'"
      )
      .required("Gender is required"),

    address: Yup.string().required("Address is required"),

    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),

    image: Yup.mixed().nullable().optional(),
    socialLinks: Yup.array()
    .of(Yup.string().url("Invalid URL format")).optional(),
    bio: Yup.string().max(200, "Bio cannot exceed 200 characters").optional(),
  });
