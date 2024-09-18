import React from "react";
import style from "./style.module.css";

const Copyright = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className={`${style.copyright}  `}>
      <article className="container flex justify-between items-center">
        <h4>Copyright @ 2024</h4>
        <div className="flex items-center gap-x-2">
          {/* {children} */}
          <div className="topGeCounter">
            <div id="top-ge-counter-container" data-site-id="117564"></div>
            <script async src="//counter.top.ge/counter.js"></script>
          </div>

          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.42857 16C3.42857 9.05699 9.05699 3.42857 16 3.42857C17.4099 3.42857 18.7623 3.66001 20.0232 4.08562C20.0796 4.10467 20.1359 4.1241 20.1919 4.14392C21.0845 4.45953 22.1163 4.14263 22.5511 3.30159C22.9859 2.46054 22.659 1.41677 21.7761 1.07488C21.5596 0.991013 21.3407 0.911717 21.1197 0.837111C19.51 0.293805 17.7876 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 15.0368 31.9147 14.0923 31.751 13.1742C31.5847 12.2421 30.6231 11.7212 29.7143 11.9867C28.8055 12.2522 28.2965 13.2042 28.4351 14.1408C28.5249 14.7468 28.5714 15.3676 28.5714 16C28.5714 22.943 22.943 28.5714 16 28.5714C9.05699 28.5714 3.42857 22.943 3.42857 16ZM27.9948 9.71429C27.9948 10.3455 27.4831 10.8571 26.852 10.8571C26.2208 10.8571 25.7091 10.3455 25.7091 9.71429V8.58179L24.5662 8.5766C23.9351 8.57373 23.4257 8.05974 23.4286 7.42856C23.4315 6.79738 23.9454 6.28804 24.5766 6.29091L25.7091 6.29605V5.14286C25.7091 4.51167 26.2208 4 26.852 4C27.4831 4 27.9948 4.51167 27.9948 5.14286V6.30644L29.148 6.31168C29.7792 6.31455 30.2885 6.82854 30.2857 7.45972C30.2828 8.09089 29.7688 8.60024 29.1376 8.59737L27.9948 8.59218V9.71429ZM22.8408 15.4775C23.0824 15.1038 23.2031 14.6755 23.2031 14.1924C23.2031 13.3356 22.9183 12.6589 22.3486 12.1621C21.7835 11.6608 21.0179 11.4102 20.0518 11.4102C19.0811 11.4102 18.3132 11.6631 17.748 12.1689C17.1829 12.6702 16.9004 13.3447 16.9004 14.1924C16.9004 14.6755 17.0189 15.1038 17.2559 15.4775C17.4974 15.8512 17.8301 16.1497 18.2539 16.373C17.7754 16.6009 17.3949 16.9199 17.1123 17.3301C16.8298 17.7402 16.6885 18.221 16.6885 18.7725C16.6885 19.652 16.9915 20.3493 17.5977 20.8643C18.2038 21.3792 19.0241 21.6367 20.0586 21.6367C21.0931 21.6367 21.9111 21.3815 22.5127 20.8711C23.1143 20.3561 23.415 19.6566 23.415 18.7725C23.415 18.221 23.2738 17.7425 22.9912 17.3369C22.7087 16.9268 22.3258 16.6055 21.8428 16.373C22.2666 16.1497 22.5993 15.8512 22.8408 15.4775ZM21.0566 17.5898C21.3073 17.8496 21.4326 18.196 21.4326 18.6289C21.4326 19.071 21.3096 19.4173 21.0635 19.668C20.8219 19.9186 20.487 20.0439 20.0586 20.0439C19.6211 20.0439 19.2793 19.9141 19.0332 19.6543C18.7871 19.3945 18.6641 19.0527 18.6641 18.6289C18.6641 18.1914 18.7894 17.8451 19.04 17.5898C19.2907 17.3301 19.6257 17.2002 20.0449 17.2002C20.4688 17.2002 20.806 17.3301 21.0566 17.5898ZM20.9199 13.3584C21.125 13.5908 21.2275 13.9007 21.2275 14.2881C21.2275 14.6846 21.125 15.0036 20.9199 15.2451C20.7194 15.4867 20.4323 15.6074 20.0586 15.6074C19.6849 15.6074 19.3955 15.4867 19.1904 15.2451C18.9854 15.0036 18.8828 14.6846 18.8828 14.2881C18.8828 13.887 18.9854 13.5726 19.1904 13.3447C19.3955 13.1169 19.6826 13.0029 20.0518 13.0029C20.4255 13.0029 20.7148 13.1214 20.9199 13.3584ZM11.5 21.5H13.4756V11.5332H13.2637L9.1416 13.0098V14.6162L11.5 13.8848V21.5Z"
              fill="var(--footer-copyright-color)"
            />
          </svg>
        </div>
      </article>
    </section>
  );
};

export default Copyright;
