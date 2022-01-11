import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { Img } from "../../types";

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
        // puppeteer
        const browser = await chromium.puppeteer.launch({
          args: [
            ...chromium.args,
            "--hide-scrollbars",
            "--disable-web-security",
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: true,
          ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        await page.goto(url as string);
        const base64 = await page.screenshot({ encoding: "base64" });
        await browser.close();

        payload.status = true;
        payload.message = "Good";
        payload.data = {
          id: base64.slice(108, 140),
          src: `data:image/png;base64,${base64}`,
          url,
        } as Img;

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
