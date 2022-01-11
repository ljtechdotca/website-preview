import type { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright";

type Payload = {
  status: boolean;
  message: string;
  data: Record<string, any>;
};

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Payload>
) => {
  const {
    method,
    query: { url },
  } = req;
  let payload = {
    status: false,
    message: "Bad Method",
    data: {},
  };
  try {
    switch (method) {
      case "GET":
        // playwright
        const browser = await playwright.chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url as string);
        const screenshot = await page.screenshot({
          path: `screenshot.png`,
        });
        await browser.close();

        payload.status = true;
        payload.message = "Good";
        payload.data = `data:image/png;base64,${screenshot.toString("base64")}`;

        // puppeteer
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto(url as string);
        // const base64 = await page.screenshot({ encoding: "base64" });
        // await browser.close();

        // payload.status = true;
        // payload.message = "Good";
        // payload.data = `data:image/png;base64,${base64}`;

        res.status(200).json(payload);

        break;
      default:
        res.status(400).json(payload);
        break;
    }
  } catch (error) {
    payload.message = "Server Error";
    console.error(error);
    res.status(500).json(payload);
  }
};

export default handler;
