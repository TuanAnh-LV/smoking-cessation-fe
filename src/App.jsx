import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import PlanChecker from "./app/PlanChecker";
import { useAuth } from "./context/authContext";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  const { token, userInfo } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div>Đang tải...</div>}>
        {token && userInfo && <PlanChecker key={token} />}
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
