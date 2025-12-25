import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="border-[#dad9d6] dark:border-neutral-700 mx-auto max-w-7xl px-4 xl:border-r xl:border-l xl:px-16 pt-8 sm:pt-20">
        <div className="grid grid-cols-12 gap-4 lg:gap-6 xl:gap-x-10 mt-8 sm:mt-20">
          <div className="relative col-span-12 grid grid-cols-subgrid">
            <div className="dummy-marker absolute -left-3.5 -translate-x-px md:top-1 lg:top-3 xl:-left-16">
              <div className="bg-red-500 h-12 w-0.75 translate-y-0"></div>
            </div>

            <h2 className="col-span-12 mb-8 text-[40px] leading-12 tracking-tight md:text-5xl md:leading-tight lg:text-6xl">
              Forge Your Next Startup,
              <span className="text-red-500 block">Launch with one click.</span>
            </h2>

            <p className="col-span-12 col-start-1 mb-12 text-lg leading-normal md:col-span-10 md:text-lg lg:col-span-6">
              Ornn is a high-performance Next.js starter kit designed for indie
              hackers and developers who want to forge scalable SaaS products
              fast.
            </p>

            <div className="col-span-12 col-start-1 mb-8 space-x-5">
              <a
                href="/"
                className="bg-neutral-900 shadow-primary-button hover:shadow-primary-button-hover inline-block rounded-xs border border-transparent px-4 py-2 font-medium whitespace-nowrap text-white transition duration-100 hover:bg-black dark:hover:bg-neutral-800"
              >
                Deploy to Vercel
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto w-full max-w-full px-4 pt-10 md:pt-24 xl:max-w-7xl xl:px-16">
          <p className="text-right">A project by Nguyen Gia Hao</p>
        </div>
      </footer>
    </>
  );
}
