import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { type, name, email, phone_number, message, product_name } = await request.json();
console.log("Request JSON:", { type, name, email, phone_number, message, product_name });

    // Validate required fields based on type
    if (!email ||
      (type === "contact" && (!name || !message)) ||
      (type === "product" && (!name || !message || !product_name))) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adityajadonsingh@gmail.com",
        pass: "tweyyqoxizopiimz", // Be sure to store this securely using environment variables!
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Admin email content
    const adminMailOptions = {
      from: "adityajadonsingh@gmail.com",
      to: "adityajadonsingh@gmail.com",
      subject:
        type === "contact"
          ? "New Contact Form Submission"
          : type === "product"
            ? `New enquiry for ${product_name}`
            : "New Newsletter Subscription",
      text:
        type === "contact"
          ? `Name: ${name}\nEmail: ${email}\nPhone: ${phone_number || "N/A"}\nMessage: ${message}`
          : type === "product"
            ? `Product Name: ${product_name}\nName: ${name}\nEmail: ${email}\nPhone: ${phone_number || "N/A"}\nMessage: ${message}`
            : `New subscriber: ${email}`,
    };

    // User thank-you email content
    const userMailOptions = {
      from: "adityajadonsingh@gmail.com",
      to: email,
      subject:
        type === "contact"
          ? "Thank you for contacting us"
          : type === "product"
            ? "Thank you for your product enquiry"
            : "Thank you for subscribing",
      text:
        type === "contact"
          ? `Hi ${name},\n\nThank you for reaching out. We’ve received your message and will get back to you soon.\n\nBest regards,\nMPG Stone Team`
          : type === "product"
            ? `Hi ${name},\n\nThank you for your interest in our product: ${product_name}.\nWe’ve received your enquiry and will contact you shortly.\n\nBest regards,\nMPG Stone Team`
            : `Hi,\n\nThank you for subscribing to our newsletter! You'll now receive updates and offers from us.\n\nBest regards,\nMPG Stone Team`,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ message: "Emails sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
