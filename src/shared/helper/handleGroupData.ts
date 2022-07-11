export const AddGroupData = (values: any) => {
    const data: any = {
        STT: '',
        groupCode: '',
        groupName: values.groupName,
        status: values.status,
        costTicket: values.cost.simple.costTicket
    };
    data.applicableDate = values.from.time.format('HH:mm:ss') + ' ' + values.from.date;
    data.expDate = values.to.time.format('HH:mm:ss') + ' ' + values.to.date;
    if (values.costChoice.indexOf('c') !== -1) {
        data.costCombo = {
            cost: values.cost.combo.costTicket,
            quantity: values.cost.combo.quantity
        };
    } else { data.costCombo = {}; };
    return data;
};

export const UpdateGroupData = (values: any, record: any) => {
    const data: any = {
        id: record.id,
        STT: record.STT,
        applicableDate: values.from.time.format('HH:mm:ss') + ' ' + values.from.date,
        costTicket:  values.cost.simple.costTicket,
        expDate: values.to.time.format('HH:mm:ss') + ' ' + values.to.date,
        groupCode: values.groupCode,
        groupName: values.groupName,
        status: values.status
    };
    if (values.costChoice.indexOf('c') !== -1) {
        data.costCombo = {
            cost: values.cost.combo.costTicket,
            quantity: values.cost.combo.quantity
        };
    } else { data.costCombo = {}; };
    return data;
};