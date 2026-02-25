const WEBHOOK_URL = 'http://localhost:5678/webhook-test/b95de125-30b9-40cd-a83d-b689ae6bbddf';

export interface GenerateRequest {
  quey: [string, string];
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
    return data.imageUrl || data.image_url || data.result;
  } catch (error) {
    throw new Error('Generation is taking longer than expected. Please try again.');
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
