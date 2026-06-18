export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {

        // ✅ الدفع نجح
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            const sessionSucceeded = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntent.id,
            });
            const bookingIdSuccess = sessionSucceeded.data[0]?.metadata?.bookingId;
            if (bookingIdSuccess) {
                await Booking.findByIdAndUpdate(bookingIdSuccess, {
                    isPaid: true,
                    paymentPending: false,
                    paymentMethod: "Stripe",
                    status: "confirmed",
                });
            }
            break;

        // ✅ الدفع اتكنسل أو فشل
        case "payment_intent.canceled":
            const paymentIntentCancelled = event.data.object;
            const sessionCancelled = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentCancelled.id,
            });
            const bookingIdCancel = sessionCancelled.data[0]?.metadata?.bookingId;
            if (bookingIdCancel) {
                await Booking.findByIdAndUpdate(bookingIdCancel, {
                    paymentPending: false,
                });
            }
            break;

        // ✅ session انتهت من غير دفع
        case "checkout.session.expired":
            const expiredSession = event.data.object;
            const bookingIdExpired = expiredSession.metadata?.bookingId;
            if (bookingIdExpired) {
                await Booking.findByIdAndUpdate(bookingIdExpired, {
                    paymentPending: false,
                });
            }
            break;

        default:
            break;
    }

    res.json({ received: true });
};