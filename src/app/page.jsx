"use client";

import NavbarComponent from "@/Components/navbar/navbar.jsx";
import { getSession } from "@/lib/auth.js";
import {
  Button,
  Card,
  CardBody,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "../Components/PlusIcon.jsx";
import { Input } from "@nextui-org/react";
import { addTodo, deleteTodo, editTodo, readAllTodo } from "@/lib/todo.js";
import TableTodo from "@/Components/table-todo/table-todo.jsx";
import StatusTable from "@/Components/status-tabel.jsx";
import DeadlineTable from "@/Components/deadline-table.jsx";
import { SearchIcon } from "@/Components/SearchIcon.jsx";
import KnapsackFractionalTable from "@/Components/fractional-knapsack-table.jsx";

export default function HomePage() {
  const [selected, setSelected] = React.useState("status");
  const [tasks, setTasks] = useState([]);
  const [isGettingSessionInfo, setIsGettingSessionInfo] = useState(true);
  const [session, setSession] = useState();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameTask, setNameTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const [score, setScore] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [capacityKnapsack, setCapacityKnapsack] = useState(0);

  // onClick to delete
  const onClickButtonDelete = (item) => {
    const deleteResult = deleteTodo(session.email, item.key);
    if (deleteResult.success) {
      const readResult = readAllTodo(session.email);
      if (readResult.success) {
        setTasks(readResult.todos);
      }
    }
  };

  const onClickButtonEdit = (item) => {
    setEditingTask(item);
    setNameTask(item.nameTask);
    setDeadline(item.deadline);
    setTimeSpent(item.timeSpent);
    setComplexity(item.complexity);
    setScore(item.score);
    onOpen();
  };
  const handleSubmit = () => {
    // Create a new task object
    const newTask = {
      key: new Date().toISOString(),
      nameTask,
      deadline,
      timeSpent,
      complexity,
      score,
    };

    console.log(newTask);
    const result = addTodo(session.email, newTask);
    if (result.success) {
      // Update the tasks array with the new task
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setNameTask("");
    setDeadline("");
    setTimeSpent(0);
    setComplexity(0);
    setScore(0);
    setEditingTask(null);
  };

  const handleEditSubmit = () => {
    // Update the existing task in the tasks array
    const editedTask = {
      ...editingTask,
      nameTask,
      deadline,
      timeSpent,
      complexity,
      score,
    };

    const updatedTasks = editTodo(session.email, editingTask.key, editedTask);
    if (updatedTasks.success) {
      const readTodo = readAllTodo(session.email);
      if (readTodo.success) {
        setTasks(readTodo.todos);
      }
    }

    // Reset form state
    setNameTask("");
    setDeadline("");
    setTimeSpent(0);
    setComplexity(0);
    setScore(0);
    setEditingTask(null);

    // Close the modal
    onOpenChange(false);
  };

  // component mounted, atau mulai sisi client
  useEffect(() => {
    if (session) {
      const resultReadAllTodos = readAllTodo(session.email);
      if (resultReadAllTodos.success) {
        setTasks(resultReadAllTodos.todos);
      }
    }
  }, [session]);

  useEffect(() => {
    // intinya, buat cek apakah local storage udah ready atau belum

    // mendapatkan info sesi
    setSession(getSession());

    // setelah berhasil mendapatkan info sesi
    setIsGettingSessionInfo(false);
  }, []);
  if (isGettingSessionInfo) {
    return (
      <>
        <div className="flex bg-center justify-center h-screen items-center">
          <CircularProgress
            color="secondary"
            size="lg"
            aria-label="Loading..."
          />
        </div>
      </>
    );
  }

  if (!session) {
    return router.replace("/login");
  }

  return (
    <>
      <NavbarComponent />

      <div className="rid grid-cols-2">
        <h1 className="col-span-2 text-center text-3xl font-semibold leading-loose text-purple-900 dark:text-white">
          Assigment List
        </h1>
        <hr className="w-60 h-1 mx-auto my-2 bg-purple-900 border-0 rounded md:my-4 dark:bg-purple-600"></hr>
      </div>
      <div className="flex mx-24 max-w-300px md:max-w-800px">
        <TableTodo
          items={tasks}
          onClickButtonEdit={onClickButtonEdit}
          onClickButtonDelete={onClickButtonDelete}
        />
      </div>
      <div className="flex mx-24 mt-4">
        <Button
          color="secondary"
          endContent={<PlusIcon />}
          size="md"
          onPress={onOpen}
        >
          Add New
        </Button>
        <Modal
          isOpen={isOpen}
          size="md"
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {editingTask ? "Edit Task" : "Add Task"}
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    type="name"
                    color="secondary"
                    label="Name Task"
                    variant="faded"
                    value={nameTask}
                    onChange={(n) => setNameTask(n.target.value)}
                  />
                  <Input
                    isRequired
                    type="date"
                    color="secondary"
                    label="Deadline"
                    variant="faded"
                    labelPlacement="inside"
                    placeholder="tanggal"
                    value={deadline}
                    onChange={(d) => setDeadline(d.target.value)}
                  />
                  <Input
                    isRequired
                    type="number"
                    color="secondary"
                    label="Time Spent (Hours)"
                    variant="faded"
                    labelPlacement="inside"
                    placeholder="0"
                    min="0"
                    value={timeSpent}
                    onChange={(t) => setTimeSpent(Number(t.target.value))}
                  />
                  <Input
                    isRequired
                    color="secondary"
                    label="Complexity"
                    variant="faded"
                    labelPlacement="inside"
                    startContent={
                      <div className="flex items-center">
                        <label className="sr-only" htmlFor="currency">
                          Complexity
                        </label>
                        <select
                          className="outline-none border-0 bg-transparent text-default-900 text-small"
                          id="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(c) =>
                            setComplexity(Number(c.target.value))
                          }
                        >
                          <option value={0}>Easy</option>
                          <option value={1}>Moderate</option>
                          <option value={2}>Difficult</option>
                        </select>
                      </div>
                    }
                  />
                  <Input
                    isRequired
                    color="secondary"
                    label="Score"
                    variant="faded"
                    labelPlacement="inside"
                    startContent={
                      <div className="flex items-center">
                        <label className="sr-only" htmlFor="currency">
                          Score
                        </label>
                        <select
                          className="outline-none border-0 bg-transparent text-default-900 text-small"
                          id="score"
                          name="score"
                          value={score}
                          onChange={(s) => setScore(Number(s.target.value))}
                        >
                          <option value={0}>Low</option>
                          <option value={1}>Medium</option>
                          <option value={2}>High</option>
                        </select>
                      </div>
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    onPress={() => {
                      if (editingTask) {
                        handleEditSubmit();
                      } else {
                        handleSubmit();
                      }
                      // Close the modal after submit
                      onClose();
                    }}
                  >
                    {editingTask ? "Update" : "Submit"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="mx-24 mt-6">
        <div className="flex w-full flex-col items-center">
          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected}
            color="secondary"
            size="lg"
            variant="underlined"
          >
            <Tab key="status" title="Status">
              <div className="flex">
                <StatusTable userEmail={session.email} />
              </div>
            </Tab>
            <Tab key="deadline" title="Deadline">
              <div className="flex">
                <DeadlineTable userEmail={session.email} />
              </div>
            </Tab>
            <Tab key="knapsackFractional" title="Kanpsack Fractional">
              <div>
                <Input
                  color="secondary"
                  variant="faded"
                  placeholder="0"
                  min="0"
                  type="number"
                  label="Time Available"
                  labelPlacement="outside"
                  value={capacityKnapsack}
                  onChange={(ca) =>
                    setCapacityKnapsack(Number(ca.target.value))
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center ">
                      <span className="text-default-400 text-small">Hours</span>
                    </div>
                  }
                />
                <div className="mt-6">
                  <KnapsackFractionalTable
                    userEmail={session.email}
                    capacity={capacityKnapsack}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
