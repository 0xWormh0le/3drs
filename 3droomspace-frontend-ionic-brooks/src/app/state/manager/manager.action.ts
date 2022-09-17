
export class SetManagerView {
    static readonly type = '[Manager] Set Manager View';
    constructor(public ManagerView: boolean) {}
}

export class ClearManagerForm {
    static readonly type = '[Manager] Clear Manager form';
    constructor() {}
}

