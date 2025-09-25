
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex space-x-4">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link  href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>

          <div className="mt-4 text-center">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </div>

          <div className="mt-4">
            <Button variant="outline" className="w-auto">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
