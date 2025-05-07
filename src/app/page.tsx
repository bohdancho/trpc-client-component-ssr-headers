import { LatestPost } from "@/app/_components/post";
import styles from "./index.module.css";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Auth />
        {session && <LatestPost />}
      </div>
    </main>
  );
}

async function Auth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  return (
    <div className={styles.showcaseContainer}>
      {session ? (
        <>
          <span style={{ color: "white" }}>You are authorized!</span>
          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              cookieStore.delete("session");
            }}
          >
            <button type="submit">Log out</button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.set("session", "yep");
          }}
        >
          <button type="submit">Log in</button>
        </form>
      )}
    </div>
  );
}
