import { Input, Select } from "antd";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

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
            className={`${props.classes}`}
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