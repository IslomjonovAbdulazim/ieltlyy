"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

// This is a common utility function in projects using shadcn/ui.
// It's used to conditionally merge Tailwind CSS classes.
const cn = (...inputs: (string | undefined | null | false)[]): string => {
  return inputs.filter(Boolean).join(" ");
};

/* 
  Locally defined Accordion components to match the design (e.g., using a Plus icon),
  aligning with the "pixel perfect" and "plus icons" requirements.
  This approach uses Radix UI primitives, ensuring accessibility and behavior
  while allowing for precise visual customization.
*/

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-t border-border-gray", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-6 text-left font-bold text-2xl text-text-primary transition-all hover:no-underline [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      <Plus className="h-6 w-6 shrink-0 text-text-primary transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base text-text-secondary transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const faqItems = [
  {
    value: "item-1",
    question: "Can I take a test on my mobile phone?",
    answer: "Yes, Examy is fully optimized for mobile devices. You can take any test section-by-section using your phone or tablet.",
  },
  {
    value: "item-2",
    question: "I haven't received my test results. What should I do?",
    answer: "Please make sure that you have verified your email and phone number and check your spam/junk folder. Also, please make sure to check the 'My results' section in your dashboard. If you're still having issues, please contact our support team.",
  },
  {
    value: "item-3",
    question: "How can I take more practice tests?",
    answer: <>Every new user is given enough credits to take one free full mock exam. To get more credits, you can always visit our <a href="/pricing" className="text-brand-primary">Pricing</a> page.</>,
  },
];

const FaqSection = () => {
  return (
    <section id="faqs" className="bg-background-light py-20">
      <div className="container">
        <div className="max-w-3xl">
          <h2 className="text-[48px] font-bold text-text-primary leading-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-text-secondary">
            Find your answers below
          </p>
        </div>

        <div className="mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {faqItems.map((item) => (
              <AccordionItem value={item.value} key={item.value} className="first:border-t-0">
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pr-8">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;