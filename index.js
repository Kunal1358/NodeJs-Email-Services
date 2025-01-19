require('dotenv').config()
const nodeMailer = require("nodemailer");
const path = require('path')

async function sendMail() {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.NODE_MAILER_HOST,
            port: process.env.NODE_MAILER_PORT,
            // secure: true, // use SSL
            auth: {
                user: process.env.NODE_MAILER_FROM_EMAIL,
                pass: process.env.NODE_MAILER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const message = {
            from: process.env.NODE_MAILER_FROM_EMAIL, // The email address of the sender
            to: '',  // Add the recipient email here
            subject: 'Learning Nodemailer',
            text: 'For clients with plaintext support only',
            html: `
            <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #333; text-align: center;">Welcome to Our Service!</h1>
                    <p style="font-size: 16px; color: #555; margin: 15px 0; padding: 0 15px;">Here is an image embedded in the email:</p>
                    <img src="cid:unique@image.cid" alt="Embedded Image" style="max-width: 100%; height: auto;" />
                    <p style="font-size: 16px; color: #555; margin: 15px 0; padding: 0 15px;">You can download the PDF by clicking the link below:</p>
                    <a href="cid:unique@pdf1.cid" style="color: #007BFF; text-decoration: none;">Download PDF</a>
                </div>
            </body>`,
            attachments: [
                { filename: 'text1.txt', content: 'hello world!' }, // utf-8 string as an attachment
                { filename: 'text2.txt', path: path.join(__dirname, './assets/testText.txt') }, // file on disk as an attachment
                /* cid (Content-ID) is used to embed media (like images) directly into the email body, allowing it to be displayed inline. */
                {
                    filename: 'testText.txt',
                    path: path.join(__dirname, './assets/testText.txt'),
                    cid: 'unique@pdf1.cid',
                },
                {
                    filename: 'image.jpg',
                    path: '', // Image URL
                    cid: 'unique@image.cid',
                },
                {
                    filename: 'testImage.jpg',
                    path: path.join(__dirname, './assets/testImage.jpg'),
                    contentType: 'image/jpg', // define custom content type for the attachment
                },
            ]
        };
        const mail = await transporter.sendMail(message);
        console.log('mail: ', mail);
    } catch (error) {
        console.error(error);
    }
}

sendMail()