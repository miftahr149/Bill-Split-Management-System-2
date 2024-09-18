import AttributeElement from "./attributeElement";
import { TagParams } from "./billSplitCard";

interface TagElementParams {
  callback: React.Dispatch<React.SetStateAction<TagParams[]>>;
  tag: TagParams;
}

const TagElement = ({ callback, tag }: TagElementParams) => {
  const handleClick = () => {
    callback((previousState: TagParams[]) => {
      return previousState.filter(
        (value: TagParams) => value.name !== tag.name
      );
    });
  };

  return (
    <AttributeElement callback={handleClick}>
      <p className="my-text text-bold">{tag.name}</p>
    </AttributeElement>
  )
};

export default TagElement;
