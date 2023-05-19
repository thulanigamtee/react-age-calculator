import { useState } from "react";
import iconArrow from "./assets/images/icon-arrow.svg";
import "./App.scss";

interface Age {
  years: number;
  months: number;
  days: number;
}

function App() {
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");
  const [age, setAge] = useState<Age | null>(null);

  const isEmptyField = (field: string): void => {
    const Input = document.querySelectorAll(`#${field}`);
    Input.forEach((input) => {
      input.classList.add("isInvalid");
      setTimeout(() => {
        input.classList.remove("isInvalid");
      }, 2000);
    });
  };

  const isValidDate = (
    year: number | "",
    month: number | "",
    day: number | ""
  ): boolean => {
    day ? null : isEmptyField("day");
    month ? null : isEmptyField("month");
    year ? null : isEmptyField("year");

    const date: Date = new Date(Number(year), Number(month) - 1, Number(day));
    const isValid: boolean =
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day);

    return isValid;
  };

  const calculateAge = (): void => {
    if (!isValidDate(year, month, day)) {
      const validDate = document.querySelector("#validDate") as
        | HTMLDivElement
        | HTMLSpanElement;
      if (validDate && day != "" && month != "" && year != "") {
        validDate.style.display = "block";
        setTimeout(() => {
          validDate.style.display = "none";
        }, 2000);
      }
      return;
    }

    const currentDate: Date = new Date();
    const selectedDate: Date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    if (selectedDate > currentDate) {
      const isPast = document.querySelector("#isPast") as
        | HTMLDivElement
        | HTMLSpanElement;
      if (isPast) {
        isPast.style.display = "block";
        setTimeout(() => {
          isPast.style.display = "none";
        }, 2000);
      }
      return;
    }

    let years: number = currentDate.getFullYear() - selectedDate.getFullYear();
    let months: number = currentDate.getMonth() - selectedDate.getMonth();
    let days: number = currentDate.getDate() - selectedDate.getDate();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      const prevMonthLastDay: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      days += prevMonthLastDay;
    }

    setAge({
      years: years,
      months: months,
      days: days,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.id;
    if (value === "day") {
      setDay(parseInt(e.target.value));
    }
    if (value === "month") {
      setMonth(parseInt(e.target.value));
    }
    if (value === "year") {
      setYear(parseInt(e.target.value));
    }
  };

  return (
    <main>
      <form>
        <div>
          <label htmlFor="day" id="day">
            Day
          </label>
          <br />
          <input
            type="number"
            id="day"
            min="1"
            max="31"
            value={day}
            placeholder="DD"
            onChange={handleChange}
            pattern="[0-9]*"
          />
          <span id="day">This field is required</span>
          <span id="validDate">Must be a valid date</span>
        </div>
        <div>
          <label htmlFor="month" id="month">
            Month
          </label>
          <br />
          <input
            type="number"
            id="month"
            min="1"
            max="12"
            value={month}
            placeholder="MM"
            onChange={handleChange}
            pattern="[0-9]*"
          />
          <span id="month" className="errMonth">
            This field is required
          </span>
        </div>
        <div>
          <label htmlFor="year" id="year">
            Year
          </label>
          <br />
          <input
            type="number"
            id="year"
            min="1900"
            max={new Date().getFullYear()}
            value={year}
            placeholder="YYYY"
            onChange={handleChange}
            pattern="[0-9]*"
          />
          <span id="year">This field is required</span>
          <span id="isPast">Must be in the past</span>
        </div>
      </form>
      <button onClick={calculateAge}>
        <img src={iconArrow} alt="icon-arrow" />
      </button>
      <div>
        <p>
          {age ? <span>{age.years}</span> : <span>--</span>}
          <span>years</span>
        </p>
        <p>
          {age ? <span>{age.months}</span> : <span>--</span>}
          <span>months</span>
        </p>
        <p>
          {age ? <span>{age.days}</span> : <span>--</span>}
          <span>days</span>
        </p>
      </div>
    </main>
  );
}

export default App;
