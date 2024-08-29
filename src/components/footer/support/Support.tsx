"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const supportImages = [
  {
    src: "/images/footer/support5.svg",
    alt: "support-2",
    width: 90,
    height: 22,
    displayStyle: "var(--showLight-element)",
    href: "https://www.score.ge/",
  },

  {
    src: "/images/footer/sp2.svg",
    alt: "support-1",
    width: 80,
    height: 22,
    displayStyle: "var(--showDark-element)",
    href: "https://www.score.ge/",
  },

  {
    src: "/images/footer/support2.svg",
    alt: "support-1",
    width: 80,
    height: 22,
    displayStyle: "var(--showLight-element)",
    href: "https://inews.ge/",
  },

  {
    src: "/images/footer/sp1.svg",
    alt: "support-2",
    width: 90,
    height: 22,
    displayStyle: "var(--showDark-element)",
    href: "https://inews.ge/",
  },

  {
    src: "/images/footer/support3.svg",
    alt: "support-3",
    width: 90,
    height: 22,
    displayStyle: "var(--showLight-element)",
    href: "https://isport.ge/",
  },
  {
    src: "/images/footer/sp3.svg",
    alt: "support-3",
    width: 90,
    height: 22,
    displayStyle: "var(--showDark-element)",
    href: "https://isport.ge/",
  },
  {
    src: "/images/footer/support4.svg",
    alt: "support-4",
    width: 145,
    height: 13,
    displayStyle: "var(--showLight-element)",
    href: "https://footballnews.ge/",
  },
  {
    src: "/images/footer/sp4.svg",
    alt: "support-4",
    width: 145,
    height: 13,
    displayStyle: "var(--showDark-element)",
    href: "https://footballnews.ge/",
  },
];

const Support = () => {
  const [showAllSSupport, setShowAllSupport] = useState<boolean>(false);
  return (
    <section
      className={`${style.support} w-full flex  items-center mt-7 container ${
        showAllSSupport ? style.showAllItems : ""
      }`}
    >
      <div className={`${style.logoImgContainer} `}>
        <div>
          <Image
            src={"/images/footer/blitz.svg"}
            alt={"logo"}
            width={95}
            height={30}
            key={"blitzIcon"}
            className={`${style.blitzLogo} mobileNone`}
          />
          <Image
            src={"/images/footer/blitzMobile.svg"}
            alt={"logo"}
            width={100}
            height={40}
            key={"blitzIconMobile"}
            className={`${style.blitzLogoMobile} desktopNo`}
          />
        </div>
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`desktopNo ${
            showAllSSupport ? style.transformArrow : style.arrow
          }`}
          onClick={() => setShowAllSupport(!showAllSSupport)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.329505 5.64853C0.768844 6.11716 1.48115 6.11716 1.9205 5.64853L4.5 2.89705L7.0795 5.64853C7.51885 6.11716 8.23115 6.11716 8.6705 5.64853C9.10983 5.1799 9.10983 4.4201 8.6705 3.95147L5.2955 0.351468C4.85615 -0.117156 4.14385 -0.117156 3.7045 0.351468L0.329505 3.95147C-0.109835 4.4201 -0.109835 5.1799 0.329505 5.64853Z"
            fill="var(--footer-copyright-color)"
          />
        </svg>
      </div>

      {supportImages.map((el, id) => (
        <Link
          href={el.href}
          key={id}
          className={style.supportLinks}
          style={{ display: el.displayStyle }}
          target="_blank"
        >
          <Image
            src={el.src}
            alt={el.alt}
            width={el.width}
            height={el.height}
          />
        </Link>
      ))}
    </section>
  );
};

export default Support;
