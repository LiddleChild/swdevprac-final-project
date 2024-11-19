"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { Dispatch, SyntheticEvent } from "react";
import Link from "next/link";

export type DentistRatingAction = {
  type: string;
  dentistName: string;
  rating: number;
};

type CardProps = {
  dentist: DentistItem;
  rating?: number;
  dispatchRating?: Dispatch<DentistRatingAction>;
};

export default function Card({ dentist, rating, dispatchRating }: CardProps) {
  const onRatingChange = (evt: SyntheticEvent, newValue: number | null) => {
    if (!dispatchRating) return;

    dispatchRating({
      type: "add",
      dentistName: dentist.name,
      rating: newValue || 0,
    });
  };

  return (
    <Link href={`/dentist/${dentist.id}`} data-testid="dentist-card">
      <InteractiveCard>
        <div className="flex flex-col items-center w-full rounded-lg overflow-hidden border border-black/25 mb-12">
          <div className="relative flex w-full h-96">
            <Image
              src={dentist.picture}
              alt="dentist"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col justify-between w-full h-auto text-left p-4 items-center">
            <div className="text-black">{dentist.name}</div>
          </div>
        </div>
      </InteractiveCard>
    </Link>
  );
}
