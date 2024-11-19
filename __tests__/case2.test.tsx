import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Banner from "@/components/Banner";
import MyBookingPage from "@/components/MyBookingPage";
import TopMenu from "@/components/TopMenu";
import { useSession } from "next-auth/react";

jest.mock("../src/libs/getBooking", () => ({
  __esModule: true,
  default: async () => ({
    bookingDate: "2024-01-01",
    dentist: {
      name: "name",
      hospital: "hospital",
      address: "address",
      tel: "tel",
      picture: "/mock-image.png",
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
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(),
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
    useSession.mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: "asdfasdf",
          role: "user",
        },
      },
      status: "authenticated",
    });

    render(<Banner />);
    expect(screen.getByText("Welcome asdfasdf")).toBeInTheDocument();
  });

  it("should view mybooking", async () => {
    render(await MyBookingPage());
    expect(screen.getByText("My Booking")).toBeInTheDocument();
  });

  it("should not view manage booking with role user", async () => {
    useSession.mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: "asdfasdf",
          role: "user",
        },
      },
      status: "authenticated",
    });

    render(<TopMenu />);
    expect(screen.queryByText("Manage Booking")).not.toBeInTheDocument();
  });

  it("should view manage booking with role admin", async () => {
    useSession.mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: "asdfasdf",
          role: "admin",
        },
      },
      status: "authenticated",
    });

    render(<TopMenu />);
    expect(screen.queryByText("Manage Booking")).toBeInTheDocument();
  });
});
