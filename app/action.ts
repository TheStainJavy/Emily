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
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: emailError } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["alessinfo219@gmail.com"],
          subject: "✨ Nuevo mensaje desde la web",
          text: message,
        });

        if (emailError) {
          console.error(emailError);
        }
      } catch (emailException) {
        console.error(emailException);
      }
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al procesar el mensaje" };
  }
}