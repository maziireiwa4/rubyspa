// app/page.js
export default function SpaPage() {
  // Kiểm tra các biến môi trường trong console
  console.log('Firebase API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  console.log('Firebase Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
  console.log('Firebase Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log('Firebase Storage Bucket:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  console.log('Firebase Messaging Sender ID:', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
  console.log('Firebase App ID:', process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

  return (
    <div>
      <h1>Dịch Vụ Spa</h1>
      <p>Chúng tôi cung cấp các dịch vụ spa chuyên nghiệp.</p>
    </div>
  );
}
