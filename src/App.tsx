import { Route, Routes } from "react-router-dom";
import { Dashboard, ForgotPassword, Home, MailSent, SignIn, SignUp, Task, Verify } from "./pages";
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
        <Route path="/app" element={<AppContainer />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/app/task" element={<Task />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
