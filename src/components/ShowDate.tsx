import React from "react";
import { contentString } from "../contentString.js";
import dayjs from "dayjs";

interface IShowDate {
  date: string;
  isSimple?: boolean;
}

const ShowDate: React.FC<IShowDate> = ({ date, isSimple = false }) => {
  const premieredDate = dayjs(date);

  return (
    <div className="callout">
      {premieredDate ? (
        <>
          {!isSimple ? `${contentString.showPremiered} ` : null}
          <time dateTime={premieredDate?.format()}>
            {dayjs(premieredDate).format("D MMM YYYY")} {!isSimple ? `(${dayjs().to(premieredDate)})` : null}
          </time>
        </>
      ) : (
        contentString.showUpcoming
      )}
    </div>
  );
};

export default ShowDate;
