import React from "react";
import style from "./style.module.css";
import Link from "next/link";

interface menuItem {
  title: string;
  href: string;
}

const FooterMenu = ({
  title,
  menuItems,
}: {
  title: string;
  menuItems: menuItem[];
}) => {
  return (
    <section className={`${style.footermenu} `}>
      <div className={`${style.footerMenuTitle} flex items-center w-full`}>
        <h3 className="w-full flex items-center">
          <span className={style.ball}></span> {title}
        </h3>
      </div>
      <ul className={`${style.menuList} `}>
        {menuItems.map((el, id) => (
          <li className={`${style.listItem} `} key={id}>
            <Link href={el.href} target="_blank">
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FooterMenu;
