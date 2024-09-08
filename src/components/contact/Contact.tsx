"use client";
import React from "react";
import style from "./style.module.css";
import { Fb, Inst, X, Phone, EmailIcon } from "@/common/svg/contact";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FaViber } from "react-icons/fa";

type Inputs = {
  username: string;
  email: string;
  message: string;
};

const Contact = () => {
  const socLinks = [
    { href: "https://www.facebook.com/ScorePredicts", icon: <Fb /> },
    { href: "https://x.com/score_ge", icon: <X /> },
    { href: "https://www.instagram.com/score.ge_/", icon: <Inst /> },
    {
      href:
        "https://invite.viber.com/?g2=AQAIJfiGfhP%2B2FNndDYEDbFffHEBtkz2De4eshG0GKiW%2B%2FcbNzQzoSmQ33LknW6%2F&lang=en",
      icon: <FaViber fill="#fff" fontSize={14} />,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const sendMessageMutation = useMutation(
    (data: Inputs) => axios.post(`/api/contact`, { ...data }),
    {
      onSuccess: (data: any) => {
        reset();
        return data;
      },
      onError: (error: any) => {
        console.error("Registration error:", error);
        return error;
      },
    }
  );

  const { error, data, isLoading, isError, isSuccess } = sendMessageMutation;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendMessageMutation.mutate(data);
  };

  return (
    <section className={`${style.contact}  bg-white p-5`}>
      <div className={` ${style.contactContainer} flex flex-col `}>
        <div className={`${style.topHalf} flex items-center flex-col pt-14`}>
          <div className="flex items-center justify-center mb-7 flex-col">
            <h2 className="font-semibold text-3xl mb-5 ">Contact Us</h2>
            <p className={style.paragraph}>
              Do you have questions? We are ready to share our experience with
              you. Write to us, follow us.
            </p>
          </div>
          <div className="flex gap-x-3 mb-7">
            {socLinks.map((el, id) => (
              <Link
                href={el.href}
                target="_blank"
                key={id}
                className="flex justify-center items-center"
                style={{
                  width: "33px",
                  backgroundColor: "#034960",
                  borderRadius: "15px",
                }}
              >
                {el.icon}
              </Link>
            ))}
          </div>
          <article className={`flex gap-x-7 ${style.contactInfo}`}>
            <div className="flex gap-x-3  items-center">
              <Phone />
              <a href="tel:+995595537393" className="font-semibold text-xs">
                +995 595 53 73 93
              </a>
            </div>
            <div className="flex  gap-x-3  items-center">
              <EmailIcon />
              <a href="mailto:info@blitz.ge" className="font-semibold text-xs">
                info@blitz.ge
              </a>
            </div>
          </article>
        </div>
        <div className={`${style.bottomHalf}  pt-14 pb-16`}>
          <h2 className="mb-6 text-center">
            <span>Send a</span> Message
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.contactForm}`}
          >
            <article className={`${style.mailInputs}`}>
              <div className={`${style.nameInput}`}>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "გრაფა ცარიელია",
                    },
                    minLength: {
                      value: 3,
                      message: "მინიმუმ 3 ასო",
                    },
                  })}
                />
                {errors.username && (
                  <p className={style.error}>{errors.username.message}</p>
                )}
              </div>
              <div className={`${style.mailInput}`}>
                <input
                  type="text"
                  placeholder="E-mail"
                  id="email"
                  {...register("email", {
                    // onChange: () => setError(""),
                    required: {
                      value: true,
                      message: "გრაფა ცარიელია",
                    },
                    minLength: {
                      value: 3,
                      message: "მინიმუმ 3 ასო",
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "არასწორი ელ.ფოსტის ფორმატი",
                    },
                  })}
                />
                {errors.email && (
                  <p className={style.error}>{errors.email.message}</p>
                )}
              </div>
            </article>
            <textarea
              {...register("message", {
                required: {
                  value: true,
                  message: "გრაფა ცარიელია",
                },
                minLength: {
                  value: 5,
                  message: "მინიმუმ 5 ასო",
                },
              })}
              placeholder="Message.."
              className={`${style.textAreaInput}`}
              required
              rows={6}
            />
            <button type="submit" className={`${style.submitBtn}`}>
              {isLoading ? (
                <Spin
                  indicator={<LoadingOutlined spin />}
                  size="large"
                  style={{ color: "#fff" }}
                />
              ) : (
                "Send"
              )}
            </button>
          </form>
          {isSuccess && (
            <div className="mt-3">
              <p style={{ color: "var(--black-color" }}>
                Email sent successfully
              </p>
            </div>
          )}
          {isError && (
            <div className="mt-3">
              <p style={{ color: "var(--black-color" }}>
                Something went wrong, try again
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
