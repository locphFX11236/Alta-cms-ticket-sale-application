import { Button } from "antd";
import { connect } from "react-redux";
import { UsingTicketAction } from "../../../core/store/actionCreators";

const UsingTicket = (props: any): React.ReactElement => {
    const onSelect = () => {
        props.dispatch( UsingTicketAction({ data: props.record, i: props.index }) );
        console.log({ data: props.record, i: props.index });
    };

    return (
        <Button
            type="link"
            onClick={onSelect}
            disabled={props.record.ticketStatus !== 'Chưa sử dụng'}
        >
            Sử dụng vé
        </Button>
    );
};

export default connect()(UsingTicket);