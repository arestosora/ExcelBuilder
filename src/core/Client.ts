import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { Data } from './Data';
import { Logger } from '../logs/Logger';
import { PrismaService } from '../services/queries';

const Log = new Logger();

export class Client {
    private data: Data;

    constructor() {
        this.data = new Data(new PrismaService);
    }

    public async Generate() {
        try {
            const data = await this.data.getData();
            console.table(data);

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet 1');

            const columns = Object.keys(data[0]);
            worksheet.columns = columns.map(column => ({ header: column, key: column, width: 15 }));
            data.forEach(row => {
                const rowData = {};
                columns.forEach(column => {
                    rowData[column] = row[column];
                });
                worksheet.addRow(rowData);
            });

            /* Esto es para obtener el nombre */

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

            const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}-${currentDate.getMinutes().toString().padStart(2, '0')}-${currentDate.getSeconds().toString().padStart(2, '0')}`;

            const name = `output_${formattedDate}_${formattedTime}.xlsx`;
            /* Generar el excel con el nombre */

            const outputPath = path.join(__dirname, `../../output/${name}`);
            await workbook.xlsx.writeFile(outputPath);
            Log.info('Excel generated!');
        } catch (error) {
            console.error(error);
        }
    }
}
