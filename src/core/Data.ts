
import { PrismaService } from '../services/queries';

export class Data {
    constructor(private Prisma: PrismaService) { }

   public async getData() {
        const Data = await this.Prisma.venta.findMany();
        return Data;
    }
}