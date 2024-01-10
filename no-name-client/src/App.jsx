// import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import AppRouter from "./routes/router";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <Layout className="layout">
            <ToastContainer />
            <AppRouter />
        </Layout>
    );
}

export default App;
