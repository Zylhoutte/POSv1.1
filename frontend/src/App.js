import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useState } from "react";
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Bills from './pages/bills/Bills';
import Customers from './pages/customers/Customers';
import AdminLogin from './pages/admin/AdminLogin'
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Team from "./pages/team/Team";
import Invoices from "./pages/invoices/Invoice";
import Contacts from "./pages/contacts/Contacts";
import Bar from "./pages/bar/Bar";
import Form from "./pages/form/Form";
import Line from "./pages/line/Line";
import Pie from "./pages/pie/Pie";
import FAQ from "./pages/faq/FAQ";
import Geography from "./pages/geography/Geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./pages/calendar/Calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/products" element={<Products /> } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/customers" element={<Customers /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
        <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

    
    </>
  );
}

export default App;

export function ProtectedRouter({children}) {
  if(localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}
