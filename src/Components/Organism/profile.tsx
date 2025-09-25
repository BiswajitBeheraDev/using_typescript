import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/app/Login/page";

// ProfileLogoWithOptions.tsx
// Small profile logo with dropdown menu options (Admin + Login)

export default function ProfileLogoWithOptions() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-lg hover:scale-105 transition-transform"
        aria-label="Open profile options"
      >
        BB
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <button
                onClick={() => {
                  router.push("/admin");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Admin Panel
              </button>
            </li>
            {/* <li> */}
              {/* <button
                onClick={() => {
                  router.push("/user");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                     user       
               </button>
            </li> */}
            <div className="flex justify-center">
            <LoginButton/>

            </div>
          </ul>
        </div>
      )}
    </div>
  );
}