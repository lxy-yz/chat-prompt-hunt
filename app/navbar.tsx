"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isActive: (p: string) => boolean = (p) => p === pathname;

  const { data: session } = useSession();

  const left = (
    <div className="left">
      <Link legacyBehavior href="/discover">
        <a className="bold" data-active={isActive("/discover")}>
          🌐 Discover
        </a>
      </Link>
      {session && (
        <Link legacyBehavior href="/save">
          <a className="bold" data-active={isActive("/save")}>
            ♥️ Saved
          </a>
        </Link>
      )}
      {session && (
        <Link legacyBehavior href="/drafts">
          <a data-active={isActive("/drafts")}>
            My drafts
          </a>
        </Link>
      )}
      <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
    </div >
  );
  const right = (
    <div className="right">
      <Link legacyBehavior href="/submit-chat">
        <button>
          <a>Submit</a>
        </button>
      </Link>
      <p>
        {session?.user.name} ({session?.user.email})
      </p>
      {session && (
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      )}
      <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
    </div>
  );

  // return (
  //   <nav>
  //     {left}
  //     {right}
  //     <style jsx>{`
  //       nav {
  //         display: flex;
  //         padding: 2rem;
  //         align-items: center;
  //       }
  //     `}</style>
  //   </nav>
  // );

  return (
    <div className="p-8 navbar bg-base-100">
      <div className="flex-1 flex gap-2">
        <Link legacyBehavior href="/">
          <a className="btn" data-active={isActive("/")}>
            🛖 Home
          </a>
        </Link>
        <Link legacyBehavior href="/discover">
          <a className="btn" data-active={isActive("/discover")}>
            🌐 Discover
          </a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
                <summary>
                  📧 {session?.user.email}
                </summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link legacyBehavior href="/profile">
                      <a className="" data-active={isActive("/save")}>
                        🦄 Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/api/auth/signout">
                      <a className="" data-active={isActive("/save")}>
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
