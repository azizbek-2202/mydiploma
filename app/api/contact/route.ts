import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, country, subject, message } = await req.json();

        // Telegram bot token va kanal ID
        const BOT_TOKEN = '8284473156:AAFpnuV8_ytq2TS-1I9SdkxMNTV22H-mrok';
        const CHANNEL_ID = '@MyDeploma';

        // Telegram API orqali yuborish
        const telegramMessage = `
📩 *New Contact Form Submission* 📩
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Country:* ${country}
*Subject:* ${subject}
*Message:* ${message}
    `;

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHANNEL_ID,
                text: telegramMessage,
                parse_mode: "Markdown",
            }),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
    }
}
