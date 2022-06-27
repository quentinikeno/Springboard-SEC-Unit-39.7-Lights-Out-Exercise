import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> rendering", () => {
	test("initial board should render without crashing", () => {
		render(<Board />);
	});

	test("Should match snapshot when all cells are lit", () => {
		const { asFragment } = render(<Board chanceLightStartsOn={1} />);
		expect(asFragment()).toMatchSnapshot();
	});

	test("Should match snapshot when all cells are not lit", () => {
		const { asFragment } = render(<Board chanceLightStartsOn={0} />);
		expect(asFragment()).toMatchSnapshot();
	});
});

describe("clicking cells", () => {
	test("Lights should toggle correctly", () => {
		const { getAllByRole } = render(
			<Board nrows={3} ncols={3} chanceLightStartsOn={1} />
		);
		const cells = getAllByRole("button");

		cells.forEach((cell) => {
			expect(cell).toHaveClass("Cell-lit");
		});

		fireEvent.click(cells[4]);

		let litIndices = [0, 2, 6, 8];
		cells.forEach((cell, index) => {
			if (litIndices.includes(index)) {
				expect(cell).toHaveClass("Cell-lit");
			} else {
				expect(cell).not.toHaveClass("Cell-lit");
			}
		});
	});

	test("that the win message appears on game win", () => {
		const { queryByText, getAllByRole } = render(
			<Board nrows={1} ncols={3} chanceLightStartsOn={1} />
		);

		expect(queryByText("You've won!")).not.toBeInTheDocument();

		const cells = getAllByRole("button");
		fireEvent.click(cells[1]);
		expect(queryByText("You've won!")).toBeInTheDocument();
	});
});
