import {getGithubProfile} from "@/lib/get-github-profile";
import {Block} from "../block";
import styles from "./main-content.module.css";
import Image from "next/image";
import Link from "next/link";
import {Topography} from "./topography";
import {
  BuildingsIcon,
  GitHubIcon,
  GlobeIcon,
  LocationIcon,
  PullRequestIcon,
} from "../symbols";
import MyV0Component from "../MyV0Component";

export async function MainContent({
  username,
  geo,
}: {
  username: string;
  geo: {
    city?: string;
    country?: string;
    cityNickname?: string;
    region?: string;
  };
}) {
  const profileData = await getGithubProfile(username);

  const {city, country, cityNickname, region} = geo ?? {};

  return (
    <div className={styles.grid}>
      <Block className={styles.header} variant="medium-gray">
        <h1 className={styles.title}>
          <span>Welcome to the Vercelian profile page of </span>
          <strong>{profileData.name}</strong>
        </h1>
      </Block>

      <Block className={styles.avatar}>
        {profileData.avatar_url ? (
          <Image
            className={styles.img}
            src={profileData.avatar_url}
            height={128}
            width={128}
            alt="a picture of the developer of this page"
          />
        ) : (
          <div className={styles.emoji}>😊</div>
        )}
      </Block>

      <Block className={styles.location} variant="green">
        <div aria-hidden className={styles.bg}>
          <Topography />
          <Topography />
        </div>

        <div>
          <span className={styles.icon}>
            <LocationIcon />
          </span>

          {city && city !== "undefined" ? (
            <>
              <h3>
                You're visiting from beautiful{" "}
                <strong>
                  {city}, {region}
                </strong>
                .
              </h3>
              {cityNickname && cityNickname !== "undefined" ? (
                <span>
                  Known to some as <br /> <strong>{cityNickname}</strong>.
                </span>
              ) : null}
            </>
          ) : (
            <p>
              Middleware wasn't able to geolocate your IP. You may want to try a
              different device or network.
            </p>
          )}
        </div>
        <p>
          Via{" "}
          <Link href="https://nextjs.org/docs/app/building-your-application/routing/middleware">
            Next.js Middleware
          </Link>
          .
          <br />
          {cityNickname && cityNickname !== "undefined"
            ? "Refresh the page to generate a fresh nickname."
            : `We don't have a fun nickname on file for ${city}, but I'm sure
            it's lovely :)`}
        </p>
      </Block>

      <Block className={styles.info}>
        <div>
          <span className={styles.icon}>
            <GitHubIcon />
          </span>
          <span>
            <Link href={`https://github.com/${username}`}>{username}</Link>
            <br />
            {/* TODO: plug in */}
            20 public repos
          </span>
        </div>
        <div>
          <span className={styles.icon}>
            <GlobeIcon />
          </span>
          <span>location</span>
        </div>
        <div>
          <span className={styles.icon}>
            <BuildingsIcon />
          </span>
          <Link href="https://vercel.com/home">@vercel</Link>
        </div>
      </Block>

      <Block className={styles.v0} variant="light-gray">
        <MyV0Component />
      </Block>

      <Block className={styles.github} variant="purple">
        <div>
          <PullRequestIcon />
          {/* TODO: add date + datetime */}
          <span>
            <Link href={`https://github.com/${username}`}>{username}</Link>{" "}
            created a GitHub account on <time>date</time>.
          </span>
        </div>
        <span className={styles.h3}>
          {/* TODO: plug in number */}
          That's <strong>3,397 days of shipping</strong>, and counting!
        </span>
      </Block>

      <Block className={styles.vercel} variant="inverted">
        ▲
      </Block>

      <Block className={styles["powered-by"]}>
        {/* TODO: add logos */}
        Powered by next.js on vercel
      </Block>
    </div>
  );
}
