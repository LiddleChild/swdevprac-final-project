"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LinearProgress } from "@mui/material";
import editDentist from "@/libs/editDentist";
import getDentist from "@/libs/getDentist";
import { useSession } from "next-auth/react";

interface DentistJson {
  success: boolean;
  data: DentistItem;
}

export default function EditDentist({ params }: { params: { did: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dentist, setDentist] = useState<DentistItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dentistId = params?.did;

  useEffect(() => {
    const fetchDentist = async () => {
      if (!dentistId) {
        setError("Dentist ID is undefined.");
        setLoading(false);
        return;
      }

      try {
        const data: DentistJson = await getDentist(dentistId);
        if (data.success) {
          setDentist(data.data);
        } else {
          setError("Failed to load dentist data.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching dentist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDentist();
  }, [dentistId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (dentist) {
      setDentist({ ...dentist, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || session.user.role !== "admin") {
      alert("Unauthorized: Only admins can edit dentist information.");
      return;
    }

    setLoading(true);

    try {
      if (!dentist || !dentistId) {
        throw new Error("Invalid data.");
      }

      await editDentist(
        session,
        dentistId,
        dentist.name,
        dentist.hospital,
        dentist.address,
        dentist.expertist,
        dentist.tel,
        dentist.picture
      );

      router.push("/dentist");
    } catch (err) {
      console.error(err);
      setError("Error updating dentist.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LinearProgress className="text-ci-green" color="inherit" />;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (!dentist) return <div>No dentist found.</div>;

  if (!session || session.user.role !== "admin") {
    return <div>Unauthorized: Only admins can edit dentist information.</div>;
  }

  return (
    <div className="p-8 flex flex-col gap-8 h-screen">
      <div className="flex flex-row justify-between mt-8 items-center mx-4">
        <div className="font-bold text-6xl">Edit Dentist Information</div>
      </div>
      <hr className="border-t border-black" />
      <div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white max-w-full mx-20 mt-4 rounded-lg items-center"
        >
          {["name", "hospital", "address", "expertist", "tel", "picture"].map(
            (field) => (
              <div
                className="flex flex-row gap-2 items-center mt-4"
                key={field}
              >
                <div className="w-20 text-right capitalize">{field}</div>
                <div className="w-6 text-center">:</div>
                <input
                  name={field}
                  value={(dentist as any)[field]} // Dynamically access field
                  onChange={handleChange}
                  className="border border-black rounded-lg flex-1 p-2"
                  required
                />
              </div>
            )
          )}
          <div className="px-4 py-2 mt-4 bg-[#15B69B] rounded-lg text-xl hover:bg-[#009078] mb-8">
            <button type="submit">Edit Dentist</button>
          </div>
        </form>
      </div>
    </div>
  );
}
