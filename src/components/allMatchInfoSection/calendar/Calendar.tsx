"use client";
import React, { useState, useRef } from "react";
import style from "./style.module.css";
import DatePicker from "./DatePicker";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

interface calendarProps {
  activeIndex: any;
  setActiveIndex: any;
}

import { FreeMode } from "swiper/modules";

const Calendar: React.FC<calendarProps> = ({ activeIndex, setActiveIndex }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<any>(today.toDateString());
  const swiperRef = useRef<any>(null);

  const generateDateOptions = () => {
    const options = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const dayOfWeek = daysOfWeek[date.getDay()];

      options.push({
        id: i,
        day,
        dayOfWeek,
        month,
        fullDate: date.toDateString(),
      });
    }

    return options;
  };

  const dateOptions = generateDateOptions();

  const initialIndex = dateOptions.findIndex((date) => date.id === 0);

  const slideToHandler = (id: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(id);
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSlideClick = (index: number) => {
    setActiveIndex(dateOptions[index].id);
    setSelectedDate(dateOptions[index]);
    slideToHandler(index);
  };

  return (
    <section className={`${style.calendar} `}>
      <div className={`${style.calendarOptions} `}>
        <Swiper
          spaceBetween={40}
          slidesPerView={7}
          centeredSlides={true}
          centeredSlidesBounds={true}
          pagination={false}
          freeMode={true}
          initialSlide={initialIndex}
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            50: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            390: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            530: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
            1065: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
          }}
        >
          {dateOptions.map((el: any, index: number) => {
            const { day, dayOfWeek, id } = el;
            const dayWeek = dayOfWeek.toUpperCase();

            return (
              <SwiperSlide key={id} onClick={() => handleSlideClick(index)}>
                <div
                  className={`${
                    style.calendarDate
                  } flex items-center justify-center flex-col ${
                    activeIndex === id ? style.activeDate : ""
                  }`}
                  key={id}
                >
                  <h4 className="font-extrabold text-base text-gey-league">
                    {day}
                  </h4>
                  <span className="text-xs text-gey-league font-semibold">
                    {dayWeek}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <article className={`${style.calendarPicker} `}>
        <DatePicker
          onDateChange={handleDateChange}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          generateDateOptions={generateDateOptions}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          slideToHandler={slideToHandler}
        />
      </article>
    </section>
  );
};

export default Calendar;
