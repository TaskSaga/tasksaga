import React from "react";
import { render, screen } from "@testing-library/react-native";
import Button from "./Button";

describe("Button Component", () => {
  it("renders correctly with a title", () => {
    render(<Button title="Press Me" />);
    expect(screen.getByText("Press Me")).toBeDefined();
  });

  it("is disabled when the disabled prop is passed", () => {
    render(<Button title="Disabled Button" disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
