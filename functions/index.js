// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp();

// exports.lowercaseProductName = functions.firestore.document('/products/{documentId}')
//     .onCreate((snap, context) => {
//         const name = snap.data().name;

//         functions.logger.log('Lowercasing product name', context.params.documentId, name);

//         const lowercaseName = name.toLowerCase();

//         return snap.ref.set({ name_lower: lowercaseName }, { merge: true });
//     });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_...'); // 🔑 Your Stripe secret key
const cors = require('cors')({ origin: true });

admin.initializeApp();

// ✅ Firestore trigger (your existing code)
exports.lowercaseProductName = functions.firestore
  .document('/products/{documentId}')
  .onCreate((snap, context) => {
    const name = snap.data().name;
    functions.logger.log('Lowercasing product name', context.params.documentId, name);
    const lowercaseName = name.toLowerCase();
    return snap.ref.set({ name_lower: lowercaseName }, { merge: true });
  });

// ✅ Stripe Checkout Session Creator
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { items } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: item.price * 100 // price in cents
          },
          quantity: item.quantity
        })),
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error('Stripe Error:', err);
      res.status(500).send('Failed to create checkout session');
    }
  });
});
