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
import TodoTask from "./table-todo/table-todo.jsx";
import { PlusIcon } from "../Components/PlusIcon.jsx";
import { Input } from "@nextui-org/react";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isGettingSessionInfo, setIsGettingSessionInfo] = useState(true);
  const [session, setSession] = useState();
  const router = useRouter();
  const [selected, setSelected] = React.useState("status");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameTask, setNameTask] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    // Create a new task object
    const newTask = {
      nameTask,
      deadline,
      timeSpent,
      complexity,
      score,
    };

    // Update the tasks array with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset the form state (optional)
    setNameTask("");
    setDeadline("");
    setTimeSpent("");
    setComplexity(0);
    setScore(0);
  };
  // component mounted, atau mulai sisi client
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
        <hr class="w-60 h-1 mx-auto my-2 bg-purple-900 border-0 rounded md:my-4 dark:bg-purple-600"></hr>
      </div>
      <div className="flex mx-24 max-w-300px md:max-w-800px">
        <TodoTask />
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
                  Add Task
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    key="inside"
                    type="name"
                    color="secondary"
                    label="Name Task"
                    variant="faded"
                    value={nameTask}
                    onChange={(n) => setNameTask(n.target.value)}
                  />
                  <Input
                    isRequired
                    key="inside"
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
                    key="inside"
                    type="number"
                    color="secondary"
                    label="Time Spent"
                    variant="faded"
                    labelPlacement="inside"
                    placeholder="0"
                    min="0"
                    value={timeSpent}
                    onChange={(t) => setTimeSpent(t.target.value)}
                  />
                  <Input
                    isRequired
                    key="inside"
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
                          onChange={(c) => setComplexity(c.target.value)}
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
                    key="inside"
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
                          onChange={(s) => setScore(s.target.value)}
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
                  <Button color="secondary" onPress={onClose}>
                    Submit
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
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            color="secondary"
            size="lg"
            variant="underlined"
          >
            <Tab key="status" title="Status">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="deadline" title="Deadline">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="knapsackFractional" title="Kanpsack Fractional">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
