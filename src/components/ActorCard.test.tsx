import { render, screen } from "@testing-library/react";
import ActorCard from "./ActorCard";
import { Person } from "../types";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("ActorCard", () => {
  const mockActor: Person = {
    id: 1,
    name: "Test Actor",
    character: "Test Character",
    photoUrl: "https://image.tmdb.org/t/p/w185/test.jpg",
  };

  it("renders actor name", () => {
    render(<ActorCard actor={mockActor} />);
    expect(screen.getByText("Test Actor")).toBeInTheDocument();
  });

  it("renders the character played", () => {
    render(<ActorCard actor={mockActor} />);
    expect(screen.getByText("Test Character")).toBeInTheDocument();
  });

  it("falls back to a dash when the character is unknown", () => {
    render(<ActorCard actor={{ ...mockActor, character: "" }} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders actor image", () => {
    render(<ActorCard actor={mockActor} />);
    expect(screen.getByAltText("Test Actor")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w185/test.jpg",
    );
  });
});
