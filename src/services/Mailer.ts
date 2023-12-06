import { NodeMailerSettings } from "../settings/settings.config";
import { MailerOptions } from "../settings/mailer.options";
import { Logger } from "../logs/Logger";
const Log = new Logger();

export class Mailer {
    public async sendEmail() {
        try {
            await NodeMailerSettings.sendMail(MailerOptions)
            Log.debug('Email has been sent.')
        } catch (error) {
            Log.error(error)
        }
    }
}