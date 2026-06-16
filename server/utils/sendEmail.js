import nodemailer from 'nodemailer';




export const sendBookingConfirmation = async (booking) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const { user, hotel, room, checkInDate, checkOutDate, guests, totalPrice, _id } = booking;

    const checkIn = new Date(checkInDate).toDateString().slice(4);
    const checkOut = new Date(checkOutDate).toDateString().slice(4);

   

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .header { background: #F97316; padding: 30px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
            .body { padding: 30px; }
            .greeting { font-size: 16px; color: #333; margin-bottom: 20px; }
            .card { background: #f9f9f9; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
            .card h2 { margin: 0 0 16px; font-size: 18px; color: #111; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .label { color: #888; font-size: 13px; }
            .value { color: #111; font-size: 13px; font-weight: bold; }
            .divider { border: none; border-top: 1px solid #eee; margin: 16px 0; }
            .total { display: flex; justify-content: space-between; }
            .total .label { font-size: 15px; color: #333; font-weight: bold; }
            .total .value { font-size: 18px; color: #F97316; font-weight: bold; }
            .badge { display: inline-block; background: #fff3e0; color: #F97316; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #aaa; background: #fafafa; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1> Booking Confirmed!</h1>
                <p>Your reservation has been successfully created.</p>
            </div>
            <div class="body">
                <p class="greeting">Hi <strong>${user.userName}</strong>, thank you for your booking!</p>
                <span class="badge">Booking ID: #${_id.toString().slice(-8).toUpperCase()}</span>

                <div class="card">
                    <h2>${hotel.name}</h2>
                    <div class="row">
                        <span class="label">Room Type</span>
                        <span class="value">${room.roomType}</span>
                    </div>
                    <div class="row">
                        <span class="label">Address</span>
                        <span class="value">${hotel.address}</span>
                    </div>
                    <hr class="divider" />
                    <div class="row">
                        <span class="label">Check-In</span>
                        <span class="value">${checkIn}</span>
                    </div>
                    <div class="row">
                        <span class="label">Check-Out</span>
                        <span class="value">${checkOut}</span>
                    </div>
                    <div class="row">
                        <span class="label">Guests</span>
                        <span class="value">${guests}</span>
                    </div>
                    <hr class="divider" />
                    <div class="total">
                        <span class="label">Total Price</span>
                        <span class="value">$${totalPrice}</span>
                    </div>
                </div>

                <p style="color:#888; font-size:13px;">
                    Payment is due at check-in unless you choose to pay online. 
                    If you have any questions, reply to this email.
                </p>
            </div>
            <div class="footer">
                © ${new Date().getFullYear()} QuickStay. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
        from: `"QuickStay" <${process.env.SMTP_EMAIL}>`,
        to: user.email,
        subject: `Booking Confirmed - ${hotel.name}`,
        html,
    });
};