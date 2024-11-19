import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { render, screen, waitFor } from "@testing-library/react";

global.fetch = jest.fn();

describe("getDentists", () => {
  const mockDentistsJson = {
    success: true,
    count: 2,
    pagination: {},
    data: [
      {
        _id: "1",
        name: "Dent. A",
        hospital: "Hospital A",
        address: "123",
        expertist: "Orthodontist",
        tel: "123-456-7890",
        picture: "dentist_a.png",
        __v: 0,
        id: "1",
      },
      {
        _id: "2",
        name: "Dent. B",
        hospital: "Clinic B",
        address: "456",
        expertist: "Pediatric Dentist",
        tel: "098-765-4321",
        picture: "dentist_b.png",
        __v: 0,
        id: "2",
      },
    ],
  };

  const mockDentistsPromise = Promise.resolve({
    success: true,
    count: 2,
    pagination: {},
    data: [
      {
        _id: "1",
        name: "Dent. A",
        hospital: "Hospital A",
        address: "123",
        expertist: "Orthodontist",
        tel: "123-456-7890",
        picture: "/dentist_a.png",
        __v: 0,
        id: "1",
      },
      {
        _id: "2",
        name: "Dent. B",
        hospital: "Clinic B",
        address: "456",
        expertist: "Pediatric Dentist",
        tel: "098-765-4321",
        picture: "/dentist_b.png",
        __v: 0,
        id: "2",
      },
    ],
  });

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch and return the list of dentists", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockDentistsJson),
    });

    const result = await getDentists();

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists`
    );
    expect(result).toEqual(mockDentistsJson);
  });

  it("should throw an error if the fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));

    await expect(getDentists()).rejects.toThrow("Fetch failed");
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dentists`
    );
  });

  it("should render the correct number of dentist images", async () => {
    const catalog = await DentistCatalog({ dentistsJson: mockDentistsPromise });
    render(catalog);

    await waitFor(() => {
      const dentistImages = screen.queryAllByRole("img");
      expect(dentistImages.length).toBe(2);
    });
  });

  it("should display the correct number of dentist cards", async () => {
    const catalog = await DentistCatalog({ dentistsJson: mockDentistsPromise });
    render(catalog);

    await waitFor(() => {
      const dentistCards = screen.getAllByText(/Dent\./);
      expect(dentistCards.length).toBe(2);
    });
  });
});
