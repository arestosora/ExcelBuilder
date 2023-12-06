import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
    public async onModuleInit() {
        await this.$connect();
    }
}
