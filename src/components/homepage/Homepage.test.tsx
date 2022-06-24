import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
  it("link to missions page", async () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
    expect(
      await screen.findByTestId("link-to-missions-page")
    ).toBeInTheDocument();
  });
});
