import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import * as mysql from 'mysql2'

dotenv.config();

export const Settings = {
    Queries: {
        Excel: process.env.EXCEL_QUERY
    },
    NodeMailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    },
    Email: process.env.Email
}

export const NodeMailerSettings = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", 
    port: 587,
    secure: true,
    auth: {
        user: Settings.NodeMailer.user,
        pass: Settings.NodeMailer.pass
    }
})

export const MysqlConfig: mysql.ConnectionOptions = {
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

