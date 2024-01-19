import Link from "next/link";

export const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <nav className="flex w-full flex-row items-center justify-between p-7">
      <Link href="/">
        <h2 className="text-3xl font-bold">App Name</h2>
      </Link>

      <div className="flex flex-row items-center gap-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/profile">My Profile</Link>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/auth/login">Login/Signup</Link>
        )}
      </div>
    </nav>
  );
};
