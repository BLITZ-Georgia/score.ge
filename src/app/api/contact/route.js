import { NextResponse } from "next/server";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export async function POST(req, res) {
  const { username, email, message } = await req.json();

  const mailData = {
    from: email,
    to: "info@blitz.ge",
    subject: `Message from  ${username}`,
    html: `
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, mailData);
    return NextResponse.json({ status: "success sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "something went wrong" },
      { status: 500 }
    );
  }
}
