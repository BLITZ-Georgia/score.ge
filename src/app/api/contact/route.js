import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { username, email, message } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@blitz.ge',
      subject: `Message from ${username}`,
      html: `
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log(error);
    console.log(data);

    if (error) {
      return NextResponse.json({ status: "something went wrong" }, { status: 500 });
    }

    return NextResponse.json({ status: "success sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "something went wrong" }, { status: 500 });
  }
}
