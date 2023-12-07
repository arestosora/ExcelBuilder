import { MySQLConnection } from "../../connection/MySQLConnection";
import { MysqlConfig } from "../../settings/settings.config";
import { RowDataPacket } from "mysql2";

export class Execute {
    private MySQL: MySQLConnection
    constructor() {
        this.MySQL = new MySQLConnection(MysqlConfig)
        this.MySQL.connect();
    }

    public async ExecuteQuery(query: string): Promise<RowDataPacket[]> {
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