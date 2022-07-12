import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getDatas } from '../core/store/actionCreators';
import Router from '../routes/route';
import IndexLayout from '../layout';
import ContentLayout from '../layout/content/content';
import Home from './home/home';
import TicketList from './ticketList/ticketList';
import Check1 from './checkTicket/check1';
import Check2 from './checkTicket/check2';
import Setting from './settingTicketGroup/setting';

const mapStateToProps = (state: any): any => {
    return { T: state.T, G: state.G };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
    getDatas: () => dispatch( getDatas() )
});

const MainView: React.FC = (props: any) => {

    useEffect(() => {props.getDatas()}, []);

    const HomeView = (): JSX.Element => (
        <ContentLayout children={ [ <Home key={0} /> ] } />
    );

    const TicketView = (): JSX.Element => (
        <ContentLayout children={ [
            <TicketList key={1} db={props.T} />
        ] } />
    );

    const CheckView = (): JSX.Element => (
        <ContentLayout children={ [
            <Check1 key={2} db={props.T} />,
            <Check2 key={3} db={props.T} />
        ] } />
    );

    const SetView = (): JSX.Element => (
        <ContentLayout children={ [
            <Setting key={4} db={props.G} />
        ] } />
    );

    const Component = [
        HomeView(),
        TicketView(),
        CheckView(),
        SetView()
    ];

    return (
        <IndexLayout children={
            <Router component={Component}/>
        } />
    );
};

export default connect( // Là của react-redux, để kết nối component với redux store
    mapStateToProps, // Định nghĩa dữ liệu sẽ lấy từ store sang component
    mapDispatchToProps // Định nghĩa các dispatch từ component sang store
)(MainView);