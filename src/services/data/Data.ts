import { Execute } from "../../utils/Queries/Execute";

export class Data {
    private pool: Execute
    constructor() {
        this.pool = new Execute();
    }
    
    public async getData(query: string) {
        const Data = this.pool.ExecuteQuery(query)
        return Data;
    }
}