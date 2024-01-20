import { cva } from "class-variance-authority";
import { cn } from "@/utils/helper";
import Loader from "@/components/loader";

const buttonVariants = cva(
  `px-3 py-2 rounded-xl transition-all hover:ring-2 ring-indigo-300 hover:text-white`,
  {
    variants: {
      variant: {
        primary: "bg-blue-400",
        danger: "bg-red-500",
        lemony: "bg-lemon-200 text-white",
        alert: "bg-yellow-500",
      },
      size: {
        sm: "py-2 px-2",
        md: "px-4 py-2",
        lg: "py-3 px-6",
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
    compoundVariants: [
      {
        variant: "primary",
        size: "sm",
        className: "uppercase rounded-md",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "primary",
      fullWidth: true,
      disabled: false,
    },
  }
);



const Button = ({
  size,
  variant,
  className,
  loadingText,
  text,
  disabled,
  loading,
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
          loading,
          disabled,
        })
      )}
      {...props}
    >
      <div>
        {loading && (
          <div className="flex items-center justify-center gap-3 align-middle">
            <Loader />
            {loadingText}
          </div>
        )}
      </div>
      {!loading && text && <div>{text}</div>}
    </button>
  );
};

export default Button;
