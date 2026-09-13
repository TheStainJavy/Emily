"use server";

import { getSupabaseClient } from "./lib/supabase";
import { Resend } from "resend";

export async function saveMessage(message: string) {
  try {
    const supabase = getSupabaseClient();
    
    const { error: dbError } = await supabase
      .from("comentarios")
      .insert([{ contenido: message }]);

    if (dbError) {
      throw new Error(dbError.message);
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Emily Web <onboarding@resend.dev>",
        to: ["javieralessport210@gmail.com"],
        subject: "✨ Nuevo mensaje desde la web",
        text: message,
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al procesar el mensaje" };
  }
}