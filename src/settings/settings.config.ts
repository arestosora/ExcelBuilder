import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import * as mysql from 'mysql2'

dotenv.config();

export const Settings = {
    NodeMailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    },
    Email: process.env.Email
}

export const NodeMailerSettings = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", // Host here
    port: 587, // Port here
    secure: true,
    auth: {
        // replace `user` and `pass` values from <https://forwardemail.net>
        user: Settings.NodeMailer.user,
        pass: Settings.NodeMailer.pass
    }
})

export const MysqlConfig: mysql.ConnectionOptions = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'myexceldata',
};
