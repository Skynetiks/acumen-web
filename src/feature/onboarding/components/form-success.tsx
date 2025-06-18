import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function FormSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 text-center w-full">
      <div className="relative">
        <div className="flex items-center justify-center w-20 h-20 rounded-full">
          <img src="/assets/Emoji.svg" alt="Sparkles" width={80} height={80} />
        </div>
        <div className="absolute -top-4 -left-8">
          <img src="/assets/Emoji.svg" alt="Sparkles" width={30} height={30} />
        </div>
        <div className="absolute -top-2 -right-2">
          <img src="/assets/Emoji.svg" alt="Sparkles" width={20} height={20} />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-primary">
          Thank You! An Expert will connect with you shortly!
        </h1>
        <p className="text-gray-600 text-sm">Let's fly into education world</p>
      </div>

      <Button className={"px-8 py-3"} asChild>
        <Link to="/college-finder">Continue</Link>
      </Button>
    </div>
  );
}
