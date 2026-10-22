import { type ComponentType, type ElementType, type FormHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode, type RefAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { type AnyProps } from './utils.js';
type SharedFormControlProps = {
    as?: ElementType;
    htmlSize?: number;
    isInvalid?: boolean;
    isValid?: boolean;
    plaintext?: boolean;
    size?: 'sm' | 'lg';
};
type InputFormControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & SharedFormControlProps;
type TextareaFormControlProps = TextareaHTMLAttributes<HTMLTextAreaElement> & SharedFormControlProps & {
    as: 'textarea';
};
type FormControlComponent = {
    (props: TextareaFormControlProps & RefAttributes<HTMLTextAreaElement>): ReactNode;
    (props: InputFormControlProps & RefAttributes<HTMLInputElement>): ReactNode;
    Feedback: ComponentType<AnyProps>;
};
export declare const FormSelect: import("react").ForwardRefExoticComponent<Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    htmlSize?: number;
    isInvalid?: boolean;
    isValid?: boolean;
    size?: "sm" | "lg";
} & RefAttributes<HTMLSelectElement>>;
export declare const FormControl: FormControlComponent;
export declare const FormCheck: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    inline?: boolean;
    label?: ReactNode;
    reverse?: boolean;
    type?: InputHTMLAttributes<HTMLInputElement>["type"] | "switch";
} & RefAttributes<HTMLInputElement>> & {
    Input: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>>;
};
export declare const Form: import("react").ForwardRefExoticComponent<FormHTMLAttributes<HTMLFormElement> & {
    validated?: boolean;
} & RefAttributes<HTMLFormElement>> & {
    Check: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
        inline?: boolean;
        label?: ReactNode;
        reverse?: boolean;
        type?: InputHTMLAttributes<HTMLInputElement>["type"] | "switch";
    } & RefAttributes<HTMLInputElement>> & {
        Input: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>>;
    };
    Control: FormControlComponent;
    Group: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
        as?: ElementType;
        controlId?: string;
    } & RefAttributes<HTMLDivElement>>;
    Label: import("react").ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & {
        column?: boolean | string;
    } & RefAttributes<HTMLLabelElement>>;
    Range: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>>;
    Select: import("react").ForwardRefExoticComponent<Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
        htmlSize?: number;
        isInvalid?: boolean;
        isValid?: boolean;
        size?: "sm" | "lg";
    } & RefAttributes<HTMLSelectElement>>;
    Text: (props: AnyProps) => import("react").JSX.Element;
};
export declare const InputGroup: import("react").ForwardRefExoticComponent<Omit<AnyProps, "ref"> & RefAttributes<HTMLDivElement>> & {
    Text: (props: AnyProps) => import("react").JSX.Element;
};
export {};
//# sourceMappingURL=Form.d.ts.map