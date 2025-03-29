import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@/components/ui/loadingbutton";

export function SignupForm({
  className,
  onSwitch = () => {},
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { onSwitch: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    console.log("Validation passed, attempting signup with Firebase");
    console.log("API_URL:", API_URL);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      console.log("Firebase Signup successful. Token:", idToken);
      console.log("Request data:", { token: idToken, fullName });

      const response = await axios.post(`${API_URL}/login`, {
        token: idToken,
        fullName,
      });
      console.log("Response received:", response.data);

      toast.success("Signup successful!");
      navigate("/home");
    } catch (error) {
      console.log("Error caught:", error);
      let errorMessage = "Signup failed. Please try again.";

      if (error instanceof AxiosError && error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error response data:", error.response.data);
        const backendMessage =
          error.response.data?.message || error.response.data;
        switch (error.response.status) {
          case 400:
            errorMessage = backendMessage || "Invalid request format.";
            break;
          case 409:
            errorMessage =
              backendMessage ||
              "User already exists with this email! Please login.";
            break;
          case 500:
            errorMessage =
              backendMessage || "Server error. Please try again later.";
            break;
          default:
            errorMessage = backendMessage || "An unexpected error occurred.";
        }
      } else if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "Invalid email format.";
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            errorMessage = "Email already in use. Please login.";
            break;
          case "Firebase: Error (auth/weak-password).":
            errorMessage = "Password should be at least 6 characters.";
            break;
          default:
            errorMessage = "Signup failed. Please try again.";
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true); // Start loading
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      const googleFullName = userCredential.user.displayName || fullName;
      console.log("Google Sign-Up successful. Token:", idToken);

      const response = await axios.post(`${API_URL}/login`, {
        token: idToken,
        fullName: googleFullName,
      });
      console.log("Response received from backend:", response.data);

      toast.success("Signed up with Google successfully 🎉");
      navigate("/home");
    } catch (error) {
      console.log("Google Sign-Up error:", error);
      let errorMessage = "Failed to sign up with Google.";

      if (error instanceof AxiosError && error.response) {
        const backendMessage =
          error.response.data?.message || error.response.data;
        switch (error.response.status) {
          case 400:
            errorMessage = backendMessage || "Invalid request format.";
            break;
          case 500:
            errorMessage =
              backendMessage || "Server error. Please try again later.";
            break;
          default:
            errorMessage = backendMessage || "An unexpected error occurred.";
        }
      } else if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/popup-closed-by-user).":
            errorMessage = "Google sign-up popup closed. Please try again.";
            break;
          case "Firebase: Error (auth/cancelled-popup-request).":
            errorMessage = "Sign-up cancelled. Please try again.";
            break;
          default:
            errorMessage = "Google sign-up failed. Please try again.";
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Toaster position="top-center" richColors expand />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join Us!</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
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
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <LoadingButton type="submit" className="w-full" loading={loading}>
                Sign Up
              </LoadingButton>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={onSwitch}
                  className="underline-offset-4 hover:text-primary"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
