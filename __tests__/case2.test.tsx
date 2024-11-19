import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Banner from "@/components/Banner";
import MyBookingPage from "@/components/MyBookingPage";
import TopMenu from "@/components/TopMenu";

jest.mock("../src/libs/getBooking", () => ({
  __esModule: true,
  default: async () => ({
    bookingDate: "2024-01-01",
    dentist: {
      name: "name",
      hospital: "hospital",
      address: "address",
      tel: "tel",
      picture: "https://drive.google.com/uc?id=1QjsdRHmmchDzyHJM4G3jCdUGLieAI4mK",
    },
  }),
}));

jest.mock("../src/libs/auth/nextAuthConfig", () => ({
  __esModule: true,
  getSession: async () => ({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: "John Doe",
      role: "user",
      token: "token",
    },
  }),
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: "asdfasdf",
      role: "user",
    },
  };

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => {
    return { push: jest.fn((destination: string) => null) };
  }),
}));

describe("auth", () => {
  beforeAll(async () => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "https://swdevprac-final-project-backend.vercel.app";
  });

  it("should display user name from session", () => {
    render(<Banner />);
    expect(screen.getByText("Welcome asdfasdf")).toBeInTheDocument();
  });

  it("should view mybooking", async () => {
    render(await MyBookingPage());
    expect(screen.getByText("My Booking")).toBeInTheDocument();
  });

  it("should not view manage booking", async () => {
    render(<TopMenu />);
    expect(screen.queryByText("Manage Booking")).not.toBeInTheDocument();
  });
});
