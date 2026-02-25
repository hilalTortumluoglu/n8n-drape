const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export interface GenerateRequest {
  query: [string, string];
  fabric: string;
}

export interface GenerateResponse {
  imageUrl: string;
}

export async function generateImage(request: GenerateRequest): Promise<string> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Generation failed');
    }

    const data = await response.json();

    // Handle nested array response (n8n style)
    const result = Array.isArray(data) ? data[0] : data;

    // Try different common image URL locations
    const imageUrl = result.imageUrl ||
      result.image_url ||
      result.result ||
      (result.images && result.images[0]?.url);

    if (!imageUrl) {
      console.error('Image URL not found in response:', data);
      throw new Error('Image URL not found in response');
    }

    return imageUrl;
  } catch (error) {
    console.error('n8n Request Error:', error);
    throw new Error(
      error instanceof Error
        ? `Connection Error: ${error.message}`
        : 'Generation failed. Please check your n8n connection and CORS settings.'
    );
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
