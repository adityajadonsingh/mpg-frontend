import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // Get IP (handle Cloudflare + fallback)
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Parse JSON body
    const { type, name, email, phone_number, message, product_name, blog_name } = await request.json();

    // Basic validation
    if (
      !email ||
      (type === "contact" && (!name || !message)) ||
      (type === "product" && (!name || !message || !product_name)) ||
      (type === "blog" && (!name || !message || !blog_name))
    ) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    console.log("📨 New submission from IP:", ip);

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    let htmlContent = "";
    let subject = "";

    if (type === "product") {
      subject = `New enquiry for ${product_name}`;
      htmlContent = `
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; border:1px solid #e0e0e0; background:#ffffff;">
          <tr>
            <th colspan="2" style="background:#4CAF50; color:#fff; text-align:left; font-size:18px; padding:15px;">
              📩 New Product Enquiry Received
            </th>
          </tr>
          <tr><td style="font-weight:bold;">Product Name:</td><td>${product_name}</td></tr>
          <tr><td style="font-weight:bold;">Customer Name:</td><td>${name}</td></tr>
          <tr><td style="font-weight:bold;">Customer Email:</td><td>${email}</td></tr>
          <tr><td style="font-weight:bold;">Phone:</td><td>${phone_number || "N/A"}</td></tr>
          <tr><td style="font-weight:bold;">Message:</td><td>${message}</td></tr>
          <tr><td style="font-weight:bold;">IP Address:</td><td>${ip}</td></tr>
        </table>
      `;
    } else if (type === "contact") {
      subject = "New Contact Form Submission on mpgstone.com";
      htmlContent = `
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; border:1px solid #e0e0e0; background:#ffffff;">
          <tr>
            <th colspan="2" style="background:#007BFF; color:#fff; text-align:left; font-size:18px; padding:15px;">
              📬 New Contact Form Submission
            </th>
          </tr>
          <tr><td style="font-weight:bold;">Name:</td><td>${name}</td></tr>
          <tr><td style="font-weight:bold;">Email:</td><td>${email}</td></tr>
          <tr><td style="font-weight:bold;">Phone:</td><td>${phone_number || "N/A"}</td></tr>
          <tr><td style="font-weight:bold;">Message:</td><td>${message}</td></tr>
          <tr><td style="font-weight:bold;">IP Address:</td><td>${ip}</td></tr>
        </table>
      `;
    } else if (type === "blog") {
      subject = `New blog comment on ${blog_name} in mpgstone.com`;
      htmlContent = `
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; border:1px solid #e0e0e0; background:#ffffff;">
          <tr>
            <th colspan="2" style="background:#FF9800; color:#fff; text-align:left; font-size:18px; padding:15px;">
              📝 New Blog Comment
            </th>
          </tr>
          <tr><td style="font-weight:bold;">Blog Title:</td><td>${blog_name}</td></tr>
          <tr><td style="font-weight:bold;">Name:</td><td>${name}</td></tr>
          <tr><td style="font-weight:bold;">Email:</td><td>${email}</td></tr>
          <tr><td style="font-weight:bold;">Comment:</td><td>${message}</td></tr>
          <tr><td style="font-weight:bold;">IP Address:</td><td>${ip}</td></tr>
        </table>
      `;
    } else {
      subject = "New Newsletter Subscription";
      htmlContent = `
        <p style="font-family:Arial, sans-serif;">New subscriber: <strong>${email}</strong></p>
        <p style="font-family:Arial, sans-serif;">IP Address: ${ip}</p>
      `;
    }

    const adminMailOptions = {
      from: "digital@mpgstone.com",
      to: "digital@mpgstone.com",
      cc: ["kaushik@mpgstones.com", "umang@mpgstone.co.uk","frontend@mpgstone.com"],
      subject,
      html: htmlContent,
    };

    const userMailOptions = {
      from: "digital@mpgstone.com",
      to: email,
      subject:
        type === "contact"
          ? "Thank you for contacting us"
          : type === "product"
          ? "Thank you for your product enquiry"
          : type === "blog"
          ? "Thank you for your comment"
          : "Thank you for subscribing",
      text:
        type === "contact"
          ? `Hi ${name},\n\nThank you for reaching out. We’ve received your message and will get back to you soon.\n\nBest regards,\nMPG Stone Team`
          : type === "product"
          ? `Hi ${name},\n\nThank you for your interest in our product: ${product_name}.\nWe’ve received your enquiry and will contact you shortly.\n\nBest regards,\nMPG Stone Team`
          : type === "blog"
          ? `Hi ${name},\n\nThank you for commenting on our blog: "${blog_name}".\nWe appreciate your feedback and will review it soon.\n\nBest regards,\nMPG Stone Team`
          : `Hi,\n\nThank you for subscribing to our newsletter!\n\nBest regards,\nMPG Stone Team`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ message: "Emails sent successfully", ip }), { status: 200 });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
