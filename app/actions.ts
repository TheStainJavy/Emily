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
        access_key: "0823528b-bfa1-4cf4-9128-406a469bb755",
        subject: "✨ Nuevo mensaje de Emily desde la web",
        message: message,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Fallo al enviar a la API");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al procesar el mensaje" };
  }
}