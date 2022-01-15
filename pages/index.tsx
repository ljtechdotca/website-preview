/* eslint-disable @next/next/no-img-element */
import { Meta } from "@components";
import styles from "@styles/Home.module.scss";
import { Img } from "@types";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [img, setImg] = useState<Img | null>(null);
  const [gallery, setGallery] = useState<Img[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchData = async (event: FormEvent) => {
    event.preventDefault();
    setAlert("Loading screenshot!");
    setImg(null);
    try {
      const response = await fetch(`/api?url=${url}`);
      const { status, data } = await response.json();
      if (status) {
        const newGallery = [...gallery, data];
        setGallery(newGallery);
        setImg(data);
        setAlert(null);
      }
    } catch (error) {
      console.error(error);
      setAlert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className={styles.root}>
      <Meta
        title="Website Preview"
        description="Take a screenshot of a website using this website preview tool."
      />
      {img && (
        <header className={styles.header}>
          <p>
            screenshot preview of{" "}
            <a
              className={styles.link}
              href={img.url}
              rel="noreferrer"
              target="_blank"
            >
              {img.url}
            </a>
          </p>
        </header>
      )}
      <div className={styles.container}>
        <img
          className={styles.preview}
          alt="preview"
          src={img ? img.src : "./banner.svg"}
          height={1080 / 2}
          width={1920 / 2}
        />
        {alert && <p>{alert}</p>}
        <form onSubmit={fetchData}>
          <input
            type="url"
            name="url"
            id="url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
          />
          <button>Fetch</button>
          {img && (
            <a download={`${img.id}.png`} href={img.src} title={img.url}>
              Download
            </a>
          )}
        </form>
        <div className={styles.gallery}>
          {gallery.map((img: Img) => (
            <img
              onClick={() => setImg(img)}
              key={img.id}
              className={styles.preview}
              alt="preview"
              src={img.src}
              height={150}
              width={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
