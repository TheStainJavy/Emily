"use server";

export async function saveMessage(message: string) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "0b45e154-5583-4d98-aed1-cf7c8f989aed", 
        subject: "✨ Nuevo mensaje de Emily desde la web",
        message: message,
      }),
    });

    if (!response.ok) throw new Error("Fallo al enviar a la API");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al procesar el mensaje" };
  }
}