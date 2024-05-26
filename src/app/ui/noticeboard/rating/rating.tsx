"use client";

import { FC, useMemo } from "react";

import { useNotificationContext } from "@/app/providers";
import calcutateAverage from "@/app/lib/calculateAverage";
import { addRatingPoints } from "@/app/lib/actions";
import { NotificationTypes } from "@/app/types/Forms";

import styles from "./rating.module.scss";

interface IRatingProps {
  active: boolean;
  ratingPoints: number[];
  userId: string;
}

const DEFAULT_RATING_SCALE = 5;

const Rating: FC<IRatingProps> = ({ active, ratingPoints, userId }) => {
  const { setNotification } = useNotificationContext();
  const rating = useMemo(() => calcutateAverage(ratingPoints), [ratingPoints]);

  const handleRate = async (points: number) => {
    if (!active) return false;

    const updatedRatingPoints = [...ratingPoints, points];

    console.log(`Add ${points} points.`);

    const status = await addRatingPoints(userId, updatedRatingPoints);

    if (status.success) {
      setNotification({
        text: "Pomyślnie dodano ocenę.",
        type: NotificationTypes.SUCCESS,
      });
    } else if (status.error) {
      setNotification({
        text: "Nie udało się dodać oceny.",
        type: NotificationTypes.ERROR,
      });
    }
  };

  return (
    <div className={styles.root}>
      {Array.from(Array(DEFAULT_RATING_SCALE)).map((x, index) => (
        <i
          key={`${userId}-${index}`}
          className={`${styles.star} lnr lnr-star ${index + 1 <= rating ? styles["star--golden"] : ""} ${active ? styles["star--active"] : ""}`}
          title={`Daj ocenę ${index + 1}.`}
          onClick={() => handleRate(index + 1)}
        />
      ))}
    </div>
  );
};

export default Rating;
