import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone_number, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adityajadonsingh@gmail.com",
        pass: "tweyyqoxizopiimz",
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates, if needed
      },
      debug: true, // Enable debug mode
      logger: true, // Log output to the console
    });

    await transporter.sendMail({
      from: "adityajadonsingh@gmail.com",
      to: "adityajadonsingh@gmail.com", // Change to the recipient's email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone_number}\nMessage: ${message}`,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });

  } catch (error) {
    console.error("EMAIL ERROR:", error);  // Log the actual error
    return new Response(JSON.stringify({ message: "Failed to send email", error: error.message }), { status: 500 });
  }
}
