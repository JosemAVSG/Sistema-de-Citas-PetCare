import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(`${process.env.RESEND_API_KEY}`);
export const sendEmailResend = async (email: string, asunto: string, cuerpo: string) => {
    console.log(resend);
    console.log(email, asunto, cuerpo);
    try {
        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: asunto,
          html: `
              <div class="container" style="max-width: 90%; margin: 0 auto;">
                <p>${cuerpo}</p>
              </div>
              <div class="footer">
                <p>Petcare</p>
              </div>
            `,
        });
        
    } catch (error) {
        console.log(error);
    }
}