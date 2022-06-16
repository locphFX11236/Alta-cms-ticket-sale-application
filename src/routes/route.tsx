import { Routes, Route } from 'react-router-dom';

const Router = ({ component }: any): JSX.Element => (
    <Routes>
        <Route path='/' element={ component[0] } />
        <Route path='/ticketList' element={ component[1] } />
        <Route path='/check' element={ component[2] } />
        <Route path='/setting' element={ component[3] } />
        <Route path='/_text' element={ component[4] } />
    </Routes>
);

export default Router;