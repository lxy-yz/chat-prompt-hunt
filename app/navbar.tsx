"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useDarkMode } from "usehooks-ts";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive: (p: string) => boolean = (p) => p === pathname;

  const { data: session } = useSession();

  const { toggle } = useDarkMode();

  return (
    <div className="px-8 py-4 navbar flex-col md:flex-row bg-base-100">
      <div className="navbar-start flex-1 flex flex-col gap-3 md:flex-row md:gap-4">
        <Link legacyBehavior href="/">
          <a className="btn" data-active={isActive("/")}>
            🛖
          </a>
        </Link>
        <Link legacyBehavior href="/discover">
          <a className="" data-active={isActive("/discover")}>
            🪐 Discover
          </a>
        </Link>
      </div>
      {/* <div className="navbar-center">
        <button className="btn text-lg" onClick={() => toggle()}>
          💡
        </button>
      </div> */}
      <div className="navbar-end flex-none">
        <ul className="mx-auto md:mx-0 menu menu-horizontal px-1">
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
                <a className="hidden md:inline" data-active={isActive("/save")}>
                  <span className="text-red-500">♥️</span>
                  Saved
                </a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <details>
                <summary>
                  📧 {session?.user.email}
                </summary>
                <ul className="w-full p-2 bg-base-100">
                  {/* <li>
                    <Link legacyBehavior href="/profile">
                      <a className="" data-active={isActive("/save")}>
                        🦄 Profile
                      </a>
                    </Link>
                  </li> */}
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
  )
};

export default Navbar;
