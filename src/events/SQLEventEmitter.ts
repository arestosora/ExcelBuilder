import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrismaService } from '../services/PrismaService';

export class SQLEventEmitter {
    private prisma: PrismaService
    constructor() {
        this.prisma = new PrismaService();
    }

    public Listen(): Observable<any> {
        const query = this.prisma.$queryRaw`SELECT * FROM Venta`
        const resultObservable = from(query);
        return resultObservable.pipe(map((result: any) => result));
    }
}
