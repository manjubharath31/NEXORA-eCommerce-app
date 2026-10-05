const PRODUCTS_URL = "https://YOUR_PRODUCTS_API_URL"; // the same URL your Home screen fetches

let cache = { at: 0, items: [] };

async function getProducts() {
  if (Date.now() - cache.at < 5 * 60 * 1000 && cache.items.length) {
    return cache.items;
  }
  try {
    const res = await fetch(PRODUCTS_URL);
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.products ?? [];
    cache = {
      at: Date.now(),
      items: list.map((p) => ({
        id: p.id,
        name: p.title ?? p.name,
        price: p.price,
        category: p.category,
        description: (p.description ?? "").slice(0, 120),
      })),
    };
    return cache.items;
  } catch (err) {
    console.error("Products fetch failed:", err);
    return cache.items; // old data or empty, so the chat still works
  }
}

export async function POST(request) {
  try {
    const { messages, context } = await request.json();
    const products = await getProducts();

    const systemText = `You are NEXORA's shopping assistant.
Answer ONLY using the data below. If something isn't in the data, say you don't have that information.
Never invent products, prices, stock or order statuses.
When recommending, name the product and its price. Keep replies short.
You can also guide users on using the app (cart, wishlist, orders).

PRODUCTS: ${JSON.stringify(products)}
CUSTOMER CART: ${JSON.stringify(context?.cart ?? [])}
CUSTOMER WISHLIST: ${JSON.stringify(context?.wishlist ?? [])}
CUSTOMER ORDERS: ${JSON.stringify(context?.orders ?? [])}`;


    // Gemini needs the first message to be from the user, so skip the welcome message
    const contents = messages
      .filter((m, i) => !(i === 0 && m.role === "assistant"))
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemText }] },
          contents,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return Response.json(
        { reply: "Sorry, something went wrong. Please try again." },
        { status: 500 }
      );
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't come up with a response.";

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json(
      { reply: "Something went wrong on our end." },
      { status: 500 }
    );
  }
}