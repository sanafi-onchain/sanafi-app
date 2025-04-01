import { useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePrivyAuth } from "@/contexts/PrivyContext";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

// Form schema with validation rules
const onboardingSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  country: z.string().min(2, {
    message: "Please select your country.",
  }),
  goals: z.array(z.string()).min(1, {
    message: "Please select at least one financial goal.",
  }),
  riskTolerance: z.enum(["low", "medium", "high"], {
    required_error: "Please select your risk tolerance.",
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

// Define the steps of the onboarding process
const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "preferences", title: "Financial Preferences" },
  { id: "terms", title: "Terms & Conditions" },
];

export function Onboarding() {
  const [location, navigate] = useLocation();
  const { isAuthenticated, user } = usePrivyAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up the form
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      country: "",
      goals: [],
      riskTolerance: "medium",
      acceptTerms: true, // Set to true as the initial value to avoid type error
    },
  });

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Handle form submission
  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Submit the final form
    setIsSubmitting(true);
    try {
      // Make API request
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          walletAddress: user?.wallet?.address || "",
        }),
      });

      if (response.ok) {
        // Navigate to dashboard after successful submission
        navigate("/dashboard");
      } else {
        console.error("Onboarding submission failed:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting onboarding form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Go back to previous step
  function goToPreviousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  // Different form content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 1:
        return (
          <>
            <FormField
              control={form.control}
              name="goals"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Financial Goals</FormLabel>
                    <FormDescription>
                      Select all that apply to your financial planning
                    </FormDescription>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: "savings", label: "Save for the future" },
                      { id: "halal_investments", label: "Halal investments" },
                      { id: "daily_spending", label: "Day-to-day spending" },
                      { id: "charitable_giving", label: "Charitable giving" },
                    ].map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="goals"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riskTolerance"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Risk Tolerance</FormLabel>
                  <FormDescription>
                    How comfortable are you with investment risk?
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="low" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Low risk - Safe, stable returns
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Medium risk - Balanced approach
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="high" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Higher risk - Growth focused
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium">Terms of Service</h3>
                <p className="text-muted-foreground mt-1">
                  By using Tahara, you agree to our terms which include Sharia-compliance and ethical financial practices. All investments are reviewed by our Sharia board to ensure they meet Islamic finance principles.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Privacy Policy</h3>
                <p className="text-muted-foreground mt-1">
                  We respect your privacy and will only use your information to provide and improve our services. Your data is securely stored and protected.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Sharia Compliance Statement</h3>
                <p className="text-muted-foreground mt-1">
                  Tahara services are designed to be fully Sharia-compliant. We prohibit interest (riba), excessive uncertainty (gharar), and prohibited industries.
                </p>
              </div>

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the terms of service, privacy policy, and Sharia compliance statement
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // If not authenticated, redirect to sign in
  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            {steps[currentStep].title} ({currentStep + 1} of {steps.length})
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">{renderStepContent()}</CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  "Complete"
                ) : (
                  "Next"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Onboarding;