"use server";

import fs from "fs/promises";
import path from "path";

export async function saveMessage(message: string) {
  try {
    const fileName = `mensaje_emily_${Date.now()}.txt`;
    const filePath = path.join(process.cwd(), fileName);
    
    const content = `=== Mensaje de Emily ===\nFecha: ${new Date().toLocaleString('es-SV')}\n\n${message}\n`;
    
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true, fileName };
  } catch (error) {
    return { success: false, error: "Error al guardar el archivo" };
  }
}