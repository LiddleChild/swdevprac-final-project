import { Dispatch } from "react";
import { HospitalRatingAction } from "./Card";

type RatingItemProps = {
  hospitalName: string;
  rating: number;
  dispatchRating: Dispatch<HospitalRatingAction>;
};

export default function RatingItem({ hospitalName, rating, dispatchRating }: RatingItemProps) {
  const onClickHandler = () => {
    dispatchRating({
      type: "delete",
      hospitalName,
      rating,
    });
  };

  return (
    <button data-testid={hospitalName} onClick={onClickHandler}>
      {hospitalName} Rating: {rating}
    </button>
  );
}
