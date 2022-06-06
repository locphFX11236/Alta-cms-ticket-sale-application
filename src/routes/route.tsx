import { Layout } from "antd";
import { Routes, Route } from 'react-router-dom';
import Home from "../view/index";
import Check from "../view/checkTicket";
import TicketList from "../view/ticketList";

const { Content } = Layout;

const Router = () => {
  return (
    <Content>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticketList" element={<TicketList />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Content>
  );
};

export default Router;