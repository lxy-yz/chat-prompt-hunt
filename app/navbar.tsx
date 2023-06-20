"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive: (p: string) => boolean = (p) => p === pathname;

  const { data: session } = useSession();

  const [navbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <>
      <div className="relative md:hidden">
        {navbarOpen && (
          <XMarkIcon
            onClick={() => setNavbarOpen(false)}
            className="cursor-pointer absolute m-6 w-6 h-6 z-10"
          />
        )}
        {!navbarOpen && (
          <Bars3Icon
            onClick={() => setNavbarOpen(true)}
            className="cursor-pointer absolute m-6 w-6 h-6 z-10" />
        )}
      </div>
      <div className="hidden md:block">
        <div className="px-8 py-4 navbar flex-col md:flex-row bg-base-100">
          <div className="navbar-start flex-1 flex flex-col gap-2 md:flex-row md:gap-4">
            {/* <Link legacyBehavior href="/">
              <a className="btn" data-active={isActive("/")}>
                🛖
              </a>
            </Link> */}
            <Link legacyBehavior href="/">
              <a className="" data-active={isActive("/")}>
                <img alt="🛖" src="/logo.png" className="w-16 h-16" />
              </a>
            </Link>
            <span className="font-bold">ChatGPT Prompt Hub</span>
          </div>
          <div className="navbar-center">

          </div>
          <div className="navbar-end flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link legacyBehavior href="/discover">
                  <a className="" data-active={isActive("/discover")}>
                    🔮 Discover
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/submit-chat">
                  <a className="" data-active={isActive("/submit-chat")}>
                    📝 Submit
                  </a>
                </Link>
              </li>
              {session && (
                <li>
                  <Link legacyBehavior href="/save">
                    <a className="" data-active={isActive("/save")}>
                      <span className="text-red-500">♥️</span>
                      Saved
                    </a>
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <details>
                    <summary className="max-w-[150px] truncate">
                      📧 {session?.user.email}
                    </summary>
                    <ul className="w-full p-2 bg-base-100">
                      {/* 
                        <li>
                          <Link legacyBehavior href="/profile">
                            <a className="" data-active={isActive("/save")}>
                              🦄 Profile
                            </a>
                          </Link>
                        </li> 
                      */}
                      <li>
                        <Link legacyBehavior href=''>
                          <a onClick={() => signOut()} data-active={isActive("/save")}>
                            🚪
                            Logout
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {
        navbarOpen && (
          <div className="py-6 font-semibold flex flex-col items-center gap-4 md:hidden">
            <Link legacyBehavior href="/">
              <a className="" data-active={isActive("/")}>
                <div className="w-16 h-16 bg-[url('/logo.png')] bg-cover" />
              </a>
            </Link>
            <Link legacyBehavior href="/discover">
              <a className="" data-active={isActive("/discover")}>
                🪐
                <span className="inline-block ml-2">Discover</span>
              </a>
            </Link>
            <Link legacyBehavior href="/submit-chat">
              <a className="" data-active={isActive("/submit-chat")}>
                📝
                <span className="inline-block ml-2">Submit</span>
              </a>
            </Link>
            {session && (
              <Link legacyBehavior href=''>
                <a onClick={() => signOut()} data-active={isActive("/save")}>
                  🚪
                  Logout
                </a>
              </Link>
            )}
          </div>
        )
      }
    </>

  )
};

export default Navbar;
