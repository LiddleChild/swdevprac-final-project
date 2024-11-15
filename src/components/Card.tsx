"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { Dispatch, SyntheticEvent } from "react";
import Link from "next/link";

export type HospitalRatingAction = {
  type: string;
  hospitalName: string;
  rating: number;
};

type CardProps = {
  hospital: HospitalItem;
  rating?: number;
  dispatchRating?: Dispatch<HospitalRatingAction>;
};

export default function Card({ hospital, rating, dispatchRating }: CardProps) {
  const onRatingChange = (evt: SyntheticEvent, newValue: number | null) => {
    if (!dispatchRating) return;

    dispatchRating({
      type: "add",
      hospitalName: hospital.name,
      rating: newValue || 0,
    });
  };

  return (
    <Link href={`/hospital/${hospital.id}`}>
      <InteractiveCard>
        <div className="flex flex-col items-center w-[256px] rounded-lg overflow-hidden border border-black/25">
          <div className="relative flex w-full h-[256px]">
            <Image src={hospital.picture} alt="hospital" fill style={{ objectFit: "cover" }} />
          </div>
          <div className="flex flex-col justify-between w-full h-[128px] text-left p-4">
            <div className="text-black">{hospital.name}</div>
            {rating && (
              <Rating
                id={`${hospital.name} Rating`}
                name={`${hospital.name} Rating`}
                data-testid={`${hospital.name} Rating`}
                value={rating}
                readOnly={!dispatchRating}
                onChange={onRatingChange}
                onClick={(evt: SyntheticEvent) => evt.stopPropagation()}
              />
            )}
          </div>
        </div>
      </InteractiveCard>
    </Link>
  );
}
