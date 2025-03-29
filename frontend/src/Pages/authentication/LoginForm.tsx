import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export function LoginForm({
  className,
  onSwitch,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log("Firebase Authentication successful. Token:", idToken);
      const response = await axios.post(`${API_URL}/login`, { token: idToken });
      console.log("Response received from backend:", response.data);
      toast.success("Logged in successfully 🎉");
    } catch (error) {
      console.log("Error caught:", error);
      let errorMessage = "Login failed. Please try again.";
      if (error instanceof AxiosError) {
        if (error.response) {
          const status = error.response.status;
          const backendMessage = error.response.data?.message;
          switch (status) {
            case 400:
              errorMessage = backendMessage || "Invalid email or password format.";
              break;
            case 401:
              errorMessage = backendMessage || "Incorrect email or password. Please try again.";
              break;
            case 500:
              errorMessage = backendMessage || "Server error. Please try again later.";
              break;
            default:
              errorMessage = backendMessage || "Login failed. Please check your credentials.";
          }
        }
      } else if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "Invalid email format.";
            break;
          case "Firebase: Error (auth/user-not-found).":
            errorMessage = "User not found.";
            break;
          case "Firebase: Error (auth/wrong-password).":
            errorMessage = "Incorrect password.";
            break;
          case "Firebase: Error (auth/invalid-credential).":
            errorMessage = "Incorrect credentials! Please retry.";
            break;
          default:
            errorMessage = "Login failed. Please check your credentials.";
        }
      }
      toast.error(errorMessage);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      toast.success("Password reset email sent successfully!");
      setForgotPasswordEmail("");
    } catch (error) {
      let errorMessage = "Failed to send reset email.";
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "Invalid email format.";
            break;
          case "Firebase: Error (auth/user-not-found).":
            errorMessage = "Email not found.";
            break;
          default:
            errorMessage = "Failed to send reset email. Please try again.";
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Toaster position="top-center" richColors expand />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {showForgotPassword ? "Reset Password" : "Welcome!!!"}
          </CardTitle>
          <CardDescription>
            {showForgotPassword
              ? "Enter your email to receive a password reset link."
              : "Login with your Apple or Google account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showForgotPassword ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        variant='link'
                        onClick={() => setShowForgotPassword(true)}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don’t have an account?{" "}
                  <Button
                  variant='link'
                    onClick={onSwitch}
                    className="underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="m@example.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Email
                </Button>
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="underline-offset-4 hover:text-primary"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}