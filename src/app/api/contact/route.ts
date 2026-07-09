import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'sayyidali195@gmail.com',
    replyTo: email,
    subject: `Message from ${name}`,
    text: `${message}\n\nFrom: ${name} (${email})`,
  });

  if (error) {
    console.error('Resend error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return Response.json({ success: true });
}
