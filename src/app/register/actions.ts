"use server";

import userRegister, { UserRegistrationInfo } from "@/libs/userRegister";

export type RegistrationFormState = {
  success?: boolean;
  error?: string;
};

export async function registerAction(
  prevState: RegistrationFormState,
  formData: FormData
): Promise<RegistrationFormState> {
  const userInfo: UserRegistrationInfo = {
    name: formData.get("name")?.toString(),
    tel: formData.get("telephone")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  try {
    await userRegister(userInfo);
    return { success: true };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
