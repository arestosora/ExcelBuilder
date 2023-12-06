import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { Data } from '../services/data/Data';
import { Logger } from '../logs/Logger';
import { PrismaService } from '../services/PrismaService';
import { MySQLConnection } from '../connection/MySQLConnection';
import { MysqlConfig } from '../settings/settings.config';
import { RowDataPacket } from 'mysql2';

const Log = new Logger();

export class Client {
    private data: Data;
    private MySQL: MySQLConnection;

    constructor() {
        this.data = new Data(new PrismaService);
        this.MySQL = new MySQLConnection(MysqlConfig);
        this.MySQL.connect();
    }

    public async Generate() {
        try {
            const data = await this.data.getData();
            console.table(data);

            const excelData: any[] = [];

            for (const columna of data) {
                console.log(columna.Query);
                const result = await this.ExecuteQuery(columna.Query);
                console.table(result);
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
                const outputPath = path.join(__dirname, `../../output/${name}`);
                await workbook.xlsx.writeFile(outputPath);
                Log.info('Excel generated!');
            } else {
                Log.info('No data to generate Excel.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.MySQL.close();
        }
    }

    private async ExecuteQuery(query: string): Promise<RowDataPacket[]> {
        const db = this.MySQL.getConnection();

        if (!db) {
            console.error('MySQL connection is null');
            return [];
        }

        try {
            const [data] = await db.promise().query(query);

            if (Array.isArray(data)) {
                return data as RowDataPacket[];
            } else {
                console.error('Unexpected result format:', data);
                return [];
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}
