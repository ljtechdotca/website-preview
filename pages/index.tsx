/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [url, setUrl] = useState<string>("");

  const fetchData = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api?url=${url}`);
    const { data } = await response.json();
    setData(data);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img
          className={styles.preview}
          alt="preview"
          src={data}
          height={600}
          width={800}
        />
        <form onSubmit={fetchData}>
          <input
            type="url"
            name="url"
            id="url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
          />
          <button>Fetch</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
