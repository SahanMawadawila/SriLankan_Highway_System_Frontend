import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosPublic } from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().nonempty("Password cannot empty"),
});

type LoginFormValues = z.infer<typeof schema>;

export function LoginForm({
  className,
  onsign,
  ...props
}: React.ComponentProps<"div"> & { onsign: () => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axiosPublic.post("/signin", {
        email: data.email,
        password: data.password,
      });
      const { accessToken, role, photo_url, email } = response.data;
      login(role, photo_url, accessToken, email);
      if (role === 2024) {
        navigate("/user");
      } else if (role === 5401) {
        navigate("/admin");
      } else if (role === 4048) {
        navigate("/police");
      }
    } catch (e: unknown) {
      const BackendErrors = e.response.data.errors;
      if (BackendErrors) {
        BackendErrors.forEach((error: { field: string; message: string }) => {
          if (error.field === "form") {
            toast.error(error.message);
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
          } else {
            toast.error("Something went wrong");
          }
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Welcome to Highway System
                </h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-error text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button variant="link" className="px-0" onClick={onsign}>
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/03.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
