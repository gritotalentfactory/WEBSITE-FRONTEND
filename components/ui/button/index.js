import { cva } from "class-variance-authority";
import { cn } from "@/utils/helper";

const buttonVariants = cva(`px-3 py-2 rounded-xl  transition-all `, {
  variants: {
    variant: {
      primary:
        "bg-primary hover:bg-transparent hover:border-2 hover:border-[#CBB26A] hover:text-[#CBB26A]",
      outline:
        "bg-transparent border-[#CBB26A] text-white border-2 hover:bg-primary  hover:text-black",
    },
    size: {
      sm: " px-2",
      md: "px-4 py-2",
      lg: "py-3 px-6 shadow-xl",
    },
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "bg-gray-300 cursor-not-allowed",
    },
    loading: {
      true: "bg-lemon-100",
    },
  },
  // compoundVariants: [
  //   {
  //     variant: "primary",
  //     size: "sm",
  //     className: "uppercase rounded-md",
  //   },
  // ],
  defaultVariants: {
    size: "sm",
    variant: "primary",
    fullWidth: true,
    disabled: false,
  },
});

const Button = ({
  size,
  variant,
  className,
  text,
  disabled,
  fullWidth,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={cn(
        buttonVariants({
          className,
          variant,
          size,
          fullWidth,
          disabled,
        })
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
