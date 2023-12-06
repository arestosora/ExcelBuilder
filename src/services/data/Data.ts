
import { PrismaService } from "../PrismaService";

export class Data {
    constructor(private prisma: PrismaService) { }

    public async getData() {
        const Data = await this.prisma.queries.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        // const Data = await this.prisma.venta.findMany();
        return Data;
    }
}