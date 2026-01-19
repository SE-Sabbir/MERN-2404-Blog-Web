// ----------------------------Verify OTP Template-------------------------------------
const verifyOtpTemplate = (userName ,otp)=>{
    return `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7f6;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; margin: 20px auto; border: 1px solid #e0e0e0;">
            <tr>
                <td style="padding: 30px; text-align: center; background-color: #28a745; border-radius: 12px 12px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Confirm Your Identity</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 18px; color: #333333; margin-top: 0;">
                        Hi <strong>${userName}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #555555; line-height: 1.5;">
                        We received a request to access your account. Please use the verification code below to continue.
                    </p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                        <div style="display: inline-block; padding: 15px 25px; background-color: #f0fff4; border: 2px solid #28a745; border-radius: 8px;">
                            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e7e34;">
                                ${otp}
                            </span>
                        </div>
                    </div>

                    <p style="font-size: 14px; color: #888888; text-align: center; margin-bottom: 0;">
                        This code is valid for 10 minutes. If you didn't request this, you can safely ignore this email.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; font-size: 12px; color: #aaaaaa; background-color: #fcfcfc; border-radius: 0 0 12px 12px;">
                    © 2026 Your Company Name. All rights reserved.
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
}
// ----------------------------Reset password link Template-------------------------------------
const resetPasswordTemplate = (userName, resetPasswordLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #333333;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <tr>
                <td style="padding: 30px; text-align: center; background-color: #28a745; border-radius: 10px 10px 0 0;">
                    <h2 style="color: #ffffff; margin: 0;">Password Reset</h2>
                </td>
            </tr>
            
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${userName}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                        We received a request to reset your password. Click the button below to choose a new one. This link will expire in 1 hour.
                    </p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${resetPasswordLink}" style="background-color: #28a745; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="font-size: 14px; color: #777777; line-height: 1.6;">
                        If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                    
                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999999; word-break: break-all;">
                        If the button above doesn't work, copy and paste this link into your browser:<br>
                        <a href="${resetPasswordLink}" style="color: #28a745;">${resetPasswordLink}</a>
                    </p>
                </td>
            </tr>
            
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 12px; color: #999999; margin: 0;">
                        &copy; 2026 Your Company Name. All rights reserved.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

module.exports = {verifyOtpTemplate , resetPasswordTemplate}