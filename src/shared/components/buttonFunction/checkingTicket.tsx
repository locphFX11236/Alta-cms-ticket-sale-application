import { Button } from "antd";
import { connect } from "react-redux";
import { CheckTicketAction } from "../../../core/store/actionCreators";

const CheckingTicket = (props: any): React.ReactElement => {
    const isHidden = () => {
        const s = props.search;
        const test = props.search.filter((s: any) => s.checkStatus === 'Chưa đối soát');
        const notHidden = s.length > 0 && s.length === test.length;
        return !notHidden;
    };

    const onSelect = () => {
        const idArray = props.search.map((a: any) => a.id);
        console.log({ searchArray: props.search, idArray: idArray });
        props.dispatch( CheckTicketAction({ searchArray: props.search, idArray: idArray }) );
    };

    return (
        <Button
            type="primary" ghost
            onClick={onSelect}
            hidden={isHidden()}
        >
            Chốt đối soát
        </Button>
    );
};

export default connect()(CheckingTicket);