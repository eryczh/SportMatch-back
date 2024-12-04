import nodemailer from 'nodemailer';

export async function sendRecoveryEmail(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperação de Senha - SportsMatch',
        text: `Seu código de recuperação é: ${code}. Ele é válido por 15 minutos.`,
    };

    await transporter.sendMail(mailOptions);
}
