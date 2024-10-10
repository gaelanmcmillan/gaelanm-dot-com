import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { useState } from "react";
import styled from "styled-components";
import BowlingAlley from "../components/BowlingAlley";
import TagBubble, {
  TagListView,
  firstHasAllOfSecond,
  useTagList,
} from "../components/TagBubble";
import { AnimationLayout } from "../components/Transition";

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectEntry = ({ project, toggleTag }) => {
  return (
    <div
      className="soft-shadow"
      width={"100%"}
      style={{
        borderRadius: "0.5rem",
        padding: "0.75rem",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        fontFamily: "Inconsolata",
      }}
    >
      <h2 style={{ marginBottom: 0, textDecorationThickness: "3px" }}>
        {!!project.frontmatter.gitlink ? (
          <a href={project.frontmatter.gitlink} className="outgoing-link">{project.frontmatter.title}</a>
        ) : (
          <>{project.frontmatter.title}</>
        )}
      </h2>
      <FlexCol style={{}}>
        <div>
          <div style={{ marginBottom: "0.25rem" }}>
            {project.frontmatter.excerpt}
          </div>
          {project.frontmatter.tags.map((tag, i) => (
            <TagBubble key={i} tag={tag} onClick={toggleTag(tag)} />
          ))}
          {project.frontmatter.languages.map((lang, i) => (
            <TagBubble key={i} tag={lang} onClick={toggleTag(lang)} />
          ))}
        </div>
        <div>
          {project.frontmatter.author !== "Gaelan McMillan"
            ? project.frontmatter.author
            : ""}
        </div>
      </FlexCol>
    </div>
  );
};

const Projects = ({ projects, allTags }) => {
  const [tagList, clearTagList, toggleTag] = useTagList();
  const [doShowTags, setDoShowTags] = useState(false);
  return (
    <AnimationLayout>
      <BowlingAlley>
        <div style={{
          textAlign: "center",
        }}>
          <h2 >Here are some of my personal projects</h2>
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
            {doShowTags ? 'Click here to hide all tags.' : 'Click here to show all tags; click a tag to filter projects by topic or technology.'}
          </i>
        </div>
        <div
          style={{
            marginBottom: "1rem",
            display: `${doShowTags ? "block" : "none"}`,
          }}
        >
          {allTags.map((tag, i) => {
            return <TagBubble key={i} tag={tag} onClick={toggleTag(tag)} />;
          })}
        </div>
        <TagListView
          tagList={tagList}
          clearListCallback={clearTagList}
          removeTagCallback={toggleTag}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {projects
            .filter(
              (project) =>
                tagList.length === 0 ||
                firstHasAllOfSecond(
                  project.frontmatter.tags.concat(
                    project.frontmatter.languages
                  ),
                  tagList
                )
            )
            .map((project, i) => (
              <ProjectEntry
                key={i}
                project={project}
                toggleTag={toggleTag}
              />
            ))}
        </div>

        <div style={{ fontSize: "6pt", marginBottom: "1rem", textAlign: "center" }}>Some projects are marked with a 🚧 while I work on integrating them into this site. Please bear with me, thanks!</div>
      </BowlingAlley>
    </AnimationLayout>
  );
};

export default Projects;

const dirName = "works";

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("static_media", dirName));
  // let tagSet = new Set();
  const projects = files
    .map((filename) => {
      let slug = filename.replace(".mdx", "");
      let rawMarkdown = fs.readFileSync(
        path.join("static_media", dirName, filename),
        "utf-8"
      );

      let { data: frontmatter } = matter(rawMarkdown);

      return {
        slug,
        frontmatter,
      };
    })
    .sort((a, b) => (a.frontmatter.title.includes("🚧") ? 1 : (a.frontmatter.date < b.frontmatter.date ? 1 : -1)));

  let allTags = (() => {
    let tagSet = new Set();
    let tags = projects.flatMap((project) => {
      const addOnce = (str) => {
        if (!tagSet.has(str)) {
          tagSet.add(str);
          return true;
        }
        return false;
      };

      return project.frontmatter.tags
        .filter((tag) => addOnce(tag))
        .concat(project.frontmatter.languages.filter((lang) => addOnce(lang)));
    });
    return tags.sort();
  })();

  return {
    props: {
      projects,
      allTags,
    },
  };
}
