import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { type, name, email, phone_number, message, product_name, blog_name } = await request.json();

    if (
      !email ||
      (type === "contact" && (!name || !message)) ||
      (type === "product" && (!name || !message || !product_name)) ||
      (type === "blog" && (!name || !message || !blog_name))
    ) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "digital@mpgstone.com",
        pass: "aoakrnsezvcfhjig",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // HTML Email for admin
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
          <tr style="background:#f9f9f9;">
            <td style="width:160px; font-weight:bold; border-bottom:1px solid #ddd;">Product Name:</td>
            <td style="border-bottom:1px solid #ddd;">${product_name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Customer Name:</td>
            <td style="border-bottom:1px solid #ddd;">${name}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Customer Email-Id:</td>
            <td style="border-bottom:1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Phone:</td>
            <td style="border-bottom:1px solid #ddd;">${phone_number || "N/A"}</td>
          </tr>
          <tr style="background:#f9f9f9;">
            <td style="font-weight:bold; vertical-align:top;">Message:</td>
            <td>${message}</td>
          </tr>
        </table>
        <p style="font-size:12px; color:#666; font-family:Arial, sans-serif; margin-top:15px;">
          This is an automated notification from <strong>MPG Stone</strong> – <a href="https://mpgstone.com" target="_blank" style="color:#4CAF50;">https://mpgstone.com</a>
        </p>
      `;
    } else if (type === "contact") {
      subject = "New Contact Form Submission";
      htmlContent = `
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; border:1px solid #e0e0e0; background:#ffffff;">
          <tr>
            <th colspan="2" style="background:#007BFF; color:#fff; text-align:left; font-size:18px; padding:15px;">
              📬 New Contact Form Submission
            </th>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Name:</td>
            <td style="border-bottom:1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Email:</td>
            <td style="border-bottom:1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Phone:</td>
            <td style="border-bottom:1px solid #ddd;">${phone_number || "N/A"}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; vertical-align:top;">Message:</td>
            <td>${message}</td>
          </tr>
        </table>
      `;
    } else if (type === "blog") {
      subject = `New blog comment on ${blog_name}`;
      htmlContent = `
        <table cellpadding="8" cellspacing="0" border="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; border:1px solid #e0e0e0; background:#ffffff;">
          <tr>
            <th colspan="2" style="background:#FF9800; color:#fff; text-align:left; font-size:18px; padding:15px;">
              📝 New Blog Comment
            </th>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Blog Title:</td>
            <td style="border-bottom:1px solid #ddd;">${blog_name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Name:</td>
            <td style="border-bottom:1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; border-bottom:1px solid #ddd;">Email:</td>
            <td style="border-bottom:1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight:bold; vertical-align:top;">Comment:</td>
            <td>${message}</td>
          </tr>
        </table>
      `;
    } else {
      subject = "New Newsletter Subscription";
      htmlContent = `
        <p style="font-family:Arial, sans-serif;">New subscriber: <strong>${email}</strong></p>
      `;
    }

    const adminMailOptions = {
      from: "digital@mpgstone.com",
      to: "digital@mpgstone.com",
      subject: subject,
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
          : `Hi,\n\nThank you for subscribing to our newsletter! You'll now receive updates and offers from us.\n\nBest regards,\nMPG Stone Team`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ message: "Emails sent successfully" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
