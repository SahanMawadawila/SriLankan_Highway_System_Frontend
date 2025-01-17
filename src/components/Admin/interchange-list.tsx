import { InterchangeColumn } from "./interchange-column";

interface Interchange {
  id: string;
  name: string;
  details: string;
  imageUrl: string;
}

interface InterchangeListProps {
  cities: Interchange[];
  onInterchangeClick: (InterchangeId: string) => void;
}

export function InterchangeList({
  cities,
  onInterchangeClick,
}: InterchangeListProps) {
  return (
    <div className="space-y-4">
      {cities.map((Interchange) => (
        <InterchangeColumn
          key={Interchange.id}
          name={Interchange.name}
          details={Interchange.details}
          imageUrl={Interchange.imageUrl}
          onClick={() => onInterchangeClick(Interchange.id)}
        />
      ))}
    </div>
  );
}
