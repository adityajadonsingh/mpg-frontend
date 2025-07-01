export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(
        JSON.stringify({ message: "No token provided" }),
        { status: 400 }
      );
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=6Le0nXMrAAAAAJPxOW6Y7TGY2tYqaHlXi_4tldWw&response=${token}`;

    const googleRes = await fetch(verifyURL, { method: "POST" });
    const googleData = await googleRes.json();

    if (!googleData.success) {
      return new Response(
        JSON.stringify({ message: "Failed reCAPTCHA" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "reCAPTCHA verified" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("CAPTCHA VERIFY ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Verification failed", error: error.message }),
      { status: 500 }
    );
  }
}
