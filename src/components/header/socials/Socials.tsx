"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { Tooltip } from "antd";
import { socialArray } from "@/lib/socials";

const Socials = ({ isNavFixed }: { isNavFixed: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };
  return (
    <section className={`flex items-center justify-center gap-x-5`}>
      <div
        className={`flex justify-between items-center gap-x-4 desktopYes ${style.socialItems}`}
      >
        {socialArray.map((el, id) => {
          return (
            <Link
              href={el.href}
              key={id}
              target={`${el.component === "4" ? "_self" : "_blank"}`}
            >
              <span
                style={{
                  background: `url(/images/socials/soc-${el.component}.svg) top no-repeat`,
                  width: el.w,
                }}
              ></span>
            </Link>
          );
        })}
      </div>
      <div className={`${style.blitz} transition-3 `}>
        <div
          onClick={showModal}
          className={`${style.blitzImgP}  `}
          style={{ padding: isNavFixed ? "7px 12px" : "" }}
        >
          <Tooltip title="projects">
            <Image
              src="/images/header/blitz.svg"
              alt="blitz"
              width={60}
              height={20}
              className="mobileNone "
            />
          </Tooltip>
          <Tooltip title="projects">
            <Image
              src="/images/header/blizMob.svg"
              alt="blitz"
              width={14}
              height={14}
              className={`desktopNo ${style.blitzMobileImg}`}
            />
          </Tooltip>
        </div>

        <section
          className={`${style.wrapper} ${
            isModalOpen ? style.openedWrapper : ""
          }`}
          onClick={handleWrapperClick}
        >
          <div className={style.modalContainer}>
            <article className={style.modal}>
              <div className={style.closeBtn} onClick={handleCancel}>
                <IoCloseSharp style={{ fill: "var(--black-color)" }} />
              </div>
              <div
                className={`flex justify-center items-center py-6 ${style.blitzHover}`}
              >
                <Link href="#">
                  <div>
                    <Image
                      src={"/images/header/blitz/BLITZ.svg"}
                      alt="blitz"
                      width={87}
                      height={27}
                    />
                  </div>
                </Link>
              </div>
              <article className={`${style.supportItems} flex`}>
                <div className={`${style.itemOne} flex`}>
                  <div className={`flex justify-center items-center  `}>
                    <Link
                      href="/"
                      target="_blank"
                      className="w-full h-full flex justify-center items-center relative "
                    >
                      <Image
                        src={"/images/header/blitz/soccer.svg"}
                        alt="soccer"
                        width={90}
                        height={20}
                        className={style.lightThemeImage}
                      />
                      <Image
                        src={"/images/header/blitz/soccer1.svg"}
                        alt="soccer"
                        width={90}
                        height={20}
                        className={style.darkThemeImage}
                      />
                    </Link>
                  </div>
                  <div className="flex justify-center items-center ">
                    <Link
                      href="https://footballnews.ge/"
                      target="_blank"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image
                        src={"/images/header/blitz/FOTBALLNEWS.svg"}
                        alt="football"
                        width={145}
                        height={12}
                        className={style.lightThemeImage}
                      />
                      <Image
                        src={"/images/header/blitz/FOTBALLNEWS1.svg"}
                        alt="football"
                        width={145}
                        height={12}
                        className={style.darkThemeImage}
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className={` justify-center items-center  ${style.itemTwo}`}
                >
                  <div className="flex justify-center items-center ">
                    <Link
                      href="https://isport.ge/"
                      target="_blank"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image
                        src={"/images/header/blitz/ISPORT.svg"}
                        alt="isport"
                        width={90}
                        height={22}
                        className={style.lightThemeImage}
                      />
                      <Image
                        src={"/images/header/blitz/ISPORT2.svg"}
                        alt="isport"
                        width={90}
                        height={22}
                        className={style.darkThemeImage}
                      />
                    </Link>
                  </div>
                  <div className={`flex justify-center items-center  `}>
                    <Link
                      href="https://inews.ge/"
                      target="_blank"
                      className="w-full h-full flex justify-center items-center relative"
                    >
                      <Image
                        src={"/images/header/blitz/INEWS.svg"}
                        alt="inews"
                        width={80}
                        height={23}
                        className={style.lightThemeImage}
                      />
                      <Image
                        src={"/images/header/blitz/INEWS2.svg"}
                        alt="inews"
                        width={80}
                        height={23}
                        className={style.darkThemeImage}
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Socials;
