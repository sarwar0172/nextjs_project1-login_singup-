class Env{
    static  SMPTP_HOST:string=process.env.SMTP_HOST!
    static  SMPTP_PORT:string=process.env.SMTP_PORT!
    static  SMPTP_USER:string=process.env.SMTP_USER!
    static  SMPTP_PASSWORD:string=process.env.SMTP_PASSWORD!
    static  SMPTP_SECURE:string=process.env.SMTP_SECURE!
    static  SMPTP_FROM:string=process.env.SMTP_FROM!
    static  EMAIL_INCREPTION_KEY:string=process.env.EMAIL_INCREPTION_KEY!
    static  APP_URL:string=process.env.APP_URL!

}

export default Env