import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./landing.module.css";

export default function LpPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src="/images/Billow.svg" alt="Billow" width={100} height={30} priority />
        <a href="https://puter.com/" target="_blank" rel="noopener noreferrer">About Puter <ArrowUpRight size={14} aria-hidden="true" /></a>
      </header>
      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="welcome-title">
          <h1 id="welcome-title">Welcome to Billow</h1>
          <p>Manage your team’s subscriptions, members, and spending in one workspace.</p>
          <Link href="/app" className={styles.openButton}>Open workspace <ArrowRight size={17} aria-hidden="true" /></Link>
        </section>
        <section className={styles.guide} aria-labelledby="puter-title">
          <div className={styles.guideCopy}>
            <h2 id="puter-title">Using AI for the first time</h2>
            <p>Billow’s AI chat uses Puter, a service that connects apps to AI through your Puter account.</p>
            <p>When you use an AI feature for the first time, a separate Puter sign-in window opens, as shown here.</p>
            <ol>
              <li>Open the workspace and start a chat or select a quick action.</li>
              <li>Sign in to Puter or create an account in the new window.</li>
              <li>Return to Billow to continue.</li>
            </ol>
            <p className={styles.note}>If the window doesn’t appear, check your browser’s pop-up settings and try again. You may need to sign in again when your session expires.</p>
            <div className={styles.links}>
              <a href="https://puter.com/" target="_blank" rel="noopener noreferrer">Puter <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href="https://docs.puter.com/" target="_blank" rel="noopener noreferrer">Documentation <ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.figure}>
            <Image src="/images/puter-sign-in.jpg" alt="Puter sign-in window displayed over the Billow workspace" width={1509} height={828} sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption>Example of the Puter sign-in window.</figcaption>
          </figure>
        </section>
      </main>
      <footer className={styles.footer}><p>Created by Taka Kondo and Sangwha Cha</p><p>AI powered by <a href="https://puter.com/" target="_blank" rel="noopener noreferrer">Puter</a></p></footer>
    </div>
  );
}
