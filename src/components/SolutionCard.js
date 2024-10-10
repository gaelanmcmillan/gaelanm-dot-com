import Link from "next/link";
import styled from "styled-components";
import TagBubble from "./TagBubble";
/**
 * _____________________________________
 * | Title             | <icon> [->]   |
 * | <tag> <tag> <tag> | <lang> <lang> |
 * '''''''''''''''''''''''''''''''''''''
 */

const diffColor = {
  easy: "#99BB99",
  medium: "#e8cb80",
  hard: "#bf7365",
};

const Wrapper = styled.div`
  font-family: "Inconsolata";

  display: flex;
  flex-direction: row;

  margin-bottom: 1rem;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  padding-left: 0.75rem;
`;

const HorizontalSplit = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  font-size: 18px;
  width: 100%;
`;

const InfoContent = styled.a`
  width: 100%;
`;

const extractSiteName = (url) => {
  const tokens = url.split(/\/+/);
  for (let tok of tokens) {
    if (tok.endsWith(".com")) return tok.slice(0, tok.search(/.com/));
  }
  return "Link";
};

const SolutionsCard = ({
  slug,
  title,
  url,
  tags,
  languages,
  date,
  difficulty,
  prefix = "/solves/",
  toggleTag,
}) => {
  const siteName = extractSiteName(url);
  return (
    <Wrapper className="soft-shadow" width={"100%"} style={{ borderRadius: "0.5rem" }}>
      <InfoWrapper
        width={"100%"}
        style={{
          borderLeft: `5px solid ${diffColor[difficulty]}`,
          borderRadius: "0.5rem",
        }}
      >
        <Link href={prefix + slug} passHref>
          <InfoContent style={{ cursor: "pointer" }}>
            <Title>{title}</Title>
            <div>
              {tags.map((word, i) => {
                return (
                  <TagBubble
                    key={i}
                    tag={word}
                    onClick={toggleTag(word)}
                  />
                );
              })}
              {languages.map((lang, i) => {
                return (
                  <TagBubble
                    key={i}
                    tag={lang}
                    onClick={toggleTag(lang)}
                  />
                );
              })}
            </div>
          </InfoContent>
        </Link>
        <div
          style={{
            float: "right",
            width: "fit-content",
            display: "flex",
          }}
        >
          <div
            style={{
              margin: "auto",
              whiteSpace: "pre",
              margin: "auto",
            }}
          >
            <a href={url}>{siteName} ⧉</a>
          </div>
        </div>
      </InfoWrapper>
    </Wrapper>
  );
};

export default SolutionsCard;
