import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen">
      <div className="flex mb-10">
        <Image
          src={"/images/header/logo.svg"}
          alt="logo"
          width={165}
          height={35}
        />
        <h2 className="text-5xl" style={{ color: "var(--contact-color)" }}>
          .ge
        </h2>
      </div>

      <p
        style={{ color: "var(--contact-color)" }}
        className="mb-7  max-w-80 text-center text-sm"
      >
        <strong>Error:</strong> The requested page can&apos;t be displayed.
        Please try again later.
      </p>
      <Link href="/" className="notFound-btn">
        Score.ge
      </Link>
    </div>
  );
}
