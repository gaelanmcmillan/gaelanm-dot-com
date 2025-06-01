import Head from "next/head";
import BowlingAlley from "../components/BowlingAlley";

import styled from "styled-components";
import { AnimationLayout } from "../components/Transition";
import { info_block } from "../styles/Index.module.scss";

const ProfilePicture = styled.div`
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100%;
  overflow: hidden;
  > img {
    width: 100%;
    size: 100%;
  }
`;

const socialsLinks = [
  {
    href: "https://www.linkedin.com/in/gaelan-mcmillan/",
    title: "linkedin",
    external: true,
  },
  {
    href: "https://github.com/gaelanmcmillan",
    title: "github",
    external: true,
  },
  {
    href: "https://leetcode.com/u/gaelanmcm/",
    title: 'leetcode',
    external: true,
  },
  {
    href: "https://codeforces.com/profile/gaelanmcm",
    title: "codeforces",
    external: true,
  },
  {
    href: "https://open.kattis.com/users/gaelanmcm",
    title: "kattis",
    external: true
  },
  {
    href: "/pdfs/GaelanMcMillanResume.pdf",
    title: "résumé",
    external: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Gaelan McMillan's Website</title>
      </Head>
      <AnimationLayout>
        <BowlingAlley>
          <ProfilePicture>
            <img src="/images/ProfilePicture.JPG" />
          </ProfilePicture>
          <div
            className={`${info_block}`}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <h2>Hi, I'm Gaelan</h2>
                + computer science student
                <br />+ music lover;{" "}
                <a className="outgoing-link" href={"/music"}>
                  bassist for 10+ years
                </a>
                <br />
                + interests: audio visualization; multiplayer software; math
              </div>
              <div>
                <h2 style={{ fontSize: '14pt' }}>Find me on the web</h2>
                {socialsLinks.map(({ href, title, external }, i) => {
                  return (
                    <div key={i}>
                      <a className="outgoing-link" href={href}>
                        {title}
                        {external ? " ⧉" : ""}
                      </a>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2 style={{ fontSize: '14pt' }}>Email me</h2>
                "contact" at [name of this website]
              </div>
            </div>
          </div>
        </BowlingAlley>
      </AnimationLayout >
    </>
  );
}
