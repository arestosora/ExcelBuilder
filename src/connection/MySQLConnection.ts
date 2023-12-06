import * as mysql from 'mysql2';

export class MySQLConnection {
    private connection: mysql.Connection | null = null;

    constructor(private config: mysql.ConnectionOptions) {
        this.config = config;
    }

    public connect(): void {
        this.connection = mysql.createConnection(this.config);

        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL: ', err);
                throw err;
            }

            console.log('Connected to MySQL!');
        });
    }

    public close(): void {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing MySQL connection: ', err);
                    throw err;
                }

                console.log('Closed MySQL connection.');
            });
        }
    }

    public getConnection(): mysql.Connection | null {
        return this.connection;
    }
}
