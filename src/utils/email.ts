'use server'

import { google } from 'googleapis'
import nodemailer from 'nodemailer'

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
)

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
})

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html?: string
  text?: string
}) => {
  const accessToken = await oAuth2Client.getAccessToken()
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token || '',
    },
  })

  const res = await transport.sendMail({
    from: `"LDA Team" <lda.team.noreply@gmail.com>`,
    replyTo: 'lda.team.noreply@gmail.com',
    to,
    subject,
    text,
    html,
  })
  return res
}

export const sendVerificationEmail = async (
  email: string,
  verificationUrl: string,
) => {
  await sendEmail({
    to: email,
    subject: 'Подтверждение электронной почты',
    text: `
Здравствуйте!

Благодарим за регистрацию на нашем сайте.
Пожалуйста, подтвердите свой адрес электронной почты, перейдя по ссылке ниже:

${verificationUrl}

Ссылка для подтверждения действительна в течение 5 минут.

Если вы не создавали аккаунт - просто проигнорируйте это письмо.
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; padding: 20px;">
        <h2 style="color: #4B9CE2;">Подтверждение электронной почты</h2>
        <p>Здравствуйте!</p>
        <p>Спасибо за регистрацию на нашем сайте. Чтобы активировать аккаунт, подтвердите свой адрес электронной почты:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="display: inline-block; background: #4B9CE2; color: white; text-decoration: none;
             padding: 12px 24px; border-radius: 6px; font-weight: bold;">
            Подтвердить почту
          </a>
        </p>
         <p style="margin-top: 20px; color: #444;">⚠️ Ссылка для подтверждения действительна в течение <strong>5 минут</strong>.</p>
        <p>Если кнопка не работает, вы можете перейти по ссылке вручную:</p>
        <p style="word-break: break-all; color: #555;">${verificationUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 13px; color: #888;">Если вы не создавали аккаунт, просто проигнорируйте это письмо.</p>
      </div>
    `,
  })
}
