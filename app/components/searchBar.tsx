interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps): JSX.Element => {
  return <input placeholder={placeholder} />;
};
