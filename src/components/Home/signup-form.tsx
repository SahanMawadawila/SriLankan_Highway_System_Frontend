import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera } from "lucide-react";
//react hook form is used to handle validation and form submission, it will not allow the form to be submitted if there are any errors. the main advantage of using react hook form is that it will not re-render the component like we do in the traditional way of handling forms in react using state.every time we type something in the input field the component will re-render and the state will be updated but in react hook form it will not re-render every time we type something in the input field.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosPublic } from "../../api/axios";
import { toast } from "react-toastify";

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormValues = z.infer<typeof schema>;

export function SignUpForm({
  className,
  onBack,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { onBack: () => void }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1) {
        setPhotoError("File size must be less than 1MB");
        return;
      }

      setPhotoError(null);
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    if (!photoFile) {
      setPhotoError("Please upload a photo");
      return;
    }
    const formData = new FormData();
    formData.append("image", photoFile!);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await axiosPublic.post("/signup", formData);
      toast.success(response.data.message);
      //clear the form
      setPhoto(null);
      setPhotoFile(null);
      reset();
      onBack();
    } catch (e: unknown) {
      const BackendErrors = e.response.data.errors;
      if (BackendErrors) {
        BackendErrors.forEach((error: { field: string; message: string }) => {
          if (error.field === "form") {
            toast.error(error.message);
          } else if (error.field === "image") {
            setPhotoError(error.message);
          } else if (error.field === "email") {
            setError("email", {
              type: "manual",
              message: error.message,
            });
          } else if (error.field === "password") {
            setError("password", {
              type: "manual",
              message: error.message,
            });
          }
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-balance text-muted-foreground">
                Sign up for your account
              </p>
            </div>
            <div className="flex justify-center ">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={photo || ""} />
                  <AvatarFallback>
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePhotoUpload}
                  />
                </Label>
              </div>
            </div>
            {photoError && (
              <p className="text-xs text-error text-red-500">{photoError}</p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                required
              />
              {errors.email && (
                <p className="text-xs text-error text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-error text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-error text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button variant="link" className="px-0" onClick={onBack}>
              Back to Login
            </Button>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/01.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
