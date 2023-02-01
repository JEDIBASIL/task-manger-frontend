import { Route, Routes } from "react-router-dom";
import { Dashboard, ForgotPassword, Home, MailSent, ResetPassword, SignIn, SignUp, Task, Tasks, Verify } from "./pages";
import { AppContainer } from "./components";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/sent" element={<MailSent />}></Route>
        <Route path="/verify/:token" element={<Verify />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/app" element={<AppContainer />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/app/tasks" element={<Tasks />}></Route>
          <Route path="/app/task/:task" element={<Task />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
