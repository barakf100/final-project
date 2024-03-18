import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import AppRouter from "./routes/router";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";
function App() {
    const [doneAuth, setDoneAuth] = useState(false);
    const autoLogin = useAutoLogin();
    useEffect(() => {
        (async () => {
            try {
                await autoLogin(); //false is default
            } catch (err) {
                console.log(err);
            } finally {
                setDoneAuth(true);
            }
        })();
    }, []);
    return (
        <Layout className="layout">
            <ToastContainer />
            <AppRouter className="router" />
        </Layout>
    );
}

export default App;
