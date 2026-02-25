# n8n Workflow Configuration & AI Logic

This directory contains the "brain" of the DRAPE application. Instead of a traditional backend, we use n8n to orchestrate complex AI workflows.

## 🧠 Model Choice: Flux.1 (via fal.ai)

For this project, we selected **Flux.1 [dev]** as the primary image synthesis engine. 

### Why Flux.1?
- **Text-to-Image Accuracy**: Flux handles complex design prompts and fabric descriptions with significantly higher fidelity than SDXL.
- **Realistic Anatomy**: Since DRAPE focuses on fashion and manikins, Flux’s superior handling of human anatomy (hands, poses) was critical.
- **LoRA Support**: Our implementation uses `fal-ai/flux-2/lora/edit` which allows for future expansion into custom fabric LoRAs.

## 🏗 Workflow Logic (runway-ai.json)

The workflow is designed to be **robust and asynchronous**:

1.  **Webhook Node**: Receives the `sketch` and `model` image URLs/Base64 from the React frontend.
2.  **fal.ai Node (POST)**: Initiates an asynchronous request to the Flux model. We chose an asynchronous approach because high-quality AI generation can take 10-30 seconds, which would timeout a standard synchronous HTTP request.
3.  **Wait & Poll Loop**: 
    - The workflow enters a **Wait** state.
    - It periodically checks the **Status** of the request on fal.ai.
    - If `COMPLETED`, it proceeds to fetch the final `imageUrl`.
    - This ensures the connection stays stable and the frontend receives a reliable result.

## 🚀 How to Import

1.  Open your **n8n** instance.
2.  Create a new workflow.
3.  Go to the top-right menu and select **Import from File**.
4.  Choose `runway-ai.json` from this directory.
5.  **Important**: Update the `Authorization` headers in the `post-fal.ai`, `status`, and `result` nodes with your own `FAL_AI_API_KEY`.

---

*This architecture leverages serverless orchestration to handle long-running generative tasks efficiently, ensuring high reliability and scalability.*
