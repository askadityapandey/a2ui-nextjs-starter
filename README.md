# 💎 CryptoScout: Agent-Driven UI Demo

![Next.js](https://img.shields.io/badge/Built%20With-Next.js-black?style=flat&logo=next.js)
![Tailwind](https://img.shields.io/badge/Styled%20With-Tailwind-blue?style=flat&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Educational%20Demo-green)

> **Submission for Thesys Developer Advocate Assignment**
>
> *Note: This project demonstrates the **Agent-to-User Interface (A2UI)** architectural pattern using a mocked decision engine for zero-latency demonstration purposes.*

---

## 🚀 The Concept: Beyond Plain Text

Traditional AI agents are stuck in the "Text Age." You ask for data, they give you a paragraph.
**CryptoScout** flips this model using the **A2UI Protocol Pattern**, where the Agent backend drives the Client's rendering.

1.  **User Intent:** "Show me Bitcoin price."
2.  **Agent Decision:** The agent doesn't write text; it selects the `<CryptoCard />` component.
3.  **Visual Output:** The client renders an interactive, native React card.

## 🛠 Tech Stack & Reasoning

While the official A2UI reference implementation utilizes Python and Lit, I chose **Next.js (App Router)** for this demonstration.

* **Strategic Adoption:** The majority of the modern developer ecosystem (approx. 80%) operates within React/Next.js. Demonstrating A2UI concepts in this stack significantly lowers the barrier to entry for adoption.
* **Server Components:** React Server Components (RSC) allow us to stream UI directly from the server, perfectly mirroring the A2UI "Server-Driven UI" philosophy.

## ⚡ Quick Start

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/crypto-scout.git](https://github.com/YOUR_USERNAME/crypto-scout.git)
    cd crypto-scout
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the dev server**
    ```bash
    npm run dev
    ```

4.  **Test the Agent**
    * Open `http://localhost:3000`
    * Type: *"What is the price of BTC?"* or *"Check ETH status"*

## 🧩 Architecture & Walkthrough

To provide a clear, beginner-friendly mental model, this demo mocks the LLM decision engine client-side. This isolates the **architectural pattern** without the noise of API keys or rate limits.

### The Data Flow

![Can_you_enhancse_202601131848](https://github.com/user-attachments/assets/0a945833-f3f9-4733-8c86-630a7cc0aac8)


1.  **Input:** User sends a query (`"Check BTC"`).
2.  **Intent Classification (Mocked):** The system detects the intent (`GET_PRICE`) and entity (`BTC`).
3.  **Component Selection:** Instead of generating a text string, the system selects the `<CryptoCard />` component.
4.  **Hydration:** The component is populated with data (`price`, `trend`) and rendered instantly.

<details>
<summary><strong>🔍 Click to see the Code Walkthrough</strong></summary>

The logic inside `app/page.tsx` simulates the Agent's decision-making process:

```typescript
// The "Agent" Logic (Mocked for Demo)
if (userMsg.includes("btc")) {
  // 1. Detect Intent: User wants Bitcoin price
  // 2. Select Component: Render UI instead of text
  responseComponent = (
    <CryptoCard 
      coin="Bitcoin" 
      code="BTC" 
      price="$94,230.00" 
      trend="up" 
    />
  );
}
  responseComponent = <CryptoCard coin="Bitcoin" price="$94,230.00" ... />;
}
