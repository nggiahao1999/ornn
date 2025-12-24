"use client";

import Link from "next/link";
import { Github, Search, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getGitHubStars } from "@/utils/github";

export default function Navbar() {
  const [stars, setStars] = useState<number | null>(null);
  const repo = "nggiahao1999/ornn";

  useEffect(() => {
    getGitHubStars(repo).then(setStars);
  }, []);

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  return (
    <nav className="sticky-nav sticky top-0 z-99 h-16 bg-white py-0 transition-transform duration-300 will-change-transform xl:border-l-neutral-200 border-b! border-neutral-200!">
      <div className="container mx-auto h-full">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between overflow-hidden">
          <li className="mr-6 w-20 transition-transform duration-300 ease-in-out xl:mr-12 flex text-[#F53003] font-bold">
            <a href="/" className="flex aspect-80/23 w-20 items-center">
              ORNN
            </a>
          </li>

          <ul className="mr-auto flex h-full items-center justify-start space-x-4 pl-8 font-medium xl:space-x-8">
            <li className="hidden lg:block">
              <a
                href="/docs"
                className="group flex cursor-pointer items-center gap-2 whitespace-nowrap transition duration-100"
                rel="noopener"
              >
                Docs
              </a>
            </li>
          </ul>

          <div className="hidden items-center space-x-2.5 lg:flex xl:space-x-4">
            <ul className="flex items-center space-x-3 xl:space-x-4">
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 font-medium text-neutral-900 transition duration-100 hover:text-blue-600"
                >
                  <svg
                    className="h-4 w-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 12.305C0 17.74 3.438 22.352 8.207 23.979C8.807 24.092 9.027 23.712 9.027 23.386C9.027 23.094 9.016 22.32 9.01 21.293C5.671 22.037 4.967 19.643 4.967 19.643C4.422 18.223 3.635 17.845 3.635 17.845C2.545 17.081 3.718 17.096 3.718 17.096C4.921 17.183 5.555 18.364 5.555 18.364C6.626 20.244 8.364 19.702 9.048 19.386C9.157 18.591 9.468 18.049 9.81 17.741C7.145 17.431 4.344 16.376 4.344 11.661C4.344 10.318 4.811 9.219 5.579 8.359C5.456 8.048 5.044 6.797 5.696 5.103C5.696 5.103 6.704 4.773 8.996 6.364C9.954 6.091 10.98 5.955 12.001 5.95C13.02 5.955 14.047 6.091 15.005 6.364C17.295 4.772 18.302 5.103 18.302 5.103C18.956 6.797 18.544 8.048 18.421 8.359C19.191 9.219 19.655 10.318 19.655 11.661C19.655 16.387 16.849 17.428 14.175 17.732C14.606 18.112 14.99 18.862 14.99 20.011C14.99 21.656 14.975 22.982 14.975 23.386C14.975 23.715 15.191 24.098 15.8 23.977C20.565 22.347 24 17.738 24 12.305C24 5.508 18.627 0 12 0C5.373 0 0 5.508 0 12.305Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="sr-only">GitHub</span>
                  <span>1K</span>
                </a>
              </li>
              <li>
                <div className="relative flex w-50 items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[16px] font-normal text-neutral-500 hover:bg-neutral-100">
                  <Search className="mr-3 w-3.25" width="14" height="14" />
                  <div className="grow">Search docs</div>
                  <span className="mr-1.5 ml-2 shrink-0 rounded-full bg-neutral-100 px-1.5 py-0 text-sm font-medium shadow-xs">
                    ⌘K
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
