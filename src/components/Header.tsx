import Filter from "./Filter";

interface Props {
  title: string;
  filters?: {
    queryKey: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  extendButtons?: React.ReactNode;
}

const Header: React.FC<Props> = ({ title, filters = [], extendButtons }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="my-4 h-[1px] w-full bg-gray-300" />
      <div className="flex  mb-6">
        {filters?.map(({ label, options, queryKey }, index) => (
          <Filter
            key={index}
            queryKey={queryKey}
            label={label}
            options={options}
          />
        ))}
        <div className="ml-auto">{extendButtons}</div>
      </div>
    </div>
  );
};

export default Header;
