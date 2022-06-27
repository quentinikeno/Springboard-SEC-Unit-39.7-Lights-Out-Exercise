import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell/>", () => {
	let container;

	beforeEach(function () {
		let tr = document.createElement("tr");
		container = document.body.appendChild(tr);
	});

	test("if it renders without crashing", () => {
		render(<Cell />, { container });
	});

	test("that it matches the snapshot when lit", () => {
		const { asFragment } = render(<Cell isLit={true} />, { container });
		expect(asFragment()).toMatchSnapshot();
	});

	test("that it matches the snapshot when not lit", () => {
		const { asFragment } = render(<Cell isLit={false} />, { container });
		expect(asFragment()).toMatchSnapshot();
	});
});
