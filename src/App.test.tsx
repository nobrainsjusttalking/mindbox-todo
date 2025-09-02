import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("добавление новой задачи", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "get hired at Mindbox" } });
    fireEvent.submit(form);

    const task = screen.getByText("get hired at Mindbox");
    expect(task).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("переключение задачи", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "get hired at Mindbox" } });
    fireEvent.submit(form);

    const task = screen.getByText("get hired at Mindbox");
    const marker = task.previousSibling as SVGElement;

    fireEvent.click(marker);

    expect(task).toHaveClass("completed-task");
  });

  test("фильтры работают", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "apply to Mindbox" } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: "get a job" } });
    fireEvent.submit(form);

    const task = screen.getByText("apply to Mindbox");
    fireEvent.click(task.previousSibling as SVGElement);

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.queryByText("get a job")).not.toBeInTheDocument();
    expect(screen.getByText("apply to Mindbox")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Active"));
    expect(screen.queryByText("apply to Mindbox")).not.toBeInTheDocument();
    expect(screen.getByText("get a job")).toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("apply to Mindbox")).toBeInTheDocument();
    expect(screen.getByText("get a job")).toBeInTheDocument();
  });

  test("очистка выполненных задач", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "done" } });
    fireEvent.submit(form);

    const task = screen.getByText("done");
    fireEvent.click(task.previousSibling as SVGElement);

    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);

    expect(screen.queryByText("done")).not.toBeInTheDocument();
  });

  test("счётчик item(s) left обновляется", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "item number 1" } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: "item number 2" } });
    fireEvent.submit(form);

    expect(screen.getByText("2 items left")).toBeInTheDocument();

    const task1 = screen.getByText("item number 1");
    const marker1 = task1.previousSibling as SVGElement;
    fireEvent.click(marker1);

    expect(screen.getByText("1 item left")).toBeInTheDocument();
  });

  test("toggle работает правильно с несколькими элементами на вкладке Active, нет toggle по индексу", () => {
    render(<App />);

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "task 1" } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: "task 2" } });
    fireEvent.submit(form);

    const task1 = screen.getByText("task 1");
    const marker1 = task1.previousSibling as SVGElement;
    fireEvent.click(marker1);

    const task2 = screen.getByText("task 2");
    const marker2 = task2.previousSibling as SVGElement;
    fireEvent.click(marker2);

    expect(screen.queryByText("task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("task 2")).not.toBeInTheDocument();
  });
});