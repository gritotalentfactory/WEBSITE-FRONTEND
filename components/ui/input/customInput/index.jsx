import { cva } from "class-variance-authority";
import { cn } from "@/utils/helper";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const InputVariants = cva(
  `px-3 py-2 rounded-xl transition-all hover:ring-2 ring-indigo-300`,
  {
    variants: {
      variant: {
        outlined: "border-gray-300 border-4 text-black",
      },
      size: {
        sm: "py-2 px-2",
        md: "px-4 py-2",
        lg: "py-3 px-6",
      },
      fullWidth: {
        true: "w-full",
      },
      isIcon: {
        true: "bg-lemon-100",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        className: "rounded-md",
      },
    ],
    defaultVariants: {
      size: "sm",
      fullWidth: true,
      variant: "outlined",
    },
  }
);

export const CustomInput = ({
  size,
  className,
  fullWidth,
  LabelText,
  isPassword,
  variant,
  onBlur,
  showPassword,
  onClick,
  type,
  onChange,
  placeholder,
  value,
  ...props
}) => {
  return (
    <div>
      <label htmlFor="">{LabelText}</label>
      <div className="relative">
        {isPassword && (
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={onClick}
          >
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </div>
        )}
        <input
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={cn(
            InputVariants({
              className,
              size,
              fullWidth,
              variant,
            })
          )}
          {...props}
        />
      </div>
    </div>
  );
};
