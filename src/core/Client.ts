import { ExcelBuilder } from "../services/core/Excel";

export class Client {
    private Excel: ExcelBuilder
    constructor() {
        this.Excel = new ExcelBuilder();
    }

    public async Generate() {
        try {
           await this.Excel.Build();
        } catch (error) {
            console.error(error);
        } 
    }
}
