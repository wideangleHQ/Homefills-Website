import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Homefills button system (Design.md §13.1): 44px default height, 6px radius.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-heading font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-(--ease-soft) select-none active:translate-y-px disabled:pointer-events-none disabled:border-line disabled:bg-disabled disabled:text-subtle [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-purple bg-purple text-surface hover:border-purple-hover hover:bg-purple-hover active:border-purple-pressed active:bg-purple-pressed",
        outline: "border-purple bg-transparent text-purple hover:bg-purple-tint active:border-purple-pressed active:text-purple-pressed",
        // Secondary button for turmeric surfaces: purple on turmeric is only 3.66:1, so the label sits on lemon.
        lemon: "border-purple bg-canvas text-purple hover:bg-soft",
        // Primary button for purple surfaces, where a purple fill would vanish.
        light: "border-surface bg-surface text-purple hover:border-peach hover:bg-peach",
        ghost: "border-transparent text-purple hover:bg-purple-tint",
        link: "border-transparent h-auto px-0 text-purple underline underline-offset-4 hover:text-purple-hover hover:decoration-2",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11 text-[0.9375rem]",
        "icon-sm": "size-9 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
