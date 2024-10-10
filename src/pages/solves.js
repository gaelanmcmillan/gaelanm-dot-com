import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import { useState } from "react";
import BowlingAlley from "../components/BowlingAlley";
import SolutionsCard from "../components/SolutionCard";
import { AnimationLayout } from "../components/Transition";

import TagBubble, {
  TagListView,
  firstHasAllOfSecond,
  useTagList,
} from "../components/TagBubble";

const SolutionsPage = ({ posts, allTags }) => {
  const [tagList, clearTagList, toggleTag] = useTagList();
  const [doShowTags, setDoShowTags] = useState(false);
  return (
    <>
      <Head>
        <title>Gaelan McMillan's Solves</title>
      </Head>
      <AnimationLayout>
        <BowlingAlley>
          <div style={{
            textAlign: "center",
          }}>
            <h2>Here are some editorialized solutions to my favourite programming puzzles</h2>
          </div>
          <div
            style={{
              marginBottom: "1rem",
              width: "100%",
              textAlign: "center",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setDoShowTags(!doShowTags);
            }}
          >
            <i>
              {doShowTags ? 'Click here to hide all tags.' : 'Click here to show all tags; click a tag to filter solves by topic or technology.'}
            </i>
          </div>
          <div
            style={{
              marginBottom: "1rem",
              display: `${doShowTags ? "block" : "none"}`,
            }}
          >
            {allTags.map((tag, i) => {
              return (
                <TagBubble key={i} tag={tag} onClick={toggleTag(tag)} />
              );
            })}
          </div>
          <TagListView
            tagList={tagList}
            clearListCallback={clearTagList}
            removeTagCallback={toggleTag}
          />
          {posts
            .filter(
              (post) =>
                tagList.length === 0 ||
                firstHasAllOfSecond(
                  post.frontmatter.tags.concat(post.frontmatter.languages),
                  tagList
                )
            )
            .map((sol, index) => (
              <SolutionsCard
                key={index}
                slug={sol.slug}
                title={sol.frontmatter.title}
                tags={sol.frontmatter.tags}
                url={sol.frontmatter.url}
                languages={sol.frontmatter.languages}
                date={sol.frontmatter.date}
                author={sol.frontmatter.author}
                toggleTag={toggleTag}
                difficulty={sol.frontmatter.difficulty}
              />
            ))}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <p>If you found a solution helpful, consider leaving a star!</p>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=gaelanmcmillan&repo=more-generic&type=star&count=true&size=large"
              width="120"
              height="30"
              title="GitHub"
            ></iframe>
          </div>
        </BowlingAlley>
      </AnimationLayout>
    </>
  );
};

export default SolutionsPage;

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("static_media", "solves"));

  const posts = files
    .map((filename) => {
      let slug = filename.replace(".mdx", "");
      let rawMarkdown = fs.readFileSync(
        path.join("static_media", "solves", filename),
        "utf-8"
      );
      let { data: frontmatter } = matter(rawMarkdown);
      return {
        slug,
        frontmatter,
      };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  let allTags = (() => {
    let tagSet = new Set();
    let tags = posts.flatMap((post) => {
      const addOnce = (str) => {
        if (!tagSet.has(str)) {
          tagSet.add(str);
          return true;
        }
        return false;
      };

      return post.frontmatter.tags
        .filter((tag) => addOnce(tag))
        .concat(post.frontmatter.languages.filter((lang) => addOnce(lang)));
    });
    return tags.sort();
  })();

  return {
    props: {
      posts,
      allTags,
    },
  };
}
