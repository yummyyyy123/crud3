import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { note } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Suggest an improved version of: "${note}"` }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim() || "AI error.";

    return { statusCode: 200, body: JSON.stringify({ suggestion }) };
  } catch (error) {
    console.error("AI function error:", error);
    return { statusCode: 500, body: JSON.stringify({ suggestion: "Server error." }) };
  }
}

