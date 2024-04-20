import React from "react";
import Accordion from "react-bootstrap/Accordion";

function HomePage() {
  return (
    <>
      <Accordion defaultActiveKey="0" className="mt-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Handling backend </Accordion.Header>
          <Accordion.Body>
            <li>
              All the crud operations like create, read, update, delete are
              handling in backend
            </li>
            <li>
              Implemented pagination.
            </li>
            <li>Login & Signup functionality handling in backend</li>
            <li>Authentication is also handled using json web token.</li>
            <li>user may able to read update delete their on data.</li>
            <li>Logout functionality also handle in backend.</li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Redux Integration:</Accordion.Header>
          <Accordion.Body>
            <li>
              Redux for state management, as evident from the useDispatch and
              useSelector hooks imported from react-redux
            </li>
            <li>
              Actions like adding tasks and fetching tasks (addtask and
              getTASKS) are dispatched using the dispatch function.
            </li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Task Management:</Accordion.Header>
          <Accordion.Body>
            <li>
              Users can input task details such as title, description, and
              priority using input fields and dropdown menus.
            </li>
            <li>
              When the user clicks the "Add Task" button (submitTaskData
              function), the task data is dispatched to Redux for state
              management. The task input fields are then cleared for adding a
              new task.
            </li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Task Display:</Accordion.Header>
          <Accordion.Body>
            <li>Task items are displayed in the TaskItem component.</li>
            <li>
              The TaskItem component receives the list of tasks (tasks or
              filteredTasks) as props and renders each task item accordingly.
            </li>
            <li>
              Actions like updating tasks, deleting tasks, and fetching tasks
              (updateTask, deleteTask, and getTASKS) are dispatched using the
              dispatch function.
            </li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Styling and Layout:</Accordion.Header>
          <Accordion.Body>
            <li>
              Implemented styling for the Task component using CSS as well as
              tailwind and bootstrap
            </li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Task Status Toggle:</Accordion.Header>
          <Accordion.Body>
            <li>
              Users can select on the task status (Completed or Pending) to
              toggle between the completed and pending states.
            </li>
            <li>
              A success toast is displayed after toggling the task status,
              informing the user whether the task was marked as completed or
              pending.
            </li>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Dispatching Signup Action:</Accordion.Header>
          <Accordion.Body>
            <li>
              When the user clicks the "Register" button, the handleSignup
              function is triggered.{" "}
            </li>
            <li>
              The Redux action (signupUser) is imported using useDispatch hook
              from react-redux
            </li>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default HomePage;
