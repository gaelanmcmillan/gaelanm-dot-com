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
              <details>
                <summary>more about me</summary>
                <info>
                  + favourite tools: <i>Vim</i>, <i>GNU Utils</i>,{" "}<i>Ableton Live</i><br />
                  + favourite music: <i>D'Angelo</i>, <i>Machinedrum</i>,{" "}
                  <i>Stevie Wonder</i>
                  <br />
                  + hobbies: creative coding (p5.js); running;{" "}
                  <a className="outgoing-link" href={"/solves"}>
                    programming puzzles
                  </a><br />
                  + favourite programming languages (in order of length-of-remark): <br />
                  <i>
                    C++ (mostly for <code>#include &lt;algorithm&gt;</code>)<br />
                    TypeScript (mostly for <code>strict: true</code>);<br />
                    Python (mostly for its succinctness);<br />
                    Rust (mostly for ADTs, cargo);<br />
                    C (mostly for its simplicity);<br />
                    Haskell (mostly for tacit);<br />
                    Elixir (mostly for <code>|&gt;</code>);<br />
                  </i>
                </info>
              </details>
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
            </div>
          </div>
        </BowlingAlley>
      </AnimationLayout >
    </>
  );
}
