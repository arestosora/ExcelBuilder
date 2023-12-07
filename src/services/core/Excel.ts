import { Data } from '../../services/data/Data';
import { Logger } from '../../logs/Logger';
import { Execute } from '../../utils/Queries/Execute';
import { Settings } from '../../settings/settings.config';
import * as ExcelJS from 'exceljs';
import JSZip from 'jszip';
import * as path from 'path';
import * as fs from 'fs';

export class ExcelBuilder {
    private data: Data;
    private Log: Logger
    private pool: Execute

    constructor() {
        this.data = new Data();
        this.Log = new Logger()
        this.pool = new Execute();
    }

    public async Build() {
        let start = Date.now();
        const data = await this.data.getData(Settings.Queries.Excel);
        console.table(data);

        const excelData: any[] = [];

        for (const columna of data) {
            console.log(columna.Query);
            const result = await this.pool.ExecuteQuery(columna.Query);
            excelData.push(...result);
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        if (excelData.length > 0) {
            const columns = Object.keys(excelData[0]);
            worksheet.columns = columns.map(column => ({ header: column, key: column, width: 15 }));

            excelData.forEach(row => {
                const rowData = {};
                columns.forEach(column => {
                    rowData[column] = row[column];
                });
                worksheet.addRow(rowData);
            });

            const name = `Reporte.xlsx`;
            const excelPath = path.join(__dirname, `../../../output/${name}`);
            await workbook.xlsx.writeFile(excelPath);
            this.BuildZipFile(excelPath, name);

            this.Log.info('Excel generated and zipped!');
            let timeTaken = Date.now() - start;
            this.Log.info("Total time taken : " + timeTaken + " milliseconds");
        } else {
            this.Log.info('No data to generate Excel.');
        }
    }

    private BuildZipFile(excelPath: string, excelName: string) {
        const zip = new JSZip();
        const excelContent = fs.readFileSync(excelPath);
        zip.file(excelName, excelContent);

        const zipName = `Reporte.zip`;
        const zipPath = path.join(__dirname, `../../../output/${zipName}`);

        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream(zipPath));
    }
}
