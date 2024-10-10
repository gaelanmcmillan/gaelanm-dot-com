import { useState } from "react";
const tagMap = new Map();

const randomBetween = (low, high) => {
  return Math.round(low + Math.random() * (high - low));
};

const generateRandomColor = () => {
  const low = 150;
  const high = 220;
  const avg = Math.round((low + high) / 2);
  let r = randomBetween(low, high);
  let g = randomBetween(low, high);
  let b = Math.min(avg * 3 - r - g, 220);

  const str = `#${[r, g, b].map((col) => col.toString(16)).join("")}`;

  return str;
};

const registerNewColour = (tag) => {
  if (tagMap.has(tag)) {
    return;
  }
  const col = generateRandomColor();
  tagMap.set(tag, col);
};

const useTagColors = () => {
  const [tagColors, setTagColors] = useState(new Map());
  const registerColor = (tag) => {
    if (tagColors.has(tag)) return;
    const col = generateRandomColor();
    setTagColors(tagMap.set(tag, col));
  };
  const getColor = (tag) => {
    registerColor;
  };
};

/**
 * @returns [tagList, clearTagList, toggleTag];
 */
const useTagList = () => {
  const [tagList, setTagList] = useState([]);
  const toggleTag = (tag) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (tagList.includes(tag)) {
      setTagList(tagList.filter((t) => t != tag));
    } else {
      setTagList(tagList.concat(tag));
    }
  };
  const clearTagList = () => {
    setTagList([]);
  };

  return [tagList, clearTagList, toggleTag];
};

const TagHolder = ({ text, bgColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        fontFamily: "Inconsolata", // this is not the best way to assign font
        cursor: "pointer",
        backgroundColor: bgColor,
        whiteSpace: "nowrap",
        borderRadius: "10px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        width: "fit-content",
        marginRight: "0.5rem",
        fontSize: "15px",
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      {text}
    </div>
  );
};

/**
 * Returns true if `list2` is fully contained by `list1`
 **/
const firstHasAllOfSecond = (list1, list2) => {
  for (let b of list2) {
    if (!list1.includes(b)) return false;
  }
  return true;
};

const TagListView = ({ tagList, clearListCallback, removeTagCallback }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {tagList.length !== 0 ? (
        <TagHolder
          text="Clear All Tags"
          bgColor={"#CC99AA"}
          onClick={clearListCallback}
        />
      ) : (
        <></>
      )}
      {tagList.map((tag) => (
        <TagBubble tag={tag} onClick={removeTagCallback(tag)} />
      ))}
    </div>
  );
};

const TagBubble = ({ tag, onClick, registerColorCallback, getColor }) => {
  registerNewColour(tag);
  const col = tagMap.get(tag);
  return <TagHolder text={tag} onClick={onClick} bgColor={col} />;
};

export default TagBubble;

export { firstHasAllOfSecond, TagListView, useTagList };

