import path from "path";
import { Settings } from "./settings.config";

export const MailerOptions = {
    from: {
        name: 'TeraApps',
        address: Settings.NodeMailer.user
    }, // sender address
    to: ["noahwalker2507@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [{
        filename: 'Reporte.xlsx',
        path: path.join(__dirname, '../../output/output.xlsx'),
        contentType: 'application/xlsx'
    }]
}