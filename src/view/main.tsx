import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getDatas } from '../core/store/actionCreators';
import Home from './index';
import TicketList from './ticketList';
import Setting from './setting';
import Router from '../routes/route';
import ContentLayout from '../layout/content/content';
import IndexLayout from '../layout';
import Check1 from './check1';
import Check2 from './check2';
import Text from '../_test';

const mapStateToProps = (state: any): any => {
    return { T: state.T, G: state.G };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
    getDatas: () => dispatch( getDatas() )
});

const MainView: React.FC = (props: any) => {

    useEffect(() => {props.getDatas()}, []);

    const HomeView = (): JSX.Element => (
        <ContentLayout children={ [ <Home /> ] } />
    );

    const TicketView = (): JSX.Element => (
        <ContentLayout children={ [
            <TicketList db={props.T} />
        ] } />
    );

    const CheckView = (): JSX.Element => (
        <ContentLayout children={ [
            <Check1 db={props.T} />,
            <Check2 db={props.T} />
        ] } />
    );

    const SetView = (): JSX.Element => (
        <ContentLayout children={ [
            <Setting db={props.G} />
        ] } />
    );

    const TextView = (): JSX.Element => (
        <ContentLayout children={ [
            <Text />
        ] } />
    );

    const Component = [
        HomeView(),
        TicketView(),
        CheckView(),
        SetView(),
        TextView()
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