declare module NodeJS {
    interface ProcessEnv {
      Email: string;
      NODEMAILER_PASSWORD: string;
      NODEMAILER_USER: string;
    }
  }
  