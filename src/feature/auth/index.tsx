import Logo from "@/components/logo";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

export default function AuthScreen() {
  return (
    <Card className="w-full rounded-lg max-w-sm shadow-lg">
      <CardContent className="p-8 space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-6 flex flex-col items-center">
          <Logo />
          <p className="text-xs leading-relaxed max-w-[200px] font-bold py-8">
            Explore a world of endless universities in Japan
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <ArrowButton
            title="Create an Account"
            description="Begin Your Journey"
            to="/auth/signup"
            className="max-w-sm"
          />
          <ArrowButton
            title="Log In"
            description="Continue your Journey"
            to="/auth/login"
            className="max-w-sm"
            variant={"secondary"}
          />
        </div>

        {/* Terms and Privacy */}
        <div className="text-left">
          <p className="text-xs text-secondary-foreground leading-relaxed">
            By continuing, you agree to our{" "}
            <Link to="/" className="underline hover:text-foreground">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </CardContent>

      {/* Help Section */}
      <div className="border-t border-gray-100 p-6 text-center">
        <Link
          to="/"
          className="text-sm text-secondary-foreground hover:text-foreground transition-colors"
        >
          Can't Sign in ? Let us help
        </Link>
      </div>
    </Card>
  );
}
