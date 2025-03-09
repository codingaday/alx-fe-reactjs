import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import "@testing-library/jest-dom";

describe("TodoList Component", () => {
  test("renders TodoList component", () => {
    render(<TodoList />);
    expect(
      screen.getByRole("heading", { name: /todo list/i })
    ).toBeInTheDocument();
  });

  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a React app")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText(/Add a new todo/i), {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add Todo"));
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    fireEvent.click(todoItem.closest("li")); // Ensuring clicking on the correct element
    expect(todoItem.closest("li")).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]); // Click first delete button
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
