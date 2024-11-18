"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import createDentist from "@/libs/createDentist";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    hospital: "",
    address: "",
    expertist: "",
    tel: "",
    picture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!session) {
      setError("You must be logged in to create a dentist.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await createDentist(
        session,
        formData.name,
        formData.hospital,
        formData.address,
        formData.expertist,
        formData.tel,
        formData.picture
      );
      setSuccess("Dentist created successfully!");
      setFormData({
        name: "",
        hospital: "",
        address: "",
        expertist: "",
        tel: "",
        picture: "",
      });
      router.push("/dentist");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the dentist.");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8 bg-[#8ED3B1] h-screen">
      <div className="flex flex-row justify-between mt-8 items-center mx-4">
        <div className="font-bold text-6xl">New Dentist</div>
      </div>
      <hr className="border-t border-black" />
      <div className="flex flex-col gap-4 bg-white max-w-full mx-20 mt-4 rounded-lg items-center">
        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Name</div>
          <div className="w-6 text-center">:</div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Hospital</div>
          <div className="w-6 text-center">:</div>
          <input
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Address</div>
          <div className="w-6 text-center">:</div>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Expertist</div>
          <div className="w-6 text-center">:</div>
          <input
            name="expertist"
            value={formData.expertist}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-4">
          <div className="w-20 text-right">Tel</div>
          <div className="w-6 text-center">:</div>
          <input
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div className="flex flex-row gap-2 items-center my-4">
          <div className="w-20 text-right">Picture</div>
          <div className="w-6 text-center">:</div>
          <input
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="border border-black rounded-lg flex-1 p-2"
          />
        </div>

        <div
          className="px-4 py-2 bg-[#15B69B] rounded-lg text-xl hover:bg-[#009078] mb-8"
          onClick={handleSubmit}
        >
          <button>Create Dentist</button>
        </div>

        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </div>
    </div>
  );
}
