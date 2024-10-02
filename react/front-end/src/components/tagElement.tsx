import AttributeElement from "./attributeElement";
import { TagParams } from "./billSplitCard";

interface TagElementParams {
  callback?: React.Dispatch<React.SetStateAction<TagParams[]>>;
  tag: TagParams;
}

const TagElement = ({ callback, tag }: TagElementParams) => {
  const handleClick = () => {
    if (typeof callback === "undefined") return;
    callback((previousState) => {
      return previousState.filter(({ name }) => name !== tag.name);
    });
  };

  return (
    <AttributeElement
      callback={typeof callback === "undefined" ? undefined : handleClick}
    >
      <p className="my-text text-bold">{tag.name}</p>
    </AttributeElement>
  );
};

export default TagElement;
