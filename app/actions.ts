"use server";

export async function saveMessage(message: string) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
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

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, error: data.message || "Error al enviar" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Error de red" };
  }
}